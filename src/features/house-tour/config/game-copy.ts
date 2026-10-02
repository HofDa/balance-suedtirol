/**
 * In welcher Alltagsgröße der Check einen Jahreswert zeigt: Wasser in
 * Badewannen, Haushalts-CO₂ in Autokilometern, Mobilität direkt in CO₂.
 * Die Texte dazu stehen dreisprachig in `i18n/ui.ts`.
 */
export type EverydayUnit = "bathtubs" | "carKm" | "co2Kg";

export const everydayUnits: Record<string, EverydayUnit> = {
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
