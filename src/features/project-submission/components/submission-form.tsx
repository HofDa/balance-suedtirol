"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  Info,
  Mail,
  Printer,
  TriangleAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { focusRing } from "@/components/ui/focus";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Surface } from "@/components/ui/surface";
import type { Locale } from "@/config/site";
import { cn } from "@/lib/utils";
import { getSubmissionCopy, submissionRecipient } from "../config/copy";
import { allFields, findStepIndexOfField, formSteps } from "../config/form-schema";
import {
  buildFileName,
  buildMailDraft,
  buildSubmissionText,
  emptyValues,
  getBudgetHint,
  validateAll,
  validateStep,
  type MailDraft
} from "../model/submission";
import type { FieldErrors, FieldValue, FormValues } from "../model/types";
import { FormField } from "./form-field";
import { SubmissionSummary } from "./submission-summary";

/** Versionsnummer im Schlüssel: Ändert sich das Feldschema, verfällt der Entwurf. */
const STORAGE_KEY = "balance:projekteinreichung:v1";

function isEmptyValue(value: FieldValue): boolean {
  if (typeof value === "boolean") return value === false;
  if (Array.isArray(value)) return value.length === 0;
  return value.trim() === "";
}

export function SubmissionForm({ locale }: { locale: Locale }) {
  const copy = getSubmissionCopy(locale);

  const [values, setValues] = useState<FormValues>(emptyValues);
  const [stepIndex, setStepIndex] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isDone, setIsDone] = useState(false);
  const [mailDraft, setMailDraft] = useState<MailDraft | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  /* Erst ab dem ersten Schrittwechsel darf der Fokus springen — sonst reißt er
     beim Laden der Seite aus dem Seitenanfang heraus. */
  const hasNavigated = useRef(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { values?: FormValues; stepIndex?: number };
        if (parsed.values) {
          // Über die leeren Werte gelegt: Felder, die es nicht mehr gibt,
          // fallen weg, neue kommen mit ihrem Startwert dazu.
          const restored = emptyValues();
          for (const field of allFields) {
            const value = parsed.values[field.id];
            if (value !== undefined) restored[field.id] = value;
          }
          setValues(restored);
        }
        if (typeof parsed.stepIndex === "number") {
          const safe = Math.min(Math.max(parsed.stepIndex, 0), formSteps.length - 1);
          setStepIndex(safe);
          setFurthestStep(safe);
        }
      }
    } catch {
      // Kein Speicher, kein Entwurf — das Formular funktioniert auch so.
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, stepIndex }));
    } catch {
      // Privater Modus oder voller Speicher: nicht der Rede wert.
    }
  }, [values, stepIndex, isHydrated]);

  useEffect(() => {
    if (!hasNavigated.current) return;
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [stepIndex, isDone]);

  const setValue = useCallback((fieldId: string, next: FieldValue) => {
    setValues((current) => ({ ...current, [fieldId]: next }));
    setErrors((current) => {
      if (!(fieldId in current)) return current;
      const next = { ...current };
      delete next[fieldId];
      return next;
    });
  }, []);

  const goToStep = useCallback((next: number) => {
    hasNavigated.current = true;
    setStepIndex(next);
    setFurthestStep((current) => Math.max(current, next));
  }, []);

  const step = formSteps[stepIndex];
  const isLastStep = stepIndex === formSteps.length - 1;
  const errorCount = Object.keys(errors).length;
  const hasDraft = allFields.some((field) => !isEmptyValue(values[field.id]));
  const budgetHint = getBudgetHint(values, locale, copy);

  const announceErrors = (found: FieldErrors) => {
    setErrors(found);
    window.requestAnimationFrame(() => errorRef.current?.focus());
  };

  const handleNext = () => {
    const found = validateStep(stepIndex, values, copy);
    if (Object.keys(found).length > 0) {
      announceErrors(found);
      return;
    }
    setErrors({});
    goToStep(stepIndex + 1);
  };

  const downloadSubmission = useCallback(() => {
    const blob = new Blob([buildSubmissionText(values, locale, copy)], {
      type: "text/plain;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = buildFileName(values);
    anchor.click();
    URL.revokeObjectURL(url);
  }, [copy, locale, values]);

  const handleSubmit = () => {
    const found = validateAll(values, copy);
    if (Object.keys(found).length > 0) {
      const firstStep = findStepIndexOfField(Object.keys(found)[0]);
      if (firstStep >= 0 && firstStep !== stepIndex) goToStep(firstStep);
      announceErrors(found);
      return;
    }

    const draft = buildMailDraft(values, locale, copy);
    setMailDraft(draft);
    // Zu lang für die E-Mail: Dann trägt die Datei die Angaben, und sie muss
    // da sein, bevor der Mailentwurf zum Anhängen auffordert.
    if (draft.needsAttachment) downloadSubmission();
    hasNavigated.current = true;
    setErrors({});
    setIsDone(true);
    window.location.href = draft.href;
  };

  const handleDiscard = () => {
    if (!window.confirm(copy.draftDiscardConfirm)) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // s. o.
    }
    setValues(emptyValues());
    setErrors({});
    setMailDraft(null);
    setIsDone(false);
    goToStep(0);
  };

  if (isDone) {
    return (
      <Container className="max-w-3xl py-14 sm:py-20">
        <Surface level="sheet" className="submission-sheet shadow-[var(--shadow-panel)]">
          <CheckCircle2 className="size-10 text-[var(--color-forest)]" aria-hidden />
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-4 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)] focus:outline-none"
          >
            {copy.doneTitle}
          </h2>
          <p className="mt-3 max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">{copy.doneCopy}</p>

          {mailDraft?.needsAttachment ? (
            <p className="mt-4 flex gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-4 text-sm leading-6 text-[var(--color-ink)]">
              <Info className="mt-0.5 size-4 shrink-0 text-[var(--color-forest)]" aria-hidden />
              <span>{copy.attachNote}</span>
            </p>
          ) : null}

          <div className="submission-print-hide mt-7 flex flex-wrap gap-3">
            <a
              href={mailDraft?.href ?? `mailto:${submissionRecipient}`}
              className={cn(
                "inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-accent-hover)]",
                focusRing
              )}
            >
              <Mail className="size-4" aria-hidden />
              {copy.openMail}
            </a>
            <Button variant="quiet" type="button" onClick={downloadSubmission} className="gap-2 border border-[var(--color-line)] bg-white">
              <Download className="size-4" aria-hidden />
              {copy.download}
            </Button>
            <Button variant="quiet" type="button" onClick={() => window.print()} className="gap-2 border border-[var(--color-line)] bg-white">
              <Printer className="size-4" aria-hidden />
              {copy.print}
            </Button>
          </div>

          <p className="submission-print-hide mt-4 text-xs leading-5 text-[var(--color-muted)]">
            {copy.doneMailFallback}
          </p>

          <div className="mt-8 border-t border-[var(--color-line)] pt-6">
            <Label size="dense">{copy.reviewTitle}</Label>
            <div className="mt-4">
              <SubmissionSummary values={values} locale={locale} copy={copy} />
            </div>
          </div>

          <div className="submission-print-hide mt-8 border-t border-[var(--color-line)] pt-6">
            <button
              type="button"
              onClick={handleDiscard}
              className={cn(
                "min-h-11 text-xs font-semibold text-[var(--color-muted)] underline decoration-[var(--color-muted)]/40 underline-offset-4 transition hover:text-[var(--color-ink)]",
                focusRing
              )}
            >
              {copy.restart}
            </button>
          </div>
        </Surface>
      </Container>
    );
  }

  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <div className="submission-print-hide">
        <Link
          href={`/${locale}/projekt-einreichen`}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-ink)]",
            focusRing
          )}
        >
          <ArrowLeft className="size-4" aria-hidden />
          {copy.backToOverview}
        </Link>

        <Label size="section" className="mt-6">
          {copy.eyebrow}
        </Label>
        <h1 className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
          {copy.lead}
        </p>
      </div>

      <nav className="submission-print-hide mt-10" aria-label={copy.stepsLabel}>
        <ol className="flex flex-wrap gap-x-2 gap-y-2">
          {formSteps.map((entry, index) => {
            const isCurrent = index === stepIndex;
            const isReachable = index <= furthestStep;
            return (
              <li key={entry.id}>
                <button
                  type="button"
                  disabled={!isReachable}
                  aria-current={isCurrent ? "step" : undefined}
                  onClick={() => goToStep(index)}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] border px-3 text-xs font-bold transition-colors",
                    focusRing,
                    isCurrent
                      ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                      : isReachable
                        ? "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-forest)]/45 hover:bg-[var(--color-paper)]"
                        : "cursor-not-allowed border-transparent bg-transparent text-[var(--color-muted)]/70"
                  )}
                >
                  <span className="tabular-nums">{index + 1}</span>
                  <span className="hidden sm:inline">{entry.title[locale]}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <Progress
          className="mt-4"
          value={((stepIndex + 1) / formSteps.length) * 100}
          label={copy.stepOf(stepIndex + 1, formSteps.length)}
        />
      </nav>

      <Surface level="sheet" className="submission-sheet mt-6 shadow-[var(--shadow-panel)]">
        <Label size="dense">{copy.stepOf(stepIndex + 1, formSteps.length)}</Label>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-2 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)] focus:outline-none"
        >
          {step.title[locale]}
        </h2>
        <p className="mt-3 max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">{step.intro[locale]}</p>

        {errorCount > 0 ? (
          <div
            ref={errorRef}
            tabIndex={-1}
            role="alert"
            className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-clay)] bg-[var(--color-clay)]/6 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-clay)]"
          >
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--color-clay-ink)]">
              <TriangleAlert className="size-4" aria-hidden />
              {copy.errorTitle}
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--color-ink)]">{copy.errorCopy(errorCount)}</p>
            <ul className="mt-2 space-y-1">
              {Object.keys(errors).map((fieldId) => {
                const field = allFields.find((entry) => entry.id === fieldId);
                if (!field) return null;
                return (
                  <li key={fieldId}>
                    <button
                      type="button"
                      onClick={() => {
                        const target = findStepIndexOfField(fieldId);
                        if (target >= 0 && target !== stepIndex) goToStep(target);
                        window.requestAnimationFrame(() => document.getElementById(fieldId)?.focus());
                      }}
                      className={cn(
                        "min-h-8 text-left text-xs font-semibold text-[var(--color-clay-ink)] underline decoration-[var(--color-clay)]/50 underline-offset-4 hover:decoration-[var(--color-clay-ink)]",
                        focusRing
                      )}
                    >
                      {field.label[locale]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <form
          className="mt-8"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (isLastStep) handleSubmit();
            else handleNext();
          }}
        >
          {step.groups.map((group, groupIndex) => (
            <fieldset key={group.title[locale]} className={groupIndex === 0 ? "" : "mt-10 border-t border-[var(--color-line)] pt-8"}>
              <legend className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-forest)]">
                {group.title[locale]}
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                {group.fields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    locale={locale}
                    copy={copy}
                    value={values[field.id]}
                    error={errors[field.id]}
                    onChange={(next) => setValue(field.id, next)}
                  />
                ))}
              </div>
            </fieldset>
          ))}

          {budgetHint && step.id === "planung" ? (
            <p className="mt-6 flex gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-4 text-sm leading-6 text-[var(--color-ink)]">
              <Info className="mt-0.5 size-4 shrink-0 text-[var(--color-forest)]" aria-hidden />
              <span className="tabular-nums">{budgetHint}</span>
            </p>
          ) : null}

          {isLastStep ? (
            <div className="mt-10 border-t border-[var(--color-line)] pt-8">
              <Label size="dense">{copy.reviewTitle}</Label>
              <p className="mt-2 max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">{copy.reviewCopy}</p>
              <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5">
                <SubmissionSummary values={values} locale={locale} copy={copy} onEdit={goToStep} />
              </div>
            </div>
          ) : null}

          <div className="submission-print-hide mt-10 flex flex-col gap-4 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-[var(--color-muted)]">{copy.requiredNote}</p>
            <div className="flex flex-wrap gap-3">
              {stepIndex > 0 ? (
                <Button
                  type="button"
                  variant="quiet"
                  onClick={() => goToStep(stepIndex - 1)}
                  className="gap-2 border border-[var(--color-line)] bg-white"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  {copy.back}
                </Button>
              ) : null}
              {isLastStep ? (
                <Button
                  type="submit"
                  variant="accent"
                  className="gap-2 font-bold"
                >
                  {copy.submit}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              ) : (
                <Button type="submit" className="min-h-12 gap-2 font-bold">
                  {copy.next}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              )}
            </div>
          </div>
        </form>
      </Surface>

      {hasDraft ? (
        <div className="submission-print-hide mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-muted)]">
          <span>{copy.draftSaved}</span>
          <button
            type="button"
            onClick={handleDiscard}
            className={cn(
              "min-h-11 font-semibold underline decoration-[var(--color-muted)]/40 underline-offset-4 transition hover:text-[var(--color-ink)]",
              focusRing
            )}
          >
            {copy.draftDiscard}
          </button>
        </div>
      ) : null}
    </Container>
  );
}
