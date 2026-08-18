"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { formatMetric, metrics, referenceValues } from "../model/calculator";
import type { AnnualValues, QuestionAdjust, ScoreImpact } from "../model/types";

/**
 * Die drei Kennzahlen einer Option, als eine Zeile. Kennzahlen, die auf null
 * runden, fallen weg: eine „0 kWh“ neben einer echten Zahl liest sich wie ein
 * Messfehler, nicht wie eine Aussage.
 */
export function ValueRow({
  values,
  scale,
  className
}: {
  values: AnnualValues;
  scale: AnnualValues;
  className?: string;
}) {
  const shown = metrics
    .map((metric) => ({ metric, formatted: formatMetric(metric.id, values[metric.key], scale[metric.key]) }))
    .filter((entry) => values[entry.metric.key] > 0 && !entry.formatted.isZero);

  if (shown.length === 0) return null;

  return (
    <span className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5 tabular-nums", className)}>
      {shown.map(({ metric, formatted }, index) => (
        <span key={metric.id} className="whitespace-nowrap">
          {index > 0 && <span className="mr-2 text-[var(--color-ink)]/30" aria-hidden>·</span>}
          <span className="font-semibold">{formatted.value}</span>{" "}
          <span className="font-normal text-[var(--color-muted)]">
            {formatted.unit}
            <span className="sr-only"> {metric.label} pro Jahr</span>
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Die Jahresbilanz als drei Balken gegen den Durchschnitt. Der Durchschnitt ist
 * die 100-Prozent-Marke, damit die Balken auch dann eine Aussage haben, wenn
 * erst zwei Räume beantwortet sind.
 */
export function MetricBars({
  values,
  compact = false
}: {
  values: AnnualValues;
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <dl className={cn("grid gap-3", compact ? "grid-cols-3" : "gap-4")}>
      {metrics.map((metric) => {
        const raw = values[metric.key];
        const reference = referenceValues[metric.key];
        const share = reference > 0 ? raw / reference : 0;
        const formatted = formatMetric(metric.id, raw, Math.max(raw, reference));
        // Über dem Durchschnitt läuft der Balken über die Marke hinaus, aber
        // gedeckelt — sonst staucht ein Ausreißer alle anderen Balken zu Strichen.
        const width = Math.min(140, share * 100);

        return (
          <div key={metric.id} className="min-w-0">
            <dt className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[11px] font-semibold text-[var(--color-muted)]">
                {compact ? metric.short : metric.label}
              </span>
            </dt>
            <dd className="mt-1">
              <span className="flex items-baseline gap-1">
                <span className="text-lg font-semibold tabular-nums md:text-xl">{formatted.value}</span>
                <span className="text-[11px] font-medium text-[var(--color-muted)]">{formatted.unit}</span>
              </span>
              <div className="relative mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-ink)]/8">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    share > 1 ? "bg-[var(--color-clay-ink,#8a5a3b)]" : "bg-[var(--color-forest)]"
                  )}
                  initial={reduceMotion ? false : { width: 0 }}
                  animate={{ width: `${Math.min(100, width)}%` }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                />
                {/* Marke des Durchschnitts, sobald der eigene Wert darüber liegt. */}
                {share > 1 && (
                  <span
                    className="absolute inset-y-0 w-px bg-[var(--color-ink)]/45"
                    style={{ left: `${(1 / Math.max(1.4, share)) * 100}%` }}
                    aria-hidden
                  />
                )}
              </div>
              <span className="mt-1 block text-[11px] leading-4 text-[var(--color-muted)]">
                {raw === 0
                  ? "noch nichts erfasst"
                  : `${Math.round(share * 100)} % des Durchschnitts`}
              </span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/**
 * Direktes Feedback zur gerade gewählten Antwort. Natur und Ressourcen bleiben
 * als qualitative Nebenwerte sichtbar, damit etwa eine unbewässerte
 * Schotterfläche nicht fälschlich als beste Wahl erscheint.
 *
 * Der Vergleich läuft gegen die eigene bisherige Jahresbilanz, nicht gegen den
 * Durchschnitt einer ganzen Kennzahl. Ein einzelner Posten gegen den
 * Jahresdurchschnitt aller erfassten Bereiche zu stellen verglich Ungleiches:
 * eine Dusche konnte so „4 % des Vergleichswerts“ heißen und klang harmlos,
 * obwohl sie ein Drittel des eigenen Wasserverbrauchs ausmacht.
 */
export function InputImpactFeedback({
  values,
  scale,
  impact,
  totals
}: {
  values: AnnualValues;
  scale: AnnualValues;
  impact: ScoreImpact;
  /** Laufende Jahresbilanz aller bisherigen Antworten, als Bezugsgröße. */
  totals: AnnualValues;
}) {
  const reduceMotion = useReducedMotion();
  const quantitative = metrics
    .map((metric) => {
      const raw = values[metric.key];
      const total = totals[metric.key];
      return {
        metric,
        raw,
        total,
        // Dieselbe Einheit wie in den Optionen verwenden: „495 kg“ darf direkt
        // darunter nicht plötzlich zu „0,5 t“ werden.
        formatted: formatMetric(metric.id, raw, scale[metric.key])
      };
    })
    .filter((entry) => entry.raw > 0 && !entry.formatted.isZero);
  const qualitative = [
    { id: "biodiversity", label: "Natur", value: impact.biodiversity },
    { id: "resources", label: "Ressourcen", value: impact.resources }
  ].filter(
    (entry): entry is { id: string; label: string; value: number } =>
      typeof entry.value === "number" && entry.value !== 0
  );

  if (quantitative.length === 0 && qualitative.length === 0) return null;

  return (
    <section
      className="mt-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-forest)]/20 bg-[var(--color-sage)]/30 md:mt-4"
      aria-label="Direkte Auswirkung dieser Eingabe"
      aria-live="polite"
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-[var(--color-forest)]/10 px-3 py-2 md:px-4">
        <h3 className="text-[11px] font-semibold md:text-xs">Auswirkung dieser Eingabe</h3>
        <span className="shrink-0 text-[11px] text-[var(--color-muted)]">pro Person und Jahr</span>
      </div>

      {quantitative.length > 0 && (
        <dl className="grid gap-3 px-3 py-3 sm:grid-cols-3 md:px-4">
          {quantitative.map(({ metric, raw, total, formatted }) => {
            const share = total > 0 ? Math.min(1, raw / total) : 0;
            const percent = share > 0 && share < 0.01 ? "< 1" : Math.round(share * 100).toString();
            return (
              <div key={metric.id} className="min-w-0">
                <dt className="text-[11px] font-medium text-[var(--color-muted)]">
                  {metric.short}
                </dt>
                <dd className="mt-0.5">
                  <span className="flex items-baseline gap-1">
                    <motion.span
                      key={`${metric.id}-${formatted.value}`}
                      initial={reduceMotion ? false : { opacity: 0.55, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-base font-semibold tabular-nums"
                    >
                      {formatted.value}
                    </motion.span>
                    <span className="text-[11px] text-[var(--color-muted)]">{formatted.unit}</span>
                  </span>
                  <div className="relative mt-1.5 h-2 overflow-hidden rounded-full bg-white/80">
                    <motion.div
                      className="h-full rounded-full bg-[var(--color-forest)]"
                      initial={false}
                      animate={{ width: `${share * 100}%` }}
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                    />
                  </div>
                  <span className="mt-1 block text-[11px] tabular-nums text-[var(--color-muted)]">
                    {percent} % deiner bisherigen {metric.short}-Bilanz
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      )}

      {qualitative.length > 0 && (
        <div
          className={cn(
            "grid gap-2.5 px-3 py-3 md:px-4",
            quantitative.length > 0 && "border-t border-[var(--color-forest)]/10 sm:grid-cols-2"
          )}
        >
          {qualitative.map((entry) => {
            const size = Math.min(9, Math.abs(entry.value));
            const width = (size / 9) * 50;
            const left = entry.value > 0 ? 50 : 50 - width;
            return (
              <div key={entry.id} className="min-w-0">
                <div className="flex items-baseline justify-between gap-2 text-[11px]">
                  <span className="font-medium text-[var(--color-muted)]">{entry.label}</span>
                  <span
                    className={cn(
                      "font-semibold tabular-nums",
                      entry.value > 0 ? "text-[var(--color-forest)]" : "text-[var(--color-clay-ink)]"
                    )}
                  >
                    {entry.value > 0 ? "+" : ""}{entry.value}
                  </span>
                </div>
                <div className="relative mt-1.5 h-2 rounded-full bg-white/80" aria-hidden>
                  <span className="absolute inset-y-[-2px] left-1/2 w-px bg-[var(--color-ink)]/25" />
                  <motion.span
                    className={cn(
                      "absolute inset-y-0 rounded-full",
                      entry.value > 0 ? "bg-[var(--color-forest)]" : "bg-[var(--color-clay)]"
                    )}
                    initial={false}
                    animate={{ left: `${left}%`, width: `${width}%` }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
          <p className="text-[11px] leading-4 text-[var(--color-muted)] sm:col-span-2">
            Natur und Ressourcen sind qualitative Punkte: links belastend, rechts förderlich.
          </p>
        </div>
      )}
    </section>
  );
}

/**
 * Feinjustierung. Standardmäßig eingeklappt: die Tour soll durchklickbar
 * bleiben, wer es genauer will, macht einen Schritt mehr.
 */
export function AdjustControl({
  adjust,
  questionId,
  quantity,
  isCustom,
  open,
  onToggle,
  onChange,
  onReset
}: {
  adjust: QuestionAdjust;
  questionId: string;
  quantity: number;
  isCustom: boolean;
  open: boolean;
  onToggle: () => void;
  onChange: (quantity: number) => void;
  onReset: () => void;
}) {
  const sliderId = `adjust-${questionId}`;
  const decimals = adjust.step < 1 ? 1 : 0;
  const display = quantity.toLocaleString("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });

  return (
    <div className="mt-2.5 md:mt-4">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${sliderId}-panel`}
        className={cn(
          "inline-flex min-h-8 items-center gap-2 rounded-[var(--radius-md)] text-[11px] font-semibold text-[var(--color-forest)] md:min-h-10 md:text-xs",
          focusRingTool
        )}
      >
        <SlidersHorizontal className="size-3.5 shrink-0" aria-hidden />
        {open ? "Feinjustierung schließen" : "Genauer angeben"}
        {isCustom && !open && (
          <span className="rounded-full bg-[var(--color-sage)] px-2 py-0.5 tabular-nums text-[var(--color-ink)]">
            {display} {adjust.unit}
          </span>
        )}
      </button>

      {open && (
        <div
          id={`${sliderId}-panel`}
          className="mt-2 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2.5 md:px-4 md:py-3"
        >
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={sliderId} className="text-[11px] font-semibold md:text-xs">
              {adjust.label}
            </label>
            <span className="shrink-0 text-sm font-semibold tabular-nums">
              {display}{" "}
              <span className="text-[11px] font-medium text-[var(--color-muted)]">{adjust.unit}</span>
            </span>
          </div>

          <input
            id={sliderId}
            type="range"
            min={adjust.min}
            max={adjust.max}
            step={adjust.step}
            value={quantity}
            onChange={(event) => onChange(Number(event.target.value))}
            className={cn(
              "mt-2 h-6 w-full cursor-pointer appearance-none bg-transparent",
              // Spur und Griff explizit, sonst erbt jeder Browser sein eigenes Blau.
              "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[var(--color-ink)]/12",
              "[&::-webkit-slider-thumb]:mt-[-7px] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--color-forest)] [&::-webkit-slider-thumb]:shadow-md",
              "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[var(--color-ink)]/12",
              "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--color-forest)]",
              focusRingTool
            )}
          />

          <div className="mt-1 flex items-start justify-between gap-3">
            <p className="text-[11px] leading-4 text-[var(--color-muted)]">
              {adjust.hint ?? `Von ${adjust.min} bis ${adjust.max} ${adjust.unit}.`}
            </p>
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
                Vorgabe
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
