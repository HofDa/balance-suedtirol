"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Check, ChevronLeft, ChevronRight, MousePointer2, SkipForward } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import { POINTS } from "../model/game";
import { useTourI18n } from "../i18n/context";
import { EverydayFeedback } from "./metric-readout";
import { AnswerInput, keepsScrollStill } from "./answer-input";
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
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [question.id]);

  const {
    direction, slide, choose, roomHandled, roomDone, moreObjectsOpen,
    selected, selectedOption, onTouchStart, onTouchEnd
  } = useQuestionPanelInteraction({
    room, question, questionIndex, objectOpen, answers, skippedQuestions, onAnswer, onContinue, onGoTo, reduceMotion
  });
  const { selectedValues, saving } = useQuestionMetrics(question, answers, adjustments);
  const firstEver = Object.keys(answers).length === 0;

  // Nach der ersten Antwort rückt ins Bild, was als Nächstes zu tun ist: bei
  // einer Menge die gewählte Option mit ihrer Eingabe, sonst die Wirkung
  // darunter. In der Essenswoche ist die Eingabe schon da; dort würde jeder
  // Sprung mitten im Tippen stören. Wer zurückkehrt, beginnt oben.
  const feedbackRef = useRef<HTMLDivElement>(null);
  const activeOptionRef = useRef<HTMLDivElement>(null);
  const shownAnswer = useRef({ id: question.id, selected });
  useEffect(() => {
    const previous = shownAnswer.current;
    shownAnswer.current = { id: question.id, selected };
    if (!selected || previous.id !== question.id || previous.selected) return;
    if (keepsScrollStill(question.id)) return;
    const target = question.adjust ? activeOptionRef.current : feedbackRef.current;
    target?.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
  }, [question.id, question.adjust, selected, reduceMotion]);

  const openCard = () => {
    setCardOpen(true);
    onReadCard(question.id);
  };

  const back = questionIndex > 0 && (
    <button
      type="button"
      onClick={onBack}
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
              key={question.id}
              custom={direction}
              variants={slide}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? undefined : "exit"}
              className="mx-auto max-w-xl"
            >
              <Label size="dense" className="mb-2">
                {room.title} · {questionIndex + 1}/{room.questions.length}
              </Label>

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

              <AnswerInput
                question={question}
                selected={selected}
                adjustments={adjustments}
                activeOptionRef={activeOptionRef}
                onChoose={choose}
                onAnswer={onAnswer}
                onAdjust={onAdjust}
                onClearAdjust={onClearAdjust}
              />

              {selectedOption && (
                <div ref={feedbackRef} className="scroll-mb-24 md:scroll-mb-4">
                  <EverydayFeedback
                    questionId={question.id}
                    values={selectedValues}
                    saving={saving}
                    impact={selectedOption.impact}
                    locale={locale}
                  />
                  <CardButton read={Boolean(cardsRead[question.id])} onOpen={openCard} />
                </div>
              )}

              <div className={footerClass}>
                {back}
                {selected ? (
                  <button type="button" onClick={onContinue} className={primaryButton}>
                    {moreObjectsOpen ? t.continue : t.finishRoom}
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
