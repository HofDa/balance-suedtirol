"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { formatMetric, hasValues, metrics } from "../model/calculator";
import type { AnnualValues, MetricId, TourRoom } from "../model/types";

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
 * Zählt vom alten zum neuen Wert, damit eine Antwort sichtbar etwas bewegt.
 * Die Einheit richtet sich nach dem Zielwert: sie springt nicht mitten im
 * Zählen von kWh auf MWh.
 */
function CountingMetric({ metric, value }: { metric: MetricId; value: number }) {
  const reduceMotion = useReducedMotion();
  // Beim ersten Erscheinen von null an: die erste Antwort füllt die Bilanz.
  const [shown, setShown] = useState(reduceMotion ? value : 0);
  const shownRef = useRef(reduceMotion ? value : 0);
  useEffect(() => {
    if (reduceMotion) {
      shownRef.current = value;
      setShown(value);
      return;
    }
    const controls = animate(shownRef.current, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        shownRef.current = latest;
        setShown(latest);
      }
    });
    return () => controls.stop();
  }, [value, reduceMotion]);
  const formatted = formatMetric(metric, shown, value);
  return (
    <>
      <span className="text-sm font-semibold tabular-nums">{formatted.value}</span>
      <span className="text-[11px] text-[var(--color-muted)]">{formatted.unit}</span>
    </>
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
export function ProgressSummary({
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
    <div className="border-b border-[var(--color-line)] bg-[var(--color-paper)]/65 max-md:hidden">
      {/* Mobil steht der Raum samt Zähler schon über der Frage. */}
      <div className="hidden px-6 pt-3 md:block">
        <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] md:text-xs">
          <span className="truncate font-semibold">{room.title}</span>
          <span className="tabular-nums text-[var(--color-muted)]">
            {roomHandled} / {room.questions.length}
            <span className="hidden md:inline"> Objekte</span>
          </span>
        </div>
        <ProgressBar value={roomHandled} total={room.questions.length} />
      </div>

      {/* Mobil nicht: dort zeigt die Szene die Reaktion auf jede Antwort, und
          die laufende Bilanz steht einen Tipp entfernt hinter „Bilanz“. */}
      {hasRunningTotals && (
        <dl className="hidden grid-cols-3 gap-2 px-3 py-2 md:mt-2 md:grid md:gap-3 md:border-t md:border-[var(--color-line)] md:px-6 md:py-2.5">
          {metrics.map((metric) => {
            const raw = totals[metric.key];
            return (
              <div key={metric.id} className="min-w-0">
                <dt className="truncate text-[11px] font-medium text-[var(--color-muted)]">
                  {metric.short}
                </dt>
                <dd className="flex items-baseline gap-1 truncate">
                  {raw > 0 ? (
                    <CountingMetric metric={metric.id} value={raw} />
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

