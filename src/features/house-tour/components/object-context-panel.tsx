"use client";

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
  hasValues,
  isAdjusted,
  quantityFor,
  summarizeValues
} from "../model/calculator";
import { AdjustControl, InputImpactFeedback, ValueRow } from "./metric-readout";
import { ProgressSummary } from "./panel-progress";
import { QuestionDetails } from "./question-details";
import { RoomCompleteView } from "./room-complete-view";
import { RoomNavigation } from "./room-navigation";
import type { AnnualValues, RoomId, TourQuestion, TourRoom } from "../model/types";
import { AUTO_ADVANCE_MS, useQuestionMetrics, useQuestionPanelInteraction } from "../hooks/use-question-panel";

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
  onGoTo,
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
  onGoTo: (questionIndex: number) => void;
  onOpenObject: () => void;
  onHouse: () => void;
  onSelectRoom: (id: RoomId) => void;
  onNextRoom: () => void;
  onResults: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const {
    direction, slide, advancing, choose, roomHandled, roomDone, moreObjectsOpen,
    selected, selectedOption, onTouchStart, onTouchEnd, cancelAdvance,
  } = useQuestionPanelInteraction({ room, question, questionIndex, objectOpen, answers, skippedQuestions, onAnswer, onContinue, onGoTo, reduceMotion });
  const { optionResults, scale, selectedValues, saving } = useQuestionMetrics(question, answers, adjustments);

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      {/* Mitten in einer Frage braucht mobil niemand den Raumwechsel; die
          Leiste kostet dort eine Zeile, die den Antworten fehlt. */}
      <div className={cn(objectOpen && !roomDone && "max-md:hidden")}>
        <RoomNavigation
          activeRoom={room.id}
          answers={answers}
          skippedQuestions={skippedQuestions}
          onSelectRoom={onSelectRoom}
          onHouse={onHouse}
        />
      </div>
      <ProgressSummary room={room} roomHandled={roomHandled} totals={totals} />

      <div
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pt-4 md:px-6 md:py-6"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
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
              className="mx-auto flex min-h-full max-w-lg flex-col justify-center pb-4"
            >
              <span className="hidden size-11 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)] md:grid">
                <MousePointer2 className="size-5" aria-hidden />
              </span>
              <Label size="dense" className="md:mt-5">
                {room.title} · Objekt {questionIndex + 1} von {room.questions.length}
              </Label>
              <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.025em]">
                Entdecke: {question.sceneLabel}
              </h2>
              <p className="mt-3 hidden max-w-md text-sm leading-6 text-[var(--color-muted)] md:block">
                Jeder Gegenstand führt zu einer kurzen Frage über deinen Alltag. Öffne das markierte
                Objekt hier oder tippe direkt auf den Gegenstand im Raum.
              </p>

              {/* Der Szenenklick bleibt möglich, ist aber kein Nadelöhr mehr:
                  ohne diesen Knopf endet der Weiter-Weg in einer Sackgasse. */}
              <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-6">
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
              custom={direction}
              variants={slide}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? undefined : "exit"}
              className="mx-auto max-w-xl"
            >
              <div className="flex min-w-0 items-center justify-between gap-3">
                <Label size="dense" className="shrink-0">
                  {room.title} · {questionIndex + 1}/{room.questions.length}
                </Label>
                {/* Mobil nennt die Objektleiste über dem Bild den Gegenstand schon. */}
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
                {hasValues(scale) && (
                  <span className="ml-auto">{selected ? "Werte pro Jahr" : "Zahlen nach deiner Antwort"}</span>
                )}
              </p>

              <div
                className="mt-1.5 grid gap-1.5 md:gap-2.5"
                role="radiogroup"
                aria-labelledby="question-title"
              >
                {optionResults.map(({ option, values }) => {
                  const active = selected === option.id;
                  return (
                    <div
                      key={option.id}
                      className={cn(
                        "overflow-hidden rounded-[var(--radius-md)] border transition md:rounded-[var(--radius-lg)]",
                        active
                          ? "border-[var(--color-forest)] bg-[var(--color-sage)]/45"
                          : "border-[var(--color-line)] hover:border-[var(--color-forest)]/40 hover:bg-[var(--color-paper)]"
                      )}
                    >
                    <motion.button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                      onClick={() => choose(option.id)}
                      className={cn(
                        "flex min-h-12 w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm font-semibold leading-5 md:min-h-14 md:gap-3 md:px-4 md:py-3",
                        focusRingTool
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
                        {active && (
                          <motion.span
                            className="grid place-items-center"
                            initial={reduceMotion ? false : { scale: 0.3, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 520, damping: 22 }}
                          >
                            <Check className="size-3" aria-hidden />
                          </motion.span>
                        )}
                      </span>
                      {/* Mobil stehen die Werte unter der Antwort: nebeneinander
                          blieb für den Antworttext kaum ein Drittel der Breite. */}
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5 md:flex-row md:items-center md:gap-3">
                        <span className="min-w-0 md:flex-1">
                          {option.label}
                          {option.regionalAverage && (
                            <span className="ml-2 inline-flex translate-y-[-1px] items-center rounded-full bg-[var(--color-sage)] px-2 py-0.5 align-middle text-[10px] font-semibold text-[var(--color-forest)]">
                              Südtirol-Schnitt
                            </span>
                          )}
                        </span>
                        {/* Die Zahlen erst nach der Antwort: wer sie vorher sieht,
                            wählt leicht die „gute“ statt der zutreffenden Option.
                            Danach stehen alle zum Vergleich da. */}
                        {selected && (
                          <motion.span
                            className="md:shrink-0"
                            initial={reduceMotion ? false : { opacity: 0, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            {hasValues(values) ? (
                              <ValueRow
                                values={values}
                                scale={scale}
                                className="text-[11px] font-normal md:justify-end md:text-right md:text-xs"
                              />
                            ) : question.scopeNote ? null : (
                              <span className="text-[11px] font-normal text-[var(--color-muted)]">
                                keine direkten Emissionen
                              </span>
                            )}
                          </motion.span>
                        )}
                      </span>
                    </motion.button>
                    {/* Wer den Durchschnitt wählt, soll sehen, woher er kommt. */}
                    {active && option.regionalAverage && (
                      <p className="px-3 pb-2.5 text-[11px] font-normal leading-4 text-[var(--color-muted)] md:px-4">
                        {option.regionalAverage.basis}{" "}
                        Quelle: {option.regionalAverage.source}.
                      </p>
                    )}
                    {active && question.adjust && (
                      <AdjustControl
                        adjust={question.adjust}
                        questionId={question.id}
                        quantity={quantityFor(question, option.id, adjustments)}
                        isCustom={isAdjusted(question.id, adjustments)}
                        onChange={(quantity) => onAdjust(question.id, quantity)}
                        onReset={() => onClearAdjust(question.id)}
                      />
                    )}
                    </div>
                  );
                })}
              </div>

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
              <div className="sticky bottom-0 -mx-4 mt-3 flex items-center gap-2 border-t border-[var(--color-line)] bg-white px-4 py-2 md:static md:mx-0 md:mt-4 md:flex-wrap md:border-0 md:p-0">
                {questionIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      cancelAdvance();
                      onBack();
                    }}
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
                    onClick={() => {
                      cancelAdvance();
                      onContinue();
                    }}
                    className={cn(
                      "relative isolate ml-auto inline-flex min-h-12 overflow-hidden items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-6 text-sm font-semibold text-white md:ml-0 md:min-h-11 md:px-5",
                      focusRingTool
                    )}
                  >
                    {/* Die Füllung zeigt, dass es gleich von selbst weitergeht. */}
                    {advancing && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-y-0 left-0 -z-10 bg-white/20"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                      />
                    )}
                    {moreObjectsOpen ? "Weiter" : "Raum abschließen"}
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSkip}
                    className={cn(
                      "ml-auto inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] px-3 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)] md:ml-0 md:min-h-11",
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
