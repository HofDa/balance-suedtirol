"use client";

import { memo, useState, useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bath,
  BedDouble,
  CarFront,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CookingPot,
  Flower2,
  Grid,
  Layers,
  RefreshCw,
  RotateCcw,
  RotateCw,
  SkipForward,
  Sofa,
  Sparkles,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/public-path";
import { focusRingTool } from "@/components/ui/focus";
import { rooms } from "../config/rooms";
import { houseObjects, objectSprites, visibleSprites } from "../config/house-overlays";
import type { RoomId } from "../model/types";
import { getRoomProgress } from "../model/scoring";

interface HouseVisualProps {
  activeRoom: RoomId | null;
  answers: Record<string, string>;
  skippedQuestions?: Record<string, boolean>;
  onSelectRoom?: (roomId: RoomId) => void;
  onSelectObject?: (questionIndex: number) => void;
}

const GRID_STEPS = Array.from({ length: 19 }, (_, i) => (i + 1) * 5); // 5, 10, 15 ... 95
const LAYOUT_EDITOR_ENABLED = process.env.NODE_ENV === "development";
/**
 * Fokus im geöffneten Raum.
 *
 * Der frühere weiche Halo erreichte gegen den Sage-Canvas (#dfe8d6) nur 1,15:1
 * und war damit praktisch unsichtbar; WCAG 1.4.11 verlangt 3:1 für ein
 * wahrnehmbares UI-Signal. Stattdessen eine harte Kontur: ein heller Kern, der
 * gegen dunkle Möbel trägt, darum ein Ring in Forest, der gegen den hellen
 * Canvas trägt. Die Ringe sind verkettet, jeder legt sich um das Ergebnis des
 * vorherigen — daraus entsteht die geschlossene Silhouette.
 */
const ACTIVE_OBJECT_OUTLINE =
  "drop-shadow(0 0 1px rgba(247, 246, 240, 0.95)) drop-shadow(1px 0 0 #285744) drop-shadow(-1px 0 0 #285744) drop-shadow(0 1px 0 #285744) drop-shadow(0 -1px 0 #285744) drop-shadow(0 5px 9px rgba(24, 50, 41, 0.26))";

/** Objekte im Raum, die gerade nicht dran sind, treten farblich zurück. */
const RESTING_OBJECT_FILTER = "saturate(0.45)";
const COMPLETED_OBJECT_FILTER = "saturate(0.8)";

// Interactive Room Hotspots mapped onto the Isometric House Template
const ROOM_REGIONS: Record<RoomId, {
  title: string;
  openingClass: string;
  zoomClass: string;
  icon: typeof Bath;
}> = {
  bedroom: {
    title: "Schlafzimmer",
    openingClass: "left-[50%] top-[16%] h-[35%] w-[33%]",
    zoomClass: "scale-[2.45] origin-[66.5%_31.5%] max-md:translate-x-[-16.5%] max-md:translate-y-[18%]",
    icon: BedDouble
  },
  bath: {
    title: "Badezimmer",
    openingClass: "left-[16%] top-[16%] h-[35%] w-[33%]",
    zoomClass: "scale-[2.45] origin-[33.5%_31.5%] max-md:translate-x-[16.5%] max-md:translate-y-[18%]",
    icon: Bath
  },
  living: {
    title: "Wohnzimmer",
    openingClass: "left-[16%] top-[52%] h-[34%] w-[33%]",
    // Untere Räume brauchen auf Desktop einen höhenabhängigen Ausgleich: bis
    // zur maximalen Canvas-Höhe reichen 3,6 %, danach wächst nur der Rahmen.
    zoomClass: "scale-[2.45] origin-[33.5%_82%] md:translate-x-[14%] md:translate-y-[max(3.6%,calc(46.4%_-_283px))] max-md:origin-[33.5%_69%] max-md:translate-x-[16.5%] max-md:translate-y-[-19%]",
    icon: Sofa
  },
  kitchen: {
    title: "Küche & Essen",
    openingClass: "left-[50%] top-[52%] h-[34%] w-[33%]",
    zoomClass: "scale-[2.45] origin-[66.5%_82%] md:translate-x-[-11.5%] md:translate-y-[max(3.6%,calc(46.4%_-_283px))] max-md:origin-[66.5%_69%] max-md:translate-x-[-16.5%] max-md:translate-y-[-19%]",
    icon: CookingPot
  },
  mobility: {
    title: "Garage & Mobilität",
    openingClass: "left-0 top-[54%] h-[27%] w-[16%]",
    // Die Garage klebt am linken Bildrand: Der Ursprung sitzt in ihrer Mitte,
    // das Translate schiebt die abgeschnittene Kante wieder ins Bild.
    zoomClass: "scale-[3.8] origin-[8%_66%] translate-x-[-2%] translate-y-[-9.6%] max-md:scale-[3.2] max-md:translate-x-[-3.1%] max-md:translate-y-[-19.3%]",
    icon: CarFront
  },
  garden: {
    title: "Garten & Außenbereich",
    openingClass: "left-[83%] top-[58%] h-[42%] w-[17%]",
    // Der Gartenstreifen ist schmal und läuft bis an den rechten und unteren
    // Bildrand: enger Zoom, rechte Bildkante bündig zur Rahmenkante.
    zoomClass: "scale-[4.9] origin-[91.5%_79%] translate-x-[-2.1%] translate-y-[1.2%] max-md:scale-[3.8] max-md:translate-x-[0.9%] max-md:translate-y-[-15.6%]",
    icon: Flower2
  },
  travel: {
    title: "Reisen & Mobilität",
    openingClass: "left-[42%] top-[75%] h-[20%] w-[16%]",
    zoomClass: "scale-[2.2] origin-[50%_80%]",
    icon: Sofa
  }
};

const META_ASPECTS: Record<string, number> = {
  "bed.webp": 1.5706,
  "bike.webp": 0.6836,
  "biglamp.webp": 0.2441,
  "car.webp": 1.5375,
  "carpet.webp": 3.122,
  "chairsanddesk.webp": 1.8156,
  "closet.webp": 0.3418,
  "couch.webp": 0.8867,
  "cupboard.webp": 0.7578,
  "cupboard2.webp": 1.9176,
  "cupboard_tv.webp": 0.5469,
  "fridge.webp": 0.2285,
  "globe.webp": 0.7168,
  "kitchenwall.webp": 1.1278,
  "lamp.webp": 0.5723,
  "picture.webp": 0.334,
  "plant.webp": 0.9512,
  "showerbath.webp": 0.6367,
  "sink.webp": 0.7812,
  "suitcase.webp": 1.1253,
  "toilet.webp": 0.7852,
  "tv.webp": 0.2363
};

export const HouseVisual = memo(function HouseVisual({
  activeRoom,
  answers,
  skippedQuestions = {},
  onSelectRoom,
  onSelectObject
}: HouseVisualProps) {
  const reduceMotion = useReducedMotion();
  const isFocusedRoom = Boolean(activeRoom && !onSelectRoom);
  const [showGrid, setShowGrid] = useState(false);
  const [hoverPos, setHoverPos] = useState<{ left: number; top: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const roomStatus = useMemo(() => {
    const status: Record<string, { total: number; answered: number; isComplete: boolean }> = {};
    for (const room of rooms) {
      const progress = getRoomProgress(room, answers, skippedQuestions);
      status[room.id] = {
        total: progress.total,
        answered: progress.handled,
        isComplete: progress.isComplete
      };
    }
    return status;
  }, [answers, skippedQuestions]);

  const sprites = useMemo(() => {
    const focusedRoom = rooms.find((room) => room.id === activeRoom);
    if (isFocusedRoom && focusedRoom) {
      return objectSprites(focusedRoom.questions.map((question) => question.id));
    }
    const startedRooms = rooms
      .filter((room) => room.questions.some((question) => Boolean(answers[question.id])))
      .map((room) => room.id);
    return visibleSprites(answers, startedRooms);
  }, [activeRoom, answers, isFocusedRoom]);

  const focusedRoom = rooms.find((room) => room.id === activeRoom);
  const activeObjectIndex =
    focusedRoom?.questions.findIndex(
      (question) => !answers[question.id] && !skippedQuestions[question.id]
    ) ?? -1;
  const objectStateBySprite = useMemo(() => {
    const state: Record<
      string,
      {
        questionIndex: number;
        label: string;
        active: boolean;
        completed: boolean;
        skipped: boolean;
        primary: boolean;
      }
    > = {};
    // Nur im geöffneten Raum; in der Hausübersicht bleibt jedes Möbel gleich hell.
    if (!isFocusedRoom) return state;
    focusedRoom?.questions.forEach((question, questionIndex) => {
      const object = houseObjects[question.id as keyof typeof houseObjects];
      (object?.sprites ?? []).forEach((spriteId, spriteIndex) => {
        state[spriteId] = {
          questionIndex,
          label: question.sceneLabel,
          active: questionIndex === activeObjectIndex,
          completed: Boolean(answers[question.id]),
          skipped: Boolean(skippedQuestions[question.id]),
          primary: spriteIndex === 0
        };
      });
    });
    return state;
  }, [activeObjectIndex, answers, focusedRoom, isFocusedRoom, skippedQuestions]);

  /**
   * Der Spotlight legt alles außer dem aktiven Objekt in einen hellen Schleier.
   * Das trifft auch die eingezeichnete Kulisse (Wände, Böden, PV-Anlage), die
   * ein reiner Sprite-Effekt nicht erreichen kann.
   *
   * Mitte und Radius kommen aus der tatsächlichen Bounding-Box der Sprites, nicht
   * aus handgesetzten Werten: so umfasst das Loch jedes Objekt sicher, vom 4 %
   * breiten WC bis zur 31 % breiten Küchenzeile.
   */
  const spotlight = useMemo(() => {
    if (!isFocusedRoom || !focusedRoom) return null;
    const activeQuestion = focusedRoom.questions[activeObjectIndex];
    if (!activeQuestion) return null;

    const activeSprites = sprites.filter((sprite) => objectStateBySprite[sprite.id]?.active);
    let centerX: number;
    let centerY: number;
    let reach: number;

    if (activeSprites.length > 0) {
      let left = 100;
      let top = 100;
      let right = 0;
      let bottom = 0;
      for (const sprite of activeSprites) {
        const aspect = META_ASPECTS[sprite.src] || 1;
        const height = sprite.height ?? sprite.width / aspect;
        left = Math.min(left, sprite.left);
        top = Math.min(top, sprite.top);
        right = Math.max(right, sprite.left + sprite.width);
        bottom = Math.max(bottom, sprite.top + height);
      }
      centerX = (left + right) / 2;
      centerY = (top + bottom) / 2;
      reach = Math.hypot(right - left, bottom - top) / 2;
    } else {
      // Objekte ohne Sprite (etwa Fernreisen) sind nur in die Kulisse gemalt.
      const hotspot = houseObjects[activeQuestion.id as keyof typeof houseObjects]?.hotspot;
      if (!hotspot) return null;
      centerX = hotspot.left;
      centerY = hotspot.top;
      reach = 6;
    }

    // Der Schleier darf den Raum nicht schlucken und nicht zum Schlüsselloch werden.
    const radius = Math.min(42, Math.max(14, reach * 3));
    const clearStop = Math.min(72, Math.round(((reach * 1.25) / radius) * 100));

    return {
      key: activeQuestion.id,
      centerX: Math.round(centerX * 10) / 10,
      centerY: Math.round(centerY * 10) / 10,
      radius: Math.round(radius * 10) / 10,
      clearStop,
      midStop: Math.round(clearStop + (100 - clearStop) * 0.45)
    };
  }, [activeObjectIndex, focusedRoom, isFocusedRoom, objectStateBySprite, sprites]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [overridePositions, setOverridePositions] = useState<
    Record<string, { left: number; top: number; width?: number; height?: number; rotate?: number; z?: number }>
  >({});
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handlePointerDownSprite = (id: string, e: React.PointerEvent<HTMLImageElement>) => {
    if (!isEditMode || !canvasRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);
    setDraggingId(id);

    const rect = canvasRef.current.getBoundingClientRect();
    const currentSprite = sprites.find((s) => s.id === id);
    if (!currentSprite) return;

    const initialLeft = overridePositions[id]?.left ?? currentSprite.left;
    const initialTop = overridePositions[id]?.top ?? currentSprite.top;

    const startX = e.clientX;
    const startY = e.clientY;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100;
      const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100;

      const newLeft = Math.round(Math.max(0, Math.min(95, initialLeft + deltaX)) * 100) / 100;
      const newTop = Math.round(Math.max(0, Math.min(95, initialTop + deltaY)) * 100) / 100;

      setOverridePositions((prev) => ({
        ...prev,
        [id]: { ...prev[id], left: newLeft, top: newTop }
      }));
    };

    const onPointerUp = () => {
      setDraggingId(null);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handlePointerDownResize = (id: string, e: React.PointerEvent) => {
    if (!isEditMode || !canvasRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = canvasRef.current.getBoundingClientRect();
    const currentSprite = sprites.find((s) => s.id === id);
    if (!currentSprite) return;

    const aspect = META_ASPECTS[currentSprite.src] || 1.0;
    const initialWidth = overridePositions[id]?.width ?? currentSprite.width;

    const startX = e.clientX;
    const startY = e.clientY;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100;
      const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100;

      const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
      const newWidth = Math.round(Math.max(1, Math.min(80, initialWidth + delta)) * 10) / 10;
      const newHeight = Math.round((newWidth / aspect) * 10) / 10;

      setOverridePositions((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          left: prev[id]?.left ?? currentSprite.left,
          top: prev[id]?.top ?? currentSprite.top,
          width: newWidth,
          height: newHeight
        }
      }));
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handleWheelSprite = (id: string, e: React.WheelEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.stopPropagation();
    const currentSprite = sprites.find((s) => s.id === id);
    if (!currentSprite) return;

    const aspect = META_ASPECTS[currentSprite.src] || 1.0;
    const curWidth = overridePositions[id]?.width ?? currentSprite.width;
    const curRotate = overridePositions[id]?.rotate ?? 0;

    if (e.altKey) {
      // Rotate by 5 deg
      const delta = e.deltaY < 0 ? 5 : -5;
      const newRotate = (curRotate + delta) % 360;
      setOverridePositions((prev) => ({
        ...prev,
        [id]: { ...prev[id], left: prev[id]?.left ?? currentSprite.left, top: prev[id]?.top ?? currentSprite.top, rotate: newRotate }
      }));
    } else {
      // Even proportional scale by 0.5%
      const delta = e.deltaY < 0 ? 0.5 : -0.5;
      const newWidth = Math.round(Math.max(1, Math.min(80, curWidth + delta)) * 10) / 10;
      const newHeight = Math.round((newWidth / aspect) * 10) / 10;

      setOverridePositions((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          left: prev[id]?.left ?? currentSprite.left,
          top: prev[id]?.top ?? currentSprite.top,
          width: newWidth,
          height: newHeight
        }
      }));
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPos({
      left: Math.round(Math.max(0, Math.min(100, x)) * 10) / 10,
      top: Math.round(Math.max(0, Math.min(100, y)) * 10) / 10
    });
  };

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-[var(--color-sage)]">

      {/* Control Toolbar (Grid & Live Edit Mode) */}
      {LAYOUT_EDITOR_ENABLED && (
        <div className="absolute top-3 right-3 z-50 flex items-center gap-2">
          <button
            onClick={() => setIsEditMode((prev) => !prev)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur transition-all cursor-pointer",
              isEditMode
                ? "border-amber-400 bg-amber-500 text-stone-950 ring-2 ring-amber-400/40"
                : "border-stone-700/30 bg-stone-900/85 text-white hover:bg-stone-900"
            )}
            title="Live Drag & Drop Platzierung aktivieren"
          >
            <Sparkles className="size-3.5 text-amber-300" />
            <span>Drag & Drop: {isEditMode ? "AN" : "AUS"}</span>
          </button>

          <button
            onClick={() => setShowGrid((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-full border border-stone-700/30 bg-stone-900/85 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur hover:bg-stone-900 transition-all cursor-pointer"
            title="Grid Overlay umschalten"
          >
            <Grid className="size-3.5 text-blue-400" />
            <span>Grid: {showGrid ? "AN" : "AUS"}</span>
          </button>
        </div>
      )}

      {/* Selected Sprite Quick Inspector Bar */}
      {isEditMode && selectedId && (
        <div className="absolute top-3 left-3 z-50 flex items-center gap-3 rounded-full border border-amber-500/50 bg-stone-900/90 px-3.5 py-1.5 text-xs text-white shadow-2xl backdrop-blur">
          <span className="font-bold text-amber-400 font-mono">{selectedId}</span>
          <div className="h-4 w-px bg-stone-700" />

          {/* Proportional Even Scale Control */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const s = sprites.find((item) => item.id === selectedId);
                if (!s) return;
                const aspect = META_ASPECTS[s.src] || 1.0;
                const curW = overridePositions[selectedId]?.width ?? s.width;
                const newW = Math.max(1, Math.round((curW - 0.5) * 10) / 10);
                const newH = Math.round((newW / aspect) * 10) / 10;
                setOverridePositions((prev) => ({
                  ...prev,
                  [selectedId]: { ...prev[selectedId], left: prev[selectedId]?.left ?? s.left, top: prev[selectedId]?.top ?? s.top, width: newW, height: newH }
                }));
              }}
              className="rounded p-1 hover:bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
              title="Gleichmäßig verkleinern"
            >
              <ZoomOut className="size-3.5 text-amber-400" />
            </button>
            <span className="font-mono text-[10px] text-amber-300 w-16 text-center">
              Größe:{overridePositions[selectedId]?.width ?? sprites.find((s) => s.id === selectedId)?.width}%
            </span>
            <button
              onClick={() => {
                const s = sprites.find((item) => item.id === selectedId);
                if (!s) return;
                const aspect = META_ASPECTS[s.src] || 1.0;
                const curW = overridePositions[selectedId]?.width ?? s.width;
                const newW = Math.min(80, Math.round((curW + 0.5) * 10) / 10);
                const newH = Math.round((newW / aspect) * 10) / 10;
                setOverridePositions((prev) => ({
                  ...prev,
                  [selectedId]: { ...prev[selectedId], left: prev[selectedId]?.left ?? s.left, top: prev[selectedId]?.top ?? s.top, width: newW, height: newH }
                }));
              }}
              className="rounded p-1 hover:bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
              title="Gleichmäßig vergrößern"
            >
              <ZoomIn className="size-3.5 text-amber-400" />
            </button>
          </div>

          <div className="h-4 w-px bg-stone-700" />

          {/* Rotation Control */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const s = sprites.find((item) => item.id === selectedId);
                if (!s) return;
                const curR = overridePositions[selectedId]?.rotate ?? 0;
                const newR = (curR - 15) % 360;
                setOverridePositions((prev) => ({
                  ...prev,
                  [selectedId]: { ...prev[selectedId], left: prev[selectedId]?.left ?? s.left, top: prev[selectedId]?.top ?? s.top, rotate: newR }
                }));
              }}
              className="rounded p-1 hover:bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
              title="Gegen Uhrzeigersinn drehen (-15°)"
            >
              <RotateCcw className="size-3.5" />
            </button>
            <span className="font-mono text-[10px] text-stone-300 w-10 text-center">
              {overridePositions[selectedId]?.rotate ?? 0}°
            </span>
            <button
              onClick={() => {
                const s = sprites.find((item) => item.id === selectedId);
                if (!s) return;
                const curR = overridePositions[selectedId]?.rotate ?? 0;
                const newR = (curR + 15) % 360;
                setOverridePositions((prev) => ({
                  ...prev,
                  [selectedId]: { ...prev[selectedId], left: prev[selectedId]?.left ?? s.left, top: prev[selectedId]?.top ?? s.top, rotate: newR }
                }));
              }}
              className="rounded p-1 hover:bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
              title="Im Uhrzeigersinn drehen (+15°)"
            >
              <RotateCw className="size-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-stone-700" />

          {/* Z-Index Layering Control */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const s = sprites.find((item) => item.id === selectedId);
                if (!s) return;
                const curZ = overridePositions[selectedId]?.z ?? s.z;
                const newZ = Math.max(1, curZ - 1);
                setOverridePositions((prev) => ({
                  ...prev,
                  [selectedId]: { ...prev[selectedId], left: prev[selectedId]?.left ?? s.left, top: prev[selectedId]?.top ?? s.top, z: newZ }
                }));
              }}
              className="rounded p-1 hover:bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
              title="Ebene nach hinten verschieben (Z-Index -1)"
            >
              <span className="text-[11px] font-bold">-</span>
            </button>
            <span className="font-mono text-[10px] text-emerald-300 w-12 text-center flex items-center justify-center gap-0.5">
              <Layers className="size-3 text-emerald-400" />
              Z:{overridePositions[selectedId]?.z ?? sprites.find((s) => s.id === selectedId)?.z}
            </span>
            <button
              onClick={() => {
                const s = sprites.find((item) => item.id === selectedId);
                if (!s) return;
                const curZ = overridePositions[selectedId]?.z ?? s.z;
                const newZ = curZ + 1;
                setOverridePositions((prev) => ({
                  ...prev,
                  [selectedId]: { ...prev[selectedId], left: prev[selectedId]?.left ?? s.left, top: prev[selectedId]?.top ?? s.top, z: newZ }
                }));
              }}
              className="rounded p-1 hover:bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
              title="Ebene nach vorne holen (Z-Index +1)"
            >
              <span className="text-[11px] font-bold">+</span>
            </button>
          </div>

          <div className="h-4 w-px bg-stone-700" />

          {/* Reset button */}
          <button
            onClick={() => {
              setOverridePositions((prev) => {
                const next = { ...prev };
                delete next[selectedId];
                return next;
              });
            }}
            className="rounded p-1 text-stone-400 hover:bg-stone-800 hover:text-rose-400 cursor-pointer"
            title="Auf Standard zurücksetzen"
          >
            <RefreshCw className="size-3.5" />
          </button>
        </div>
      )}

      {/* Live Mouse Coordinates Badge */}
      {showGrid && hoverPos && (
        <div className="pointer-events-none absolute bottom-3 left-3 z-50 flex items-center gap-2 rounded-lg border border-blue-500/30 bg-stone-900/90 px-3 py-1.5 font-mono text-xs font-bold text-blue-300 shadow-xl backdrop-blur">
          <span>X (left): <span className="text-white">{hoverPos.left}%</span></span>
          <span className="text-stone-500">|</span>
          <span>Y (top): <span className="text-white">{hoverPos.top}%</span></span>
        </div>
      )}

      {/* Live Edit Mode Export Panel */}
      {isEditMode && (
        <>
          {!isPanelOpen ? (
            <button
              onClick={() => setIsPanelOpen(true)}
              className="absolute bottom-3 right-3 z-50 flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-stone-900/90 px-3 py-1.5 text-xs font-bold text-amber-300 shadow-xl backdrop-blur hover:bg-stone-900 cursor-pointer"
            >
              <Sparkles className="size-3.5 text-amber-400" />
              <span>Positionen anzeigen</span>
              <ChevronUp className="size-3.5 text-stone-400" />
            </button>
          ) : (
            <div className="absolute bottom-3 right-3 z-50 flex flex-col gap-2 rounded-xl border border-amber-500/50 bg-stone-900/95 p-3.5 text-white shadow-2xl backdrop-blur max-w-sm w-80">
              <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="size-3.5" /> Drag & Drop Modus
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const result = sprites
                        .map((s) => {
                          const l = overridePositions[s.id]?.left ?? s.left;
                          const t = overridePositions[s.id]?.top ?? s.top;
                          const w = overridePositions[s.id]?.width ?? s.width;
                          const h = overridePositions[s.id]?.height ?? s.height;
                          const z = overridePositions[s.id]?.z ?? s.z;
                          const r = overridePositions[s.id]?.rotate ?? 0;
                          return `  ${s.id}: { left: ${l}, top: ${t}, width: ${w}${h ? `, height: ${h}` : ""}, z: ${z}${r ? `, rotate: ${r}` : ""} }`;
                        })
                        .join("\n");
                      navigator.clipboard.writeText(result);
                      alert("Positionen in Zwischenablage kopiert!");
                    }}
                    className="rounded bg-amber-500 px-2 py-1 text-[10px] font-bold text-stone-950 hover:bg-amber-400 cursor-pointer shadow"
                  >
                    Kopieren
                  </button>
                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className="rounded p-1 text-stone-400 hover:bg-stone-800 hover:text-white cursor-pointer"
                    title="Panel einklappen"
                  >
                    <ChevronDown className="size-4" />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-stone-400 leading-snug">
                Drag=Position. Scroll=Skalieren, Alt+Scroll=Drehung.
              </p>
              <div className="max-h-36 overflow-y-auto font-mono text-[10px] space-y-1 text-stone-300 pr-1">
                {sprites.map((s) => {
                  const l = overridePositions[s.id]?.left ?? s.left;
                  const t = overridePositions[s.id]?.top ?? s.top;
                  const w = overridePositions[s.id]?.width ?? s.width;
                  const z = overridePositions[s.id]?.z ?? s.z;
                  const rot = overridePositions[s.id]?.rotate ?? 0;
                  const isModified = overridePositions[s.id] !== undefined;

                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
                      className={cn(
                        "flex items-center justify-between rounded px-1.5 py-0.5 cursor-pointer transition-colors",
                        selectedId === s.id
                          ? "bg-amber-500/30 text-amber-100 font-bold border border-amber-400"
                          : isModified
                          ? "bg-amber-500/15 text-amber-200"
                          : "bg-stone-800/50 hover:bg-stone-800"
                      )}
                    >
                      <span className="truncate max-w-[70px]">{s.id}</span>
                      <span>
                        L:{l}% T:{t}% W:{w}% Z:{z}{rot ? ` R:${rot}°` : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Main Isometric Canvas Container */}
      <div
        className={cn(
          "relative mx-auto flex h-full w-full items-center justify-center p-2 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-4",
          activeRoom && ROOM_REGIONS[activeRoom] ? ROOM_REGIONS[activeRoom].zoomClass : "scale-100"
        )}
      >
        <div
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverPos(null)}
          className="relative shrink-0 aspect-square h-[min(92%,38rem)] w-auto max-w-[92%]"
        >
          {/* Base Empty House Structure Canvas.
              Als WebP 86 KB statt 1,74 MB als PNG; die Quelldatei liegt unter
              assets-source/house/ und wird nicht ausgeliefert. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/assets/house/houseempty.webp")}
            alt="Interaktive Hausübersicht"
            width={1254}
            height={1254}
            decoding="async"
            className="h-full w-full rounded-[var(--radius-sharp)] object-contain"
          />

          {/* Percentage Helper Grid Overlay */}
          {showGrid && (
            <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[var(--radius-sharp)] border border-blue-500/40">
              {GRID_STEPS.map((val) => (
                <div key={`v-${val}`}>
                  {/* Vertical Line */}
                  <div
                    style={{ left: `${val}%` }}
                    className={cn(
                      "absolute inset-y-0 border-l pointer-events-none",
                      val % 10 === 0 ? "border-blue-500/40 border-solid" : "border-blue-300/20 border-dashed"
                    )}
                  />
                  {val % 10 === 0 && (
                    <span
                      style={{ left: `${val}%` }}
                      className="-translate-x-1/2 absolute top-1 rounded bg-stone-900/85 px-1 py-0.5 font-mono text-[9px] font-bold text-blue-300 shadow-xs border border-blue-500/30"
                    >
                      {val}%
                    </span>
                  )}

                  {/* Horizontal Line */}
                  <div
                    style={{ top: `${val}%` }}
                    className={cn(
                      "absolute inset-x-0 border-t pointer-events-none",
                      val % 10 === 0 ? "border-blue-500/40 border-solid" : "border-blue-300/20 border-dashed"
                    )}
                  />
                  {val % 10 === 0 && (
                    <span
                      style={{ top: `${val}%` }}
                      className="-translate-y-1/2 absolute left-1 rounded bg-stone-900/85 px-1 py-0.5 font-mono text-[9px] font-bold text-blue-300 shadow-xs border border-blue-500/30"
                    >
                      {val}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Furniture Sprites */}
          <AnimatePresence>
            {sprites.map((sprite) => {
              const currentLeft = overridePositions[sprite.id]?.left ?? sprite.left;
              const currentTop = overridePositions[sprite.id]?.top ?? sprite.top;
              const currentWidth = overridePositions[sprite.id]?.width ?? sprite.width;
              const aspect = META_ASPECTS[sprite.src] || 1.0;
              const currentHeight = overridePositions[sprite.id]?.height ?? sprite.height ?? Math.round((currentWidth / aspect) * 100) / 100;
              const currentZ = overridePositions[sprite.id]?.z ?? sprite.z;
              const currentRotate = overridePositions[sprite.id]?.rotate ?? 0;
              const isBeingDragged = draggingId === sprite.id;
              const isSelected = selectedId === sprite.id;
              const objectState = objectStateBySprite[sprite.id];
              const objectInteractive = Boolean(
                objectState && (objectState.active || objectState.completed || objectState.skipped)
              );
              const isActiveObject = Boolean(objectState?.active);
              // Fokus entsteht aus Differenz: das aktive Objekt bleibt voll,
              // alles andere im Raum tritt zurück statt gleich hell zu bleiben.
              const objectOpacity = !objectState
                ? 1
                : objectState.active
                  ? 1
                  : objectState.skipped
                    ? 0.42
                    : objectState.completed
                      ? 0.7
                      : 0.45;

              return (
                <div
                  key={sprite.id}
                  style={{
                    left: `${currentLeft}%`,
                    top: `${currentTop}%`,
                    width: `${currentWidth}%`,
                    height: `${currentHeight}%`,
                    // Das aktuelle Objekt bleibt über den kleinen Markern
                    // erledigter Fragen klickbar, falls sich ihre Flächen
                    // überschneiden (besonders Auto und Fahrrad in der Garage).
                    zIndex: isBeingDragged ? 999 : isSelected ? 990 : isActiveObject ? 45 : currentZ
                  }}
                  className="absolute"
                >
                  <motion.img
                    onPointerDown={(e) => handlePointerDownSprite(sprite.id, e)}
                    onWheel={(e) => handleWheelSprite(sprite.id, e)}
                    initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.97 }}
                    animate={{
                      opacity: objectOpacity,
                      y: isActiveObject ? -1.5 : 0,
                      // Größe und Bewegung tragen dort, wo Farbe es nicht tut:
                      // auf dem schmalen mobilen Split und bei kleinen Objekten.
                      scale: isActiveObject
                        ? reduceMotion
                          ? 1.05
                          : [1.05, 1.085, 1.05]
                        : 1,
                      filter: isActiveObject
                        ? ACTIVE_OBJECT_OUTLINE
                        : objectState?.completed
                          ? COMPLETED_OBJECT_FILTER
                          : objectState
                            ? RESTING_OBJECT_FILTER
                            : "none",
                      rotate: currentRotate
                    }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={
                      isActiveObject && !reduceMotion
                        ? {
                            opacity: { duration: 0.28 },
                            filter: { duration: 0.28 },
                            y: { duration: 0.32, ease: "easeOut" },
                            rotate: { duration: 0.28 },
                            scale: { duration: 2.8, ease: "easeInOut", repeat: Infinity }
                          }
                        : { duration: reduceMotion ? 0 : 0.28 }
                    }
                    src={withBasePath(`/assets/house/cutout/${sprite.src}`)}
                    alt={sprite.id}
                    style={{
                      width: "100%",
                      height: "100%",
                      // Das aktive Objekt wächst aus seiner Standfläche nach oben,
                      // statt in den Boden zu sinken.
                      transformOrigin: isActiveObject ? "50% 100%" : "50% 50%"
                    }}
                    className={cn(
                      "h-full w-full object-fill transition-shadow",
                      isEditMode
                        ? "cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-amber-400 hover:scale-[1.02] pointer-events-auto"
                        : "pointer-events-none",
                      isSelected && "ring-2 ring-amber-400 shadow-2xl",
                      isBeingDragged && "ring-2 ring-amber-300 scale-[1.03] shadow-2xl"
                    )}
                  />

                  {!isEditMode && objectInteractive && objectState.primary && (
                    <button
                      type="button"
                      onClick={() => onSelectObject?.(objectState.questionIndex)}
                      aria-label={`${objectState.label}${objectState.completed ? ", abgeschlossen" : objectState.skipped ? ", übersprungen" : ", jetzt erkunden"}`}
                      className={cn(
                        "absolute inset-0 z-10 rounded-[var(--radius-sm)] transition-transform",
                        focusRingTool,
                        objectState.active && "cursor-pointer hover:-translate-y-0.5 hover:scale-[1.025]",
                        !objectState.active && "cursor-pointer"
                      )}
                    />
                  )}

                  {/* Even Proportional Resize Handle for Selected Sprite */}
                  {isEditMode && isSelected && (
                    <div
                      onPointerDown={(e) => handlePointerDownResize(sprite.id, e)}
                      className="absolute -right-2 -bottom-2 size-4 rounded-sm bg-amber-400 border-2 border-stone-900 shadow-md cursor-nwse-resize hover:scale-125 z-50 pointer-events-auto"
                      title="Gleichmäßig skalieren (Proportional)"
                    />
                  )}
                </div>
              );
            })}
          </AnimatePresence>

          {/* Spotlight über Kulisse und ruhenden Möbeln, mit einem Loch über dem
              aktiven Objekt. Heller Schleier statt dunkler Vignette, damit die
              Szene zur hellen Palette passt. Liegt unter den Statusmarken (z-40),
              damit erledigte Objekte auffindbar bleiben. */}
          {!isEditMode && spotlight && (
            <AnimatePresence>
              <motion.div
                key={spotlight.key}
                aria-hidden
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 z-[35] rounded-[var(--radius-sharp)]"
                style={{
                  // Ein Farbschleier bringt hier nichts: die Kulisse liegt selbst
                  // schon nahe an Paper, ein Paper-Schleier verschiebt sie um
                  // wenige Prozent Helligkeit. Stattdessen wird der Peripherie
                  // die Farbe entzogen — das wirkt über jedem Untergrund.
                  backdropFilter: "saturate(0.28) brightness(1.05)",
                  WebkitBackdropFilter: "saturate(0.28) brightness(1.05)",
                  background: "rgba(247, 246, 240, 0.26)",
                  // Ellipse statt circle: nur so sind prozentuale Radien erlaubt.
                  // Der Canvas ist quadratisch, gleiche Werte ergeben einen Kreis.
                  maskImage: `radial-gradient(ellipse ${spotlight.radius}% ${spotlight.radius}% at ${spotlight.centerX}% ${spotlight.centerY}%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) ${spotlight.clearStop}%, rgba(0, 0, 0, 0.6) ${spotlight.midStop}%, rgb(0, 0, 0) 100%)`,
                  WebkitMaskImage: `radial-gradient(ellipse ${spotlight.radius}% ${spotlight.radius}% at ${spotlight.centerX}% ${spotlight.centerY}%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) ${spotlight.clearStop}%, rgba(0, 0, 0, 0.6) ${spotlight.midStop}%, rgb(0, 0, 0) 100%)`
                }}
              />
            </AnimatePresence>
          )}

          {/* Quiet status marks; the cut-out objects themselves carry the interaction. */}
          {!isEditMode && isFocusedRoom && focusedRoom && (
            <div className="pointer-events-none absolute inset-0 z-40">
              {focusedRoom.questions.map((question, index) => {
                const object = houseObjects[question.id as keyof typeof houseObjects];
                if (!object) return null;
                const completed = Boolean(answers[question.id]);
                const skipped = Boolean(skippedQuestions[question.id]);
                const active = index === activeObjectIndex;
                const hasSprite = object.sprites.length > 0;

                if (!completed && !skipped && (hasSprite || !active)) return null;

                return (
                  <motion.button
                    key={question.id}
                    type="button"
                    onClick={() => onSelectObject?.(index)}
                    aria-label={`${question.sceneLabel}${completed ? ", abgeschlossen" : skipped ? ", übersprungen" : active ? ", jetzt erkunden" : ""}`}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                    animate={
                      active && !hasSprite && !reduceMotion
                        ? {
                            opacity: [0.72, 1, 0.72],
                            scale: [1, 1.08, 1]
                          }
                        : { opacity: skipped ? 0.58 : 1, scale: 1 }
                    }
                    transition={
                      active && !hasSprite && !reduceMotion
                        ? { duration: 2.4, ease: "easeInOut", repeat: Infinity }
                        : { duration: 0.2 }
                    }
                    whileHover={!reduceMotion ? { y: -2, scale: 1.06 } : undefined}
                    style={{
                      left: `${object.hotspot.left}%`,
                      top: `${object.hotspot.top}%`
                    }}
                    className={cn(
                      "pointer-events-auto absolute grid size-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border shadow-sm backdrop-blur-sm",
                      focusRingTool,
                      active && !hasSprite &&
                        "size-8 border-[var(--color-forest)] bg-white/75 text-[var(--color-forest)] shadow-[0_0_0_4px_rgba(39,91,70,0.16)]",
                      completed &&
                        "cursor-pointer border-[var(--color-forest)]/45 bg-[var(--color-sage)] text-[var(--color-ink)]",
                      skipped &&
                        "cursor-pointer border-[var(--color-line)] bg-white/85 text-[var(--color-muted)]"
                    )}
                  >
                    {completed ? (
                      <CheckCircle2 className="size-3 shrink-0 text-[var(--color-forest)]" aria-hidden />
                    ) : skipped ? (
                      <SkipForward className="size-3 shrink-0" aria-hidden />
                    ) : (
                      <span className="size-2.5 rounded-full bg-[var(--color-forest)]" aria-hidden />
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* The complete room openings are the navigation; icons replace text labels. */}
          {!isEditMode && !isFocusedRoom && (["bedroom", "bath", "living", "kitchen", "mobility", "garden"] as RoomId[]).map((roomId) => {
            const roomConfig = ROOM_REGIONS[roomId];
            const isActive = activeRoom === roomId;
            const stat = roomStatus[roomId];
            const RoomIcon = roomConfig.icon;

            return (
              <motion.button
                key={roomId}
                whileTap={!onSelectRoom || reduceMotion ? undefined : { scale: 0.985 }}
                onClick={() => onSelectRoom?.(roomId)}
                disabled={!onSelectRoom}
                className={cn(
                  "group absolute z-40 grid place-items-center border border-transparent transition-[background-color,border-color,box-shadow] enabled:cursor-pointer",
                  roomConfig.openingClass,
                  focusRingTool,
                  isActive
                    ? "border-[var(--color-forest)]/55 bg-[var(--color-sage)]/25 shadow-[inset_0_0_0_2px_rgba(39,91,70,0.12)]"
                    : stat?.isComplete
                      ? "bg-[var(--color-sage)]/12 hover:border-[var(--color-forest)]/35 hover:bg-[var(--color-sage)]/22"
                      : "hover:border-[var(--color-forest)]/35 hover:bg-[var(--color-sage)]/18 hover:shadow-[inset_0_0_28px_rgba(39,91,70,0.08)]"
                )}
                aria-label={
                  onSelectRoom
                    ? `${roomConfig.title} besuchen, ${stat?.answered ?? 0} von ${stat?.total ?? 0} Objekten bearbeitet`
                    : roomConfig.title
                }
                aria-current={isActive ? "true" : undefined}
              >
                <motion.span
                  whileHover={!onSelectRoom || reduceMotion ? undefined : { y: -2, scale: 1.04 }}
                  className={cn(
                    "relative grid size-10 place-items-center rounded-full border bg-white/88 text-[var(--color-forest)] shadow-sm backdrop-blur transition-colors sm:size-12",
                    stat?.isComplete
                      ? "border-[var(--color-forest)]/45 bg-[var(--color-sage)]"
                      : "border-white/75 group-hover:border-[var(--color-forest)]/30 group-hover:bg-white"
                  )}
                >
                  <RoomIcon className="size-4 sm:size-5" aria-hidden />
                  {stat?.isComplete && (
                    <CheckCircle2
                      className="absolute -right-1 -top-1 size-4 rounded-full bg-white text-[var(--color-forest)]"
                      aria-hidden
                    />
                  )}
                  {stat?.total ? (
                    <span className="absolute -bottom-5 whitespace-nowrap rounded-full bg-white/88 px-1.5 py-0.5 text-[length:var(--text-label)] font-bold tabular-nums text-[var(--color-muted)] shadow-sm backdrop-blur">
                      {stat.answered}/{stat.total}
                    </span>
                  ) : null}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
