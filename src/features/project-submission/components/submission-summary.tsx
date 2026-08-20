"use client";

import type { Locale } from "@/config/site";
import type { SubmissionCopy } from "../config/copy";
import { formSteps } from "../config/form-schema";
import { formatValue } from "../model/submission";
import type { FormValues } from "../model/types";

/**
 * Was tatsächlich übermittelt wird — nicht mehr und nicht weniger.
 *
 * Leere Felder stehen bewusst nicht in der Liste: Die Zusammenfassung ist die
 * Vorschau der E-Mail, und `buildSubmissionText` lässt sie ebenfalls weg. Was
 * hier fehlt und nicht fehlen darf, hat die Prüfung vorher schon gemeldet.
 */
export function SubmissionSummary({
  values,
  locale,
  copy,
  onEdit
}: {
  values: FormValues;
  locale: Locale;
  copy: SubmissionCopy;
  onEdit?: (stepIndex: number) => void;
}) {
  return (
    <div className="divide-y divide-[var(--color-line)]">
      {formSteps.map((step, stepIndex) => {
        const entries = step.groups
          .flatMap((group) => group.fields)
          .map((field) => ({ field, formatted: formatValue(field, values[field.id], locale) }))
          .filter((entry) => entry.formatted !== "");

        if (entries.length === 0) return null;

        return (
          <section key={step.id} className="py-5 first:pt-0 last:pb-0">
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="text-sm font-bold text-[var(--color-ink)]">{step.title[locale]}</h4>
              {onEdit ? (
                <button
                  type="button"
                  onClick={() => onEdit(stepIndex)}
                  className="shrink-0 text-xs font-semibold text-[var(--color-forest)] underline decoration-[var(--color-forest)]/30 underline-offset-4 transition hover:decoration-[var(--color-forest)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2"
                >
                  {copy.edit}
                </button>
              ) : null}
            </div>

            <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
              {entries.map(({ field, formatted }) => (
                <div key={field.id} className="contents">
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                    {field.label[locale]}
                  </dt>
                  <dd className="mb-2 whitespace-pre-line text-sm leading-6 text-[var(--color-ink)] sm:mb-0">
                    {formatted}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}
