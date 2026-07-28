import { cn } from "@/lib/utils";
import { focusRing, focusRingTool } from "./focus";

/**
 * Die Chip-Hülle des Systems.
 *
 * Bewusst eine Klassenfunktion und keine Komponente: Chips sehen an drei
 * Stellen gleich aus, tun aber Verschiedenes — Kategorienfilter schalten um,
 * die Raumleiste des Lebensraum-Checks navigiert und trägt Fortschritt,
 * die Panel-Tabs wechseln Ansichten. Ein Bauteil mit drei Verhaltensweisen
 * wäre eine Attrappe. Geteilt wird die Form, nicht die Logik.
 *
 * `variant` beschreibt den Untergrund, auf dem der Chip liegt:
 * - `bordered` steht frei auf Papier und braucht deshalb eine eigene Kante
 * - `plain` liegt in einer Werkzeugleiste, die die Fläche schon abgrenzt
 */

const shell =
  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[var(--radius-sm)] px-4 text-xs font-bold transition-colors";

export function chipClass({
  active = false,
  variant = "bordered",
  className
}: {
  active?: boolean;
  variant?: "bordered" | "plain";
  className?: string;
} = {}) {
  if (variant === "plain") {
    return cn(
      shell,
      "gap-1.5 px-3 font-semibold",
      focusRingTool,
      active
        ? "bg-[var(--color-forest)] text-white"
        : "text-[var(--color-muted)] hover:bg-[var(--color-ink)]/5",
      className
    );
  }

  return cn(
    shell,
    "border",
    focusRing,
    active
      ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
      : "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-forest)]/45 hover:bg-[var(--color-paper)]",
    className
  );
}
