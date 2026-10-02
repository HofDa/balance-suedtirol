import { availableRooms } from "../config/rooms";
import { everydayUnits, type EverydayUnit } from "../config/game-copy";
import { alternativeValues, optionValues, presetsOnly, totalValues } from "./calculator";
import { BATHTUB_LITERS, CAR_CO2_PER_KM } from "./everyday";
import type {
  AnnualValues,
  RoomId,
  TourOption,
  TourQuestion,
  TourState
} from "./types";

/**
 * Die Spielebene des Lebensraum-Checks.
 *
 * Grundregel: Punkte gibt es fürs Entdecken und Wissen, nie für die Antwort.
 * Eine „grüne“ Antwort bringt keinen einzigen Punkt mehr als eine ehrliche
 * belastende — sonst würde das Spiel die Selbstauskunft verbiegen, auf der die
 * Bilanz beruht. Aus demselben Grund gibt es nichts zu erraten: gespielt wird
 * mit dem eigenen Verbrauch, nicht gegen ihn. Diese Datei liest den Rechner nur; sie ändert keinen Faktor
 * und keine Antwort.
 */

export const POINTS = {
  /** Ein beantworteter Gegenstand. Übersprungene zählen nicht. */
  found: 1,
  /** Eine gelesene Wissenskarte. */
  card: 1
} as const;

const questionIndex = new Map<string, { question: TourQuestion; roomId: RoomId }>();
for (const room of availableRooms) {
  for (const question of room.questions) questionIndex.set(question.id, { question, roomId: room.id });
}
export const allQuestions = availableRooms.flatMap((room) => room.questions);

/** Ein Jahreswert in der Alltagsgröße, in der der Check ihn zeigt. */
export function toUnit(unit: EverydayUnit, values: AnnualValues) {
  if (unit === "bathtubs") return values.waterL / BATHTUB_LITERS;
  if (unit === "carKm") return values.co2Kg / CAR_CO2_PER_KM;
  return values.co2Kg;
}

export type Discovery = {
  found: number;
  total: number;
  cardsRead: number;
  points: number;
};

export function discovery(state: Pick<TourState, "answers" | "cardsRead">): Discovery {
  const result: Discovery = { found: 0, total: allQuestions.length, cardsRead: 0, points: 0 };
  for (const question of allQuestions) {
    if (state.answers[question.id]) {
      result.found += 1;
      result.points += POINTS.found;
    }
    if (state.cardsRead[question.id]) {
      result.cardsRead += 1;
      result.points += POINTS.card;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Hebel und Was-wäre-wenn
// ---------------------------------------------------------------------------

export type LeverTheme = "water" | "biodiversity" | "carbon";

export type Lever = {
  questionId: string;
  roomId: RoomId;
  sceneLabel: string;
  current: TourOption;
  best: TourOption;
  saving: AnnualValues;
  theme: LeverTheme;
  /** Anteil an der eigenen Bilanz, über CO₂ und Wasser zusammen; nur zum Sortieren. */
  weight: number;
};

/** Worum es bei einem Hebel geht: Wasser im Bad, Lebensraum im Garten, sonst Klima. */
export function leverTheme(questionId: string): LeverTheme {
  const entry = questionIndex.get(questionId);
  if (entry?.roomId === "garden") return "biodiversity";
  if (everydayUnits[questionId] === "bathtubs") return "water";
  return "carbon";
}

/**
 * Die größten Hebel aus den eigenen Antworten. Als bessere Option gilt nur,
 * was der Natur nicht schadet: Schotter spart Gießwasser, wäre aber als
 * „Hebel“ für den Garten eine Empfehlung gegen die Artenvielfalt. Deshalb
 * zählen nur Optionen, die bei der Biodiversität mindestens gleichauf liegen.
 * Südtirol-Durchschnitte sind keine Handlungsoption und fallen weg. Der Regler
 * bleibt stehen wie in `bestCaseSaving`, außer bei reinen Mengenvorgaben.
 */
export function levers(
  answers: Record<string, string>,
  adjustments: Record<string, number>,
  totals: AnnualValues
): Lever[] {
  const result: Lever[] = [];
  for (const question of allQuestions) {
    const currentId = answers[question.id];
    const current = question.options.find((option) => option.id === currentId);
    if (!current) continue;
    const theme = leverTheme(question.id);
    const byWater = theme !== "carbon";
    const now = optionValues(question.id, current.id, answers, adjustments);
    let best: { option: TourOption; values: AnnualValues } | null = null;
    for (const option of question.options) {
      if (option.id === current.id || option.regionalAverage) continue;
      if ((option.impact.biodiversity ?? 0) < (current.impact.biodiversity ?? 0)) continue;
      const values = alternativeValues(question.id, option.id, answers, adjustments);
      const key = byWater ? "waterL" : "co2Kg";
      if (values[key] >= now[key]) continue;
      if (!best || values[key] < best.values[key]) best = { option, values };
    }
    if (!best) continue;
    const saving: AnnualValues = {
      co2Kg: Math.max(0, now.co2Kg - best.values.co2Kg),
      waterL: Math.max(0, now.waterL - best.values.waterL),
      energyKwh: Math.max(0, now.energyKwh - best.values.energyKwh)
    };
    const weight =
      saving.co2Kg / Math.max(1, totals.co2Kg) + saving.waterL / Math.max(1, totals.waterL);
    if (weight < 0.005) continue;
    result.push({
      questionId: question.id,
      roomId: questionIndex.get(question.id)!.roomId,
      sceneLabel: question.sceneLabel,
      current,
      best: best.option,
      saving,
      theme,
      weight
    });
  }
  return result.sort((a, b) => b.weight - a.weight);
}

/** Die Bilanz mit den eingeschalteten Hebeln. Die echten Antworten bleiben unberührt. */
export function whatIfTotals(
  answers: Record<string, string>,
  adjustments: Record<string, number>,
  whatIf: Record<string, string>
) {
  const hypothetical = { ...answers };
  const hypotheticalAdjustments = { ...adjustments };
  for (const [questionId, optionId] of Object.entries(whatIf)) {
    if (!answers[questionId]) continue;
    hypothetical[questionId] = optionId;
    // Bei reinen Mengenvorgaben bringt die andere Option ihre eigene Menge mit.
    const question = questionIndex.get(questionId)?.question;
    if (question && presetsOnly(question) && optionId !== answers[questionId]) delete hypotheticalAdjustments[questionId];
  }
  return totalValues(hypothetical, hypotheticalAdjustments);
}

export const MAX_GOALS = 3;
