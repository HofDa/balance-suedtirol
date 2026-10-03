import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { europeFillTop, europePaths, europeViewBox } from "./europe-map";

type Region = "eurozone" | "eu";

/**
 * Europa als Silhouette, die betroffene Fläche (Euroraum oder EU) von unten
 * in Almmoos gefüllt – flächentreu bis zum Anteil der Zahl daneben. Das übrige
 * Europa bleibt leiser Grund. Rein dekorativ: Die Zahl steht als Text daneben.
 *
 * Die Füllung liegt als zweite Ebene darüber und wird per `clip-path` von
 * unten aufgedeckt; die Bewegung steht in globals.css (`europe-fill`).
 *
 * Jede Fläche trägt eine runde Kontur in ihrer eigenen Farbe: Die Länder sind
 * einzeln vereinfacht, die Kontur schließt die Spalten zwischen ihnen und
 * rundet die Küsten. Darum deckende Farben statt Transparenz – überlappende
 * Konturen gäben sonst hellere Nähte.
 */
const shape = { strokeWidth: 2.4, strokeLinejoin: "round", strokeLinecap: "round" } as const;
export function EuropeFill({ region, className }: { region: Region; className?: string }) {
  const top = region === "eurozone" ? europeFillTop.eurozone75 : europeFillTop.eu23;
  const target = region === "eurozone" ? europePaths.eurozone : `${europePaths.eurozone}${europePaths.euOnly}`;
  const rest = region === "eurozone" ? `${europePaths.euOnly}${europePaths.other}` : europePaths.other;

  return (
    <div aria-hidden className={cn("relative", className)}>
      <svg viewBox={europeViewBox} className="block h-auto w-full" fill="currentColor">
        <path d={rest} {...shape} className="text-[color-mix(in_srgb,white_7%,var(--color-ink))]" stroke="currentColor" />
        <path d={target} {...shape} className="text-[color-mix(in_srgb,white_16%,var(--color-ink))]" stroke="currentColor" />
      </svg>
      <div className="europe-fill absolute inset-0" style={{ "--fill-top": `${top}%` } as CSSProperties}>
        <svg viewBox={europeViewBox} className="block h-auto w-full text-[var(--color-moss)]" fill="currentColor">
          <path d={target} {...shape} stroke="currentColor" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Drei vereinfachte 1-Euro-Münzen, zwei davon gefüllt: zwei Drittel der
 * Wertschöpfung hängen von der Natur ab. Wie die echte Münze zweifarbig, Ring
 * und Kern, darauf „1 €“; die dritte steht nur als Umriss. Rein dekorativ.
 * Steht in einem Rahmen mit dem Seitenverhältnis der Karte, damit die Zahlen
 * darunter auf einer Linie stehen. Bewegung in globals.css (`euro-coin`).
 */
export function EuroCoins({ filled, total, className }: { filled: number; total: number; className?: string }) {
  const [, , w, h] = europeViewBox.split(" ");
  return (
    <div
      aria-hidden
      className={cn("flex aspect-[var(--map-ratio)] items-center gap-[6%]", className)}
      style={{ "--map-ratio": `${w}/${h}` } as CSSProperties}
    >
      {Array.from({ length: total }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 64 64"
          className="euro-coin w-[29%]"
          // Nach Karte (bis 1.9 s) und ihrem Text fallen die Münzen; ihr Text folgt ab 4 s.
          style={{ "--coin-delay": `${2600 + index * 260}ms` } as CSSProperties}
        >
          {index < filled ? (
            <>
              <circle cx="32" cy="32" r="31" className="fill-[var(--color-moss)]" />
              <circle cx="32" cy="32" r="21" className="fill-[color-mix(in_srgb,var(--color-moss)_72%,var(--color-ink))]" />
              <text x="32" y="38.5" textAnchor="middle" className="fill-[var(--color-ink)] font-display text-[19px]">
                1€
              </text>
            </>
          ) : (
            <>
              <circle cx="32" cy="32" r="30" fill="none" className="stroke-white/30" strokeWidth="1.5" />
              <circle cx="32" cy="32" r="21" fill="none" className="stroke-white/20" strokeWidth="1.5" />
              <text x="32" y="38.5" textAnchor="middle" className="fill-white/30 font-display text-[19px]">
                1€
              </text>
            </>
          )}
        </svg>
      ))}
    </div>
  );
}
