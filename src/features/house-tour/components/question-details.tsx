import { ChevronRight, Info, Lightbulb } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";
import { focusRingTool } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import { hasValues, questionBasis, summarizeValues } from "../model/calculator";
import type { AnnualValues, TourQuestion } from "../model/types";

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
 * Hintergrund zur Frage: Erklärtext, genaue Werte, Bilanzgrenze und Rechenweg.
 * Eingeklappt, weil oben nur die Entscheidung und ein Alltagssatz stehen —
 * aber vorhanden, weil eine Zahl ohne nachlesbaren Rechenweg in diesem
 * Produkt nichts verloren hat.
 */
export function QuestionDetails({
  question,
  locale,
  values
}: {
  question: TourQuestion;
  locale: Locale;
  /** Jahreswerte der gewählten Antwort; fehlt die Antwort, fehlt die Zeile. */
  values?: AnnualValues | null;
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
        Hintergrund und genaue Werte
      </summary>

      <div className="grid gap-2.5 border-t border-[var(--color-line)] px-3 py-3 md:px-4">
        {values && hasValues(values) && (
          <p className="text-[11px] leading-4 md:text-xs md:leading-5">
            <span className="font-semibold">Deine Antwort: </span>
            <span className="tabular-nums">{summarizeValues(values)}</span>
            <span className="text-[var(--color-muted)]"> pro Person und Jahr</span>
          </p>
        )}
        <p className="text-[11px] leading-4 text-[var(--color-ink)] md:text-xs md:leading-5">
          {question.impactText}
        </p>
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
