import assert from "node:assert/strict";
import test from "node:test";
import { availableRooms } from "../src/features/house-tour/config/rooms";
import { estimateUnits as estimatePrompts, quizAnswers as quizStatements } from "../src/features/house-tour/config/game-copy";
import { optionValues, totalValues } from "../src/features/house-tour/model/calculator";
import {
  POINTS,
  challengeFor,
  discovery,
  estimateSpec,
  fromSlider,
  levers,
  rateEstimate,
  toSlider,
  whatIfTotals
} from "../src/features/house-tour/model/game";
import { initialTourState, restoreTourState, tourReducer } from "../src/features/house-tour/model/reducer";
import type { TourState } from "../src/features/house-tour/model/types";

const allQuestions = availableRooms.flatMap((room) => room.questions);
const question = (id: string) => allQuestions.find((item) => item.id === id)!;

test("jede Frage hat genau eine Herausforderung: Schätzen oder Wahr-oder-falsch", () => {
  for (const item of allQuestions) {
    const hasEstimate = Boolean(estimatePrompts[item.id]);
    const hasQuiz = item.id in quizStatements;
    assert.ok(hasEstimate !== hasQuiz, `${item.id}: ${hasEstimate ? "beides" : "keins"}`);
  }
});

test("geschätzt wird nur, wo der Rechner einen Wert liefert, und Quizfragen haben keinen", () => {
  for (const item of allQuestions) {
    const values = item.options.map((option) => optionValues(item.id, option.id, {}, {}));
    const measurable = values.some((value) => value.co2Kg > 0 || value.waterL > 0);
    assert.equal(measurable, Boolean(estimatePrompts[item.id]), item.id);
  }
});

test("Volltreffer und Daneben sind symmetrisch im Verhältnis", () => {
  assert.equal(rateEstimate(100, 100), "spot");
  assert.equal(rateEstimate(124, 100), "spot");
  assert.equal(rateEstimate(100, 124), "spot");
  assert.equal(rateEstimate(140, 100), "close");
  assert.equal(rateEstimate(100, 140), "close");
  assert.equal(rateEstimate(200, 100), "off");
  assert.equal(rateEstimate(50, 100), "off");
  assert.equal(rateEstimate(0, 100), "off");
});

test("der Schätzbereich hängt nicht von der eigenen Menge ab und enthält jeden möglichen Wert", () => {
  for (const item of allQuestions) {
    if (!estimatePrompts[item.id]) continue;
    const spec = estimateSpec(item.id, {})!;
    assert.ok(spec && spec.min > 0 && spec.max > spec.min, item.id);
    for (const option of item.options) {
      const quantities = item.adjust ? [item.adjust.min, item.adjust.defaults[option.id], item.adjust.max] : [undefined];
      for (const quantity of quantities) {
        const answers = { [item.id]: option.id };
        const adjustments: Record<string, number> = quantity === undefined ? {} : { [item.id]: quantity };
        const challenge = challengeFor(item.id, answers, adjustments);
        if (!challenge) continue;
        assert.equal(challenge.kind, "estimate");
        if (challenge.kind !== "estimate") continue;
        // Der Bereich bleibt derselbe, egal welche Menge jemand eingestellt hat.
        assert.deepEqual(challenge.spec, spec, item.id);
        assert.ok(challenge.actual >= spec.min && challenge.actual <= spec.max, `${item.id} ${option.id} ${quantity}`);
      }
    }
  }
});

test("wer null verbraucht, muss nichts schätzen", () => {
  assert.equal(challengeFor("garden-ground", { "garden-ground": "gravel" }, {}), null);
  assert.equal(challengeFor("mobility-km", { "mobility-km": "car-none" }, {}), null);
});

test("der logarithmische Regler trifft beide Enden und kehrt sich um", () => {
  assert.equal(fromSlider(0, 5, 500), 5);
  assert.equal(fromSlider(1, 5, 500), 500);
  for (const value of [5, 50, 500]) assert.ok(Math.abs(fromSlider(toSlider(value, 5, 500), 5, 500) - value) / value < 0.06);
});

test("Punkte gibt es fürs Entdecken, nie für eine sparsamere Antwort", () => {
  const thrifty = discovery({ answers: { "bath-shower": "bath-eco" }, guesses: {}, cardsRead: {} });
  const lavish = discovery({ answers: { "bath-shower": "bath-long" }, guesses: {}, cardsRead: {} });
  assert.equal(thrifty.points, lavish.points);

  const played = discovery({
    answers: { "bath-shower": "bath-long", "garden-structures": "none" },
    guesses: {
      "bath-shower": { kind: "estimate", guess: 100, actual: 105 },
      "garden-structures": { kind: "quiz", choice: false }
    },
    cardsRead: { "bath-shower": true }
  });
  assert.equal(played.points, 2 * POINTS.found + POINTS.spot + POINTS.quizRight + POINTS.card);
  assert.equal(played.spot, 1);
  assert.equal(played.quizRight, 1);
});

test("ein Tipp zählt einmal, die Karte einmal", () => {
  let state = tourReducer(initialTourState, { type: "SELECT_ANSWER", questionId: "bath-shower", optionId: "bath-long" });
  state = tourReducer(state, { type: "RECORD_GUESS", questionId: "bath-shower", record: { kind: "estimate", guess: 300, actual: 100 } });
  state = tourReducer(state, { type: "RECORD_GUESS", questionId: "bath-shower", record: { kind: "estimate", guess: 100, actual: 100 } });
  assert.deepEqual(state.guesses["bath-shower"], { kind: "estimate", guess: 300, actual: 100 });
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
    guesses: {
      "bath-shower": { kind: "estimate", guess: 10, actual: 12 },
      "bath-toilet": { kind: "estimate", guess: -1, actual: 12 },
      "garden-structures": { kind: "quiz", choice: "yes" },
      invented: { kind: "skipped" }
    },
    cardsRead: { "bath-shower": true, invented: true, "bath-toilet": "yes" },
    whatIf: { "bath-shower": "bath-long", "bath-toilet": "flush-saving" },
    goals: ["bath-shower", "bath-toilet", 7]
  });
  assert.deepEqual(restored.guesses, { "bath-shower": { kind: "estimate", guess: 10, actual: 12 } });
  assert.deepEqual(restored.cardsRead, { "bath-shower": true });
  assert.deepEqual(restored.whatIf, { "bath-shower": "bath-long" });
  assert.deepEqual(restored.goals, ["bath-shower"]);
});

test("Quizaussagen und Schätzfragen betreffen existierende Fragen", () => {
  for (const id of [...Object.keys(estimatePrompts), ...Object.keys(quizStatements)]) {
    assert.ok(question(id), id);
  }
});
