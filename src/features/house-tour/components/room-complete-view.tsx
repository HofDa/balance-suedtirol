"use client";

import { useMemo } from "react";
import { CheckCircle2, ChevronRight, Home, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import { bestCaseSaving, optionValues, summarizeValues } from "../model/calculator";
import { MetricBars } from "./metric-readout";
import type { AnnualValues, TourRoom } from "../model/types";

const completionCopy: Partial<Record<TourRoom["id"], string>> = {
  bath: "Du hast erkundet, wie Wasserverbrauch und Alltagsprodukte mit Gewässern und natürlichen Ressourcen zusammenhängen.",
  bedroom: "Du hast erkundet, wie Wärme, Textilien und Elektronik Ressourcen und Lebensräume beeinflussen.",
  living: "Du hast erkundet, wie Energie, Geräte und Materialien mit der Biodiversität verbunden sind.",
  kitchen: "Du hast erkundet, wie Ernährung, Herkunft und Abfälle Flächen und Lebensräume beeinflussen.",
  mobility: "Du hast erkundet, wie unsere Wege Energie, Flächen und die Qualität lokaler Lebensräume prägen.",
  garden: "Du hast erkundet, wie Boden, Pflanzen und Strukturen direkt neue Lebensräume schaffen."
};

/** Abschlussansicht eines Raums: Befund, Zwischenbilanz und der Weg weiter. */
export function RoomCompleteView({
  room,
  answers,
  adjustments,
  totals,
  nextRoom,
  allComplete,
  reduceMotion,
  onResults,
  onNextRoom,
  onHouse
}: {
  room: TourRoom;
  answers: Record<string, string>;
  adjustments: Record<string, number>;
  totals: AnnualValues;
  nextRoom?: TourRoom;
  allComplete: boolean;
  reduceMotion: boolean | null;
  onResults: () => void;
  onNextRoom: () => void;
  onHouse: () => void;
}) {
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

  return (
    <motion.div
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
  );
}
