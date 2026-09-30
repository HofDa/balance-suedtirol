"""
Erzeugt src/components/home/habitat-silhouette.tsx: einen Lebensraum aus
Silhouetten (Bäume, Wiese, Röhricht, Tiere) als Übergang in den dunklen
Abschnitt darunter.

Aufbau der Szene (viewBox 1440 × 280): Hohe Bäume nur an den Rändern, in der
Mitte (x 380–1060) nichts über y 190 – dort steht auf großen Bildschirmen der
Schlusssatz. Der Zufall ist geseedet; das Skript liefert jedes Mal dieselbe
Szene. Aufruf: python3 scripts/build-habitat-silhouette.py
"""

import math
import random
from pathlib import Path

W, H = 1440, 280
random.seed(7)


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def ground(x):
    return 262 + 5 * math.sin(x / 230) + 2.5 * math.sin(x / 97 + 1.3)


def poly(points):
    return "M" + " L".join(f"{f(x)} {f(y)}" for x, y in points) + "Z"


def circle(cx, cy, r):
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}"/>'


def blade(x, base, h, w, lean):
    tx, ty = x + lean, base - h
    return (
        f"M{f(x - w / 2)} {f(base + 3)}"
        f"Q{f(x + lean * 0.35 - w * 0.2)} {f(base - h * 0.55)} {f(tx)} {f(ty)}"
        f"Q{f(x + lean * 0.35 + w * 0.35)} {f(base - h * 0.5)} {f(x + w / 2)} {f(base + 3)}Z"
    )


def stem(x, base, h, lean, w=2.2):
    return blade(x, base, h, w, lean)


def spruce(x, base, h, w):
    tiers = 7
    left, right = [(x, base - h)], []
    for i in range(1, tiers + 1):
        y = base - h + h * 0.84 * i / tiers
        hw = w / 2 * (0.25 + 0.75 * i / tiers)
        left += [(x - hw, y)]
        right += [(x + hw, y)]
        if i < tiers:
            left += [(x - hw * 0.55, y - h * 0.035)]
            right += [(x + hw * 0.55, y - h * 0.035)]
    y_last = left[-1][1]
    trunk = [(x - 5, y_last), (x - 5, base + 4), (x + 5, base + 4), (x + 5, y_last)]
    return poly(left + trunk + list(reversed(right)))


def deciduous(x, base, h, r):
    """Laubbaum: sichtbarer Stamm mit zwei Ästen, Krone aus vielen kleinen,
    unregelmäßigen Blattballen statt einer runden Wolke."""
    crown_bottom = base - h + 1.75 * r
    parts = [f'<path d="{poly([(x - 7, base + 4), (x - 4.5, crown_bottom - 12), (x + 4.5, crown_bottom - 12), (x + 7, base + 4)])}"/>']
    parts.append(f'<path d="{poly([(x - 2, crown_bottom + 6), (x - r * 0.6, crown_bottom - r * 0.35), (x - r * 0.55, crown_bottom - r * 0.42), (x + 1, crown_bottom - 4)])}"/>')
    parts.append(f'<path d="{poly([(x + 2, crown_bottom + 2), (x + r * 0.58, crown_bottom - r * 0.45), (x + r * 0.52, crown_bottom - r * 0.5), (x - 1, crown_bottom - 8)])}"/>')
    cx, cy = x, base - h + r * 0.95
    rng = random.Random(int(x))
    for i in range(16):
        a = i / 16 * 2 * math.pi + rng.uniform(-0.15, 0.15)
        # Außenring: breiter als hoch, unten etwas eingezogen.
        rx, ry = r * 1.05, r * (0.82 if math.sin(a) < 0 else 0.7)
        px, py = cx + rx * math.cos(a) * rng.uniform(0.72, 0.92), cy + ry * math.sin(a) * rng.uniform(0.72, 0.92)
        parts.append(circle(px, py, r * rng.uniform(0.26, 0.36)))
    for dx, dy, rr in [(0, 0, 0.72), (-0.4, 0.1, 0.5), (0.42, 0.08, 0.5), (0, -0.35, 0.5)]:
        parts.append(circle(cx + dx * r, cy + dy * r, rr * r))
    return parts


def shrub(x, base, w, h):
    out = []
    n = 5
    for i in range(n):
        cx = x - w / 2 + w * (i + 0.5) / n
        rr = h * (0.55 + 0.3 * math.sin(i * 1.7 + x))
        out.append(circle(cx, base - rr * 0.8, rr))
    return out


def daisy(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [f'<path d="{stem(x, base, h, lean)}"/>', circle(tx, ty, 3.6)]
    for k in range(8):
        a = k * math.pi / 4
        out.append(circle(tx + 5.6 * math.cos(a), ty + 5.6 * math.sin(a), 2.5))
    return out


def umbel(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [f'<path d="{stem(x, base, h, lean)}"/>']
    for k in range(-3, 4):
        ex, ey = tx + k * 3.6, ty - 6 + abs(k) * 1.1
        out.append(f'<path d="{blade(tx, ty + 1, (ty + 1) - ey, 1.3, ex - tx)}"/>')
        out.append(circle(ex, ey, 2.1))
    return out


def bell(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [f'<path d="{stem(x, base, h, lean)}"/>']
    for i, (bx, by) in enumerate([(tx + 4, ty + 3), (tx - 1, ty + 14), (tx + 3, ty + 25)]):
        s = 1 - i * 0.12
        out.append(
            f'<path d="M{f(bx - 1)} {f(by - 1)}Q{f(bx - 6 * s)} {f(by + 2)} {f(bx - 5 * s)} {f(by + 8 * s)}'
            f'L{f(bx + 5 * s)} {f(by + 8 * s)}Q{f(bx + 6 * s)} {f(by + 2)} {f(bx + 1)} {f(by - 1)}Z"/>'
        )
    return out


def seedhead(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [f'<path d="{stem(x, base, h, lean, 1.6)}"/>']
    for i in range(6):
        t = i / 6
        sx, sy = tx - lean * t * 0.35, ty + t * h * 0.34
        side = -1 if i % 2 else 1
        out.append(
            f'<ellipse cx="{f(sx + side * 3.4)}" cy="{f(sy + 3)}" rx="1.7" ry="4.2" '
            f'transform="rotate({f(side * 28)} {f(sx + side * 3.4)} {f(sy + 3)})"/>'
        )
    return out


def cattail(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [f'<path d="{stem(x, base, h, lean, 2.6)}"/>']
    hx, hy = tx - lean * 0.12, ty + 12
    out.append(f'<rect x="{f(hx - 3.2)}" y="{f(hy - 11)}" width="6.4" height="22" rx="3.2"/>')
    return out


def hedgehog(x, base):
    pts = []
    for i in range(0, 25):
        t = math.pi * (0.97 - 0.86 * i / 24)
        r = 1.0 if i % 2 else 1.22
        pts.append((x + 25 * r * math.cos(t), base - 3 - 15 * r * math.sin(t)))
    snout = [(x + 22, base - 9), (x + 36, base - 3), (x + 23, base + 1)]
    body = poly(pts + snout + [(x - 24, base + 1)])
    legs = "".join(f'<rect x="{f(x + dx)}" y="{f(base - 2)}" width="4" height="6" rx="1.5"/>' for dx in (-15, 12))
    return [f'<path d="{body}"/>', legs]


def butterfly(x, y):
    return [
        f'<ellipse cx="{f(x - 7)}" cy="{f(y - 5)}" rx="8" ry="5.4" transform="rotate(-32 {f(x - 7)} {f(y - 5)})"/>',
        f'<ellipse cx="{f(x + 7)}" cy="{f(y - 5)}" rx="8" ry="5.4" transform="rotate(32 {f(x + 7)} {f(y - 5)})"/>',
        f'<ellipse cx="{f(x - 5)}" cy="{f(y + 4)}" rx="5" ry="4" transform="rotate(28 {f(x - 5)} {f(y + 4)})"/>',
        f'<ellipse cx="{f(x + 5)}" cy="{f(y + 4)}" rx="5" ry="4" transform="rotate(-28 {f(x + 5)} {f(y + 4)})"/>',
        f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="1.6" ry="7"/>',
        f'<path d="M{f(x - 0.6)} {f(y - 6)}Q{f(x - 3)} {f(y - 12)} {f(x - 6)} {f(y - 13)}" fill="none" stroke="currentColor" strokeWidth="1.2"/>',
        f'<path d="M{f(x + 0.6)} {f(y - 6)}Q{f(x + 3)} {f(y - 12)} {f(x + 6)} {f(y - 13)}" fill="none" stroke="currentColor" strokeWidth="1.2"/>',
    ]


def bird(x, y, s=1.0):
    return [
        f'<path d="M{f(x - 18 * s)} {f(y)}Q{f(x - 9 * s)} {f(y - 10 * s)} {f(x)} {f(y + 1 * s)}'
        f'Q{f(x + 9 * s)} {f(y - 10 * s)} {f(x + 18 * s)} {f(y)}Q{f(x + 9 * s)} {f(y - 4 * s)} {f(x)} {f(y + 5 * s)}'
        f'Q{f(x - 9 * s)} {f(y - 4 * s)} {f(x - 18 * s)} {f(y)}Z"/>'
    ]


# ---------------------------------------------------------------- Szene
groups = []  # (delay_ms, kind, [svg elements])


def add(delay, elements, kind="grow"):
    groups.append((delay, kind, elements if isinstance(elements, list) else [elements]))


def p(d):
    return f'<path d="{d}"/>'


# Ränder: Bäume und Sträucher, zuerst die hohen, damit die Szene von außen wächst.
g = ground
add(0, p(spruce(70, g(70), 222, 92)))
add(60, p(spruce(14, g(14), 134, 62)))
add(120, deciduous(190, g(190), 176, 48))
add(180, p(spruce(290, g(290), 150, 64)))
add(260, shrub(352, g(352), 72, 30))
add(0, p(spruce(1348, g(1348), 236, 96)))
add(60, p(spruce(1426, g(1426), 150, 60)))
add(120, deciduous(1236, g(1236), 190, 52))
add(260, shrub(1088, g(1088), 64, 26))
reeds = []
for i, rx in enumerate([1116, 1128, 1141, 1153, 1166]):
    h = [78, 96, 70, 102, 84][i]
    lean = [-4, 2, -2, 5, 1][i]
    reeds += cattail(rx, g(rx), h, lean) if i % 2 else [p(blade(rx, g(rx), h, 3.4, lean * 2))]
add(300, reeds)

# Mitte: nur niedrige Wiese, damit darüber der Satz Platz hat.
add(420, daisy(430, g(430), 44, 3))
add(460, umbel(474, g(474), 56, -2))
add(500, daisy(532, g(532), 36, -3))
add(540, bell(584, g(584), 52, 4))
add(580, seedhead(652, g(652), 64, 6))
add(620, umbel(702, g(702), 48, 3))
add(660, daisy(762, g(762), 50, -2))
add(700, bell(822, g(822), 44, -3))
add(740, umbel(862, g(862), 60, 2))
add(780, seedhead(952, g(952), 60, -5))
add(820, daisy(994, g(994), 42, 3))
add(860, bell(1034, g(1034), 50, 2))
add(900, seedhead(1062, g(1062), 58, 4))

# Gräser über die ganze Breite, in Büscheln gruppiert.
x = 0.0
cluster, cluster_start = [], 0.0
while x < W:
    mid = 380 <= x <= 1060
    h = random.uniform(14, 32) if mid else random.uniform(18, 46)
    cluster.append(blade(x, g(x), h, random.uniform(3.5, 5.5), random.uniform(-9, 9)))
    x += random.uniform(6, 12)
    if x - cluster_start > 120 or x >= W:
        add(200 + int(cluster_start / W * 500), p("".join(cluster)))
        cluster, cluster_start = [], x

# Tiere zuletzt.
add(1000, hedgehog(906, g(906)))
add(1100, butterfly(618, 192), "fade")
add(1150, bird(1182, 70) + bird(1214, 96, 0.7), "fade")

ground_path = "M0 280 L" + " L".join(f"{x} {f(g(x))}" for x in range(0, W + 1, 40)) + f" L{W} 280Z"

lines = []
for delay, kind, els in groups:
    lines.append(
        f'      <g className="habitat-{kind}" style={{{{ "--habitat-delay": "{delay}ms" }} as CSSProperties}}>'
        + "".join(els)
        + "</g>"
    )

tsx = f'''// Erzeugt von scripts/build-habitat-silhouette.py – dort ändern, nicht hier.
import type {{ CSSProperties }} from "react";

/**
 * Ein Lebensraum aus Silhouetten in der Farbe des Abschnitts darunter: Die
 * Szene wächst aus ihm heraus. Rein dekorativ, daher `aria-hidden`. Die
 * Wachstumsbewegung steht in globals.css (`habitat-grow`, `habitat-fade`).
 */
export function HabitatSilhouette({{ className }}: {{ className?: string }}) {{
  return (
    <svg
      viewBox="0 0 {W} {H}"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
      focusable="false"
      fill="currentColor"
      className={{className}}
    >
      <path d="{ground_path}" />
{chr(10).join(lines)}
    </svg>
  );
}}
'''

out = Path(__file__).resolve().parent.parent / "src/components/home/habitat-silhouette.tsx"
out.write_text(tsx)
print(f"wrote {out} ({len(tsx) // 1024} KB, {len(groups)} groups)")
