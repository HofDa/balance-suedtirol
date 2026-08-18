"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  Leaf,
  Lightbulb,
  MousePointer2,
  SkipForward,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import {
  bestCaseSaving,
  bestCaseSavingFromValues,
  formatMetric,
  hasValues,
  isAdjusted,
  metrics,
  optionValues,
  quantityFor,
  questionBasis,
  summarizeValues
} from "../model/calculator";
import { AdjustControl, InputImpactFeedback, MetricBars, ValueRow } from "./metric-readout";
import { RoomNavigation } from "./room-navigation";
import type { AnnualValues, RoomId, TourQuestion, TourRoom } from "../model/types";
import { getRoomProgress } from "../model/scoring";

const completionCopy: Partial<Record<TourRoom["id"], string>> = {
  bath: "Du hast erkundet, wie Wasserverbrauch und Alltagsprodukte mit Gewässern und natürlichen Ressourcen zusammenhängen.",
  bedroom: "Du hast erkundet, wie Wärme, Textilien und Elektronik Ressourcen und Lebensräume beeinflussen.",
  living: "Du hast erkundet, wie Energie, Geräte und Materialien mit der Biodiversität verbunden sind.",
  kitchen: "Du hast erkundet, wie Ernährung, Herkunft und Abfälle Flächen und Lebensräume beeinflussen.",
  mobility: "Du hast erkundet, wie unsere Wege Energie, Flächen und die Qualität lokaler Lebensräume prägen.",
  garden: "Du hast erkundet, wie Boden, Pflanzen und Strukturen direkt neue Lebensräume schaffen."
};

function ProgressBar({ value, total }: { value: number; total: number }) {
  const width = total ? Math.min(100, (value / total) * 100) : 0;
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-ink)]/8" aria-hidden>
      <motion.div
        className="h-full rounded-full bg-[var(--color-forest)]"
        animate={{ width: `${width}%` }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}

/**
 * Kopfzeile mit Raumfortschritt und laufender Jahresbilanz. Der Hausfortschritt
 * steht in der Werkzeugleiste und die Raumzustände in der Raumleiste; hier
 * bliebe beides eine Dopplung.
 *
 * Die Bilanz steht bewusst hier und nicht erst am Ende, damit jede Antwort
 * sofort sichtbar etwas bewegt — aber erst, sobald sie eine Zahl trägt. Drei
 * Striche vor der ersten Antwort sind Rauschen, kein Zwischenstand.
 */
function ProgressSummary({
  room,
  roomHandled,
  totals
}: {
  room: TourRoom;
  roomHandled: number;
  totals: AnnualValues;
}) {
  const hasRunningTotals = hasValues(totals);

  return (
    <div className="border-b border-[var(--color-line)] bg-[var(--color-paper)]/65">
      <div className="px-3 pt-2.5 md:px-6 md:pt-3">
        <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] md:text-xs">
          <span className="truncate font-semibold">{room.title}</span>
          <span className="tabular-nums text-[var(--color-muted)]">
            {roomHandled} / {room.questions.length}
            <span className="hidden md:inline"> Objekte</span>
          </span>
        </div>
        <ProgressBar value={roomHandled} total={room.questions.length} />
      </div>

      {hasRunningTotals && (
        <dl className="mt-2 grid grid-cols-3 gap-2 border-t border-[var(--color-line)] px-3 py-2 md:gap-3 md:px-6 md:py-2.5">
          {metrics.map((metric) => {
            const raw = totals[metric.key];
            const formatted = formatMetric(metric.id, raw);
            return (
              <div key={metric.id} className="min-w-0">
                <dt className="truncate text-[11px] font-medium text-[var(--color-muted)]">
                  {metric.short}
                </dt>
                <dd className="flex items-baseline gap-1 truncate">
                  {raw > 0 ? (
                    <>
                      <span className="text-sm font-semibold tabular-nums">{formatted.value}</span>
                      <span className="text-[11px] text-[var(--color-muted)]">{formatted.unit}</span>
                    </>
                  ) : (
                    // „0 L“ neben echten Zahlen liest sich wie ein Fehler, nicht wie ein Zwischenstand.
                    <span className="text-sm font-semibold text-[var(--color-muted)]" title="noch nicht erfasst">
                      –<span className="sr-only">noch nicht erfasst</span>
                    </span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}

/** Erklärt eine fehlende Zahl, statt sie kommentarlos als Null zu zeigen. */
function ScopeNote({ note }: { note: string }) {
  return (
    <p className="flex gap-2 text-[11px] leading-4 text-[var(--color-muted)]">
      <Info className="mt-px size-3.5 shrink-0 text-[var(--color-forest)]" aria-hidden />
      <span>{note}</span>
    </p>
  );
}

/**
 * Hintergrund zur Frage: Erklärtext, Bilanzgrenze und Rechenweg. Eingeklappt,
 * weil die Entscheidung oben stehen muss — aber vorhanden, weil eine Zahl ohne
 * nachlesbaren Rechenweg in diesem Produkt nichts verloren hat.
 */
function QuestionDetails({
  question,
  locale
}: {
  question: TourQuestion;
  locale: Locale;
}) {
  const basis = questionBasis[question.id];

  return (
    <details className="group mt-3 rounded-[var(--radius-md)] border border-[var(--color-line)] md:mt-4">
      <summary
        className={cn(
          "flex min-h-11 cursor-pointer list-none items-center gap-2 px-3 text-[11px] font-semibold text-[var(--color-forest)] md:px-4 md:text-xs",
          focusRingTool
        )}
      >
        <ChevronRight
          className="size-3.5 shrink-0 transition-transform group-open:rotate-90 motion-reduce:transition-none"
          aria-hidden
        />
        Hintergrund und Rechenweg
      </summary>

      <div className="grid gap-2.5 border-t border-[var(--color-line)] px-3 py-3 md:px-4">
        <p className="text-[11px] leading-4 text-[var(--color-muted)] md:text-xs md:leading-5">
          {question.description}
        </p>

        {question.scopeNote && <ScopeNote note={question.scopeNote} />}

        {basis && (
          <div className="grid gap-1 border-t border-[var(--color-line)] pt-2.5">
            <Label size="dense">So wird gerechnet</Label>
            <p className="text-[11px] leading-4 text-[var(--color-ink)]">{basis.factor}</p>
            {basis.assumption && (
              <p className="text-[11px] leading-4 text-[var(--color-muted)]">{basis.assumption}</p>
            )}
          </div>
        )}

        <div className="flex gap-2 border-t border-[var(--color-line)] pt-2.5">
          <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-[var(--color-forest)]" aria-hidden />
          <p className="text-[11px] leading-4 text-[var(--color-muted)]">
            <span className="font-semibold text-[var(--color-ink)]">Praktischer Tipp: </span>
            {question.tip}
          </p>
        </div>

        <Link
          href={`/${locale}/methodik`}
          className={cn(
            "inline-flex w-fit items-center gap-1 text-[11px] font-semibold text-[var(--color-forest)] underline underline-offset-2",
            focusRingTool
          )}
        >
          Alle Faktoren und Annahmen
          <ChevronRight className="size-3" aria-hidden />
        </Link>
      </div>
    </details>
  );
}

export function ObjectContextPanel({
  room,
  question,
  questionIndex,
  objectOpen,
  answers,
  adjustments,
  skippedQuestions,
  totals,
  nextRoom,
  allComplete,
  locale,
  onAnswer,
  onAdjust,
  onClearAdjust,
  onContinue,
  onSkip,
  onBack,
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
  totals: AnnualValues;
  nextRoom?: TourRoom;
  allComplete: boolean;
  locale: Locale;
  onAnswer: (questionId: string, optionId: string) => void;
  onAdjust: (questionId: string, quantity: number) => void;
  onClearAdjust: (questionId: string) => void;
  onContinue: () => void;
  onSkip: () => void;
  onBack: () => void;
  onOpenObject: () => void;
  onHouse: () => void;
  onSelectRoom: (id: RoomId) => void;
  onNextRoom: () => void;
  onResults: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [adjustOpen, setAdjustOpen] = useState(false);
  const roomProgress = getRoomProgress(room, answers, skippedQuestions);
  const roomHandled = roomProgress.handled;
  const roomDone = roomProgress.isComplete;
  // Sagt dem Weiter-Knopf, wohin er führt: zum nächsten Objekt oder zum
  // Raumabschluss. Ein Knopf, der nicht verrät, was er auslöst, ist ein Sprung.
  const moreObjectsOpen = room.questions.some(
    (item, index) =>
      index !== questionIndex && !answers[item.id] && !skippedQuestions[item.id]
  );
  const selected = answers[question.id];
  const selectedOption = question.options.find((option) => option.id === selected);

  /**
   * Der Befund des Raums: der schwerste beantwortete Posten und der größte
   * ungenutzte Hebel. Beides rechnet der Rechner ohnehin schon — es stand nur
   * nirgends.
   */
  const roomInsight = useMemo(() => {
    let driver: { label: string; values: AnnualValues; share: number } | null = null;
    let lever: { label: string; values: AnnualValues } | null = null;

    for (const item of room.questions) {
      const answer = answers[item.id];
      if (!answer) continue;

      const values = optionValues(item.id, answer, answers, adjustments);
      if (values.co2Kg > 0 && (!driver || values.co2Kg > driver.values.co2Kg)) {
        driver = { label: item.sceneLabel, values, share: 0 };
      }

      const potential = bestCaseSaving(item.id, answers, adjustments);
      if (potential.co2Kg > 0 && (!lever || potential.co2Kg > lever.values.co2Kg)) {
        lever = { label: item.sceneLabel, values: potential };
      }
    }

    if (driver && totals.co2Kg > 0) driver.share = driver.values.co2Kg / totals.co2Kg;
    return { driver, lever };
  }, [room, answers, adjustments, totals.co2Kg]);

  /**
   * Der schnelle Weg für alle, die 21 Objekte hintereinander durchgehen:
   * Ziffer wählt, Enter geht weiter. Eingabefelder und bereits fokussierte
   * Bedienelemente behalten ihre eigene Tastenbelegung.
   */
  useEffect(() => {
    if (!objectOpen || roomDone) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (target?.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        return;
      }

      const choice = Number(event.key);
      if (Number.isInteger(choice) && choice >= 1 && choice <= question.options.length) {
        event.preventDefault();
        onAnswer(question.id, question.options[choice - 1].id);
        return;
      }

      // Enter auf einem fokussierten Knopf löst dessen eigene Aktion aus;
      // ein zweiter Weiter-Sprung von hier wäre ein übersprungenes Objekt.
      if (event.key === "Enter" && selected && tag !== "BUTTON" && tag !== "A" && tag !== "SUMMARY") {
        event.preventDefault();
        onContinue();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [objectOpen, roomDone, question, selected, onAnswer, onContinue]);

  // Einheiten über alle Optionen einer Frage angleichen, sonst steht „16,4 m³“
  // über „6.390 L“ und die Zeilen lassen sich nicht vergleichen.
  const optionResults = useMemo(
    () => question.options.map((option) => ({
      option,
      values: optionValues(question.id, option.id, answers, adjustments)
    })),
    [question, answers, adjustments]
  );
  const scale = optionResults.reduce<AnnualValues>(
    (result, { values }) => ({
      co2Kg: Math.max(result.co2Kg, values.co2Kg),
      waterL: Math.max(result.waterL, values.waterL),
      energyKwh: Math.max(result.energyKwh, values.energyKwh)
    }),
    { co2Kg: 0, waterL: 0, energyKwh: 0 }
  );
  const selectedResult = optionResults.find(({ option }) => option.id === selected);
  const selectedValues = selectedResult?.values ?? null;
  const saving = selectedValues
    ? bestCaseSavingFromValues(selectedValues, optionResults.map(({ values }) => values))
    : null;

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <RoomNavigation
        activeRoom={room.id}
        answers={answers}
        skippedQuestions={skippedQuestions}
        onSelectRoom={onSelectRoom}
        onHouse={onHouse}
      />
      <ProgressSummary room={room} roomHandled={roomHandled} totals={totals} />

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 md:px-6 md:py-6">
        <AnimatePresence mode="wait" initial={false}>
          {roomDone && !objectOpen ? (
            <motion.div
              key={`${room.id}-complete`}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto flex h-full max-w-lg flex-col justify-center"
            >
              <span className="grid size-11 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
                <CheckCircle2 className="size-5" aria-hidden />
              </span>
              <Label size="dense" className="mt-5">Raum abgeschlossen</Label>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
                {room.title} erkundet
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                {completionCopy[room.id] ?? room.description}
              </p>

              {/* Ein Raumabschluss, der nur lobt, sagt nichts. Diese beiden
                  Sätze sind das Ergebnis des Raums: was hier wiegt und wo noch
                  etwas zu holen wäre. */}
              {(roomInsight.driver || roomInsight.lever) && (
                <dl className="mt-6 grid gap-2">
                  {roomInsight.driver && (
                    <div className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5">
                      <TrendingUp className="mt-0.5 size-4 shrink-0 text-[var(--color-clay-ink)]" aria-hidden />
                      <div className="min-w-0">
                        <dt className="text-xs font-semibold">Größter Posten in diesem Raum</dt>
                        <dd className="mt-0.5 text-xs leading-5 text-[var(--color-muted)]">
                          {roomInsight.driver.label} —{" "}
                          <span className="tabular-nums text-[var(--color-ink)]">
                            {summarizeValues(roomInsight.driver.values)}
                          </span>
                          {roomInsight.driver.share >= 0.01 && (
                            <>
                              {" "}im Jahr, rund{" "}
                              <span className="tabular-nums text-[var(--color-ink)]">
                                {Math.round(roomInsight.driver.share * 100)} %
                              </span>{" "}
                              deiner bisherigen CO₂-Bilanz.
                            </>
                          )}
                        </dd>
                      </div>
                    </div>
                  )}

                  {roomInsight.lever && (
                    <div className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5">
                      <TrendingDown className="mt-0.5 size-4 shrink-0 text-[var(--color-forest)]" aria-hidden />
                      <div className="min-w-0">
                        <dt className="text-xs font-semibold">Größter verbleibender Hebel</dt>
                        <dd className="mt-0.5 text-xs leading-5 text-[var(--color-muted)]">
                          {roomInsight.lever.label} — bis zu{" "}
                          <span className="tabular-nums text-[var(--color-ink)]">
                            {summarizeValues(roomInsight.lever.values)}
                          </span>{" "}
                          weniger im Jahr mit der sparsamsten Antwort.
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              )}

              <div className="mt-4 rounded-[var(--radius-lg)] border border-[var(--color-line)] p-4">
                <Label size="dense">Deine Jahresbilanz bisher</Label>
                <div className="mt-3">
                  <MetricBars values={totals} compact />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={allComplete ? onResults : onNextRoom}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white",
                    focusRingTool
                  )}
                >
                  {allComplete ? "Ergebnis ansehen" : `Weiter zu ${nextRoom?.title ?? "nächsten Raum"}`}
                  <ChevronRight className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={onHouse}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-4 text-sm font-semibold text-[var(--color-forest)]",
                    focusRingTool
                  )}
                >
                  <Home className="size-4" aria-hidden />
                  Haus ansehen
                </button>
              </div>
            </motion.div>
          ) : !objectOpen ? (
            <motion.div
              key={`${question.id}-discover`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto flex h-full max-w-lg flex-col justify-center"
            >
              <span className="grid size-11 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
                <MousePointer2 className="size-5" aria-hidden />
              </span>
              <Label size="dense" className="mt-5">
                {room.title} · Objekt {questionIndex + 1} von {room.questions.length}
              </Label>
              <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.025em]">
                Entdecke: {question.sceneLabel}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-muted)]">
                Der Rest des Raums tritt zurück, das nächste Objekt steht im Licht. Öffne es hier
                oder klicke es direkt in der Szene an.
              </p>

              {/* Der Szenenklick bleibt möglich, ist aber kein Nadelöhr mehr:
                  ohne diesen Knopf endet der Weiter-Weg in einer Sackgasse. */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenObject}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white",
                    focusRingTool
                  )}
                >
                  {question.sceneLabel} öffnen
                  <ChevronRight className="size-4" aria-hidden />
                </button>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-forest)]">
                  <span className="size-2 animate-pulse rounded-full bg-[var(--color-forest)]" aria-hidden />
                  Im Haus hervorgehoben
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`${question.id}-question`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-xl"
            >
              <div className="flex min-w-0 items-center justify-between gap-3">
                <Label size="dense" className="shrink-0">
                  {room.title} · {questionIndex + 1}/{room.questions.length}
                </Label>
                <p className="flex min-w-0 items-center gap-1.5 truncate text-[11px] font-semibold text-[var(--color-forest)] md:hidden">
                  <Leaf className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">{question.sceneLabel}</span>
                </p>
              </div>
              <div className="mt-2 hidden items-center gap-3 md:flex">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-paper)] text-[var(--color-forest)]">
                  <Leaf className="size-4" aria-hidden />
                </span>
                <p className="text-sm font-semibold text-[var(--color-forest)]">{question.sceneLabel}</p>
              </div>
              <h2 id="question-title" className="mt-2 text-lg font-semibold leading-tight tracking-[-0.025em] md:mt-4 md:text-2xl md:leading-snug">
                {question.title}
              </h2>

              {/* „pro Jahr“ einmal als Spaltenkopf statt implizit in jeder
                  Zeile: die Zahlen rechts sind Jahreswerte, keine Preise. */}
              <p className="mt-3 flex items-baseline justify-between gap-3 text-[11px] text-[var(--color-muted)] md:mt-5">
                <span className="hidden md:inline">
                  Tasten <kbd className="font-semibold tabular-nums">1</kbd>–
                  <kbd className="font-semibold tabular-nums">{question.options.length}</kbd> wählen,{" "}
                  <kbd className="font-semibold">Enter</kbd> weiter
                </span>
                {hasValues(scale) && <span className="ml-auto">Werte pro Jahr</span>}
              </p>

              <div
                className="mt-1.5 grid gap-1.5 md:gap-2.5"
                role="radiogroup"
                aria-labelledby="question-title"
              >
                {optionResults.map(({ option, values }) => {
                  const active = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => onAnswer(question.id, option.id)}
                      className={cn(
                        "flex min-h-10 items-center gap-2.5 rounded-[var(--radius-md)] border px-3 py-2 text-left text-xs font-semibold leading-4 transition md:min-h-14 md:gap-3 md:rounded-[var(--radius-lg)] md:px-4 md:py-3 md:text-sm md:leading-5",
                        focusRingTool,
                        active
                          ? "border-[var(--color-forest)] bg-[var(--color-sage)]/45"
                          : "border-[var(--color-line)] hover:border-[var(--color-forest)]/40 hover:bg-[var(--color-paper)]"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full border",
                          active
                            ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                            : "border-[var(--color-line)]"
                        )}
                      >
                        {active && <Check className="size-3" aria-hidden />}
                      </span>
                      <span className="min-w-0 flex-1">{option.label}</span>
                      {hasValues(values) ? (
                        <ValueRow
                          values={values}
                          scale={scale}
                          className="shrink-0 justify-end text-right text-[11px] font-normal md:text-xs"
                        />
                      ) : question.scopeNote ? null : (
                        <span className="shrink-0 text-[11px] font-normal text-[var(--color-muted)]">
                          keine direkten Emissionen
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {question.adjust && selected && (
                <AdjustControl
                  adjust={question.adjust}
                  questionId={question.id}
                  quantity={quantityFor(question, selected, adjustments)}
                  isCustom={isAdjusted(question.id, adjustments)}
                  open={adjustOpen}
                  onToggle={() => setAdjustOpen((prev) => !prev)}
                  onChange={(quantity) => onAdjust(question.id, quantity)}
                  onReset={() => onClearAdjust(question.id)}
                />
              )}

              {selectedOption && selectedValues && (
                <>
                  <InputImpactFeedback
                    values={selectedValues}
                    scale={scale}
                    impact={selectedOption.impact}
                    totals={totals}
                  />
                  <p className="mt-3 text-xs leading-5 text-[var(--color-ink)] md:text-sm md:leading-6">
                    {question.impactText}
                  </p>
                </>
              )}

              {/* Was die beste Antwort auf genau diese Frage noch einsparen würde. */}
              {saving && hasValues(saving) && (
                <div className="mt-3 flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 md:px-4">
                  <TrendingDown className="mt-0.5 size-4 shrink-0 text-[var(--color-forest)]" aria-hidden />
                  <p className="text-xs leading-5">
                    <span className="font-semibold">Noch möglich: </span>
                    <span className="text-[var(--color-muted)]">
                      {summarizeValues(saving, scale)} weniger im Jahr mit der sparsamsten Antwort auf diese Frage.
                    </span>
                  </p>
                </div>
              )}

              <QuestionDetails question={question} locale={locale} />

              {/* Vorwärts, zurück und überspringen an einem Ort: der Weg durch
                  den Raum darf nicht davon abhängen, ob man die Szene trifft. */}
              <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-4">
                {questionIndex > 0 && (
                  <button
                    type="button"
                    onClick={onBack}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-md)] px-3 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]",
                      focusRingTool
                    )}
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                    Zurück
                  </button>
                )}

                {selected ? (
                  <button
                    type="button"
                    onClick={onContinue}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white",
                      focusRingTool
                    )}
                  >
                    {moreObjectsOpen ? "Weiter" : "Raum abschließen"}
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSkip}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-3 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]",
                      focusRingTool
                    )}
                  >
                    <SkipForward className="size-3.5" aria-hidden />
                    Überspringen
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
