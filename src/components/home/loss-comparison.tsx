"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { BeforeAfterSlider } from "./before-after-slider";
import { SceneNumber } from "./scene-number";
import { LegendCarousel } from "./legend-carousel";
import styles from "./loss-comparison.module.css";

type Marker = { key: string; left: string; top: string; split: number };

const SWEEP_DELAY = 1400; // erst wachsen lassen, dann aufdecken
const SWEEP_DURATION = 8000;

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

/**
 * Talboden früher | heute mit Legende. Sobald die Szene im Bild ist, fährt
 * der Regler einmal von links nach rechts und deckt „heute“ auf; jede Nummer
 * erscheint, wenn er sie überquert, und mit ihr ihr Eintrag in der Legende.
 * Wer selbst zieht, übernimmt sofort, und alle Einträge stehen da. Ohne
 * Bewegung (prefers-reduced-motion) gibt es keine Fahrt: Regler in der Mitte,
 * Legende vollständig. Das Ausblenden der Legende hängt in globals.css an
 * `.home-motion-ready`, damit sie ohne JavaScript nie verborgen bleibt.
 */
export function LossComparison({
  before,
  after,
  markers,
  items,
  aside,
  caption,
  pagerLabel,
  beforeLabel,
  afterLabel,
  sliderLabel
}: {
  before: ReactNode;
  after: ReactNode;
  markers: ReadonlyArray<Marker>;
  items: ReadonlyArray<readonly [string, string]>;
  aside: ReactNode;
  caption: string;
  pagerLabel: string;
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
}) {
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [sweeping, setSweeping] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const sweepTimer = useRef<number | undefined>(undefined);

  const showMarker = useCallback((index: number) => {
    const viewport = viewportRef.current;
    const marker = markers[index];
    if (!viewport || !marker || !window.matchMedia("(max-width: 639px)").matches) return;
    viewport.scrollTo({
      left: viewport.scrollWidth * (100 - marker.split) / 100 - viewport.clientWidth / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }, [markers]);

  const stopSweep = () => {
    window.clearTimeout(sweepTimer.current);
    sweepTimer.current = undefined;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setSweeping(false);
  };

  useEffect(() => {
    if (sweeping && revealed > 0) showMarker(revealed - 1);
  }, [sweeping, revealed, showMarker]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPosition(50);
      setRevealed(markers.length);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        showMarker(0);
        if (reducedMotion) return;
        sweepTimer.current = window.setTimeout(() => {
          sweepTimer.current = undefined;
          const start = performance.now();
          setSweeping(true);
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / SWEEP_DURATION);
            const next = 100 * ease(t);
            setPosition(next);
            setRevealed((count) => Math.max(count, markers.filter((m) => next > 100 - m.split).length));
            frame.current = t < 1 ? requestAnimationFrame(step) : null;
            if (t >= 1) setSweeping(false);
          };
          frame.current = requestAnimationFrame(step);
        }, SWEEP_DELAY);
      },
      { threshold: 0.4 }
    );
    observer.observe(stage);

    return () => {
      observer.disconnect();
      stopSweep();
    };
  }, [markers, showMarker]);

  const takeOver = (next: number) => {
    stopSweep();
    setPosition(next);
    setRevealed(markers.length);
  };

  return (
    <div data-legend-scope>
      <figure className="mt-10 sm:mt-16">
        {/* Mobil: breite, wischbare Szene; der Vergleichsregler steht separat darunter. */}
        <div
          ref={stageRef}
          onPointerDown={stopSweep}
          data-home-reveal="grow"
          className="-mx-5 text-[var(--color-moss)] sm:mx-0"
        >
          <div ref={viewportRef} className={styles.viewport}>
            <div className={styles.canvas}>
              <BeforeAfterSlider
                before={<div className={styles.scene}>{before}</div>}
                position={position}
                onPositionChange={takeOver}
                beforeLabel={beforeLabel}
                afterLabel={afterLabel}
                sliderLabel={sliderLabel}
                afterClassName="bg-[var(--color-ink)]"
                after={
                  <div className={styles.scene}>
                    {after}
                    <div aria-hidden>
                      {markers.map((marker, index) => (
                        <div
                          key={marker.key}
                          style={{ "--marker-left": marker.left, "--marker-top": marker.top } as CSSProperties}
                        >
                          <span className={styles.leader} />
                          <span className={styles.marker}>
                            <SceneNumber
                              n={index + 1}
                              tone="dark"
                              marker
                              className="profile-marker profile-marker-dark relative"
                              style={{ "--marker-delay": `${index * 0.7}s` } as CSSProperties}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-5 sm:hidden">
          <div aria-hidden className="flex justify-between text-xs font-bold uppercase tracking-[0.14em] text-white/80">
            <span>{afterLabel}</span>
            <span>{beforeLabel}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={position}
            onPointerDown={stopSweep}
            onChange={(event) => takeOver(Number(event.target.value))}
            aria-label={sliderLabel}
            aria-valuetext={`${beforeLabel} ${Math.round(100 - position)} %, ${afterLabel} ${Math.round(position)} %`}
            className="block h-11 w-full accent-[var(--color-moss)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-moss)]"
          />
        </div>
        <figcaption className="mt-3 text-xs leading-5 text-white/60">{caption}</figcaption>
      </figure>
      <LegendGrid items={items} revealed={revealed} aside={aside} pagerLabel={pagerLabel} follow={sweeping} onActiveChange={showMarker} />
    </div>
  );
}

function LegendGrid({
  items,
  revealed,
  aside,
  pagerLabel,
  follow,
  onActiveChange
}: {
  items: ReadonlyArray<readonly [string, string]>;
  revealed: number;
  aside: ReactNode;
  pagerLabel: string;
  follow: boolean;
  onActiveChange: (index: number) => void;
}) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-10 lg:gap-24">
      {/* Telefon: wischbare Kartenreihe, die der Reglerfahrt folgt. */}
      <LegendCarousel
        className="sm:hidden"
        items={items}
        tone="dark"
        pagerLabel={pagerLabel}
        revealed={revealed}
        follow={follow}
        onActiveChange={onActiveChange}
      />
      <ol className="hidden gap-x-10 gap-y-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([title, copy], index) => (
          <li
            key={title}
            data-sweep-item
            data-sweep-shown={index < revealed}
            className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 border-t border-white/15 pt-5"
          >
            <SceneNumber n={index + 1} tone="dark" className="mt-px ring-0" />
            <div>
              <h3 className="font-semibold tracking-[-0.01em]">{title}</h3>
              <p className="mt-1 max-w-[44ch] leading-7 text-white/70">{copy}</p>
            </div>
          </li>
        ))}
      </ol>
      {aside}
    </div>
  );
}
