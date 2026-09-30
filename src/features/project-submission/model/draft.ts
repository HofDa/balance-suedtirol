import { allFields, formSteps } from "../config/form-schema";
import { emptyValues, getFieldOptions } from "./submission";

/** Storage is untrusted: accept only values matching the current field schema. */
export function restoreSubmissionDraft(input: unknown) {
  const draft = input && typeof input === "object" && !Array.isArray(input)
    ? input as Record<string, unknown>
    : {};
  const source = draft.values && typeof draft.values === "object" && !Array.isArray(draft.values)
    ? draft.values as Record<string, unknown>
    : {};
  const values = emptyValues();
  for (const field of allFields) {
    const value = source[field.id];
    if (field.kind === "consent") {
      if (typeof value === "boolean") values[field.id] = value;
    } else if (field.kind === "checkboxes") {
      if (Array.isArray(value)) {
        const allowed = new Set(getFieldOptions(field, "de").map((option) => option.value));
        values[field.id] = [...new Set(value.filter((entry): entry is string => typeof entry === "string" && allowed.has(entry)))];
      }
    } else if (typeof value === "string") {
      if (field.kind !== "select" || getFieldOptions(field, "de").some((option) => option.value === value)) {
        values[field.id] = value;
      }
    }
  }
  const stepIndex = typeof draft.stepIndex === "number" && Number.isFinite(draft.stepIndex)
    ? Math.min(Math.max(Math.floor(draft.stepIndex), 0), formSteps.length - 1)
    : 0;
  return { values, stepIndex };
}
