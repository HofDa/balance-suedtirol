"use client";

import { useEffect, useState } from "react";
import { Check, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import { overviewLabelVariants } from "../model/house-camera";
import { RegisteredHouseScene } from "./registered-house-scene";
import { InteractiveRoom } from "./interactive-room";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { availableRooms, getRoom } from "../config/rooms";
import { roomEntrances } from "../config/illustrations";
import { getRoomProgress } from "../model/scoring";
import type { RoomId } from "../model/types";
import layout from "../config/full-house-layout.json";
import styles from "./interactive-room.module.css";

/**
 * Räume, deren Abschluss schon gefeiert wurde. Bewusst nur für diese Sitzung:
 * die Hausansicht wird bei jeder Rückkehr neu aufgebaut, das Aufleuchten soll
 * aber nur beim ersten Mal nach dem Abschluss kommen.
 */
const celebratedRooms = new Set<RoomId>();

export function IllustratedHouse({ answers, skippedQuestions, onRoom }: {
  answers: Record<string, string>; skippedQuestions: Record<string, boolean>; onRoom: (id: RoomId, questionIndex?: number) => void;
}) {
  const progressByRoom = availableRooms.map((room) => ({ room, progress: getRoomProgress(room, answers, skippedQuestions) }));
  // Einmal beim Aufbau festgelegt: ein erneutes Rendern mitten im Aufleuchten
  // darf die Animation nicht abschneiden.
  const [freshlyComplete] = useState(() => progressByRoom
    .filter(({ room, progress }) => progress.isComplete && !celebratedRooms.has(room.id))
    .map(({ room }) => room.id));
  useEffect(() => {
    freshlyComplete.forEach((id) => celebratedRooms.add(id));
  }, [freshlyComplete]);
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
          if (!crop) return null;
          const [left, top, width, height] = crop;
          const state = progress.isComplete ? "complete" : progress.isStarted ? "started" : "open";
          return (
            <span key={room.id} aria-hidden data-room-state={state}
              className={cn(styles.roomLight, freshlyComplete.includes(room.id) && styles.roomLightUp)}
              style={{ left: `${left / size * 100}%`, top: `${top / size * 100}%`, width: `${width / size * 100}%`, height: `${height / size * 100}%` }} />
          );
        })}
        <motion.nav aria-label="Räume im Haus" className="pointer-events-none absolute inset-0" variants={overviewLabelVariants}>
          {progressByRoom.map(({ room, progress }, index) => {
            const position = roomEntrances[room.id];
            if (!position) return null;
            return (
              <button key={room.id} type="button" onClick={() => onRoom(room.id)}
                style={{ left: `${position[0]}%`, top: `${position[1]}%`, animationDelay: `${index * 0.35}s` }}
                aria-label={`${room.title} besuchen, ${progress.handled} von ${progress.total} Objekten bearbeitet`}
                className={cn("pointer-events-auto absolute flex min-h-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-xl border border-white/90 bg-white/95 px-2 py-1.5 text-[10px] font-semibold text-[var(--color-forest)] shadow-md transition-colors hover:bg-[var(--color-sage)] sm:px-3 sm:text-xs", untouched && styles.invite, focusRingTool)}>
                <span className="flex items-center gap-1">{progress.isComplete && <Check className="size-3" aria-hidden />}{room.shortTitle}</span>
                <span className="text-[9px] font-normal tabular-nums sm:text-[10px]">{progress.handled}/{progress.total} erkundet</span>
              </button>
            );
          })}
        </motion.nav>
      </RegisteredHouseScene>
    </div>
  );
}

export function IllustratedRoom({ roomId, questionIndex, answers, skippedQuestions, onSelectObject }: {
  roomId: RoomId; questionIndex: number; answers: Record<string, string>; skippedQuestions: Record<string, boolean>; onSelectObject: (index: number) => void;
}) {
  const room = getRoom(roomId);
  if (!room) return null;
  return (
    <section className="relative flex h-full w-full min-w-0 flex-col bg-[#f5f1e7]" aria-label={`${room.title}: Objekte entdecken`}>
      {/* Mobil zählt jeder Pixel für das Bild: Raumname und Objektwahl stehen dort
          schon im Fragenbereich, die Nummern sitzen direkt auf den Gegenständen. */}
      <div className="hidden shrink-0 items-center justify-between gap-2 px-6 py-4 md:flex">
        <p className="text-xs font-semibold text-[var(--color-forest)]">{room.title}</p>
        <p className="text-[10px] text-[var(--color-muted)] md:text-xs">Wähle einen Gegenstand</p>
      </div>
      <InteractiveRoom room={room} questionIndex={questionIndex} answers={answers} skippedQuestions={skippedQuestions} onSelectObject={onSelectObject} />
      {/* Mobil folgt das Bild dem aktiven Objekt, die anderen liegen dann
          außerhalb. Diese Leiste hält alle drei erreichbar, ohne Höhe zu kosten. */}
      <nav aria-label="Gegenstände im Raum" className="pointer-events-none absolute inset-x-2 bottom-2 z-10 flex justify-center gap-1.5 md:hidden">
        {room.questions.map((item, index) => {
          const active = index === questionIndex;
          const answered = Boolean(answers[item.id]);
          const skipped = Boolean(skippedQuestions[item.id]);
          return (
            <button key={item.id} type="button" onClick={() => onSelectObject(index)} aria-current={active ? "step" : undefined}
              aria-label={`${item.sceneLabel}, ${answered ? "beantwortet" : skipped ? "übersprungen" : "offen"}`}
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
      <nav aria-label="Gegenstände im Raum" className="hidden shrink-0 grid-cols-3 gap-3 border-t border-[var(--color-line)] bg-white/70 p-4 md:grid">
        {room.questions.map((item, index) => {
          const active = index === questionIndex;
          const answered = Boolean(answers[item.id]);
          const skipped = Boolean(skippedQuestions[item.id]);
          return (
            <button key={item.id} type="button" onClick={() => onSelectObject(index)} aria-current={active ? "step" : undefined}
              aria-label={`${item.sceneLabel}, ${answered ? "beantwortet" : skipped ? "übersprungen" : "offen"}`}
              className={cn("relative flex min-h-16 min-w-0 flex-col items-center gap-1 rounded-xl border p-2 text-center transition-colors md:gap-2 md:p-3", active ? "border-[var(--color-forest)] bg-[#e8ecdf]" : "border-[var(--color-line)] bg-[#faf7f0] hover:border-[var(--color-forest)]", focusRingTool)}>
              <span className="grid size-5 place-items-center rounded-full bg-white text-[10px] font-semibold text-[var(--color-forest)]">
                {answered ? <Check className="size-3" aria-hidden /> : skipped ? <SkipForward className="size-3" aria-hidden /> : index + 1}
              </span>
              {/* The scene contains the furniture; these compact controls are an alternative way to select it. */}
              <span className="text-[10px] font-semibold leading-tight md:text-xs">{item.sceneLabel}</span>
              <span className="hidden text-[10px] text-[var(--color-muted)] md:block">{answered ? "Beantwortet · ändern" : skipped ? "Übersprungen · nachholen" : active ? "Jetzt entdecken" : "Noch offen"}</span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}
