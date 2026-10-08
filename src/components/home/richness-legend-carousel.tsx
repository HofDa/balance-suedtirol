"use client";

import { useEffect, useRef, useState } from "react";
import { LegendCarousel } from "./legend-carousel";
import { richnessMarkerDelay } from "./richness-timing";

/**
 * Telefon: Die Kartenreihe zum Höhenschnitt folgt dem Erscheinen der Nummern.
 * Karte n kommt, wenn Nummer n in der Grafik auftaucht, und die Reihe rückt zu
 * ihr nach, bis jemand selbst wischt. Ohne Bewegung stehen alle Karten sofort da.
 */
export function RichnessLegendCarousel({
  items,
  pagerLabel,
  className
}: {
  items: ReadonlyArray<readonly [string, string]>;
  pagerLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(items.length);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const scope = ref.current?.closest<HTMLElement>("[data-home-reveal]");
    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!document.querySelector("[data-home-page].home-motion-ready")) return;
    setRevealed(0);
    const timers: number[] = [];
    const start = () => {
      setFollow(true);
      items.forEach((_, index) => {
        timers.push(window.setTimeout(() => setRevealed(index + 1), richnessMarkerDelay(index)));
      });
      timers.push(window.setTimeout(() => setFollow(false), richnessMarkerDelay(items.length - 1) + 400));
    };
    // Startet mit der Grafik: sobald der Bewegungs-Controller sie sichtbar markiert.
    if (scope.dataset.homeVisible === "true") {
      start();
      return () => timers.forEach(clearTimeout);
    }
    const observer = new MutationObserver(() => {
      if (scope.dataset.homeVisible !== "true") return;
      observer.disconnect();
      start();
    });
    observer.observe(scope, { attributes: true, attributeFilter: ["data-home-visible"] });
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [items]);

  return (
    <div ref={ref} className={className}>
      <LegendCarousel items={items} tone="light" pagerLabel={pagerLabel} revealed={revealed} follow={follow} />
    </div>
  );
}
