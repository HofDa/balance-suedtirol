import assert from "node:assert/strict";
import test from "node:test";
import { availableRooms } from "../src/features/house-tour/config/rooms";
import { roomContent } from "../src/features/house-tour/i18n/content";
import { localizedRooms } from "../src/features/house-tour/i18n/localize";
import { tourUi } from "../src/features/house-tour/i18n/ui";
import { questionBasis } from "../src/features/house-tour/model/calculator";
import { everydayLine } from "../src/features/house-tour/model/everyday";
import { optionValues } from "../src/features/house-tour/model/calculator";

const locales = ["it", "en"] as const;

test("jede Frage, Option und Quelle liegt auf Italienisch und Englisch vor — nicht mehr und nicht weniger", () => {
  for (const locale of locales) {
    const content = roomContent[locale];
    assert.deepEqual(Object.keys(content).sort(), availableRooms.map((room) => room.id).sort(), locale);
    for (const room of availableRooms) {
      const text = content[room.id];
      assert.deepEqual(Object.keys(text.questions).sort(), room.questions.map((q) => q.id).sort(), `${locale} ${room.id}`);
      for (const question of room.questions) {
        const q = text.questions[question.id];
        for (const field of ["title", "sceneLabel", "description", "impactText", "tip"] as const) {
          assert.ok(q[field].trim().length > 0, `${locale} ${question.id} ${field}`);
        }
        assert.equal(Boolean(q.scopeNote), Boolean(question.scopeNote), `${locale} ${question.id} scopeNote`);
        assert.equal(Boolean(q.adjust), Boolean(question.adjust), `${locale} ${question.id} adjust`);
        assert.equal(Boolean(q.adjust?.hint), Boolean(question.adjust?.hint), `${locale} ${question.id} hint`);
        assert.equal(Boolean(q.adjust?.baseUnit), Boolean(question.adjust?.base), `${locale} ${question.id} base unit`);
        assert.deepEqual(Object.keys(q.options).sort(), question.options.map((o) => o.id).sort(), `${locale} ${question.id} options`);
        for (const option of question.options) {
          assert.equal(Boolean(q.options[option.id].regionalAverage), Boolean(option.regionalAverage), `${locale} ${option.id} source`);
        }
      }
    }
  }
});

test("übersetzte Räume ändern keine Zahl: Faktoren, Vorgaben und Reihenfolge bleiben gleich", () => {
  const strip = (rooms: ReturnType<typeof localizedRooms>) =>
    rooms.map((room) => ({
      id: room.id,
      questions: room.questions.map((q) => ({
        id: q.id,
        adjust: q.adjust && { min: q.adjust.min, max: q.adjust.max, step: q.adjust.step, defaults: q.adjust.defaults, factor: q.adjust.base?.factor },
        options: q.options.map((o) => ({ id: o.id, params: o.params, impact: o.impact }))
      }))
    }));
  for (const locale of locales) assert.deepEqual(strip(localizedRooms(locale)), strip(localizedRooms("de")), locale);
});

test("Rechenwege decken jede Frage in allen Sprachen ab", () => {
  for (const locale of ["de", ...locales] as const) {
    const t = tourUi[locale];
    assert.deepEqual(Object.keys(t.basis).sort(), Object.keys(questionBasis).sort(), `${locale} basis`);
  }
});

test("Rechenwege nennen in jeder Sprache dieselben Faktoren", () => {
  const numbers = (text: string) => (text.match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) => n.replace(/[.,]/g, ""));
  for (const id of Object.keys(questionBasis)) {
    const reference = numbers(questionBasis[id].factor).sort();
    for (const locale of locales) assert.deepEqual(numbers(tourUi[locale].basis[id].factor).sort(), reference, `${locale} ${id}`);
  }
});

test("der Alltagssatz rechnet in jeder Sprache mit derselben Zahl", () => {
  const values = optionValues("bath-shower", "bath-normal", {}, {});
  const digits = (text: string) => text.replace(/\D/g, "");
  const de = everydayLine("bath-shower", values, null, {}, "de");
  for (const locale of locales) {
    const line = everydayLine("bath-shower", values, null, {}, locale);
    assert.equal(digits(line.headline), digits(de.headline), locale);
  }
});
