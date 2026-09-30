"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/config/site";
import { getSubmissionCopy } from "../config/copy";
import { allFields, findStepIndexOfField, formSteps } from "../config/form-schema";
import {
  buildFileName, buildMailDraft, buildSubmissionText, emptyValues,
  getBudgetHint, validateAll, validateStep, type MailDraft,
} from "../model/submission";
import { restoreSubmissionDraft } from "../model/draft";
import type { FieldErrors, FieldValue, FormValues } from "../model/types";

/** Versionsnummer im Schlüssel: Ändert sich das Feldschema, verfällt der Entwurf. */
const STORAGE_KEY = "balance:projekteinreichung:v1";

function isEmptyValue(value: FieldValue): boolean {
  if (typeof value === "boolean") return value === false;
  if (Array.isArray(value)) return value.length === 0;
  return value.trim() === "";
}

export function useSubmissionForm(locale: Locale) {
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
        const restored = restoreSubmissionDraft(JSON.parse(stored));
        setValues(restored.values);
        setStepIndex(restored.stepIndex);
        setFurthestStep(restored.stepIndex);
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

  return {
    copy, values, stepIndex, furthestStep, errors, isDone, mailDraft,
    headingRef, errorRef, setValue, goToStep, step, isLastStep, errorCount,
    hasDraft, budgetHint, handleNext, downloadSubmission, handleSubmit, handleDiscard,
  };
}
