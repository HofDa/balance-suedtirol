/**
 * Takt des Höhenschnitts (biodiversity-richness.tsx): Das Gelände wächst in
 * rund 1,9 s bergauf (scripts/build-richness-profile.py), danach erscheinen die
 * Nummern nacheinander, jede zusammen mit ihrer Legendenspalte bzw. -karte.
 */
export const RICHNESS_MARKER_START = 2100;
export const RICHNESS_MARKER_STEP = 600;

export function richnessMarkerDelay(factor: number) {
  return RICHNESS_MARKER_START + factor * RICHNESS_MARKER_STEP;
}
