/**
 * Die Schriftstufen des Systems als Klassen.
 *
 * Wie `chip.ts` und `focus.ts` bewusst Klassenketten und keine Komponenten:
 * Die Stufe hängt an der Gestalt, nicht am Element. Ob eine Überschrift ein
 * `h1`, `h2` oder `h3` ist, entscheidet die Seitengliederung. Abstand und
 * Farbe gehören an die Verwendungsstelle, weil dieselbe Stufe auf Papier
 * Tinte und auf dunklem Grund Weiß trägt.
 */

/** Seitentitel und große Aussagen. */
export const textDisplay =
  "font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]";

/** Abschnittsüberschriften. */
export const textHeadline =
  "font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]";

/** Kartentitel und Zwischenüberschriften. */
export const textTitle =
  "text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)]";

/** Wie `textTitle`, mit engerer Laufweite für Titel in größerem Umfeld. */
export const textTitleTight = `${textTitle} tracking-[-0.02em]`;

/** Einleitungsabsatz in gedämpfter Farbe, auf lesbare Zeilenlänge begrenzt. */
export const textLead =
  "max-w-[58ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]";
