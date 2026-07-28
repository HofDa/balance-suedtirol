import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Das gesperrte Versallabel des Systems — Eyebrow, Rubrik, Kategoriemarke.
 *
 * Vorher stand dieses Muster 20-mal in elf verschiedenen Kombinationen aus
 * Größe und Laufweite im Code, neun davon unter 11 px. Die drei Stufen hier
 * decken alle bisherigen Fälle ab und halten die Elf-Pixel-Regel aus DESIGN.md
 * ein: keine Schrift unter 11 px, auch nicht in der dichtesten Ansicht.
 *
 * Sparsam einsetzen. Ein benannter Kicker ist ein System; ein Eyebrow über
 * jedem Abschnitt ist eine Grammatik, die niemand entschieden hat.
 */

const sizes = {
  /** Abschnitts-Eyebrow auf öffentlichen Seiten. */
  section: "text-xs tracking-[0.22em]",
  /** Rubrik innerhalb einer Fläche — Panels, Karten, Formularblöcke. */
  block: "text-[11px] tracking-[0.18em]",
  /** Dichteste Stufe: Werkzeugleisten und Tafeln im Lebensraum-Check. */
  dense: "text-[11px] tracking-[0.14em]"
} as const;

const tones = {
  forest: "text-[var(--color-forest)]",
  muted: "text-[var(--color-muted)]",
  moss: "text-[var(--color-moss)]",
  ink: "text-[var(--color-ink)]"
} as const;

export type LabelSize = keyof typeof sizes;
export type LabelTone = keyof typeof tones;

export function Label({
  children,
  size = "block",
  tone = "forest",
  as: Tag = "p",
  className
}: {
  children: ReactNode;
  size?: LabelSize;
  tone?: LabelTone;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={cn("font-bold uppercase", sizes[size], tones[tone], className)}>
      {children}
    </Tag>
  );
}
