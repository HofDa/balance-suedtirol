"use client";

import Image from "next/image";
import Link from "next/link";
import { BarChart3, Home, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/public-path";
import type { Locale } from "@/config/site";
import { focusRingTool } from "@/components/ui/focus";
import type { TourView } from "../model/types";

export function TourToolbar({
  locale,
  view,
  completedObjects,
  totalObjects,
  onHouse,
  onReset,
  onResults
}: {
  locale: Locale;
  view: TourView;
  completedObjects: number;
  totalObjects: number;
  onHouse: () => void;
  onReset: () => void;
  onResults: () => void;
}) {
  return (
    <div className="flex h-full items-center justify-between gap-3 border-b border-[var(--color-line)] bg-[var(--color-paper)] px-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
      {/* Mobil ist die Kopfzeile der Website ausgeblendet; das Logo führt zurück. */}
      <Link
        href={`/${locale}`}
        aria-label="b*alance – zur Startseite"
        className={cn("inline-flex min-h-11 shrink-0 items-center md:hidden", focusRingTool)}
      >
        <Image
          src={withBasePath("/balance-logo-harmonized.svg")}
          alt=""
          width={1280}
          height={610}
          sizes="64px"
          className="h-8 w-16 object-contain"
        />
      </Link>
      <span className="h-6 w-px bg-[var(--color-line)] md:hidden" aria-hidden />
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
      </div>

      <div className="flex items-center gap-1">
        {/* „12/21 Objekte“ las sich wie eine Anzeige, nicht wie ein Weg. Das
            Verb steht jetzt vorn, der Zähler dahinter. */}
        <button
          type="button"
          onClick={onResults}
          disabled={!completedObjects}
          aria-current={view === "results" ? "page" : undefined}
          title={
            completedObjects
              ? "Deine Jahresbilanz ansehen"
              : "Beantworte ein Objekt, dann wird die Bilanz sichtbar"
          }
          aria-label={
            completedObjects
              ? `Bilanz ansehen. ${completedObjects} von ${totalObjects} Objekten bearbeitet`
              : `Bilanz noch nicht verfügbar. Beantworte zuerst ein Objekt von ${totalObjects}`
          }
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-3 text-xs font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-ink)]/5 disabled:opacity-45",
            view === "results" && "bg-[var(--color-ink)]/5",
            focusRingTool
          )}
        >
          <BarChart3 className="size-4" aria-hidden />
          Bilanz
          <span className="tabular-nums text-[var(--color-ink)]/40">
            {completedObjects}/{totalObjects}
          </span>
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
