import assert from "node:assert/strict";
import test from "node:test";
import { availableRooms } from "../src/features/house-tour/config/rooms";
import { everydayUnits } from "../src/features/house-tour/config/game-copy";
import { optionValues, totalValues } from "../src/features/house-tour/model/calculator";
import { POINTS, discovery, levers, whatIfTotals } from "../src/features/house-tour/model/game";
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
