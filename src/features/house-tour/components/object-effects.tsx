"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { quantityFor } from "../model/calculator";
import type { TourQuestion } from "../model/types";
import styles from "./object-effects.module.css";

/**
 * Kleine Animationen am gerade gefragten Gegenstand. Die Ausschnitte liegen
 * pixelgenau über dem Gemälde; bewegt sich einer, erscheint er doppelt. Deshalb
 * bewegt sich hier nie der Gegenstand selbst, nur Licht, Wasser und Tiere um
 * ihn herum. Alle Positionen in Prozent der Objektbox aus
 * `full-house-layout.json`, damit sie mit jeder Bildgröße mitgehen.
 *
 * Die Effekte folgen der Antwort und der Menge: mehr Songs unter der Dusche,
 * mehr Tropfen und Noten; mehr Autokilometer, mehr Abgas. Jede Eingabe löst
 * zusätzlich einen kurzen Impuls am Gegenstand aus, damit man sieht, dass die
 * Szene sie gehört hat.
 */
const at = (left: number, top: number, extra?: CSSProperties): CSSProperties => ({
  left: `${left}%`,
  top: `${top}%`,
  ...extra
});

/** Die Effekte bekommen die Antwort, die Menge im Alltagsmaß und deren Lage im Reglerbereich. */
type EffectInput = { answer?: string; quantity: number; level: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function Bee({ path, delay }: { path: string; delay: number }) {
  return (
    <span className={`${styles.beeTrack} ${styles[path]}`} style={{ animationDelay: `${delay}s` }}>
      <svg viewBox="0 0 12 8" className={styles.bee}>
        <ellipse cx="4.5" cy="2.6" rx="2.6" ry="1.8" className={styles.beeWing} />
        <ellipse cx="7" cy="2.4" rx="2.2" ry="1.6" className={styles.beeWing} />
        <ellipse cx="6" cy="5" rx="4" ry="2.4" fill="#2b2418" />
        <rect x="4" y="2.8" width="1.4" height="4.4" fill="#e9b93a" />
        <rect x="6.6" y="2.7" width="1.4" height="4.6" fill="#e9b93a" />
      </svg>
    </span>
  );
}

const beeFlights: [string, number][] = [["beeA", 0], ["beeB", -2.4], ["beeC", -4.1], ["beeA", -3.3], ["beeB", -5.6]];
const bees = (count: number) =>
  beeFlights.slice(0, count).map(([path, delay], index) => <Bee key={index} path={path} delay={delay} />);

/** Lichtfarbe je Leuchtmittel: Halogen warm-orange, LED kühlweiß. */
const lampColors: Record<string, { glow: string; shade: string; strength: number }> = {
  "light-old": { glow: "255 165 70", shade: "255 205 130", strength: 1 },
  "light-mixed": { glow: "255 222 168", shade: "255 240 210", strength: 0.9 },
  "light-led": { glow: "190 218 255", shade: "228 240 255", strength: 0.85 },
  "light-average": { glow: "255 214 160", shade: "255 236 200", strength: 0.9 },
  default: { glow: "255 221 160", shade: "255 246 222", strength: 1 }
};

function Lamp({ x, y, glow, shade, answer, scale = 1 }: {
  x: number; y: number; glow: number; shade: [string, string]; answer?: string; scale?: number;
}) {
  const color = lampColors[answer ?? "default"] ?? lampColors.default;
  const vars = { "--glow": color.glow, "--shade": color.shade, opacity: color.strength } as CSSProperties;
  return (
    // Der Schlüssel startet das Einschalten neu, sobald die Antwort die Farbe ändert.
    <span key={answer ?? "default"} className={styles.lamp} style={vars}>
      <span className={styles.lampGlow} style={at(x, y + 1, { width: `${glow * scale}%`, transition: "width 400ms ease-out" })} />
      <span className={styles.shadeLight} style={at(x, y, { width: shade[0], height: shade[1] })} />
    </span>
  );
}

/** Duschart: Feinheit und Dampf. Die Sparbrause spritzt fein und dampft nicht. */
const showerStyles: Record<string, { seconds: number; thin?: boolean; steamy: boolean }> = {
  "bath-long": { seconds: 0.8, steamy: true },
  "bath-normal": { seconds: 0.9, steamy: true },
  "bath-eco": { seconds: 1.05, thin: true, steamy: false }
};

/** Wärme über dem Bett: fossile Träger glühen orange, erneuerbare sanft. */
const heatColors: Record<string, string> = {
  "heat-oil": "255 120 60",
  "heat-gas": "255 150 80",
  "heat-district": "255 200 120",
  "heat-pump": "255 215 150",
  "heat-unknown": "255 170 100"
};

const effects: Record<string, (input: EffectInput) => ReactNode> = {
  // Nachttischlampe; ein rotes Standby-Licht je zwei Geräte, höchstens acht.
  "bedroom-standby": ({ quantity }) => {
    const lights = clamp(Math.ceil(quantity / 2), 0, 8);
    return (
      <>
        <Lamp x={48} y={12} glow={150} shade={["52%", "18%"]} />
        {Array.from({ length: lights }, (_, index) => (
          <span key={index} className={styles.standbyLight}
            style={at(58 + (index % 4) * 8, 47 + Math.floor(index / 4) * 8, { animationDelay: `${index * 0.45}s` })} />
        ))}
      </>
    );
  },
  // Stehlampe: Lichtfarbe nach Leuchtmittel, Lichthof nach Zahl der Leuchtstellen.
  "living-lighting": ({ answer, level }) => (
    <Lamp x={40} y={14} glow={260} scale={0.55 + level * 0.9} shade={["82%", "20%"]} answer={answer} />
  ),
  // Fernseher: je mehr Haushaltsstrom, desto heller und unruhiger das Bildschirmlicht.
  "living-tv-streaming": ({ level }) => (
    <span className={styles.lamp} style={{ opacity: 0.35 + level * 0.65, transition: "opacity 400ms ease-out" }}>
      <span className={styles.tvGlow} style={at(30, 24, { width: "480%", animationDuration: `${(5.5 - level * 3.7).toFixed(2)}s` })} />
    </span>
  ),
  // Dusche: Tropfen und Dampf wachsen mit der Dauer, und für jeden Song steigt eine Note auf.
  "bath-shower": ({ answer, quantity, level }) => {
    const state = showerStyles[answer ?? ""] ?? showerStyles["bath-normal"];
    const drops = Math.round(3 + level * 15);
    const steam = state.steamy ? (level > 0.45 ? 3 : level > 0.2 ? 1 : 0) : 0;
    const notes = clamp(Math.ceil(quantity), 0, 6);
    return (
      <>
        <span className={styles.rain} style={at(38, 11, { width: "22%", height: "74%" })}>
          {Array.from({ length: drops }, (_, index) => (
            <span key={index} className={state.thin ? `${styles.drop} ${styles.dropThin}` : styles.drop}
              style={{ left: `${(index * 61) % 100}%`, animationDuration: `${state.seconds}s`, animationDelay: `${(index * state.seconds / drops).toFixed(3)}s` }} />
          ))}
        </span>
        {[[50, 30, "60%", 0], [62, 22, "45%", 1.6], [40, 18, "50%", 0.8]].slice(0, steam).map(([left, top, width, delay]) => (
          <span key={`${left}`} className={styles.steam} style={at(left as number, top as number, { width: width as string, animationDelay: `${delay}s` })} />
        ))}
        {Array.from({ length: notes }, (_, index) => (
          <span key={`note-${index}`} className={styles.note}
            style={at(30 + ((index * 37) % 50), 14, { animationDelay: `${(index * 0.55).toFixed(2)}s` })}>
            {index % 2 ? "♫" : "♪"}
          </span>
        ))}
      </>
    );
  },
  // Waschbecken: ein Tropfen löst sich vom Hahn und trifft das Becken.
  "bath-water-heating": () => (
    <>
      <span className={styles.drip} style={at(54.5, 15)} />
      <span className={styles.ripple} style={at(54.5, 27, { width: "9%" })} />
    </>
  ),
  // Toilette: Wasserringe im Becken, mehr Ringe bei mehr Spülungen, größer bei voller Spülung.
  "bath-toilet": ({ answer, quantity }) => {
    const rings = clamp(Math.round(quantity / 3), 1, 4);
    const width = answer === "flush-full" ? "70%" : answer === "flush-saving" ? "42%" : "56%";
    return Array.from({ length: rings }, (_, index) => (
      <span key={index} className={styles.swirl}
        style={at(52, 50, { width, animationDelay: `${(index * 2.4 / rings).toFixed(2)}s` })} />
    ));
  },
  // Bett: Wärme steigt auf, stärker mit dem Verbrauch, in der Farbe des Energieträgers.
  "bedroom-heating": ({ answer, level }) => {
    const waves = clamp(Math.round(1 + level * 4), 1, 4);
    const vars = { "--heat": heatColors[answer ?? ""] ?? heatColors["heat-unknown"] } as CSSProperties;
    return (
      <span className={styles.lamp} style={vars}>
        <span className={styles.heatGlow} style={at(50, 45, { width: "115%", opacity: 0.45 + level * 0.55 })} />
        {Array.from({ length: waves }, (_, index) => (
          <span key={index} className={styles.heatWave}
            style={at(20 + index * 20, 30, { width: "30%", animationDelay: `${(index * 0.7).toFixed(1)}s` })} />
        ))}
      </span>
    );
  },
  // Auto: Abgas nur beim Verbrenner, mehr bei mehr Kilometern. Elektroauto und
  // kein Auto bleiben still; der Impuls nach der Eingabe genügt dort.
  "mobility-km": ({ answer, level }) => {
    if (answer === "car-combustion" || answer === "car-efficient") {
      const most = answer === "car-combustion" ? 5 : 3;
      const puffs = clamp(Math.round(level * most + 0.5), 1, most);
      return Array.from({ length: puffs }, (_, index) => (
        <span key={index} className={styles.exhaust}
          style={at(49, 81, { width: answer === "car-combustion" ? "22%" : "16%", animationDelay: `${(index * 2.7 / puffs).toFixed(2)}s` })} />
      ));
    }
    return null;
  },
  // Hochbeet: Rasen wird gesprengt (mehr Fläche, mehr Strahl), das naturnahe Beet summt.
  "garden-ground": ({ answer, level }) => {
    if (answer === "lawn") {
      // Zwei Tropfen je Strahl, versetzt: sonst ist ein Strahl die halbe Zeit unsichtbar.
      const jets = clamp(Math.round(4 + level * 10), 4, 14);
      return Array.from({ length: jets * 2 }, (_, index) => (
        <span key={index} className={styles.spray}
          style={at(50, 30, { "--angle": `${-70 + ((index % jets) * 140) / Math.max(1, jets - 1)}deg`, animationDelay: `${((index % jets) * 0.9 / jets + (index >= jets ? 0.45 : 0)).toFixed(2)}s` } as CSSProperties)} />
      ));
    }
    if (answer === "natural-bed") return bees(2);
    return null;
  },
  // Apfelbaum: heimische Blüten ziehen Bienen an, Zierpflanzen kaum.
  "garden-plants": ({ answer }) => bees(answer === "native" ? 4 : answer === "ornamental" ? 1 : 0),
  // Insektenhotel: keine, zwei oder fünf Wildbienen.
  "garden-structures": ({ answer }) => bees(answer === "diverse" ? 5 : answer === "hotel" ? 2 : 0)
};

/**
 * Der Impuls nach jeder Eingabe: Blätter für eine Wahl, die der Natur und dem
 * Klima hilft, graue Wölkchen für eine, die belastet. Mehr Teilchen bei mehr
 * Menge. Er läuft erst nach einer Eingabe, nicht beim Öffnen des Gegenstands,
 * und wartet, bis der Regler zur Ruhe kommt.
 */
function ReactionBurst({ trigger, tone, level }: { trigger: string; tone: "good" | "bad" | "neutral"; level: number }) {
  const [burst, setBurst] = useState(0);
  const first = useRef(trigger);
  useEffect(() => {
    if (trigger === first.current) return;
    const timer = window.setTimeout(() => setBurst((count) => count + 1), 180);
    return () => window.clearTimeout(timer);
  }, [trigger]);
  if (burst === 0) return null;
  const count = Math.round(5 + level * 7);
  const particle = tone === "good" ? styles.leaf : tone === "bad" ? styles.puff : styles.spark;
  return (
    <span key={burst} className={styles.burst}>
      <span className={styles.ping} />
      {Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2 + 0.4;
        return (
          <span key={index} className={particle}
            style={{
              "--dx": `${Math.cos(angle) * (60 + (index % 3) * 18)}%`,
              "--dy": `${Math.sin(angle) * 45 - 70 - (index % 2) * 25}%`,
              "--spin": `${(index % 2 ? 1 : -1) * (90 + index * 25)}deg`,
              animationDelay: `${(index % 4) * 40}ms`
            } as CSSProperties} />
        );
      })}
    </span>
  );
}

export function ObjectEffect({ id, question, answer, adjustments }: {
  id: string;
  question: TourQuestion;
  answer?: string;
  adjustments: Record<string, number>;
}) {
  const adjust = question.adjust;
  const quantity = answer && adjust ? quantityFor(question, answer, adjustments) : 0;
  // Ohne Regler steht die Antwort für die Menge: die belastendste Option ist „viel“.
  const level = adjust ? clamp((quantity - adjust.min) / (adjust.max - adjust.min || 1), 0, 1) : 0.5;
  const option = question.options.find((item) => item.id === answer);
  const score = option ? Object.values(option.impact).reduce<number>((sum, value) => sum + (value ?? 0), 0) : 0;
  const tone = score > 2 ? "good" : score < -2 ? "bad" : "neutral";
  const render = effects[id];

  return (
    <span aria-hidden className={styles.layer}>
      {render?.({ answer, quantity, level })}
      {/* Immer gemountet: die erste Antwort muss den Impuls schon auslösen. */}
      <ReactionBurst trigger={answer ? `${answer}|${quantity}` : ""} tone={tone} level={level} />
    </span>
  );
}
