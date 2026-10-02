export type ScoreDimension = "biodiversity" | "carbon" | "water" | "resources";

export type Scores = Record<ScoreDimension, number>;
export type ScoreImpact = Partial<Record<ScoreDimension, number>>;

export type RoomId = "kitchen" | "bath" | "living" | "bedroom" | "mobility" | "garden";
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
  /**
   * Die Antwort „Weiß ich nicht“: ein Südtiroler Durchschnitt statt einer
   * Lücke in der Bilanz. Nur wo eine amtliche Quelle die Verteilung liefert;
   * die Herleitung prüft `tests/house-calculator.test.ts`.
   */
  regionalAverage?: { source: string; basis: string };
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
  /**
   * Gefragt wird in einer Alltagsgröße (Songs, Portionen), gerechnet in der
   * Basiseinheit des Rechners (Minuten, Kilogramm). `factor` rechnet um; der
   * Regler zeigt die Basismenge als Gegenprobe darunter an.
   */
  base?: { factor: number; unit: string };
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

/**
 * Was beim Schätzen passiert ist. `actual` hält den Wert zum Zeitpunkt des
 * Tipps fest: ändert jemand später seine Antwort, bleibt die Wertung ehrlich
 * an dem Wert, gegen den geschätzt wurde.
 */
export type GuessRecord =
  | { kind: "estimate"; guess: number; actual: number }
  | { kind: "quiz"; choice: boolean }
  | { kind: "skipped" };

export type TourState = {
  view: TourView;
  activeRoom: RoomId | null;
  activeQuestionIndex: number;
  objectOpen: boolean;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  /** Selbst gesetzte Reglerwerte je Frage-ID; fehlt ein Eintrag, gilt die Vorgabe der Option. */
  adjustments: Record<string, number>;
  /** Spielebene: Tipps je Frage. Berührt Antworten und Bilanz nie. */
  guesses: Record<string, GuessRecord>;
  /** Gelesene Wissenskarten je Frage-ID. */
  cardsRead: Record<string, true>;
  /** Was-wäre-wenn: hypothetische Option je Frage-ID, getrennt von den echten Antworten. */
  whatIf: Record<string, string>;
  /** Als Vorhaben gemerkte Hebel (Frage-IDs), höchstens drei. */
  goals: string[];
};

export type TourAction =
  | { type: "OPEN_HOUSE" }
  | { type: "OPEN_ROOM"; roomId: RoomId; questionIndex?: number; open?: boolean }
  | { type: "OPEN_OBJECT"; questionIndex: number }
  | { type: "SELECT_ANSWER"; questionId: string; optionId: string }
  | { type: "SET_ADJUSTMENT"; questionId: string; quantity: number }
  | { type: "CLEAR_ADJUSTMENT"; questionId: string }
  | { type: "SKIP_QUESTION"; questionId: string }
  /** `open` hält das Objekt geöffnet, damit der Weiter-Weg ohne Szenenklick trägt. */
  | { type: "SET_QUESTION"; index: number; open?: boolean }
  | { type: "SHOW_RESULTS" }
  | { type: "RECORD_GUESS"; questionId: string; record: GuessRecord }
  | { type: "READ_CARD"; questionId: string }
  | { type: "SET_WHAT_IF"; questionId: string; optionId: string | null }
  | { type: "TOGGLE_GOAL"; questionId: string }
  | { type: "RESTORE"; state: unknown }
  | { type: "RESET" };
