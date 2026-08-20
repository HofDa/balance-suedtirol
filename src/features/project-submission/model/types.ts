import type { Locale } from "@/config/site";

/**
 * Beschriftungen liegen am Feld, nicht an der Sprache.
 *
 * Die übrigen Textquellen des Projekts sind sprachzuerst aufgebaut
 * (`translations.ts`, `project-categories.ts`) — bei drei Sprachen und einer
 * Handvoll Schlüsseln ist das übersichtlich. Dieses Formular hat rund 45
 * Felder mit Beschriftung, Platzhalter und Hinweis. Sprachzuerst wären das
 * drei parallele Bäume, deren Reihenfolge nichts erzwingt; ein verrutschter
 * Eintrag fiele erst im Italienischen auf. Hier hält TypeScript stattdessen
 * jedes einzelne Feld vollständig: fehlt eine Sprache, bricht der Build.
 */
export type LocalizedText = Record<Locale, string>;

export type FieldKind =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "number"
  | "textarea"
  | "select"
  | "checkboxes"
  | "consent";

export type FieldOption = { value: string; label: LocalizedText };

export type Field = {
  id: string;
  kind: FieldKind;
  label: LocalizedText;
  placeholder?: LocalizedText;
  hint?: LocalizedText;
  required?: boolean;
  /** Halbe Breite im Zweispalter ab `sm` — für kurze, verwandte Angaben. */
  half?: boolean;
  options?: FieldOption[];
  /**
   * Optionen, die nicht im Formular stehen, sondern aus der
   * Plattformkonfiguration kommen. So kann die Lebensraumliste nicht von den
   * Filtern und Projektkarten abweichen.
   */
  optionsFrom?: "habitats";
  /** Nur für `number`: Schrittweite und Einheit für die Zusammenfassung. */
  step?: string;
  unit?: "ha" | "km" | "m" | "eur";
};

export type FieldGroup = {
  title: LocalizedText;
  fields: Field[];
};

export type FormStep = {
  id: string;
  /** Kurzform für die Schrittleiste; deckt sich mit der Journey der Übersichtsseite. */
  title: LocalizedText;
  /** Ein Satz darüber, was dieser Schritt klärt. */
  intro: LocalizedText;
  groups: FieldGroup[];
};

/** Text für die meisten Felder, Liste für Mehrfachauswahl, Bool für die Einwilligung. */
export type FieldValue = string | string[] | boolean;

export type FormValues = Record<string, FieldValue>;

export type FieldErrors = Record<string, string>;
