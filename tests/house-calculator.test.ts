import assert from "node:assert/strict";
import test from "node:test";
import { availableRooms } from "../src/features/house-tour/config/rooms";
import {
  GRID_CO2_PER_KWH,
  optionValues,
  quantityFor,
  referenceValues,
  totalValues
} from "../src/features/house-tour/model/calculator";
import { initialTourState, tourReducer } from "../src/features/house-tour/model/reducer";
import { calculateScores } from "../src/features/house-tour/model/scoring";

const closeTo = (actual: number, expected: number, tolerance = 1e-6) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≠ ${expected}`);

test("jede Regler-Vorgabe gehört zu einer Option und liegt im erlaubten Bereich", () => {
  for (const room of availableRooms) for (const question of room.questions) {
    if (!question.adjust) continue;
    assert.deepEqual(Object.keys(question.adjust.defaults).sort(), question.options.map((option) => option.id).sort());
    for (const value of Object.values(question.adjust.defaults)) {
      assert.ok(value >= question.adjust.min && value <= question.adjust.max);
    }
  }
});

test("Haushaltsstrom verwendet den eingegebenen Jahreswert und den ISPRA-Faktor", () => {
  const values = optionValues("living-tv-streaming", "electricity-medium", { "living-tv-streaming": "electricity-medium" }, { "living-tv-streaming": 1000 });
  closeTo(values.energyKwh, 1000);
  closeTo(values.co2Kg, 1000 * GRID_CO2_PER_KWH);
});

test("Heizung verwendet den persönlichen Rechnungswert und den gewählten Energieträger", () => {
  const oil = optionValues("bedroom-heating", "heat-oil", { "bedroom-heating": "heat-oil" }, { "bedroom-heating": 1000 });
  const heatPump = optionValues("bedroom-heating", "heat-pump", { "bedroom-heating": "heat-pump" }, { "bedroom-heating": 1000 });
  assert.deepEqual(oil, { co2Kg: 310, waterL: 0, energyKwh: 1000 });
  assert.deepEqual(heatPump, { co2Kg: 214, waterL: 0, energyKwh: 1000 });
});

test("Standby und Beleuchtung werden neben dem Haushaltsstrom nicht doppelt gezählt", () => {
  const electricityOnly = totalValues({ "living-tv-streaming": "electricity-medium" }, { "living-tv-streaming": 1000 });
  const withDetails = totalValues(
    {
      "living-tv-streaming": "electricity-medium",
      "bedroom-standby": "standby-all",
      "living-lighting": "light-old"
    },
    { "living-tv-streaming": 1000, "bedroom-standby": 30, "living-lighting": 40 }
  );
  assert.deepEqual(withDetails, electricityOnly);
});

test("Warmwasser-Wärmepumpe reduziert Eingangsenergie und Emissionen der Dusche", () => {
  const answers = { "bath-shower": "bath-eco", "bath-water-heating": "heat-pump" };
  const values = optionValues("bath-shower", "bath-eco", answers, { "bath-shower": 4 });
  const liters = 6.5 * 4 * 365;
  const usefulHeat = liters * 0.0302;
  closeTo(values.waterL, liters);
  closeTo(values.energyKwh, usefulHeat / 3 + liters * 0.0005);
  closeTo(values.co2Kg, (usefulHeat / 3 + liters * 0.0005) * GRID_CO2_PER_KWH);
});

test("Reglerwerte werden in Berechnung und Zustand sicher begrenzt", () => {
  const shower = availableRooms.flatMap((room) => room.questions).find((question) => question.id === "bath-shower")!;
  assert.equal(quantityFor(shower, "bath-eco", { "bath-shower": -10 }), 0);
  assert.equal(quantityFor(shower, "bath-eco", { "bath-shower": 1e9 }), 25);

  const restored = tourReducer(initialTourState, {
    type: "RESTORE",
    state: {
      answers: { "bath-shower": "bath-eco", unknown: "invented" },
      adjustments: { "bath-shower": -10, unknown: 99 },
      skippedQuestions: { "bath-shower": true, unknown: true }
    }
  });
  assert.deepEqual(restored.answers, { "bath-shower": "bath-eco" });
  assert.deepEqual(restored.adjustments, { "bath-shower": 0 });
  assert.deepEqual(restored.skippedQuestions, {});
});

test("Mengenregler verändern den Wirkungsindex in derselben Richtung wie die Bilanz", () => {
  const answers = { "bath-shower": "bath-eco" };
  const short = calculateScores(answers, { "bath-shower": 4 });
  const long = calculateScores(answers, { "bath-shower": 25 });
  assert.ok(long.carbon < short.carbon);
  assert.ok(long.water < short.water);
  assert.ok(long.resources < short.resources);
});

test("übersprungene oder leere Fragen erzeugen weder Bilanz noch künstlichen Score", () => {
  assert.deepEqual(totalValues({}, {}), { co2Kg: 0, waterL: 0, energyKwh: 0 });
  assert.deepEqual(calculateScores({}, {}), { biodiversity: 50, carbon: 50, water: 50, resources: 50 });
});

test("alle konfigurierten Optionen liefern endliche, nichtnegative Jahreswerte", () => {
  const answers: Record<string, string> = {};
  for (const room of availableRooms) for (const question of room.questions) {
    answers[question.id] = question.options[Math.floor(question.options.length / 2)].id;
  }
  for (const room of availableRooms) for (const question of room.questions) {
    for (const option of question.options) {
      for (const quantity of question.adjust ? [question.adjust.min, question.adjust.defaults[option.id], question.adjust.max] : [0]) {
        const values = optionValues(question.id, option.id, answers, { [question.id]: quantity });
        for (const value of Object.values(values)) assert.ok(Number.isFinite(value) && value >= 0);
      }
    }
  }
});

test("der Modellvergleich bleibt an eine reproduzierbare mittlere Auswahl gekoppelt", () => {
  const answers: Record<string, string> = {};
  for (const room of availableRooms) for (const question of room.questions) {
    answers[question.id] = question.options[Math.floor(question.options.length / 2)].id;
  }
  const values = totalValues(answers, {});
  assert.ok(Math.abs(values.co2Kg - referenceValues.co2Kg) / referenceValues.co2Kg < 0.01);
  assert.ok(Math.abs(values.waterL - referenceValues.waterL) / referenceValues.waterL < 0.01);
  assert.ok(Math.abs(values.energyKwh - referenceValues.energyKwh) / referenceValues.energyKwh < 0.01);
});
