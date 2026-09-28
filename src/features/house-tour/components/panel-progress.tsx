"use client";

import { motion } from "framer-motion";
import { formatMetric, hasValues, metrics } from "../model/calculator";
import type { AnnualValues, TourRoom } from "../model/types";

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

