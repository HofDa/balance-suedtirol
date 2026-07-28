/**
 * Fokusringe des Systems.
 *
 * Vorher stand der Ring 23-mal ausgeschrieben in zehn Dateien, mit drei Farben
 * und uneinheitlichem Offset. Welcher Ring gilt, hängt nicht vom Element ab,
 * sondern vom Untergrund, auf dem es liegt:
 *
 * - `focusRing`      auf Bergpapier und Weiß (öffentliche Seiten)
 * - `focusRingTool`  im Lebensraum-Check, wo Almgold die Bedienebene markiert
 * - `focusRingOnDark` auf Tannentinte und Fotografie
 *
 * Der Offset braucht eine Bezugsfarbe, sonst zeichnet er auf dem Elternteil.
 * Deshalb bringt jede Variante ihre eigene `ring-offset`-Farbe mit.
 */

const base = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const focusRing = `${base} focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-[var(--color-paper)]`;

export const focusRingTool = `${base} focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-white`;

export const focusRingOnDark = `${base} focus-visible:ring-white focus-visible:ring-offset-[var(--color-ink)]`;

/**
 * Für Elemente, die ihren Ring bündig am eigenen Rand tragen müssen — etwa
 * Karten, deren Ring sonst in die Nachbarkarte ragt.
 */
export const focusRingFlush =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)]";
