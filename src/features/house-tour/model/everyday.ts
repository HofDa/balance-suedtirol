import type { Locale } from "../../../config/site";
import { localeTags } from "../../../lib/i18n";
import { tourUi, type TourUi } from "../i18n/ui";
import type { AnnualValues, ScoreImpact } from "./types";
import { GAS_KWH_PER_SMC, HEATING_OIL_KWH_PER_LITER, SOUTH_TYROL_HOUSEHOLD_KWH_PER_PERSON } from "./calculator";

/**
 * Die Jahreswerte in Bildern aus dem Alltag. „21,9 m³“ sagt kaum jemandem
 * etwas, „150 volle Badewannen“ schon. Die genauen Zahlen bleiben im
 * Rechenweg der Frage nachlesbar; hier steht nur ein Satz.
 *
 * Die Vergleichsgrößen sind bewusst grob und rund, weil sie ein Gefühl für die
 * Größenordnung geben sollen, keine zweite Messung.
 */

/** Eine volle Badewanne, Liter. */
export const BATHTUB_LITERS = 150;
/** Ein Putzeimer, Liter: für Mengen, die keine Badewanne füllen. */
const BUCKET_LITERS = 10;
/** Benzin- oder Dieselauto, kg CO₂e je km — derselbe Faktor wie in der Mobilitätsfrage. */
export const CAR_CO2_PER_KM = 0.22;
/** Bozen–Rom und zurück, km — derselbe Anker wie im Hinweis zur Fernreisefrage. */
export const ROME_ROUND_TRIP_KM = 1400;

type Kind = "water" | "co2" | "co2-plain";

/**
 * Welche Größe eine Frage am besten erzählt. Wasserfragen in Badewannen, die
 * meisten anderen in Autokilometern. Bei der Mobilität wäre „so viel wie
 * 9.000 km Autofahrt“ für 9.000 km Autofahrt ein Zirkelschluss, dort bleibt
 * die Tonne.
 */
const story: Record<string, { primary: Kind; secondary?: Kind }> = {
  "bath-shower": { primary: "water", secondary: "co2" },
  "bath-toilet": { primary: "water" },
  "garden-ground": { primary: "water" },
  "mobility-short": { primary: "co2-plain" },
  "mobility-km": { primary: "co2-plain" },
  "mobility-long": { primary: "co2-plain" }
};

const formatters = (locale: Locale) => ({
  whole: new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 0 }),
  tenth: new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 1 })
});
type Words = TourUi["everyday"];
type Numbers = ReturnType<typeof formatters>;

/** Auf zwei tragende Stellen: 146 → 150, 6.730 → 6.700. */
export function round2(value: number) {
  if (value < 10) return Math.round(value);
  const magnitude = 10 ** (Math.floor(Math.log10(value)) - 1);
  return Math.round(value / magnitude) * magnitude;
}

function water(liters: number, w: Words, f: Numbers) {
  if (liters >= BATHTUB_LITERS * 10) {
    return { count: round2(liters / BATHTUB_LITERS), text: (n: number) => w.bathtubs(f.whole.format(n)) };
  }
  const buckets = Math.max(1, round2(liters / BUCKET_LITERS));
  return { count: buckets, text: (n: number) => (n === 1 ? w.bucketOne : w.buckets(f.whole.format(n))) };
}

function carKm(co2Kg: number, w: Words, f: Numbers) {
  const km = co2Kg / CAR_CO2_PER_KM;
  if (km >= ROME_ROUND_TRIP_KM * 2) {
    const trips = Math.round(km / ROME_ROUND_TRIP_KM);
    return { count: trips, text: (n: number) => w.romeTrips(f.whole.format(n)) };
  }
  return { count: round2(km), text: (n: number) => w.carKm(f.whole.format(n)) };
}

function tonnes(co2Kg: number, w: Words, f: Numbers) {
  return co2Kg >= 1000 ? w.tonnes(f.tenth.format(co2Kg / 1000)) : w.kilos(f.whole.format(round2(co2Kg)));
}

export type EverydayLine = { headline: string; detail?: string; saving?: string };

/** Ein Satz für die gewählte Antwort, einer für das, was noch drin ist. */
export function everydayLine(
  questionId: string,
  values: AnnualValues | null,
  saving: AnnualValues | null,
  impact: ScoreImpact,
  locale: Locale = "de"
): EverydayLine {
  const plan = story[questionId] ?? { primary: "co2" as Kind };
  const w = tourUi[locale].everyday;
  const f = formatters(locale);

  const phrase = (kind: Kind, from: AnnualValues) => {
    if (kind === "water" && from.waterL > 0) {
      const { count, text } = water(from.waterL, w, f);
      return count > 0 ? text(count) : null;
    }
    if (kind === "co2" && from.co2Kg >= 1) {
      const { count, text } = carKm(from.co2Kg, w, f);
      return count > 0 ? text(count) : null;
    }
    if (kind === "co2-plain" && from.co2Kg >= 1) return tonnes(from.co2Kg, w, f);
    return null;
  };

  const head = values ? phrase(plan.primary, values) : null;
  if (!head) return { headline: qualitative(impact, w) };

  const headline = plan.primary === "water" ? w.water(head) : plan.primary === "co2" ? w.co2(head) : w.plain(head);
  const second = plan.secondary && values ? phrase(plan.secondary, values) : null;
  const less = saving ? phrase(plan.primary, saving) : null;
  return {
    headline,
    detail: second ? w.heating(second) : undefined,
    saving: less ? w.saving(less) : undefined
  };
}

/** Für Fragen ohne Mengenbeitrag: die Richtung in Worten statt Punkten. */
function qualitative(impact: ScoreImpact, w: Words) {
  const nature = impact.biodiversity ?? 0;
  if (nature >= 5) return w.natureStrong;
  if (nature > 0) return w.natureSome;
  if (nature < 0) return w.natureNone;
  const sum = Object.values(impact).reduce((total, value) => total + (value ?? 0), 0);
  if (sum > 0) return w.thrifty;
  if (sum < 0) return w.room;
  return w.none;
}

export type Landmarks = "distance" | "area";
export type LandmarkKey = "earth" | "rome" | "innsbruck" | "meran" | "tennis" | "parking";

/**
 * Vergleiche unter großen Reglern: Strecken an Wegen aus der Gegend, Flächen
 * an Plätzen, die jeder kennt. Es gilt der größte Vergleich, der mindestens
 * einmal hineinpasst. Straßenkilometer gerundet; Tennisplatz im Doppelfeld
 * 23,77 × 10,97 m, Parkplatz 2,5 × 5 m.
 */
const landmarkSets: Record<Landmarks, { size: number; key: LandmarkKey }[]> = {
  distance: [
    { size: 40000, key: "earth" },
    { size: ROME_ROUND_TRIP_KM, key: "rome" },
    { size: 120, key: "innsbruck" },
    { size: 30, key: "meran" }
  ],
  area: [
    { size: 260, key: "tennis" },
    { size: 12.5, key: "parking" }
  ]
};

/** Wie oft ein Vergleich in einen Wert passt; unter zehn auf eine Stelle genau. */
export function landmark(kind: Landmarks, value: number): { key: LandmarkKey; times: number } | null {
  const match = landmarkSets[kind].find(({ size }) => value >= size);
  if (!match) return null;
  const times = value / match.size;
  return { key: match.key, times: times < 10 ? Math.round(times * 10) / 10 : Math.round(times) };
}

/**
 * Heizenergie in der Einheit, die auf der Rechnung steht: Smc beim Gas,
 * Liter beim Öl, auf zehn gerundet. So lässt sich der Regler an der Rechnung
 * einstellen, statt sie erst umzurechnen. Fernwärme und Wärmepumpe rechnen
 * ohnehin in kWh ab; „Biomasse“ teilt sich die Option mit der Fernwärme und
 * hat deshalb keine eindeutige Einheit.
 */
export function heatingBillUnit(optionId: string | undefined, kwh: number): { key: "gas" | "oil"; amount: number } | null {
  if (!(kwh > 0)) return null;
  if (optionId === "heat-gas") return { key: "gas", amount: Math.round(kwh / GAS_KWH_PER_SMC / 10) * 10 };
  if (optionId === "heat-oil") return { key: "oil", amount: Math.round(kwh / HEATING_OIL_KWH_PER_LITER / 10) * 10 };
  return null;
}

/** Haushaltsstrom pro Kopf gegen den Südtiroler Durchschnitt, auf eine Stelle. */
export function electricityShare(kwh: number) {
  if (!(kwh > 0)) return null;
  return Math.round((kwh / SOUTH_TYROL_HOUSEHOLD_KWH_PER_PERSON) * 10) / 10;
}
