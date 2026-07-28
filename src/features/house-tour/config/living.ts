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
      title: "Wie viel nutzt du TV & Streaming?",
      sceneLabel: "Fernseher & TV-Schrank",
      description: "Große Bildschirme und 4K-Streaming erzeugen sowohl zu Hause als auch in Rechenzentren Energiebedarf.",
      impactText: "Auflösung anpassen (z. B. HD statt 4K) und Bildschirmgröße bewusst wählen reduziert Rechenzentrum-Emissionen.",
      tip: "Nutze am TV einen automatischen Timer oder Schaltersteckdose gegen Standby.",
      options: [
        { id: "heavy-streaming", label: "Viel 4K-Streaming & großer TV", impact: { carbon: -6, resources: -5 }, visualState: "heavy" },
        { id: "mod-streaming", label: "Moderates Streaming / HD", impact: { carbon: 1, resources: 1 }, visualState: "mod" },
        { id: "low-streaming", label: "Sparsamer Bildschirm & wenig Streaming", impact: { carbon: 6, resources: 5 }, visualState: "low" }
      ]
    },
    {
      id: "living-lighting",
      title: "Welche Beleuchtung nutzt du im Wohnbereich?",
      sceneLabel: "Stehlampe & Deckenlicht",
      description: "LED-Leuchtmittel verbrauchen bis zu 85 % weniger Strom als Halogen- oder Glühlampen.",
      impactText: "Vollständige Umstellung auf LED und effizientes Schalten entlastet das Stromnetz.",
      tip: "Nutze warmweiße LEDs (2700 K) für gemütliches Licht bei minimalem Energiebedarf.",
      options: [
        { id: "old-lights", label: "Halogen- & Glühlampen", impact: { carbon: -5, resources: -4 }, visualState: "old" },
        { id: "mixed-lights", label: "Teilweise LEDs", impact: { carbon: 2, resources: 1 }, visualState: "mixed" },
        { id: "all-led", label: "100 % effiziente LEDs", impact: { carbon: 6, resources: 5 }, visualState: "led" }
      ]
    },
    {
      id: "living-plants",
      title: "Welche Rolle spielen Pflanzen & Wohnklima?",
      sceneLabel: "Zimmerpflanzen & Sofa",
      description: "Zimmerpflanzen verbessern die Luftfeuchtigkeit und filtern Schadstoffe.",
      impactText: "Ein grünes Wohnumfeld fördert Wohlbefinden und bewusste Naturverbindung im Alltag.",
      tip: "Einheimische Zimmerpflanzen oder robustes Grün benötigen wenig Pflege und erfrischen die Raumluft.",
      options: [
        { id: "no-plants", label: "Keine Pflanzen im Raum", impact: { biodiversity: -2, resources: -1 }, visualState: "none" },
        { id: "some-plants", label: "Einige Zimmerpflanzen", impact: { biodiversity: 3, resources: 2 }, visualState: "some" },
        { id: "green-oasis", label: "Viele grüne Pflanzen & Naturmaterialien", impact: { biodiversity: 7, resources: 5 }, visualState: "oasis" }
      ]
    }
  ]
};
