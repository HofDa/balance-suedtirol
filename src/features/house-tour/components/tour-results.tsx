"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Home, Leaf, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import type { ProjectCategoryId } from "@/config/project-categories";
import { getProjectCategoryLabel } from "@/config/project-categories";
import type { Locale } from "@/config/site";
import { baseScores, scoreDimensions } from "../model/scoring";
import {
  co2TargetKg,
  formatMetric,
  fullFootprintNote,
  metrics,
  referenceValues
} from "../model/calculator";
import type { AnnualValues, RoomId, ScoreDimension, Scores } from "../model/types";
import { availableRooms, rooms } from "../config/rooms";

/**
 * Welcher Lebensraum zu welcher schwächsten Dimension passt, samt Begründung.
 * Vorher stand diese Zuordnung als if-Kette in einer IIFE mitten im JSX und
 * deckte nur drei der vier Dimensionen ab — „Biodiversität" fiel stillschweigend
 * in denselben Zweig wie der Standardfall.
 */
const recommendationByDimension: Record<
  ScoreDimension,
  { category: ProjectCategoryId; reason: string }
> = {
  biodiversity: {
    category: "settlement-areas",
    reason:
      "Im direkten Wohnumfeld entstehen die Lebensräume, die dein Haushalt am unmittelbarsten prägt — Grünflächen, Nisthilfen und blühende Säume mitten im Siedlungsraum."
  },
  water: {
    category: "wetlands",
    reason:
      "Feuchtgebiete speichern Wasser in der Landschaft und puffern Trockenphasen ab. Sie wirken dort, wo dein Wasserverbrauch ansetzt."
  },
  carbon: {
    category: "cultural-landscapes",
    reason:
      "Gepflegte Kulturlandschaften binden Kohlenstoff in Böden und Gehölzen und halten gleichzeitig die Artenvielfalt, die intensive Nutzung verdrängt."
  },
  resources: {
    category: "meadows-dry-grasslands",
    reason:
      "Extensiv genutzte Wiesen und Trockenrasen kommen mit wenig Eintrag aus. Sie zeigen, wie ein sparsamer Umgang mit Ressourcen Artenvielfalt erzeugt statt sie zu kosten."
  }
};

/** Ein gerechneter Messwert gegen seinen Vergleichsanker. */
function MeasuredMetric({
  label,
  scopeNote,
  value,
  reference,
  formatted,
  target
}: {
  label: string;
  scopeNote: string;
  value: number;
  reference: number;
  formatted: { value: string; unit: string };
  target?: { share: number; label: string };
}) {
  const reduceMotion = useReducedMotion();
  const share = reference > 0 ? value / reference : 0;
  // Der Durchschnitt sitzt bei zwei Dritteln der Spur, damit auch ein Wert
  // deutlich darüber noch im Bild bleibt, statt den Balken abzuschneiden.
  const scale = Math.max(1.5, share * 1.15);
  const width = Math.min(100, (share / scale) * 100);
  const referenceAt = (1 / scale) * 100;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-4">
      <dt className="text-[11px] font-medium text-[var(--color-muted)]">{label}</dt>
      <dd className="mt-1">
        <span className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold tabular-nums">{formatted.value}</span>
          <span className="text-xs font-medium text-[var(--color-muted)]">{formatted.unit}</span>
        </span>

        <div className="relative mt-3 h-2 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-stone)]">
          <motion.div
            className={cn(
              "h-full rounded-[var(--radius-md)]",
              share > 1 ? "bg-[var(--color-clay)]" : "bg-[var(--color-forest)]"
            )}
            initial={reduceMotion ? false : { width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          />
          <span
            className="absolute inset-y-[-2px] w-px bg-[var(--color-ink)]/45"
            style={{ left: `${referenceAt}%` }}
            aria-hidden
          />
          {target && target.share < scale && (
            <span
              className="absolute inset-y-[-2px] w-px bg-[var(--color-forest)]"
              style={{ left: `${(target.share / scale) * 100}%` }}
              aria-hidden
            />
          )}
        </div>

        {/* Die Marken beschriftet: eine Haarlinie ohne Legende ist Dekoration. */}
        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] leading-4 text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-px bg-[var(--color-ink)]/45" aria-hidden />
            Durchschnitt
          </span>
          {target && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-px bg-[var(--color-forest)]" aria-hidden />
              {target.label}
            </span>
          )}
          <span
            className={cn(
              "tabular-nums font-semibold",
              share > 1 ? "text-[var(--color-clay-ink)]" : "text-[var(--color-forest)]"
            )}
          >
            {Math.round(share * 100)} % des Durchschnitts
          </span>
        </span>

        <span className="mt-2 block text-[11px] leading-4 text-[var(--color-muted)]">
          {scopeNote}
        </span>
      </dd>
    </div>
  );
}

export function TourResults({
  scores,
  totals,
  completedRooms,
  locale,
  onContinue,
  onOpenRoom
}: {
  scores: Scores;
  totals: AnnualValues;
  completedRooms: RoomId[];
  locale: Locale;
  onContinue: () => void;
  onOpenRoom: (id: RoomId) => void;
}) {
  const sorted = [...scoreDimensions].sort((a, b) => scores[b.id] - scores[a.id]);
  const co2Formatted = formatMetric("co2", totals.co2Kg);
  const targetFactor = totals.co2Kg > 0 ? totals.co2Kg / co2TargetKg : 0;

  const openRooms = availableRooms.filter((room) => !completedRooms.includes(room.id));
  const lowest = sorted.at(-1) ?? scoreDimensions[0];
  const recommendation = recommendationByDimension[lowest.id];
  const categoryLabel = getProjectCategoryLabel(recommendation.category, locale);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
      {/* ① Woraus diese Bilanz besteht — vor jeder Zahl. Absolute Summen ohne
          Abdeckungsangabe wirken vollständiger, als sie sind. */}
      <span className="grid size-12 place-items-center rounded-full bg-[var(--color-forest)] text-white">
        <Leaf className="size-5" aria-hidden />
      </span>
      <Label size="dense" className="mt-6">Deine Jahresbilanz</Label>
      <h1 className="mt-3 font-display text-[length:var(--text-display)] leading-[var(--leading-display)]">
        {co2Formatted.value} {co2Formatted.unit} CO₂ im Jahr.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
        {targetFactor > 1
          ? `Das ist rund das ${targetFactor.toLocaleString("de-DE", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1
            })}-Fache dessen, was langfristig pro Person tragfähig wäre. `
          : "Damit liegst du im Bereich dessen, was langfristig pro Person tragfähig wäre. "}
        {fullFootprintNote}
      </p>
      <p className="mt-3 max-w-xl text-xs leading-5 text-[var(--color-muted)]">
        Grundlage sind{" "}
        <strong className="font-semibold text-[var(--color-ink)] tabular-nums">
          {completedRooms.length} von {availableRooms.length} Räumen
        </strong>
        {openRooms.length > 0
          ? ". Mit jedem weiteren Raum steigen diese Summen — sie sind ein Zwischenstand, keine vollständige Bilanz."
          : ". Damit ist jeder Raum des Hauses erfasst."}
      </p>

      {/* ② Die gerechneten Messwerte. */}
      <section className="mt-10" aria-labelledby="results-measured">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--color-line)] pb-3">
          <h2 id="results-measured" className="text-xl font-semibold tracking-[-0.02em]">
            Gerechnet
          </h2>
          <p className="text-[11px] text-[var(--color-muted)]">
            Physikalische Größen pro Person und Jahr
          </p>
        </div>

        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => {
            const value = totals[metric.key];
            const reference = referenceValues[metric.key];
            return (
              <MeasuredMetric
                key={metric.id}
                label={metric.label}
                scopeNote={metric.scopeNote}
                value={value}
                reference={reference}
                formatted={formatMetric(metric.id, value, Math.max(value, reference))}
                target={
                  metric.id === "co2"
                    ? { share: co2TargetKg / reference, label: "1,5-Grad-Ziel" }
                    : undefined
                }
              />
            );
          })}
        </dl>

        <p className="mt-3 text-[11px] leading-4 text-[var(--color-muted)]">
          Vergleichswert ist der Durchschnitt für die hier erfassten Bereiche, pro Person und Jahr —
          nicht der volle Fußabdruck.{" "}
          <Link
            href={`/${locale}/methodik`}
            className={cn(
              "font-semibold text-[var(--color-forest)] underline underline-offset-2",
              focusRingTool
            )}
          >
            Alle Faktoren und Annahmen
          </Link>
        </p>

        {/* Die naheliegendste Rückfrage an eine CO₂-Zahl ist „wo gleiche ich sie
            aus?". Sie bekommt ihre Antwort hier, nicht erst im Footer. */}
        <p className="mt-1.5 text-[11px] leading-4 text-[var(--color-muted)]">
          Einen Kompensationsrechner gibt es hier bewusst nicht.{" "}
          <Link
            href={`/${locale}/co2-und-biodiversitaet`}
            className={cn(
              "font-semibold text-[var(--color-forest)] underline underline-offset-2",
              focusRingTool
            )}
          >
            Warum wir auf Lebensräume setzen
          </Link>
        </p>
      </section>

      {/* ③ Die qualitativen Indizes — ausdrücklich getrennt, weil „CO₂" hier
          eine Punktzahl meint und oben ein Gewicht in Kilogramm. */}
      <section className="mt-10" aria-labelledby="results-profile">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--color-line)] pb-3">
          <h2 id="results-profile" className="text-xl font-semibold tracking-[-0.02em]">
            Eingeschätzt
          </h2>
          <p className="text-[11px] text-[var(--color-muted)]">
            Punkte von 0 bis 100, Start bei 50
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {scoreDimensions.map((item) => {
            const delta = scores[item.id] - baseScores[item.id];
            return (
              <div
                key={item.id}
                className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-2.5"
              >
                <dt className="text-[11px] font-medium text-[var(--color-muted)]">{item.label}</dt>
                <dd className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-base font-semibold tabular-nums">{scores[item.id]}</span>
                  <span className="text-[11px] text-[var(--color-muted)]">von 100</span>
                  {delta !== 0 && (
                    <span
                      className={cn(
                        "text-[11px] font-semibold tabular-nums",
                        delta > 0 ? "text-[var(--color-forest)]" : "text-[var(--color-clay-ink)]"
                      )}
                    >
                      {delta > 0 ? "+" : ""}
                      {delta}
                    </span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="mt-3 text-[11px] leading-4 text-[var(--color-muted)]">
          Diese vier Werte sind keine Messwerte, sondern eine didaktisch vereinfachte Einschätzung:
          Jede Antwort verschiebt den Startwert 50 nach oben oder unten. Was sich in Kilogramm,
          Litern und Kilowattstunden fassen lässt, steht oben unter „Gerechnet&ldquo;.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-4 text-xs">
            <span className="text-[var(--color-muted)]">Stärkster Bereich</span>
            <strong className="mt-1 block text-sm">{sorted[0].label}</strong>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-4 text-xs">
            <span className="text-[var(--color-muted)]">Größtes Potenzial</span>
            <strong className="mt-1 block text-sm">{lowest.label}</strong>
          </div>
        </div>
      </section>

      {/* ④ Was noch fehlt — als Weg zurück ins Haus, nicht als Vorwurf. */}
      {(openRooms.length > 0 || completedRooms.length > 0) && (
        <section className="mt-10" aria-labelledby="results-coverage">
          <h2 id="results-coverage" className="sr-only">
            Abdeckung der Bilanz
          </h2>

          {completedRooms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {completedRooms.map((id) => (
                <span
                  key={id}
                  className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-1.5 text-[11px] font-semibold"
                >
                  <Check className="size-3 text-[var(--color-forest)]" aria-hidden />
                  {rooms.find((room) => room.id === id)?.title}
                </span>
              ))}
            </div>
          )}

          {openRooms.length > 0 && (
            <>
              <p className="mt-4 text-xs font-semibold">Noch nicht in der Bilanz</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {openRooms.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => onOpenRoom(room.id)}
                    className={cn(
                      "flex min-h-11 items-center gap-1.5 rounded-[var(--radius-md)] border border-dashed border-[var(--color-forest)]/40 bg-white px-3 text-[11px] font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-sage)]/40",
                      focusRingTool
                    )}
                  >
                    <Plus className="size-3.5" aria-hidden />
                    {room.title} erfassen
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* ⑤ Der Weg vom Ergebnis zum Projekt. */}
      <section
        className="mt-10 rounded-[var(--radius-xl)] border border-[var(--color-forest)]/20 bg-[var(--color-forest)]/5 p-5 sm:p-6"
        aria-labelledby="results-recommendation"
      >
        <Label size="dense">Empfehlung aus deinem Ergebnis</Label>
        <h2 id="results-recommendation" className="mt-2 text-xl font-semibold tracking-[-0.02em]">
          Dein größtes Potenzial liegt bei {lowest.label}.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
          {recommendation.reason} Deshalb führt dein Einstieg über{" "}
          <strong className="font-semibold text-[var(--color-ink)]">{categoryLabel}</strong> in
          Südtirol.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/projekte?kategorie=${encodeURIComponent(recommendation.category)}`}
            className={cn(
              "inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-accent-hover)]",
              focusRingTool
            )}
          >
            Projekte für {categoryLabel} ansehen
            <ArrowRight className="size-4" aria-hidden />
          </Link>

          {openRooms.length > 0 ? (
            <button
              type="button"
              onClick={() => onOpenRoom(openRooms[0].id)}
              className={cn(
                "inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-5 text-sm font-semibold transition-colors hover:bg-[var(--color-paper)]",
                focusRingTool
              )}
            >
              Weiter: {openRooms[0].title}
              <ChevronRight className="size-4" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={onContinue}
              className={cn(
                "inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-5 text-sm font-semibold transition-colors hover:bg-[var(--color-paper)]",
                focusRingTool
              )}
            >
              <Home className="size-4" aria-hidden />
              Zur Hausübersicht
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
