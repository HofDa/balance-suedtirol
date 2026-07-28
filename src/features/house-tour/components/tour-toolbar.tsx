"use client";

import { BarChart3, Home, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import type { TourView } from "../model/types";

export function TourToolbar({
  view,
  completedObjects,
  totalObjects,
  onHouse,
  onReset,
  onResults
}: {
  view: TourView;
  completedObjects: number;
  totalObjects: number;
  onHouse: () => void;
  onReset: () => void;
  onResults: () => void;
}) {
  return (
    <div className="flex h-full items-center justify-between gap-3 border-b border-[var(--color-line)] bg-[var(--color-paper)] px-3 sm:px-5">
      <button
        type="button"
        onClick={onHouse}
        aria-current={view === "house" ? "page" : undefined}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] text-xs font-semibold transition-colors",
          view === "house" ? "text-[var(--color-forest)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
          focusRingTool
        )}
      >
        <Home className="size-4" aria-hidden />
        Haus
      </button>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onResults}
          disabled={!completedObjects}
          aria-label={`${completedObjects} von ${totalObjects} Objekten bearbeitet. Ergebnis öffnen`}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-3 text-xs font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-ink)]/5 disabled:opacity-45",
            focusRingTool
          )}
        >
          <BarChart3 className="size-4" aria-hidden />
          <span className="tabular-nums">{completedObjects}/{totalObjects}</span>
          <span className="hidden sm:inline">Objekte</span>
        </button>
        <button
          type="button"
          onClick={onReset}
          aria-label="Tour zurücksetzen"
          className={cn(
            "grid size-11 place-items-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)]/5",
            focusRingTool
          )}
        >
          <RotateCcw className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
