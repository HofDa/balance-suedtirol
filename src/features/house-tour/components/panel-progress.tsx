"use client";

import { motion } from "framer-motion";
import type { TourRoom } from "../model/types";
import { useTourI18n } from "../i18n/context";

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
 * Kopfzeile mit dem Raumfortschritt, nur auf dem Desktop. Die laufende
 * Jahresbilanz stand hier früher als drei Zahlen; jetzt zeigt jede Antwort
 * ihre Wirkung direkt darunter, und die ganze Bilanz kommt am Ende mit den
 * Hebeln.
 */
export function ProgressSummary({ room, roomHandled }: { room: TourRoom; roomHandled: number }) {
  const { t } = useTourI18n();
  return (
    <div className="border-b border-[var(--color-line)] bg-[var(--color-paper)]/65 px-6 py-3 max-md:hidden">
      <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
        <span className="truncate font-semibold">{room.title}</span>
        <span className="tabular-nums text-[var(--color-muted)]">
          {roomHandled} / {room.questions.length} {t.progressObjects}
        </span>
      </div>
      <ProgressBar value={roomHandled} total={room.questions.length} />
    </div>
  );
}
