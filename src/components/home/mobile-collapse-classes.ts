/**
 * Was ein mobil zugeklappter Abschnitt verbirgt. Eigene Datei ohne
 * "use client": Server-Komponenten brauchen die Klassenkette als Text,
 * nicht als Client-Referenz.
 */
export const hiddenWhenCollapsed = "max-sm:group-data-[open=false]/collapse:hidden";

/**
 * Überschrift neben dem Pfeil: Platz rechts für den Schalter. Lange
 * Komposita wie „Kompensationsrechner“ passen dann mobil nicht mehr in eine
 * Zeile – sie trennen, und wo der Browser kein Wörterbuch hat, brechen sie um.
 */
export const collapsibleHeading = "max-sm:pr-14 max-sm:hyphens-auto break-words";
