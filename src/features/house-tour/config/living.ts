import type { TourRoom } from "../model/types";

export const livingRoom: TourRoom = {
  id: "living",
  title: "Wohnzimmer",
  shortTitle: "Wohnen",
  available: true,
  description: "Haushaltsstrom, Beleuchtung und der bewusste Umgang mit Geräten im Wohnbereich.",
  questions: [
    {
      id: "living-tv-streaming",
      title: "Wie viel Haushaltsstrom entfällt im Jahr auf dich?",
      sceneLabel: "Fernseher & TV-Schrank",
      description:
        "Der Jahresverbrauch aus der Stromrechnung umfasst Kühlgeräte, Kochen, Waschen, Spülen, Beleuchtung, Unterhaltungselektronik und weitere Geräte. Damit ist er belastbarer als einzelne Geräteschätzungen.",
      impactText:
        "Gerechnet wird dein Anteil am gemessenen Netzbezug mit dem italienischen Stromerzeugungsfaktor. Ein eigener Ökostromvertrag oder eine PV-Anlage wird in dieser vereinfachten location-based Rechnung nicht individuell gutgeschrieben.",
      tip: "Nimm den Verbrauch der letzten Jahresrechnung und teile ihn durch die Zahl der Personen. Strom für eine separat erfasste Wärmepumpe bitte abziehen.",
      adjust: {
        label: "Haushaltsstrom pro Person und Jahr",
        unit: "kWh",
        min: 0,
        max: 6000,
        step: 50,
        defaults: { "electricity-high": 2500, "electricity-medium": 1500, "electricity-low": 800 },
        hint: "Alle Haushaltsgeräte zusammen; Wärmepumpenstrom abziehen, wenn er bei Heizung steht."
      },
      options: [
        {
          id: "electricity-high",
          label: "Hoher Verbrauch",
          impact: { carbon: -6, resources: -5 },
        },
        {
          id: "electricity-medium",
          label: "Mittlerer Verbrauch",
          impact: { carbon: 1, resources: 1 },
        },
        {
          id: "electricity-low",
          label: "Niedriger Verbrauch",
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
      scopeNote:
        "Der Stromverbrauch der Beleuchtung steckt bereits im eingegebenen Haushaltsstrom. Die Antwort wird nicht zusätzlich addiert und wirkt nur auf das qualitative Profil.",
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
        "Zimmerpflanzen können Aufenthaltsqualität und Naturverbundenheit unterstützen. Ein belastbarer Beitrag zur lokalen Artenvielfalt lässt sich daraus nicht ableiten.",
      impactText:
        "Diese Frage wird nicht als Biodiversitätsmaß verwendet. Für wildlebende Arten sind Außenflächen, heimische Pflanzen und unbeleuchtete Strukturen entscheidend.",
      tip: "Robuste Arten wie Grünlilie oder Bogenhanf brauchen wenig Wasser und verzeihen unregelmäßige Pflege.",
      scopeNote:
        "Zahlt weder auf die Messwerte noch auf den Biodiversitätsindex ein; sie dient nur als Reflexionsfrage.",
      options: [
        {
          id: "no-plants",
          label: "Keine Pflanzen im Raum",
          impact: {},
        },
        {
          id: "some-plants",
          label: "Einige Zimmerpflanzen",
          impact: {},
        },
        {
          id: "green-oasis",
          label: "Viel Grün und Naturmaterialien",
          impact: {},
        }
      ]
    }
  ]
};
