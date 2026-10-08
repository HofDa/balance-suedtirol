"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { focusRing } from "@/components/ui/focus";
import { cn } from "@/lib/utils";
import { SceneNumber } from "./scene-number";

/**
 * Legende einer Infografik als waagrechte Kartenreihe für kleine Bildschirme:
 * wischen statt scrollen, damit die Grafik im Bild bleibt. Die nächste Karte
 * lugt hervor, Punkte darunter zeigen die Stelle und springen hin.
 *
 * Die sichtbare Karte hebt ihre Nummer in der Grafik hervor: Marken tragen
 * `data-factor`, der gemeinsame Vorfahr `data-legend-scope`; die Hervorhebung
 * selbst steht in globals.css.
 *
 * `revealed` und `follow` gehören zum Talboden: Karten jenseits von `revealed`
 * bleiben verborgen (`data-sweep-*`), und solange `follow` gilt, rückt die
 * Reihe zur neuesten Karte nach – bis jemand selbst wischt.
 *
 * Nummern in der Grafik sind Knöpfe (`LegendMarker`): Ein Tipp schickt
 * `legend:show` an den Vorfahr `data-legend-scope`, und die Reihe holt die
 * passende Karte in die Mitte.
 */
const SHOW_EVENT = "legend:show";

/** Scrollstellung, bei der `card` mittig in der Reihe steht. */
function cardScroll(list: HTMLElement, card: HTMLElement) {
  return card.offsetLeft - list.offsetLeft - (list.clientWidth - card.offsetWidth) / 2;
}

export function LegendCarousel({
  items,
  tone,
  pagerLabel,
  revealed,
  follow = false,
  stagger = false,
  className,
  onActiveChange
}: {
  items: ReadonlyArray<readonly [string, string]>;
  tone: "light" | "dark";
  /** Vorlage für die Punkte, `{n}` wird ersetzt. */
  pagerLabel: string;
  revealed?: number;
  follow?: boolean;
  /** Karten gleiten nacheinander herein, sobald die Reihe im Bild ist. */
  stagger?: boolean;
  className?: string;
  onActiveChange?: (index: number) => void;
}) {
  const scroller = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const touched = useRef(false);

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  const scrollToCard = useCallback((index: number) => {
    const list = scroller.current;
    const card = list?.children[index] as HTMLElement | undefined;
    if (!list || !card) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: cardScroll(list, card), behavior: smooth ? "smooth" : "auto" });
  }, []);

  // Welche Karte vorn steht: die, deren linke Kante der Reihe am nächsten ist.
  useEffect(() => {
    const list = scroller.current;
    if (!list) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distances = (Array.from(list.children) as HTMLElement[]).map((card) =>
          Math.abs(cardScroll(list, card) - list.scrollLeft)
        );
        setActive(distances.indexOf(Math.min(...distances)));
      });
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      list.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Nummer in der Grafik hervorheben.
  useEffect(() => {
    const scope = scroller.current?.closest("[data-legend-scope]");
    scope?.querySelectorAll<HTMLElement>("[data-factor]").forEach((marker) => {
      marker.dataset.active = String(Number(marker.dataset.factor) === active + 1);
    });
  }, [active]);

  // Tipp auf eine Nummer in der Grafik: Karte in die Mitte holen.
  useEffect(() => {
    const scope = scroller.current?.closest("[data-legend-scope]");
    if (!scope) return;
    const onShow = (event: Event) => {
      touched.current = true;
      scrollToCard((event as CustomEvent<number>).detail);
    };
    scope.addEventListener(SHOW_EVENT, onShow);
    return () => scope.removeEventListener(SHOW_EVENT, onShow);
  }, [scrollToCard]);

  // Talboden: der neuesten Karte folgen, solange niemand selbst wischt.
  useEffect(() => {
    if (!follow || touched.current || !revealed) return;
    scrollToCard(revealed - 1);
  }, [follow, revealed, scrollToCard]);

  const dark = tone === "dark";

  return (
    <div className={cn("min-w-0", className)}>
      <ol
        ref={scroller}
        onPointerDown={() => (touched.current = true)}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:gap-4 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(([title, copy], index) => (
          <li
            key={title}
            {...(revealed !== undefined && { "data-sweep-item": "", "data-sweep-shown": index < revealed })}
            {...(stagger && { "data-home-reveal": "slide", style: { "--home-reveal-delay": `${index * 90}ms` } as CSSProperties })}
            className={cn(
              "w-[84%] shrink-0 snap-center sm:w-[24rem] rounded-[var(--radius-md)] p-5",
              dark ? "bg-white/[0.06]" : "bg-[var(--color-surface)]/70 ring-1 ring-[var(--color-line)]"
            )}
          >
            <div className="flex items-center gap-3">
              <SceneNumber n={index + 1} tone={tone} className="ring-0" />
              <h3 className={cn("font-semibold tracking-[-0.01em]", !dark && "text-[var(--color-ink)]")}>{title}</h3>
            </div>
            <p className={cn("mt-2 leading-7", dark ? "text-white/70" : "text-[var(--color-muted)]")}>{copy}</p>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex justify-center gap-1.5">
        {items.map(([title], index) => (
          <button
            key={title}
            type="button"
            onClick={() => {
              touched.current = true;
              scrollToCard(index);
            }}
            aria-label={pagerLabel.replace("{n}", String(index + 1))}
            aria-current={index === active}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === active ? "w-5" : "w-1.5",
              dark
                ? index === active ? "bg-[var(--color-moss)]" : "bg-white/30"
                : index === active ? "bg-[var(--color-forest)]" : "bg-[var(--color-forest)]/25"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Nummer in der Grafik als Knopf: holt ihre Legenden-Karte in die Mitte der
 * Reihe (nur auf dem Telefon sichtbar; darüber steht die Legende ohnehin
 * vollständig darunter).
 */
export function LegendMarker({
  index,
  label,
  className,
  children
}: {
  index: number;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) =>
        event.currentTarget.closest("[data-legend-scope]")?.dispatchEvent(new CustomEvent(SHOW_EVENT, { detail: index }))
      }
      className={cn("pointer-events-auto relative cursor-pointer rounded-full max-sm:p-2 max-sm:-m-2", focusRing, className)}
    >
      {children}
    </button>
  );
}
