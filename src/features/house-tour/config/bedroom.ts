import type { TourRoom } from "../model/types";

export const bedroomRoom: TourRoom = {
  id: "bedroom",
  title: "Schlafen & Textilien",
  shortTitle: "Schlafen",
  available: true,
  description: "Erkunde Raumtemperatur, Kleiderschrank und Standby-Geräte im Schlafzimmer.",
  questions: [
    {
      id: "bedroom-heating",
      title: "Wie heizt du und wie hoch ist dein Jahresverbrauch?",
      sceneLabel: "Bett & Raumklima",
      description:
        "Raumwärme ist meist der größte Energieposten im Haushalt. Der tatsächliche Rechnungswert bildet Gebäude, Wohnfläche, Wetter und Heizverhalten besser ab als eine pauschale Schätzung.",
      impactText:
        "Der persönliche Anteil am Jahresverbrauch wird mit dem Faktor des Heizsystems bewertet. Bei einer Wärmepumpe ist der eingekaufte Strom gemeint, bei Gas, Öl oder Fernwärme die gelieferte Energiemenge.",
      tip: "Nutze möglichst die letzte Jahresabrechnung und teile einen gemeinsamen Verbrauch durch die Zahl der Haushaltsmitglieder.",
      adjust: {
        label: "Dein Anteil am Jahresverbrauch",
        unit: "kWh",
        min: 0,
        max: 15000,
        step: 100,
        defaults: {
          "heat-oil": 4500,
          "heat-gas": 4200,
          "heat-district": 3800,
          "heat-pump": 1600,
          "heat-unknown": 4200
        },
        hint: "Bei einer Wärmepumpe nur deren Strom; gemeinsamen Verbrauch pro Person aufteilen."
      },
      options: [
        {
          id: "heat-oil",
          label: "Heizöl",
          params: { co2PerKwh: 0.31 },
          impact: { carbon: -7, resources: -4 },
        },
        {
          id: "heat-gas",
          label: "Erdgas",
          params: { co2PerKwh: 0.24 },
          impact: { carbon: -4, resources: -3 },
        },
        {
          id: "heat-district",
          label: "Fernwärme oder Biomasse",
          params: { co2PerKwh: 0.1 },
          impact: { carbon: 3, resources: 1 },
        },
        {
          id: "heat-pump",
          label: "Wärmepumpe",
          params: { co2PerKwh: 0.214 },
          impact: { carbon: 6, resources: 5 },
        },
        {
          id: "heat-unknown",
          label: "Anderes oder nicht bekannt",
          params: { co2PerKwh: 0.19 },
          impact: { carbon: 0, resources: 0 },
        }
      ]
    },
    {
      id: "bedroom-textiles",
      title: "Wie viele Kleidungsstücke kommen im Jahr dazu?",
      sceneLabel: "Kleiderschrank",
      description:
        "Ein neues Kleidungsstück bringt seinen gesamten Rucksack mit: Anbau der Faser, Färben, Nähen, Transport. Bei Secondhand entfällt fast alles davon.",
      impactText:
        "Hinter einem Baumwoll-Shirt stecken rund 2.700 Liter Wasser — allerdings dort, wo die Baumwolle wächst. Dieses virtuelle Wasser taucht deshalb im Wasserzähler bewusst nicht auf, es steckt in der CO₂-Zahl.",
      tip: "Die wirksamste Regel ist nicht der Kaufverzicht, sondern die Tragedauer: doppelt so lange getragen heißt halb so viel Fußabdruck pro Tag.",
      scopeNote:
        "Zählt nur auf die erfasste Klimawirkung ein. Virtuelles Wasser und Herstellungsenergie liegen außerhalb dieser Bilanzgrenzen.",
      adjust: {
        label: "Neue Kleidungsstücke pro Jahr",
        unit: "Stück",
        min: 0,
        max: 80,
        step: 1,
        defaults: { "textiles-fast": 40, "textiles-mixed": 20, "textiles-slow": 10 },
        hint: "Alles mitzählen: Shirts, Hosen, Schuhe, Jacken, Unterwäsche."
      },
      options: [
        {
          id: "textiles-fast",
          label: "Überwiegend Neuware, oft günstige Mode",
          params: { co2PerItem: 15 },
          impact: { biodiversity: -6, carbon: -5, water: -7, resources: -6 },
        },
        {
          id: "textiles-mixed",
          label: "Mischung aus Neuware und Secondhand",
          params: { co2PerItem: 9 },
          impact: { biodiversity: 2, carbon: 2, water: 2, resources: 2 },
        },
        {
          id: "textiles-slow",
          label: "Überwiegend Secondhand, Bio-Fasern oder repariert",
          params: { co2PerItem: 3 },
          impact: { biodiversity: 7, carbon: 6, water: 7, resources: 7 },
        }
      ]
    },
    {
      id: "bedroom-standby",
      title: "Wie viele Geräte hängen dauerhaft am Netz?",
      sceneLabel: "Kommode & Lampen",
      description:
        "Router, Ladegeräte, Fernseher, Kaffeemaschine, Spielkonsole: jedes zieht im Standby ein bis fünf Watt. Rund um die Uhr, das ganze Jahr.",
      impactText:
        "Standby macht in vielen Haushalten fast ein Zehntel des Stromverbrauchs aus — für Geräte, die dabei nichts tun.",
      tip: "Der Router gehört nicht dazu: ihn nachts abzuschalten spart wenig und stört Updates. Lohnender sind TV-Ecke, Küchengeräte und Ladestationen.",
      scopeNote:
        "Der Verbrauch steckt bereits in deinem Haushaltsstrom und wird hier nicht ein zweites Mal addiert. Die Antwort wirkt nur auf das qualitative Profil.",
      adjust: {
        label: "Geräte im Dauerbetrieb",
        unit: "Stück",
        min: 0,
        max: 30,
        step: 1,
        defaults: { "standby-all": 12, "standby-partial": 7, "standby-off": 3 }
      },
      options: [
        {
          id: "standby-all",
          label: "Alles bleibt am Netz",
          params: { standbyWatts: 3 },
          impact: { carbon: -3, resources: -3 },
        },
        {
          id: "standby-partial",
          label: "Einiges wird abgeschaltet",
          params: { standbyWatts: 2 },
          impact: { carbon: 1, resources: 1 },
        },
        {
          id: "standby-off",
          label: "Schaltbare Steckdosenleisten im Einsatz",
          params: { standbyWatts: 1 },
          impact: { carbon: 4, resources: 4 },
        }
      ]
    }
  ]
};
