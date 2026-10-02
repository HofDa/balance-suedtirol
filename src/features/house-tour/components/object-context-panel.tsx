"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, MousePointer2, Pencil, SkipForward } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import { isAdjusted, quantityFor } from "../model/calculator";
import { challengeFor, estimateSpec } from "../model/game";
import { useTourI18n } from "../i18n/context";
import { AdjustControl } from "./metric-readout";
import { ProgressSummary } from "./panel-progress";
import { RoomCompleteView } from "./room-complete-view";
import { RoomNavigation } from "./room-navigation";
import { EstimateChallenge, QuizChallenge } from "./game/challenge-stage";
import { RevealStage } from "./game/reveal-stage";
import { KnowledgeCardContent, KnowledgeSheet } from "./game/knowledge-card";
import type { GuessRecord, RoomId, TourQuestion, TourRoom } from "../model/types";
import { AUTO_ADVANCE_MS, useQuestionMetrics, useQuestionPanelInteraction } from "../hooks/use-question-panel";

type Stage = "answer" | "challenge" | "reveal";
const stages: Stage[] = ["answer", "challenge", "reveal"];

/** Wo die Runde steht: drei Schritte, der aktuelle benannt. */
function StageTrack({ stage }: { stage: Stage }) {
  const { t } = useTourI18n();
  const index = stages.indexOf(stage);
  const stageLabel: Record<Stage, string> = { answer: t.stage.answer, challenge: t.stage.guess, reveal: t.stage.reveal };
  return (
    <span className="flex items-center gap-2 text-[11px] font-semibold text-[var(--color-forest)]">
      <span className="flex gap-1" aria-hidden>
        {stages.map((item, position) => (
          <span
            key={item}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              position === index ? "w-5 bg-[var(--color-forest)]" : position < index ? "w-1.5 bg-[var(--color-forest)]/60" : "w-1.5 bg-[var(--color-ink)]/15"
            )}
          />
        ))}
      </span>
      <span>
        <span className="sr-only">{t.panel.stepOf(index + 1)}</span>
        {stageLabel[stage]}
      </span>
    </span>
  );
}

const footerClass =
  "sticky bottom-0 -mx-4 mt-4 flex items-center gap-2 border-t border-[var(--color-line)] bg-white px-4 py-2 md:static md:mx-0 md:mt-6 md:border-0 md:p-0";
const quietButton = cn(
  "inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-md)] px-3 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]",
  focusRingTool
);
const primaryButton = cn(
  "relative isolate ml-auto inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-forest)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-ink)] md:min-h-11 md:px-5",
  focusRingTool
);

export function ObjectContextPanel({
  room,
  question,
  questionIndex,
  objectOpen,
  answers,
  adjustments,
  skippedQuestions,
  guesses,
  cardsRead,
  nextRoom,
  allComplete,
  locale,
  onAnswer,
  onAdjust,
  onClearAdjust,
  onGuess,
  onReadCard,
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
  guesses: Record<string, GuessRecord>;
  cardsRead: Record<string, true>;
  nextRoom?: TourRoom;
  allComplete: boolean;
  locale: Locale;
  onAnswer: (questionId: string, optionId: string) => void;
  onAdjust: (questionId: string, quantity: number) => void;
  onClearAdjust: (questionId: string) => void;
  onGuess: (questionId: string, record: GuessRecord) => void;
  onReadCard: (questionId: string) => void;
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
  const { t } = useTourI18n();
  const selected = answers[question.id];
  const record = guesses[question.id];
  const challenge = useMemo(
    () => (selected ? challengeFor(question.id, answers, adjustments) : null),
    [question.id, selected, answers, adjustments]
  );

  // Die Runde eines Gegenstands: Antwort, Herausforderung, Auflösung. Wer
  // zurückkommt, landet dort, wo er war — ein beantworteter Gegenstand mit
  // Tipp zeigt direkt die Auflösung.
  // Der Schritt wird beim Öffnen eines Gegenstands einmal festgelegt und
  // danach nur noch bewusst gewechselt; sonst sprang die Runde schon beim
  // Antippen einer Option zur Schätzung, bevor der Regler gesetzt war.
  const initialStage: Stage = !selected ? "answer" : record || !challenge ? "reveal" : "challenge";
  const [stageFor, setStageFor] = useState<{ id: string; stage: Stage }>({ id: question.id, stage: initialStage });
  if (stageFor.id !== question.id) setStageFor({ id: question.id, stage: initialStage });
  const stage = stageFor.id === question.id ? stageFor.stage : initialStage;
  const goStage = (next: Stage) => setStageFor({ id: question.id, stage: next });
  const [cardOpen, setCardOpen] = useState(false);
  // Jeder Schritt beginnt oben; sonst stand die neue Frage halb abgeschnitten
  // unter der Scrollposition des vorigen Schritts.
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [question.id, stage]);

  const proceedFromAnswer = () => {
    if (!answers[question.id]) return;
    goStage(challenge && !record ? "challenge" : "reveal");
  };

  const {
    direction, slide, advancing, choose, roomHandled, roomDone, moreObjectsOpen,
    selectedOption, onTouchStart, onTouchEnd, cancelAdvance,
  } = useQuestionPanelInteraction({
    room, question, questionIndex,
    // Ziffern und Enter wählen nur im Antwortschritt.
    objectOpen: objectOpen && stage === "answer",
    answers, skippedQuestions, onAnswer, onContinue: proceedFromAnswer, onGoTo, reduceMotion
  });
  const { selectedValues, saving } = useQuestionMetrics(question, answers, adjustments);
  const firstEver = Object.keys(answers).length === 0;

  const recordGuess = (next: GuessRecord) => {
    onGuess(question.id, next);
    goStage("reveal");
  };
  const openCard = () => {
    setCardOpen(true);
    onReadCard(question.id);
  };

  // Ein Tipp, der zu einer inzwischen geänderten Antwort gehört, behält seine
  // Wertung, aber die Skala würde zwei verschiedene Fragen vergleichen.
  const estimateIsCurrent =
    record?.kind !== "estimate" ||
    (challenge?.kind === "estimate" && Math.abs(record.actual - challenge.actual) / challenge.actual < 0.01);
  const revealSpec = challenge?.kind === "estimate" ? challenge.spec : estimateSpec(question.id, answers);

  const back = questionIndex > 0 && (
    <button
      type="button"
      onClick={() => {
        cancelAdvance();
        onBack();
      }}
      className={quietButton}
    >
      <ChevronLeft className="size-4" aria-hidden />
      {t.panel.back}
    </button>
  );

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
      <ProgressSummary room={room} roomHandled={roomHandled} />

      <div
        ref={scrollRef}
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
              guesses={guesses}
              cardsRead={cardsRead}
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
              <h2 className="text-2xl font-semibold leading-tight tracking-[-0.025em] md:mt-5">
                {t.panel.discover(question.sceneLabel)}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {t.panel.objectOf(room.title, questionIndex + 1, room.questions.length)}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-6">
                <button type="button" onClick={onOpenObject} className={cn(primaryButton, "ml-0")}>
                  {t.panel.openObject(question.sceneLabel)}
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`${question.id}-${stage}`}
              custom={direction}
              variants={slide}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? undefined : "exit"}
              className="mx-auto max-w-xl"
            >
              <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
                <Label size="dense" className="shrink-0">
                  {room.title} · {questionIndex + 1}/{room.questions.length}
                </Label>
                <StageTrack stage={stage} />
              </div>

              {stage === "answer" && (
                <>
                  <h2 id="question-title" className="text-lg font-semibold leading-tight tracking-[-0.025em] md:text-2xl md:leading-snug">
                    {question.title}
                  </h2>
                  {firstEver && (
                    <p className="mt-1.5 text-xs leading-5 text-[var(--color-muted)]">{t.answerHint}</p>
                  )}
                  <p className="mt-5 hidden text-[11px] text-[var(--color-muted)] md:block">
                    {t.panel.keys.keys} <kbd className="font-semibold tabular-nums">1</kbd>–
                    <kbd className="font-semibold tabular-nums">{question.options.length}</kbd> {t.panel.keys.choose}{" "}
                    <kbd className="font-semibold">Enter</kbd> {t.panel.keys.next}
                  </p>

                  {/* Antworten ohne Zahlen: wer sie vorher sieht, wählt leicht die
                      „gute“ statt der zutreffenden Option. */}
                  <div className="mt-3 grid gap-1.5 md:mt-1.5 md:gap-2.5" role="radiogroup" aria-labelledby="question-title">
                    {question.options.map((option) => {
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
                                active ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white" : "border-[var(--color-line)]"
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
                            <span className="min-w-0 flex-1">
                              {option.label}
                              {option.regionalAverage && (
                                <span className="ml-2 inline-flex translate-y-[-1px] items-center rounded-[var(--radius-sm)] bg-[var(--color-sage)] px-2 py-0.5 align-middle text-[11px] font-semibold text-[var(--color-forest)]">
                                  {t.panel.southTyrol}
                                </span>
                              )}
                            </span>
                          </motion.button>
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

                  <div className={footerClass}>
                    {back}
                    {selected ? (
                      <button
                        type="button"
                        onClick={() => {
                          cancelAdvance();
                          proceedFromAnswer();
                        }}
                        className={primaryButton}
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
                        {challenge && !record ? t.stage.guess : t.continue}
                        <ChevronRight className="size-4" aria-hidden />
                      </button>
                    ) : (
                      <button type="button" onClick={onSkip} className={cn(quietButton, "ml-auto min-h-12 md:min-h-11")}>
                        <SkipForward className="size-3.5" aria-hidden />
                        {t.panel.skip}
                      </button>
                    )}
                  </div>
                </>
              )}

              {stage === "challenge" && challenge?.kind === "estimate" && (
                <EstimateChallenge
                  questionId={question.id}
                  spec={challenge.spec}
                  onSubmit={(guess) => recordGuess({ kind: "estimate", guess, actual: challenge.actual })}
                  footer={(submit) => (
                    <div className={footerClass}>
                      <button type="button" onClick={() => recordGuess({ kind: "skipped" })} className={quietButton}>
                        {t.guessSkip}
                      </button>
                      <button type="button" onClick={submit} className={primaryButton}>
                        {t.guessSubmit}
                        <ChevronRight className="size-4" aria-hidden />
                      </button>
                    </div>
                  )}
                />
              )}

              {stage === "challenge" && challenge?.kind === "quiz" && (
                <QuizChallenge
                  questionId={question.id}
                  onChoose={(choice) => recordGuess({ kind: "quiz", choice })}
                  footer={
                    <div className={footerClass}>
                      <button type="button" onClick={() => recordGuess({ kind: "skipped" })} className={cn(quietButton, "ml-auto")}>
                        {t.guessSkip}
                      </button>
                    </div>
                  }
                />
              )}

              {(stage === "reveal" || (stage === "challenge" && !challenge)) && selectedOption && (
                <>
                  <h2 className="sr-only">{question.title}: {t.stage.reveal}</h2>
                  <RevealStage
                    questionId={question.id}
                    record={estimateIsCurrent ? record : undefined}
                    spec={revealSpec}
                    values={selectedValues}
                    saving={saving}
                    impact={selectedOption.impact}
                    cardRead={Boolean(cardsRead[question.id])}
                    onOpenCard={openCard}
                    footer={
                      <div className={footerClass}>
                        <button type="button" onClick={() => goStage("answer")} className={quietButton}>
                          <Pencil className="size-3.5" aria-hidden />
                          {t.changeAnswer}
                        </button>
                        <button
                          type="button"
                          autoFocus
                          onClick={() => {
                            cancelAdvance();
                            onContinue();
                          }}
                          className={primaryButton}
                        >
                          {moreObjectsOpen ? t.continue : t.finishRoom}
                          <ChevronRight className="size-4" aria-hidden />
                        </button>
                      </div>
                    }
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <KnowledgeSheet open={cardOpen} onClose={() => setCardOpen(false)} title={question.sceneLabel} imageId={question.id}>
        <KnowledgeCardContent question={question} option={selectedOption} values={selectedValues} locale={locale} />
      </KnowledgeSheet>
    </section>
  );
}
