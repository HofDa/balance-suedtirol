/** Neuigkeit oder Veranstaltung für die Startseite. */
export type NewsKind = "news" | "event";

export type NewsItem = {
  slug: string;
  kind: NewsKind;
  /** ISO-Datum (YYYY-MM-DD). Bei Veranstaltungen der Termin, bei Neuigkeiten das Veröffentlichungsdatum. */
  date: string;
  title: string;
  summary: string;
  /** Nur bei Veranstaltungen: Ort und Uhrzeit. */
  place?: string;
  time?: string;
};

/** Übersetzbare Felder — Datum, Art und Uhrzeit bleiben sprachunabhängig. */
export type NewsTranslation = Partial<Pick<NewsItem, "title" | "summary" | "place">>;
