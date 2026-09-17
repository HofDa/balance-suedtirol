"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { focusRing } from "@/components/ui/focus";
import { cn } from "@/lib/utils";

/**
 * Die Projektspur der Startseite.
 *
 * Gebaut auf CSS-Scroll-Snap statt auf einer Karussell-Mechanik: Wischen und
 * Trackpad funktionieren dann ohne unser Zutun, die Tastatur erreicht jede
 * Karte über deren eigenen Link, und bei `prefers-reduced-motion` greift die
 * globale `scroll-behavior: auto`-Regel aus `globals.css`.
 *
 * Die Pfeile erscheinen erst, wenn die Spur breiter ist als ihr Ausschnitt.
 * Bei drei Projekten heißt das: mobil und auf Tablets blättert man, auf dem
 * Desktop stehen alle drei nebeneinander und es gibt keine Bedienung, die
 * nichts tut. Kommt ein viertes Projekt dazu, schaltet sie sich von selbst zu.
 *
 * Solange geblättert werden kann, rückt die Spur alle paar Sekunden von selbst
 * eine Karte weiter und springt am Ende an den Anfang zurück. Sie hält an,
 * sobald jemand mit ihr zu tun hat (Zeiger darüber, Finger darauf, Fokus darin),
 * wenn sie nicht im Bild ist oder der Tab im Hintergrund liegt – und bleibt bei
 * `prefers-reduced-motion` ganz stehen.
 */

const AUTO_ADVANCE_MS = 6000;

/** Kartenbreite der Spur — eine Karte mobil, zwei ab `sm`, drei ab `lg`. */
export const carouselItemClass =
  "min-w-0 shrink-0 snap-start basis-[85%] sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]";

export function ProjectCarousel({
  children,
  copy
}: {
  children: ReactNode;
  copy: { previous: string; next: string };
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    // Ein Pixel Toleranz: Sub-Pixel-Breiten lassen `scrollLeft` sonst nie
    // exakt auf 0 oder `max` landen, und die Pfeile blieben ewig aktiv.
    setCanScroll(max > 1);
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(track);
    return () => observer.disconnect();
  }, [sync]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.children;
    // Der Abstand zweier Kartenanfänge ist Kartenbreite plus Rinne — genauer
    // als beides einzeln zu messen.
    const step =
      items.length > 1
        ? (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft
        : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(track);
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!canScroll || paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      if (atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
      else scrollByCard(1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
    // `atStart` gehört dazu: Nach dem Rücksprung ändert sich sonst kein Wert
    // und die Uhr würde nicht neu gestellt.
  }, [canScroll, paused, inView, atEnd, atStart, scrollByCard]);

  return (
    /* `overflow-x` klemmt auch die Senkrechte ab. Die Spur braucht deshalb
       Innenabstand, sonst kappt sie den Fokusring der Karten (2 px Ring auf
       2 px Versatz) und den oberen Rand des Hover-Schattens. Außen holt das
       negative Maß den Abstand wieder herein, damit der Abschnittsrhythmus
       derselbe bleibt wie zuvor im Raster. */
    <div
      className="-mt-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <ul
        ref={trackRef}
        role="list"
        onScroll={sync}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      {canScroll ? (
        <div className="mt-3 flex justify-end gap-2">
          <CarouselButton label={copy.previous} disabled={atStart} onClick={() => scrollByCard(-1)}>
            <ChevronLeft className="size-5" aria-hidden />
          </CarouselButton>
          <CarouselButton label={copy.next} disabled={atEnd} onClick={() => scrollByCard(1)}>
            <ChevronRight className="size-5" aria-hidden />
          </CarouselButton>
        </div>
      ) : null}
    </div>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid size-11 place-items-center rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white text-[var(--color-ink)] transition-colors duration-[var(--duration-state)]",
        "hover:border-[var(--color-forest)]/45 hover:bg-[var(--color-paper)]",
        "disabled:pointer-events-none disabled:opacity-40",
        focusRing
      )}
    >
      {children}
    </button>
  );
}
