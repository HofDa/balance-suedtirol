"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600;

/**
 * Zählt eine Kennzahl wie „2.500+“ oder „153“ hoch, sobald sie ins Bild kommt.
 * Der Server liefert die fertige Zahl: Ohne JavaScript, bei reduzierter
 * Bewegung und für Screenreader steht sie von Anfang an da. Die unsichtbare
 * Endzahl hält die Breite fest, damit Zusätze wie „von 36“ nicht mitwandern.
 * Das Tausendertrennzeichen wird aus dem Wert übernommen („2.500“, „2,500“).
 */
/** `delay` (ms) wartet nach dem Erscheinen, etwa bis eine Grafik daneben fertig ist. */
export function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const match = value.match(/^(\d{1,3}(?:[.,]\d{3})*)(.*)$/);
  const separator = match?.[1].match(/[.,]/)?.[0] ?? "";
  const target = match ? Number(match[1].replace(/[.,]/g, "")) : 0;
  const rest = match?.[2] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!match || !element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCurrent(0);
    let frame = 0;
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / DURATION);
            setCurrent(Math.round(target * (1 - Math.pow(1 - t, 4))));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.6 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
    // `value` bestimmt alle abgeleiteten Größen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match || current === null) return <span ref={ref}>{value}</span>;

  const digits = String(current).replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return (
    <span ref={ref} className="relative inline-block">
      <span className="sr-only">{value}</span>
      <span aria-hidden className="invisible">{value}</span>
      <span aria-hidden className="absolute inset-y-0 left-0">
        {digits}
        {current === target ? rest : null}
      </span>
    </span>
  );
}
