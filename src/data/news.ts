import type { Locale } from "@/config/site";
import type { NewsItem, NewsTranslation } from "@/types/news";

/**
 * Neuigkeiten und Veranstaltungen der Plattform. Die Liste ist bewusst kurz:
 * Auf der Startseite steht der jeweils aktuelle Ausschnitt, nicht das Archiv.
 * Sortiert wird nach Datum absteigend, damit neue Einträge nur oben ergänzt
 * werden müssen.
 */
export const newsItems: NewsItem[] = [];

const newsTranslations: Record<Exclude<Locale, "de">, Record<string, NewsTranslation>> = {
  it: {},
  en: {}
};

export function getNewsItems(locale: Locale): NewsItem[] {
  if (locale === "de") return newsItems;
  return newsItems.map((item) => ({ ...item, ...newsTranslations[locale][item.slug] }));
}
