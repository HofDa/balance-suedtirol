import assert from "node:assert/strict";
import test from "node:test";
import { locales } from "../src/config/site";
import { getSubmissionCopy } from "../src/features/project-submission/config/copy";
import { allFields, formSteps } from "../src/features/project-submission/config/form-schema";
import {
  buildFileName,
  buildMailDraft,
  buildSubmissionText,
  emptyValues,
  formatValue,
  getBudgetHint,
  getFieldOptions,
  validateAll
} from "../src/features/project-submission/model/submission";
import type { Field, FormValues } from "../src/features/project-submission/model/types";

const copy = getSubmissionCopy("de");

function sampleValue(field: Field): FormValues[string] {
  switch (field.kind) {
    case "email": return "kontakt@beispiel.it";
    case "date": return "2026-05-01";
    case "number": return "1000";
    case "select": return getFieldOptions(field, "de")[0].value;
    case "checkboxes": return [getFieldOptions(field, "de")[0].value];
    case "consent": return true;
    default: return "Beispiel";
  }
}

/** Alle Pflichtfelder gültig, alle übrigen leer. */
function validValues(): FormValues {
  const values = emptyValues();
  for (const field of allFields) if (field.required) values[field.id] = sampleValue(field);
  return values;
}

test("Feld-IDs sind eindeutig und jede Sprache hat eine Beschriftung", () => {
  const ids = allFields.map((field) => field.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const field of allFields) for (const locale of locales) {
    assert.ok(field.label[locale].trim(), `${field.id} (${locale}) ohne Beschriftung`);
    for (const option of field.options ?? []) assert.ok(option.label[locale].trim(), `${field.id}/${option.value} (${locale})`);
  }
});

test("emptyValues legt je Feldart den passenden Leerwert an", () => {
  const values = emptyValues();
  for (const field of allFields) {
    const expected = field.kind === "consent" ? false : field.kind === "checkboxes" ? [] : "";
    assert.deepEqual(values[field.id], expected, field.id);
  }
});

test("ein leeres Formular meldet genau die Pflichtfelder", () => {
  const errors = validateAll(emptyValues(), copy);
  const required = allFields.filter((field) => field.required).map((field) => field.id).sort();
  assert.deepEqual(Object.keys(errors).sort(), required);
  for (const field of allFields.filter((item) => item.required)) {
    const expected = field.kind === "consent" ? copy.errors.consent : field.kind === "checkboxes" ? copy.errors.choice : copy.errors.required;
    assert.equal(errors[field.id], expected, field.id);
  }
});

test("ausgefüllte Pflichtfelder bestehen die Prüfung in allen Sprachen", () => {
  for (const locale of locales) {
    assert.deepEqual(validateAll(validValues(), getSubmissionCopy(locale)), {});
  }
});

test("E-Mail-Adressen werden großzügig, aber nicht blind geprüft", () => {
  const check = (email: string) => validateAll({ ...validValues(), email }, copy).email;
  assert.equal(check("kontakt@beispiel.it"), undefined);
  assert.equal(check("  kontakt@beispiel.it  "), undefined);
  assert.equal(check("kontakt@beispiel"), copy.errors.email);
  assert.equal(check("kontakt beispiel.it"), copy.errors.email);
});

test("ein Projektende vor dem Start ist ein Fehler, gleicher Tag nicht", () => {
  const dates = (startdatum: string, enddatum: string) => validateAll({ ...validValues(), startdatum, enddatum }, copy).enddatum;
  assert.equal(dates("2026-05-02", "2026-05-01"), copy.errors.endBeforeStart);
  assert.equal(dates("2026-05-01", "2026-05-01"), undefined);
  assert.equal(dates("2026-05-01", ""), undefined);
});

test("der Budgethinweis erscheint erst bei deutlicher Abweichung", () => {
  const hint = (kosten_gesamt: string, foerdermittel: string, eigenanteil: string) =>
    getBudgetHint({ ...emptyValues(), kosten_gesamt, foerdermittel, eigenanteil }, "de", copy);
  assert.equal(hint("10000", "6000", "4000"), null);
  assert.equal(hint("10000", "6000", "4050"), null, "innerhalb von 1 %");
  assert.equal(hint("10000", "6000", "2000") !== null, true);
  assert.equal(hint("10000", "", "4000"), null, "fehlende Angabe");
  assert.equal(hint("0", "6000", "4000"), null, "keine Gesamtkosten");
});

test("Werte werden je Sprache lesbar formatiert", () => {
  const field = (id: string) => allFields.find((item) => item.id === id)!;
  assert.match(formatValue(field("kosten_gesamt"), "12500", "de"), /12\.500/);
  assert.match(formatValue(field("kosten_gesamt"), "12500", "de"), /€/);
  // Datum über UTC: darf in keiner Zeitzone einen Tag verrutschen.
  assert.match(formatValue(field("startdatum"), "2026-01-01", "de"), /^01\. (Jänner|Januar) 2026$/);
  assert.match(formatValue(field("startdatum"), "2026-01-01", "en"), /^01 January 2026$/);
  assert.equal(formatValue(field("startdatum"), "kein datum", "de"), "kein datum");
  assert.equal(formatValue(field("projektname"), "   ", "de"), "");
  assert.equal(formatValue(field("datenschutz"), true, "de"), "✓");
});

test("Auswahllisten zeigen Beschriftungen statt technischer Werte", () => {
  const select = allFields.find((field) => field.kind === "select")!;
  const option = getFieldOptions(select, "it")[0];
  assert.equal(formatValue(select, option.value, "it"), option.label);
  assert.notEqual(option.label, "");
});

test("der Einreichungstext folgt den Schritten und lässt Leeres weg", () => {
  const values = { ...emptyValues(), projektname: "Moor am Vahrner See" };
  const text = buildSubmissionText(values, "de", copy);
  assert.ok(text.startsWith(copy.mailIntro));
  assert.ok(text.includes("- Projekttitel: Moor am Vahrner See"));
  assert.ok(text.includes(`## ${formSteps[0].title.de}`));
  assert.equal(text.includes(`## ${formSteps[formSteps.length - 1].title.de}`), false, "leerer Schritt entfällt");
  assert.equal(text, text.trimEnd());
});

test("kurze Einreichungen gehen komplett per E-Mail, lange bitten um die Datei", () => {
  const short = buildMailDraft({ ...validValues(), projektname: "Moor" }, "de", copy);
  assert.equal(short.needsAttachment, false);
  assert.ok(short.href.startsWith("mailto:"));
  assert.ok(short.href.length <= 1900);

  const long = buildMailDraft({ ...validValues(), projektname: "Moor", hauptziel: "Text ".repeat(600) }, "de", copy);
  assert.equal(long.needsAttachment, true);
  assert.ok(long.href.length <= 1900);
  assert.ok(decodeURIComponent(long.href).includes(copy.attachNote));
});

test("Dateinamen sind ASCII-Slugs und begrenzt", () => {
  assert.equal(buildFileName({ projektname: "Wiedervernässung: Moor am Vahrner See!" }), "balance-projekteinreichung-wiedervernassung-moor-am-vahrner-see.txt");
  assert.equal(buildFileName({ projektname: "" }), "balance-projekteinreichung.txt");
  assert.equal(buildFileName({ projektname: "***" }), "balance-projekteinreichung.txt");
  assert.ok(buildFileName({ projektname: "a".repeat(200) }).length <= "balance-projekteinreichung-.txt".length + 60);
});
