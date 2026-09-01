"use client";

import { useEffect, useRef, useState } from "react";
import { heroQuotes, heroQuotesAreMockup } from "@/config/hero";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRingOnDark } from "@/components/ui/focus";

const DWELL_MS = 7000;

/**
 * Die Zitatebene über dem Foto.
 *
 * Ein Zitat steht sichtbar, die anderen sind nicht im Baum — ein Stapel mit
 * Deckkraft 0 hinterließe für Vorlesewerkzeuge drei gleichzeitige Zitate.
 * Der Wechsel läuft von selbst, hält aber an, sobald jemand mit der Ebene zu
 * tun hat (Zeiger darüber, Tastaturfokus darin, Tab im Hintergrund), und bei
 * `prefers-reduced-motion: reduce` bleibt er ganz aus: Ein Text, der sich unter
 * dem Lesen austauscht, ist dort keine Zierde, sondern ein Hindernis.
 */
export function HeroQuotes({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).hero;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % heroQuotes.length);
    }, DWELL_MS);

    return () => window.clearTimeout(timer);
  }, [index, paused]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const quote = heroQuotes[index];

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={t.quotesLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      className="hero-reveal hero-reveal-quote mt-8 w-full max-w-[26rem] sm:mt-10 lg:absolute lg:bottom-16 lg:right-0 lg:mt-0"
    >
      <figure className="relative overflow-hidden rounded-[var(--radius-lg)] border border-white/15 bg-[rgba(18,44,35,0.42)] p-4 shadow-[var(--shadow-on-photo)] backdrop-blur-md sm:p-6">
        {/* Das Anführungszeichen ist Textur, keine Information. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1 -top-6 font-display text-[7rem] leading-none text-white/8"
        >
          &rdquo;
        </span>

        <blockquote key={quote.id} className="hero-quote-body relative">
          <p className="font-display text-balance text-[length:var(--text-body)] leading-[1.45] text-white sm:text-[length:var(--text-body-lg)]">
            {quote.text[locale]}
          </p>
          <figcaption className="mt-4 text-xs leading-5">
            <span className="font-bold text-[var(--color-moss)]">{quote.author}</span>
            <span className="block text-white/70">{quote.role[locale]}</span>
          </figcaption>
        </blockquote>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {heroQuotes.map((item, position) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(position)}
                aria-label={`${t.quoteItem} ${position + 1}`}
                aria-current={position === index}
                className={`group relative h-6 w-10 ${focusRingOnDark}`}
              >
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/40">
                  {position === index ? (
                    <span
                      data-paused={paused ? "true" : undefined}
                      style={{ animationDuration: `${DWELL_MS}ms` }}
                      className="hero-quote-progress block h-full w-full bg-[var(--color-accent)]"
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>

          {heroQuotesAreMockup ? (
            <span className="rounded-[var(--radius-sm)] bg-white/12 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/70">
              {t.quotesMockup}
            </span>
          ) : null}
        </div>
      </figure>
    </div>
  );
}
