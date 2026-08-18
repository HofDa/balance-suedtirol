import { availableRooms } from "../config/rooms";
import type { AnnualValues, MetricId, TourOption, TourQuestion } from "./types";

/**
 * Jahresbilanz des Lebensraum-Checks: CO₂, Trinkwasser und Endenergie.
 *
 * Alle Werte gelten pro Person und Jahr. Die Faktoren sind in
 * `docs/BILANZ-FAKTOREN.md` mit Quelle und Annahme dokumentiert; hier stehen
 * sie an einer Stelle, damit ein Faktor nie zweimal im Code auftaucht.
 *
 * Drei Bilanzgrenzen, die bewusst unterschiedlich gezogen sind:
 *
 * - **CO₂** ist der volle Fußabdruck einschließlich Vorkette. Nur so tauchen
 *   Ernährung und Textilien überhaupt auf, und genau das erwarten Nutzer.
 * - **Wasser** zählt ausschließlich direktes Leitungswasser. Das virtuelle
 *   Wasser hinter Ernährung und Kleidung liegt bei rund 1,3 Millionen Litern
 *   im Jahr und wäre gegenüber 78.000 Litern Haushaltswasser so erdrückend,
 *   dass jede Entscheidung im Bad bedeutungslos aussähe.
 * - **Energie** zählt Endenergie, die die Person selbst verbraucht: Strom,
 *   Wärme, Kraftstoff. Graue Energie aus Produkten bleibt außen vor, sie steckt
 *   bereits im CO₂-Wert.
 *
 * Wo eine Bilanzgrenze einen Wert ausschließt, bleibt er null. Das Panel
 * schreibt dazu, warum — eine Null ohne Erklärung liest sich wie ein Fehler.
 */

// ---------------------------------------------------------------------------
// Faktoren
// ---------------------------------------------------------------------------

/** Italienischer Strommix, kg CO₂e je kWh. */
const GRID_CO2_PER_KWH = 0.28;

/** Wärme aus dem Südtiroler Mix (hoher Anteil Biomasse-Fernwärme), kg CO₂e/kWh. */
const HEAT_CO2_PER_KWH = 0.19;

/** Raumwärmebedarf pro Person bei 20 °C Zieltemperatur, kWh/a. */
const HEAT_DEMAND_AT_20C = 4200;

/** Faustregel: je Grad Raumtemperatur rund 6 % Heizenergie. */
const HEAT_PER_KELVIN = 0.06;

/** Aufheizen von 12 °C auf 38 °C: 4,186 kJ/(kg·K) × 26 K, kWh je Liter. */
const HOT_WATER_KWH_PER_LITER = 0.0302;

/** Warmwasser außerhalb der Dusche (Hände, Spülen, Putzen), Liter/a. */
const OTHER_HOT_WATER_LITERS = 8000;

/** Aufbereitung und Verteilung von Trinkwasser, kWh je Liter. */
const WATER_SUPPLY_KWH_PER_LITER = 0.0005;

/** Vollständige Vorkette weggeworfener Lebensmittel, kg CO₂e je kg. */
const FOOD_WASTE_CO2_PER_KG = 2.5;

/** Ernährung: Sockel einer überwiegend pflanzlichen Kost, kg CO₂e/a. */
const DIET_BASE_CO2 = 950;

/** Aufschlag je Fleischmahlzeit pro Woche über ein Jahr, kg CO₂e/a. */
const DIET_CO2_PER_WEEKLY_MEAT_MEAL = 105;

/** Voller Aufschlag für importierte und außersaisonale Ware, kg CO₂e/a. */
const FOOD_ORIGIN_MAX_CO2 = 400;

/** Ein Dauerverbraucher im Standby über ein Jahr: 1 W × 8.760 h. */
const KWH_PER_STANDBY_WATT = 8.76;

/** Brennstoff je gefahrenem Kilometer im Verbrenner, kWh (6,8 l/100 km). */
export const FUEL_KWH_PER_LITER = 9.7;

/**
 * Vergleichsanker, nicht Zielwert — und ausdrücklich nur für die Bereiche, die
 * dieser Check abfragt.
 *
 * Der volle italienische Pro-Kopf-Fußabdruck liegt bei rund 7.000 kg CO₂e und
 * 78.000 Litern Haushaltswasser. Der Check erfasst davon nicht alles: keine
 * Konsumgüter, keinen Wohnungsbau, keine Waschmaschine, keinen Geschirrspüler.
 * Gegen den Gesamtwert zu vergleichen ließe jeden Nutzer besser dastehen als er
 * ist, deshalb steht hier der Durchschnitt für den erfassten Ausschnitt.
 */
export const referenceValues: AnnualValues = {
  co2Kg: 5200,
  waterL: 55000,
  energyKwh: 11000
};

/** Die vollen Durchschnittswerte, für die Einordnung in der Bilanz. */
export const fullFootprintNote =
  "Der gesamte Pro-Kopf-Fußabdruck in Italien liegt bei rund 7 t CO₂e im Jahr. Dieser Check deckt davon die Bereiche Wohnen, Ernährung und Mobilität ab.";

/** Pariskompatibles Ziel pro Person und Jahr, zum Einordnen der CO₂-Zahl. */
export const co2TargetKg = 1500;

export const metrics: {
  id: MetricId;
  key: keyof AnnualValues;
  label: string;
  short: string;
  unit: string;
  scopeNote: string;
}[] = [
  {
    id: "co2",
    key: "co2Kg",
    label: "CO₂-Fußabdruck",
    short: "CO₂",
    unit: "kg/Jahr",
    scopeNote: "Einschließlich Vorkette aus Herstellung, Transport und Entsorgung."
  },
  {
    id: "water",
    key: "waterL",
    label: "Trinkwasser",
    short: "Wasser",
    unit: "Liter/Jahr",
    scopeNote: "Nur direkt verbrauchtes Leitungswasser, ohne virtuelles Wasser aus Produkten."
  },
  {
    id: "energy",
    key: "energyKwh",
    label: "Endenergie",
    short: "Energie",
    unit: "kWh/Jahr",
    scopeNote: "Strom, Wärme und Kraftstoff, die du selbst verbrauchst. Ohne graue Energie."
  }
];

export const emptyValues: AnnualValues = { co2Kg: 0, waterL: 0, energyKwh: 0 };

export const addValues = (a: AnnualValues, b: AnnualValues): AnnualValues => ({
  co2Kg: a.co2Kg + b.co2Kg,
  waterL: a.waterL + b.waterL,
  energyKwh: a.energyKwh + b.energyKwh
});

export const hasValues = (values: AnnualValues) =>
  values.co2Kg > 0 || values.waterL > 0 || values.energyKwh > 0;

// ---------------------------------------------------------------------------
// Beitrag je Frage
// ---------------------------------------------------------------------------

type ContributionInput = {
  option: TourOption;
  /** Menge aus dem Regler, bereits mit dem Vorgabewert der Option aufgefüllt. */
  quantity: number;
  /** Zugriff auf die Antwort einer anderen Frage, für gekoppelte Größen. */
  optionOf: (questionId: string) => TourOption | undefined;
};

type Contribution = (input: ContributionInput) => AnnualValues;

const param = (option: TourOption | undefined, name: string, fallback = 0) =>
  option?.params?.[name] ?? fallback;

/**
 * Trinkwasser schlägt immer auch als Energie und CO₂ zu Buche: Förderung,
 * Aufbereitung und Verteilung kosten Strom, bevor der erste Tropfen fließt.
 */
function fromTapWater(liters: number): AnnualValues {
  const energyKwh = liters * WATER_SUPPLY_KWH_PER_LITER;
  return { co2Kg: energyKwh * GRID_CO2_PER_KWH, waterL: liters, energyKwh };
}

/**
 * Womit das Warmwasser erwärmt wird, entscheidet über die Emissionen jeder
 * Dusche. Die Frage im Bad setzt diesen Faktor, deshalb liest ihn die
 * Duschfrage dort aus statt einen Durchschnitt anzunehmen.
 */
function hotWaterCo2PerKwh(optionOf: ContributionInput["optionOf"]) {
  const system = optionOf("bath-water-heating");
  if (!system) return 0.22; // Italienischer Mix, solange nicht geantwortet wurde.
  const efficiency = param(system, "efficiency", 1);
  return param(system, "co2PerKwh", 0.22) / efficiency;
}

const contributions: Record<string, Contribution> = {
  // --- Bad -----------------------------------------------------------------

  /** Duschminuten pro Tag × Durchfluss des Duschkopfs. */
  "bath-shower": ({ option, quantity, optionOf }) => {
    const liters = param(option, "litersPerMinute") * quantity * 365;
    const heatKwh = liters * HOT_WATER_KWH_PER_LITER;
    const water = fromTapWater(liters);
    return addValues(water, {
      co2Kg: heatKwh * hotWaterCo2PerKwh(optionOf),
      waterL: 0,
      energyKwh: heatKwh
    });
  },

  /** Warmwasser außerhalb der Dusche, bewertet mit dem gewählten System. */
  "bath-water-heating": ({ option }) => {
    const heatKwh = OTHER_HOT_WATER_LITERS * HOT_WATER_KWH_PER_LITER;
    const efficiency = param(option, "efficiency", 1);
    const usedKwh = heatKwh / efficiency;
    const water = fromTapWater(OTHER_HOT_WATER_LITERS);
    return addValues(water, {
      co2Kg: usedKwh * param(option, "co2PerKwh", 0.22),
      waterL: 0,
      energyKwh: usedKwh
    });
  },

  /** Spülungen pro Tag × Spülmenge. */
  "bath-toilet": ({ option, quantity }) =>
    fromTapWater(param(option, "litersPerFlush") * quantity * 365),

  // --- Schlafen ------------------------------------------------------------

  /** Zieltemperatur gegen den Bedarf bei 20 °C, 6 % je Kelvin. */
  "bedroom-heating": ({ quantity }) => {
    const heatKwh = Math.max(0, HEAT_DEMAND_AT_20C * (1 + HEAT_PER_KELVIN * (quantity - 20)));
    return { co2Kg: heatKwh * HEAT_CO2_PER_KWH, waterL: 0, energyKwh: heatKwh };
  },

  /**
   * Kleidungsstücke pro Jahr. Nur CO₂: die rund 2.700 Liter hinter einem
   * Baumwoll-Shirt sind virtuelles Wasser und gehören nicht in den Wasserzähler.
   */
  "bedroom-textiles": ({ option, quantity }) => ({
    co2Kg: param(option, "co2PerItem") * quantity,
    waterL: 0,
    energyKwh: 0
  }),

  /** Geräte im Dauerbetrieb × mittlere Standby-Leistung. */
  "bedroom-standby": ({ option, quantity }) => {
    const kwh = param(option, "standbyWatts") * quantity * KWH_PER_STANDBY_WATT;
    return { co2Kg: kwh * GRID_CO2_PER_KWH, waterL: 0, energyKwh: kwh };
  },

  // --- Wohnen --------------------------------------------------------------

  /** Bildschirmstunden pro Tag × Gerät und Streaming-Infrastruktur. */
  "living-tv-streaming": ({ option, quantity }) => {
    const kwh = param(option, "kwhPerHour") * quantity * 365;
    return { co2Kg: kwh * GRID_CO2_PER_KWH, waterL: 0, energyKwh: kwh };
  },

  /** Leuchtstellen × Leistung, gerechnet mit drei Brennstunden am Tag. */
  "living-lighting": ({ option, quantity }) => {
    const kwh = (param(option, "wattsPerLamp") * quantity * 3 * 365) / 1000;
    return { co2Kg: kwh * GRID_CO2_PER_KWH, waterL: 0, energyKwh: kwh };
  },

  /** Zimmerpflanzen wirken auf Wohlbefinden und Naturverbindung, nicht auf die Bilanz. */
  "living-plants": () => emptyValues,

  // --- Küche ---------------------------------------------------------------

  /** Fleischmahlzeiten pro Woche über dem pflanzlichen Sockel. */
  "kitchen-diet": ({ quantity }) => ({
    co2Kg: DIET_BASE_CO2 + quantity * DIET_CO2_PER_WEEKLY_MEAT_MEAL,
    waterL: 0,
    energyKwh: 0
  }),

  /** Anteil regional und saisonal in Prozent, gegen den vollen Importaufschlag. */
  "kitchen-origin": ({ quantity }) => ({
    co2Kg: FOOD_ORIGIN_MAX_CO2 * (1 - Math.min(100, Math.max(0, quantity)) / 100),
    waterL: 0,
    energyKwh: 0
  }),

  /** Weggeworfene Lebensmittel je Woche, bewertet mit ihrer vollen Vorkette. */
  "kitchen-waste": ({ quantity }) => ({
    co2Kg: quantity * 52 * FOOD_WASTE_CO2_PER_KG,
    waterL: 0,
    energyKwh: 0
  }),

  // --- Mobilität -----------------------------------------------------------

  /** Kurzstrecken je Woche, mit dem Emissionsfaktor des gewählten Verkehrsmittels. */
  "mobility-short": ({ option, quantity }) => {
    const km = quantity * 52;
    return {
      co2Kg: km * param(option, "co2PerKm"),
      waterL: 0,
      energyKwh: km * param(option, "kwhPerKm")
    };
  },

  /** Übrige Auto-Kilometer im Jahr, mit dem Faktor des Fahrzeugtyps. */
  "mobility-km": ({ option, quantity }) => ({
    co2Kg: quantity * param(option, "co2PerKm"),
    waterL: 0,
    energyKwh: quantity * param(option, "kwhPerKm")
  }),

  /** Fernreise-Kilometer im Jahr, mit dem Faktor des gewählten Verkehrsmittels. */
  "mobility-long": ({ option, quantity }) => ({
    co2Kg: quantity * param(option, "co2PerKm"),
    waterL: 0,
    energyKwh: quantity * param(option, "kwhPerKm")
  }),

  // --- Garten --------------------------------------------------------------

  /**
   * Bewässerte Fläche × Wasserbedarf der Gestaltung. Schotter braucht kein
   * Wasser und schneidet hier am besten ab — und bei der Biodiversität am
   * schlechtesten. Genau diese Spannung soll die Bilanz zeigen.
   */
  "garden-ground": ({ option, quantity }) =>
    fromTapWater(param(option, "irrigationLitersPerSqm") * quantity),

  "garden-plants": () => emptyValues,
  "garden-structures": () => emptyValues
};

// ---------------------------------------------------------------------------
// Öffentliche Berechnung
// ---------------------------------------------------------------------------

const questionIndex = new Map<string, TourQuestion>();
for (const room of availableRooms) {
  for (const question of room.questions) questionIndex.set(question.id, question);
}

/** Menge, mit der eine Frage rechnet: Reglerwert, sonst Vorgabe der Option. */
export function quantityFor(
  question: TourQuestion,
  optionId: string,
  adjustments: Record<string, number>
) {
  if (!question.adjust) return 0;
  const stored = adjustments[question.id];
  if (typeof stored === "number" && Number.isFinite(stored)) return stored;
  return question.adjust.defaults[optionId] ?? question.adjust.min;
}

/** Ob der Nutzer den Regler dieser Frage selbst verstellt hat. */
export const isAdjusted = (questionId: string, adjustments: Record<string, number>) =>
  typeof adjustments[questionId] === "number";

/**
 * Was eine Option zur Jahresbilanz beiträgt — im Zusammenhang der übrigen
 * Antworten, damit gekoppelte Größen wie das Warmwassersystem durchschlagen.
 */
export function optionValues(
  questionId: string,
  optionId: string,
  answers: Record<string, string>,
  adjustments: Record<string, number>
): AnnualValues {
  const question = questionIndex.get(questionId);
  const contribution = contributions[questionId];
  if (!question || !contribution) return emptyValues;
  const option = question.options.find((item) => item.id === optionId);
  if (!option) return emptyValues;

  const optionOf = (otherId: string) => {
    const other = questionIndex.get(otherId);
    const answeredId = otherId === questionId ? optionId : answers[otherId];
    return other?.options.find((item) => item.id === answeredId);
  };

  return contribution({
    option,
    quantity: quantityFor(question, optionId, adjustments),
    optionOf
  });
}

/** Jahresbilanz aus allen beantworteten Fragen. */
export function totalValues(
  answers: Record<string, string>,
  adjustments: Record<string, number>
): AnnualValues {
  let total = emptyValues;
  for (const [questionId, optionId] of Object.entries(answers)) {
    total = addValues(total, optionValues(questionId, optionId, answers, adjustments));
  }
  return total;
}

/**
 * Was die beste verfügbare Antwort auf diese Frage einsparen würde. Der Regler
 * bleibt dabei stehen, sonst würde die Ersparnis eine Verhaltensänderung
 * enthalten, nach der niemand gefragt hat.
 */
export function bestCaseSaving(
  questionId: string,
  answers: Record<string, string>,
  adjustments: Record<string, number>
): AnnualValues {
  const question = questionIndex.get(questionId);
  const current = answers[questionId];
  if (!question || !current) return emptyValues;

  const currentValues = optionValues(questionId, current, answers, adjustments);
  const optionResults = question.options.map((option) =>
    optionValues(questionId, option.id, answers, adjustments)
  );
  return bestCaseSavingFromValues(currentValues, optionResults);
}

// ---------------------------------------------------------------------------
// Darstellung
// ---------------------------------------------------------------------------

/**
 * Feste Nachkommastellen, nicht „höchstens“. In einer Optionsliste stünden
 * sonst 2,64 t über 1,4 t über 0,5 t und die Spalte ließe sich nicht auf einen
 * Blick vergleichen.
 */
const deFormatters = new Map<number, Intl.NumberFormat>();
const de = (digits = 0) => {
  let formatter = deFormatters.get(digits);
  if (!formatter) {
    formatter = new Intl.NumberFormat("de-DE", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits
    });
    deFormatters.set(digits, formatter);
  }
  return formatter;
};

/** Ersparnis des CO₂-ärmsten Ergebnisses, wenn Optionswerte bereits berechnet sind. */
export function bestCaseSavingFromValues(
  currentValues: AnnualValues,
  optionResults: readonly AnnualValues[]
): AnnualValues {
  let best = currentValues;
  for (const candidate of optionResults) {
    if (candidate.co2Kg < best.co2Kg) best = candidate;
  }
  return {
    co2Kg: Math.max(0, currentValues.co2Kg - best.co2Kg),
    waterL: Math.max(0, currentValues.waterL - best.waterL),
    energyKwh: Math.max(0, currentValues.energyKwh - best.energyKwh)
  };
}

/**
 * Zahlen so runden, wie die Genauigkeit es hergibt. Die Faktoren tragen keine
 * vier signifikanten Stellen, also zeigt die Bilanz auch keine.
 *
 * `scaleValue` bestimmt die Einheit, nicht der Wert selbst. Sonst stünde in
 * einer Optionsliste „16,4 m³“ über „6.390 L“ und wäre nicht vergleichbar —
 * die Einheit muss über alle Zeilen einer Frage dieselbe sein.
 */
export function formatMetric(
  metric: MetricId,
  value: number,
  scaleValue = value
): { value: string; unit: string; isZero: boolean } {
  const done = (text: string, unit: string, rounded: number) => ({
    value: text,
    unit,
    isZero: rounded === 0
  });

  if (metric === "water") {
    if (scaleValue >= 10000) {
      const rounded = Math.round(value / 100) / 10;
      return done(de(1).format(rounded), "m³", rounded);
    }
    const rounded = Math.round(value / 10) * 10;
    return done(de().format(rounded), "L", rounded);
  }
  if (metric === "energy") {
    if (scaleValue >= 10000) {
      const rounded = Math.round(value / 100) / 10;
      return done(de(1).format(rounded), "MWh", rounded);
    }
    const rounded = Math.round(value / 5) * 5;
    return done(de().format(rounded), "kWh", rounded);
  }
  if (scaleValue >= 1000) {
    const rounded = Math.round(value / 100) / 10;
    return done(de(1).format(rounded), "t", rounded);
  }
  const rounded = Math.round(value);
  return done(de().format(rounded), "kg", rounded);
}

/**
 * Kompakte Zeile für die Optionsliste, etwa „820 kg · 3.400 kWh“.
 * `scale` sind die größten Werte der Frage, damit alle Zeilen dieselbe Einheit
 * tragen. Kennzahlen, die auf null runden, fallen weg — „0 kWh“ ist Rauschen.
 */
export function summarizeValues(values: AnnualValues, scale: AnnualValues = values): string {
  const parts: string[] = [];
  for (const metric of metrics) {
    if (values[metric.key] <= 0) continue;
    const formatted = formatMetric(metric.id, values[metric.key], scale[metric.key]);
    if (formatted.isZero) continue;
    parts.push(`${formatted.value} ${formatted.unit}`);
  }
  return parts.join(" · ");
}

// ---------------------------------------------------------------------------
// Rechenweg je Frage
// ---------------------------------------------------------------------------

const num = (value: number, digits = 0) => de(digits).format(value);

/**
 * Der Rechenweg einer Frage in einem Satz: welcher Faktor greift, welche
 * Annahme steckt dahinter. Bis hierher rechnete die Tour sichtbar, aber
 * unbelegt — die Faktoren standen ausschließlich in `docs/BILANZ-FAKTOREN.md`
 * und tauchten in der Oberfläche nirgends auf.
 *
 * Die Zahlen stammen aus denselben Konstanten, mit denen der Rechner arbeitet.
 * Ein Faktor, der im Text von seinem Code abweicht, wäre schlimmer als gar
 * keine Angabe. Die vollständige Herleitung samt Vorbehalten steht in
 * `docs/BILANZ-FAKTOREN.md`; diese Fassung ist eine belastbare erste Fassung,
 * keine geprüfte Ökobilanz.
 */
export const questionBasis: Record<string, { factor: string; assumption?: string }> = {
  "bath-shower": {
    factor: `Duschminuten am Tag × Durchfluss × 365. Das Aufheizen kostet ${num(HOT_WATER_KWH_PER_LITER, 4)} kWh je Liter (12 °C auf 38 °C).`,
    assumption:
      "Womit erwärmt wird, kommt aus deiner Antwort zum Warmwassersystem — deshalb ändern sich diese Zahlen, sobald du sie beantwortest."
  },
  "bath-water-heating": {
    factor: `${num(OTHER_HOT_WATER_LITERS)} Liter Warmwasser außerhalb der Dusche im Jahr, geteilt durch den Wirkungsgrad des Systems.`,
    assumption: "Hände waschen, Spülen, Putzen — als Pauschale, nicht abgefragt."
  },
  "bath-toilet": {
    factor: `Spülungen am Tag × Spülmenge × 365. Jeder Liter Trinkwasser kostet zusätzlich ${num(WATER_SUPPLY_KWH_PER_LITER, 4)} kWh für Förderung, Aufbereitung und Verteilung.`
  },
  "bedroom-heating": {
    factor: `${num(HEAT_DEMAND_AT_20C)} kWh Raumwärme je Person bei 20 °C, je Grad rund ${num(HEAT_PER_KELVIN * 100)} % mehr oder weniger. Wärmemix Südtirol: ${num(HEAT_CO2_PER_KWH, 2)} kg CO₂e/kWh.`,
    assumption:
      "Die 6-Prozent-Regel ist eine Faustregel und gilt nur in engem Bereich. Der Wärmemix hat einen hohen Biomasse-Anteil und wäre für andere Regionen zu niedrig."
  },
  "bedroom-textiles": {
    factor:
      "Kleidungsstücke im Jahr × CO₂ je Stück, gemittelt über Kleidungsarten (Neuware, gemischt, Secondhand).",
    assumption:
      "Nur CO₂: die rund 2.700 Liter hinter einem Baumwollshirt sind virtuelles Wasser und zählen im Wasserwert bewusst nicht mit."
  },
  "bedroom-standby": {
    factor: `Geräte im Dauerbetrieb × Standby-Leistung × ${num(KWH_PER_STANDBY_WATT, 2)} kWh je Watt und Jahr (1 W × 8.760 h), Strommix ${num(GRID_CO2_PER_KWH, 2)} kg CO₂e/kWh.`
  },
  "living-tv-streaming": {
    factor: `Bildschirmstunden am Tag × Leistung von Gerät und Streaming × 365, Strommix ${num(GRID_CO2_PER_KWH, 2)} kg CO₂e/kWh.`
  },
  "living-lighting": {
    factor: "Leuchtstellen × Leistung × 3 Brennstunden am Tag × 365.",
    assumption: "Drei Brennstunden sind ein Jahresmittel über helle und dunkle Monate."
  },
  "living-plants": {
    factor: "Ohne Beitrag zu CO₂, Wasser und Energie.",
    assumption:
      "Zimmerpflanzen wirken auf Wohlbefinden und Naturverbindung. Das lässt sich nicht in Kilogramm fassen, deshalb steht es im Wirkungsprofil statt in der Jahresbilanz."
  },
  "kitchen-diet": {
    factor: `Sockel ${num(DIET_BASE_CO2)} kg CO₂e für überwiegend pflanzliche Kost, dazu ${num(DIET_CO2_PER_WEEKLY_MEAT_MEAL)} kg je Fleischmahlzeit pro Woche und Jahr.`,
    assumption:
      "Mittelwert über Fleischarten. Rind liegt deutlich darüber, Geflügel darunter — eine Rindsmahlzeit wiegt hier also zu leicht."
  },
  "kitchen-origin": {
    factor: `Bis zu ${num(FOOD_ORIGIN_MAX_CO2)} kg CO₂e Aufschlag für importierte und außersaisonale Ware, anteilig zu deinem regionalen Anteil.`,
    assumption: "Transport, Kühlkette und beheizte Gewächshäuser zusammengefasst."
  },
  "kitchen-waste": {
    factor: `Weggeworfene Kilogramm je Woche × 52 × ${num(FOOD_WASTE_CO2_PER_KG, 1)} kg CO₂e je Kilogramm.`,
    assumption:
      "Bewertet mit der vollen Vorkette des weggeworfenen Produkts: Anbau, Transport und Kühlung sind bereits passiert."
  },
  "mobility-short": {
    factor: "Kurzstrecken je Woche × 52 × Faktor des Verkehrsmittels.",
    assumption: "Das Auto trägt hier einen Aufschlag für den Kaltstart."
  },
  "mobility-km": {
    factor: `Jahreskilometer × Faktor des Fahrzeugtyps, Well-to-Wheel. Verbrenner: ${num(FUEL_KWH_PER_LITER, 1)} kWh je Liter Kraftstoff.`,
    assumption: "Durchschnittsflotte mit 6,8 l/100 km; ein eigenes Fahrzeug kann deutlich abweichen."
  },
  "mobility-long": {
    factor: "Fernreise-Kilometer × Faktor des Verkehrsmittels.",
    assumption:
      "Für Flüge zählt hier nur CO₂. Mit den Effekten in großer Höhe liegt die Klimawirkung etwa doppelt so hoch — bewusst konservativ gesetzt."
  },
  "garden-ground": {
    factor:
      "Bewässerte Fläche × Wasserbedarf der Gestaltung: Rasen rund 150, naturnahes Beet rund 30 Liter je Quadratmeter und Jahr.",
    assumption:
      "Angesetzt für einen trockenen Südtiroler Sommer. Schotter braucht kein Wasser und schneidet in der Jahresbilanz deshalb am besten ab — bei der Biodiversität am schlechtesten."
  },
  "garden-plants": {
    factor: "Ohne Beitrag zu CO₂, Wasser und Energie.",
    assumption:
      "Die Wirkung liegt bei Lebensräumen und Artenvielfalt und steht deshalb im Wirkungsprofil, nicht in der Jahresbilanz."
  },
  "garden-structures": {
    factor: "Ohne Beitrag zu CO₂, Wasser und Energie.",
    assumption:
      "Nisthilfen, Totholz und Wasserstellen schaffen Lebensraum. Das zeigt das Wirkungsprofil, nicht die Jahresbilanz."
  }
};
