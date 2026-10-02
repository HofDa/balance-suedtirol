"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Check, ChevronLeft, ChevronRight, MousePointer2, Pencil, SkipForward } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import { POINTS } from "../model/game";
import { useTourI18n } from "../i18n/context";
import { EverydayFeedback } from "./metric-readout";
import { AmountStep, KindStep, answerSummary, iconFor, stepsFor, type Step } from "./answer-input";
import { ProgressSummary } from "./panel-progress";
import { RoomCompleteView } from "./room-complete-view";
import { RoomNavigation } from "./room-navigation";
import { KnowledgeCardContent, KnowledgeSheet } from "./game/knowledge-card";
import type { RoomId, TourQuestion, TourRoom } from "../model/types";
import { useQuestionMetrics, useQuestionPanelInteraction } from "../hooks/use-question-panel";

/** Die Wissenskarte zum Gegenstand: das Warum hinter der eigenen Zahl. */
function CardButton({ read, onOpen }: { read: boolean; onOpen: () => void }) {
  const { t } = useTourI18n();
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "mt-3 flex min-h-12 w-full items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white px-3 text-left text-sm font-semibold transition-colors hover:border-[var(--color-forest)]/45 hover:bg-[var(--color-paper)]",
        focusRingTool
      )}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
        {read ? <Check className="size-4" aria-hidden /> : <BookOpen className="size-4" aria-hidden />}
      </span>
      <span className="flex-1">{t.card.open}</span>
      {!read && <span className="text-xs font-semibold tabular-nums text-[var(--color-forest)]">+{POINTS.card}</span>}
    </button>
  );
}

/** Die gewählte Art im Rückverweis, im selben Symbol wie in der Auswahl. */
function KindIcon({ questionId, optionId }: { questionId: string; optionId: string }) {
  const Icon = iconFor(questionId, optionId);
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[var(--color-forest)] text-white" aria-hidden>
      <Icon className="size-4" strokeWidth={1.75} />
    </span>
  );
}

/** Wo der Gegenstand steht: die Schritte als Striche, der aktuelle benannt. */
function StepTrack({ steps, current }: { steps: Step[]; current: number }) {
  const { t } = useTourI18n();
  return (
    <span className="flex items-center gap-2 text-[11px] font-semibold text-[var(--color-forest)]">
      <span className="flex gap-1" aria-hidden>
        {steps.map((item, index) => (
          <span
            key={item}
            className={cn(
              "h-1.5 rounded-[var(--radius-sm)] transition-all duration-300",
              index === current ? "w-6 bg-[var(--color-forest)]" : index < current ? "w-2 bg-[var(--color-forest)]/55" : "w-2 bg-[var(--color-ink)]/15"
            )}
          />
        ))}
      </span>
      <span>
        <span className="sr-only">{t.steps.of(current + 1, steps.length)}: </span>
        {t.steps[steps[current]]}
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
  cardsRead,
  nextRoom,
  allComplete,
  locale,
  onAnswer,
  onAdjust,
  onClearAdjust,
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
  cardsRead: Record<string, true>;
  nextRoom?: TourRoom;
  allComplete: boolean;
  locale: Locale;
  onAnswer: (questionId: string, optionId: string) => void;
  onAdjust: (questionId: string, quantity: number) => void;
  onClearAdjust: (questionId: string) => void;
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
  const [cardOpen, setCardOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ein Gegenstand in Schritten, einer pro Bildschirm: Art, Menge, Ergebnis.
  // Wer zu einem beantworteten Gegenstand zurückkehrt, landet beim Ergebnis.
  const steps = useMemo(() => stepsFor(question), [question]);
  const initialStep: Step = answers[question.id] ? "result" : steps[0];
  const [stepFor, setStepFor] = useState<{ id: string; step: Step }>({ id: question.id, step: initialStep });
  if (stepFor.id !== question.id) setStepFor({ id: question.id, step: initialStep });
  const step = stepFor.id === question.id ? stepFor.step : initialStep;
  const stepIndex = steps.indexOf(step);
  const goStep = useCallback((next: Step) => setStepFor({ id: question.id, step: next }), [question.id]);

  // Die Art ist mit einem Tipp beantwortet; kurz danach geht es zur Menge,
  // damit der gewählte Zustand noch zu sehen ist.
  const advanceTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);
  const answerAndAdvance = useCallback((questionId: string, optionId: string) => {
    onAnswer(questionId, optionId);
    if (step !== "kind") return;
    const next = steps[steps.indexOf("kind") + 1];
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(
      () => setStepFor((current) => (current.id === questionId ? { id: questionId, step: next } : current)),
      reduceMotion ? 0 : 240
    );
  }, [onAnswer, step, steps, reduceMotion]);

  const nextStep = () => {
    const next = steps[stepIndex + 1];
    if (next) goStep(next);
    else onContinue();
  };
  const previousStep = () => {
    if (stepIndex > 0) goStep(steps[stepIndex - 1]);
    else onBack();
  };

  const {
    direction, slide, choose, roomHandled, roomDone, moreObjectsOpen,
    selected, selectedOption, onTouchStart, onTouchEnd
  } = useQuestionPanelInteraction({
    room, question, questionIndex, objectOpen, answers, skippedQuestions,
    onAnswer: answerAndAdvance,
    onContinue: nextStep,
    onGoTo,
    reduceMotion,
    // Ziffern wählen dort, wo Antworten zur Wahl stehen: bei der Art und bei
    // den Vorlagen einer reinen Mengenfrage.
    allowDigits: step === "kind" || (step === "amount" && !steps.includes("kind"))
  });
  const { selectedValues, saving } = useQuestionMetrics(question, answers, adjustments);
  // Jeder Schritt und der Raumabschluss beginnen oben. Der Abschluss folgt
  // auf den letzten Gegenstand derselben Frage und erbte sonst dessen
  // Scrollposition: die Überschrift stand abgeschnitten über dem Rand.
  const showingComplete = roomDone && !objectOpen;
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [question.id, step, showingComplete]);
  const firstEver = Object.keys(answers).length === 0;
  const hasKind = steps.includes("kind");

  const openCard = () => {
    setCardOpen(true);
    onReadCard(question.id);
  };

  const back = (questionIndex > 0 || stepIndex > 0) && (
    <button
      type="button"
      onClick={previousStep}
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
              adjustments={adjustments}
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
              key={`${question.id}-${step}`}
              custom={direction}
              variants={slide}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? undefined : "exit"}
              className="mx-auto max-w-xl"
            >
              <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
                <Label size="dense" className="shrink-0">
                  {room.title} · {questionIndex + 1}/{room.questions.length}
                </Label>
                <StepTrack steps={steps} current={stepIndex} />
              </div>

              {step === "kind" && (
                <>
                  <h2 id="step-title" className="text-lg font-semibold leading-tight tracking-[-0.025em] md:text-2xl md:leading-snug">
                    {question.title}
                  </h2>
                  {firstEver && <p className="mt-1.5 text-xs leading-5 text-[var(--color-muted)]">{t.answerHint}</p>}
                  <KindStep question={question} selected={selected} onChoose={choose} />
                  <p className="mt-4 hidden text-[11px] text-[var(--color-muted)] md:block">
                    {t.panel.keys.keys} <kbd className="font-semibold tabular-nums">1</kbd>–
                    <kbd className="font-semibold tabular-nums">{question.options.length}</kbd> {t.panel.keys.choose}{" "}
                    <kbd className="font-semibold">Enter</kbd> {t.panel.keys.next}
                  </p>
                </>
              )}

              {step === "amount" && question.adjust && (
                <>
                  {hasKind && selectedOption && (
                    <button
                      type="button"
                      onClick={() => goStep("kind")}
                      className={cn(
                        "mb-2 inline-flex min-h-11 max-w-full items-center gap-2 rounded-[var(--radius-md)] text-sm font-semibold text-[var(--color-forest)] hover:text-[var(--color-ink)]",
                        focusRingTool
                      )}
                    >
                      <KindIcon questionId={question.id} optionId={selectedOption.id} />
                      <span className="truncate">{selectedOption.label}</span>
                      <span className="shrink-0 text-xs font-medium text-[var(--color-muted)] underline underline-offset-2">{t.steps.edit}</span>
                    </button>
                  )}
                  <h2 id="step-title" className="text-lg font-semibold leading-tight tracking-[-0.025em] md:text-2xl md:leading-snug">
                    {hasKind ? question.adjust.label : question.title}
                  </h2>
                  {firstEver && !hasKind && <p className="mt-1.5 text-xs leading-5 text-[var(--color-muted)]">{t.answerHint}</p>}
                  <AmountStep
                    question={question}
                    selected={selected}
                    adjustments={adjustments}
                    hideLabel={hasKind}
                    onChoose={choose}
                    onAnswer={onAnswer}
                    onAdjust={onAdjust}
                    onClearAdjust={onClearAdjust}
                  />
                </>
              )}

              {step === "result" && selectedOption && (
                <>
                  <h2 id="step-title" className="sr-only">{question.title}: {t.steps.result}</h2>
                  <div className="flex items-center justify-between gap-3">
                    <p className="min-w-0 text-sm leading-6">
                      <span className="text-[var(--color-muted)]">{t.steps.yourAnswer}: </span>
                      <span className="font-semibold">{answerSummary(question, selectedOption.id, adjustments, locale)}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => goStep(steps[0])}
                      className={cn("-mr-2 inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] px-2 text-xs font-semibold text-[var(--color-forest)] hover:bg-[var(--color-ink)]/5", focusRingTool)}
                    >
                      <Pencil className="size-3.5" aria-hidden />
                      {t.steps.edit}
                    </button>
                  </div>
                  <EverydayFeedback
                    questionId={question.id}
                    values={selectedValues}
                    saving={saving}
                    impact={selectedOption.impact}
                    locale={locale}
                    size="lg"
                  />
                  <CardButton read={Boolean(cardsRead[question.id])} onOpen={openCard} />
                </>
              )}

              <div className={footerClass}>
                {back}
                {step === "result" ? (
                  <button type="button" autoFocus onClick={onContinue} className={primaryButton}>
                    {moreObjectsOpen ? t.continue : t.finishRoom}
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                ) : selected ? (
                  <button type="button" onClick={nextStep} className={primaryButton}>
                    {t.continue}
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                ) : (
                  <button type="button" onClick={onSkip} className={cn(quietButton, "ml-auto min-h-12 md:min-h-11")}>
                    <SkipForward className="size-3.5" aria-hidden />
                    {t.panel.skip}
                  </button>
                )}
              </div>
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
