import { Newsreader, Public_Sans } from "next/font/google";

/**
 * Beide Schriften werden zur Bauzeit heruntergeladen und als woff2 aus dem
 * eigenen Ursprung ausgeliefert. Zur Laufzeit gibt es keinen externen Host.
 */

/** Display: die gewachsene Stimme. Nur Hero und Abschnittsüberschriften. */
export const fontDisplay = Newsreader({
  subsets: ["latin", "latin-ext"],
  // `.font-display` uses 600 throughout the interface; no italic display text
  // is rendered, so additional variants would only add font payload.
  weight: "600",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: true
});

/** Arbeit und Oberfläche: gemessen, mit echten Tabellenziffern. */
export const fontSans = Public_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: true
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable}`;
