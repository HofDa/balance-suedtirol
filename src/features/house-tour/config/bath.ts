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
      title: "Wie duschst du?",
      sceneLabel: "Dusche & Badewanne",
      description:
        "Warmwasser ist nach der Heizung der größte Energieposten im Haushalt. Entscheidend sind zwei Größen: wie lange du duschst und wie viel Wasser der Duschkopf dabei durchlässt.",
      impactText:
        "Eine Sparbrause halbiert den Durchfluss, ohne dass die Dusche schwächer wirkt. Zusammen mit ein paar Minuten weniger spart das mehrere tausend Liter Trinkwasser und einige hundert Kilowattstunden im Jahr.",
      tip: "Miss einmal nach: Duschkopf in einen 10-Liter-Eimer halten. Ist er in unter 50 Sekunden voll, lohnt sich eine Sparbrause.",
      adjust: {
        label: "Duschminuten pro Tag",
        unit: "Min.",
        min: 0,
        max: 25,
        step: 1,
        defaults: { "bath-long": 9, "bath-normal": 6, "bath-eco": 4 },
        hint: "Im Schnitt über die Woche gerechnet, Vollbäder mitgezählt."
      },
      options: [
        {
          id: "bath-long",
          label: "Lange Duschen oder regelmäßig Vollbad",
          params: { litersPerMinute: 13 },
          impact: { carbon: -6, water: -8, resources: -5 },
        },
        {
          id: "bath-normal",
          label: "Normale Dusche, Standard-Duschkopf",
          params: { litersPerMinute: 10 },
          impact: { carbon: 1, water: 1, resources: 1 },
        },
        {
          id: "bath-eco",
          label: "Kurze Dusche mit Sparbrause",
          params: { litersPerMinute: 6.5 },
          impact: { carbon: 7, water: 8, resources: 6 },
        }
      ]
    },
    {
      id: "bath-water-heating",
      title: "Wie wird dein Warmwasser erwärmt?",
      sceneLabel: "Waschbecken",
      description:
        "Diese Antwort entscheidet mit, was jede Dusche kostet: dieselbe Menge warmes Wasser verursacht je nach System sehr unterschiedliche Emissionen. Die Zahl hier zählt das Warmwasser außerhalb der Dusche — Hände waschen, Spülen, Putzen.",
      impactText:
        "Eine Wärmepumpe holt aus einer Kilowattstunde Strom das Dreifache an Wärme. Solarthermie deckt im Sommer fast den gesamten Bedarf, ohne dass dafür Brennstoff verbrannt wird.",
      tip: "Prüfe zuerst die Speichertemperatur: viele Boiler laufen unnötig auf über 60 °C. 50 °C reichen aus und senken die Bereitschaftsverluste spürbar.",
      options: [
        {
          id: "electric-boiler",
          label: "Elektroboiler oder Durchlauferhitzer",
          params: { co2PerKwh: 0.28, efficiency: 1 },
          impact: { carbon: -5, resources: -3 },
        },
        {
          id: "gas-boiler",
          label: "Gastherme oder Ölheizung",
          params: { co2PerKwh: 0.24, efficiency: 1 },
          impact: { carbon: -2, resources: -1 },
        },
        {
          id: "heat-pump-solar",
          label: "Wärmepumpe, Solarthermie oder Biomasse-Fernwärme",
          params: { co2PerKwh: 0.28, efficiency: 3 },
          impact: { carbon: 7, resources: 5 },
        }
      ]
    },
    {
      id: "bath-toilet",
      title: "Wie viel Wasser verbraucht deine Toilettenspülung?",
      sceneLabel: "Toilette",
      description:
        "Die Spülung ist nach der Dusche der zweitgrößte Wasserposten im Haushalt. Ältere Spülkästen geben neun Liter ab, moderne Zwei-Mengen-Spülungen kommen mit drei bis vier aus.",
      impactText:
        "Trinkwasser wird aufwendig gefördert, aufbereitet und verteilt und danach als Abwasser noch einmal gereinigt. Jeder eingesparte Liter entlastet beide Seiten dieser Kette.",
      tip: "Kein Zwei-Mengen-Kasten vorhanden? Ein Spülstopp-Umbausatz kostet wenig und lässt sich meist ohne Fachbetrieb einsetzen.",
      adjust: {
        label: "Spülungen pro Tag",
        unit: "×",
        min: 0,
        max: 15,
        step: 1,
        defaults: { "flush-full": 5, "flush-mixed": 5, "flush-saving": 5 }
      },
      options: [
        {
          id: "flush-full",
          label: "Älterer Spülkasten, immer volle Spülung",
          params: { litersPerFlush: 9 },
          impact: { water: -6, resources: -2 },
        },
        {
          id: "flush-mixed",
          label: "Spartaste vorhanden, wird gelegentlich genutzt",
          params: { litersPerFlush: 6 },
          impact: { water: 2, resources: 1 },
        },
        {
          id: "flush-saving",
          label: "Zwei-Mengen-Spülung, konsequent genutzt",
          params: { litersPerFlush: 3.5 },
          impact: { water: 6, resources: 3 },
        }
      ]
    }
  ]
};
