/**
 * Zustandswechsel mit räumlicher Kontinuität, wo der Browser sie anbietet.
 *
 * Gedacht für Fälle, in denen sich eine Menge sichtbarer Elemente ändert und
 * der Sprung sonst unerklärt bliebe — etwa wenn aus drei Projektkarten eine
 * wird. Der Browser blendet den alten Stand aus, den neuen ein und verschiebt
 * gleich benannte Elemente an ihre neue Position.
 *
 * Bewusst ohne Bibliothek: Die View-Transitions-API kostet nichts im Bundle.
 * Wo sie fehlt (derzeit Firefox) oder wo jemand reduzierte Bewegung eingestellt
 * hat, läuft die Aktualisierung sofort durch — also genau das bisherige
 * Verhalten. Ein Zustandswechsel darf nie davon abhängen, dass eine Animation
 * verfügbar ist.
 */
type StartViewTransition = (callback: () => void) => { finished: Promise<void> };

export function withViewTransition(update: () => void) {
  const start = (document as Document & { startViewTransition?: StartViewTransition })
    .startViewTransition;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof start !== "function" || prefersReducedMotion) {
    update();
    return;
  }

  start.call(document, update);
}
