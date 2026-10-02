import assert from "node:assert/strict";
import test from "node:test";
import { availableRooms } from "../src/features/house-tour/config/rooms";
import { everydayUnits } from "../src/features/house-tour/config/game-copy";
import { optionIcons } from "../src/features/house-tour/config/option-icons";
import { presetsOnly } from "../src/features/house-tour/model/calculator";
import { SOUTH_TYROL_HOUSEHOLD_KWH_PER_PERSON, bestCaseSaving, optionValues, presetFor, totalValues } from "../src/features/house-tour/model/calculator";
import { POINTS, co2Contributions, discovery, levers, whatIfTotals } from "../src/features/house-tour/model/game";
import { electricityShare, heatingBillUnit, landmark, yearInPictures } from "../src/features/house-tour/model/everyday";
import { initialTourState, restoreTourState, tourReducer } from "../src/features/house-tour/model/reducer";
import type { TourState } from "../src/features/house-tour/model/types";

const allQuestions = availableRooms.flatMap((room) => room.questions);
const question = (id: string) => allQuestions.find((item) => item.id === id)!;

test("eine Alltagsgröße gibt es genau dort, wo der Rechner einen Wert liefert", () => {
  for (const item of allQuestions) {
    const values = item.options.map((option) => optionValues(item.id, option.id, {}, {}));
    const measurable = values.some((value) => value.co2Kg > 0 || value.waterL > 0);
    assert.equal(measurable, Boolean(everydayUnits[item.id]), item.id);
  }
});

test("Punkte gibt es fürs Entdecken, nie für eine sparsamere Antwort", () => {
  const thrifty = discovery({ answers: { "bath-shower": "bath-eco" }, cardsRead: {} });
  const lavish = discovery({ answers: { "bath-shower": "bath-long" }, cardsRead: {} });
  assert.equal(thrifty.points, lavish.points);

  const explored = discovery({
    answers: { "bath-shower": "bath-long", "garden-structures": "none" },
    cardsRead: { "bath-shower": true }
  });
  assert.equal(explored.points, 2 * POINTS.found + POINTS.card);
});

test("eine Karte zählt einmal", () => {
  let state = tourReducer(initialTourState, { type: "SELECT_ANSWER", questionId: "bath-shower", optionId: "bath-long" });
  state = tourReducer(state, { type: "READ_CARD", questionId: "bath-shower" });
  state = tourReducer(state, { type: "READ_CARD", questionId: "bath-shower" });
  assert.equal(discovery(state).cardsRead, 1);
});

test("Was-wäre-wenn ändert nie die echten Antworten oder die echte Bilanz", () => {
  const answers: Record<string, string> = { "bath-shower": "bath-long", "mobility-km": "car-combustion" };
  let state: TourState = { ...initialTourState, answers };
  const before = totalValues(state.answers, state.adjustments);
  state = tourReducer(state, { type: "SET_WHAT_IF", questionId: "mobility-km", optionId: "car-electric" });
  assert.deepEqual(state.answers, answers);
  assert.deepEqual(totalValues(state.answers, state.adjustments), before);
  const hypothetical = whatIfTotals(state.answers, state.adjustments, state.whatIf);
  assert.ok(hypothetical.co2Kg < before.co2Kg);
  // Was-wäre-wenn für unbeantwortete Fragen gibt es nicht.
  state = tourReducer(state, { type: "SET_WHAT_IF", questionId: "kitchen-diet", optionId: "diet-plant" });
  assert.equal(state.whatIf["kitchen-diet"], undefined);
});

test("ein Hebel empfiehlt nie etwas, das der Artenvielfalt schadet", () => {
  const answers = { "garden-ground": "lawn" };
  const found = levers(answers, {}, totalValues(answers, {}));
  assert.equal(found[0]?.best.id, "natural-bed");
  for (const item of allQuestions) for (const option of item.options) {
    const single = { [item.id]: option.id };
    for (const lever of levers(single, {}, totalValues(single, {}))) {
      assert.ok((lever.best.impact.biodiversity ?? 0) >= (lever.current.impact.biodiversity ?? 0), lever.questionId);
      assert.ok(!lever.best.regionalAverage, lever.questionId);
    }
  }
});

test("die getippte Zahl wählt die Option mit der nächsten Vorgabe", () => {
  const diet = question("kitchen-diet");
  assert.deepEqual(
    [0, 1, 3, 4, 8, 9, 12, 21].map((count) => presetFor(diet, count).id),
    ["diet-plant", "diet-plant", "diet-plant", "diet-mixed", "diet-mixed", "diet-meat", "diet-meat", "diet-meat"]
  );
});

test("eine eingegebene Zahl wird nie zu „Weiß ich nicht“", () => {
  const electricity = question("living-tv-streaming");
  assert.equal(presetFor(electricity, 950).id, "electricity-medium");
  assert.equal(presetFor(electricity, 3000).id, "electricity-high");
});

test("Mittel und „Weiß ich nicht“ beim Strom stehen auf dem gemessenen Südtiroler Durchschnitt", () => {
  const { adjust } = question("living-tv-streaming");
  const measured = Math.round(SOUTH_TYROL_HOUSEHOLD_KWH_PER_PERSON / adjust!.step) * adjust!.step;
  assert.equal(adjust!.defaults["electricity-medium"], measured);
  assert.equal(adjust!.defaults["electricity-average"], measured);
});

test("bei reinen Mengenvorgaben bleibt der Hebel, auch wenn die eigene Zahl eingetragen ist", () => {
  const answers = { "kitchen-diet": "diet-meat" };
  const adjustments = { "kitchen-diet": 14 };
  const lever = levers(answers, adjustments, totalValues(answers, adjustments)).find((item) => item.questionId === "kitchen-diet");
  assert.equal(lever?.best.id, "diet-plant");
  // 14 eigene gegen 1 vorgegebene Fleischmahlzeit pro Woche.
  const expected = optionValues("kitchen-diet", "diet-meat", answers, adjustments).co2Kg -
    optionValues("kitchen-diet", "diet-plant", answers, {}).co2Kg;
  assert.ok(Math.abs(lever!.saving.co2Kg - expected) < 1e-9);
  assert.ok(Math.abs(bestCaseSaving("kitchen-diet", answers, adjustments).co2Kg - expected) < 1e-9);
  const tried = whatIfTotals(answers, adjustments, { "kitchen-diet": "diet-plant" });
  assert.ok(Math.abs(totalValues(answers, adjustments).co2Kg - tried.co2Kg - expected) < 1e-9);
});

test("bei Fragen mit eigenem Faktor bleibt die eigene Menge im Vergleich stehen", () => {
  const answers = { "bath-shower": "bath-long" };
  const adjustments = { "bath-shower": 4 };
  const lever = levers(answers, adjustments, totalValues(answers, adjustments)).find((item) => item.questionId === "bath-shower");
  const expected = optionValues("bath-shower", "bath-long", answers, adjustments).waterL -
    optionValues("bath-shower", "bath-eco", answers, adjustments).waterL;
  assert.ok(Math.abs(lever!.saving.waterL - expected) < 1e-9);
});

test("höchstens drei Vorhaben, nur aus beantworteten Fragen", () => {
  let state: TourState = { ...initialTourState };
  state.answers = { "bath-shower": "bath-long", "bath-toilet": "flush-full", "kitchen-diet": "diet-meat", "mobility-km": "car-combustion" };
  for (const id of ["bath-shower", "bath-toilet", "kitchen-diet", "mobility-km", "garden-ground"]) {
    state = tourReducer(state, { type: "TOGGLE_GOAL", questionId: id });
  }
  assert.deepEqual(state.goals, ["bath-shower", "bath-toilet", "kitchen-diet"]);
  state = tourReducer(state, { type: "TOGGLE_GOAL", questionId: "bath-toilet" });
  assert.deepEqual(state.goals, ["bath-shower", "kitchen-diet"]);
});

test("gespeicherte Spielstände werden bereinigt", () => {
  const restored = restoreTourState({
    answers: { "bath-shower": "bath-eco" },
    // Tipps aus der früheren Schätzrunde fallen beim Laden still weg.
    guesses: { "bath-shower": { kind: "estimate", guess: 10, actual: 12 } },
    cardsRead: { "bath-shower": true, invented: true, "bath-toilet": "yes" },
    whatIf: { "bath-shower": "bath-long", "bath-toilet": "flush-saving" },
    goals: ["bath-shower", "bath-toilet", 7]
  });
  assert.ok(!("guesses" in restored));
  assert.deepEqual(restored.cardsRead, { "bath-shower": true });
  assert.deepEqual(restored.whatIf, { "bath-shower": "bath-long" });
  assert.deepEqual(restored.goals, ["bath-shower"]);
});

test("Alltagsgrößen betreffen existierende Fragen", () => {
  for (const id of Object.keys(everydayUnits)) assert.ok(question(id), id);
});

test("Vergleiche unter den Reglern nehmen den größten, der hineinpasst", () => {
  assert.equal(landmark("distance", 20), null);
  assert.deepEqual(landmark("distance", 45), { key: "meran", times: 1.5 });
  assert.deepEqual(landmark("distance", 12000), { key: "rome", times: 8.6 });
  assert.deepEqual(landmark("distance", 40000), { key: "earth", times: 1 });
  assert.deepEqual(landmark("area", 80), { key: "parking", times: 6.4 });
  assert.deepEqual(landmark("area", 400), { key: "tennis", times: 1.5 });
});

test("Heizung erscheint in der Einheit der Rechnung, Strom gegen den Südtiroler Schnitt", () => {
  // 10.700 kWh Gas sind 1.000 Smc bei 10,7 kWh je Smc (ARERA).
  assert.deepEqual(heatingBillUnit("heat-gas", 10700), { key: "gas", amount: 1000 });
  // Rund 10 kWh je Liter Heizöl (ISPRA, 0,84 kg/l).
  assert.deepEqual(heatingBillUnit("heat-oil", 5000), { key: "oil", amount: 500 });
  assert.equal(heatingBillUnit("heat-pump", 3000), null);
  assert.equal(heatingBillUnit("heat-gas", 0), null);
  // 510,7 GWh ÷ 539.679 Personen ≈ 946 kWh.
  assert.equal(electricityShare(946), 1);
  assert.equal(electricityShare(1500), 1.6);
  assert.equal(electricityShare(0), null);
});

test("die CO₂-Rangliste ist absteigend, summiert sich zu 100 % und lässt Nullposten weg", () => {
  const answers = { "kitchen-diet": "diet-meat", "bath-shower": "bath-long", "living-plants": "some-plants", "mobility-km": "car-none" };
  const rows = co2Contributions(answers, {});
  assert.deepEqual(rows.map((row) => row.questionId), ["kitchen-diet", "bath-shower"]);
  assert.ok(Math.abs(rows.reduce((sum, row) => sum + row.share, 0) - 1) < 1e-9);
  assert.ok(Math.abs(rows.reduce((sum, row) => sum + row.co2Kg, 0) - totalValues(answers, {}).co2Kg) < 1e-9);
});

test("das Jahr in Bildern behauptet nichts für leere Werte", () => {
  assert.deepEqual(yearInPictures({ co2Kg: 0, waterL: 0, energyKwh: 0 }), { water: null, co2: null, car: null });
  const year = yearInPictures({ co2Kg: 4200, waterL: 27000, energyKwh: 0 });
  assert.equal(year.water, "180 volle Badewannen");
  assert.equal(year.co2, "4,2 Tonnen CO₂");
  assert.equal(year.car, "14-mal mit dem Auto nach Rom und zurück");
});

test("jede Antwort im Schritt „Art“ hat ein Symbol, und keins ist übrig", () => {
  const withKind = allQuestions.filter((item) => !(item.adjust && presetsOnly(item)));
  assert.deepEqual(Object.keys(optionIcons).sort(), withKind.map((item) => item.id).sort());
  for (const item of withKind) {
    assert.deepEqual(Object.keys(optionIcons[item.id]).sort(), item.options.map((option) => option.id).sort(), item.id);
    // „Weiß ich nicht“ sieht überall gleich aus.
    for (const option of item.options) {
      if (option.regionalAverage) assert.equal(optionIcons[item.id][option.id], "circle-help", option.id);
    }
  }
});
