import type { AnnualValues, ScoreImpact } from "./types";

/**
 * Die Jahreswerte in Bildern aus dem Alltag. „21,9 m³“ sagt kaum jemandem
 * etwas, „150 volle Badewannen“ schon. Die genauen Zahlen bleiben im
 * Rechenweg der Frage nachlesbar; hier steht nur ein Satz.
 *
 * Die Vergleichsgrößen sind bewusst grob und rund, weil sie ein Gefühl für die
 * Größenordnung geben sollen, keine zweite Messung.
 */

/** Eine volle Badewanne, Liter. */
const BATHTUB_LITERS = 150;
/** Ein Putzeimer, Liter: für Mengen, die keine Badewanne füllen. */
const BUCKET_LITERS = 10;
/** Benzin- oder Dieselauto, kg CO₂e je km — derselbe Faktor wie in der Mobilitätsfrage. */
const CAR_CO2_PER_KM = 0.22;
/** Bozen–Rom und zurück, km — derselbe Anker wie im Hinweis zur Fernreisefrage. */
const ROME_ROUND_TRIP_KM = 1400;

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

const de = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
const de1 = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

/** Auf zwei tragende Stellen: 146 → 150, 6.730 → 6.700. */
function round2(value: number) {
  if (value < 10) return Math.round(value);
  const magnitude = 10 ** (Math.floor(Math.log10(value)) - 1);
  return Math.round(value / magnitude) * magnitude;
}

function water(liters: number) {
  if (liters >= BATHTUB_LITERS * 10) {
    return { count: round2(liters / BATHTUB_LITERS), text: (n: number) => `${de.format(n)} volle Badewannen` };
  }
  const buckets = Math.max(1, round2(liters / BUCKET_LITERS));
  return { count: buckets, text: (n: number) => (n === 1 ? "ein Eimer Wasser" : `${de.format(n)} Eimer Wasser`) };
}

function carKm(co2Kg: number) {
  const km = co2Kg / CAR_CO2_PER_KM;
  if (km >= ROME_ROUND_TRIP_KM * 2) {
    const trips = Math.round(km / ROME_ROUND_TRIP_KM);
    return { count: trips, text: (n: number) => `${de.format(n)}-mal mit dem Auto nach Rom und zurück` };
  }
  return { count: round2(km), text: (n: number) => `${de.format(n)} km Autofahrt` };
}

function tonnes(co2Kg: number) {
  return co2Kg >= 1000 ? `${de1.format(co2Kg / 1000)} Tonnen CO₂` : `${de.format(round2(co2Kg))} kg CO₂`;
}

export type EverydayLine = { headline: string; detail?: string; saving?: string };

/** Ein Satz für die gewählte Antwort, einer für das, was noch drin ist. */
export function everydayLine(
  questionId: string,
  values: AnnualValues | null,
  saving: AnnualValues | null,
  impact: ScoreImpact
): EverydayLine {
  const plan = story[questionId] ?? { primary: "co2" as Kind };

  const phrase = (kind: Kind, from: AnnualValues) => {
    if (kind === "water" && from.waterL > 0) {
      const { count, text } = water(from.waterL);
      return count > 0 ? text(count) : null;
    }
    if (kind === "co2" && from.co2Kg >= 1) {
      const { count, text } = carKm(from.co2Kg);
      return count > 0 ? text(count) : null;
    }
    if (kind === "co2-plain" && from.co2Kg >= 1) return tonnes(from.co2Kg);
    return null;
  };

  const head = values ? phrase(plan.primary, values) : null;
  if (!head) return { headline: qualitative(impact) };

  const headline =
    plan.primary === "water"
      ? `Rund ${head} im Jahr.`
      : plan.primary === "co2"
        ? `So viel CO₂ wie ${head} im Jahr.`
        : `Rund ${head} im Jahr.`;

  const second = plan.secondary && values ? phrase(plan.secondary, values) : null;
  const detail = second ? `Das Aufheizen wiegt so viel CO₂ wie ${second}.` : undefined;

  const less = saving ? phrase(plan.primary, saving) : null;
  return {
    headline,
    detail,
    saving: less ? `Mit der sparsamsten Antwort: ${less} weniger.` : undefined
  };
}

/** Für Fragen ohne Mengenbeitrag: die Richtung in Worten statt Punkten. */
function qualitative(impact: ScoreImpact) {
  const nature = impact.biodiversity ?? 0;
  if (nature >= 5) return "Ein echter Gewinn für Wildbienen, Vögel und Falter.";
  if (nature > 0) return "Ein Anfang für die Artenvielfalt vor deiner Tür.";
  if (nature < 0) return "Hier findet die Natur vor deiner Tür wenig.";
  const sum = Object.values(impact).reduce((total, value) => total + (value ?? 0), 0);
  if (sum > 0) return "Eine sparsame Wahl.";
  if (sum < 0) return "Hier steckt noch Spielraum.";
  return "Zählt nicht in die Bilanz — eine Frage zum Nachdenken.";
}
