import { getProjectCategories } from "@/config/project-categories";
import type { Locale } from "@/config/site";
import type { SubmissionCopy } from "../config/copy";
import { submissionRecipient } from "../config/copy";
import { allFields, formSteps } from "../config/form-schema";
import type { Field, FieldErrors, FormValues } from "./types";

const localeTags: Record<Locale, string> = { de: "de-IT", it: "it-IT", en: "en-GB" };

/**
 * Die vorausgefüllte E-Mail ist eine URL, und URLs sind endlich. Der
 * Windows-Shell hört bei rund 2 000 Zeichen auf; darüber öffnet sich entweder
 * gar nichts oder ein abgeschnittener Text. Wird es länger, trägt die Datei die
 * Angaben und die E-Mail nur noch die Bitte, sie anzuhängen.
 */
const MAILTO_LIMIT = 1900;

export function emptyValues(): FormValues {
  const values: FormValues = {};
  for (const field of allFields) {
    values[field.id] = field.kind === "consent" ? false : field.kind === "checkboxes" ? [] : "";
  }
  return values;
}

export function getFieldOptions(field: Field, locale: Locale): Array<{ value: string; label: string }> {
  if (field.optionsFrom === "habitats") {
    return getProjectCategories(locale).map((category) => ({ value: category.id, label: category.label }));
  }
  return (field.options ?? []).map((option) => ({ value: option.value, label: option.label[locale] }));
}

export function asText(value: FormValues[string]): string {
  return typeof value === "string" ? value : "";
}

export function asList(value: FormValues[string]): string[] {
  return Array.isArray(value) ? value : [];
}

function formatNumber(field: Field, raw: string, locale: Locale): string {
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return raw;
  const tag = localeTags[locale];
  if (field.unit === "eur") {
    return new Intl.NumberFormat(tag, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(parsed);
  }
  const number = new Intl.NumberFormat(tag, { maximumFractionDigits: 3 }).format(parsed);
  return field.unit ? `${number} ${field.unit}` : number;
}

function formatDate(raw: string, locale: Locale): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (!match) return raw;
  const [, year, month, day] = match;
  // Über UTC formatiert: `new Date("2026-01-01")` liegt sonst je nach Zeitzone
  // einen Tag daneben.
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

/** Lesbare Fassung eines Werts für Zusammenfassung, E-Mail und Ausdruck. */
export function formatValue(field: Field, value: FormValues[string], locale: Locale): string {
  if (field.kind === "consent") return value === true ? "✓" : "";
  if (field.kind === "checkboxes") {
    const selected = asList(value);
    if (selected.length === 0) return "";
    const options = getFieldOptions(field, locale);
    return selected
      .map((entry) => options.find((option) => option.value === entry)?.label ?? entry)
      .join(", ");
  }

  const raw = asText(value).trim();
  if (!raw) return "";
  if (field.kind === "number") return formatNumber(field, raw, locale);
  if (field.kind === "date") return formatDate(raw, locale);
  if (field.kind === "select") {
    return getFieldOptions(field, locale).find((option) => option.value === raw)?.label ?? raw;
  }
  return raw;
}

function isFilled(field: Field, value: FormValues[string]): boolean {
  if (field.kind === "consent") return value === true;
  if (field.kind === "checkboxes") return asList(value).length > 0;
  return asText(value).trim().length > 0;
}

/**
 * Absichtlich großzügig: Das Formular soll Tippfehler abfangen, nicht über die
 * Gültigkeit exotischer Adressen entscheiden. Das tut ohnehin erst der Versand.
 */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateFields(fields: Field[], values: FormValues, copy: SubmissionCopy): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of fields) {
    const value = values[field.id];

    if (field.required && !isFilled(field, value)) {
      errors[field.id] =
        field.kind === "consent"
          ? copy.errors.consent
          : field.kind === "checkboxes"
            ? copy.errors.choice
            : copy.errors.required;
      continue;
    }

    if (field.kind === "email" && asText(value).trim() && !emailPattern.test(asText(value).trim())) {
      errors[field.id] = copy.errors.email;
    }
  }

  const start = asText(values.startdatum);
  const end = asText(values.enddatum);
  const checksDates = fields.some((field) => field.id === "enddatum");
  if (checksDates && start && end && end < start) {
    errors.enddatum = copy.errors.endBeforeStart;
  }

  return errors;
}

export function validateStep(stepIndex: number, values: FormValues, copy: SubmissionCopy): FieldErrors {
  const fields = formSteps[stepIndex].groups.flatMap((group) => group.fields);
  return validateFields(fields, values, copy);
}

export function validateAll(values: FormValues, copy: SubmissionCopy): FieldErrors {
  return validateFields(allFields, values, copy);
}

/**
 * Kein Fehler, sondern eine Rückfrage: Zuschuss plus Eigenanteil müssen die
 * Gesamtkosten nicht treffen — Sachleistungen und Eigenleistung stehen oft
 * daneben. Nur wenn die Summe deutlich abweicht, lohnt der Hinweis.
 */
export function getBudgetHint(values: FormValues, locale: Locale, copy: SubmissionCopy): string | null {
  const total = Number(asText(values.kosten_gesamt));
  const funding = Number(asText(values.foerdermittel));
  const own = Number(asText(values.eigenanteil));
  if (!Number.isFinite(total) || total <= 0) return null;
  if (!asText(values.foerdermittel) || !asText(values.eigenanteil)) return null;
  if (!Number.isFinite(funding) || !Number.isFinite(own)) return null;

  const parts = funding + own;
  if (Math.abs(parts - total) <= total * 0.01) return null;

  const money = new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  });
  return copy.budgetHint(money.format(parts), money.format(total));
}

/** Die vollständige Einreichung als Klartext — Grundlage für E-Mail und Datei. */
export function buildSubmissionText(values: FormValues, locale: Locale, copy: SubmissionCopy): string {
  const lines: string[] = [copy.mailIntro, ""];

  for (const step of formSteps) {
    const stepLines: string[] = [];
    for (const group of step.groups) {
      const groupLines = group.fields
        .map((field) => {
          const formatted = formatValue(field, values[field.id], locale);
          if (!formatted) return null;
          return `- ${field.label[locale]}: ${formatted}`;
        })
        .filter((line): line is string => line !== null);

      if (groupLines.length > 0) {
        stepLines.push(`${group.title[locale]}`, ...groupLines, "");
      }
    }

    if (stepLines.length > 0) {
      lines.push(`## ${step.title[locale]}`, "", ...stepLines);
    }
  }

  return lines.join("\n").trimEnd();
}

export type MailDraft = { href: string; needsAttachment: boolean };

export function buildMailDraft(values: FormValues, locale: Locale, copy: SubmissionCopy): MailDraft {
  const project = asText(values.projektname).trim() || copy.eyebrow;
  const subject = encodeURIComponent(copy.mailSubject(project));
  const full = buildSubmissionText(values, locale, copy);
  const href = `mailto:${submissionRecipient}?subject=${subject}&body=${encodeURIComponent(full)}`;

  if (href.length <= MAILTO_LIMIT) return { href, needsAttachment: false };

  const short = [
    copy.mailIntro,
    "",
    `- ${allFields.find((field) => field.id === "projektname")?.label[locale]}: ${project}`,
    `- ${allFields.find((field) => field.id === "gemeinde")?.label[locale]}: ${asText(values.gemeinde)}`,
    "",
    copy.attachNote
  ].join("\n");

  return {
    href: `mailto:${submissionRecipient}?subject=${subject}&body=${encodeURIComponent(short)}`,
    needsAttachment: true
  };
}

export function buildFileName(values: FormValues): string {
  const slug = asText(values.projektname)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `balance-projekteinreichung${slug ? `-${slug}` : ""}.txt`;
}
