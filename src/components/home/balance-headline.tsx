"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { LogoButterfly } from "./logo-butterfly";

/**
 * Oberkante eines Buchstabens über der Unterkante seiner Zeile, in em (die
 * Zeile reicht unter die Grundlinie, darum mehr als die reine Buchstabenhöhe).
 * Der Schmetterling schwebt knapp darüber (`HOVER`); seine Unterflügel reichen
 * bis an den Rand der Zeichnung, darum zählt deren Unterkante.
 */
function letterTop(letter: string) {
  if (letter === "t") return 0.74;
  if ("bdfhkl".includes(letter)) return 0.94;
  if (letter === "i" || letter === "j") return 0.88;
  if (letter !== letter.toLowerCase()) return 0.86;
  return 0.64;
}

/**
 * Waagrechter Versatz in em. Beim d steht der hohe Strich rechts: dort
 * hinüber, sonst streift ihn ein Flügel. Beim o etwas nach rechts, Richtung Punkt.
 */
const letterShift: Record<string, number> = { d: 0.16, o: 0.1 };
const HOVER = 0.1;

/** Index des letzten Buchstabens in `word` ab `start`, ohne Satzzeichen dahinter. */
function lastLetter(title: string, start: number, word: string) {
  let end = start + word.length - 1;
  while (end > start && !/\p{L}/u.test(title[end])) end -= 1;
  return end;
}

/**
 * Der Leitsatz des Abschlusses mit dem Landeplatz des Schmetterlings.
 *
 * Eine Regel für alle Sprachen und Breiten: Er landet auf dem letzten
 * Buchstaben der ersten Zeile. Über ihr steht nichts, so berührt er nie eine
 * andere Zeile, und weil jede Sprache anders umbricht, wird die Zeile nach dem
 * Umbruch gemessen – neu bei jeder Breitenänderung und sobald die Schrift
 * geladen ist. Bis dahin (und ohne JavaScript) steht er am Ende des ersten Worts.
 */
export function BalanceHeadline({ title, className }: { title: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [at, setAt] = useState(() => lastLetter(title, 0, title.split(" ")[0]));

  useLayoutEffect(() => {
    const heading = ref.current;
    if (!heading) return;
    const place = () => {
      const words = Array.from(heading.querySelectorAll<HTMLElement>("[data-word]"));
      const firstTop = words[0]?.offsetTop ?? 0;
      const lineEnd = words.filter((word) => Math.abs(word.offsetTop - firstTop) < 4).at(-1);
      if (!lineEnd) return;
      setAt(lastLetter(title, Number(lineEnd.dataset.start), lineEnd.dataset.word ?? ""));
    };
    place();
    void document.fonts.ready.then(place);
    const observer = new ResizeObserver(place);
    observer.observe(heading);
    return () => observer.disconnect();
  }, [title]);

  const letter = title[at];
  const feet = letterTop(letter) + HOVER;
  const shift = letterShift[letter] ?? 0;

  // Wörter einzeln, damit sich die erste Zeile messen lässt; der Umbruch bleibt der des Fließtexts.
  let start = 0;
  const words = title.split(" ").map((word) => {
    const from = start;
    start += word.length + 1;
    return { word, from };
  });

  return (
    <h2 ref={ref} id="closing-title" className={className}>
      {words.map(({ word, from }, index) => {
        const inWord = at >= from && at < from + word.length;
        return (
          <span key={from}>
            {/* Wörter nicht trennen: Der Landeplatz ist ein eigener Kasten, sonst
                bräche hinter ihm die Zeile und er rutschte in die nächste. */}
            <span data-word={word} data-start={from} className="whitespace-nowrap">
              {inWord ? (
                <>
                  {word.slice(0, at - from)}
                  <span className="relative inline-block">
                    {letter}
                    <span
                      aria-hidden
                      className="balance-butterfly absolute left-1/2 block w-[0.8em]"
                      style={{ bottom: `${feet}em`, marginLeft: `${shift - 0.4}em` }}
                    >
                      <span className="balance-wings block">
                        <LogoButterfly className="block h-auto w-full text-[var(--color-moss)]" />
                      </span>
                    </span>
                  </span>
                  {word.slice(at - from + 1)}
                </>
              ) : (
                word
              )}
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </h2>
  );
}
