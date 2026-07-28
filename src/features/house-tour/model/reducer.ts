import type { TourAction, TourState } from "./types";

export const initialTourState: TourState = {
  view: "house",
  activeRoom: null,
  activeQuestionIndex: 0,
  objectOpen: false,
  answers: {},
  skippedQuestions: {},
  panelSize: "default",
  panelTab: "decision"
};

export function tourReducer(state: TourState, action: TourAction): TourState {
  switch (action.type) {
    case "OPEN_HOUSE":
      return { ...state, view: "house", activeRoom: null, objectOpen: false, panelTab: "decision" };
    case "OPEN_ROOM":
      return {
        ...state,
        view: "room",
        activeRoom: action.roomId,
        activeQuestionIndex: action.questionIndex ?? 0,
        objectOpen: false,
        panelTab: "decision"
      };
    case "OPEN_OBJECT":
      return { ...state, activeQuestionIndex: action.questionIndex, objectOpen: true, panelTab: "decision" };
    case "SELECT_ANSWER": {
      const skippedQuestions = { ...state.skippedQuestions };
      delete skippedQuestions[action.questionId];
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.optionId },
        skippedQuestions,
        panelTab: "impact"
      };
    }
    case "SKIP_QUESTION": {
      const answers = { ...state.answers };
      delete answers[action.questionId];
      return {
        ...state,
        answers,
        skippedQuestions: { ...state.skippedQuestions, [action.questionId]: true },
        objectOpen: false,
        panelTab: "decision"
      };
    }
    case "SET_QUESTION":
      return { ...state, activeQuestionIndex: action.index, objectOpen: false, panelTab: "decision" };
    case "NEXT_QUESTION":
      return {
        ...state,
        activeQuestionIndex: Math.min(state.activeQuestionIndex + 1, action.questionCount - 1),
        objectOpen: false,
        panelTab: "decision"
      };
    case "SET_PANEL_SIZE": return { ...state, panelSize: action.size };
    case "SET_PANEL_TAB": return { ...state, panelTab: action.tab };
    case "SHOW_RESULTS":
      return { ...state, view: "results", activeRoom: null, objectOpen: false, panelSize: "default" };
    case "RESTORE": {
      const restoredRoom = action.state.activeRoom as string | null | undefined;
      const roomStillExists =
        !restoredRoom ||
        ["kitchen", "bath", "living", "bedroom", "mobility", "garden", "travel"].includes(
          restoredRoom
        );
      return {
        ...initialTourState,
        ...action.state,
        view: roomStillExists ? action.state.view ?? initialTourState.view : "house",
        activeRoom: roomStillExists ? action.state.activeRoom ?? null : null,
        skippedQuestions: action.state.skippedQuestions ?? {},
        objectOpen: false,
        panelTab: "decision"
      };
    }
    case "RESET": return initialTourState;
  }
}
