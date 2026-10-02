"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { everydayLine } from "../model/everyday";
import { useTourI18n } from "../i18n/context";
import { localeTags } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import type { AnnualValues, QuestionAdjust, ScoreImpact } from "../model/types";

/**
 * Die Wirkung der Antwort als Satz aus dem Alltag, nicht als Kennzahlenblock.
 * Vorher standen hier drei Zahlen mit Balken, Prozent der eigenen Bilanz und
 * zwei Punkteskalen; dieselben Werte noch einmal in jeder Antwortzeile und in
 * der Kopfzeile. Die Szene zeigt jetzt, dass sich etwas tut; dieser Satz sagt,
 * wie viel das ist. Die genauen Werte stehen im Rechenweg.
 */
export function EverydayFeedback({
  questionId,
  values,
  saving,
  impact,
  locale = "de"
}: {
  questionId: string;
  values: AnnualValues | null;
  saving: AnnualValues | null;
  impact: ScoreImpact;
  locale?: Locale;
}) {
  const reduceMotion = useReducedMotion();
  const line = everydayLine(questionId, values, saving, impact, locale);
  return (
    <motion.section
      key={line.headline}
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-3 rounded-[var(--radius-lg)] bg-[var(--color-sage)]/45 px-3 py-3 md:mt-4 md:px-4"
      aria-live="polite"
    >
      <p className="text-sm font-semibold leading-5 text-[var(--color-forest)] md:text-base md:leading-6">
        {line.headline}
      </p>
      {line.detail && (
        <p className="mt-1 text-xs leading-5 text-[var(--color-ink)]/80">{line.detail}</p>
      )}
      {line.saving && (
        <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{line.saving}</p>
      )}
    </motion.section>
  );
}

/**
 * Feinjustierung, direkt in der gewählten Antwort. Eingeklappt hinter
 * „Genauer angeben“ blieb sie bei 14 von 18 Fragen meist unberührt, obwohl
 * genau hier die eigene Zahl steht. Die Vorgabe der Option ist schon gesetzt:
 * wer nichts ändert, verliert nichts.
 */
export function AdjustControl({
  adjust,
  questionId,
  quantity,
  isCustom,
  onChange,
  onReset
}: {
  adjust: QuestionAdjust;
  questionId: string;
  quantity: number;
  isCustom: boolean;
  onChange: (quantity: number) => void;
  onReset: () => void;
}) {
  const sliderId = `adjust-${questionId}`;
  const decimals = adjust.step < 1 ? 1 : 0;
  const { t, locale } = useTourI18n();
  const display = quantity.toLocaleString(localeTags[locale], {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
  // Auf dem Telefon trifft der Daumen am Regler selten den genauen Wert;
  // die Schrittknöpfe liefern ihn.
  const nudge = (direction: 1 | -1) => {
    const next = Math.round((quantity + direction * adjust.step) / adjust.step) * adjust.step;
    onChange(Math.min(adjust.max, Math.max(adjust.min, Number(next.toFixed(decimals)))));
  };
  const stepButton = cn(
    "grid size-10 shrink-0 place-items-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-forest)] transition-colors hover:border-[var(--color-forest)] disabled:opacity-35 md:size-9",
    focusRingTool
  );

  return (
    <div className="px-3 pb-3 pt-1 md:px-4">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={sliderId} className="text-xs font-semibold text-[var(--color-ink)] md:text-sm">
          {adjust.label}
        </label>
        {isCustom && (
          <button
            type="button"
            onClick={onReset}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)]",
              focusRingTool
            )}
          >
            <RotateCcw className="size-3" aria-hidden />
            {t.adjust.reset}
          </button>
        )}
      </div>

      <div className="mt-1.5 flex items-center gap-2.5">
        <button type="button" onClick={() => nudge(-1)} disabled={quantity <= adjust.min}
          aria-label={t.adjust.less(adjust.label)} className={stepButton}>
          <Minus className="size-4" aria-hidden />
        </button>
        <input
          id={sliderId}
          type="range"
          min={adjust.min}
          max={adjust.max}
          step={adjust.step}
          value={quantity}
          aria-valuetext={`${display} ${adjust.unit}`}
          onChange={(event) => onChange(Number(event.target.value))}
          className={cn(
            "h-10 min-w-0 flex-1 cursor-pointer appearance-none bg-transparent",
            // Spur und Griff explizit, sonst erbt jeder Browser sein eigenes Blau.
            "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[var(--color-ink)]/12",
            "[&::-webkit-slider-thumb]:mt-[-9px] [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--color-forest)] [&::-webkit-slider-thumb]:shadow-md",
            "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[var(--color-ink)]/12",
            "[&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--color-forest)]",
            focusRingTool
          )}
        />
        <button type="button" onClick={() => nudge(1)} disabled={quantity >= adjust.max}
          aria-label={t.adjust.more(adjust.label)} className={stepButton}>
          <Plus className="size-4" aria-hidden />
        </button>
        <output htmlFor={sliderId} className="min-w-[4.5rem] shrink-0 text-right text-base font-semibold tabular-nums">
          {display}{" "}
          <span className="text-[11px] font-medium text-[var(--color-muted)]">{adjust.unit}</span>
        </output>
      </div>

      {/* Die Alltagsgröße zurückübersetzt: „2 Songs“ heißt hier sechs Minuten. */}
      {adjust.base && (
        <p className="mt-1 text-[11px] font-semibold tabular-nums text-[var(--color-forest)]">
          ≈ {(quantity * adjust.base.factor).toLocaleString(localeTags[locale], { maximumFractionDigits: 1 })} {adjust.base.unit}
        </p>
      )}
      {adjust.hint && (
        <p className="mt-1 text-[11px] leading-4 text-[var(--color-muted)]">{adjust.hint}</p>
      )}
    </div>
  );
}
