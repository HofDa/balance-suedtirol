import type { Locale } from "../config/site";

/** Ein Wert je Sprache. Fehlt eine Sprache, meldet der Compiler es. */
export type Localized<T> = Record<Locale, T>;

/** BCP-47-Tags für `Intl`- und `toLocaleDateString`-Aufrufe. */
export const localeTags: Localized<string> = { de: "de-IT", it: "it-IT", en: "en-GB" };

/**
 * Weitet Literaltypen einer `as const`-Vorlage auf ihre Basistypen auf, behält
 * aber Objektschlüssel und Tupellängen bei. Damit lässt sich prüfen, dass alle
 * Sprachen dieselbe Struktur haben, ohne dieselben Texte zu verlangen.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly unknown[]
        ? { readonly [K in keyof T]: Widen<T[K]> }
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T;
