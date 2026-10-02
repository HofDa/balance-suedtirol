"use client";

import { useEffect, useState, type RefObject } from "react";
import { Check, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import { overviewLabelVariants } from "../model/house-camera";
import { RegisteredHouseScene } from "./registered-house-scene";
import { InteractiveRoom } from "./interactive-room";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { useTourI18n } from "../i18n/context";
import { roomEntrances } from "../config/illustrations";
import { getRoomProgress } from "../model/scoring";
import type { RoomId } from "../model/types";
import layout from "../config/full-house-layout.json";
import styles from "./interactive-room.module.css";
import { withBasePath } from "@/lib/public-path";

const skyMask = `url(${withBasePath("/images/house-tour/full-house/sky-mask.png")})`;

/**
 * Leben im Bild, bewusst leise: Dunst zieht hinter Dach, Bäumen und Bergen
 * durch den Himmel (maskiert auf den offenen Himmel des Gemäldes), und ein
 * Kohlweißling flattert über die Blumenwiese. Rein dekorativ, ohne Klicks.
 */
function AmbientLife() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={styles.sky} style={{ maskImage: skyMask, WebkitMaskImage: skyMask }}>
        <span className={cn(styles.cloudTrack, styles.cloudSlow)} style={{ top: "3%" }}><span className={styles.cloud} style={{ width: "26%" }} /></span>
        <span className={cn(styles.cloudTrack, styles.cloudMid)} style={{ top: "11%" }}><span className={styles.cloud} style={{ width: "18%" }} /></span>
        <span className={cn(styles.cloudTrack, styles.cloudFast)} style={{ top: "19%" }}><span className={styles.cloud} style={{ width: "22%" }} /></span>
      </span>
      <span className={styles.butterflyPath}>
        <span className={styles.butterflyBob}>
          <svg viewBox="0 0 20 16" className={styles.butterfly}>
            <g className={styles.wingLeft}>
              <path d="M10 8 C 7 1, 1 0, 1.5 5 C 2 8, 6 9, 10 8 Z" fill="#f6f4ea" />
              <path d="M10 8 C 6 9, 2.5 13, 5 15 C 7.5 16, 9.5 12, 10 8 Z" fill="#ecead9" />
              <path d="M4.2 1.4 C 2.5 1.3, 1.3 2.6, 1.6 4.4 C 3 3.4, 4 2.6, 4.2 1.4 Z" fill="#3b3f3a" />
              <circle cx="5.6" cy="5.2" r="0.8" fill="#3b3f3a" />
            </g>
            <g className={styles.wingRight}>
              <path d="M10 8 C 13 1, 19 0, 18.5 5 C 18 8, 14 9, 10 8 Z" fill="#f6f4ea" />
              <path d="M10 8 C 14 9, 17.5 13, 15 15 C 12.5 16, 10.5 12, 10 8 Z" fill="#ecead9" />
              <path d="M15.8 1.4 C 17.5 1.3, 18.7 2.6, 18.4 4.4 C 17 3.4, 16 2.6, 15.8 1.4 Z" fill="#3b3f3a" />
              <circle cx="14.4" cy="5.2" r="0.8" fill="#3b3f3a" />
            </g>
            <rect x="9.4" y="4.5" width="1.2" height="8" rx="0.6" fill="#2f332e" />
          </svg>
        </span>
      </span>
    </span>
  );
}

export function IllustratedHouse({ answers, skippedQuestions, onRoom, celebratedRooms }: {
  celebratedRooms: RefObject<Set<RoomId>>;
  answers: Record<string, string>; skippedQuestions: Record<string, boolean>; onRoom: (id: RoomId, questionIndex?: number) => void;
}) {
  const { t, rooms } = useTourI18n();
  const progressByRoom = rooms.map((room) => ({ room, progress: getRoomProgress(room, answers, skippedQuestions) }));
  // Einmal beim Aufbau festgelegt: ein erneutes Rendern mitten im Aufleuchten
  // darf die Animation nicht abschneiden.
  const [freshlyComplete] = useState(() => progressByRoom
    .filter(({ room, progress }) => progress.isComplete && !celebratedRooms.current.has(room.id))
    .map(({ room }) => room.id));
  useEffect(() => {
    freshlyComplete.forEach((id) => celebratedRooms.current.add(id));
  }, [freshlyComplete, celebratedRooms]);
  // Solange noch nichts beantwortet ist, laden die Schilder zum Antippen ein.
  const untouched = progressByRoom.every(({ progress }) => progress.handled === 0);
  const [size] = layout.size;

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#e8ecdf] [container-type:size]">
      <RegisteredHouseScene answers={answers} skippedQuestions={skippedQuestions} onSelectObject={onRoom}>
        {/* Das Haus wird mit dem Fortschritt lebendig: offene Räume leicht
            entsättigt, begonnene fast farbig, fertige in voller Farbe mit
            warmem Licht. Die Ebenen liegen im Kamerabild und fahren mit. */}
        {progressByRoom.map(({ room, progress }) => {
          const crop = layout.rooms[room.id as keyof typeof layout.rooms];
          // Der Garten hat keine Wände: über Bäumen und Himmel wurde das Licht
          // zu einem harten, gelblich-blassen Rechteck, besonders beim
          // Hineinfahren. Sein Fortschritt steht auf dem Schild.
          if (!crop || room.id === "garden") return null;
          const [left, top, width, height] = crop;
          const state = progress.isComplete ? "complete" : progress.isStarted ? "started" : "open";
          return (
            <span key={room.id} aria-hidden data-room-state={state}
              className={cn(styles.roomLight, progress.isComplete && freshlyComplete.includes(room.id) && styles.roomLightUp)}
              style={{ left: `${left / size * 100}%`, top: `${top / size * 100}%`, width: `${width / size * 100}%`, height: `${height / size * 100}%` }} />
          );
        })}
        <AmbientLife />
        <motion.nav aria-label={t.house.roomsNav} className="pointer-events-none absolute inset-0" variants={overviewLabelVariants}>
          {progressByRoom.map(({ room, progress }, index) => {
            const position = roomEntrances[room.id];
            if (!position) return null;
            return (
              <button key={room.id} type="button" onClick={() => onRoom(room.id)}
                style={{ left: `${position[0]}%`, top: `${position[1]}%`, animationDelay: `${index * 0.35}s` }}
                aria-label={t.house.visitAria(room.title, progress.handled, progress.total)}
                className={cn("pointer-events-auto absolute flex min-h-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-xl border border-white/90 bg-white/95 px-2 py-1.5 text-[10px] font-semibold text-[var(--color-forest)] shadow-md transition-colors hover:bg-[var(--color-sage)] sm:px-3 sm:text-xs", untouched && styles.invite, focusRingTool)}>
                <span className="flex items-center gap-1">{progress.isComplete && <Check className="size-3" aria-hidden />}{room.shortTitle}</span>
                <span className="text-[9px] font-normal tabular-nums sm:text-[10px]">{t.house.explored(progress.handled, progress.total)}</span>
              </button>
            );
          })}
        </motion.nav>
      </RegisteredHouseScene>
    </div>
  );
}

export function IllustratedRoom({ roomId, questionIndex, answers, adjustments, skippedQuestions, onSelectObject, zoom = false }: {
  roomId: RoomId; questionIndex: number; answers: Record<string, string>; adjustments: Record<string, number>; skippedQuestions: Record<string, boolean>; onSelectObject: (index: number) => void; zoom?: boolean;
}) {
  const { t, room: getRoom } = useTourI18n();
  const room = getRoom(roomId);
  if (!room) return null;
  return (
    <section className="relative flex h-full w-full min-w-0 flex-col bg-[#f5f1e7]" aria-label={t.scene.roomAria(room.title)}>
      {/* Mobil zählt jeder Pixel für das Bild: Raumname und Objektwahl stehen dort
          schon im Fragenbereich, die Nummern sitzen direkt auf den Gegenständen. */}
      <div className="hidden shrink-0 items-center justify-between gap-2 px-6 py-4 md:flex">
        <p className="text-xs font-semibold text-[var(--color-forest)]">{room.title}</p>
        <p className="text-[10px] text-[var(--color-muted)] md:text-xs">{t.scene.chooseObject}</p>
      </div>
      <InteractiveRoom room={room} questionIndex={questionIndex} answers={answers} adjustments={adjustments} skippedQuestions={skippedQuestions} onSelectObject={onSelectObject} zoom={zoom} />
      {/* Mobil folgt das Bild dem aktiven Objekt, die anderen liegen dann
          außerhalb. Diese Leiste hält alle drei erreichbar, ohne Höhe zu kosten. */}
      <nav aria-label={t.scene.objectsNav} className="pointer-events-none absolute inset-x-2 bottom-2 z-10 flex justify-center gap-1.5 md:hidden">
        {room.questions.map((item, index) => {
          const active = index === questionIndex;
          const answered = Boolean(answers[item.id]);
          const skipped = Boolean(skippedQuestions[item.id]);
          return (
            <button key={item.id} type="button" onClick={() => onSelectObject(index)} aria-current={active ? "step" : undefined}
              aria-label={`${item.sceneLabel}, ${answered ? t.scene.state.answered : skipped ? t.scene.state.skipped : t.scene.state.open}`}
              // Nur das aktive Objekt trägt seinen Namen; gekürzte Namen auf drei
              // Pillen waren unlesbar und deckten den kleinen Bildausschnitt zu.
              className={cn("pointer-events-auto flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur transition-colors",
                active ? "min-w-0 bg-[var(--color-forest)] py-1 pl-1 pr-3.5 text-white" : "bg-white/90 text-[var(--color-forest)]", focusRingTool)}>
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-[11px]", active && "bg-white/20")}>
                {answered ? <Check className="size-3.5" aria-hidden /> : skipped ? <SkipForward className="size-3.5" aria-hidden /> : index + 1}
              </span>
              {active && <span className="truncate">{item.sceneLabel}</span>}
            </button>
          );
        })}
      </nav>
      <nav aria-label={t.scene.objectsNav} className="hidden shrink-0 gap-3 border-t border-[var(--color-line)] bg-white/70 p-4 md:grid"
        style={{ gridTemplateColumns: `repeat(${room.questions.length}, minmax(0, 1fr))` }}>
        {room.questions.map((item, index) => {
          const active = index === questionIndex;
          const answered = Boolean(answers[item.id]);
          const skipped = Boolean(skippedQuestions[item.id]);
          return (
            <button key={item.id} type="button" onClick={() => onSelectObject(index)} aria-current={active ? "step" : undefined}
              aria-label={`${item.sceneLabel}, ${answered ? t.scene.state.answered : skipped ? t.scene.state.skipped : t.scene.state.open}`}
              className={cn("relative flex min-h-16 min-w-0 flex-col items-center gap-1 rounded-xl border p-2 text-center transition-colors md:gap-2 md:p-3", active ? "border-[var(--color-forest)] bg-[#e8ecdf]" : "border-[var(--color-line)] bg-[#faf7f0] hover:border-[var(--color-forest)]", focusRingTool)}>
              <span className="grid size-5 place-items-center rounded-full bg-white text-[10px] font-semibold text-[var(--color-forest)]">
                {answered ? <Check className="size-3" aria-hidden /> : skipped ? <SkipForward className="size-3" aria-hidden /> : index + 1}
              </span>
              {/* The scene contains the furniture; these compact controls are an alternative way to select it. */}
              <span className="text-[10px] font-semibold leading-tight md:text-xs">{item.sceneLabel}</span>
              <span className="hidden text-[10px] text-[var(--color-muted)] md:block">{answered ? t.scene.desktopState.answered : skipped ? t.scene.desktopState.skipped : active ? t.scene.desktopState.active : t.scene.desktopState.open}</span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}
