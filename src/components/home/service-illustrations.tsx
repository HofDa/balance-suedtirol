import type { ReactNode } from "react";
import type { ServiceId } from "@/config/home-story";

/**
 * Bilder zu den sechs Ökosystemleistungen in der Sprache des Höhenschnitts
 * (richness-profile.tsx) und des Lebensraums darunter: helles Gelände in
 * Almmoos mit Tintenkante, Pflanzen, Tiere und Menschen als volle Silhouetten
 * in Tinte, Lichter in Papierfarbe. Jede Szene sitzt in einem runden Fenster,
 * damit die sechs als Reihe gleich schwer wirken. Wo es um den Boden geht,
 * ist das Gelände aufgeschnitten.
 */
const moss = "var(--color-moss)";
const paper = "var(--color-paper)";

/** Gelände: Fläche in Almmoos bis zum Rand, darüber die Tintenkante. */
function Ground({ d }: { d: string }) {
  return (
    <>
      <path d={`${d}V96H0Z`} fill={moss} />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </>
  );
}

/** Fichte wie im Höhenschnitt: drei Stufen, kurzer Stamm. */
function spruce(x: number, base: number, h: number, w: number) {
  const left: [number, number][] = [[x, base - h]];
  const right: [number, number][] = [];
  for (let i = 1; i <= 3; i++) {
    const y = base - h + (h * 0.82 * i) / 3;
    const hw = (w / 2) * (0.4 + (0.6 * i) / 3);
    left.push([x - hw, y]);
    right.push([x + hw, y]);
    if (i < 3) {
      left.push([x - hw * 0.45, y - h * 0.04]);
      right.push([x + hw * 0.45, y - h * 0.04]);
    }
  }
  const yl = left[left.length - 1][1];
  const tw = Math.max(1.1, h * 0.04);
  const pts = [...left, [x - tw, yl], [x - tw, base + 1], [x + tw, base + 1], [x + tw, yl], ...right.reverse()];
  return <path d={`M${pts.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join("L")}Z`} />;
}

/** Laubbaum wie im Höhenschnitt: Stamm, Krone aus fünf Ballen. */
function roundTree(x: number, base: number, h: number, r: number) {
  const cy = base - h + r;
  const tw = Math.max(1.2, r * 0.13);
  return (
    <>
      <path d={`M${x - tw} ${base + 1}L${x - tw * 0.7} ${cy}H${x + tw * 0.7}L${x + tw} ${base + 1}Z`} />
      {[
        [0, 0, 0.78],
        [-0.48, 0.2, 0.56],
        [0.5, 0.18, 0.56],
        [-0.1, -0.42, 0.52],
        [0.28, -0.3, 0.5]
      ].map(([dx, dy, rr]) => (
        <circle key={`${dx}${dy}`} cx={x + dx * r} cy={cy + dy * r} r={rr * r} />
      ))}
    </>
  );
}

/** Grasbüschel: drei spitze Halme. */
function tuft(x: number, base: number, s = 1) {
  return (
    <path
      d={`M${x - 3 * s} ${base + 1}L${x - 2.4 * s} ${base - 5 * s}L${x - 1 * s} ${base + 1}ZM${x - 0.9 * s} ${base + 1}L${x} ${base - 7 * s}L${x + 0.9 * s} ${base + 1}ZM${x + 1 * s} ${base + 1}L${x + 2.6 * s} ${base - 5 * s}L${x + 3 * s} ${base + 1}Z`}
    />
  );
}

/** Margerite: Blattkranz in Tinte, Mitte in Papier. */
function daisy(x: number, y: number, r: number) {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={x + r * Math.cos(a)} cy={y + r * Math.sin(a)} r={r * 0.62} />;
      })}
      <circle cx={x} cy={y} r={r * 0.62} fill={paper} />
      <circle cx={x} cy={y} r={r * 0.26} />
    </>
  );
}

function drop(x: number, y: number) {
  return <path d={`M${x} ${y - 5}C${x + 2.6} ${y - 1.4} ${x + 3.4} ${y + 0.6} ${x + 3.4} ${y + 2}A3.4 3.4 0 0 1 ${x - 3.4} ${y + 2}C${x - 3.4} ${y + 0.6} ${x - 2.6} ${y - 1.4} ${x} ${y - 5}Z`} />;
}

const thin = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const dotted = { ...thin, strokeWidth: 1.7, strokeDasharray: "0.1 3.6" } as const;

const drawings: Record<ServiceId, ReactNode> = {
  pollination: (
    <>
      <Ground d="M0 72Q48 66 96 72" />
      <path d="M34 70V44M60 70V54" {...thin} strokeWidth={1.8} />
      <path d="M34 60c-6 0-10-3-11-8 6-1 10 2 11 8ZM60 64c5 0 8-3 9-7-5-1-8 2-9 7Z" />
      {daisy(34, 40, 6)}
      {daisy(60, 51, 4.4)}
      {tuft(14, 70.5)}
      {tuft(46, 69)}
      {tuft(80, 70, 0.9)}
      <path d="M41 33C48 22 58 20 66 26" {...dotted} />
      {/* Biene: Leib mit Streifen in Papier, Flügel als helle Ovale. */}
      <ellipse cx="72.5" cy="27" rx="5" ry="3.4" transform="rotate(-18 72.5 27)" />
      <path d="M71 23.7l1.4 6M73.6 22.9l1.4 6" stroke={paper} strokeWidth="1.1" />
      <circle cx="78" cy="25" r="2.2" />
      <ellipse cx="70" cy="21" rx="2.4" ry="3.8" transform="rotate(-30 70 21)" fill={paper} stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="74" cy="20" rx="2" ry="3.4" transform="rotate(14 74 20)" fill={paper} stroke="currentColor" strokeWidth="1.2" />
    </>
  ),
  water: (
    <>
      <Ground d="M0 46Q24 42 48 46T96 46" />
      {/* Im Boden gespeichertes Wasser. */}
      <path d="M8 66q5-3 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0M8 76q5-3 10 0t10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0" {...thin} strokeWidth={1.6} />
      <path d="M30 50v9M50 52v9M68 50v9" {...thin} strokeDasharray="2 3.2" opacity="0.6" />
      {drop(30, 15)}
      {drop(50, 24)}
      {drop(68, 12)}
      {tuft(14, 45)}
      {tuft(40, 45.5, 0.9)}
      {/* Röhricht am Feuchtgebiet. */}
      <path d="M74 46V27M80 46V24M86 46V30" {...thin} strokeWidth={1.3} />
      <rect x="72.6" y="28" width="2.8" height="8" rx="1.4" />
      <rect x="78.6" y="25" width="2.8" height="8" rx="1.4" />
      <path d="M84 46c0-6 1-11 4-15-1 5-1 10 0 15Z" />
    </>
  ),
  cooling: (
    <>
      <Ground d="M0 74Q48 70 96 74" />
      <ellipse cx="44" cy="73" rx="26" ry="4" opacity="0.2" />
      <circle cx="75" cy="20" r="7" />
      <path
        d="M75 8.5v3M75 28.5v3M63.5 20h3M83.5 20h3M66.9 11.9l2.1 2.1M81 26l2.1 2.1M83.1 11.9 81 14M69 26l-2.1 2.1"
        {...thin}
        strokeWidth={1.8}
      />
      {/* Hitze über dem offenen Boden, Schatten unter dem Baum. */}
      <path d="M84 64c-2-2 2-4 0-6s2-4 0-6M90 66c-2-2 2-4 0-6s2-4 0-6" {...thin} opacity="0.55" />
      {roundTree(38, 73, 54, 19)}
      <circle cx="57.4" cy="55.6" r="2.5" />
      <path d="M54.6 59.4h5.6l-.6 7.4h-4.4Z" />
      <path d="M56 66.5l-.4 6.5M58.6 66.5l.5 6.5" {...thin} strokeWidth={2.2} />
      <path d="M55 60.5l-1.8 5.5M59.8 60.5l1.8 5.5" {...thin} strokeWidth={1.8} />
    </>
  ),
  soil: (
    <>
      <Ground d="M0 40Q48 37 96 40" />
      <path d="M0 74Q48 71 96 74V96H0Z" opacity="0.1" />
      <path d="M48 39V20" {...thin} strokeWidth={1.8} />
      <path d="M48 30c-7 0-11-4-12-9 7-1 11 3 12 9ZM48 25c6 0 10-3.5 11-8-6-1-10 2.5-11 8Z" />
      <path d="M48 40v18M48 46l-6 8-2 6M48 48l7 8 2 6M48 54l-4 8" {...thin} strokeWidth={1.3} />
      {tuft(14, 39.5)}
      {tuft(80, 39.5, 0.9)}
      {/* Regenwurm, Käfer und kleine Bodentiere. */}
      <path d="M12 66c4-6 10-6 14 0s10 6 14 0" {...thin} strokeWidth={3.8} />
      <ellipse cx="74" cy="60" rx="5" ry="3.6" />
      <circle cx="79.6" cy="59" r="2" />
      <path d="M71 63l-2 3M74 63.5v3.5M77 63l2 3M80.6 57.4l2.4-2.4" {...thin} strokeWidth={1.1} />
      {[
        [22, 50, 1.5],
        [30, 56, 1.1],
        [64, 50, 1.4],
        [86, 52, 1.1],
        [24, 82, 1.3],
        [56, 84, 1.6],
        [80, 80, 1.2],
        [66, 68, 1]
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
    </>
  ),
  carbon: (
    <>
      <Ground d="M0 62Q48 58 96 62" />
      {/* Kohlenstoff, der im Boden bleibt: dunklere Schicht mit Körnern. */}
      <path d="M0 78Q48 75 96 78V96H0Z" opacity="0.14" />
      {[
        [18, 84],
        [30, 88],
        [44, 83],
        [60, 87],
        [74, 84],
        [86, 89]
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.3" />
      ))}
      <path d="M56 62v8M56 66l-7 6M56 66l7 7M78 62v6M78 65l-4 4M78 65l4 4" {...thin} strokeWidth={1.3} />
      {spruce(56, 61, 46, 26)}
      {spruce(79, 62, 26, 15)}
      {tuft(16, 61)}
      <text x="15" y="27" fontSize="10.5" fontWeight="700" fontFamily="inherit">
        CO₂
      </text>
      <path d="M25 31c2 6 8 9 15 9" {...dotted} />
      <path d="M37.6 36.6l3.6 3.4-4.4 2.4" {...thin} strokeWidth={1.6} />
    </>
  ),
  erosion: (
    <>
      <Ground d="M0 28L96 76" />
      {/* Wurzeln halten den Hang. */}
      <path
        d="M24 40v10M24 44l-6 7M24 44l6 9M18 51l-2 5M30 53l1 5M54 55v9M54 58l-6 6M54 58l6 8M48 64l-1 5"
        {...thin}
        strokeWidth={1.3}
      />
      {spruce(24, 40, 30, 16)}
      {roundTree(54, 55, 22, 8)}
      {tuft(38, 47)}
      {tuft(70, 63, 0.9)}
      {tuft(84, 70, 0.8)}
      <path d="M62 8l-3 7M72 6l-3 7M82 10l-3 7M68 18l-3 7M78 20l-3 7" {...thin} strokeWidth={1.6} opacity="0.6" />
    </>
  )
};

export function ServiceIllustration({ id, className }: { id: ServiceId; className?: string }) {
  const clip = `service-window-${id}`;
  return (
    <svg viewBox="0 0 96 96" fill="currentColor" aria-hidden focusable="false" className={className}>
      <defs>
        <clipPath id={clip}>
          <circle cx="48" cy="48" r="46" />
        </clipPath>
      </defs>
      <circle cx="48" cy="48" r="46" fill={paper} />
      <g clipPath={`url(#${clip})`}>{drawings[id]}</g>
    </svg>
  );
}
