import { availableRooms } from "../config/rooms";
import { optionValues } from "./calculator";
import type { RoomId, ScoreDimension, Scores, TourRoom } from "./types";

export const scoreDimensions: { id: ScoreDimension; label: string; compact: string }[] = [
  { id: "biodiversity", label: "Biodiversität", compact: "Natur" },
  { id: "carbon", label: "CO₂", compact: "CO₂" },
  { id: "water", label: "Wasser", compact: "Wasser" },
  { id: "resources", label: "Ressourcen", compact: "Ress." }
];

export const baseScores: Scores = { biodiversity: 50, carbon: 50, water: 50, resources: 50 };
const clamp = (value: number) => Math.max(0, Math.min(100, value));

export type RoomProgress = {
  total: number;
  handled: number;
  isStarted: boolean;
  isComplete: boolean;
};

/** Einheitliche Semantik für beantwortete und bewusst übersprungene Fragen. */
export function getRoomProgress(
  room: TourRoom,
  answers: Record<string, string>,
  skippedQuestions: Record<string, boolean> = {}
): RoomProgress {
  const total = room.questions.length;
  const handled = room.questions.reduce(
    (count, question) => count + Number(Boolean(answers[question.id] || skippedQuestions[question.id])),
    0
  );
  return {
    total,
    handled,
    isStarted: handled > 0,
    isComplete: total > 0 && handled === total
  };
}

export function getTourProgress(
  answers: Record<string, string>,
  skippedQuestions: Record<string, boolean> = {}
) {
  return availableRooms.reduce(
    (progress, room) => {
      const roomProgress = getRoomProgress(room, answers, skippedQuestions);
      progress.total += roomProgress.total;
      progress.handled += roomProgress.handled;
      return progress;
    },
    { total: 0, handled: 0 }
  );
}

const measuredKey: Partial<Record<ScoreDimension, "co2Kg" | "waterL" | "energyKwh">> = {
  carbon: "co2Kg",
  water: "waterL",
  resources: "energyKwh"
};

/**
 * Interpoliert den Punktwert entlang der tatsächlich berechneten Menge. Damit
 * kann ein Regler eine zunächst gute Auswahl nicht ins Gegenteil verkehren,
 * ohne dass der Wirkungsindex darauf reagiert. Außerhalb der Vorgabepunkte wird
 * vorsichtig extrapoliert und anschließend auf ±10 Punkte je Frage begrenzt.
 */
function measuredImpact(
  question: TourRoom["questions"][number],
  optionId: string,
  dimension: ScoreDimension,
  answers: Record<string, string>,
  adjustments: Record<string, number>
) {
  const selected = question.options.find((option) => option.id === optionId);
  const fallback = selected?.impact[dimension] ?? 0;
  const key = measuredKey[dimension];
  if (!question.adjust || !key) return fallback;

  const withoutCurrentAdjustment = { ...adjustments };
  delete withoutCurrentAdjustment[question.id];
  const anchors = question.options
    .map((option) => ({
      load: optionValues(question.id, option.id, answers, withoutCurrentAdjustment)[key],
      impact: option.impact[dimension] ?? 0
    }))
    .sort((a, b) => a.load - b.load);

  const distinct = anchors.filter(
    (anchor, index) => index === 0 || Math.abs(anchor.load - anchors[index - 1].load) > 1e-9
  );
  if (distinct.length < 2) return fallback;

  const load = optionValues(question.id, optionId, answers, adjustments)[key];
  let lower = distinct[0];
  let upper = distinct[1];
  if (load >= distinct.at(-1)!.load) {
    lower = distinct.at(-2)!;
    upper = distinct.at(-1)!;
  } else if (load > distinct[0].load) {
    const upperIndex = distinct.findIndex((anchor) => anchor.load >= load);
    lower = distinct[Math.max(0, upperIndex - 1)];
    upper = distinct[upperIndex];
  }

  const share = (load - lower.load) / (upper.load - lower.load);
  return Math.max(-10, Math.min(10, Math.round(lower.impact + share * (upper.impact - lower.impact))));
}

export function calculateScores(
  answers: Record<string, string>,
  adjustments: Record<string, number> = {}
): Scores {
  const scores = { ...baseScores };
  for (const room of availableRooms) for (const question of room.questions) {
    const option = question.options.find((item) => item.id === answers[question.id]);
    if (!option) continue;
    for (const dimension of scoreDimensions) {
      scores[dimension.id] += measuredImpact(
        question,
        option.id,
        dimension.id,
        answers,
        adjustments
      );
    }
  }
  for (const dimension of scoreDimensions) scores[dimension.id] = clamp(scores[dimension.id]);
  return scores;
}

export function isRoomComplete(
  roomId: RoomId,
  answers: Record<string, string>,
  skippedQuestions: Record<string, boolean> = {}
) {
  const room = availableRooms.find((item) => item.id === roomId);
  return room ? getRoomProgress(room, answers, skippedQuestions).isComplete : false;
}

export function completedRoomIds(
  answers: Record<string, string>,
  skippedQuestions: Record<string, boolean> = {}
) {
  return availableRooms
    .filter((room) => getRoomProgress(room, answers, skippedQuestions).isComplete)
    .map((room) => room.id);
}
