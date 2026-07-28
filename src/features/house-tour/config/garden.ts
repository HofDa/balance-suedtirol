import type { TourRoom } from "../model/types";

export const gardenRoom: TourRoom = {
  id: "garden",
  title: "Garten",
  shortTitle: "Garten",
  available: true,
  description: "Ein lebendiger Garten entsteht aus Nahrung, Nistplätzen und vielfältigen Strukturen.",
  questions: [
    {
      id: "garden-ground",
      title: "Wie gestaltest du den Boden?",
      sceneLabel: "Boden gestalten",
      description: "Durchlässiger, unversiegelter Boden speichert Wasser und schafft Lebensraum.",
      impactText: "Offene Bodenstellen sind für viele bodennistende Wildbienen entscheidend. Ein naturnahes Beet verbindet Wasserrückhalt und Artenvielfalt.",
      tip: "Entsiegle zuerst kleine Flächen. Schon ein sonniger, unbewachsener Bodenstreifen kann wertvoll sein.",
      options: [
        { id: "gravel", label: "Schotterfläche", impact: { biodiversity: -7, water: -5, resources: -2 }, visualState: "gravel" },
        { id: "lawn", label: "Rasen", impact: { biodiversity: 1, water: 0 }, visualState: "lawn" },
        { id: "natural-bed", label: "Naturnahes Beet", impact: { biodiversity: 7, water: 4, resources: 2 }, visualState: "natural" }
      ]
    },
    {
      id: "garden-plants",
      title: "Welche Pflanzen wachsen hier?",
      sceneLabel: "Pflanzen auswählen",
      description: "Blüten über die Jahreszeiten hinweg sichern ein verlässliches Nahrungsangebot.",
      impactText: "Heimische Blühpflanzen sind auf lokale Insekten abgestimmt. Entscheidend ist ein vielfältiges Angebot vom Frühling bis in den Herbst.",
      tip: "Wähle drei bis fünf heimische Arten mit versetzten Blühzeiten und lasse Samenstände über den Winter stehen.",
      options: [
        { id: "few", label: "Kaum Pflanzen", impact: { biodiversity: -6, water: -2 }, visualState: "few" },
        { id: "ornamental", label: "Hauptsächlich Zierpflanzen", impact: { biodiversity: 1, water: -1, resources: -1 }, visualState: "ornamental" },
        { id: "native", label: "Heimische Blühpflanzen", impact: { biodiversity: 8, water: 2, resources: 2 }, visualState: "native" }
      ]
    },
    {
      id: "garden-structures",
      title: "Welche Lebensräume ergänzt du?",
      sceneLabel: "Lebensräume ergänzen",
      description: "Ein Insektenhotel hilft nur einem Teil der Arten – und nur in passender Umgebung.",
      impactText: "Nahrung, Niststrukturen, offene Bodenstellen und Strukturvielfalt wirken gemeinsam. Totholz und Wasserstellen unterstützen deutlich mehr Artengruppen als ein Insektenhotel allein.",
      tip: "Lass etwas Totholz liegen, halte eine flache Wasserstelle sauber und vermeide nächtliche Dauerbeleuchtung.",
      options: [
        { id: "none", label: "Keine zusätzlichen Strukturen", impact: { biodiversity: -4 }, visualState: "none" },
        { id: "hotel", label: "Nur Insektenhotel", impact: { biodiversity: 2, resources: -1 }, visualState: "hotel" },
        { id: "diverse", label: "Offene Bodenstellen, Totholz und Wasserstelle", impact: { biodiversity: 9, water: 2, resources: 2 }, visualState: "diverse" }
      ]
    }
  ]
};
