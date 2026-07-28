import { cn } from "@/lib/utils";

/**
 * Einseitiger Fortschrittsbalken: Finanzierungsstand auf Karte und
 * Detailseite, Wertstand in der Tafel des Lebensraum-Checks.
 *
 * Bewusst nicht hier abgebildet ist das zweiseitige Wirkungsdiagramm im
 * Auswahlpanel. Es sieht ähnlich aus, meint aber etwas anderes: Mitte ist
 * Null, links belastet, rechts verbessert. Zwei Balken mit verschiedener
 * Bedeutung gehören nicht in eine Komponente.
 */

const heights = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2.5"
} as const;

export function Progress({
  value,
  label,
  height = "md",
  track = "stone",
  indicator = "forest",
  className
}: {
  /** 0–100. Wird geklammert, damit fehlerhafte Daten das Layout nicht sprengen. */
  value: number;
  /**
   * Zugängliche Beschriftung. Fehlt sie, gilt der Balken als rein dekorative
   * Wiederholung einer daneben stehenden Zahl und wird ausgeblendet.
   */
  label?: string;
  height?: keyof typeof heights;
  track?: "stone" | "ink" | "light";
  indicator?: "forest" | "moss";
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const decorative = !label;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-md)]",
        heights[height],
        track === "stone" ? "bg-[var(--color-stone)]" : track === "light" ? "bg-white/12" : "bg-[var(--color-ink)]/8",
        className
      )}
      role={decorative ? undefined : "progressbar"}
      aria-hidden={decorative || undefined}
      aria-valuemin={decorative ? undefined : 0}
      aria-valuemax={decorative ? undefined : 100}
      aria-valuenow={decorative ? undefined : pct}
      aria-label={label}
    >
      <div
        className={cn(
          "h-full rounded-[var(--radius-md)] transition-[width] duration-[var(--duration-bar)] ease-out",
          indicator === "moss" ? "bg-[var(--color-moss)]" : "bg-[var(--color-forest)]"
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
