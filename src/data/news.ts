import type { Locale } from "@/config/site";
import type { NewsItem, NewsTranslation } from "@/types/news";

/**
 * Neuigkeiten und Veranstaltungen der Plattform. Die Liste ist bewusst kurz:
 * Auf der Startseite steht der jeweils aktuelle Ausschnitt, nicht das Archiv.
 * Sortiert wird nach Datum absteigend, damit neue Einträge nur oben ergänzt
 * werden müssen.
 */
export const newsItems: NewsItem[] = [
  {
    slug: "pflanzaktion-bozen",
    kind: "event",
    date: "2026-10-04",
    title: "Pflanzaktion Blühende Vernetzung",
    summary:
      "Auf drei Trittsteinflächen im Stadtgebiet werden Wildstauden gesetzt. Werkzeug und Einweisung sind vorhanden, Vorkenntnisse braucht es keine.",
    place: "Bozen, Grünfläche Drususallee",
    time: "09:30–13:00"
  },
  {
    slug: "feldbegehung-moorfenster",
    kind: "event",
    date: "2026-09-19",
    title: "Feldbegehung Moorfenster Pustertal",
    summary:
      "Das Projektteam zeigt die verschlossenen Entwässerungsgräben und erklärt, wie die Wasserstände an den zwölf Messpunkten erhoben werden.",
    place: "Olang, Treffpunkt Parkplatz am Steg",
    time: "14:00–16:30"
  },
  {
    slug: "monitoringbericht-streuobstwiese",
    kind: "news",
    date: "2026-09-08",
    title: "Erster Monitoringbericht der Streuobstwiese",
    summary:
      "Baumkartierung und Vegetationserhebung der ersten Pflegesaison sind ausgewertet. Der Bericht steht auf der Projektseite offen zur Verfügung."
  }
];

const newsTranslations: Record<Exclude<Locale, "de">, Record<string, NewsTranslation>> = {
  it: {
    "pflanzaktion-bozen": {
      title: "Azione di piantumazione «Rete in fiore»",
      summary:
        "Su tre aree di collegamento in città vengono messe a dimora perenni selvatiche. Attrezzi e istruzioni sono forniti sul posto, non servono conoscenze pregresse.",
      place: "Bolzano, area verde di viale Druso"
    },
    "feldbegehung-moorfenster": {
      title: "Visita guidata alla finestra sulle torbiere",
      summary:
        "Il team di progetto mostra i fossi di drenaggio chiusi e spiega come vengono rilevati i livelli dell’acqua nei dodici punti di misura.",
      place: "Valdaora, ritrovo al parcheggio della passerella"
    },
    "monitoringbericht-streuobstwiese": {
      title: "Primo rapporto di monitoraggio del frutteto",
      summary:
        "La mappatura degli alberi e il rilievo della vegetazione della prima stagione di cura sono stati valutati. Il rapporto è consultabile liberamente sulla pagina del progetto."
    }
  },
  en: {
    "pflanzaktion-bozen": {
      title: "Blooming Network planting day",
      summary:
        "Wild perennials are planted on three stepping-stone sites across the city. Tools and instructions are provided, no prior experience needed.",
      place: "Bolzano, Drususallee green space"
    },
    "feldbegehung-moorfenster": {
      title: "Peatland Window field walk",
      summary:
        "The project team shows the closed drainage ditches and explains how water levels are recorded at the twelve monitoring points.",
      place: "Olang, meeting point at the boardwalk car park"
    },
    "monitoringbericht-streuobstwiese": {
      title: "First monitoring report for the orchard",
      summary:
        "Tree survey and vegetation records from the first management season have been evaluated. The report is openly available on the project page."
    }
  }
};

export function getNewsItems(locale: Locale): NewsItem[] {
  if (locale === "de") return newsItems;
  return newsItems.map((item) => ({ ...item, ...newsTranslations[locale][item.slug] }));
}
