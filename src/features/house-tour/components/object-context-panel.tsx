"use client";

import {
  Check,
  CheckCircle2,
  ChevronRight,
  Home,
  Leaf,
  MousePointer2,
  SkipForward
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import type { PanelTab, TourQuestion, TourRoom } from "../model/types";

const completionCopy: Partial<Record<TourRoom["id"], string>> = {
  bath: "Du hast erkundet, wie Wasserverbrauch und Alltagsprodukte mit Gewässern und natürlichen Ressourcen zusammenhängen.",
  bedroom: "Du hast erkundet, wie Wärme, Textilien und Elektronik Ressourcen und Lebensräume beeinflussen.",
  living: "Du hast erkundet, wie Energie, Geräte und Materialien mit der Biodiversität verbunden sind.",
  kitchen: "Du hast erkundet, wie Ernährung, Herkunft und Abfälle Flächen und Lebensräume beeinflussen.",
  mobility: "Du hast erkundet, wie unsere Wege Energie, Flächen und die Qualität lokaler Lebensräume prägen.",
  garden: "Du hast erkundet, wie Boden, Pflanzen und Strukturen direkt neue Lebensräume schaffen."
};

function ProgressBar({ value, total }: { value: number; total: number }) {
  const width = total ? Math.min(100, (value / total) * 100) : 0;
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-ink)]/8" aria-hidden>
      <motion.div
        className="h-full rounded-full bg-[var(--color-forest)]"
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}

function ProgressSummary({
  room,
  roomHandled,
  houseHandled,
  houseTotal
}: {
  room: TourRoom;
  roomHandled: number;
  houseHandled: number;
  houseTotal: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 border-b border-[var(--color-line)] bg-[var(--color-paper)]/65 px-3 py-2.5 md:gap-3 md:px-6 md:py-4">
      <div className="min-w-0">
        <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] md:mb-2 md:text-xs">
          <span className="truncate font-semibold">{room.title}</span>
          <span className="tabular-nums text-[var(--color-muted)]">
            {roomHandled} / {room.questions.length}
          </span>
        </div>
        <ProgressBar value={roomHandled} total={room.questions.length} />
      </div>
      <div className="min-w-0">
        <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] md:mb-2 md:text-xs">
          <span className="truncate font-semibold">
            <span className="md:hidden">Haus</span>
            <span className="hidden md:inline">Hausfortschritt</span>
          </span>
          <span className="tabular-nums text-[var(--color-muted)]">
            {houseHandled} / {houseTotal}
            <span className="hidden md:inline"> Objekte</span>
          </span>
        </div>
        <ProgressBar value={houseHandled} total={houseTotal} />
      </div>
    </div>
  );
}

export function ObjectContextPanel({
  room,
  question,
  questionIndex,
  objectOpen,
  answers,
  skippedQuestions,
  tab,
  houseHandled,
  houseTotal,
  nextRoom,
  allComplete,
  onAnswer,
  onContinue,
  onSkip,
  onEdit,
  onHouse,
  onNextRoom,
  onResults
}: {
  room: TourRoom;
  question: TourQuestion;
  questionIndex: number;
  objectOpen: boolean;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  tab: PanelTab;
  houseHandled: number;
  houseTotal: number;
  nextRoom?: TourRoom;
  allComplete: boolean;
  onAnswer: (questionId: string, optionId: string) => void;
  onContinue: () => void;
  onSkip: () => void;
  onEdit: () => void;
  onHouse: () => void;
  onNextRoom: () => void;
  onResults: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const roomHandled = room.questions.filter(
    (item) => answers[item.id] || skippedQuestions[item.id]
  ).length;
  const roomDone = roomHandled === room.questions.length;
  const selected = answers[question.id];
  const selectedOption = question.options.find((option) => option.id === selected);
  const showFeedback = Boolean(selectedOption && tab === "impact");

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-white" aria-live="polite">
      <ProgressSummary
        room={room}
        roomHandled={roomHandled}
        houseHandled={houseHandled}
        houseTotal={houseTotal}
      />

      <div className="min-h-0 flex-1 overflow-hidden px-3 py-3 md:overflow-y-auto md:px-6 md:py-8">
        <AnimatePresence mode="wait" initial={false}>
          {roomDone ? (
            <motion.div
              key={`${room.id}-complete`}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto flex h-full max-w-lg flex-col justify-center"
            >
              <span className="grid size-11 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
                <CheckCircle2 className="size-5" aria-hidden />
              </span>
              <Label size="dense" className="mt-5">Raum abgeschlossen</Label>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
                {room.title} erkundet
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                {completionCopy[room.id] ?? room.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={allComplete ? onResults : onNextRoom}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white",
                    focusRingTool
                  )}
                >
                  {allComplete ? "Ergebnis ansehen" : `Weiter zu ${nextRoom?.title ?? "nächsten Raum"}`}
                  <ChevronRight className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={onHouse}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-4 text-sm font-semibold text-[var(--color-forest)]",
                    focusRingTool
                  )}
                >
                  <Home className="size-4" aria-hidden />
                  Haus ansehen
                </button>
              </div>
            </motion.div>
          ) : !objectOpen ? (
            <motion.div
              key={`${question.id}-discover`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto flex h-full max-w-lg flex-col justify-center"
            >
              <span className="grid size-11 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
                <MousePointer2 className="size-5" aria-hidden />
              </span>
              <Label size="dense" className="mt-5">
                {room.title} · Objekt {questionIndex + 1} von {room.questions.length}
              </Label>
              <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.025em]">
                Entdecke: {question.sceneLabel}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-muted)]">
                Das nächste Objekt leuchtet im Haus sanft auf. Klicke darauf, um seine Verbindung zu Biodiversität und Lebensräumen zu entdecken.
              </p>
              <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-forest)]/25 bg-[var(--color-paper)] px-3 py-2 text-xs font-semibold text-[var(--color-forest)]">
                <span className="size-2 animate-pulse rounded-full bg-[var(--color-forest)]" aria-hidden />
                Im Haus hervorgehoben
              </div>
            </motion.div>
          ) : showFeedback && selectedOption ? (
            <motion.div
              key={`${question.id}-feedback`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-xl"
            >
              <Label size="dense">{room.title} · Entdeckung abgeschlossen</Label>
              <div className="mt-4 flex gap-3 rounded-[var(--radius-lg)] bg-[var(--color-sage)]/55 p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-forest)] text-white">
                  <Check className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold">{selectedOption.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-ink)]">
                    {question.impactText}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onContinue}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white",
                    focusRingTool
                  )}
                >
                  Weiter entdecken
                  <ChevronRight className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={onEdit}
                  className={cn("min-h-11 text-sm font-semibold text-[var(--color-forest)]", focusRingTool)}
                >
                  Antwort ändern
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`${question.id}-question`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-xl"
            >
              <div className="flex min-w-0 items-center justify-between gap-3">
                <Label size="dense" className="shrink-0">
                  {room.title} · {questionIndex + 1}/{room.questions.length}
                </Label>
                <p className="flex min-w-0 items-center gap-1.5 truncate text-[11px] font-semibold text-[var(--color-forest)] md:hidden">
                  <Leaf className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">{question.sceneLabel}</span>
                </p>
              </div>
              <div className="mt-2 hidden items-center gap-3 md:flex">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-paper)] text-[var(--color-forest)]">
                  <Leaf className="size-4" aria-hidden />
                </span>
                <p className="text-sm font-semibold text-[var(--color-forest)]">{question.sceneLabel}</p>
              </div>
              <h2 id="question-title" className="mt-2 text-lg font-semibold leading-tight tracking-[-0.025em] md:mt-4 md:text-2xl md:leading-snug">
                {question.title}
              </h2>

              <div className="mt-3 grid gap-1.5 md:mt-5 md:gap-2.5" role="radiogroup" aria-labelledby="question-title">
                {question.options.map((option) => {
                  const active = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => onAnswer(question.id, option.id)}
                      className={cn(
                        "flex min-h-10 items-center gap-2.5 rounded-[var(--radius-md)] border px-3 py-2 text-left text-xs font-semibold leading-4 transition md:min-h-14 md:gap-3 md:rounded-[var(--radius-lg)] md:px-4 md:py-3 md:text-sm md:leading-5",
                        focusRingTool,
                        active
                          ? "border-[var(--color-forest)] bg-[var(--color-sage)]/45"
                          : "border-[var(--color-line)] hover:border-[var(--color-forest)]/40 hover:bg-[var(--color-paper)]"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full border",
                          active
                            ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                            : "border-[var(--color-line)]"
                        )}
                      >
                        {active && <Check className="size-3" aria-hidden />}
                      </span>
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <p className="mt-2 line-clamp-2 rounded-[var(--radius-md)] bg-[var(--color-paper)] px-3 py-2 text-[11px] leading-4 text-[var(--color-muted)] md:mt-5 md:block md:px-4 md:py-3 md:text-xs md:leading-5">
                {question.description}
              </p>

              <button
                type="button"
                onClick={onSkip}
                className={cn(
                  "mt-1 inline-flex min-h-8 items-center gap-2 text-[11px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)] md:mt-4 md:min-h-11 md:text-xs",
                  focusRingTool
                )}
              >
                <SkipForward className="size-3.5" aria-hidden />
                Überspringen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
