"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Cloud, Leaf, X } from "lucide-react";
import { focusRing } from "@/components/ui/focus";

export type ExplainerSection = {
  heading?: string;
  copy?: string;
  /** Kurze Punkte „Stichwort: Erklärung“ – das Stichwort wird hervorgehoben. */
  items?: readonly string[];
};

export type ExplainerCopy = {
  button: string;
  /** Ein Satz unter der Frage, nur in der Kartenform. */
  teaser?: string;
  /** Linktext der Karte, z. B. „Kurz erklärt“. */
  open?: string;
  close: string;
  eyebrow: string;
  title: string;
  lead: string;
  sections: ExplainerSection[];
  /** Beleg für Zahlen im Text; ohne Beleg gehört die Zahl nicht in den Dialog. */
  source?: { label: string; url?: string };
  cta?: { label: string; href: string };
};

type Shape = "leaf" | "cloud";

/**
 * Zwei stille Pillen, gleich gebaut und rundum weich auf Weiß; nur Icon und
 * Textfarbe unterscheiden sie. Mehr Form braucht es nicht.
 */
const pillClass =
  "rounded-full bg-white shadow-[0_1px_2px_rgba(32,55,44,0.08),0_8px_24px_rgba(32,55,44,0.08)] hover:shadow-[0_1px_2px_rgba(32,55,44,0.1),0_12px_28px_rgba(32,55,44,0.12)]";

const shapes = {
  leaf: {
    Icon: Leaf,
    className: `${pillClass} text-[var(--color-forest)]`
  },
  cloud: {
    Icon: Cloud,
    className: `${pillClass} text-[var(--color-ink)]`
  }
} as const;

function splitKeyword(item: string): [string, string] | null {
  const index = item.indexOf(": ");
  return index > 0 ? [item.slice(0, index), item.slice(index + 2)] : null;
}

export function ExplainerButton({
  copy,
  shape,
  variant = "pill",
  className = ""
}: {
  copy: ExplainerCopy;
  shape: Shape;
  variant?: "pill" | "card";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = `explainer-${shape}-title`;

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    // Hinter dem Dialog soll die Seite nicht mitscrollen.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const { Icon, className: shapeClass } = shapes[shape];

  const dialog = isOpen && (
    <div
      className="dialog-scrim fixed inset-0 z-[60] flex items-end justify-center bg-[var(--color-ink)]/55 backdrop-blur-xs sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <div className="dialog-sheet flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[var(--radius-xl)] bg-[var(--color-paper)] shadow-[var(--shadow-panel)] sm:max-h-[85vh] sm:max-w-2xl sm:rounded-[var(--radius-xl)]">
        {/* Kopf bleibt stehen, der Text darunter scrollt. */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] bg-white px-5 pb-5 pt-5 sm:px-8 sm:pt-7">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-forest)]">{copy.eyebrow}</p>
            <h3 id={titleId} className="mt-2 font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)] text-[var(--color-ink)]">
              {copy.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={`-mr-2 -mt-1 flex size-11 shrink-0 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] ${focusRing}`}
            aria-label={copy.close}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
          <p className="max-w-[60ch] text-[15px] leading-7 text-[var(--color-ink)]">{copy.lead}</p>

          {copy.sections.map((section, sectionIndex) => (
            <div key={section.heading ?? sectionIndex} className="mt-7">
              {section.heading && (
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-forest)]">{section.heading}</p>
              )}
              {section.copy && (
                <p className="mt-2 max-w-[60ch] text-sm leading-6 text-[var(--color-muted)]">{section.copy}</p>
              )}
              {section.items && (
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {section.items.map((item) => {
                    const parts = splitKeyword(item);
                    return (
                      <li key={item} className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-4 py-3 text-sm leading-6">
                        {parts ? (
                          <>
                            <span className="font-bold text-[var(--color-ink)]">{parts[0]}</span>
                            <span className="text-[var(--color-muted)]"> · {parts[1]}</span>
                          </>
                        ) : (
                          <span className="font-semibold text-[var(--color-ink)]">{item}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}

          {copy.source && (
            <p className="mt-6 max-w-[60ch] text-xs leading-5 text-[var(--color-muted)]">
              {copy.source.url ? (
                <a href={copy.source.url} target="_blank" rel="noreferrer" className={`underline underline-offset-2 hover:text-[var(--color-forest)] ${focusRing}`}>
                  {copy.source.label}
                </a>
              ) : (
                copy.source.label
              )}
            </p>
          )}

          {copy.cta && (
            <Link
              href={copy.cta.href}
              className={`group mt-7 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-forest)] ${focusRing}`}
            >
              {copy.cta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const trigger =
    variant === "card" ? (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group flex w-full items-start gap-5 rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-forest)]/40 hover:shadow-[var(--shadow-panel)] sm:p-7 ${focusRing} ${className}`}
      >
        {/* Beide Karten gleich gebaut, nur das Icon unterscheidet sie. */}
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
          <Icon className="size-6 transition-transform duration-300 group-hover:-rotate-6" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-[length:var(--text-title)] leading-[var(--leading-title)] tracking-[-0.02em] text-[var(--color-ink)]">
            {copy.button}
          </span>
          {copy.teaser && <span className="mt-2 block max-w-[46ch] text-sm leading-6 text-[var(--color-muted)]">{copy.teaser}</span>}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-forest)]">
            {copy.open ?? copy.button}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </span>
        </span>
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group inline-flex min-h-11 items-center gap-2 whitespace-nowrap pl-4 pr-5 text-sm font-semibold tracking-[-0.01em] transition-all duration-300 hover:-translate-y-px ${shapeClass} ${focusRing} ${className}`}
      >
        <Icon className="size-4 transition-transform duration-300 group-hover:-rotate-6" strokeWidth={2} aria-hidden />
        {copy.button}
      </button>
    );

  return (
    <>
      {trigger}
      {/* Portal: die Sektion darüber ist animiert (transform), ein `fixed`
          darin läge sonst unter dem Header. */}
      {dialog && createPortal(dialog, document.body)}
    </>
  );
}
