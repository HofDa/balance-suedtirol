export type ScoreDimension = "biodiversity" | "carbon" | "water" | "resources";

export type Scores = Record<ScoreDimension, number>;
export type ScoreImpact = Partial<Record<ScoreDimension, number>>;

export type RoomId = "kitchen" | "bath" | "living" | "bedroom" | "mobility" | "garden" | "travel";
export type TourView = "house" | "room" | "results";
export type PanelSize = "compact" | "default" | "expanded";
export type PanelTab = "decision" | "impact" | "tips";

export type TourOption = {
  id: string;
  label: string;
  description?: string;
  impact: ScoreImpact;
  visualState?: string;
};

export type TourQuestion = {
  id: string;
  title: string;
  description?: string;
  sceneLabel: string;
  impactText: string;
  tip: string;
  options: TourOption[];
};

export type TourRoom = {
  id: RoomId;
  title: string;
  shortTitle: string;
  description: string;
  available: boolean;
  questions: TourQuestion[];
};

export type TourState = {
  view: TourView;
  activeRoom: RoomId | null;
  activeQuestionIndex: number;
  objectOpen: boolean;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  panelSize: PanelSize;
  panelTab: PanelTab;
};

export type TourAction =
  | { type: "OPEN_HOUSE" }
  | { type: "OPEN_ROOM"; roomId: RoomId; questionIndex?: number }
  | { type: "OPEN_OBJECT"; questionIndex: number }
  | { type: "SELECT_ANSWER"; questionId: string; optionId: string }
  | { type: "SKIP_QUESTION"; questionId: string }
  | { type: "SET_QUESTION"; index: number }
  | { type: "NEXT_QUESTION"; questionCount: number }
  | { type: "SET_PANEL_SIZE"; size: PanelSize }
  | { type: "SET_PANEL_TAB"; tab: PanelTab }
  | { type: "SHOW_RESULTS" }
  | { type: "RESTORE"; state: Partial<TourState> }
  | { type: "RESET" };
