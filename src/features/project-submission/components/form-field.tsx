"use client";

import { Check } from "lucide-react";
import { ProjectCategoryIcon } from "@/components/projects/project-category";
import { chipClass } from "@/components/ui/chip";
import type { ProjectCategoryId } from "@/config/project-categories";
import type { Locale } from "@/config/site";
import { cn } from "@/lib/utils";
import type { SubmissionCopy } from "../config/copy";
import { asList, asText, getFieldOptions } from "../model/submission";
import type { Field, FieldValue } from "../model/types";

/**
 * Ein Eingabefeld in der Sprache des Systems.
 *
 * Die Kante ist die Feldlinie, der Fokus antwortet in Bergwald — dieselbe Form
 * wie die Suche und die Filter der Projektliste. Fehlerhafte Felder tragen
 * Lehm: die einzige Farbe des Systems, die „hier stimmt etwas nicht" bedeutet.
 */
const controlClass =
  "min-h-11 w-full rounded-[var(--radius-md)] border bg-white px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] transition focus:outline-none focus:ring-2";

const restingBorder =
  "border-[var(--color-line)] focus:border-[var(--color-forest)] focus:ring-[var(--color-forest)]/20";

const errorBorder = "border-[var(--color-clay)] focus:border-[var(--color-clay)] focus:ring-[var(--color-clay)]/25";

const unitLabels: Record<NonNullable<Field["unit"]>, string> = {
  ha: "ha",
  km: "km",
  m: "m",
  eur: "€"
};

export function FormField({
  field,
  locale,
  copy,
  value,
  error,
  onChange
}: {
  field: Field;
  locale: Locale;
  copy: SubmissionCopy;
  value: FieldValue;
  error?: string;
  onChange: (next: FieldValue) => void;
}) {
  const hintId = field.hint ? `${field.id}-hint` : undefined;
  const errorId = error ? `${field.id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const isGroup = field.kind === "checkboxes" || field.kind === "consent";

  const labelText = (
    <>
      {field.label[locale]}
      {field.unit ? (
        <span className="font-normal text-[var(--color-muted)]"> ({unitLabels[field.unit]})</span>
      ) : null}
      {field.required ? (
        <span className="text-[var(--color-muted)]" aria-hidden>
          {" "}
          *
        </span>
      ) : null}
      {field.required ? <span className="sr-only"> ({copy.required})</span> : null}
    </>
  );

  return (
    <div className={cn("min-w-0", field.half ? "sm:col-span-1" : "sm:col-span-2")}>
      {field.kind === "consent" ? null : isGroup ? (
        <p className="text-sm font-semibold text-[var(--color-ink)]" id={`${field.id}-label`}>
          {labelText}
        </p>
      ) : (
        <label htmlFor={field.id} className="block text-sm font-semibold text-[var(--color-ink)]">
          {labelText}
        </label>
      )}

      {field.hint && field.kind !== "consent" ? (
        <p id={hintId} className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
          {field.hint[locale]}
        </p>
      ) : null}

      <div className={field.kind === "consent" ? "" : "mt-2"}>
        <Control
          field={field}
          locale={locale}
          value={value}
          error={error}
          describedBy={describedBy}
          labelText={labelText}
          onChange={onChange}
        />
      </div>

      {error ? (
        <p id={errorId} className="mt-2 text-xs font-semibold text-[var(--color-clay-ink)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Control({
  field,
  locale,
  value,
  error,
  describedBy,
  labelText,
  onChange
}: {
  field: Field;
  locale: Locale;
  value: FieldValue;
  error?: string;
  describedBy?: string;
  labelText: React.ReactNode;
  onChange: (next: FieldValue) => void;
}) {
  const shell = cn(controlClass, error ? errorBorder : restingBorder);

  if (field.kind === "textarea") {
    return (
      <textarea
        id={field.id}
        name={field.id}
        rows={4}
        value={asText(value)}
        placeholder={field.placeholder?.[locale]}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(shell, "min-h-28 resize-y leading-6")}
      />
    );
  }

  if (field.kind === "select") {
    return (
      <select
        id={field.id}
        name={field.id}
        value={asText(value)}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={shell}
      >
        <option value="">—</option>
        {getFieldOptions(field, locale).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.kind === "checkboxes") {
    const selected = asList(value);
    const toggle = (option: string) =>
      onChange(selected.includes(option) ? selected.filter((entry) => entry !== option) : [...selected, option]);

    /* Die Lebensräume sind dieselbe Taxonomie, mit der die Projektliste
       filtert. Sie tragen deshalb dieselbe Chip-Form — wer dort ausgewählt
       hat, erkennt die Geste hier wieder. */
    if (field.optionsFrom === "habitats") {
      return (
        <div role="group" aria-labelledby={`${field.id}-label`} aria-describedby={describedBy} className="flex flex-wrap gap-2">
          {getFieldOptions(field, locale).map((option) => {
            const isActive = selected.includes(option.value);
            return (
              <label
                key={option.value}
                className={chipClass({
                  active: isActive,
                  className: cn(
                    "cursor-pointer has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--color-forest)] has-[:focus-visible]:ring-offset-2",
                    error && !isActive && "border-[var(--color-clay)]/60"
                  )
                })}
              >
                <input
                  type="checkbox"
                  name={field.id}
                  value={option.value}
                  checked={isActive}
                  onChange={() => toggle(option.value)}
                  className="sr-only"
                />
                {isActive ? (
                  <Check className="size-3.5" aria-hidden />
                ) : (
                  <ProjectCategoryIcon categoryId={option.value as ProjectCategoryId} />
                )}
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      );
    }

    return (
      <div role="group" aria-labelledby={`${field.id}-label`} aria-describedby={describedBy} className="grid gap-1 sm:grid-cols-2">
        {getFieldOptions(field, locale).map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-2 py-1.5 text-sm leading-6 text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper)]",
              "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--color-forest)] has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white"
            )}
          >
            <input
              type="checkbox"
              name={field.id}
              value={option.value}
              checked={selected.includes(option.value)}
              onChange={() => toggle(option.value)}
              className="size-4 shrink-0 accent-[var(--color-forest)] focus-visible:outline-none"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.kind === "consent") {
    return (
      <label
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-[var(--radius-lg)] border p-4 text-sm leading-6 text-[var(--color-ink)] transition-colors",
          error ? "border-[var(--color-clay)] bg-[var(--color-clay)]/5" : "border-[var(--color-line)] bg-[var(--color-paper)]",
          "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--color-forest)] has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-white"
        )}
      >
        <input
          id={field.id}
          type="checkbox"
          name={field.id}
          checked={value === true}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-[var(--color-forest)] focus-visible:outline-none"
        />
        <span>{labelText}</span>
      </label>
    );
  }

  return (
    <input
      id={field.id}
      name={field.id}
      type={field.kind}
      inputMode={field.kind === "number" ? "decimal" : undefined}
      step={field.step}
      min={field.kind === "number" ? 0 : undefined}
      value={asText(value)}
      placeholder={field.placeholder?.[locale]}
      autoComplete={field.id === "email" ? "email" : field.id === "telefon" ? "tel" : undefined}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      onChange={(event) => onChange(event.target.value)}
      className={cn(shell, field.kind === "number" && "tabular-nums")}
    />
  );
}
