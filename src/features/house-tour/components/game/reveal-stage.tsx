"use client";

import { BookOpen, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { quizAnswers } from "../../config/game-copy";
import { useTourI18n } from "../../i18n/context";
import { POINTS, missFactor, pointsFor, ratingOf, toSlider, type EstimateSpec, type Rating } from "../../model/game";
import type { AnnualValues, GuessRecord, ScoreImpact } from "../../model/types";
import { EverydayFeedback } from "../metric-readout";
import { formatUnit } from "./units";

const ratingTone: Record<Rating, string> = {
  spot: "bg-[var(--color-forest)] text-white",
  quizRight: "bg-[var(--color-forest)] text-white",
  close: "bg-[var(--color-sage)] text-[var(--color-forest)]",
  off: "bg-[var(--color-stone)] text-[var(--color-ink)]",
  quizWrong: "bg-[var(--color-stone)] text-[var(--color-ink)]"
};

/** Wertung und gewonnene Punkte: der eine inszenierte Moment der Runde. */
function RatingBadge({ rating }: { rating: Rating }) {
  const reduce = useReducedMotion();
  const { t } = useTourI18n();
  const points = pointsFor(rating);
  return (
    <div className="flex items-center gap-2.5">
      <motion.span
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 520, damping: 20, delay: reduce ? 0 : 0.55 }}
        className={cn("inline-flex min-h-8 items-center rounded-[var(--radius-md)] px-3 text-sm font-semibold", ratingTone[rating])}
      >
        {t.ratings[rating]}
      </motion.span>
      {points > 0 && (
        <motion.span
          initial={reduce ? false : { y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.75 }}
          className="text-sm font-semibold tabular-nums text-[var(--color-forest)]"
        >
          +{points} {t.pointsShort}
        </motion.span>
      )}
    </div>
  );
}

/**
 * Tipp und tatsächlicher Wert auf derselben logarithmischen Spur. Der echte
 * Wert fährt vom Tipp aus an seinen Platz: so sieht man die Entfernung, statt
 * zwei Zahlen vergleichen zu müssen.
 */
function GuessScale({ spec, guess, actual }: { spec: EstimateSpec; guess: number; actual: number }) {
  const reduce = useReducedMotion();
  const { t, locale } = useTourI18n();
  const g = toSlider(guess, spec.min, spec.max) * 100;
  const a = toSlider(actual, spec.min, spec.max) * 100;
  const yours = formatUnit(spec.unit, guess, t, locale);
  const real = formatUnit(spec.unit, actual, t, locale);
  const left = Math.min(g, a);
  const width = Math.abs(a - g);
  return (
    <div className="mt-4" aria-hidden>
      <div className="relative h-2 rounded-full bg-[var(--color-stone)]">
        <motion.span
          className="absolute inset-y-0 rounded-full bg-[var(--color-moss)]"
          initial={reduce ? false : { left: `${g}%`, width: "0%" }}
          animate={{ left: `${left}%`, width: `${width}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.15 }}
        />
        <span
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-ink)] bg-white"
          style={{ left: `${g}%` }}
        />
        <motion.span
          className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[var(--color-forest)] shadow-[0_3px_8px_rgba(24,50,41,0.35)]"
          initial={reduce ? false : { left: `${g}%` }}
          animate={{ left: `${a}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.15 }}
        />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="flex items-center gap-1.5 text-[var(--color-muted)]">
            <span className="size-2.5 rounded-full border-2 border-[var(--color-ink)]" />
            {t.guessYours}
          </span>
          <span className="mt-0.5 block text-base font-semibold tabular-nums">
            {yours.value} <span className="text-xs font-medium text-[var(--color-muted)]">{yours.unit}</span>
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1.5 text-[var(--color-muted)]">
            <span className="size-2.5 rounded-full bg-[var(--color-forest)]" />
            {t.guessActual}
          </span>
          <span className="mt-0.5 block text-base font-semibold tabular-nums text-[var(--color-forest)]">
            {real.value} <span className="text-xs font-medium text-[var(--color-muted)]">{real.unit}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function RevealStage({
  questionId,
  record,
  spec,
  values,
  saving,
  impact,
  cardRead,
  onOpenCard,
  footer
}: {
  questionId: string;
  record?: GuessRecord;
  spec: EstimateSpec | null;
  values: AnnualValues | null;
  saving: AnnualValues | null;
  impact: ScoreImpact;
  cardRead: boolean;
  onOpenCard: () => void;
  footer: React.ReactNode;
}) {
  const { t, locale } = useTourI18n();
  const rating = ratingOf(record, questionId);
  const quiz = t.quiz[questionId];
  const quizCorrect = quizAnswers[questionId];
  // Die Wertung erklärt sich in Worten, nicht in Zahlen: bei der Schätzung
  // zeigt die Skala die Entfernung, beim Quiz steht die Begründung.
  const readable = (
    <>
      {rating && <RatingBadge rating={rating} />}

      {record?.kind === "estimate" && spec && (
        <>
          <GuessScale spec={spec} guess={record.guess} actual={record.actual} />
          {rating === "off" && (
            <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">
              {t.offHint(missFactor(record.guess, record.actual))}
            </p>
          )}
        </>
      )}

      {record?.kind === "quiz" && quiz && (
        <div className="mt-3">
          <p className="text-sm font-medium leading-6">{quiz.statement} — {quizCorrect ? t.quizVerdict.true : t.quizVerdict.false}</p>
          <p className="mt-1.5 text-sm leading-6 text-[var(--color-muted)]">{quiz.explanation}</p>
        </div>
      )}
    </>
  );

  return (
    <>
      <div aria-live="polite">{readable}</div>

      <EverydayFeedback questionId={questionId} values={values} saving={saving} impact={impact} locale={locale} />

      <button
        type="button"
        onClick={onOpenCard}
        className={cn(
          "mt-3 flex min-h-12 w-full items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white px-3 text-left text-sm font-semibold transition-colors hover:border-[var(--color-forest)]/45 hover:bg-[var(--color-paper)]",
          focusRingTool
        )}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
          {cardRead ? <Check className="size-4" aria-hidden /> : <BookOpen className="size-4" aria-hidden />}
        </span>
        <span className="flex-1">{t.card.open}</span>
        {!cardRead && (
          <span className="text-xs font-semibold tabular-nums text-[var(--color-forest)]">+{POINTS.card}</span>
        )}
      </button>

      {footer}
    </>
  );
}
