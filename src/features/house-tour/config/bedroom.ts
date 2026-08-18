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
      title: "Auf welche Temperatur heizt du deine Wohnräume?",
      sceneLabel: "Bett & Raumklima",
      description:
        "Raumwärme ist der mit Abstand größte Energieposten im Haushalt. Als Faustregel gilt: jedes Grad weniger spart rund sechs Prozent Heizenergie.",
      impactText:
        "Die Rechnung geht von einem Wärmebedarf von 4.200 kWh pro Person und Jahr bei 20 °C aus und bewertet ihn mit dem Südtiroler Wärmemix, in dem Biomasse-Fernwärme einen großen Anteil hat.",
      tip: "Nachtabsenkung bringt oft mehr als Sparen am Tag: zwei Grad weniger über acht Stunden fallen im Schlaf nicht auf.",
      adjust: {
        label: "Zieltemperatur",
        unit: "°C",
        min: 15,
        max: 25,
        step: 0.5,
        defaults: { "heat-warm": 21.5, "heat-moderate": 19.5, "heat-cool": 17.5 },
        hint: "Gemittelt über die beheizten Räume."
      },
      options: [
        {
          id: "heat-warm",
          label: "Durchgehend warm, über 21 °C",
          params: { roomTemp: 21.5 },
          impact: { carbon: -6, resources: -4 },
        },
        {
          id: "heat-moderate",
          label: "Moderat geheizt, 19–21 °C",
          params: { roomTemp: 19.5 },
          impact: { carbon: 2, resources: 2 },
        },
        {
          id: "heat-cool",
          label: "Kühl und sparsam, 17–19 °C",
          params: { roomTemp: 17.5 },
          impact: { carbon: 7, resources: 5 },
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
        "Zählt nur auf CO₂ ein. Wasser und Energie fallen bei der Herstellung an, meist im Ausland, und liegen außerhalb der Bilanzgrenzen dieses Rechners.",
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
