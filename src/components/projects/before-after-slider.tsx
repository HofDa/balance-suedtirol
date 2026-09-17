"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { withBasePath } from "@/lib/public-path";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
  labels: { before: string; after: string; slider: string };
  className?: string;
  /** Seitenverhältnis des Rahmens; Standard 8:5 wie die Projektfotos. */
  aspectClassName?: string;
  priority?: boolean;
  /** Vertical registration of a rendered image against the original photo. */
  afterScaleY?: number;
}

const REST_POSITION = 50;

const labelClass =
  "whitespace-nowrap rounded-full bg-[var(--color-ink)]/75 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm";

/**
 * Zwei Fotos vom selben Standpunkt übereinander; links vom Griff liegt das
 * Vorher-Bild, rechts das Nachher-Bild. Die senkrechte Trennlinie folgt dem Griff,
 * die Labels bleiben bei ihrer Bildhälfte und werden mit ihr abgeschnitten.
 * Beim ersten Erscheinen zeigt der Rahmen das Vorher-Bild, dann fährt der Griff
 * von rechts in die Mitte und deckt das Nachher-Bild auf – so ist klar, dass
 * sich hier etwas bewegen lässt. Danach gehört er dem Besucher: Ziehen mit
 * Maus/Finger oder Pfeiltasten.
 */
export function BeforeAfterSlider({
  before,
  after,
  alt,
  labels,
  className = "",
  aspectClassName = "aspect-[8/5]",
  priority = false,
  afterScaleY = 1
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(100);
  // Ref statt State: Der Effekt darf nicht neu laufen, sobald die Einführung
  // beginnt – sonst stoppt sein Cleanup die eigene Animation nach dem ersten Frame.
  const hasIntroduced = useRef(false);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const inputId = useId();

  useEffect(() => {
    if (!inView || hasIntroduced.current) return;
    hasIntroduced.current = true;
    if (reduceMotion) {
      setPosition(REST_POSITION);
      return;
    }
    const controls = animate(100, REST_POSITION, {
      duration: 1.4,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setPosition(value)
    });
    return () => controls.stop();
  }, [inView, reduceMotion]);

  const updateFromPointer = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Ein Klick irgendwo aufs Bild springt dorthin, danach folgt der Griff dem Zeiger.
    event.currentTarget.setPointerCapture(event.pointerId);
    hasIntroduced.current = true;
    updateFromPointer(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.buttons === 0) return;
    updateFromPointer(event.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink)] touch-pan-y ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      style={{ cursor: "ew-resize" }}
    >
      <div className={`relative ${aspectClassName}`}>
        <Image
          src={withBasePath(after)}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 1180px, 100vw"
          className="object-cover"
          style={afterScaleY !== 1 ? { objectFit: "fill", transform: `scaleY(${afterScaleY})`, transformOrigin: "top center" } : undefined}
          draggable={false}
        />
        {/* Das Nachher-Label sitzt in einer Ebene, die links am Griff endet –
            so verschwindet es, sobald der Griff darüberfährt, statt über dem
            falschen Bild zu stehen. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          aria-hidden
        >
          <span className={`absolute right-4 top-4 ${labelClass}`}>{labels.after}</span>
        </div>

        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`
          }}
        >
          <Image
            src={withBasePath(before)}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1280px) 1180px, 100vw"
            className="object-cover"
            draggable={false}
          />
          <span className={`pointer-events-none absolute left-4 top-4 ${labelClass}`} aria-hidden>
            {labels.before}
          </span>
        </div>

        {/* Trennlinie mit Griff; die Position ist der eigentliche Zustand. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
          style={{ left: `calc(${position}% - 1px)` }}
          aria-hidden
        >
          <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[var(--color-forest)] shadow-lg">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 3 12l6 6" />
              <path d="m15 6 6 6-6 6" />
            </svg>
          </span>
        </div>

        {/* Unsichtbarer Range-Input für Tastatur und Screenreader. */}
        <input
          id={inputId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(position)}
          onChange={(event) => {
            hasIntroduced.current = true;
            setPosition(Number(event.target.value));
          }}
          aria-label={labels.slider}
          aria-valuetext={`${Math.round(position)} % ${labels.before}`}
          className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0 focus-visible:opacity-100 focus-visible:accent-[var(--color-forest)]"
        />
      </div>
    </div>
  );
}
