import type { TourRoom } from "../model/types";

export const kitchenRoom: TourRoom = {
  id: "kitchen",
  title: "Küche",
  shortTitle: "Küche",
  available: true,
  description: "Was auf dem Teller landet, verbindet Flächennutzung, Klima und Ressourcen.",
  questions: [
    {
      id: "kitchen-diet",
      title: "Wie oft steht Fleisch auf dem Teller?",
      sceneLabel: "Kühlschrank",
      description:
        "Die Ernährung ist nach Wohnen und Mobilität der drittgrößte Posten — und der einzige, bei dem sich mehrmals täglich neu entscheiden lässt.",
      impactText:
        "Gerechnet wird mit einem Sockel von rund 950 kg CO₂e für eine überwiegend pflanzliche Kost und einem Aufschlag von etwa 105 kg für jede Fleischmahlzeit, die wöchentlich dazukommt. Rind wiegt dabei deutlich schwerer als Geflügel.",
      tip: "Der größte Sprung liegt zwischen täglich und mehrmals wöchentlich. Zwei feste fleischfreie Tage bringen mehr als jeder Verzicht auf Verpackungen.",
      scopeNote:
        "Zählt nur auf CO₂ ein. Das Wasser hinter der Ernährung ist virtuelles Wasser aus den Anbauregionen und liegt außerhalb der Bilanzgrenze.",
      adjust: {
        label: "Fleischmahlzeiten pro Woche",
        unit: "Mahlz.",
        min: 0,
        max: 21,
        step: 1,
        defaults: { "diet-meat": 12, "diet-mixed": 6, "diet-plant": 1 },
        hint: "Wurst und Aufschnitt als halbe Mahlzeit rechnen."
      },
      options: [
        {
          id: "diet-meat",
          label: "Fast täglich Fleisch",
          impact: { biodiversity: -5, carbon: -8, water: -4, resources: -4 },
        },
        {
          id: "diet-mixed",
          label: "Mehrmals pro Woche Fleisch",
          impact: { biodiversity: 1, carbon: 1, water: 0, resources: 1 },
        },
        {
          id: "diet-plant",
          label: "Überwiegend pflanzlich",
          impact: { biodiversity: 6, carbon: 8, water: 4, resources: 5 },
        }
      ]
    },
    {
      id: "kitchen-origin",
      title: "Wie viel davon ist regional und saisonal?",
      sceneLabel: "Lebensmittel & Herkunft",
      description:
        "Die Entfernung allein sagt wenig. Entscheidend ist die Kombination: Flugware und beheizte Gewächshäuser wiegen weit schwerer als ein LKW-Transport aus dem Nachbarland.",
      impactText:
        "Der volle Aufschlag für importierte und außersaisonale Ware liegt bei etwa 400 kg CO₂e im Jahr. Wer überwiegend regional und saisonal einkauft, drückt ihn auf ein Sechstel.",
      tip: "Ein Saisonkalender an der Kühlschranktür ist wirksamer als jede Herkunftsregel — Tomaten im Januar sind das Problem, nicht Tomaten an sich.",
      scopeNote: "Zählt nur auf CO₂ ein, wie alle Fragen zur Ernährung.",
      adjust: {
        label: "Anteil regional und saisonal",
        unit: "%",
        min: 0,
        max: 100,
        step: 5,
        defaults: { "origin-imported": 15, "origin-partial": 50, "origin-seasonal": 85 }
      },
      options: [
        {
          id: "origin-imported",
          label: "Überwiegend importiert, unabhängig von der Saison",
          impact: { carbon: -4, resources: -3 },
        },
        {
          id: "origin-partial",
          label: "Teilweise regional",
          impact: { carbon: 2, resources: 1 },
        },
        {
          id: "origin-seasonal",
          label: "Überwiegend regional und saisonal",
          impact: { biodiversity: 2, carbon: 5, resources: 4 },
        }
      ]
    },
    {
      id: "kitchen-waste",
      title: "Wie viel Essen landet im Müll?",
      sceneLabel: "Esstisch & Vorräte",
      description:
        "Weggeworfene Lebensmittel sind der teuerste Posten überhaupt: Anbau, Transport, Kühlung und Verarbeitung haben bereits stattgefunden, der Nutzen fällt aus.",
      impactText:
        "Jedes Kilogramm weggeworfener Lebensmittel bringt im Schnitt rund 2,5 kg CO₂e mit. In italienischen Haushalten landen pro Person etwa 65 kg im Jahr im Müll.",
      tip: "Eine sichtbare Restebox auf Augenhöhe im Kühlschrank wirkt zuverlässiger als jeder Einkaufsplan.",
      scopeNote: "Zählt nur auf CO₂ ein, wie alle Fragen zur Ernährung.",
      adjust: {
        label: "Weggeworfene Lebensmittel pro Woche",
        unit: "kg",
        min: 0,
        max: 8,
        step: 0.1,
        defaults: { "waste-often": 2.5, "waste-sometimes": 1.2, "waste-planned": 0.4 },
        hint: "Ein voller Brotlaib wiegt rund 0,7 kg."
      },
      options: [
        {
          id: "waste-often",
          label: "Regelmäßig, oft Verdorbenes",
          impact: { carbon: -5, water: -4, resources: -7 },
        },
        {
          id: "waste-sometimes",
          label: "Gelegentlich Reste",
          impact: { carbon: 1, water: 1, resources: 1 },
        },
        {
          id: "waste-planned",
          label: "Kaum etwas, gute Planung und Resteverwertung",
          impact: { carbon: 5, water: 4, resources: 7 },
        }
      ]
    }
  ]
};
