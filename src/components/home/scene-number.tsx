import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Nummer in den Infografiken (Höhenschnitt, Talboden früher | heute) und in
 * ihrer Legende. Auf Papier Bergwald mit weißer Ziffer, auf Tannentinte
 * Almmoos mit dunkler Ziffer; der Ring trennt sie von der Zeichnung.
 */
export function SceneNumber({
  n,
  tone = "light",
  className,
  style
}: {
  n: number;
  tone?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold tabular-nums ring-2",
        tone === "light"
          ? "bg-[var(--color-forest)] text-white ring-[var(--color-paper)]"
          : "bg-[var(--color-moss)] text-[var(--color-ink)] ring-[var(--color-ink)]",
        className
      )}
    >
      {n}
    </span>
  );
}

/** Lage aus dem Generatorskript plus Verzögerung für `habitat-fade`. */
export function spotStyle(spot: { left: string; top: string }, delay: number) {
  return { ...spot, "--habitat-delay": `${delay}ms` } as CSSProperties;
}
