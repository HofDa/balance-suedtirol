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
      title: "Wie heizt du dein Schlafzimmer?",
      sceneLabel: "Bett & Raumklima",
      description: "Eine Absenkung der Raumtemperatur spart spürbar Heizenergie und verbessert oft die Schlafqualität.",
      impactText: "Jedes Grad weniger Raumtemperatur spart ca. 6 % Heizenergie. Nachhaltige Dämmung reduziert Emissionen erheblich.",
      tip: "Tagsüber tüfteln: Schlafzimmer auf 16–18 °C halten und vor dem Schlafen kurz stoßlüften.",
      options: [
        { id: "high-heat", label: "Immer warm (> 20 °C)", impact: { carbon: -6, resources: -4 }, visualState: "warm" },
        { id: "moderate-heat", label: "Moderat geheizt (18–20 °C)", impact: { carbon: 2, resources: 2 }, visualState: "moderate" },
        { id: "cool-heat", label: "Kühl & sparsam (16–18 °C)", impact: { carbon: 7, resources: 5 }, visualState: "cool" }
      ]
    },
    {
      id: "bedroom-textiles",
      title: "Wie wählst du deine Kleidung & Textilien?",
      sceneLabel: "Kleiderschrank",
      description: "Fast Fashion verursacht hohe Wasserverbräuche und Mikroplastikeinträge in Ökosysteme.",
      impactText: "Second-Hand, Bio-Baumwolle und langlebige Textilien verringern den ökologischen Rucksack enorm.",
      tip: "Setze auf eine zeitlose Capsule Wardrobe und repariere Kleidung, bevor du Neues kaufst.",
      options: [
        { id: "fast-fashion", label: "Häufig Neukauf & Trends", impact: { biodiversity: -6, carbon: -5, water: -7, resources: -6 }, visualState: "fast" },
        { id: "mixed-textiles", label: "Mischung aus Neu & Secondhand", impact: { biodiversity: 2, carbon: 2, water: 2, resources: 2 }, visualState: "mixed" },
        { id: "sustainable-textiles", label: "Second-Hand & Bio-Textilien", impact: { biodiversity: 7, carbon: 6, water: 7, resources: 7 }, visualState: "eco" }
      ]
    },
    {
      id: "bedroom-standby",
      title: "Nutzt du Standby-Schalter für Elektronik?",
      sceneLabel: "Kommode & Lampen",
      description: "Versteckte Stromfresser im Standby-Betrieb summieren sich über das ganze Jahr.",
      impactText: "Kippschalter-Steckdosen verhindern heimliche Stromfresser im Schlafzimmer.",
      tip: "Nutze schaltbare Steckdosenleisten für Nachttischlampen und Ladegeräte.",
      options: [
        { id: "always-on", label: "Alles dauerhaft am Netz", impact: { carbon: -3, resources: -3 }, visualState: "standby" },
        { id: "partial-off", label: "Teilweise ausgeschaltet", impact: { carbon: 1, resources: 1 }, visualState: "partial" },
        { id: "fully-off", label: "Schaltbare Steckdosenleiste", impact: { carbon: 4, resources: 4 }, visualState: "off" }
      ]
    }
  ]
};
