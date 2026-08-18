"use client";

import { BarChart3, CheckCircle2, ChevronRight, MousePointer2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type { Locale } from "@/config/site";
import { availableRooms } from "../config/rooms";
import { getRoomProgress } from "../model/scoring";
import type { RoomId } from "../model/types";

const headlineByLocale: Record<Locale, string> = {
  de: "Hinter jedem Gegenstand steckt eine Verbindung zur Natur.",
  it: "Ogni oggetto racchiude un legame con la natura.",
  en: "Every object has a connection to nature."
};

export function HouseDiscoveryIntro({
  completedObjects,
  totalObjects,
  locale,
  answers,
  skippedQuestions,
  onSelectRoom,
  onResults
}: {
  completedObjects: number;
  totalObjects: number;
  locale: Locale;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  onSelectRoom: (id: RoomId) => void;
  onResults: () => void;
}) {
  // Wer schon einmal hier war, braucht keine Anleitung, sondern die nächste
  // offene Frage. Der Spielstand liegt längst im Browser — er wurde nur nie
  // angeboten.
  const resumeRoom = availableRooms.find((room) =>
    room.questions.some((item) => !answers[item.id] && !skippedQuestions[item.id])
  );
  const resuming = completedObjects > 0;

  if (resuming) {
    const handled = resumeRoom
      ? getRoomProgress(resumeRoom, answers, skippedQuestions).handled
      : 0;

    return (
      <section className="flex h-full min-h-0 flex-col justify-center overflow-y-auto bg-white px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-lg">
          <Label size="dense">Dein Lebensraum-Check</Label>
          <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
            {resumeRoom ? "Weiter, wo du aufgehört hast." : "Alle Objekte erfasst."}
          </h1>

          <div className="mt-5">
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-semibold">Hausfortschritt</span>
              <span className="tabular-nums text-[var(--color-muted)]">
                {completedObjects} / {totalObjects} Objekte
              </span>
            </div>
            <div className="mt-2">
              <Progress
                value={totalObjects ? (completedObjects / totalObjects) * 100 : 0}
                label={`${completedObjects} von ${totalObjects} Objekten bearbeitet`}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {resumeRoom ? (
              <button
                type="button"
                onClick={() => onSelectRoom(resumeRoom.id)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white",
                  focusRingTool
                )}
              >
                Weiter: {resumeRoom.title}
                <span className="tabular-nums text-white/70">
                  {handled}/{resumeRoom.questions.length}
                </span>
                <ChevronRight className="size-4" aria-hidden />
              </button>
            ) : null}

            <button
              type="button"
              onClick={onResults}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-4 text-sm font-semibold text-[var(--color-forest)]",
                focusRingTool
              )}
            >
              <BarChart3 className="size-4" aria-hidden />
              Bilanz ansehen
            </button>
          </div>

          <p className="mt-5 text-xs leading-5 text-[var(--color-muted)]">
            Du kannst auch direkt im Haus einen Raum wählen. Jede Antwort lässt sich später ändern.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col justify-center overflow-y-auto bg-white px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-lg">
        <Label size="dense">Interaktiver Lebensraum-Check</Label>
        <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
          {headlineByLocale[locale]}
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
          Wähle direkt im Haus einen Raum. Darin führen dich alltägliche Gegenstände Schritt für Schritt zu ihren Verbindungen mit Lebensräumen und Biodiversität.
        </p>

        <ol className="mt-7 grid gap-3" aria-label="So funktioniert der Lebensraum-Check">
          {[
            { icon: MousePointer2, title: "Raum wählen", copy: "Klicke direkt auf einen Raum im Haus." },
            { icon: Search, title: "Objekt entdecken", copy: "Der Raum tritt zurück, ein Objekt steht im Licht." },
            { icon: CheckCircle2, title: "Zusammenhang verstehen", copy: "Eine kurze Frage zeigt die ökologische Verbindung." }
          ].map(({ icon: Icon, title, copy }, index) => (
            <li key={title} className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] p-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
                <Icon className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  <span className="mr-1.5 text-[var(--color-muted)]">{index + 1}.</span>
                  {title}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-[var(--color-muted)]">{copy}</p>
              </div>
            </li>
          ))}
        </ol>

        {availableRooms[0] && (
          <button
            type="button"
            onClick={() => onSelectRoom(availableRooms[0].id)}
            className={cn(
              "mt-6 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white",
              focusRingTool
            )}
          >
            Im {availableRooms[0].title} beginnen
            <ChevronRight className="size-4" aria-hidden />
          </button>
        )}
      </div>
    </section>
  );
}
