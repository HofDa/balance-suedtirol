import type { TourRoom } from "../model/types";

export const mobilityRoom: TourRoom = {
  id: "mobility", title: "Mobilität", shortTitle: "Mobilität", available: true,
  description: "Alltagswege prägen Emissionen, Flächenbedarf und die Qualität unseres Lebensraums.",
  questions: [
    {
      id: "mobility-short", title: "Wie legst du Kurzstrecken zurück?", sceneLabel: "Kurzstrecke wählen",
      description: "Kurze Wege bieten besonders viel Spielraum für aktive Mobilität.",
      impactText: "Zu Fuß und mit dem Fahrrad entstehen im Betrieb kaum Emissionen; zugleich brauchen diese Wege weniger Verkehrsfläche.",
      tip: "Lege Schlüssel, Tasche und Regenschutz direkt beim Fahrrad bereit – kleine Hürden entscheiden oft über die Wahl.",
      options: [
        { id: "car", label: "Meist Auto", impact: { biodiversity: -3, carbon: -8, resources: -4 }, visualState: "car" },
        { id: "mixed", label: "Gemischt", impact: { carbon: 1, resources: 1 }, visualState: "mixed" },
        { id: "active", label: "Meist Fahrrad oder zu Fuß", impact: { biodiversity: 3, carbon: 9, resources: 5 }, visualState: "bike" }
      ]
    },
    {
      id: "mobility-km", title: "Wie viele Kilometer fallen jährlich an?", sceneLabel: "Jahreswege ansehen",
      description: "Die Kategorien sind bewusst grob und dienen der Orientierung.",
      impactText: "Weniger gefahrene Kilometer senken Energie- und Materialbedarf. Relevant sind Fahrzeug, Auslastung und Strecke zusammen.",
      tip: "Bündle Erledigungen und prüfe vor regelmäßigen Wegen die beste Alternative zum Alleinfahren.",
      options: [
        { id: "high", label: "Hoher Wert", impact: { carbon: -7, resources: -4 }, visualState: "km-high" },
        { id: "medium", label: "Mittlerer Wert", impact: { carbon: 1 }, visualState: "km-mid" },
        { id: "low", label: "Niedriger Wert", impact: { carbon: 7, resources: 4 }, visualState: "km-low" }
      ]
    },
    {
      id: "mobility-long", title: "Was nutzt du auf längeren Strecken?", sceneLabel: "Fernstrecke planen",
      description: "Die Wirkung hängt von Strecke, Auslastung und dem konkreten Verkehrsmittel ab.",
      impactText: "Öffentliche Verkehrsmittel und gut kombinierte Wege reduzieren pro Person meist Emissionen und Ressourcenbedarf.",
      tip: "Plane die erste und letzte Etappe mit: Fahrradabstellplatz, Busanschluss oder Carsharing machen Bahnwege verlässlicher.",
      options: [
        { id: "car", label: "Meist Auto", impact: { carbon: -6, resources: -3 }, visualState: "long-car" },
        { id: "public", label: "Öffentliche Verkehrsmittel", impact: { carbon: 7, resources: 4 }, visualState: "public" },
        { id: "combined", label: "Kombination verschiedener Verkehrsmittel", impact: { carbon: 5, resources: 3 }, visualState: "combined" }
      ]
    }
  ]
};
