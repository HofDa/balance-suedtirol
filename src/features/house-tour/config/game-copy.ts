/**
 * Die Spiellogik hinter den Texten: in welcher Alltagsgröße geschätzt wird und
 * welche Wahr-oder-falsch-Aussage stimmt. Die Texte selbst stehen dreisprachig
 * in `i18n/ui.ts`.
 *
 * Die Wahr-oder-falsch-Aussagen behaupten nichts Neues: jede formuliert einen
 * Satz um, der bereits in der Beschreibung, im Wirkungstext oder im Tipp der
 * jeweiligen Frage steht. Damit gilt für sie dieselbe Quellenlage wie für die
 * Frage selbst.
 */

/** In welcher Alltagsgröße geschätzt wird. Dieselbe Größe zeigt die Auflösung. */
export type GuessUnit = "bathtubs" | "carKm" | "co2Kg";

export const estimateUnits: Record<string, GuessUnit> = {
  "bath-shower": "bathtubs",
  "bath-toilet": "bathtubs",
  "garden-ground": "bathtubs",
  "bath-water-heating": "carKm",
  "bedroom-heating": "carKm",
  "bedroom-textiles": "carKm",
  "living-tv-streaming": "carKm",
  "kitchen-diet": "carKm",
  "kitchen-origin": "carKm",
  "kitchen-waste": "carKm",
  "mobility-short": "co2Kg",
  "mobility-km": "co2Kg",
  "mobility-long": "co2Kg"
};

/** Ob die Aussage zur Frage stimmt (bedroom.ts, living.ts, garden.ts). */
export const quizAnswers: Record<string, boolean> = {
  "bedroom-standby": true,
  "living-lighting": false,
  "living-plants": false,
  "garden-plants": true,
  "garden-structures": false
};
