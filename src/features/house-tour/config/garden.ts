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
      title: "Wie ist die Fläche rund ums Haus gestaltet?",
      sceneLabel: "Boden gestalten",
      description:
        "Hier zeigt die Bilanz eine Spannung, die man aushalten muss: Schotter braucht kein Gießwasser und schneidet beim Wasserverbrauch am besten ab — für die Artenvielfalt ist er die schlechteste aller Möglichkeiten.",
      impactText:
        "Ein Rasen braucht in trockenen Südtiroler Sommern rund 150 Liter je Quadratmeter im Jahr, ein naturnahes Beet mit angepassten Arten etwa ein Fünftel davon. Offener, durchlässiger Boden speichert Niederschlag statt ihn in die Kanalisation abzugeben.",
      tip: "Entsiegle zuerst kleine Flächen. Schon ein sonniger, unbewachsener Bodenstreifen ist für bodennistende Wildbienen wertvoll.",
      adjust: {
        label: "Bewässerte Fläche",
        unit: "m²",
        min: 0,
        max: 400,
        step: 10,
        defaults: { gravel: 60, lawn: 80, "natural-bed": 80 },
        hint: "Nur die Fläche, die du tatsächlich gießt."
      },
      options: [
        {
          id: "gravel",
          label: "Überwiegend Schotter, Pflaster oder Kies",
          params: { irrigationLitersPerSqm: 0 },
          impact: { biodiversity: -7, water: -5, resources: -2 },
        },
        {
          id: "lawn",
          label: "Gepflegter Rasen",
          params: { irrigationLitersPerSqm: 150 },
          impact: { biodiversity: 1, water: 0 },
        },
        {
          id: "natural-bed",
          label: "Naturnahes Beet mit offenen Bodenstellen",
          params: { irrigationLitersPerSqm: 30 },
          impact: { biodiversity: 7, water: 4, resources: 2 },
        }
      ]
    },
    {
      id: "garden-plants",
      title: "Welche Pflanzen wachsen hier?",
      sceneLabel: "Pflanzen auswählen",
      description:
        "Blüten über die Jahreszeiten hinweg sichern ein verlässliches Nahrungsangebot. Entscheidend ist nicht die Menge, sondern die Lücke im Spätsommer.",
      impactText:
        "Heimische Blühpflanzen sind auf lokale Insekten abgestimmt; viele Wildbienenarten können mit gefüllten Zierblüten überhaupt nichts anfangen. Auf CO₂, Wasser und Energie wirkt diese Entscheidung nicht messbar — auf die Artenvielfalt vor der Haustür sehr wohl.",
      tip: "Drei bis fünf heimische Arten mit versetzten Blühzeiten reichen aus. Samenstände über den Winter stehen lassen: sie sind Nahrung und Nistplatz zugleich.",
      scopeNote:
        "Zahlt auf keine der drei Kennzahlen ein. Die Wirkung liegt bei der Biodiversität.",
      options: [
        { id: "few", label: "Kaum Pflanzen", impact: { biodiversity: -6, water: -2 } },
        {
          id: "ornamental",
          label: "Hauptsächlich Zierpflanzen",
          impact: { biodiversity: 1, water: -1, resources: -1 },
        },
        {
          id: "native",
          label: "Heimische Blühpflanzen mit versetzten Blühzeiten",
          impact: { biodiversity: 8, water: 2, resources: 2 },
        }
      ]
    },
    {
      id: "garden-structures",
      title: "Welche Lebensräume ergänzt du?",
      sceneLabel: "Lebensräume ergänzen",
      description:
        "Ein Insektenhotel hilft nur einem kleinen Teil der Arten, und auch das nur in passender Umgebung. Die meisten Wildbienen nisten im Boden, nicht in Bohrlöchern.",
      impactText:
        "Nahrung, Niststrukturen, offene Bodenstellen und Strukturvielfalt wirken gemeinsam. Totholz und eine flache Wasserstelle unterstützen deutlich mehr Artengruppen als ein Insektenhotel allein.",
      tip: "Nächtliche Dauerbeleuchtung im Garten wieder abschalten — sie zieht nachtaktive Insekten aus der Umgebung ab und kostet sie die Nacht.",
      scopeNote:
        "Zahlt auf keine der drei Kennzahlen ein. Die Wirkung liegt bei der Biodiversität.",
      options: [
        {
          id: "none",
          label: "Keine zusätzlichen Strukturen",
          impact: { biodiversity: -4 },
        },
        {
          id: "hotel",
          label: "Nur ein Insektenhotel",
          impact: { biodiversity: 2, resources: -1 },
        },
        {
          id: "diverse",
          label: "Offene Bodenstellen, Totholz und Wasserstelle",
          impact: { biodiversity: 9, water: 2, resources: 2 },
        }
      ]
    }
  ]
};
