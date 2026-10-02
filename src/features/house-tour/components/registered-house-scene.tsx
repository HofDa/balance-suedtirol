"use client";

import type { CSSProperties, ReactNode } from "react";
import { Check, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import { cameraVariants } from "../model/house-camera";
import { ObjectEffect } from "./object-effects";
import { withBasePath } from "@/lib/public-path";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import layout from "../config/full-house-layout.json";
import { getRoom } from "../config/rooms";
import type { RoomId } from "../model/types";
import styles from "./interactive-room.module.css";

type SceneProps = {
  roomId?: RoomId;
  questionIndex?: number;
  answers: Record<string, string>;
  /** Reglerwerte: die Szene reagiert auf die Menge, nicht nur auf die Antwort. */
  adjustments?: Record<string, number>;
  skippedQuestions: Record<string, boolean>;
  onSelectObject: (room: RoomId, index: number) => void;
  onHoverObject?: (index: number | null) => void;
  children?: ReactNode;
};

/** All positions use pixels in the original house. A room is only a camera crop. */
export function RegisteredHouseScene({ roomId, questionIndex, answers, adjustments = {}, skippedQuestions, onSelectObject, onHoverObject, children }: SceneProps) {
  const crop = roomId && roomId in layout.rooms
    ? layout.rooms[roomId as keyof typeof layout.rooms]
    : [0, 0, ...layout.size];
  const [left, top, width, height] = crop;
  const items = layout.objects.filter((item) => !roomId || item.room === roomId)
    // Small foreground objects (bike, insect hotel) remain reachable over larger shapes.
    .sort((a, b) => b.box[2] * b.box[3] - a.box[2] * a.box[3]);
  const placement = ([x, y, w, h]: number[]): CSSProperties => ({
    left: `${(x - left) / width * 100}%`, top: `${(y - top) / height * 100}%`,
    width: `${w / width * 100}%`, height: `${h / height * 100}%`
  });
  // A room loads its own crop, cut from the 4× master: the full house scaled up
  // to room size would be blurry. The overview keeps the whole picture.
  const isRoomCrop = Boolean(roomId && roomId in layout.rooms);
  const sourceImage = isRoomCrop ? `/images/house-tour/full-house/rooms/${roomId}.webp` : "/images/house-tour/full-house/house.webp";
  // Mobil füllt ein Raum die Breite und die Kamera fährt zum aktiven Objekt;
  // eingepasst schrumpfte der hohe Garten auf einen Streifen von 150 px.
  const focus = isRoomCrop ? items.find((item) => item.question === questionIndex) : undefined;
  const focusY = focus ? (focus.box[1] + focus.box[3] / 2 - top) / height : 0.5;
  return (
    <div className={cn("flex h-full min-h-0 w-full items-center justify-center [container-type:size]", isRoomCrop && styles.panFrame)}>
      {/* Nur ein Raum wird auf seine Fläche beschnitten; die Hausansicht darf beim
          Hineinfahren über ihr Quadrat hinaus bis an den Rand der Spalte wachsen. */}
      <div className={cn(styles.scene, "relative isolate", isRoomCrop ? cn("overflow-hidden", styles.pan) : styles.cover)} data-house-scene={roomId ?? "house"}
        data-source-crop={crop.join(",")}
        style={{
          aspectRatio: `${width} / ${height}`, width: `min(100cqw, ${width / height * 100}cqh)`,
          ["--scene-h" as string]: `${height / width * 100}cqw`, ["--focus-y" as string]: focusY
        }}>
        {/* Die Gesamtansicht ist die Kamera: sie fährt beim Raumwechsel in den
            Ausschnitt hinein (Varianten aus der umgebenden AnimatePresence). */}
        <motion.div className="absolute inset-0" variants={isRoomCrop ? undefined : cameraVariants}>
        {/* Room image and cutouts share pixels. No object gets moved to fit a room. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath(sourceImage)} alt="" draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full max-w-none select-none" />
        {/* Spotlight: dims the scene while an object is highlighted; the cutout above stays bright. */}
        <span className={styles.dim} aria-hidden />
        {items.map((item) => {
          const room = getRoom(item.room as RoomId);
          const question = room?.questions[item.question];
          if (!question) return null;
          const active = roomId === item.room && questionIndex === item.question;
          const answered = Boolean(answers[question.id]);
          const skipped = Boolean(skippedQuestions[question.id]);
          return (
            <button key={item.id} type="button" data-object-id={item.id} data-source-box={item.box.join(",")}
              data-active={active} aria-pressed={active}
              aria-label={`${question.sceneLabel} öffnen${answered ? ", beantwortet" : skipped ? ", übersprungen" : ""}`}
              onClick={() => onSelectObject(item.room as RoomId, item.question)}
              onMouseEnter={() => onHoverObject?.(item.question)} onMouseLeave={() => onHoverObject?.(null)}
              onFocus={() => onHoverObject?.(item.question)} onBlur={() => onHoverObject?.(null)}
              style={placement(item.box)} className={cn(styles.object, "absolute m-0 cursor-pointer border-0 bg-transparent p-0", focusRingTool)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBasePath(`/images/house-tour/full-house/objects/${item.id}.webp`)} alt="" draggable={false}
                className={cn(styles.sprite, "pointer-events-none block h-full w-full max-w-none select-none")} />
              {/* Nur am gefragten Gegenstand: die Bewegung zeigt, worum es geht. */}
              {roomId && active && (
                <ObjectEffect id={item.id} question={question} answer={answers[question.id]} adjustments={adjustments} />
              )}
              {/* Neu gemountet bei jedem Zustandswechsel, damit das Abzeichen aufspringt. */}
              {roomId && <span key={answered ? "answered" : skipped ? "skipped" : "open"}
                // Ragt ein Objekt über den Raumausschnitt hinaus (die Baumkrone),
                // bleibt das Abzeichen an dessen oberem Rand sichtbar.
                style={{ top: `${Math.max(0, top - item.box[1]) / item.box[3] * 100}%` }}
                className={cn(styles.badge, "pointer-events-none absolute right-0 grid size-5 place-items-center rounded-full border border-white text-[10px] font-bold shadow-sm md:size-6", active ? "bg-[var(--color-forest)] text-white" : "bg-white text-[var(--color-forest)]")} aria-hidden>
                {answered ? <Check className="size-3" /> : skipped ? <SkipForward className="size-3" /> : item.question + 1}
              </span>}
            </button>
          );
        })}
        {children}
        </motion.div>
      </div>
    </div>
  );
}
