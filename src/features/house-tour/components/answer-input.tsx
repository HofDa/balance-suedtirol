"use client";

import {
  Apple,
  Ban,
  Bath,
  BatteryCharging,
  Bike,
  BrickWall,
  Car,
  CarFront,
  Check,
  CircleHelp,
  CircleOff,
  CloudSun,
  Droplet,
  Droplets,
  Factory,
  Fan,
  Flame,
  Flower,
  Flower2,
  Fuel,
  Hotel,
  LampCeiling,
  LampDesk,
  LeafyGreen,
  Lightbulb,
  Minus,
  Music,
  Plane,
  Plug,
  PlugZap,
  Plus,
  Power,
  Recycle,
  Shirt,
  ShoppingBag,
  ShowerHead,
  Snail,
  Sofa,
  Soup,
  Sprout,
  SquareSplitHorizontal,
  Sun,
  Timer,
  TrainFront,
  Truck,
  Unplug,
  Zap,
  type LucideIcon
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { localeTags } from "@/lib/i18n";
import type { Locale } from "@/config/site";
import { isAdjusted, presetFor, presetsOnly, quantityFor } from "../model/calculator";
import { electricityShare, heatingBillUnit, landmark, type Landmarks } from "../model/everyday";
import { MAX_HOUSEHOLD_SIZE } from "../model/reducer";
import { useTourI18n } from "../i18n/context";
import { optionIcons, type OptionIcon } from "../config/option-icons";
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
  | { kind: "slider"; note?: Landmarks | "electricity" };

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
  // kWh sagt kaum jemandem etwas: Strom gegen den Südtiroler Durchschnitt.
  // Die Heizung fragt gleich in der Einheit der Rechnung, siehe `billUnit`.
  "bedroom-heating": { kind: "slider" },
  "living-tv-streaming": { kind: "slider", note: "electricity" }
};

function noteFor(kind: Landmarks | "electricity", value: number, t: TourUi, locale: Locale) {
  const format = (n: number, digits = 0) => n.toLocaleString(localeTags[locale], { maximumFractionDigits: digits });
  if (kind === "electricity") {
    const share = electricityShare(value);
    return share === null ? null : t.bill.electricity(format(share, 1));
  }
  const match = landmark(kind, value);
  return match ? t.landmarks[match.key](format(match.times, 1), match.times === 1) : null;
}

/**
 * In welcher Einheit eine Haushaltsrechnung eingegeben wird: Gas in Smc, Öl
 * in Litern, wie es auf der Rechnung steht; alles andere in der Einheit der
 * Frage. Gerechnet wird weiter in kWh.
 */
function billUnit(question: TourQuestion, optionId: string | undefined, t: TourUi) {
  const adjust = question.adjust!;
  const bill = question.id === "bedroom-heating" ? heatingBillUnit(optionId) : null;
  return bill ? { kwhPerUnit: bill.kwhPerUnit, unit: t.bill[bill.key], step: 10 } : { kwhPerUnit: 1, unit: adjust.unit, step: adjust.step };
}

/** Die Personenzahl über dem Regler: einmal eingestellt, gilt sie überall. */
function HouseholdSize({ size, onChange }: { size: number; onChange: (size: number) => void }) {
  const { t } = useTourI18n();
  const button = cn(
    "grid size-9 shrink-0 place-items-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-forest)] transition-colors hover:border-[var(--color-forest)] disabled:opacity-35",
    focusRingTool
  );
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-3 pb-2 tour:px-4">
      <span id="household-size" className="text-xs font-semibold tour:text-sm">{t.household.label}</span>
      <div role="group" aria-labelledby="household-size" className="flex items-center gap-2">
        <button type="button" onClick={() => onChange(size - 1)} disabled={size <= 1} aria-label={t.household.fewer} className={button}>
          <Minus className="size-4" aria-hidden />
        </button>
        <output aria-live="polite" className="w-6 text-center text-base font-semibold tabular-nums">{size}</output>
        <button type="button" onClick={() => onChange(size + 1)} disabled={size >= MAX_HOUSEHOLD_SIZE} aria-label={t.household.more} className={button}>
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
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
      <p className="mt-4 hidden text-[11px] font-semibold text-[var(--color-muted)] tour:block" aria-hidden>
        {t.presets}
      </p>
      <div
        className={cn("mt-3 grid gap-1.5 tour:mt-1.5", question.options.length === 3 ? "grid-cols-3" : "grid-cols-2")}
        role="radiogroup"
        aria-label={t.presets}
      >
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
                "flex min-h-11 w-full items-center gap-1.5 rounded-[var(--radius-sm)] border px-3 py-2 text-left text-xs font-semibold leading-4 transition-colors",
                active
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                  : "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-forest)]/50",
                focusRingTool
              )}
            >
              {active && <Check className="size-3.5 shrink-0" aria-hidden />}
              <span className="min-w-0">
                {option.label}
                {option.regionalAverage && (
                  <span className={cn("block font-medium", active ? "text-white/80" : "text-[var(--color-forest)]")}>
                    {t.panel.southTyrol}
                  </span>
                )}
              </span>
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
  unset,
  hideLabel,
  householdSize,
  onChange,
  onReset
}: {
  question: TourQuestion;
  optionId?: string;
  quantity: number;
  isCustom: boolean;
  unset?: boolean;
  hideLabel?: boolean;
  householdSize: number;
  onChange: (quantity: number) => void;
  onReset?: () => void;
}) {
  const { t, locale } = useTourI18n();
  const spec = inputs[question.id] ?? { kind: "slider" };
  if (question.adjust!.perHousehold) {
    // Der Regler zeigt die Rechnung des Haushalts; gespeichert wird der
    // Anteil pro Person in kWh, mit dem der Rechner arbeitet.
    const bill = billUnit(question, optionId, t);
    const toShown = householdSize / bill.kwhPerUnit;
    const raw = question.adjust!;
    const adjust = {
      ...raw,
      unit: bill.unit,
      step: bill.step,
      min: raw.min * toShown,
      max: Math.ceil((raw.max * toShown) / bill.step) * bill.step
    };
    const format = (n: number, digits = 0) => n.toLocaleString(localeTags[locale], { maximumFractionDigits: digits });
    const perPerson = t.household.perPerson(format(Math.round(quantity / 10) * 10));
    const share = spec.kind === "slider" && spec.note === "electricity" ? electricityShare(quantity) : null;
    const showPerPerson = householdSize > 1 || bill.kwhPerUnit !== 1;
    const note = [showPerPerson ? perPerson : null, share === null ? null : t.bill.electricity(format(share, 1))]
      .filter(Boolean)
      .join(" · ");
    return (
      <AdjustControl
        adjust={adjust}
        questionId={question.id}
        quantity={Math.round((quantity * toShown) / bill.step) * bill.step}
        isCustom={isCustom}
        onChange={(shown) => onChange(shown / toShown)}
        onReset={onReset}
        unset={unset}
        hideLabel={hideLabel}
        note={note || null}
        hint={optionId === "heat-pump" ? `${t.adjust.heatPump} ${raw.hint ?? ""}`.trim() : raw.hint}
      />
    );
  }
  const adjust = question.adjust!;
  if (spec.kind === "week") {
    return <MealWeek adjust={adjust} questionId={question.id} quantity={quantity} hideLabel={hideLabel} onCount={onChange} />;
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
        hideLabel={hideLabel}
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
      unset={unset}
      hideLabel={hideLabel}
      note={spec.note ? noteFor(spec.note, quantity, t, locale) : null}
      // Der Wärmepumpenhinweis gehört nur unter die Wärmepumpe, nicht unter Gas oder Öl.
      hint={optionId === "heat-pump" ? `${t.adjust.heatPump} ${adjust.hint ?? ""}`.trim() : adjust.hint}
    />
  );
}

const iconComponents: Record<OptionIcon, LucideIcon> = {
  bath: Bath, ban: Ban, "battery-charging": BatteryCharging, bike: Bike, "brick-wall": BrickWall, car: Car,
  "car-front": CarFront, "circle-help": CircleHelp, "circle-off": CircleOff, "cloud-sun": CloudSun,
  droplet: Droplet, droplets: Droplets, factory: Factory, fan: Fan, flame: Flame, flower: Flower,
  "flower-2": Flower2, fuel: Fuel, hotel: Hotel, "lamp-ceiling": LampCeiling, "lamp-desk": LampDesk,
  "leafy-green": LeafyGreen, lightbulb: Lightbulb, snail: Snail, plane: Plane, "plug-zap": PlugZap, power: Power,
  recycle: Recycle, shirt: Shirt, "shopping-bag": ShoppingBag, "shower-head": ShowerHead, sofa: Sofa,
  sprout: Sprout, "square-split-horizontal": SquareSplitHorizontal, sun: Sun, timer: Timer,
  "train-front": TrainFront, unplug: Unplug, zap: Zap
};

/** Das Symbol einer Antwort; dasselbe in der Auswahl und im Rückverweis darüber. */
export const iconFor = (questionId: string, optionId: string): LucideIcon =>
  iconComponents[optionIcons[questionId]?.[optionId] ?? "circle-help"];

export type Step = "kind" | "amount" | "result";

/**
 * Die Schritte eines Gegenstands, einer pro Bildschirm. „Art“ gibt es nur,
 * wo die Optionen wirklich Arten sind (Duschkopf, Energieträger); geben sie
 * nur eine Menge vor, beginnt der Gegenstand direkt bei der Menge. „Menge“
 * gibt es nur mit Regler. Das Ergebnis kommt immer.
 */
export function stepsFor(question: TourQuestion): Step[] {
  const steps: Step[] = [];
  if (!question.adjust || !presetsOnly(question)) steps.push("kind");
  if (question.adjust) steps.push("amount");
  steps.push("result");
  return steps;
}

/**
 * Schritt „Art“: große Antworten, eine pro Zeile. Antworten ohne Zahlen: wer
 * die Wirkung jeder Option vorher sieht, wählt leicht die „gute“ statt der
 * zutreffenden.
 */
export function KindStep({
  question,
  selected,
  onChoose
}: {
  question: TourQuestion;
  selected?: string;
  onChoose: (optionId: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const { t } = useTourI18n();
  // Ab vier Antworten dichter: mobil schmalere Zeilen in einer Spalte — zwei
  // Spalten brachen „Durchlauferhitzer“ mitten im Wort —, auf dem Desktop
  // Kacheln in zwei Spalten.
  const tiles = question.options.length >= 4;
  // Ab sieben Antworten (Warmwasser) noch eine Stufe enger, damit auch die
  // letzte, „Weiß ich nicht“, mobil ohne Scrollen zu sehen ist.
  const dense = question.options.length >= 7;
  return (
    <div className={cn("mt-3 grid tour:mt-4", tiles ? cn(dense ? "gap-1" : "gap-1.5", "tour:grid-cols-2 tour:gap-2") : "gap-2")} role="radiogroup" aria-labelledby="step-title">
      {question.options.map((option, index) => {
        const active = selected === option.id;
        const Icon = iconFor(question.id, option.id);
        return (
          <motion.button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            onClick={() => onChoose(option.id)}
            className={cn(
              "group relative w-full rounded-[var(--radius-lg)] border text-left transition-colors duration-200",
              tiles
                ? cn("flex items-center gap-2.5 pl-2 pr-3 tour:min-h-14 tour:py-2 tour:pl-2.5", dense ? "min-h-11 py-1" : "min-h-12 py-1.5")
                : "flex min-h-14 items-center gap-3 px-4 py-3",
              active
                ? "border-[var(--color-forest)] bg-[var(--color-sage)]/55"
                : "border-[var(--color-line)] bg-white hover:border-[var(--color-forest)]/45 hover:bg-[var(--color-paper)]",
              focusRingTool
            )}
          >
            <span
              className={cn(
                "grid shrink-0 place-items-center rounded-[var(--radius-md)] transition-colors duration-200",
                tiles ? "size-8 tour:size-9" : "size-10",
                active ? "bg-[var(--color-forest)] text-white" : "bg-[var(--color-sage)]/70 text-[var(--color-forest)]"
              )}
              aria-hidden
            >
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <span className={cn("min-w-0 flex-1 break-words font-semibold", tiles ? "text-sm leading-5" : "text-base leading-5")}>
              {option.label}
              {option.regionalAverage && (
                <span className="ml-2 inline-flex translate-y-[-1px] items-center rounded-[var(--radius-sm)] bg-[var(--color-sage)] px-2 py-0.5 align-middle text-[11px] font-semibold text-[var(--color-forest)]">
                  {t.panel.southTyrol}
                </span>
              )}
            </span>
            {/* Rechts der Zustand: das Häkchen, sonst auf dem Desktop die Taste,
                die diese Antwort wählt. */}
            {active ? (
              <Check className="size-5 shrink-0 text-[var(--color-forest)]" aria-hidden />
            ) : (
              <kbd
                className="hidden size-6 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-line)] text-[11px] font-semibold tabular-nums text-[var(--color-muted)] tour:grid"
                aria-hidden
              >
                {index + 1}
              </kbd>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

/**
 * Schritt „Menge“: eine einzige Eingabe über die ganze Breite. Geben die
 * Optionen nur eine Menge vor (Fleischmahlzeiten, Regionalanteil,
 * Lebensmittelabfall, Haushaltsstrom), ist die Zahl die Antwort; die Optionen
 * stehen dann als schnelle Vorlagen darüber, und welche gilt, folgt aus der
 * eingegebenen Zahl.
 */
export function AmountStep({
  question,
  selected,
  adjustments,
  hideLabel,
  householdSize,
  onHouseholdSize,
  onChoose,
  onAnswer,
  onAdjust,
  onClearAdjust
}: {
  question: TourQuestion;
  selected?: string;
  adjustments: Record<string, number>;
  hideLabel: boolean;
  householdSize: number;
  onHouseholdSize: (size: number) => void;
  onChoose: (optionId: string) => void;
  onAnswer: (questionId: string, optionId: string) => void;
  onAdjust: (questionId: string, quantity: number) => void;
  onClearAdjust: (questionId: string) => void;
}) {
  const adjust = question.adjust!;
  const quick = presetsOnly(question);
  return (
    <>
      {quick && <PresetChips question={question} selected={selected} onChoose={onChoose} />}
      <div className="mt-4 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)]/60 pt-2">
        {adjust.perHousehold && <HouseholdSize size={householdSize} onChange={onHouseholdSize} />}
        <QuantityControl
          question={question}
          optionId={selected}
          quantity={selected ? quantityFor(question, selected, adjustments) : adjust.min}
          isCustom={!quick && isAdjusted(question.id, adjustments)}
          unset={!selected}
          hideLabel={hideLabel}
          householdSize={householdSize}
          onChange={(quantity) => {
            if (!quick) return onAdjust(question.id, quantity);
            // Die Antwort zuerst, denn sie setzt die Menge zurück.
            const preset = presetFor(question, quantity).id;
            if (preset !== selected) onAnswer(question.id, preset);
            onAdjust(question.id, quantity);
          }}
          onReset={quick ? undefined : () => onClearAdjust(question.id)}
        />
      </div>
    </>
  );
}

/**
 * Die eigene Angabe in einem Satz: „Erdgas · 4.200 kWh“. Bei reinen
 * Mengenfragen steht die Vorlage, zu der die Zahl gehört, davor:
 * „Überwiegend pflanzlich · 1× pro Woche“ sagt mehr als die Zahl allein.
 */
export function answerSummary(
  question: TourQuestion,
  selected: string,
  adjustments: Record<string, number>,
  locale: Locale,
  t: TourUi,
  householdSize = 1
) {
  const option = question.options.find((item) => item.id === selected);
  const parts: string[] = [];
  if (option) parts.push(option.label);
  if (question.adjust?.perHousehold && option) {
    // Wie eingegeben: die Rechnung des Haushalts, nicht der geteilte Wert.
    const bill = billUnit(question, option.id, t);
    const shown = Math.round((quantityFor(question, option.id, adjustments) * householdSize) / bill.kwhPerUnit / bill.step) * bill.step;
    parts.push(`${shown.toLocaleString(localeTags[locale])} ${bill.unit}`);
    if (householdSize > 1) parts.push(t.household.people(householdSize));
  } else if (question.adjust && option) {
    const quantity = quantityFor(question, option.id, adjustments);
    const digits = question.adjust.step < 1 ? 1 : 0;
    const unit = question.adjust.unit;
    // „1× pro Woche“, aber „950 kWh“: das Malzeichen hängt an der Zahl.
    parts.push(`${quantity.toLocaleString(localeTags[locale], { maximumFractionDigits: digits })}${unit.startsWith("×") ? "" : " "}${unit}`);
  }
  return parts.join(" · ");
}
