import type { TourRoom } from "../model/types";

export const kitchenRoom: TourRoom = {
  id: "kitchen", title: "Küche", shortTitle: "Küche", available: true,
  description: "Was auf dem Teller landet, verbindet Flächennutzung, Klima und Ressourcen.",
  questions: [
    {
      id: "kitchen-diet", title: "Wie sieht deine Ernährung aus?", sceneLabel: "Kühlschrank",
      description: "Die Auswahl bildet typische Tendenzen ab, keine persönliche Ökobilanz.",
      impactText: "Eine stärker pflanzliche Ernährung kann Flächenbedarf und Emissionen deutlich reduzieren und damit Lebensräume entlasten.",
      tip: "Beginne mit zwei festen pflanzlichen Gerichten, die unkompliziert in deinen Alltag passen.",
      options: [
        { id: "meat", label: "Häufig Fleisch", impact: { biodiversity: -5, carbon: -8, water: -4, resources: -4 }, visualState: "meat" },
        { id: "mixed", label: "Gemischte Ernährung", impact: { biodiversity: 1, carbon: 1, water: 0, resources: 1 }, visualState: "mixed" },
        { id: "plant", label: "Überwiegend pflanzlich", impact: { biodiversity: 6, carbon: 8, water: 4, resources: 5 }, visualState: "plant" }
      ]
    },
    {
      id: "kitchen-origin", title: "Woher kommen deine Lebensmittel?", sceneLabel: "Lebensmittel & Herkunft",
      description: "Saisonalität und Produktionsweise sind ebenso wichtig wie Entfernung.",
      impactText: "Regional und saisonal kann Transport, Kühlung und Verpackung reduzieren. Die vereinfachte Darstellung bewertet keine Einzelprodukte.",
      tip: "Ein Saisonkalender macht regionale Entscheidungen leichter – besonders bei Obst und Gemüse.",
      options: [
        { id: "imported", label: "Überwiegend importiert", impact: { carbon: -4, resources: -3 }, visualState: "imported" },
        { id: "partial", label: "Teilweise regional", impact: { carbon: 2, resources: 1 }, visualState: "partial" },
        { id: "seasonal", label: "Überwiegend regional und saisonal", impact: { biodiversity: 2, carbon: 5, resources: 4 }, visualState: "seasonal" }
      ]
    },
    {
      id: "kitchen-waste", title: "Wie gehst du mit Resten um?", sceneLabel: "Esstisch & Vorräte",
      description: "Gute Planung vermeidet, dass bereits eingesetzte Ressourcen verloren gehen.",
      impactText: "Weniger Lebensmittelabfall spart die gesamte Wirkung aus Anbau, Verarbeitung, Kühlung und Transport.",
      tip: "Plane zuerst mit vorhandenen Vorräten und richte im Kühlschrank eine gut sichtbare Restebox ein.",
      options: [
        { id: "often", label: "Häufige Abfälle", impact: { carbon: -5, water: -4, resources: -7 }, visualState: "waste-high" },
        { id: "sometimes", label: "Gelegentliche Abfälle", impact: { carbon: 1, water: 1, resources: 1 }, visualState: "waste-mid" },
        { id: "planned", label: "Gute Planung und Resteverwertung", impact: { carbon: 5, water: 4, resources: 7 }, visualState: "waste-low" }
      ]
    }
  ]
};
