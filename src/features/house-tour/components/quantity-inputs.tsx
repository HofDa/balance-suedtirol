"use client";

import { useState } from "react";
import { Drumstick, Leaf, Minus, Plus, RotateCcw, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { localeTags } from "@/lib/i18n";
import { useTourI18n } from "../i18n/context";
import type { QuestionAdjust } from "../model/types";

/**
 * Eingaben, die aussehen wie das, was gezählt wird. Der Regler fragt nach
 * einer Zahl; hier tippt man Songs, Spülungen und Mahlzeiten an und sieht die
 * eigene Woche vor sich. Gespeichert wird dieselbe Menge wie beim Regler, der
 * Rechner merkt keinen Unterschied.
 */

const stepButton = cn(
  "grid size-9 shrink-0 place-items-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-forest)] transition-colors hover:border-[var(--color-forest)] disabled:opacity-35",
  focusRingTool
);

/**
 * Antippen statt schieben, für Zahlen, die man sich vorstellen kann: die
 * dritte Kachel antippen heißt drei. Die zuletzt gefüllte noch einmal
 * antippen nimmt einen Schritt zurück — bei Songs einen halben.
 *
 * `perTile` lässt eine Kachel mehr als eins bedeuten: im Einkaufskorb steht
 * jede für fünf Prozent. Mit `grow` zeigt das Raster nur so viele Reihen, wie
 * gerade gebraucht werden, plus eine: 40 leere Glühbirnen auf einmal wären
 * ein Formular, eine Reihe, die nachwächst, ist ein Zähler.
 */
export function TapCounter({
  adjust,
  questionId,
  quantity,
  isCustom,
  icon: Icon,
  emptyIcon: EmptyIcon = Icon,
  columns,
  perTile = 1,
  grow = false,
  onChange,
  onReset
}: {
  adjust: QuestionAdjust;
  questionId: string;
  quantity: number;
  isCustom: boolean;
  icon: LucideIcon;
  emptyIcon?: LucideIcon;
  columns: number;
  perTile?: number;
  grow?: boolean;
  onChange: (quantity: number) => void;
  onReset?: () => void;
}) {
  const reduce = useReducedMotion();
  const { t, locale } = useTourI18n();
  const labelId = `tap-${questionId}`;
  const format = (value: number) =>
    value.toLocaleString(localeTags[locale], { maximumFractionDigits: adjust.step < 1 ? 1 : 0 });
  const set = (value: number) => onChange(Math.min(adjust.max, Math.max(adjust.min, value)));
  const total = Math.ceil(adjust.max / perTile);
  const filledTiles = quantity / perTile;
  const shown = grow
    ? Math.min(total, Math.max(columns, Math.ceil((Math.floor(filledTiles) + 1) / columns) * columns))
    : total;
  // Neu gefüllte Kacheln laufen von links nach rechts nach, damit man das
  // Zählen sieht und nicht nur das Ergebnis.
  const [count, setCount] = useState({ now: quantity, from: quantity });
  if (count.now !== quantity) setCount({ now: quantity, from: count.now });
  const fromTile = Math.floor(count.from / perTile);

  return (
    <div className="px-3 pb-3 pt-1 md:px-4">
      <div className="flex items-baseline justify-between gap-3">
        <span id={labelId} className="text-xs font-semibold text-[var(--color-ink)] md:text-sm">
          {adjust.label}
        </span>
        {isCustom && onReset && (
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

      <div
        role="group"
        aria-labelledby={labelId}
        className="mt-2 grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, maxWidth: `${columns * 3}rem` }}
      >
        {Array.from({ length: shown }, (_, index) => {
          const value = (index + 1) * perTile;
          const fill = Math.min(1, Math.max(0, filledTiles - index));
          const delay = reduce ? 0 : Math.max(0, index - fromTile) * 0.03;
          return (
            <motion.button
              key={index}
              type="button"
              initial={reduce || index < columns ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={reduce ? undefined : { scale: 0.88 }}
              onClick={() => set(quantity === value ? value - adjust.step : value)}
              aria-label={t.adjust.setTo(`${format(value)} ${adjust.unit}`)}
              aria-pressed={fill === 1}
              className={cn(
                "relative grid aspect-square place-items-center overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white text-[var(--color-forest)]/30",
                focusRingTool
              )}
            >
              <EmptyIcon className="size-4" aria-hidden />
              {/* Die gefüllte Ebene liegt darüber und wird von links aufgedeckt;
                  so geht auch eine halbe Kachel. */}
              <motion.span
                aria-hidden
                className="absolute inset-0 grid place-items-center bg-[var(--color-forest)] text-white"
                initial={false}
                animate={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}
                transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut", delay: fill > 0 ? delay : 0 }}
              >
                <Icon className="size-4" />
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <button type="button" onClick={() => set(quantity - adjust.step)} disabled={quantity <= adjust.min}
          aria-label={t.adjust.less(adjust.label)} className={stepButton}>
          <Minus className="size-4" aria-hidden />
        </button>
        <output aria-live="polite" className="min-w-[4.5rem] text-center text-base font-semibold tabular-nums">
          {format(quantity)} <span className="text-[11px] font-medium text-[var(--color-muted)]">{adjust.unit}</span>
        </output>
        <button type="button" onClick={() => set(quantity + adjust.step)} disabled={quantity >= adjust.max}
          aria-label={t.adjust.more(adjust.label)} className={stepButton}>
          <Plus className="size-4" aria-hidden />
        </button>
        {adjust.base && (
          <span className="ml-1 text-[11px] font-semibold tabular-nums text-[var(--color-forest)]">
            ≈ {format(quantity * adjust.base.factor)} {adjust.base.unit}
          </span>
        )}
      </div>
      {adjust.hint && <p className="mt-1.5 text-[11px] leading-4 text-[var(--color-muted)]">{adjust.hint}</p>}
    </div>
  );
}

const DAYS = 7;
const MEALS = 3;

/**
 * Wo eine Zahl ohne eigenes Muster landet: erst die Abendessen, dann die
 * Mittagessen, zuletzt das Frühstück — so sieht eine Woche mit sechs
 * Fleischmahlzeiten aus wie eine, nicht wie ein Zufallsmuster.
 */
function defaultWeek(count: number) {
  const cells = Array<boolean>(DAYS * MEALS).fill(false);
  const order = [2, 1, 0].flatMap((meal) => Array.from({ length: DAYS }, (_, day) => meal * DAYS + day));
  for (const index of order.slice(0, Math.max(0, Math.round(count)))) cells[index] = true;
  return cells;
}

const countOf = (cells: boolean[]) => cells.filter(Boolean).length;

/**
 * Die Woche auf dem Teller: 21 Mahlzeiten, die mit Fleisch tippt man an.
 * Gespeichert wird nur die Zahl; welcher Tag es war, spielt für die Bilanz
 * keine Rolle.
 */
export function MealWeek({
  adjust,
  questionId,
  quantity,
  onCount
}: {
  adjust: QuestionAdjust;
  questionId: string;
  quantity: number;
  onCount: (count: number) => void;
}) {
  const reduce = useReducedMotion();
  const { t } = useTourI18n();
  const copy = t.mealWeek;
  const [cells, setCells] = useState(() => defaultWeek(quantity));
  // Kommt die Zahl von anderswo (Vorlage, Vorgabe), zeigt die Woche das
  // Standardmuster; das eigene Muster bleibt, solange es zur Zahl passt.
  const shown = countOf(cells) === quantity ? cells : defaultWeek(quantity);
  const labelId = `meals-${questionId}`;

  const toggle = (index: number) => {
    const next = [...shown];
    next[index] = !next[index];
    setCells(next);
    onCount(countOf(next));
  };

  return (
    <div className="p-3 md:p-4">
      <div className="flex items-baseline justify-between gap-3">
        <span id={labelId} className="text-xs font-semibold md:text-sm">{adjust.label}</span>
        <output aria-live="polite" className="shrink-0 text-xl font-semibold tabular-nums">
          {quantity} <span className="text-[11px] font-medium text-[var(--color-muted)]">{adjust.unit}</span>
        </output>
      </div>

      <div
        role="group"
        aria-labelledby={labelId}
        className="mt-3 grid max-w-[24rem] items-center gap-1"
        style={{ gridTemplateColumns: `auto repeat(${DAYS}, minmax(0, 1fr))` }}
      >
        <span aria-hidden />
        {copy.days.map((day) => (
          <span key={day} aria-hidden className="text-center text-[10px] font-semibold text-[var(--color-muted)]">
            {day}
          </span>
        ))}
        {copy.meals.map((meal, mealIndex) => (
          <MealRow
            key={meal}
            meal={meal}
            days={copy.days}
            cells={shown.slice(mealIndex * DAYS, (mealIndex + 1) * DAYS)}
            reduce={Boolean(reduce)}
            label={copy.cell}
            onToggle={(day) => toggle(mealIndex * DAYS + day)}
          />
        ))}
      </div>

      <p className="mt-2.5 text-[11px] leading-4 text-[var(--color-muted)]">{copy.prompt}</p>
    </div>
  );
}

function MealRow({
  meal,
  days,
  cells,
  reduce,
  label,
  onToggle
}: {
  meal: string;
  days: string[];
  cells: boolean[];
  reduce: boolean;
  label: (day: string, meal: string, meat: boolean) => string;
  onToggle: (day: number) => void;
}) {
  return (
    <>
      <span aria-hidden className="pr-1.5 text-[10px] font-semibold text-[var(--color-muted)]">{meal}</span>
      {cells.map((meat, day) => (
        <motion.button
          key={day}
          type="button"
          whileTap={reduce ? undefined : { scale: 0.85 }}
          onClick={() => onToggle(day)}
          aria-pressed={meat}
          aria-label={label(days[day], meal, meat)}
          className={cn(
            "grid aspect-square place-items-center rounded-[var(--radius-md)] border transition-colors",
            meat
              ? "border-[var(--color-clay-ink)] bg-[var(--color-clay)] text-white"
              : "border-[var(--color-line)] bg-white text-[var(--color-moss)]",
            focusRingTool
          )}
        >
          <motion.span
            key={meat ? "meat" : "plant"}
            initial={reduce ? false : { scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 520, damping: 22 }}
          >
            {meat ? <Drumstick className="size-4" aria-hidden /> : <Leaf className="size-3.5 opacity-60" aria-hidden />}
          </motion.span>
        </motion.button>
      ))}
    </>
  );
}
