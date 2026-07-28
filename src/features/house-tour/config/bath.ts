import type { TourRoom } from "../model/types";

export const bathRoom: TourRoom = {
  id: "bath",
  title: "Badezimmer",
  shortTitle: "Bad",
  available: true,
  description: "Wasser- und Energieverbrauch beim Duschen, Baden und Händewaschen optimieren.",
  questions: [
    {
      id: "bath-shower",
      title: "Wie lange duschst du typischerweise?",
      sceneLabel: "Dusche & Badewanne",
      description: "Warmwasser im Haushalt verbraucht nach der Heizung am meisten Energie.",
      impactText: "Kurz duschen mit einem Wasserspar-Duschkopf spart tausende Liter Trinkwasser und hunderte kWh Energie im Jahr.",
      tip: "Installiere einen Spar-Brausekopf und nutze eine Duschuhr (z. B. 5 Minuten).",
      options: [
        { id: "long-shower", label: "Lange duschen (> 10 Min.) / Vollbad", impact: { carbon: -6, water: -8, resources: -5 }, visualState: "long" },
        { id: "med-shower", label: "Normale Duschdauer (5–8 Min.)", impact: { carbon: 1, water: 1, resources: 1 }, visualState: "med" },
        { id: "eco-shower", label: "Kurz & Spar-Duschkopf (< 5 Min.)", impact: { carbon: 7, water: 8, resources: 6 }, visualState: "eco" }
      ]
    },
    {
      id: "bath-water-heating",
      title: "Wie wird dein Warmwasser erwärmt?",
      sceneLabel: "Waschbecken",
      description: "Elektrische Durchlauferhitzer haben hohe Leistungsspitzen, Solarthermie oder Wärmepumpen nutzen Erneuerbare.",
      impactText: "Warmwasser durch Wärmepumpe oder Solarthermie spart CO₂ und schont fossile Ressourcen.",
      tip: "Nutze beim Zähneputzen und Händewaschen kühles Wasser, um den Durchlauferhitzer nicht unnötig zu starten.",
      options: [
        { id: "elec-flow", label: "Elektrischer Durchlauferhitzer", impact: { carbon: -5, resources: -4 }, visualState: "elec" },
        { id: "gas-boiler", label: "Zentrale Gas- / Ölheizung", impact: { carbon: -2, resources: -2 }, visualState: "gas" },
        { id: "solar-heat", label: "Wärmepumpe oder Solarthermie", impact: { carbon: 6, resources: 5 }, visualState: "solar" }
      ]
    },
    {
      id: "bath-toilet",
      title: "Nutzt du die Wasserspartaste am WC?",
      sceneLabel: "Toilette",
      description: "Spülkästen verbrauchen ohne Sparfunktion 6–9 Liter pro Spülung.",
      impactText: "Mit der 3-Liter-Taste lässt sich der Trinkwasserverbrauch der Toilette halblieren.",
      tip: "Eine Zwei-Mengen-Spülung nachrüsten oder den Stop-Knopf konsequent drücken.",
      options: [
        { id: "full-flush", label: "Immer volle Spülung", impact: { water: -6, resources: -3 }, visualState: "full" },
        { id: "stop-button", label: "Gelegentlich Spülstopp", impact: { water: 2, resources: 1 }, visualState: "stop" },
        { id: "dual-flush", label: "Zwei-Mengen-Spülung / Regennutzung", impact: { water: 7, resources: 4 }, visualState: "dual" }
      ]
    }
  ]
};
