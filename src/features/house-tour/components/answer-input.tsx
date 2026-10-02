"use client";

import type { Ref } from "react";
import {
  Apple,
  Check,
  Droplet,
  Lightbulb,
  Music,
  Plug,
  Shirt,
  Soup,
  Truck,
  type LucideIcon
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { localeTags } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import { isAdjusted, presetFor, presetsOnly, quantityFor } from "../model/calculator";
import { electricityShare, heatingBillUnit, landmark, type Landmarks } from "../model/everyday";
import { useTourI18n } from "../i18n/context";
import type { TourUi } from "../i18n/ui";
import type { TourQuestion } from "../model/types";
import { AdjustControl } from "./metric-readout";
import { MealWeek, TapCounter } from "./quantity-inputs";

/**
 * Welche Eingabe ein Gegenstand bekommt. Kleine, vorstellbare Zahlen werden
 * angetippt; große Zahlen behalten den Regler, aber mit einem Vergleich, der
 * sagt, wie viel das ist. Was hier fehlt, bekommt den Regler ohne Vergleich.
 */
type InputSpec =
  | { kind: "week" }
  | { kind: "tiles"; icon: LucideIcon; emptyIcon?: LucideIcon; columns: number; perTile?: number; grow?: boolean }
  | { kind: "slider"; note?: Landmarks | "heating" | "electricity" };

const inputs: Record<string, InputSpec> = {
  "kitchen-diet": { kind: "week" },
  "kitchen-waste": { kind: "tiles", icon: Soup, columns: 10, grow: true },
  // Jede Kachel im Korb ist ein Zwanzigstel des Einkaufs.
  "kitchen-origin": { kind: "tiles", icon: Apple, emptyIcon: Truck, columns: 10, perTile: 5 },
  "bath-shower": { kind: "tiles", icon: Music, columns: 8 },
  "bath-toilet": { kind: "tiles", icon: Droplet, columns: 5, grow: true },
  "bedroom-standby": { kind: "tiles", icon: Plug, columns: 8, grow: true },
  "bedroom-textiles": { kind: "tiles", icon: Shirt, columns: 10, grow: true },
  "living-lighting": { kind: "tiles", icon: Lightbulb, columns: 8, grow: true },
  "mobility-short": { kind: "slider", note: "distance" },
  "mobility-km": { kind: "slider", note: "distance" },
  "mobility-long": { kind: "slider", note: "distance" },
  "garden-ground": { kind: "slider", note: "area" },
  // kWh sagt kaum jemandem etwas: Heizung in der Einheit der Rechnung, Strom
  // gegen den Südtiroler Durchschnitt.
  "bedroom-heating": { kind: "slider", note: "heating" },
  "living-tv-streaming": { kind: "slider", note: "electricity" }
};

/** Die Woche springt nicht: jeder Sprung käme mitten im Tippen. */
export const keepsScrollStill = (questionId: string) => inputs[questionId]?.kind === "week";

function noteFor(
  kind: Landmarks | "heating" | "electricity",
  value: number,
  optionId: string | undefined,
  t: TourUi,
  locale: Locale
) {
  const format = (n: number, digits = 0) => n.toLocaleString(localeTags[locale], { maximumFractionDigits: digits });
  if (kind === "heating") {
    const bill = heatingBillUnit(optionId, value);
    return bill ? t.bill[bill.key](format(bill.amount)) : null;
  }
  if (kind === "electricity") {
    const share = electricityShare(value);
    return share === null ? null : t.bill.electricity(format(share, 1));
  }
  const match = landmark(kind, value);
  return match ? t.landmarks[match.key](format(match.times, 1), match.times === 1) : null;
}

/** Die Vorlagen einer Frage, deren Optionen nur eine Menge vorgeben. */
function PresetChips({
  question,
  selected,
  onChoose
}: {
  question: TourQuestion;
  selected?: string;
  onChoose: (optionId: string) => void;
}) {
  const { t } = useTourI18n();
  return (
    <>
      <p className="mt-3 text-[11px] font-semibold text-[var(--color-muted)] md:mt-4" aria-hidden>
        {t.presets}
      </p>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5" role="radiogroup" aria-labelledby="question-title">
        {question.options.map((option) => {
          const active = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChoose(option.id)}
              className={cn(
                "min-h-9 rounded-full border px-3 text-left text-xs font-semibold transition-colors",
                active
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                  : "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-forest)]/50",
                focusRingTool
              )}
            >
              {option.label}
              {option.regionalAverage && (
                <span className={cn("ml-1.5 font-medium", active ? "text-white/80" : "text-[var(--color-forest)]")}>
                  · {t.panel.southTyrol}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

function QuantityControl({
  question,
  optionId,
  quantity,
  isCustom,
  onChange,
  onReset
}: {
  question: TourQuestion;
  optionId?: string;
  quantity: number;
  isCustom: boolean;
  onChange: (quantity: number) => void;
  onReset?: () => void;
}) {
  const { t, locale } = useTourI18n();
  const adjust = question.adjust!;
  const spec = inputs[question.id] ?? { kind: "slider" };
  if (spec.kind === "week") {
    return <MealWeek adjust={adjust} questionId={question.id} quantity={quantity} onCount={onChange} />;
  }
  if (spec.kind === "tiles") {
    return (
      <TapCounter
        adjust={adjust}
        questionId={question.id}
        quantity={quantity}
        isCustom={isCustom}
        icon={spec.icon}
        emptyIcon={spec.emptyIcon}
        columns={spec.columns}
        perTile={spec.perTile}
        grow={spec.grow}
        onChange={onChange}
        onReset={onReset}
      />
    );
  }
  return (
    <AdjustControl
      adjust={adjust}
      questionId={question.id}
      quantity={quantity}
      isCustom={isCustom}
      onChange={onChange}
      onReset={onReset}
      note={spec.note ? noteFor(spec.note, quantity, optionId, t, locale) : null}
    />
  );
}

/**
 * Die Eingabe eines Gegenstands. Zwei Formen:
 *
 * – Geben die Optionen nur eine Menge vor (Fleischmahlzeiten, Regionalanteil,
 *   Lebensmittelabfall, Haushaltsstrom), ist die Zahl die Antwort. Die
 *   Optionen stehen als schnelle Vorlagen darüber; welche gilt, folgt aus der
 *   eingegebenen Zahl.
 * – Sonst wählt man erst die Art (Duschkopf, Spülkasten, Energieträger), dann
 *   die Menge direkt in der gewählten Option.
 *
 * Antworten ohne Zahlen: wer die Wirkung jeder Option vorher sieht, wählt
 * leicht die „gute“ statt der zutreffenden.
 */
export function AnswerInput({
  question,
  selected,
  adjustments,
  activeOptionRef,
  onChoose,
  onAnswer,
  onAdjust,
  onClearAdjust
}: {
  question: TourQuestion;
  selected?: string;
  adjustments: Record<string, number>;
  activeOptionRef: Ref<HTMLDivElement>;
  onChoose: (optionId: string) => void;
  onAnswer: (questionId: string, optionId: string) => void;
  onAdjust: (questionId: string, quantity: number) => void;
  onClearAdjust: (questionId: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const { t } = useTourI18n();

  if (question.adjust && presetsOnly(question)) {
    return (
      <>
        <PresetChips question={question} selected={selected} onChoose={onChoose} />
        <div className="mt-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)]/60 pt-2">
          <QuantityControl
            question={question}
            optionId={selected}
            quantity={selected ? quantityFor(question, selected, adjustments) : question.adjust.min}
            isCustom={false}
            onChange={(quantity) => {
              // Die Antwort zuerst, denn sie setzt die Menge zurück.
              const preset = presetFor(question, quantity).id;
              if (preset !== selected) onAnswer(question.id, preset);
              onAdjust(question.id, quantity);
            }}
          />
        </div>
      </>
    );
  }

  return (
    <div className="mt-3 grid gap-1.5 md:mt-1.5 md:gap-2.5" role="radiogroup" aria-labelledby="question-title">
      {question.options.map((option) => {
        const active = selected === option.id;
        return (
          <div
            key={option.id}
            ref={active ? activeOptionRef : undefined}
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
              onClick={() => onChoose(option.id)}
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
              <QuantityControl
                question={question}
                optionId={option.id}
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
  );
}
