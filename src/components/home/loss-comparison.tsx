"use client";

import { memo, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { BeforeAfterSlider } from "./before-after-slider";
import { SceneNumber } from "./scene-number";
import { LegendCarousel } from "./legend-carousel";
import { focusRingOnDark } from "@/components/ui/focus";
import styles from "./loss-comparison.module.css";

type Marker = { key: string; left: string; top: string; split: number };

const TOUR_DELAY = 1400; // erst wachsen lassen, dann aufdecken
const DWELL = 1300; // Halt an jeder Ursache: Zeit, den Titel zu lesen
const MS_PER_PERCENT = 26; // Fahrtempo zwischen zwei Halten
const MIN_MOVE = 450;
const REVEAL_MARGIN = 3; // so weit über die Nummer hinaus, dass sie ganz frei liegt

type Segment = { start: number; end: number; from: number; to: number; active: number | null };

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

/**
 * Fahrplan der Tour: zu jeder Nummer fahren, dort halten, weiter. Die Nummern
 * liegen in Legendenreihenfolge von links nach rechts (Generatorskript).
 */
function buildTour(markers: ReadonlyArray<Marker>): Segment[] {
  const segments: Segment[] = [];
  let t = 0;
  let pos = 0;
  const move = (to: number) => {
    const end = t + Math.max(MIN_MOVE, (to - pos) * MS_PER_PERCENT);
    segments.push({ start: t, end, from: pos, to, active: null });
    t = end;
    pos = to;
  };
  markers.forEach((marker, index) => {
    move(Math.min(100, 100 - marker.split + REVEAL_MARGIN));
    segments.push({ start: t, end: t + DWELL, from: pos, to: pos, active: index });
    t += DWELL;
  });
  if (pos < 100) move(100);
  return segments;
}

/**
 * Wo der Titel neben der Nummer steht: nach links, weg vom Regler, der rechts
 * daneben hält. Am linken Rand reicht der Platz dafür nicht; dort steht er
 * unter der Nummer und läuft nach rechts. Oben am Rand ebenfalls darunter.
 */
function calloutPlacement(marker: Marker) {
  const x = 100 - marker.split;
  const top = parseFloat(marker.top);
  const nearLeft = x < 22;
  return {
    horizontal: nearLeft ? "start" : "end",
    vertical: nearLeft || top < 22 ? "below" : "above"
  } as const;
}

/**
 * Talboden früher | heute mit Legende, als geführte Tour. Sobald die Szene im
 * Bild ist, fährt der Regler von Nummer zu Nummer und hält an jeder: Die
 * aktive Nummer wächst, ihr Titel steht direkt daneben, eine weiche Vignette
 * dunkelt den Rest der Szene ab, die noch verdeckte Seite tritt zurück und die
 * übrigen Nummern verblassen. Der Blick hat so in jedem Moment genau ein Ziel.
 * „Heute“ steht dabei still (keine Wiese im Wind): Früher lebt, heute nicht
 * mehr. Danach pulsiert nur Nummer 1 als Einstieg, „Nochmal abspielen“
 * startet die Tour neu.
 *
 * Wer selbst zieht oder tippt, übernimmt sofort, und alle Einträge stehen da.
 * Ohne Bewegung (prefers-reduced-motion) gibt es keine Tour: Regler in der
 * Mitte, Legende vollständig. Das Ausblenden hängt in globals.css an
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
  sliderLabel,
  replayLabel
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
  replayLabel: string;
}) {
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [touring, setTouring] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [toured, setToured] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const tourTimer = useRef<number | undefined>(undefined);

  const showMarker = useCallback((index: number) => {
    const viewport = viewportRef.current;
    const marker = markers[index];
    if (!viewport || !marker || !window.matchMedia("(max-width: 639px)").matches) return;
    viewport.scrollTo({
      left: viewport.scrollWidth * (100 - marker.split) / 100 - viewport.clientWidth / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }, [markers]);

  const stopTour = useCallback(() => {
    window.clearTimeout(tourTimer.current);
    tourTimer.current = undefined;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setTouring(false);
    setActive(null);
  }, []);

  const runTour = useCallback((delay: number) => {
    stopTour();
    setPosition(0);
    setRevealed(0);
    tourTimer.current = window.setTimeout(() => {
      tourTimer.current = undefined;
      const segments = buildTour(markers);
      const total = segments[segments.length - 1].end;
      const start = performance.now();
      setTouring(true);
      const step = (now: number) => {
        const elapsed = Math.min(total, now - start);
        const segment = segments.find((s) => elapsed < s.end) ?? segments[segments.length - 1];
        const t = segment.end > segment.start ? (elapsed - segment.start) / (segment.end - segment.start) : 1;
        const next = segment.from + (segment.to - segment.from) * ease(Math.min(1, t));
        setPosition(next);
        setActive(segment.active);
        setRevealed((count) => Math.max(count, markers.filter((m) => next > 100 - m.split).length));
        if (elapsed < total) {
          frame.current = requestAnimationFrame(step);
        } else {
          frame.current = null;
          setTouring(false);
          setActive(null);
          setToured(true);
        }
      };
      frame.current = requestAnimationFrame(step);
    }, delay);
  }, [markers, stopTour]);

  useEffect(() => {
    if (active !== null) showMarker(active);
  }, [active, showMarker]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const manualComparison = window.matchMedia("(prefers-reduced-motion: reduce)");
    const showStaticComparison = () => {
      stopTour();
      setPosition(50);
      setRevealed(markers.length);
    };
    if (manualComparison.matches) showStaticComparison();

    let introduced = manualComparison.matches;
    const onModeChange = () => {
      if (!manualComparison.matches) return;
      introduced = true;
      showStaticComparison();
    };
    const finishTour = () => {
      if (tourTimer.current === undefined && frame.current === null) return;
      stopTour();
      setPosition(100);
      setRevealed(markers.length);
      setToured(true);
    };
    const onVisibilityChange = () => {
      if (document.hidden && introduced) finishTour();
    };
    manualComparison.addEventListener("change", onModeChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Keep observing after entry so a fast scroll past the comparison also
    // cancels its pending timer / animation instead of painting offscreen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (introduced) finishTour();
          return;
        }
        if (introduced || entry.intersectionRatio < 0.4 || document.hidden) return;
        introduced = true;
        runTour(TOUR_DELAY);
      },
      { threshold: [0, 0.4] }
    );
    observer.observe(stage);

    return () => {
      observer.disconnect();
      manualComparison.removeEventListener("change", onModeChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stopTour();
    };
  }, [markers, stopTour, runTour]);

  /** Eingriff während der Tour: anhalten; danach steht „Nochmal abspielen“ bereit. */
  const interrupt = () => {
    if (tourTimer.current !== undefined || frame.current !== null) setToured(true);
    stopTour();
  };

  const takeOver = (next: number) => {
    interrupt();
    setPosition(next);
    setRevealed(markers.length);
  };

  const showLegend = (index: number) => {
    interrupt();
    setRevealed(markers.length);
    scopeRef.current?.dispatchEvent(new CustomEvent("legend:show", { detail: index }));
  };

  const activeMarker = active !== null ? markers[active] : null;
  const placement = activeMarker ? calloutPlacement(activeMarker) : null;

  return (
    <div ref={scopeRef} data-legend-scope data-touring={touring} className={styles.comparison}>
      <figure className="mt-10 sm:mt-16">
        {/* Mobil: breite, wischbare Szene; der Vergleichsregler steht separat darunter. */}
        <div
          ref={stageRef}
          onPointerDown={() => touring && takeOver(position)}
          data-home-reveal="grow"
          className="relative -mx-5 text-[var(--color-moss)] sm:mx-0"
        >
          <div ref={viewportRef} className={styles.viewport}>
            <div className={styles.canvas}>
              <BeforeAfterSlider
                before={
                  <div className={styles.scene}>
                    {before}
                    {/* Die noch verdeckte Seite tritt während der Tour zurück. */}
                    <span aria-hidden className={styles.beforeDim} />
                  </div>
                }
                position={position}
                onPositionChange={takeOver}
                beforeLabel={beforeLabel}
                afterLabel={afterLabel}
                sliderLabel={sliderLabel}
                afterClassName="bg-[var(--color-ink)]"
                after={
                  <div className={`${styles.scene} ${styles.still}`}>
                    {after}
                    {markers.map((marker, index) => (
                      <span
                        key={marker.key}
                        aria-hidden
                        data-on={index === active}
                        className={styles.spot}
                        style={{ "--marker-left": marker.left, "--marker-top": marker.top } as CSSProperties}
                      />
                    ))}
                    <div>
                      {markers.map((marker, index) => (
                        <div
                          key={marker.key}
                          style={{ "--marker-left": marker.left, "--marker-top": marker.top } as CSSProperties}
                        >
                          <span aria-hidden className={styles.leader} />
                          <button
                            type="button"
                            aria-label={`${index + 1}: ${items[index][0]}`}
                            tabIndex={position > 100 - marker.split ? 0 : -1}
                            onClick={() => showLegend(index)}
                            data-tour={index === active ? "active" : touring ? "dim" : undefined}
                            data-pulse={!touring && toured && index === 0}
                            className={`${styles.marker} pointer-events-auto grid size-11 cursor-pointer place-items-center rounded-full ${focusRingOnDark}`}
                          >
                            <SceneNumber
                              n={index + 1}
                              tone="dark"
                              marker
                              className="profile-marker profile-marker-dark relative"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />
            </div>
          </div>
          {/* Titel an der aktiven Nummer. Liegt außerhalb der beschnittenen
              Heute-Ebene, sonst schnitte der Regler ihn ab. */}
          {activeMarker && placement ? (
            <p
              key={active}
              aria-hidden
              data-x={placement.horizontal}
              data-y={placement.vertical}
              className={styles.callout}
              style={{ "--marker-left": activeMarker.left, "--marker-top": activeMarker.top } as CSSProperties}
            >
              <span className="tabular-nums text-[var(--color-moss)]">{active! + 1}</span>
              <span aria-hidden className="text-white/40">·</span>
              {items[active!][0]}
            </p>
          ) : null}
          {/* Fortschritt der Tour: wie weit, wie lange noch. */}
          <p
            aria-hidden
            data-on={touring}
            className={`${styles.progress} pointer-events-none absolute left-3 top-3 z-30 rounded-[var(--radius-sm)] bg-[var(--color-ink)]/80 px-2 py-1 text-[11px] font-bold tabular-nums tracking-[0.14em] text-white/85 sm:left-4 sm:top-4`}
          >
            {Math.max(1, revealed)} / {markers.length}
          </p>
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
            onPointerDown={() => touring && takeOver(position)}
            onChange={(event) => takeOver(Number(event.target.value))}
            aria-label={sliderLabel}
            aria-valuetext={`${beforeLabel} ${Math.round(100 - position)} %, ${afterLabel} ${Math.round(position)} %`}
            className="block h-11 w-full accent-[var(--color-moss)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-moss)]"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <figcaption className="max-w-[80ch] text-xs leading-5 text-white/60">{caption}</figcaption>
          {toured ? (
            <button
              type="button"
              onClick={() => runTour(0)}
              className={`${styles.replay} inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[var(--radius-sm)] px-1 text-xs font-bold text-[var(--color-moss)] hover:underline ${focusRingOnDark}`}
            >
              <RotateCcw className="size-3.5" aria-hidden />
              {replayLabel}
            </button>
          ) : null}
        </div>
      </figure>
      <LegendGrid items={items} revealed={revealed} aside={aside} pagerLabel={pagerLabel} follow={touring} onActiveChange={showMarker} />
    </div>
  );
}

const LegendGrid = memo(function LegendGrid({
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
      {/* Wischbare Kartenreihe, die der Reglerfahrt folgt. */}
      <LegendCarousel
        items={items}
        tone="dark"
        pagerLabel={pagerLabel}
        revealed={revealed}
        follow={follow}
        onActiveChange={onActiveChange}
      />
      {aside}
    </div>
  );
});
