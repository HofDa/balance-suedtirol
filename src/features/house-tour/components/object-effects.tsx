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

const effects: Record<string, () => ReactNode> = {
  // Nachttischlampe: geht an, der Schirm leuchtet warm.
  "bedroom-standby": () => (
    <>
      <span className={styles.lampGlow} style={at(48, 13, { width: "150%" })} />
      <span className={styles.shadeLight} style={at(48, 12, { width: "52%", height: "18%" })} />
    </>
  ),
  // Stehlampe: dasselbe Licht, größerer Schirm.
  "living-lighting": () => (
    <>
      <span className={styles.lampGlow} style={at(40, 14, { width: "260%" })} />
      <span className={styles.shadeLight} style={at(40, 14, { width: "82%", height: "20%" })} />
    </>
  ),
  // Fernseher: bläuliches Bildschirmlicht flackert auf der Wand.
  "living-tv-streaming": () => <span className={styles.tvGlow} style={at(30, 24, { width: "480%" })} />,
  // Dusche: Tropfen aus dem Kopf, etwas Dampf.
  "bath-shower": () => (
    <>
      <span className={styles.rain} style={at(38, 11, { width: "22%", height: "74%" })}>
        {[6, 22, 38, 54, 70, 86, 14, 46, 78, 30, 62].map((left, index) => (
          <span key={index} className={styles.drop} style={{ left: `${left}%`, animationDelay: `${(index * 0.083).toFixed(3)}s` }} />
        ))}
      </span>
      <span className={styles.steam} style={at(50, 30, { width: "60%" })} />
      <span className={styles.steam} style={at(62, 22, { width: "45%", animationDelay: "1.6s" })} />
    </>
  ),
  // Waschbecken: ein Tropfen löst sich vom Hahn und trifft das Becken.
  "bath-water-heating": () => (
    <>
      <span className={styles.drip} style={at(54.5, 15)} />
      <span className={styles.ripple} style={at(54.5, 27, { width: "9%" })} />
    </>
  ),
  // Auto: die Ladeanzeige der Wallbox pulsiert grün.
  "mobility-km": () => <span className={styles.chargeLight} style={at(-5, 13)} />,
  // Insektenhotel: Wildbienen fliegen ein und aus.
  "garden-structures": () => (
    <>
      <Bee path="beeA" delay={0} />
      <Bee path="beeB" delay={-2.4} />
      <Bee path="beeC" delay={-4.1} />
    </>
  )
};

export function ObjectEffect({ id }: { id: string }) {
  const render = effects[id];
  if (!render) return null;
  return (
    <span aria-hidden className={styles.layer}>
      {render()}
    </span>
  );
}
