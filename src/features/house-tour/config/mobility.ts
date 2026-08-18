import type { TourRoom } from "../model/types";

export const mobilityRoom: TourRoom = {
  id: "mobility",
  title: "Mobilität",
  shortTitle: "Mobilität",
  available: true,
  description: "Alltagswege prägen Emissionen, Flächenbedarf und die Qualität unseres Lebensraums.",
  questions: [
    {
      id: "mobility-short",
      title: "Wie legst du kurze Wege unter fünf Kilometern zurück?",
      sceneLabel: "Kurzstrecke wählen",
      description:
        "Auf den ersten Kilometern ist der Motor kalt. Der Verbrauch liegt dann deutlich über dem Normwert, der Katalysator arbeitet noch nicht richtig.",
      impactText:
        "Kurzstrecken sind der Bereich mit dem größten Spielraum: Ziel und Zeitbedarf ändern sich kaum, der Fußabdruck fällt auf ein Fünfzigstel.",
      tip: "Die Entscheidung fällt an der Haustür. Wenn Helm, Schlüssel und Regenjacke beim Rad liegen und das Auto zwei Straßen weiter parkt, kippt die Wahl von selbst.",
      adjust: {
        label: "Kurzstrecken-Kilometer pro Woche",
        unit: "km",
        min: 0,
        max: 200,
        step: 5,
        defaults: { car: 60, mixed: 50, active: 45 },
        hint: "Einkauf, Schule, Arbeit, Besuche — alles unter fünf Kilometern."
      },
      options: [
        {
          id: "car",
          label: "Fast immer mit dem Auto",
          params: { co2PerKm: 0.24, kwhPerKm: 0.75 },
          impact: { biodiversity: -3, carbon: -8, resources: -4 },
        },
        {
          id: "mixed",
          label: "Gemischt, je nach Wetter und Zeit",
          params: { co2PerKm: 0.13, kwhPerKm: 0.4 },
          impact: { carbon: 1, resources: 1 },
        },
        {
          id: "active",
          label: "Fast immer zu Fuß, mit Rad oder E-Bike",
          params: { co2PerKm: 0.005, kwhPerKm: 0.01 },
          impact: { biodiversity: 3, carbon: 9, resources: 5 },
        }
      ]
    },
    {
      id: "mobility-km",
      title: "Wie viele Auto-Kilometer kommen sonst im Jahr zusammen?",
      sceneLabel: "Jahreswege ansehen",
      description:
        "Alles außer den Kurzstrecken von eben: Pendeln, Ausflüge, Besorgungen. Ein Blick auf den Tachostand vom letzten Jahr trifft es genauer als jede Schätzung.",
      impactText:
        "Für die meisten Menschen ist dies der größte Einzelposten der gesamten Bilanz. Ein Elektroauto senkt ihn im italienischen Strommix auf etwa ein Viertel, gefahrene Kilometer einzusparen wirkt darüber hinaus.",
      tip: "Vor der Frage nach dem Antrieb steht die nach der Auslastung: zwei Personen im Auto halbieren den Wert pro Kopf sofort.",
      adjust: {
        label: "Auto-Kilometer pro Jahr",
        unit: "km",
        min: 0,
        max: 40000,
        step: 500,
        defaults: { "car-combustion": 12000, "car-efficient": 10000, "car-electric": 9000, "car-none": 0 },
        hint: "Als Fahrer oder Beifahrer, geteilt durch die Zahl der Mitfahrenden."
      },
      options: [
        {
          id: "car-combustion",
          label: "Benzin oder Diesel",
          params: { co2PerKm: 0.22, kwhPerKm: 0.66 },
          impact: { carbon: -7, resources: -4 },
        },
        {
          id: "car-efficient",
          label: "Kleinwagen oder Hybrid",
          params: { co2PerKm: 0.14, kwhPerKm: 0.42 },
          impact: { carbon: 1 },
        },
        {
          id: "car-electric",
          label: "Elektroauto",
          params: { co2PerKm: 0.055, kwhPerKm: 0.19 },
          impact: { carbon: 5, resources: 2 },
        },
        {
          id: "car-none",
          label: "Kein Auto im Haushalt",
          params: { co2PerKm: 0, kwhPerKm: 0 },
          impact: { carbon: 7, resources: 4, biodiversity: 2 },
        }
      ]
    },
    {
      id: "mobility-long",
      title: "Womit reist du auf langen Strecken?",
      sceneLabel: "Fernstrecke planen",
      description:
        "Eine einzige Flugreise kann mehr wiegen als ein ganzes Jahr Alltagsmobilität. Deshalb steht sie hier als eigene Option und nicht in einer Sammelkategorie.",
      impactText:
        "Gerechnet wird pro Personenkilometer: Bahn rund 0,035 kg CO₂e, Auto mit zwei Personen etwa 0,15 kg, Flugzeug rund 0,25 kg. Die Klimawirkung des Fliegens liegt durch Effekte in großer Höhe noch einmal deutlich höher.",
      tip: "Ein Nachtzug ersetzt eine Übernachtung und einen Flug zugleich. Bei Strecken bis rund 1.000 Kilometern ist die Bahn von Tür zu Tür oft nicht einmal langsamer.",
      adjust: {
        label: "Fernreise-Kilometer pro Jahr",
        unit: "km",
        min: 0,
        max: 30000,
        step: 500,
        defaults: { "long-car": 3000, "long-transit": 4000, "long-flight": 6000 },
        hint: "Hin- und Rückweg zusammen. Rom und zurück sind ab Bozen rund 1.400 km."
      },
      options: [
        {
          id: "long-car",
          label: "Meist mit dem Auto",
          params: { co2PerKm: 0.15, kwhPerKm: 0.45 },
          impact: { carbon: -6, resources: -3 },
        },
        {
          id: "long-transit",
          label: "Meist mit Bahn oder Fernbus",
          params: { co2PerKm: 0.035, kwhPerKm: 0.09 },
          impact: { carbon: 7, resources: 4 },
        },
        {
          id: "long-flight",
          label: "Regelmäßig mit dem Flugzeug",
          params: { co2PerKm: 0.25, kwhPerKm: 0.75 },
          impact: { carbon: -9, resources: -5 },
        }
      ]
    }
  ]
};
