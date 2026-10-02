"use client";

import { BarChart3, BookOpen, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { Progress } from "@/components/ui/progress";
import { useTourI18n } from "../i18n/context";
import { getRoomProgress } from "../model/scoring";
import type { Discovery } from "../model/game";
import type { RoomId } from "../model/types";

const primary = cn(
  "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-ink)]",
  focusRingTool
);
const quiet = cn(
  "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-3 text-sm font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-ink)]/5",
  focusRingTool
);

export function HouseDiscoveryIntro({
  progress,
  answers,
  skippedQuestions,
  onSelectRoom,
  onResults,
  onOpenFolder
}: {
  progress: Discovery;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  onSelectRoom: (id: RoomId) => void;
  onResults: () => void;
  onOpenFolder: () => void;
}) {
  const { t, rooms } = useTourI18n();
  const intro = t.intro;
  const handledAny = rooms.some((room) => getRoomProgress(room, answers, skippedQuestions).isStarted);
  // Wer schon einmal hier war, braucht keine Anleitung, sondern die nächste
  // offene Runde.
  const resumeRoom = rooms.find((room) =>
    room.questions.some((item) => !answers[item.id] && !skippedQuestions[item.id])
  );

  if (handledAny) {
    return (
      <section className="flex h-full min-h-0 flex-col overflow-y-auto bg-white px-4 py-5 sm:px-6 sm:py-8">
        <div className="m-auto w-full max-w-lg">
          <h1 className="text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
            {resumeRoom ? intro.resumeTitle : intro.doneTitle}
          </h1>

          <div className="mt-4">
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-semibold tabular-nums">{intro.foundOf(progress.found, progress.total)}</span>
              <span className="tabular-nums text-[var(--color-forest)]">{t.points(progress.points)}</span>
            </div>
            <div className="mt-2">
              <Progress value={(progress.found / progress.total) * 100} label={intro.foundAria(progress.found, progress.total)} />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {resumeRoom ? (
              <button type="button" onClick={() => onSelectRoom(resumeRoom.id)} className={primary}>
                {intro.continueRoom(resumeRoom.title)}
                <ChevronRight className="size-4" aria-hidden />
              </button>
            ) : (
              <button type="button" onClick={onResults} className={primary}>
                <BarChart3 className="size-4" aria-hidden />
                {intro.toResults}
              </button>
            )}
            <button type="button" onClick={onOpenFolder} className={quiet}>
              <BookOpen className="size-4" aria-hidden />
              {t.folder}
              <span className="tabular-nums text-[var(--color-muted)]">{progress.cardsRead}/{progress.total}</span>
            </button>
            {resumeRoom && (
              <button type="button" onClick={onResults} className={quiet}>
                <BarChart3 className="size-4" aria-hidden />
                {intro.results}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col overflow-y-auto bg-white px-4 py-5 sm:px-6 sm:py-8">
      <div className="m-auto w-full max-w-lg">
        <h1 className="text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
          {intro.headline}
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
          {intro.lead}
        </p>

        <ol className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4" aria-label={intro.loopAria}>
          {intro.loop.map((step, index) => (
            <li key={step.title} className="flex items-start gap-3 sm:block">
              <span className="flex items-center gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--color-forest)] text-xs font-semibold text-white tabular-nums">
                  {index + 1}
                </span>
                {index < intro.loop.length - 1 && (
                  <span className="hidden h-px flex-1 bg-[var(--color-forest)]/25 sm:block" aria-hidden />
                )}
              </span>
              <span className="sm:mt-2 sm:block">
                <span className="block text-sm font-semibold">{step.title}</span>
                <span className="block text-xs leading-5 text-[var(--color-muted)]">{step.copy}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-5 text-xs leading-5 text-[var(--color-muted)]">
          {intro.honesty}
        </p>

        {rooms[0] && (
          <button type="button" onClick={() => onSelectRoom(rooms[0].id)} className={cn(primary, "mt-5")}>
            {intro.start}
            <ChevronRight className="size-4" aria-hidden />
          </button>
        )}
      </div>
    </section>
  );
}
