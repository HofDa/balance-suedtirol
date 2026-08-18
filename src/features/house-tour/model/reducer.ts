import type { TourAction, TourState } from "./types";

const recordOrEmpty = <T>(value: unknown): Record<string, T> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, T>
    : {};

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
        objectOpen: false
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
    case "SET_ADJUSTMENT":
      return {
        ...state,
        adjustments: { ...state.adjustments, [action.questionId]: action.quantity }
      };
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
    case "RESTORE": {
      const restoredRoom = action.state.activeRoom as string | null | undefined;
      const roomStillExists =
        !restoredRoom ||
        ["kitchen", "bath", "living", "bedroom", "mobility", "garden", "travel"].includes(
          restoredRoom
        );
      const restoredView = action.state.view;
      const view = restoredView === "house" || restoredView === "room" || restoredView === "results"
        ? restoredView
        : initialTourState.view;
      const questionIndex = action.state.activeQuestionIndex;
      return {
        view: roomStillExists ? view : "house",
        activeRoom: roomStillExists ? action.state.activeRoom ?? null : null,
        activeQuestionIndex:
          typeof questionIndex === "number" && Number.isFinite(questionIndex)
            ? Math.max(0, Math.floor(questionIndex))
            : 0,
        objectOpen: false,
        answers: recordOrEmpty<string>(action.state.answers),
        skippedQuestions: recordOrEmpty<boolean>(action.state.skippedQuestions),
        adjustments: recordOrEmpty<number>(action.state.adjustments)
      };
    }
    case "RESET": return initialTourState;
  }
}
