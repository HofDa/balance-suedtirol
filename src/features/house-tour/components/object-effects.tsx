import type { CSSProperties, ReactNode } from "react";
import styles from "./object-effects.module.css";

/**
 * Kleine Animationen am gerade gefragten Gegenstand. Die Ausschnitte liegen
 * pixelgenau über dem Gemälde; bewegt sich einer, erscheint er doppelt. Deshalb
 * bewegt sich hier nie der Gegenstand selbst, nur Licht, Wasser und Tiere um
 * ihn herum. Alle Positionen in Prozent der Objektbox aus
 * `full-house-layout.json`, damit sie mit jeder Bildgröße mitgehen.
 */
const at = (left: number, top: number, extra?: CSSProperties): CSSProperties => ({
  left: `${left}%`,
  top: `${top}%`,
  ...extra
});

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

/** Lichtfarbe je Leuchtmittel: Halogen warm-orange, LED kühlweiß. */
const lampColors: Record<string, { glow: string; shade: string; strength: number }> = {
  "light-old": { glow: "255 165 70", shade: "255 205 130", strength: 1 },
  "light-mixed": { glow: "255 222 168", shade: "255 240 210", strength: 0.9 },
  "light-led": { glow: "190 218 255", shade: "228 240 255", strength: 0.85 },
  "light-average": { glow: "255 214 160", shade: "255 236 200", strength: 0.9 },
  default: { glow: "255 221 160", shade: "255 246 222", strength: 1 }
};

function Lamp({ x, y, glow, shade, answer }: { x: number; y: number; glow: string; shade: [string, string]; answer?: string }) {
  const color = lampColors[answer ?? "default"] ?? lampColors.default;
  const vars = { "--glow": color.glow, "--shade": color.shade, opacity: color.strength } as CSSProperties;
  return (
    // Der Schlüssel startet das Einschalten neu, sobald die Antwort die Farbe ändert.
    <span key={answer ?? "default"} className={styles.lamp} style={vars}>
      <span className={styles.lampGlow} style={at(x, y + 1, { width: glow })} />
      <span className={styles.shadeLight} style={at(x, y, { width: shade[0], height: shade[1] })} />
    </span>
  );
}

/** Stromverbrauch: je höher, desto heller und unruhiger das Bildschirmlicht. */
const tvStates: Record<string, { strength: number; seconds: number }> = {
  "electricity-high": { strength: 1, seconds: 1.8 },
  "electricity-medium": { strength: 0.75, seconds: 3.2 },
  "electricity-low": { strength: 0.45, seconds: 5.5 }
};

/** Duschart: Tropfenzahl, Tempo und Dampf. Die Sparbrause spritzt fein und dampft nicht. */
const showerStates: Record<string, { drops: number; seconds: number; steam: number; thin?: boolean }> = {
  "bath-long": { drops: 15, seconds: 0.8, steam: 3 },
  "bath-normal": { drops: 10, seconds: 0.9, steam: 1 },
  "bath-eco": { drops: 6, seconds: 1.05, steam: 0, thin: true }
};

/** Wildbienen je Lebensraum-Ausstattung. */
const beeCounts: Record<string, number> = { none: 0, hotel: 2, diverse: 5 };
const beeFlights: [string, number][] = [["beeA", 0], ["beeB", -2.4], ["beeC", -4.1], ["beeA", -3.3], ["beeB", -5.6]];

const effects: Record<string, (answer?: string) => ReactNode> = {
  // Nachttischlampe; kleine rote Standby-Lichter je nach Antwort (3 / 1 / 0).
  "bedroom-standby": (answer) => {
    const lights = answer === "standby-all" ? 3 : answer === "standby-partial" ? 1 : 0;
    return (
      <>
        <Lamp x={48} y={12} glow="150%" shade={["52%", "18%"]} />
        {Array.from({ length: lights }, (_, index) => (
          <span key={index} className={styles.standbyLight} style={at(64 + index * 6, 47, { animationDelay: `${index * 0.7}s` })} />
        ))}
      </>
    );
  },
  // Stehlampe: Lichtfarbe nach Leuchtmittel.
  "living-lighting": (answer) => <Lamp x={40} y={14} glow="260%" shade={["82%", "20%"]} answer={answer} />,
  // Fernseher: bläuliches Bildschirmlicht auf der Wand.
  "living-tv-streaming": (answer) => {
    const state = tvStates[answer ?? ""] ?? tvStates["electricity-medium"];
    return (
      <span className={styles.lamp} style={{ opacity: state.strength }}>
        <span className={styles.tvGlow} style={at(30, 24, { width: "480%", animationDuration: `${state.seconds}s` })} />
      </span>
    );
  },
  // Dusche: Tropfen aus dem Kopf, bei langen Duschen mehr Dampf.
  "bath-shower": (answer) => {
    const state = showerStates[answer ?? ""] ?? showerStates["bath-normal"];
    return (
      <>
        <span className={styles.rain} style={at(38, 11, { width: "22%", height: "74%" })}>
          {Array.from({ length: state.drops }, (_, index) => (
            <span key={index} className={state.thin ? `${styles.drop} ${styles.dropThin}` : styles.drop}
              style={{ left: `${(index * 61) % 100}%`, animationDuration: `${state.seconds}s`, animationDelay: `${(index * state.seconds / state.drops).toFixed(3)}s` }} />
          ))}
        </span>
        {[[50, 30, "60%", 0], [62, 22, "45%", 1.6], [40, 18, "50%", 0.8]].slice(0, state.steam).map(([left, top, width, delay]) => (
          <span key={`${left}`} className={styles.steam} style={at(left as number, top as number, { width: width as string, animationDelay: `${delay}s` })} />
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
  // Auto: lädt als Elektroauto an der Wallbox, stößt als Verbrenner Abgas aus.
  "mobility-km": (answer) => {
    if (answer === "car-electric") return <span className={styles.chargeLight} style={at(-5, 13)} />;
    if (answer === "car-combustion" || answer === "car-efficient") {
      const puffs = answer === "car-combustion" ? [0, 0.9, 1.8] : [0, 1.4];
      return puffs.map((delay) => (
        <span key={delay} className={styles.exhaust} style={at(49, 81, { width: answer === "car-combustion" ? "14%" : "10%", animationDelay: `${delay}s` })} />
      ));
    }
    return null;
  },
  // Insektenhotel: keine, zwei oder fünf Wildbienen.
  "garden-structures": (answer) =>
    beeFlights.slice(0, beeCounts[answer ?? ""] ?? 2).map(([path, delay], index) => (
      <Bee key={index} path={path} delay={delay} />
    ))
};

export function ObjectEffect({ id, answer }: { id: string; answer?: string }) {
  const render = effects[id];
  if (!render) return null;
  return (
    <span aria-hidden className={styles.layer}>
      {render(answer)}
    </span>
  );
}
