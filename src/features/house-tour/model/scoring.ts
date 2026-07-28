import { availableRooms } from "../config/rooms";
import type { RoomId, ScoreDimension, Scores } from "./types";

export const scoreDimensions: { id: ScoreDimension; label: string; compact: string }[] = [
  { id: "biodiversity", label: "Biodiversität", compact: "Natur" },
  { id: "carbon", label: "CO₂", compact: "CO₂" },
  { id: "water", label: "Wasser", compact: "Wasser" },
  { id: "resources", label: "Ressourcen", compact: "Ress." }
];

export const baseScores: Scores = { biodiversity: 50, carbon: 50, water: 50, resources: 50 };
const clamp = (value: number) => Math.max(0, Math.min(100, value));

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
  return Boolean(
    room?.questions.length &&
      room.questions.every((question) => answers[question.id] || skippedQuestions[question.id])
  );
}

export function completedRoomIds(
  answers: Record<string, string>,
  skippedQuestions: Record<string, boolean> = {}
) {
  return availableRooms
    .filter((room) => isRoomComplete(room.id, answers, skippedQuestions))
    .map((room) => room.id);
}
