import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Die gehobene Ebene: Weiß auf Bergpapier, gefasst von einer Feldlinie.
 *
 * Das ist der Haupt-Tiefenmechanismus des Systems. Vorher war dieselbe Fläche
 * achtmal einzeln gebaut, mit sechs verschiedenen Radien zwischen 1,6rem und
 * 2,5rem und drei Schreibweisen derselben Linie.
 *
 * `level` sagt, wie groß und eigenständig die Fläche ist — nicht wie sie
 * aussieht. Die Zuordnung zu Radius und Innenabstand steht hier an einer
 * Stelle und folgt damit automatisch dem Formwechsel in `globals.css`.
 */

const levels = {
  /** Karten und Listenelemente in einem Raster. */
  card: "rounded-[var(--radius-lg)] p-5 sm:p-6",
  /** Große eigenständige Blätter: Formulare, Rechtstexte, Dialoge. */
  sheet: "rounded-[var(--radius-xl)] p-6 sm:p-9",
  /** Ruhige Unterteilung innerhalb einer bereits gehobenen Fläche. */
  inset: "rounded-[var(--radius-lg)] p-4"
} as const;

export function Surface({
  children,
  level = "card",
  tone = "white",
  framed = true,
  className,
  as: Tag = "div"
}: {
  children: ReactNode;
  level?: keyof typeof levels;
  /** `paper` für Flächen, die innerhalb einer weißen Fläche zurücktreten. */
  tone?: "white" | "paper";
  /** Ohne Linie, wenn die Fläche schon durch ihren Tonwert getrennt ist. */
  framed?: boolean;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn(
        levels[level],
        tone === "white" ? "bg-white" : "bg-[var(--color-paper)]",
        framed && "border border-[var(--color-line)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
