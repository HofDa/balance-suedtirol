import type { TourRoom } from "../model/types";

export const livingRoom: TourRoom = {
  id: "living",
  title: "Wohnzimmer",
  shortTitle: "Wohnen",
  available: true,
  description: "Elektronik, Beleuchtung, Raumtemperatur und Zimmerpflanzen im Wohnbereich.",
  questions: [
    {
      id: "living-tv-streaming",
      title: "Wie viele Stunden läuft der Bildschirm?",
      sceneLabel: "Fernseher & TV-Schrank",
      description:
        "Zwei Posten addieren sich: das Gerät im Wohnzimmer und die Rechenzentren, die den Stream ausliefern. Bei 4K ist der Anteil der Infrastruktur deutlich höher als bei HD.",
      impactText:
        "Ein großer 4K-Fernseher zieht rund 130 Watt, ein sparsames Gerät ein Drittel davon. Über fünf Stunden am Tag summiert sich der Unterschied auf mehrere hundert Kilowattstunden im Jahr.",
      tip: "Der Eco-Modus ab Werk ist meist zu dunkel eingestellt, die Standardvorgabe zu hell. Ein Zwischenwert spart spürbar, ohne dass das Bild leidet.",
      adjust: {
        label: "Bildschirmstunden pro Tag",
        unit: "Std.",
        min: 0,
        max: 12,
        step: 0.5,
        defaults: { "screen-large": 5, "screen-normal": 3, "screen-light": 1.5 },
        hint: "Nur Fernseher und Streaming, ohne Arbeitsbildschirm."
      },
      options: [
        {
          id: "screen-large",
          label: "Großer Fernseher, überwiegend 4K",
          params: { kwhPerHour: 0.21 },
          impact: { carbon: -6, resources: -5 },
        },
        {
          id: "screen-normal",
          label: "Mittleres Gerät, überwiegend HD",
          params: { kwhPerHour: 0.1 },
          impact: { carbon: 1, resources: 1 },
        },
        {
          id: "screen-light",
          label: "Kleines, sparsames Gerät",
          params: { kwhPerHour: 0.065 },
          impact: { carbon: 6, resources: 5 },
        }
      ]
    },
    {
      id: "living-lighting",
      title: "Womit beleuchtest du deine Wohnung?",
      sceneLabel: "Stehlampe & Deckenlicht",
      description:
        "Eine LED erzeugt dieselbe Helligkeit wie eine Glühlampe mit rund einem Achtel der Leistung. Bei einer Halogenlampe ist der Unterschied etwas kleiner, aber immer noch groß.",
      impactText:
        "Gerechnet wird mit drei Brennstunden am Tag über alle Leuchtstellen. Der Unterschied zwischen einem Haushalt mit Halogen und einem mit durchgehend LED liegt bei mehreren hundert Kilowattstunden im Jahr.",
      tip: "Warmweiße LEDs mit 2700 Kelvin geben dasselbe gemütliche Licht wie eine Glühlampe. Der oft beklagte kalte LED-Eindruck kommt von der falschen Farbtemperatur, nicht von der Technik.",
      adjust: {
        label: "Leuchtstellen in der Wohnung",
        unit: "Stück",
        min: 0,
        max: 40,
        step: 1,
        defaults: { "light-old": 10, "light-mixed": 10, "light-led": 10 }
      },
      options: [
        {
          id: "light-old",
          label: "Überwiegend Halogen und Glühlampen",
          params: { wattsPerLamp: 45 },
          impact: { carbon: -5, resources: -4 },
        },
        {
          id: "light-mixed",
          label: "Gemischt, teilweise schon LED",
          params: { wattsPerLamp: 20 },
          impact: { carbon: 2, resources: 1 },
        },
        {
          id: "light-led",
          label: "Durchgehend LED",
          params: { wattsPerLamp: 8 },
          impact: { carbon: 6, resources: 5 },
        }
      ]
    },
    {
      id: "living-plants",
      title: "Welche Rolle spielen Pflanzen im Wohnraum?",
      sceneLabel: "Zimmerpflanzen & Sofa",
      description:
        "Zimmerpflanzen verbessern die Luftfeuchtigkeit und den Aufenthaltskomfort. Auf CO₂, Wasser und Energie wirken sie praktisch nicht — ihr Beitrag liegt woanders.",
      impactText:
        "Grün im Alltag hält die Aufmerksamkeit für Natur wach, und das ist die Voraussetzung für jede weitere Entscheidung. Messbar ist dieser Effekt nicht, deshalb steht diese Frage bewusst ohne Zahl da.",
      tip: "Robuste Arten wie Grünlilie oder Bogenhanf brauchen wenig Wasser und verzeihen unregelmäßige Pflege.",
      scopeNote:
        "Zahlt auf keine der drei Kennzahlen ein. Diese Frage wirkt auf die Biodiversitäts-Einschätzung, nicht auf die Jahresbilanz.",
      options: [
        {
          id: "no-plants",
          label: "Keine Pflanzen im Raum",
          impact: { biodiversity: -2, resources: -1 },
        },
        {
          id: "some-plants",
          label: "Einige Zimmerpflanzen",
          impact: { biodiversity: 3, resources: 2 },
        },
        {
          id: "green-oasis",
          label: "Viel Grün und Naturmaterialien",
          impact: { biodiversity: 7, resources: 5 },
        }
      ]
    }
  ]
};
