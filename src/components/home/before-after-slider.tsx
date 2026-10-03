"use client";

import type { CSSProperties, ReactNode } from "react";
import { ChevronsLeftRight } from "lucide-react";

/** Etikett unten in der Ecke der jeweiligen Ebene. */
const cornerLabel =
  "pointer-events-none absolute bottom-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80 sm:bottom-4 sm:text-[11px]";

/**
 * Vorher-nachher-Regler: `after` liegt über `before` und ist rechts der
 * Reglerposition sichtbar. Bedient wird ein echtes `input[type=range]` über
 * der ganzen Fläche – Maus, Finger und Pfeiltasten funktionieren ohne eigene
 * Gestenlogik. Gesteuert von außen (`position`), damit der Aufrufer den
 * Regler auch selbst fahren kann. Die Ebene `after` braucht einen deckenden
 * Grund (`afterClassName`), sonst scheint `before` durch.
 */
export function BeforeAfterSlider({
  before,
  after,
  position,
  onPositionChange,
  beforeLabel,
  afterLabel,
  sliderLabel,
  afterClassName
}: {
  before: ReactNode;
  after: ReactNode;
  position: number;
  onPositionChange: (position: number) => void;
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
  afterClassName?: string;
}) {
  return (
    <div className="relative select-none" style={{ "--split": `${position}%` } as CSSProperties}>
      {/* Jedes Etikett gehört zu seiner Ebene: „Früher“ verschwindet unter
          „Heute“, „Heute“ wird mit seiner Ebene beschnitten. So steht nie ein
          Etikett über der falschen Szene. */}
      {before}
      <span aria-hidden className={`${cornerLabel} left-3 sm:left-4`}>
        {beforeLabel}
      </span>
      <div className={`absolute inset-0 [clip-path:inset(0_0_0_var(--split))] ${afterClassName ?? ""}`}>
        {after}
        <span aria-hidden className={`${cornerLabel} right-3 sm:right-4`}>
          {afterLabel}
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={position}
        onChange={(event) => onPositionChange(Number(event.target.value))}
        aria-label={sliderLabel}
        aria-valuetext={`${beforeLabel} ${Math.round(position)} %, ${afterLabel} ${Math.round(100 - position)} %`}
        className="peer absolute inset-0 z-10 size-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-[var(--color-moss)]"
        style={{ left: "var(--split)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 z-20 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-moss)] text-[var(--color-ink)] shadow-[var(--shadow-on-photo)] ring-2 ring-[var(--color-ink)] transition-transform peer-hover:scale-105 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[var(--color-moss)] peer-active:scale-95 sm:size-10"
        style={{ left: "clamp(1.5rem, var(--split), calc(100% - 1.5rem))" }}
      >
        <ChevronsLeftRight className="size-4 sm:size-5" strokeWidth={2} />
      </span>
    </div>
  );
}
