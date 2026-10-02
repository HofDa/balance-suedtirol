"use client";

import { useEffect, useRef, useState } from "react";
import { Bath, Car, Check, CloudFog, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import type { GuessUnit } from "../../config/game-copy";
import { useTourI18n } from "../../i18n/context";
import { fromSlider, type EstimateSpec } from "../../model/game";
import { formatUnit, unitAnchor } from "./units";

const unitIcon: Record<GuessUnit, typeof Bath> = { bathtubs: Bath, carKm: Car, co2Kg: CloudFog };

/**
 * Schätzen in der Alltagsgröße. Der Regler beginnt in der geometrischen Mitte
 * des Bereichs, nicht beim eigenen Wert — sonst wäre der Tipp verraten.
 */
export function EstimateChallenge({
  questionId,
  spec,
  onSubmit,
  footer
}: {
  questionId: string;
  spec: EstimateSpec;
  onSubmit: (guess: number) => void;
  footer: (submit: () => void) => React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const { t, locale } = useTourI18n();
  const [position, setPosition] = useState(0.5);
  const [touched, setTouched] = useState(false);
  const value = fromSlider(position, spec.min, spec.max);
  const formatted = formatUnit(spec.unit, value, t, locale);
  const Icon = unitIcon[spec.unit];
  const sliderRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    sliderRef.current?.focus({ preventScroll: true });
  }, []);
  const min = formatUnit(spec.unit, spec.min, t, locale);
  const max = formatUnit(spec.unit, spec.max, t, locale);

  return (
    <>
      <h2 id="challenge-title" className="text-base font-semibold leading-snug tracking-[-0.02em] md:text-xl">
        {t.estimatePrompts[questionId]}
      </h2>

      <div className="mt-4 flex items-center gap-3 md:mt-6">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
          <Icon className="size-5" aria-hidden />
        </span>
        <output htmlFor="estimate-slider" aria-live="off" className="flex items-baseline gap-1.5">
          <motion.span
            key={formatted.value}
            initial={reduce || !touched ? false : { y: 3, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.12 }}
            className="text-3xl font-semibold tabular-nums tracking-[-0.03em] md:text-4xl"
          >
            {formatted.value}
          </motion.span>
          <span className="text-sm font-medium text-[var(--color-muted)]">{formatted.unit}</span>
        </output>
      </div>

      <input
        ref={sliderRef}
        id="estimate-slider"
        type="range"
        min={0}
        max={1}
        step={0.005}
        value={position}
        aria-labelledby="challenge-title"
        aria-valuetext={`${formatted.value} ${formatted.unit}`}
        onChange={(event) => {
          setTouched(true);
          setPosition(Number(event.target.value));
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSubmit(value);
        }}
        className={cn(
          "mt-3 h-11 w-full cursor-pointer appearance-none bg-transparent",
          "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(90deg,var(--color-sage),var(--color-moss))]",
          "[&::-webkit-slider-thumb]:mt-[-10px] [&::-webkit-slider-thumb]:size-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--color-forest)] [&::-webkit-slider-thumb]:shadow-[0_4px_10px_rgba(24,50,41,0.3)]",
          "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[var(--color-moss)]",
          "[&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--color-forest)]",
          focusRingTool
        )}
      />
      <div className="flex justify-between text-[11px] tabular-nums text-[var(--color-muted)]" aria-hidden>
        <span>{min.value} {min.unit}</span>
        <span>{max.value} {max.unit}</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-[var(--color-muted)]">{unitAnchor(spec.unit, t, locale)}</p>

      {footer(() => onSubmit(value))}
    </>
  );
}

/** Wahr oder falsch, für die Gegenstände ohne Messwert. */
export function QuizChallenge({
  questionId,
  onChoose,
  footer
}: {
  questionId: string;
  onChoose: (choice: boolean) => void;
  footer: React.ReactNode;
}) {
  const { t } = useTourI18n();
  const statement = t.quiz[questionId]?.statement;
  const choice = cn(
    "flex min-h-14 flex-1 items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white px-4 text-sm font-semibold transition-colors hover:border-[var(--color-forest)] hover:bg-[var(--color-sage)]/40",
    focusRingTool
  );
  return (
    <>
      <h2 id="challenge-title" className="text-base font-semibold leading-snug tracking-[-0.02em] md:text-xl">
        {t.quizQuestion}
      </h2>
      <blockquote className="mt-3 rounded-[var(--radius-lg)] bg-[var(--color-sage)]/45 px-4 py-3.5 text-[15px] font-medium leading-6 text-[var(--color-ink)] md:mt-5 md:text-base">
        {statement}
      </blockquote>
      <div className="mt-3 flex gap-2.5 md:mt-4" role="group" aria-labelledby="challenge-title">
        <button type="button" className={choice} onClick={() => onChoose(true)}>
          <Check className="size-4 text-[var(--color-forest)]" aria-hidden />
          {t.quizTrue}
        </button>
        <button type="button" className={choice} onClick={() => onChoose(false)}>
          <X className="size-4 text-[var(--color-ink)]/60" aria-hidden />
          {t.quizFalse}
        </button>
      </div>
      {footer}
    </>
  );
}
