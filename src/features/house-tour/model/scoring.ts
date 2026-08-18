import { availableRooms } from "../config/rooms";
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

export function calculateScores(answers: Record<string, string>): Scores {
  const scores = { ...baseScores };
  for (const room of availableRooms) for (const question of room.questions) {
    const option = question.options.find((item) => item.id === answers[question.id]);
    if (!option) continue;
    for (const [dimension, impact] of Object.entries(option.impact)) {
      scores[dimension as ScoreDimension] += impact ?? 0;
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
