"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Leaf,
  MousePointer2,
  SkipForward,
  TrendingDown
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import {
  bestCaseSavingFromValues,
  hasValues,
  isAdjusted,
  optionValues,
  quantityFor,
  summarizeValues
} from "../model/calculator";
import { AdjustControl, InputImpactFeedback, ValueRow } from "./metric-readout";
import { ProgressSummary } from "./panel-progress";
import { QuestionDetails } from "./question-details";
import { RoomCompleteView } from "./room-complete-view";
import { RoomNavigation } from "./room-navigation";
import type { AnnualValues, RoomId, TourQuestion, TourRoom } from "../model/types";
import { getRoomProgress } from "../model/scoring";

export function ObjectContextPanel({
  room,
  question,
  questionIndex,
  objectOpen,
  answers,
  adjustments,
  skippedQuestions,
  totals,
  nextRoom,
  allComplete,
  locale,
  onAnswer,
  onAdjust,
  onClearAdjust,
  onContinue,
  onSkip,
  onBack,
  onOpenObject,
  onHouse,
  onSelectRoom,
  onNextRoom,
  onResults
}: {
  room: TourRoom;
  question: TourQuestion;
  questionIndex: number;
  objectOpen: boolean;
  answers: Record<string, string>;
  adjustments: Record<string, number>;
  skippedQuestions: Record<string, boolean>;
  totals: AnnualValues;
  nextRoom?: TourRoom;
  allComplete: boolean;
  locale: Locale;
  onAnswer: (questionId: string, optionId: string) => void;
  onAdjust: (questionId: string, quantity: number) => void;
  onClearAdjust: (questionId: string) => void;
  onContinue: () => void;
  onSkip: () => void;
  onBack: () => void;
  onOpenObject: () => void;
  onHouse: () => void;
  onSelectRoom: (id: RoomId) => void;
  onNextRoom: () => void;
  onResults: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [adjustOpen, setAdjustOpen] = useState(false);
  const roomProgress = getRoomProgress(room, answers, skippedQuestions);
  const roomHandled = roomProgress.handled;
  const roomDone = roomProgress.isComplete;
  // Sagt dem Weiter-Knopf, wohin er führt: zum nächsten Objekt oder zum
  // Raumabschluss. Ein Knopf, der nicht verrät, was er auslöst, ist ein Sprung.
  const moreObjectsOpen = room.questions.some(
    (item, index) =>
      index !== questionIndex && !answers[item.id] && !skippedQuestions[item.id]
  );
  const selected = answers[question.id];
  const selectedOption = question.options.find((option) => option.id === selected);

  /**
   * Der schnelle Weg für alle, die 21 Objekte hintereinander durchgehen:
   * Ziffer wählt, Enter geht weiter. Eingabefelder und bereits fokussierte
   * Bedienelemente behalten ihre eigene Tastenbelegung.
   */
  useEffect(() => {
    if (!objectOpen || roomDone) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (target?.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        return;
      }

      const choice = Number(event.key);
      if (Number.isInteger(choice) && choice >= 1 && choice <= question.options.length) {
        event.preventDefault();
        onAnswer(question.id, question.options[choice - 1].id);
        return;
      }

      // Enter auf einem fokussierten Knopf löst dessen eigene Aktion aus;
      // ein zweiter Weiter-Sprung von hier wäre ein übersprungenes Objekt.
      if (event.key === "Enter" && selected && tag !== "BUTTON" && tag !== "A" && tag !== "SUMMARY") {
        event.preventDefault();
        onContinue();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [objectOpen, roomDone, question, selected, onAnswer, onContinue]);

  // Einheiten über alle Optionen einer Frage angleichen, sonst steht „16,4 m³“
  // über „6.390 L“ und die Zeilen lassen sich nicht vergleichen.
  const optionResults = useMemo(
    () => question.options.map((option) => ({
      option,
      values: optionValues(question.id, option.id, answers, adjustments)
    })),
    [question, answers, adjustments]
  );
  const scale = optionResults.reduce<AnnualValues>(
    (result, { values }) => ({
      co2Kg: Math.max(result.co2Kg, values.co2Kg),
      waterL: Math.max(result.waterL, values.waterL),
      energyKwh: Math.max(result.energyKwh, values.energyKwh)
    }),
    { co2Kg: 0, waterL: 0, energyKwh: 0 }
  );
  const selectedResult = optionResults.find(({ option }) => option.id === selected);
  const selectedValues = selectedResult?.values ?? null;
  const saving = selectedValues
    ? bestCaseSavingFromValues(selectedValues, optionResults.map(({ values }) => values))
    : null;

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <RoomNavigation
        activeRoom={room.id}
        answers={answers}
        skippedQuestions={skippedQuestions}
        onSelectRoom={onSelectRoom}
        onHouse={onHouse}
      />
      <ProgressSummary room={room} roomHandled={roomHandled} totals={totals} />

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 md:px-6 md:py-6">
        <AnimatePresence mode="wait" initial={false}>
          {roomDone && !objectOpen ? (
            <RoomCompleteView
              key={`${room.id}-complete`}
              room={room}
              answers={answers}
              adjustments={adjustments}
              totals={totals}
              nextRoom={nextRoom}
              allComplete={allComplete}
              reduceMotion={reduceMotion}
              onResults={onResults}
              onNextRoom={onNextRoom}
              onHouse={onHouse}
            />
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
                Jeder Gegenstand führt zu einer kurzen Frage über deinen Alltag. Öffne das markierte
                Objekt hier oder tippe direkt auf den Gegenstand im Raum.
              </p>

              {/* Der Szenenklick bleibt möglich, ist aber kein Nadelöhr mehr:
                  ohne diesen Knopf endet der Weiter-Weg in einer Sackgasse. */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenObject}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white",
                    focusRingTool
                  )}
                >
                  {question.sceneLabel} öffnen
                  <ChevronRight className="size-4" aria-hidden />
                </button>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-forest)]">
                  <span className="size-2 animate-pulse rounded-full bg-[var(--color-forest)]" aria-hidden />
                  Im Raum hervorgehoben
                </span>
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

              {/* „pro Jahr“ einmal als Spaltenkopf statt implizit in jeder
                  Zeile: die Zahlen rechts sind Jahreswerte, keine Preise. */}
              <p className="mt-3 flex items-baseline justify-between gap-3 text-[11px] text-[var(--color-muted)] md:mt-5">
                <span className="hidden md:inline">
                  Tasten <kbd className="font-semibold tabular-nums">1</kbd>–
                  <kbd className="font-semibold tabular-nums">{question.options.length}</kbd> wählen,{" "}
                  <kbd className="font-semibold">Enter</kbd> weiter
                </span>
                {hasValues(scale) && <span className="ml-auto">Werte pro Jahr</span>}
              </p>

              <div
                className="mt-1.5 grid gap-1.5 md:gap-2.5"
                role="radiogroup"
                aria-labelledby="question-title"
              >
                {optionResults.map(({ option, values }) => {
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
                      <span className="min-w-0 flex-1">{option.label}</span>
                      {hasValues(values) ? (
                        <ValueRow
                          values={values}
                          scale={scale}
                          className="shrink-0 justify-end text-right text-[11px] font-normal md:text-xs"
                        />
                      ) : question.scopeNote ? null : (
                        <span className="shrink-0 text-[11px] font-normal text-[var(--color-muted)]">
                          keine direkten Emissionen
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {question.adjust && selected && (
                <AdjustControl
                  adjust={question.adjust}
                  questionId={question.id}
                  quantity={quantityFor(question, selected, adjustments)}
                  isCustom={isAdjusted(question.id, adjustments)}
                  open={adjustOpen}
                  onToggle={() => setAdjustOpen((prev) => !prev)}
                  onChange={(quantity) => onAdjust(question.id, quantity)}
                  onReset={() => onClearAdjust(question.id)}
                />
              )}

              {selectedOption && selectedValues && (
                <>
                  <InputImpactFeedback
                    values={selectedValues}
                    scale={scale}
                    impact={selectedOption.impact}
                    totals={totals}
                  />
                  <p className="mt-3 text-xs leading-5 text-[var(--color-ink)] md:text-sm md:leading-6">
                    {question.impactText}
                  </p>
                </>
              )}

              {/* Was die beste Antwort auf genau diese Frage noch einsparen würde. */}
              {saving && hasValues(saving) && (
                <div className="mt-3 flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 md:px-4">
                  <TrendingDown className="mt-0.5 size-4 shrink-0 text-[var(--color-forest)]" aria-hidden />
                  <p className="text-xs leading-5">
                    <span className="font-semibold">Noch möglich: </span>
                    <span className="text-[var(--color-muted)]">
                      {summarizeValues(saving, scale)} weniger im Jahr mit der sparsamsten Antwort auf diese Frage.
                    </span>
                  </p>
                </div>
              )}

              <QuestionDetails question={question} locale={locale} />

              {/* Vorwärts, zurück und überspringen an einem Ort: der Weg durch
                  den Raum darf nicht davon abhängen, ob man die Szene trifft. */}
              <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-4">
                {questionIndex > 0 && (
                  <button
                    type="button"
                    onClick={onBack}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-md)] px-3 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]",
                      focusRingTool
                    )}
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                    Zurück
                  </button>
                )}

                {selected ? (
                  <button
                    type="button"
                    onClick={onContinue}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white",
                      focusRingTool
                    )}
                  >
                    {moreObjectsOpen ? "Weiter" : "Raum abschließen"}
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSkip}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-3 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]",
                      focusRingTool
                    )}
                  >
                    <SkipForward className="size-3.5" aria-hidden />
                    Überspringen
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
