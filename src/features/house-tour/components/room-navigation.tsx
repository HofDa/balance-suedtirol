"use client";

import { Check, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { availableRooms } from "../config/rooms";
import { getRoomProgress } from "../model/scoring";
import type { RoomId } from "../model/types";

/**
 * Die Raumleiste aus DESIGN.md: der Reiseplan des Hauses, dauerhaft sichtbar.
 * Ohne sie führt jeder Raumwechsel über den Umweg Hausübersicht, und wo man
 * gerade steht, ist nur aus dem Panelkopf zu erschließen.
 *
 * Der Zustand ist doppelt kodiert — Fläche *und* Symbol —, damit er nicht an
 * der Farbe allein hängt: abgeschlossen trägt ein Häkchen, begonnen einen
 * Punkt, unberührt kein Symbol.
 */
export function RoomNavigation({
  activeRoom,
  answers,
  skippedQuestions,
  onSelectRoom,
  onHouse
}: {
  activeRoom: RoomId | null;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  onSelectRoom: (id: RoomId) => void;
  onHouse: () => void;
}) {
  return (
    <nav
      aria-label="Räume"
      className="flex items-center gap-1 border-b border-[var(--color-line)] bg-[var(--color-paper)]/65 px-2 md:px-3"
    >
      <button
        type="button"
        onClick={onHouse}
        aria-label="Zur Hausübersicht"
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]",
          focusRingTool
        )}
      >
        <Home className="size-4" aria-hidden />
      </button>

      {/* Waagrecht laufend mit ausblendender Maske statt sichtbarer Bildlaufleiste. */}
      <ul
        className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage: "linear-gradient(to right, #000 calc(100% - 24px), transparent)",
          WebkitMaskImage: "linear-gradient(to right, #000 calc(100% - 24px), transparent)"
        }}
      >
        {availableRooms.map((room) => {
          const progress = getRoomProgress(room, answers, skippedQuestions);
          const { handled, isComplete: complete } = progress;
          const started = progress.isStarted && !complete;
          const active = room.id === activeRoom;

          return (
            <li key={room.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelectRoom(room.id)}
                aria-current={active ? "step" : undefined}
                aria-label={`${room.title}, ${handled} von ${room.questions.length} Objekten bearbeitet`}
                className={cn(
                  "inline-flex min-h-8 items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 text-[11px] font-semibold transition-colors md:text-xs",
                  focusRingTool,
                  active
                    ? "bg-[var(--color-forest)] text-white"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]"
                )}
              >
                {complete ? (
                  <Check
                    className={cn("size-3 shrink-0", active ? "text-white" : "text-[var(--color-forest)]")}
                    aria-hidden
                  />
                ) : started ? (
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      active ? "bg-white" : "bg-[var(--color-forest)]"
                    )}
                    aria-hidden
                  />
                ) : null}
                <span className="whitespace-nowrap">{room.shortTitle}</span>
                <span className={cn("tabular-nums", active ? "text-white/70" : "text-[var(--color-ink)]/35")}>
                  {handled}/{room.questions.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
