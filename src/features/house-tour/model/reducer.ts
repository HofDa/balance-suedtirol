import type { TourAction, TourState } from "./types";
import { availableRooms } from "../config/rooms";

const recordOrEmpty = <T>(value: unknown): Record<string, T> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, T>
    : {};

const questions = new Map(
  availableRooms.flatMap((room) => room.questions.map((question) => [question.id, question] as const))
);

const clampAdjustment = (questionId: string, quantity: number) => {
  const adjust = questions.get(questionId)?.adjust;
  if (!adjust || !Number.isFinite(quantity)) return undefined;
  return Math.min(adjust.max, Math.max(adjust.min, quantity));
};

function sanitizeAnswers(value: unknown) {
  const source = recordOrEmpty<unknown>(value);
  return Object.fromEntries(
    Object.entries(source).filter(([questionId, optionId]) =>
      typeof optionId === "string" && questions.get(questionId)?.options.some((option) => option.id === optionId)
    )
  ) as Record<string, string>;
}

function sanitizeAdjustments(value: unknown) {
  const source = recordOrEmpty<unknown>(value);
  const clean: Record<string, number> = {};
  for (const [questionId, quantity] of Object.entries(source)) {
    if (typeof quantity !== "number") continue;
    const clamped = clampAdjustment(questionId, quantity);
    if (clamped !== undefined) clean[questionId] = clamped;
  }
  return clean;
}

function sanitizeSkipped(value: unknown, answers: Record<string, string>) {
  const source = recordOrEmpty<unknown>(value);
  return Object.fromEntries(
    Object.entries(source).filter(([questionId, skipped]) =>
      skipped === true && questions.has(questionId) && !answers[questionId]
    )
  ) as Record<string, boolean>;
}

export const initialTourState: TourState = {
  view: "house",
  activeRoom: null,
  activeQuestionIndex: 0,
  objectOpen: false,
  answers: {},
  skippedQuestions: {},
  adjustments: {}
};

export function tourReducer(state: TourState, action: TourAction): TourState {
  switch (action.type) {
    case "OPEN_HOUSE":
      return { ...state, view: "house", activeRoom: null, objectOpen: false };
    case "OPEN_ROOM":
      return {
        ...state,
        view: "room",
        activeRoom: action.roomId,
        activeQuestionIndex: action.questionIndex ?? 0,
        // Der Gegenstand ist in der Szene schon hervorgehoben; ein eigener
        // Entdecken-Schritt davor kostete je Objekt einen Tipp ohne Inhalt.
        objectOpen: action.open ?? false
      };
    case "OPEN_OBJECT":
      return { ...state, activeQuestionIndex: action.questionIndex, objectOpen: true };
    case "SELECT_ANSWER": {
      const skippedQuestions = { ...state.skippedQuestions };
      delete skippedQuestions[action.questionId];
      // Die Option setzt die Menge, der Regler verfeinert sie. Bliebe ein alter
      // Reglerwert stehen, hieße „überwiegend pflanzlich“ weiter zwölf
      // Fleischmahlzeiten pro Woche.
      const adjustments = { ...state.adjustments };
      delete adjustments[action.questionId];
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.optionId },
        skippedQuestions,
        adjustments
      };
    }
    case "SET_ADJUSTMENT": {
      const quantity = clampAdjustment(action.questionId, action.quantity);
      if (quantity === undefined) return state;
      return {
        ...state,
        adjustments: { ...state.adjustments, [action.questionId]: quantity }
      };
    }
    case "CLEAR_ADJUSTMENT": {
      const adjustments = { ...state.adjustments };
      delete adjustments[action.questionId];
      return { ...state, adjustments };
    }
    case "SKIP_QUESTION": {
      const answers = { ...state.answers };
      delete answers[action.questionId];
      return {
        ...state,
        answers,
        skippedQuestions: { ...state.skippedQuestions, [action.questionId]: true },
        objectOpen: false
      };
    }
    case "SET_QUESTION":
      // Der Weiter-Weg öffnet das nächste Objekt direkt. Der Entdecken-Zustand
      // (`open: false`) bleibt dem Raumeintritt vorbehalten, sonst verlangt
      // jedes Objekt einen zusätzlichen Klick in die Szene.
      return {
        ...state,
        activeQuestionIndex: action.index,
        objectOpen: action.open ?? false
      };
    case "SHOW_RESULTS":
      return { ...state, view: "results", activeRoom: null, objectOpen: false };
    case "RESTORE": return restoreTourState(action.state);
    case "RESET": return initialTourState;
  }
}

/** Restore only rooms and questions that exist in the current tour. */
export function restoreTourState(input: unknown): TourState {
  const source = recordOrEmpty<unknown>(input);
  const room = availableRooms.find((candidate) => candidate.id === source.activeRoom);
  const requestedView = source.view;
  const view = requestedView === "results" ? "results" : requestedView === "room" && room ? "room" : "house";
  const questionIndex = source.activeQuestionIndex;
  const answers = sanitizeAnswers(source.answers);
  return {
    view,
    activeRoom: view === "room" && room ? room.id : null,
    activeQuestionIndex: room && typeof questionIndex === "number" && Number.isFinite(questionIndex)
      ? Math.min(room.questions.length - 1, Math.max(0, Math.floor(questionIndex)))
      : 0,
    objectOpen: view === "room",
    answers,
    skippedQuestions: sanitizeSkipped(source.skippedQuestions, answers),
    adjustments: sanitizeAdjustments(source.adjustments),
  };
}
