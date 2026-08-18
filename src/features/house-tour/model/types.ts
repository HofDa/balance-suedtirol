export type ScoreDimension = "biodiversity" | "carbon" | "water" | "resources";

export type Scores = Record<ScoreDimension, number>;
export type ScoreImpact = Partial<Record<ScoreDimension, number>>;

export type RoomId = "kitchen" | "bath" | "living" | "bedroom" | "mobility" | "garden" | "travel";
export type TourView = "house" | "room" | "results";

/** Jahreswerte pro Person. Bilanzgrenzen siehe `model/calculator.ts`. */
export type AnnualValues = {
  co2Kg: number;
  waterL: number;
  energyKwh: number;
};

export type MetricId = "co2" | "water" | "energy";

export type TourOption = {
  id: string;
  label: string;
  description?: string;
  impact: ScoreImpact;
  /**
   * Physikalische Kenngrößen der Option — Liter je Minute, Watt je Gerät,
   * kg CO₂ je Kilometer. Die Umrechnung in Jahreswerte steht im Rechner, damit
   * ein Emissionsfaktor nur an einer Stelle gepflegt wird.
   */
  params?: Record<string, number>;
};

/**
 * Feinjustierung einer Frage. Die Optionen setzen den Vorgabewert, der Regler
 * erlaubt den eigenen. Beides läuft durch dieselbe Formel, deshalb können
 * Optionswert und Reglerwert nicht auseinanderlaufen.
 */
export type QuestionAdjust = {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  /** Vorgabemenge je Option-ID. */
  defaults: Record<string, number>;
  hint?: string;
};

export type TourQuestion = {
  id: string;
  title: string;
  description?: string;
  sceneLabel: string;
  impactText: string;
  tip: string;
  adjust?: QuestionAdjust;
  /** Warum diese Frage auf eine Kennzahl bewusst nicht einzahlt. */
  scopeNote?: string;
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
  /** Selbst gesetzte Reglerwerte je Frage-ID; fehlt ein Eintrag, gilt die Vorgabe der Option. */
  adjustments: Record<string, number>;
};

export type TourAction =
  | { type: "OPEN_HOUSE" }
  | { type: "OPEN_ROOM"; roomId: RoomId; questionIndex?: number }
  | { type: "OPEN_OBJECT"; questionIndex: number }
  | { type: "SELECT_ANSWER"; questionId: string; optionId: string }
  | { type: "SET_ADJUSTMENT"; questionId: string; quantity: number }
  | { type: "CLEAR_ADJUSTMENT"; questionId: string }
  | { type: "SKIP_QUESTION"; questionId: string }
  /** `open` hält das Objekt geöffnet, damit der Weiter-Weg ohne Szenenklick trägt. */
  | { type: "SET_QUESTION"; index: number; open?: boolean }
  | { type: "SHOW_RESULTS" }
  | { type: "RESTORE"; state: Partial<TourState> }
  | { type: "RESET" };
