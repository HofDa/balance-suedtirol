import type { LandmarkKey } from "../model/everyday";
import type { Localized } from "../../../lib/i18n";
import { localeTags } from "../../../lib/i18n";
import {
  DIET_BASE_CO2,
  DIET_CO2_PER_WEEKLY_MEAT_MEAL,
  FOOD_ORIGIN_MAX_CO2,
  FOOD_WASTE_CO2_PER_KG,
  FUEL_KWH_PER_LITER,
  GAS_KWH_PER_SMC,
  GRID_CO2_PER_KWH,
  HEATING_OIL_KWH_PER_LITER,
  HOT_WATER_KWH_PER_LITER,
  KWH_PER_STANDBY_WATT,
  OTHER_HOT_WATER_LITERS,
  SOUTH_TYROL_HOUSEHOLD_KWH_PER_PERSON,
  WATER_SUPPLY_KWH_PER_LITER,
  questionBasis
} from "../model/calculator";
import type { MetricId, ScoreDimension } from "../model/types";

/**
 * Alle Oberflächentexte der Tour in drei Sprachen. Funktionen statt
 * Platzhaltern, weil Wortstellung und Mehrzahl je Sprache anders laufen.
 * Fett gesetzte Teile kommen als `{ b: … }`, damit die Komponente sie
 * auszeichnen kann, ohne Sätze zu zerschneiden.
 */
export type Rich = Array<string | { b: string }>;
type Basis = Record<string, { factor: string; assumption?: string }>;

export type TourUi = {
  toolbar: {
    logo: string;
    home: string;
    results: string;
    resultsTitle: string;
    resultsDisabledTitle: string;
    resultsAria: (done: number, total: number) => string;
    resultsDisabledAria: (total: number) => string;
    reset: string;
    resetConfirm: string;
    pointsAria: (points: number) => string;
  };
  panelRegion: string;
  intro: {
    headline: string;
    lead: string;
    loop: { title: string; copy: string }[];
    loopAria: string;
    honesty: string;
    start: string;
    resumeTitle: string;
    doneTitle: string;
    foundOf: (found: number, total: number) => string;
    foundAria: (found: number, total: number) => string;
    continueRoom: (room: string) => string;
    toResults: string;
    results: string;
  };
  house: {
    explored: (handled: number, total: number) => string;
    visitAria: (room: string, handled: number, total: number) => string;
    roomsNav: string;
  };
  scene: {
    objectsNav: string;
    roomAria: (title: string) => string;
    visualization: (room: string) => string;
    openObject: (label: string, state: "answered" | "skipped" | "open") => string;
    state: { answered: string; skipped: string; open: string };
    desktopState: { answered: string; skipped: string; active: string; open: string };
    tapHint: string;
    chooseObject: string;
  };
  roomNav: { label: string; toHouse: string; roomAria: (title: string, handled: number, total: number) => string };
  progressObjects: string;
  panel: {
    back: string;
    skip: string;
    discover: (label: string) => string;
    objectOf: (room: string, index: number, total: number) => string;
    openObject: (label: string) => string;
    keys: { keys: string; choose: string; next: string };
    southTyrol: string;
  };
  answerHint: string;
  points: (n: number) => string;
  pointsShort: string;
  folder: string;
  folderCount: (read: number, total: number) => string;
  folderCardAria: (label: string, state: "read" | "new" | "locked") => string;
  card: {
    open: string;
    close: string;
    yourValues: string;
    perYear: string;
    calculation: string;
    tip: string;
    source: string;
    method: string;
  };
  continue: string;
  finishRoom: string;
  adjust: { reset: string; less: (label: string) => string; more: (label: string) => string; setTo: (value: string) => string };
  /** Vergleichsgrößen unter großen Reglern; `n` ist schon formatiert. */
  landmarks: Record<LandmarkKey, (n: string, one: boolean) => string>;
  /** Heizung in der Einheit der Rechnung, Strom gegen den Südtiroler Durchschnitt. */
  bill: { gas: (n: string) => string; oil: (n: string) => string; electricity: (n: string) => string };
  /** Wovon ein Gegenstand handelt, für Ranglisten: „Autofahrten“ statt „Jahreswege ansehen“. */
  topics: Record<string, string>;
  presets: string;
  /** Die Schritte eines Gegenstands: Art, Menge, Ergebnis. */
  steps: {
    kind: string;
    amount: string;
    result: string;
    of: (index: number, total: number) => string;
    yourAnswer: string;
    edit: string;
  };
  mealWeek: {
    days: string[];
    meals: string[];
    prompt: string;
    cell: (day: string, meal: string, meat: boolean) => string;
  };
  units: {
    bathtubs: (n: number) => string;
    carKm: string;
    co2Kg: string;
    co2T: string;
  };
  everyday: {
    bathtubs: (n: string) => string;
    bucketOne: string;
    buckets: (n: string) => string;
    romeTrips: (n: string) => string;
    carKm: (n: string) => string;
    tonnes: (n: string) => string;
    kilos: (n: string) => string;
    water: (head: string) => string;
    co2: (head: string) => string;
    plain: (head: string) => string;
    heating: (second: string) => string;
    saving: (less: string) => string;
    natureStrong: string;
    natureSome: string;
    natureNone: string;
    thrifty: string;
    room: string;
    none: string;
  };
  roomComplete: {
    title: (room: string) => string;
    skipped: string;
    cardRead: string;
    cardUnread: string;
    toResults: string;
    next: (room: string) => string;
    nextFallback: string;
    viewHouse: string;
  };
  results: {
    yearTitle: string;
    yearInterim: (found: number, total: number) => string;
    yearWater: string;
    waterExact: (liters: string) => string;
    yearCo2: string;
    co2Compare: (phrase: string) => string;
    topTitle: string;
    topLead: string;
    topRowAria: (label: string, value: string, percent: number) => string;
    summary: (p: { points: number; cards: number; total: number }) => Rich;
    openFolder: string;
    continueRoom: (room: string) => string;
    stillOpen: (rooms: string) => string;
    whatIfTitle: string;
    whatIfLead: string;
    whatIfHint: string;
    withLevers: (n: number) => string;
    bathtubs: string;
    water: string;
    and: string;
    perYear: string;
    climate: string;
    noLevers: string;
    instead: (label: string) => string;
    perYearShort: string;
    tryIt: string;
    goal: string;
    markGoal: string;
    maxGoals: (n: number) => string;
    captionNow: string;
    captionTried: string;
    goalsTitle: string;
    themeTitle: string;
    goalsLead: string;
    noGoalsLead: (n: number, reason: string) => string;
    whyNot: string;
    viewProject: string;
    exactTitle: string;
    exactEmpty: string;
    noAnswers: string;
    complete: (percent: number) => string;
    partial: string;
    answered: (answered: number, total: number) => Rich;
    calculated: string;
    calculatedSub: string;
    referenceNote: string;
    allFactors: string;
    estimated: string;
    estimatedSub: string;
    of100: string;
    indexNote: string;
    modelComparison: string;
    percentOfModel: (percent: number) => string;
    toHouse: string;
  };
  themes: { water: string; biodiversity: string; carbon: string };
  reasons: Record<ScoreDimension, string>;
  dimensions: Record<ScoreDimension, string>;
  metrics: Record<MetricId, { label: string; short: string; unit: string; scopeNote: string }>;
  fullFootprintNote: string;
  basis: Basis;
};

const num = (locale: keyof typeof localeTags, value: number, digits = 0) =>
  new Intl.NumberFormat(localeTags[locale], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);

const itBasis: Basis = {
  "bath-shower": {
    factor: `Canzoni per doccia × 3 minuti × portata × 365. Scaldare l’acqua costa ${num("it", HOT_WATER_KWH_PER_LITER, 4)} kWh al litro (da 12 °C a 38 °C).`,
    assumption: "Con cosa si scalda l’acqua lo dice la tua risposta sul sistema dell’acqua calda — per questo questi valori cambiano quando rispondi."
  },
  "bath-water-heating": {
    factor: `${num("it", OTHER_HOT_WATER_LITERS)} litri d’acqua calda all’anno fuori dalla doccia, divisi per il rendimento del sistema.`,
    assumption: "Lavarsi le mani, lavare i piatti, pulire — come forfait, non chiesto."
  },
  "bath-toilet": {
    factor: `Scarichi al giorno × litri per scarico × 365. Ogni litro d’acqua potabile costa in più ${num("it", WATER_SUPPLY_KWH_PER_LITER, 4)} kWh per captazione, trattamento e distribuzione.`
  },
  "bedroom-heating": {
    factor: "La tua quota del consumo annuo in bolletta × fattore del sistema di riscaldamento scelto.",
    assumption: `Dividi prima i consumi comuni per il numero di persone in casa. Il valore della bolletta è più affidabile di una stima forfettaria dell’edificio. Conversione: 1 Smc di metano ≈ ${num("it", GAS_KWH_PER_SMC, 1)} kWh (ARERA), 1 litro di gasolio da riscaldamento ≈ ${num("it", HEATING_OIL_KWH_PER_LITER, 0)} kWh (ISPRA).`
  },
  "bedroom-textiles": {
    factor: "Capi all’anno × CO₂ per capo, in media sui tipi di abbigliamento (nuovo, misto, usato).",
    assumption: "Solo CO₂: i circa 2.700 litri dietro una maglietta di cotone sono acqua virtuale e di proposito non contano nel valore dell’acqua."
  },
  "bedroom-standby": {
    factor: "Nessuna quantità di energia in più: lo standby è già compreso nell’elettricità domestica indicata.",
    assumption: `Per orientarsi: 1 watt di carico continuo corrisponde a ${num("it", KWH_PER_STANDBY_WATT, 2)} kWh all’anno.`
  },
  "living-tv-streaming": {
    factor: `Elettricità domestica personale all’anno × fattore di produzione italiano ${num("it", GRID_CO2_PER_KWH, 3)} kg CO₂/kWh.`,
    assumption: `Dividi il consumo della bolletta per il numero di persone; togli l’elettricità della pompa di calore indicata a parte. Per confronto: in Alto Adige le famiglie consumano circa ${num("it", Math.round(SOUTH_TYROL_HOUSEHOLD_KWH_PER_PERSON / 10) * 10, 0)} kWh a persona (Terna 2024, ASTAT).`
  },
  "living-lighting": {
    factor: "Nessuna quantità di energia in più: l’illuminazione è già compresa nell’elettricità domestica indicata.",
    assumption: "La risposta influisce solo sul profilo qualitativo delle risorse ed evita un doppio conteggio."
  },
  "living-plants": {
    factor: "Nessun contributo a CO₂, acqua ed energia.",
    assumption: "Le piante d’appartamento agiscono su benessere e legame con la natura. Non si può esprimere in chilogrammi, per questo sta nel profilo d’impatto e non nel bilancio annuo."
  },
  "kitchen-diet": {
    factor: `Base di ${num("it", DIET_BASE_CO2)} kg CO₂e per un’alimentazione prevalentemente vegetale, più ${num("it", DIET_CO2_PER_WEEKLY_MEAT_MEAL)} kg per ogni pasto di carne alla settimana per un anno.`,
    assumption: "Media sui tipi di carne. Il manzo è ben sopra, il pollame sotto — un pasto di manzo qui pesa quindi troppo poco."
  },
  "kitchen-origin": {
    factor: `Fino a ${num("it", FOOD_ORIGIN_MAX_CO2)} kg CO₂e di supplemento per merce importata e fuori stagione, in proporzione alla tua quota locale.`,
    assumption: "Trasporto, catena del freddo e serre riscaldate riuniti."
  },
  "kitchen-waste": {
    factor: `Porzioni buttate a settimana × 0,4 kg × 52 × ${num("it", FOOD_WASTE_CO2_PER_KG, 1)} kg CO₂e per chilo.`,
    assumption: "Valutato con l’intera filiera del prodotto buttato: coltivazione, trasporto e refrigerazione sono già avvenuti."
  },
  "mobility-short": {
    factor: "Chilometri brevi a settimana × 52 × fattore del mezzo.",
    assumption: "L’auto porta qui un supplemento per l’avviamento a freddo."
  },
  "mobility-km": {
    factor: `Chilometri all’anno × fattore del tipo di veicolo, well-to-wheel. Motori a combustione: ${num("it", FUEL_KWH_PER_LITER, 1)} kWh per litro di carburante.`,
    assumption: "Parco medio con 6,8 l/100 km; un veicolo proprio può discostarsi molto."
  },
  "mobility-long": {
    factor: "Chilometri di viaggio × fattore del mezzo.",
    assumption: "Il fattore aereo è un valore d’impatto CO₂e forfettario, compreso un supplemento per gli effetti non-CO₂; i singoli voli possono discostarsi molto."
  },
  "garden-ground": {
    factor: "Superficie irrigata × fabbisogno d’acqua della sistemazione: prato circa 150, aiuola naturale circa 30 litri per metro quadrato all’anno.",
    assumption: "Valori per un’estate secca in Alto Adige. La ghiaia non ha bisogno d’acqua e nel bilancio annuo risulta quindi la migliore — per la biodiversità la peggiore."
  },
  "garden-plants": {
    factor: "Nessun contributo a CO₂, acqua ed energia.",
    assumption: "L’effetto riguarda habitat e biodiversità e sta quindi nel profilo d’impatto, non nel bilancio annuo."
  },
  "garden-structures": {
    factor: "Nessun contributo a CO₂, acqua ed energia.",
    assumption: "Nidi artificiali, legno morto e punti d’acqua creano habitat. Lo mostra il profilo d’impatto, non il bilancio annuo."
  }
};

const enBasis: Basis = {
  "bath-shower": {
    factor: `Songs per shower × 3 minutes × flow × 365. Heating costs ${num("en", HOT_WATER_KWH_PER_LITER, 4)} kWh per litre (12 °C to 38 °C).`,
    assumption: "What heats the water comes from your answer on the hot-water system — that’s why these figures change once you answer it."
  },
  "bath-water-heating": {
    factor: `${num("en", OTHER_HOT_WATER_LITERS)} litres of hot water outside the shower per year, divided by the system’s efficiency.`,
    assumption: "Washing hands, washing up, cleaning — as a flat rate, not asked."
  },
  "bath-toilet": {
    factor: `Flushes per day × litres per flush × 365. Every litre of drinking water also costs ${num("en", WATER_SUPPLY_KWH_PER_LITER, 4)} kWh for extraction, treatment and distribution.`
  },
  "bedroom-heating": {
    factor: "Your share of the billed annual consumption × factor of the chosen heating system.",
    assumption: `Divide shared consumption by the number of household members first. The bill value is more reliable than a flat building estimate. Conversion: 1 Smc of natural gas ≈ ${num("en", GAS_KWH_PER_SMC, 1)} kWh (ARERA), 1 litre of heating oil ≈ ${num("en", HEATING_OIL_KWH_PER_LITER, 0)} kWh (ISPRA).`
  },
  "bedroom-textiles": {
    factor: "Garments per year × CO₂ per item, averaged over types of clothing (new, mixed, second-hand).",
    assumption: "CO₂ only: the roughly 2,700 litres behind a cotton shirt are virtual water and deliberately don’t count in the water value."
  },
  "bedroom-standby": {
    factor: "No additional energy: standby is already part of the household electricity you entered.",
    assumption: `For reference: 1 watt of continuous load equals ${num("en", KWH_PER_STANDBY_WATT, 2)} kWh a year.`
  },
  "living-tv-streaming": {
    factor: `Personal household electricity per year × Italian generation factor of ${num("en", GRID_CO2_PER_KWH, 3)} kg CO₂/kWh.`,
    assumption: `Divide the household consumption from the bill by the number of people; subtract separately entered heat-pump electricity. For comparison: households in South Tyrol use about ${num("en", Math.round(SOUTH_TYROL_HOUSEHOLD_KWH_PER_PERSON / 10) * 10, 0)} kWh per person (Terna 2024, ASTAT).`
  },
  "living-lighting": {
    factor: "No additional energy: lighting is already part of the household electricity you entered.",
    assumption: "The answer only affects the qualitative resource profile and avoids double counting."
  },
  "living-plants": {
    factor: "No contribution to CO₂, water or energy.",
    assumption: "House plants affect well-being and connection with nature. That can’t be put in kilograms, so it sits in the impact profile rather than the annual balance."
  },
  "kitchen-diet": {
    factor: `Base of ${num("en", DIET_BASE_CO2)} kg CO₂e for a mostly plant-based diet, plus ${num("en", DIET_CO2_PER_WEEKLY_MEAT_MEAL)} kg for each weekly meat meal over a year.`,
    assumption: "Averaged over types of meat. Beef is well above, poultry below — so a beef meal weighs too little here."
  },
  "kitchen-origin": {
    factor: `Up to ${num("en", FOOD_ORIGIN_MAX_CO2)} kg CO₂e surcharge for imported and out-of-season goods, in proportion to your local share.`,
    assumption: "Transport, cold chain and heated greenhouses combined."
  },
  "kitchen-waste": {
    factor: `Portions wasted per week × 0.4 kg × 52 × ${num("en", FOOD_WASTE_CO2_PER_KG, 1)} kg CO₂e per kilogram.`,
    assumption: "Rated with the full supply chain of the wasted product: growing, transport and cooling have already happened."
  },
  "mobility-short": {
    factor: "Short-trip kilometres per week × 52 × factor of the mode of transport.",
    assumption: "The car carries a cold-start surcharge here."
  },
  "mobility-km": {
    factor: `Kilometres per year × factor of the vehicle type, well-to-wheel. Combustion engines: ${num("en", FUEL_KWH_PER_LITER, 1)} kWh per litre of fuel.`,
    assumption: "Average fleet at 6.8 l/100 km; your own vehicle may differ considerably."
  },
  "mobility-long": {
    factor: "Long-distance kilometres × factor of the mode of transport.",
    assumption: "The flight factor is a flat CO₂e impact value including a surcharge for non-CO₂ effects; individual flights can differ considerably."
  },
  "garden-ground": {
    factor: "Watered area × water demand of the layout: lawn about 150, natural bed about 30 litres per square metre a year.",
    assumption: "Set for a dry South Tyrolean summer. Gravel needs no water and so comes out best in the annual balance — and worst for biodiversity."
  },
  "garden-plants": {
    factor: "No contribution to CO₂, water or energy.",
    assumption: "The effect lies with habitats and biodiversity, so it appears in the impact profile, not the annual balance."
  },
  "garden-structures": {
    factor: "No contribution to CO₂, water or energy.",
    assumption: "Nest aids, deadwood and water points create habitat. The impact profile shows it, not the annual balance."
  }
};

const de: TourUi = {
  toolbar: {
    logo: "b*alance – zur Startseite",
    home: "Haus",
    results: "Bilanz",
    resultsTitle: "Deine Jahresbilanz ansehen",
    resultsDisabledTitle: "Beantworte ein Objekt, dann wird die Bilanz sichtbar",
    resultsAria: (done, total) => `Bilanz ansehen. ${done} von ${total} Objekten bearbeitet`,
    resultsDisabledAria: (total) => `Bilanz noch nicht verfügbar. Beantworte zuerst ein Objekt von ${total}`,
    reset: "Tour zurücksetzen",
    resetConfirm: "Möchtest du alle Antworten des Lebensraum-Checks zurücksetzen?",
    pointsAria: (points) => `${points} Entdeckerpunkte. Wissensmappe öffnen`
  },
  panelRegion: "Fragen, Werte und Steuerung",
  intro: {
    headline: "Hinter jedem Gegenstand steckt eine Verbindung zur Natur",
    lead: "18 Gegenstände in sechs Räumen, zu jedem eine kurze Runde:",
    loop: [
      { title: "Einstellen", copy: "antippen, Regler schieben — so, wie es bei dir ist" },
      { title: "Sehen", copy: "was das im Jahr ausmacht: Badewannen, Kilometer" },
      { title: "Entdecken", copy: "das Warum dahinter, als Karte für deine Mappe" }
    ],
    loopAria: "Eine Runde",
    honesty: "Es gibt kein Richtig oder Falsch. Punkte gibt es fürs Entdecken — nie für die Antwort selbst.",
    start: "Im Schlafzimmer beginnen",
    resumeTitle: "Weiter, wo du aufgehört hast.",
    doneTitle: "Das ganze Haus ist entdeckt.",
    foundOf: (found, total) => `${found} von ${total} Gegenständen`,
    foundAria: (found, total) => `${found} von ${total} Gegenständen entdeckt`,
    continueRoom: (room) => `Weiter: ${room}`,
    toResults: "Zur Auswertung",
    results: "Auswertung"
  },
  house: {
    explored: (handled, total) => `${handled}/${total} erkundet`,
    visitAria: (room, handled, total) => `${room} besuchen, ${handled} von ${total} Objekten bearbeitet`,
    roomsNav: "Räume im Haus"
  },
  scene: {
    objectsNav: "Gegenstände im Raum",
    roomAria: (title) => `${title}: Objekte entdecken`,
    visualization: (room) => `Visualisierung für ${room}`,
    openObject: (label, state) => `${label} öffnen${state === "answered" ? ", beantwortet" : state === "skipped" ? ", übersprungen" : ""}`,
    state: { answered: "beantwortet", skipped: "übersprungen", open: "offen" },
    desktopState: { answered: "Beantwortet · ändern", skipped: "Übersprungen · nachholen", active: "Jetzt entdecken", open: "Noch offen" },
    tapHint: "antippen & entdecken",
    chooseObject: "Wähle einen Gegenstand"
  },
  roomNav: {
    label: "Räume",
    toHouse: "Zur Hausübersicht",
    roomAria: (title, handled, total) => `${title}, ${handled} von ${total} Objekten bearbeitet`
  },
  progressObjects: "Gegenstände",
  panel: {
    back: "Zurück",
    skip: "Überspringen",
    discover: (label) => `Entdecke: ${label}`,
    objectOf: (room, index, total) => `${room} · Gegenstand ${index} von ${total}`,
    openObject: (label) => `${label} öffnen`,
    keys: { keys: "Tasten", choose: "wählen,", next: "weiter" },
    southTyrol: "Südtirol-Durchschnitt"
  },
  answerHint: "Es gibt hier kein Richtig oder Falsch. Punkte gibt es fürs Entdecken, nicht für die Antwort.",
  points: (n) => `${n} Entdeckerpunkte`,
  pointsShort: "Punkte",
  folder: "Wissensmappe",
  folderCount: (read, total) => `${read} von ${total} Karten`,
  folderCardAria: (label, state) => `${label}, ${state === "read" ? "gelesen" : state === "new" ? "neu" : "noch nicht entdeckt"}`,
  card: {
    open: "Wissenskarte öffnen",
    close: "Karte schließen",
    yourValues: "Deine Antwort",
    perYear: "pro Person und Jahr",
    calculation: "So wird gerechnet",
    tip: "Praktischer Tipp",
    source: "Quelle",
    method: "Alle Faktoren und Annahmen"
  },
  continue: "Weiter",
  finishRoom: "Raum abschließen",
  adjust: { reset: "Vorgabe", less: (label) => `${label}: weniger`, more: (label) => `${label}: mehr`, setTo: (value) => `Auf ${value} setzen` },
  landmarks: {
    meran: (n) => `≈ ${n}× Bozen–Meran`,
    innsbruck: (n) => `≈ ${n}× Bozen–Innsbruck`,
    rome: (n) => `≈ ${n}× Bozen–Rom und zurück`,
    earth: (n) => `≈ ${n}× um die Erde`,
    parking: (n, one) => `≈ ${n} ${one ? "Parkplatz" : "Parkplätze"}`,
    tennis: (n, one) => `≈ ${n} ${one ? "Tennisplatz" : "Tennisplätze"}`
  },
  bill: {
    gas: (n) => `≈ ${n} Smc Erdgas — die Einheit auf der Gasrechnung`,
    oil: (n) => `≈ ${n} Liter Heizöl`,
    electricity: (n) => `≈ ${n}× der Südtiroler Durchschnitt pro Kopf`
  },
  topics: {
    "bedroom-heating": "Heizung",
    "bedroom-textiles": "Kleidung",
    "bedroom-standby": "Standby",
    "bath-shower": "Duschen",
    "bath-water-heating": "Übriges Warmwasser",
    "bath-toilet": "Toilettenspülung",
    "living-tv-streaming": "Haushaltsstrom",
    "living-lighting": "Beleuchtung",
    "living-plants": "Zimmerpflanzen",
    "mobility-long": "Fernreisen",
    "kitchen-diet": "Ernährung",
    "kitchen-origin": "Herkunft der Lebensmittel",
    "kitchen-waste": "Lebensmittelabfall",
    "mobility-short": "Kurze Wege",
    "mobility-km": "Autofahrten",
    "garden-ground": "Gartenfläche",
    "garden-plants": "Gartenpflanzen",
    "garden-structures": "Lebensräume im Garten"
  },
  presets: "Schnell ausfüllen",
  steps: {
    kind: "Art",
    amount: "Menge",
    result: "Ergebnis",
    of: (index, total) => `Schritt ${index} von ${total}`,
    yourAnswer: "Deine Angabe",
    edit: "Ändern"
  },
  mealWeek: {
    days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    meals: ["Früh", "Mittag", "Abend"],
    prompt: "Tippe die Mahlzeiten mit Fleisch an.",
    cell: (day, meal, meat) => `${day}, ${meal}: ${meat ? "mit Fleisch" : "ohne Fleisch"}`
  },
  units: {
    bathtubs: (n) => (n === 1 ? "Badewanne" : "Badewannen"),
    carKm: "km Autofahrt",
    co2Kg: "kg CO₂",
    co2T: "t CO₂"
  },
  everyday: {
    bathtubs: (n) => `${n} volle Badewannen`,
    bucketOne: "ein Eimer Wasser",
    buckets: (n) => `${n} Eimer Wasser`,
    romeTrips: (n) => `${n}-mal mit dem Auto nach Rom und zurück`,
    carKm: (n) => `${n} km Autofahrt`,
    tonnes: (n) => `${n} Tonnen CO₂`,
    kilos: (n) => `${n} kg CO₂`,
    water: (head) => `Rund ${head} im Jahr.`,
    co2: (head) => `So viel CO₂ wie ${head} im Jahr.`,
    plain: (head) => `Rund ${head} im Jahr.`,
    heating: (second) => `Das Aufheizen wiegt so viel CO₂ wie ${second}.`,
    saving: (less) => `Mit der sparsamsten Antwort: ${less} weniger.`,
    natureStrong: "Ein echter Gewinn für Wildbienen, Vögel und Falter.",
    natureSome: "Ein Anfang für die Artenvielfalt vor deiner Tür.",
    natureNone: "Hier findet die Natur vor deiner Tür wenig.",
    thrifty: "Eine sparsame Wahl.",
    room: "Hier steckt noch Spielraum.",
    none: "Zählt nicht in die Bilanz — eine Frage zum Nachdenken."
  },
  roomComplete: {
    title: (room) => `${room} entdeckt`,
    skipped: "übersprungen",
    cardRead: "Wissenskarte gelesen",
    cardUnread: "Wissenskarte noch nicht gelesen",
    toResults: "Zur Auswertung",
    next: (room) => `Weiter: ${room}`,
    nextFallback: "nächster Raum",
    viewHouse: "Haus ansehen"
  },
  results: {
    yearTitle: "Dein Jahr zu Hause",
    yearInterim: (found, total) => `Zwischenstand aus ${found} von ${total} Gegenständen — mit jedem weiteren wird das Bild vollständiger.`,
    yearWater: "Leitungswasser",
    waterExact: (liters) => `${liters} Liter im Jahr`,
    yearCo2: "Klimawirkung",
    co2Compare: (phrase) => `so viel wie ${phrase}`,
    topTitle: "Wo das meiste CO₂ entsteht",
    topLead: "Deine Gegenstände mit dem größten Anteil an deiner erfassten Klimawirkung.",
    topRowAria: (label, value, percent) => `${label}: ${value} CO₂ im Jahr, ${percent} % deiner erfassten Klimawirkung`,
    summary: ({ points, cards, total }) => [
      { b: `${points} Entdeckerpunkte` },
      " — und ",
      { b: `${cards} von ${total}` },
      " Wissenskarten gelesen."
    ],
    openFolder: "Wissensmappe öffnen",
    continueRoom: (room) => `Weiter: ${room}`,
    stillOpen: (rooms) => `Noch offen: ${rooms}. Die Bilanz unten ist bis dahin ein Zwischenstand.`,
    whatIfTitle: "Was wäre, wenn …?",
    whatIfLead: "Deine Antworten bleiben, wie sie sind. Hier probierst du aus, was die größten Hebel aus deinem Haushalt bewirken würden.",
    whatIfHint: "Schalte einen Hebel ein, um zu sehen, was er im Jahr ausmacht.",
    withLevers: (n) => (n === 1 ? "Mit diesem Hebel:" : `Mit ${n} Hebeln:`),
    bathtubs: "Badewannen",
    water: "Wasser",
    and: "und",
    perYear: "im Jahr.",
    climate: "Deine erfasste Klimawirkung:",
    noLevers:
      "In deinen bisherigen Antworten steckt kein Hebel, der ohne Nachteil für die Natur mehr als ein halbes Prozent ausmacht. Entdecke weitere Räume, dann kommen vielleicht welche dazu.",
    instead: (label) => `statt „${label}“`,
    perYearShort: "im Jahr",
    tryIt: "Ausprobieren",
    goal: "Vorhaben",
    markGoal: "Als Vorhaben merken",
    maxGoals: (n) => `Höchstens ${n} Vorhaben`,
    captionNow: "Jetzt",
    captionTried: "Ausprobiert",
    goalsTitle: "Deine Vorhaben in Südtirol",
    themeTitle: "Wo dein Thema in Südtirol wirkt",
    goalsLead:
      "Ein Projekt macht keine Dusche und keinen Kilometer wett — das soll es auch nicht. Es zeigt, wo dasselbe Thema in Südtirol vor Ort Lebensraum schafft.",
    noGoalsLead: (n, reason) => `Merk dir bis zu ${n} Hebel als Vorhaben, dann ordnen wir sie Projekten zu. Bis dahin: ${reason}`,
    whyNot: "Warum wir nicht kompensieren",
    viewProject: "Projekt ansehen",
    exactTitle: "Genaue Bilanz und Methodik",
    exactEmpty: "noch leer",
    noAnswers: "Beantworte mindestens eine Frage, bevor Zahlen eingeordnet werden. ",
    complete: (percent) => `Das entspricht rund ${percent} % des Vergleichswerts für den erfassten Ausschnitt. `,
    partial: "Diese Summe ist ein Zwischenstand und darf nicht als vollständiges persönliches Ergebnis gelesen werden. ",
    answered: (answered, total) => ["Beantwortet sind ", { b: `${answered} von ${total} Fragen` }, "."],
    calculated: "Gerechnet",
    calculatedSub: "Physikalische Größen pro Person und Jahr",
    referenceNote: "Vergleichswert ist ein mittleres, reproduzierbares Antwortprofil dieses Checks — kein Bevölkerungsdurchschnitt und kein Klimaziel.",
    allFactors: "Alle Faktoren und Annahmen",
    estimated: "Eingeschätzt",
    estimatedSub: "Didaktischer Index von 0 bis 100",
    of100: "von 100",
    indexNote:
      "Diese vier Werte sind keine validierten Messwerte. Mengenregler verändern den Index entlang der berechneten Belastung; nicht quantifizierbare Wirkungen bleiben als vorsichtige qualitative Punkte getrennt von den Messwerten oben. Die Entdeckerpunkte des Spiels fließen in keinen dieser Werte ein.",
    modelComparison: "Modellvergleich",
    percentOfModel: (percent) => `${percent} % des Modellvergleichs`,
    toHouse: "Zur Hausübersicht"
  },
  themes: { water: "Wasser", biodiversity: "Lebensraum", carbon: "Klima" },
  reasons: {
    biodiversity:
      "Im direkten Wohnumfeld entstehen die Lebensräume, die dein Haushalt am unmittelbarsten prägt — Grünflächen, Nisthilfen und blühende Säume mitten im Siedlungsraum.",
    water:
      "Feuchtgebiete speichern Wasser in der Landschaft und puffern Trockenphasen ab. Sie wirken dort, wo dein Wasserverbrauch ansetzt.",
    carbon:
      "Gepflegte Kulturlandschaften binden Kohlenstoff in Böden und Gehölzen und halten gleichzeitig die Artenvielfalt, die intensive Nutzung verdrängt.",
    resources:
      "Extensiv genutzte Wiesen und Trockenrasen kommen mit wenig Eintrag aus. Sie zeigen, wie ein sparsamer Umgang mit Ressourcen Artenvielfalt erzeugt statt sie zu kosten."
  },
  dimensions: { biodiversity: "Biodiversität", carbon: "CO₂", water: "Wasser", resources: "Ressourcen" },
  metrics: {
    co2: {
      label: "Erfasste Klimawirkung",
      short: "CO₂",
      unit: "kg/Jahr",
      scopeNote: "CO₂e der abgefragten Aktivitäten; Vorketten nur, wenn sie im jeweiligen Faktor genannt sind."
    },
    water: {
      label: "Trinkwasser",
      short: "Wasser",
      unit: "Liter/Jahr",
      scopeNote: "Nur direkt verbrauchtes Leitungswasser, ohne virtuelles Wasser aus Produkten."
    },
    energy: {
      label: "Energieeinsatz",
      short: "Energie",
      unit: "kWh/Jahr",
      scopeNote: "Zugeordneter direkter Einsatz von Strom, Wärme, Kraftstoff und Wasserbereitstellung; ohne graue Energie von Produkten."
    }
  },
  fullFootprintNote:
    "Der Check erfasst ausgewählte Beiträge aus Wohnen, Ernährung und Mobilität. Konsum, Gebäude, öffentliche Leistungen und weitere Alltagsbereiche fehlen; die Summe ist kein vollständiger persönlicher Fußabdruck.",
  basis: questionBasis
};

const it: TourUi = {
  toolbar: {
    logo: "b*alance – alla pagina iniziale",
    home: "Casa",
    results: "Bilancio",
    resultsTitle: "Guarda il tuo bilancio annuo",
    resultsDisabledTitle: "Rispondi a un oggetto e il bilancio diventa visibile",
    resultsAria: (done, total) => `Guarda il bilancio. ${done} di ${total} oggetti completati`,
    resultsDisabledAria: (total) => `Bilancio non ancora disponibile. Rispondi prima a uno dei ${total} oggetti`,
    reset: "Ricomincia il percorso",
    resetConfirm: "Vuoi cancellare tutte le risposte del Check degli habitat?",
    pointsAria: (points) => `${points} punti scoperta. Apri la cartella delle conoscenze`
  },
  panelRegion: "Domande, valori e comandi",
  intro: {
    headline: "Ogni oggetto racchiude un legame con la natura",
    lead: "18 oggetti in sei stanze, per ognuno un breve turno:",
    loop: [
      { title: "Impostare", copy: "tocca, sposta il cursore — come è davvero da te" },
      { title: "Vedere", copy: "quanto fa in un anno: vasche da bagno, chilometri" },
      { title: "Scoprire", copy: "il perché, su una scheda per la tua cartella" }
    ],
    loopAria: "Un turno",
    honesty: "Non c’è giusto o sbagliato. I punti si guadagnano scoprendo — mai per la risposta stessa.",
    start: "Inizia dalla camera da letto",
    resumeTitle: "Riprendi da dove avevi lasciato.",
    doneTitle: "Hai scoperto tutta la casa.",
    foundOf: (found, total) => `${found} di ${total} oggetti`,
    foundAria: (found, total) => `${found} di ${total} oggetti scoperti`,
    continueRoom: (room) => `Avanti: ${room}`,
    toResults: "Al risultato",
    results: "Risultato"
  },
  house: {
    explored: (handled, total) => `${handled}/${total} esplorati`,
    visitAria: (room, handled, total) => `Visita ${room}, ${handled} di ${total} oggetti completati`,
    roomsNav: "Stanze della casa"
  },
  scene: {
    objectsNav: "Oggetti nella stanza",
    roomAria: (title) => `${title}: scopri gli oggetti`,
    visualization: (room) => `Illustrazione per ${room}`,
    openObject: (label, state) => `Apri ${label}${state === "answered" ? ", con risposta" : state === "skipped" ? ", saltato" : ""}`,
    state: { answered: "con risposta", skipped: "saltato", open: "aperto" },
    desktopState: { answered: "Risposto · modifica", skipped: "Saltato · recupera", active: "Scopri ora", open: "Ancora aperto" },
    tapHint: "tocca e scopri",
    chooseObject: "Scegli un oggetto"
  },
  roomNav: {
    label: "Stanze",
    toHouse: "Alla panoramica della casa",
    roomAria: (title, handled, total) => `${title}, ${handled} di ${total} oggetti completati`
  },
  progressObjects: "oggetti",
  panel: {
    back: "Indietro",
    skip: "Salta",
    discover: (label) => `Scopri: ${label}`,
    objectOf: (room, index, total) => `${room} · oggetto ${index} di ${total}`,
    openObject: (label) => `Apri ${label}`,
    keys: { keys: "Tasti", choose: "per scegliere,", next: "avanti" },
    southTyrol: "Media Alto Adige"
  },
  answerHint: "Qui non c’è giusto o sbagliato. I punti si guadagnano scoprendo, non con la risposta.",
  points: (n) => `${n} punti scoperta`,
  pointsShort: "punti",
  folder: "Cartella delle conoscenze",
  folderCount: (read, total) => `${read} di ${total} schede`,
  folderCardAria: (label, state) => `${label}, ${state === "read" ? "letta" : state === "new" ? "nuova" : "non ancora scoperta"}`,
  card: {
    open: "Apri la scheda",
    close: "Chiudi la scheda",
    yourValues: "La tua risposta",
    perYear: "per persona all’anno",
    calculation: "Come si calcola",
    tip: "Consiglio pratico",
    source: "Fonte",
    method: "Tutti i fattori e le ipotesi"
  },
  continue: "Avanti",
  finishRoom: "Concludi la stanza",
  adjust: { reset: "Valore predefinito", less: (label) => `${label}: meno`, more: (label) => `${label}: più`, setTo: (value) => `Imposta a ${value}` },
  landmarks: {
    meran: (n) => `≈ ${n}× Bolzano–Merano`,
    innsbruck: (n) => `≈ ${n}× Bolzano–Innsbruck`,
    rome: (n) => `≈ ${n}× Bolzano–Roma andata e ritorno`,
    earth: (n) => `≈ ${n}× il giro della Terra`,
    parking: (n, one) => `≈ ${n} ${one ? "posto auto" : "posti auto"}`,
    tennis: (n, one) => `≈ ${n} ${one ? "campo da tennis" : "campi da tennis"}`
  },
  bill: {
    gas: (n) => `≈ ${n} Smc di metano — l’unità della bolletta del gas`,
    oil: (n) => `≈ ${n} litri di gasolio da riscaldamento`,
    electricity: (n) => `≈ ${n}× la media altoatesina pro capite`
  },
  topics: {
    "bedroom-heating": "Riscaldamento",
    "bedroom-textiles": "Abbigliamento",
    "bedroom-standby": "Standby",
    "bath-shower": "Doccia",
    "bath-water-heating": "Altra acqua calda",
    "bath-toilet": "Sciacquone",
    "living-tv-streaming": "Elettricità domestica",
    "living-lighting": "Illuminazione",
    "living-plants": "Piante d’appartamento",
    "mobility-long": "Viaggi lunghi",
    "kitchen-diet": "Alimentazione",
    "kitchen-origin": "Provenienza del cibo",
    "kitchen-waste": "Spreco alimentare",
    "mobility-short": "Tragitti brevi",
    "mobility-km": "Viaggi in auto",
    "garden-ground": "Superficie del giardino",
    "garden-plants": "Piante del giardino",
    "garden-structures": "Habitat in giardino"
  },
  presets: "Compila in fretta",
  steps: {
    kind: "Tipo",
    amount: "Quantità",
    result: "Risultato",
    of: (index, total) => `Passo ${index} di ${total}`,
    yourAnswer: "La tua risposta",
    edit: "Modifica"
  },
  mealWeek: {
    days: ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
    meals: ["Colaz.", "Pranzo", "Cena"],
    prompt: "Tocca i pasti con carne.",
    cell: (day, meal, meat) => `${day}, ${meal}: ${meat ? "con carne" : "senza carne"}`
  },
  units: {
    bathtubs: (n) => (n === 1 ? "vasca da bagno" : "vasche da bagno"),
    carKm: "km in auto",
    co2Kg: "kg CO₂",
    co2T: "t CO₂"
  },
  everyday: {
    bathtubs: (n) => `${n} vasche da bagno piene`,
    bucketOne: "un secchio d’acqua",
    buckets: (n) => `${n} secchi d’acqua`,
    romeTrips: (n) => `${n} viaggi in auto a Roma e ritorno`,
    carKm: (n) => `${n} km in auto`,
    tonnes: (n) => `${n} tonnellate di CO₂`,
    kilos: (n) => `${n} kg di CO₂`,
    water: (head) => `Circa ${head} all’anno.`,
    co2: (head) => `Tanta CO₂ quanto ${head} all’anno.`,
    plain: (head) => `Circa ${head} all’anno.`,
    heating: (second) => `Scaldare l’acqua pesa in CO₂ quanto ${second}.`,
    saving: (less) => `Con la risposta più parsimoniosa: ${less} in meno.`,
    natureStrong: "Un vero guadagno per api selvatiche, uccelli e farfalle.",
    natureSome: "Un inizio per la biodiversità davanti a casa.",
    natureNone: "Qui la natura davanti a casa trova poco.",
    thrifty: "Una scelta parsimoniosa.",
    room: "Qui c’è ancora margine.",
    none: "Non conta nel bilancio — una domanda per riflettere."
  },
  roomComplete: {
    title: (room) => `${room}: scoperto`,
    skipped: "saltato",
    cardRead: "Scheda letta",
    cardUnread: "Scheda non ancora letta",
    toResults: "Al risultato",
    next: (room) => `Avanti: ${room}`,
    nextFallback: "prossima stanza",
    viewHouse: "Guarda la casa"
  },
  results: {
    yearTitle: "Il tuo anno a casa",
    yearInterim: (found, total) => `Risultato parziale da ${found} di ${total} oggetti — ogni oggetto in più completa il quadro.`,
    yearWater: "Acqua del rubinetto",
    waterExact: (liters) => `${liters} litri all’anno`,
    yearCo2: "Impatto sul clima",
    co2Compare: (phrase) => `quanto ${phrase}`,
    topTitle: "Dove nasce più CO₂",
    topLead: "I tuoi oggetti con la quota maggiore del tuo impatto sul clima rilevato.",
    topRowAria: (label, value, percent) => `${label}: ${value} di CO₂ all’anno, ${percent} % del tuo impatto sul clima rilevato`,
    summary: ({ points, cards, total }) => [
      { b: `${points} punti scoperta` },
      " — e ",
      { b: `${cards} di ${total}` },
      " schede lette."
    ],
    openFolder: "Apri la cartella delle conoscenze",
    continueRoom: (room) => `Avanti: ${room}`,
    stillOpen: (rooms) => `Ancora da scoprire: ${rooms}. Fino ad allora il bilancio qui sotto è provvisorio.`,
    whatIfTitle: "E se …?",
    whatIfLead: "Le tue risposte restano come sono. Qui provi che effetto avrebbero le leve più grandi della tua casa.",
    whatIfHint: "Attiva una leva per vedere quanto conta in un anno.",
    withLevers: (n) => (n === 1 ? "Con questa leva:" : `Con ${n} leve:`),
    bathtubs: "vasche da bagno",
    water: "d’acqua",
    and: "e",
    perYear: "all’anno.",
    climate: "Il tuo impatto climatico rilevato:",
    noLevers:
      "Nelle tue risposte finora non c’è nessuna leva che, senza svantaggi per la natura, valga più di mezzo punto percentuale. Scopri altre stanze, forse se ne aggiungono.",
    instead: (label) => `invece di «${label}»`,
    perYearShort: "all’anno",
    tryIt: "Prova",
    goal: "Proposito",
    markGoal: "Segna come proposito",
    maxGoals: (n) => `Al massimo ${n} propositi`,
    captionNow: "Ora",
    captionTried: "Provato",
    goalsTitle: "I tuoi propositi in Alto Adige",
    themeTitle: "Dove il tuo tema agisce in Alto Adige",
    goalsLead:
      "Un progetto non compensa nessuna doccia e nessun chilometro — e non deve farlo. Mostra dove lo stesso tema crea habitat sul posto in Alto Adige.",
    noGoalsLead: (n, reason) => `Segna fino a ${n} leve come propositi e le collegheremo a dei progetti. Nel frattempo: ${reason}`,
    whyNot: "Perché non compensiamo",
    viewProject: "Vedi il progetto",
    exactTitle: "Bilancio esatto e metodo",
    exactEmpty: "ancora vuoto",
    noAnswers: "Rispondi ad almeno una domanda prima che i numeri vengano inquadrati. ",
    complete: (percent) => `Corrisponde a circa il ${percent} % del valore di confronto per l’ambito rilevato. `,
    partial: "Questa somma è provvisoria e non va letta come risultato personale completo. ",
    answered: (answered, total) => ["Hai risposto a ", { b: `${answered} domande su ${total}` }, "."],
    calculated: "Calcolato",
    calculatedSub: "Grandezze fisiche per persona all’anno",
    referenceNote: "Il valore di confronto è un profilo di risposta medio e riproducibile di questo check — non una media della popolazione e non un obiettivo climatico.",
    allFactors: "Tutti i fattori e le ipotesi",
    estimated: "Stimato",
    estimatedSub: "Indice didattico da 0 a 100",
    of100: "su 100",
    indexNote:
      "Questi quattro valori non sono misure validate. I cursori delle quantità spostano l’indice lungo il carico calcolato; gli effetti non quantificabili restano punti qualitativi prudenti, separati dai valori misurati sopra. I punti scoperta del gioco non entrano in nessuno di questi valori.",
    modelComparison: "Confronto modello",
    percentOfModel: (percent) => `${percent} % del confronto modello`,
    toHouse: "Alla panoramica della casa"
  },
  themes: { water: "Acqua", biodiversity: "Habitat", carbon: "Clima" },
  reasons: {
    biodiversity:
      "Nell’ambiente in cui vivi nascono gli habitat che la tua casa influenza più direttamente — aree verdi, nidi artificiali e margini fioriti in mezzo all’abitato.",
    water:
      "Le zone umide trattengono l’acqua nel paesaggio e attenuano i periodi di siccità. Agiscono là dove interviene il tuo consumo d’acqua.",
    carbon:
      "I paesaggi rurali curati legano carbonio nei suoli e nelle siepi e mantengono allo stesso tempo la biodiversità che l’uso intensivo fa sparire.",
    resources:
      "Prati estensivi e prati aridi richiedono pochi apporti. Mostrano come un uso parsimonioso delle risorse crei biodiversità invece di costarla."
  },
  dimensions: { biodiversity: "Biodiversità", carbon: "CO₂", water: "Acqua", resources: "Risorse" },
  metrics: {
    co2: {
      label: "Impatto climatico rilevato",
      short: "CO₂",
      unit: "kg/anno",
      scopeNote: "CO₂e delle attività richieste; filiere a monte solo se indicate nel rispettivo fattore."
    },
    water: {
      label: "Acqua potabile",
      short: "Acqua",
      unit: "litri/anno",
      scopeNote: "Solo acqua di rubinetto consumata direttamente, senza acqua virtuale dei prodotti."
    },
    energy: {
      label: "Energia impiegata",
      short: "Energia",
      unit: "kWh/anno",
      scopeNote: "Impiego diretto attribuito di elettricità, calore, carburante e fornitura d’acqua; senza energia grigia dei prodotti."
    }
  },
  fullFootprintNote:
    "Il check rileva contributi scelti da abitare, alimentazione e mobilità. Mancano consumi, edifici, servizi pubblici e altri ambiti della vita quotidiana; la somma non è un’impronta personale completa.",
  basis: itBasis
};

const en: TourUi = {
  toolbar: {
    logo: "b*alance – to the home page",
    home: "House",
    results: "Balance",
    resultsTitle: "See your annual balance",
    resultsDisabledTitle: "Answer one object and the balance appears",
    resultsAria: (done, total) => `See balance. ${done} of ${total} objects done`,
    resultsDisabledAria: (total) => `Balance not available yet. Answer one of the ${total} objects first`,
    reset: "Reset the tour",
    resetConfirm: "Do you want to reset all answers of the Habitat Check?",
    pointsAria: (points) => `${points} discovery points. Open the knowledge folder`
  },
  panelRegion: "Questions, values and controls",
  intro: {
    headline: "Every object has a connection to nature",
    lead: "18 objects in six rooms, each with a short round:",
    loop: [
      { title: "Set", copy: "tap, slide — just as it is at your place" },
      { title: "See", copy: "what that adds up to in a year: bathtubs, kilometres" },
      { title: "Discover", copy: "the why behind it, as a card for your folder" }
    ],
    loopAria: "One round",
    honesty: "There’s no right or wrong. Points come from discovering — never from the answer itself.",
    start: "Start in the bedroom",
    resumeTitle: "Carry on where you left off.",
    doneTitle: "You’ve discovered the whole house.",
    foundOf: (found, total) => `${found} of ${total} objects`,
    foundAria: (found, total) => `${found} of ${total} objects discovered`,
    continueRoom: (room) => `Next: ${room}`,
    toResults: "To the result",
    results: "Result"
  },
  house: {
    explored: (handled, total) => `${handled}/${total} explored`,
    visitAria: (room, handled, total) => `Visit ${room}, ${handled} of ${total} objects done`,
    roomsNav: "Rooms in the house"
  },
  scene: {
    objectsNav: "Objects in the room",
    roomAria: (title) => `${title}: discover objects`,
    visualization: (room) => `Illustration for ${room}`,
    openObject: (label, state) => `Open ${label}${state === "answered" ? ", answered" : state === "skipped" ? ", skipped" : ""}`,
    state: { answered: "answered", skipped: "skipped", open: "open" },
    desktopState: { answered: "Answered · change", skipped: "Skipped · catch up", active: "Discover now", open: "Still open" },
    tapHint: "tap & discover",
    chooseObject: "Choose an object"
  },
  roomNav: {
    label: "Rooms",
    toHouse: "To the house overview",
    roomAria: (title, handled, total) => `${title}, ${handled} of ${total} objects done`
  },
  progressObjects: "objects",
  panel: {
    back: "Back",
    skip: "Skip",
    discover: (label) => `Discover: ${label}`,
    objectOf: (room, index, total) => `${room} · object ${index} of ${total}`,
    openObject: (label) => `Open ${label}`,
    keys: { keys: "Keys", choose: "to choose,", next: "next" },
    southTyrol: "South Tyrol average"
  },
  answerHint: "There’s no right or wrong here. Points come from discovering, not from the answer.",
  points: (n) => `${n} discovery points`,
  pointsShort: "points",
  folder: "Knowledge folder",
  folderCount: (read, total) => `${read} of ${total} cards`,
  folderCardAria: (label, state) => `${label}, ${state === "read" ? "read" : state === "new" ? "new" : "not discovered yet"}`,
  card: {
    open: "Open knowledge card",
    close: "Close card",
    yourValues: "Your answer",
    perYear: "per person per year",
    calculation: "How it’s calculated",
    tip: "Practical tip",
    source: "Source",
    method: "All factors and assumptions"
  },
  continue: "Next",
  finishRoom: "Finish room",
  adjust: { reset: "Default", less: (label) => `${label}: less`, more: (label) => `${label}: more`, setTo: (value) => `Set to ${value}` },
  landmarks: {
    meran: (n) => `≈ ${n}× Bolzano–Merano`,
    innsbruck: (n) => `≈ ${n}× Bolzano–Innsbruck`,
    rome: (n) => `≈ ${n}× Bolzano–Rome and back`,
    earth: (n) => `≈ ${n}× around the Earth`,
    parking: (n, one) => `≈ ${n} ${one ? "parking space" : "parking spaces"}`,
    tennis: (n, one) => `≈ ${n} ${one ? "tennis court" : "tennis courts"}`
  },
  bill: {
    gas: (n) => `≈ ${n} Smc of natural gas — the unit on your gas bill`,
    oil: (n) => `≈ ${n} litres of heating oil`,
    electricity: (n) => `≈ ${n}× the South Tyrol average per person`
  },
  topics: {
    "bedroom-heating": "Heating",
    "bedroom-textiles": "Clothing",
    "bedroom-standby": "Standby",
    "bath-shower": "Showering",
    "bath-water-heating": "Other hot water",
    "bath-toilet": "Toilet flushing",
    "living-tv-streaming": "Household electricity",
    "living-lighting": "Lighting",
    "living-plants": "Houseplants",
    "mobility-long": "Long-distance travel",
    "kitchen-diet": "Diet",
    "kitchen-origin": "Food origin",
    "kitchen-waste": "Food waste",
    "mobility-short": "Short trips",
    "mobility-km": "Car journeys",
    "garden-ground": "Garden area",
    "garden-plants": "Garden plants",
    "garden-structures": "Garden habitats"
  },
  presets: "Quick fill",
  steps: {
    kind: "Kind",
    amount: "Amount",
    result: "Result",
    of: (index, total) => `Step ${index} of ${total}`,
    yourAnswer: "Your answer",
    edit: "Change"
  },
  mealWeek: {
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    meals: ["Breakf.", "Lunch", "Dinner"],
    prompt: "Tap the meals with meat.",
    cell: (day, meal, meat) => `${day}, ${meal}: ${meat ? "with meat" : "no meat"}`
  },
  units: {
    bathtubs: (n) => (n === 1 ? "bathtub" : "bathtubs"),
    carKm: "km by car",
    co2Kg: "kg CO₂",
    co2T: "t CO₂"
  },
  everyday: {
    bathtubs: (n) => `${n} full bathtubs`,
    bucketOne: "one bucket of water",
    buckets: (n) => `${n} buckets of water`,
    romeTrips: (n) => `${n} car trips to Rome and back`,
    carKm: (n) => `${n} km by car`,
    tonnes: (n) => `${n} tonnes of CO₂`,
    kilos: (n) => `${n} kg of CO₂`,
    water: (head) => `About ${head} a year.`,
    co2: (head) => `As much CO₂ as ${head} a year.`,
    plain: (head) => `About ${head} a year.`,
    heating: (second) => `Heating the water weighs as much CO₂ as ${second}.`,
    saving: (less) => `With the most economical answer: ${less} less.`,
    natureStrong: "A real gain for wild bees, birds and butterflies.",
    natureSome: "A start for the biodiversity outside your door.",
    natureNone: "Here nature outside your door finds little.",
    thrifty: "An economical choice.",
    room: "There’s still room to move here.",
    none: "Doesn’t count in the balance — a question for reflection."
  },
  roomComplete: {
    title: (room) => `${room} discovered`,
    skipped: "skipped",
    cardRead: "Knowledge card read",
    cardUnread: "Knowledge card not read yet",
    toResults: "To the result",
    next: (room) => `Next: ${room}`,
    nextFallback: "next room",
    viewHouse: "View house"
  },
  results: {
    yearTitle: "Your year at home",
    yearInterim: (found, total) => `Interim result from ${found} of ${total} objects — every further one completes the picture.`,
    yearWater: "Tap water",
    waterExact: (liters) => `${liters} litres a year`,
    yearCo2: "Climate impact",
    co2Compare: (phrase) => `as much as ${phrase}`,
    topTitle: "Where most of the CO₂ comes from",
    topLead: "Your objects with the largest share of your recorded climate impact.",
    topRowAria: (label, value, percent) => `${label}: ${value} CO₂ a year, ${percent} % of your recorded climate impact`,
    summary: ({ points, cards, total }) => [
      { b: `${points} discovery points` },
      " — and ",
      { b: `${cards} of ${total}` },
      " knowledge cards read."
    ],
    openFolder: "Open knowledge folder",
    continueRoom: (room) => `Next: ${room}`,
    stillOpen: (rooms) => `Still to discover: ${rooms}. Until then the balance below is provisional.`,
    whatIfTitle: "What if …?",
    whatIfLead: "Your answers stay as they are. Here you try out what the biggest levers in your household would do.",
    whatIfHint: "Switch on a lever to see what it makes up in a year.",
    withLevers: (n) => (n === 1 ? "With this lever:" : `With ${n} levers:`),
    bathtubs: "bathtubs",
    water: "of water",
    and: "and",
    perYear: "a year.",
    climate: "Your recorded climate impact:",
    noLevers:
      "Your answers so far contain no lever that, without harming nature, makes up more than half a percent. Discover more rooms and some may appear.",
    instead: (label) => `instead of “${label}”`,
    perYearShort: "a year",
    tryIt: "Try it",
    goal: "Goal",
    markGoal: "Save as goal",
    maxGoals: (n) => `At most ${n} goals`,
    captionNow: "Now",
    captionTried: "Tried",
    goalsTitle: "Your goals in South Tyrol",
    themeTitle: "Where your theme matters in South Tyrol",
    goalsLead:
      "A project doesn’t make up for a shower or a kilometre — and it isn’t meant to. It shows where the same theme creates habitat on the ground in South Tyrol.",
    noGoalsLead: (n, reason) => `Save up to ${n} levers as goals and we’ll match them to projects. Until then: ${reason}`,
    whyNot: "Why we don’t offset",
    viewProject: "View project",
    exactTitle: "Exact balance and method",
    exactEmpty: "still empty",
    noAnswers: "Answer at least one question before the numbers are put in context. ",
    complete: (percent) => `That’s about ${percent} % of the comparison value for the recorded scope. `,
    partial: "This total is provisional and must not be read as a complete personal result. ",
    answered: (answered, total) => ["You’ve answered ", { b: `${answered} of ${total} questions` }, "."],
    calculated: "Calculated",
    calculatedSub: "Physical quantities per person per year",
    referenceNote: "The comparison value is a medium, reproducible answer profile of this check — not a population average and not a climate target.",
    allFactors: "All factors and assumptions",
    estimated: "Estimated",
    estimatedSub: "Teaching index from 0 to 100",
    of100: "of 100",
    indexNote:
      "These four values aren’t validated measurements. Quantity sliders move the index along the calculated load; effects that can’t be quantified stay as cautious qualitative points, separate from the measured values above. The game’s discovery points feed into none of these values.",
    modelComparison: "Model comparison",
    percentOfModel: (percent) => `${percent} % of the model comparison`,
    toHouse: "To the house overview"
  },
  themes: { water: "Water", biodiversity: "Habitat", carbon: "Climate" },
  reasons: {
    biodiversity:
      "Right where you live are the habitats your household shapes most directly — green spaces, nest aids and flowering verges in the middle of the settlement.",
    water:
      "Wetlands store water in the landscape and buffer dry spells. They work where your water use comes in.",
    carbon:
      "Well-tended cultural landscapes bind carbon in soils and hedgerows and at the same time keep the biodiversity that intensive use drives out.",
    resources:
      "Extensively used meadows and dry grasslands need few inputs. They show how a sparing use of resources creates biodiversity instead of costing it."
  },
  dimensions: { biodiversity: "Biodiversity", carbon: "CO₂", water: "Water", resources: "Resources" },
  metrics: {
    co2: {
      label: "Recorded climate impact",
      short: "CO₂",
      unit: "kg/year",
      scopeNote: "CO₂e of the activities asked about; upstream chains only where named in the respective factor."
    },
    water: {
      label: "Drinking water",
      short: "Water",
      unit: "litres/year",
      scopeNote: "Only tap water used directly, without virtual water from products."
    },
    energy: {
      label: "Energy use",
      short: "Energy",
      unit: "kWh/year",
      scopeNote: "Attributed direct use of electricity, heat, fuel and water supply; without embodied energy of products."
    }
  },
  fullFootprintNote:
    "The check records selected contributions from housing, food and mobility. Consumer goods, buildings, public services and other areas of daily life are missing; the total is not a complete personal footprint.",
  basis: enBasis
};

export const tourUi: Localized<TourUi> = { de, it, en };
