"""
Erzeugt src/components/home/richness-profile.tsx: einen schematischen
Höhenschnitt durch Südtirol als Silhouette, im Stil des Lebensraums unter
„Was intakte Lebensräume leisten“ (scripts/build-habitat-silhouette.py).

Links der Süden mit Weinbau, Obstwiesen und Terrassen, rechts der feuchte
Alpenhauptkamm. Dazwischen steigt das Gelände von 200 m bis 3.905 m: Wald,
Almen, Fels und Gletscher. Hinter dem Wald stehen blass die Dolomiten – anderes
Gestein, andere Form. Die Höhe ist linear abgetragen, die Breite nicht: Der
Schnitt ist ein Schema, keine Karte.

Das Skript schreibt neben dem SVG auch die Lage der Marken und Beschriftungen
(in Prozent der Bildfläche), damit HTML-Etiketten und Zeichnung nicht
auseinanderlaufen. Der Zufall ist geseedet. Aufruf:
python3 scripts/build-richness-profile.py
"""

import json
import math
import random
from pathlib import Path

W, H = 1440, 540
BASE, TOP = 500, 64  # y für 200 m und 3.905 m
rng = random.Random(11)


def y(e):
    return BASE - (e - 200) / 3705 * (BASE - TOP)


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def poly(points):
    return "M" + " L".join(f"{f(px)} {f(py)}" for px, py in points) + "Z"


def p(d, extra=""):
    return f'<path d="{d}"{extra}/>'


def circle(cx, cy, r):
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}"/>'


def ellipse(cx, cy, rx, ry):
    return f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(rx)}" ry="{f(ry)}"/>'


def stroke(d, w, extra=""):
    return f'<path d="{d}" fill="none" stroke="currentColor" strokeWidth="{f(w)}" strokeLinecap="round"{extra}/>'


# ---------------------------------------------------------------- Gelände

def terrain_points():
    """Oberkante des Vordergrunds als (x, Höhe in m)."""
    pts = []
    for x in range(0, 262, 20):  # Talboden im Unterland
        pts.append((x, 228 + 14 * math.sin(x / 47)))
    x0 = 262
    for level in (330, 450, 570, 690, 810):  # Terrassen mit Trockenmauern
        pts += [(x0, pts[-1][1]), (x0 + 3, level), (x0 + 32, level + 14)]
        x0 += 34
    pts += [(448, 940), (470, 1010), (500, 1040), (530, 1070)]  # Hofwiese
    for x in range(550, 791, 20):  # Bergwald
        t = (x - 530) / 260
        pts.append((x, 1070 + t * 930 + 35 * math.sin(x / 31)))
    for x in range(805, 921, 15):  # Almen
        t = (x - 790) / 130
        pts.append((x, 2000 + t * 300 + 25 * math.sin(x / 13)))
    for x in range(932, 1081, 12):  # Fels
        t = (x - 920) / 160
        pts.append((x, 2300 + t * 1050 + rng.uniform(-70, 70)))
    pts += [(1094, 3520), (1104, 3480), (1118, 3760), (1130, 3905), (1142, 3800), (1152, 3830)]
    for x in range(1164, 1245, 12):  # Nordseite
        t = (x - 1152) / 92
        pts.append((x, 3830 - t * 930 + rng.uniform(-80, 80)))
    for x in range(1260, W + 1, 20):
        t = (x - 1240) / 200
        pts.append((x, 2900 - t * 1350 + rng.uniform(-50, 50) * (1 - t)))
    return pts


TERRAIN = terrain_points()


def ground_e(x):
    for (x1, e1), (x2, e2) in zip(TERRAIN, TERRAIN[1:]):
        if x1 <= x <= x2:
            return e1 if x2 == x1 else e1 + (e2 - e1) * (x - x1) / (x2 - x1)
    return TERRAIN[-1][1]


def g(x):
    return y(ground_e(x))


def far_range():
    pts = [(0, H)]
    for x in range(0, W + 1, 24):
        e = 1700 + 450 * math.sin(x / 140 + 0.6) + 260 * math.sin(x / 53) + rng.uniform(-60, 60)
        pts.append((x, y(e)))
    return poly(pts + [(W, H)])


def dolomites():
    """Blasse Felstürme: senkrechte Wände, gezackte Köpfe, tiefe Scharten."""
    pts: list[tuple[float, float]] = [(180, H), (180, y(240)), (300, y(1100)), (360, y(1700)), (420, y(2150)), (450, y(2350))]
    x = 450
    while x < 900:
        w = rng.uniform(12, 26)
        top = rng.uniform(2650, 3150)
        notch = rng.uniform(2300, 2550)
        pts += [(x + 1.5, y(top - 80)), (x + 4, y(top)), (x + w * 0.5, y(top + rng.uniform(-40, 40))),
                (x + w - 4, y(top - rng.uniform(0, 60))), (x + w - 1.5, y(top - 140)), (x + w, y(notch))]
        x += w + rng.uniform(2, 9)
    pts += [(940, y(2100)), (1000, y(1700)), (1040, y(1300)), (1040, H)]
    return poly(pts)


def glacier():
    """Gletscher auf dem Gipfel in Papierfarbe, oben begrenzt von der
    Gratlinie, unten ein Band, das dem Grat folgt und in Lappen ausläuft."""
    surface = [(px, e) for px, e in TERRAIN if e >= 3250]
    top = [(px, y(e)) for px, e in surface]
    x1, x2 = surface[0][0], surface[-1][0]
    bottom = []
    for i in range(int((x2 - x1) / 6) + 1):  # eigenes, feineres Raster für die Lappen
        px = x2 - i * 6
        taper = math.sin(math.pi * (px - x1) / (x2 - x1)) ** 0.6  # an den Enden spitz
        bottom.append((px, y(ground_e(px) - taper * (430 + 70 * math.sin(px / 5)))))
    return poly(top + bottom)


# ---------------------------------------------------------------- Figuren

def spruce(x, h, w):
    base = g(x)
    pts_l, pts_r = [(x, base - h)], []
    for i in range(1, 4):
        yy = base - h + h * 0.82 * i / 3
        hw = w / 2 * (0.4 + 0.6 * i / 3)
        pts_l.append((x - hw, yy))
        pts_r.append((x + hw, yy))
        if i < 3:
            pts_l.append((x - hw * 0.45, yy - h * 0.04))
            pts_r.append((x + hw * 0.45, yy - h * 0.04))
    yl = pts_l[-1][1]
    tw = max(1.1, h * 0.04)
    trunk = [(x - tw, yl), (x - tw, base + 4), (x + tw, base + 4), (x + tw, yl)]
    return [p(poly(pts_l + trunk + list(reversed(pts_r))))]


def round_tree(x, h, r):
    base = g(x)
    cy = base - h + r
    tw = max(1, r * 0.16)
    out = [p(poly([(x - tw, base + 4), (x - tw * 0.7, cy), (x + tw * 0.7, cy), (x + tw, base + 4)]))]
    local = random.Random(int(x * 10))
    for dx, dy, rr in [(0, 0, 0.78), (-0.48, 0.2, 0.56), (0.5, 0.18, 0.56), (-0.1, -0.42, 0.52), (0.28, -0.3, 0.5)]:
        out.append(circle(x + dx * r, cy + dy * r, rr * r * local.uniform(0.9, 1.08)))
    return out


def pergola(x):
    """Südtiroler Pergel: Pfahl, darüber das schräge Laubdach."""
    base = g(x)
    return [
        p(poly([(x - 0.8, base + 3), (x - 0.8, base - 8), (x + 0.8, base - 8), (x + 0.8, base + 3)])),
        p(poly([(x - 6, base - 6.5), (x + 1, base - 11.5), (x + 6.5, base - 10.5), (x + 6.5, base - 8), (x - 1, base - 5.5)])),
    ]


def house(x, w, h, roof):
    base = g(x)
    return [p(poly([(x - w / 2, base + 4), (x - w / 2, base - h), (x - w / 2 - 2, base - h), (x, base - h - roof),
                    (x + w / 2 + 2, base - h), (x + w / 2, base - h), (x + w / 2, base + 4)]))]


def church(x):
    base = g(x)
    nave = [(x - 2, base + 4), (x - 2, base - 11), (x + 7, base - 17), (x + 16, base - 11), (x + 16, base + 4)]
    tower = [(x - 7, base + 4), (x - 7, base - 26), (x - 4.5, base - 44), (x - 2, base - 26), (x - 2, base + 4)]
    return [p(poly(nave)), p(poly(tower))]


def cow(x, facing=1):
    base = g(x)
    s = facing
    return [
        ellipse(x, base - 6, 7, 3.4),
        p(poly([(x + s * 5.5, base - 8.5), (x + s * 10.5, base - 9.5), (x + s * 11.5, base - 6.5), (x + s * 7, base - 4.5)])),
        stroke(f"M{f(x - 5)} {f(base - 4)}V{f(base)}M{f(x - 3)} {f(base - 4)}V{f(base)}M{f(x + 3)} {f(base - 4)}V{f(base)}M{f(x + 5)} {f(base - 4)}V{f(base)}", 1.4),
    ]


def hedge(x1, x2):
    out = []
    x = x1
    while x <= x2:
        out.append(circle(x, g(x) - 3.2, rng.uniform(3, 4.2)))
        x += 4.5
    return out


def sun(cx, cy, r):
    out = [circle(cx, cy, r)]
    rays = ""
    for i in range(12):
        a = i / 12 * 2 * math.pi
        rays += f"M{f(cx + (r + 7) * math.cos(a))} {f(cy + (r + 7) * math.sin(a))}L{f(cx + (r + 16) * math.cos(a))} {f(cy + (r + 16) * math.sin(a))}"
    out.append(stroke(rays, 3, ' className="profile-rays"'))
    return out


def cloud(cx, cy, scale):
    out = ['<g className="profile-cloud">', ellipse(cx, cy + 6 * scale, 46 * scale, 12 * scale)]
    for dx, dy, r in [(-28, 2, 14), (-10, -8, 19), (12, -10, 22), (32, 0, 15)]:
        out.append(circle(cx + dx * scale, cy + dy * scale, r * scale))
    rain = ""
    for i in range(7):
        rx = cx - 34 * scale + i * 11 * scale
        top = cy + 26 * scale + (i % 2) * 6
        rain += f"M{f(rx)} {f(top)}L{f(rx - 5)} {f(top + 16)}"
    out.append(stroke(rain, 2, ' className="profile-rain" strokeDasharray="5 6" opacity="0.55"'))
    return out + ["</g>"]


def bird(x, yy, s, delay=0.0):
    """Vogel im Gleitflug; außen die Drift, innen der Flügelschlag."""
    return [f'<g className="profile-bird" style={{{{ "--bird-delay": "{delay}s" }} as CSSProperties}}><g className="profile-wing">', p(f"M{f(x - 9 * s)} {f(yy)}Q{f(x - 4 * s)} {f(yy - 5 * s)} {f(x)} {f(yy + 0.5 * s)}"
              f"Q{f(x + 4 * s)} {f(yy - 5 * s)} {f(x + 9 * s)} {f(yy)}Q{f(x + 4 * s)} {f(yy - 2 * s)} {f(x)} {f(yy + 2.5 * s)}"
              f"Q{f(x - 4 * s)} {f(yy - 2 * s)} {f(x - 9 * s)} {f(yy)}Z"), "</g></g>"]


def sway(elements, x):
    """Baum im Wind: eigene Gruppe innerhalb der Wachstumsgruppe, damit sich
    die beiden Transformationen nicht überschreiben. Die Phase hängt an x, so
    läuft der Wind als Welle über den Hang."""
    delay = -((x / 90) % 6)
    return [f'<g className="profile-sway" style={{{{ "--sway-delay": "{delay:.2f}s" }} as CSSProperties}}>' + "".join(elements) + "</g>"]


# ---------------------------------------------------------------- Szene
groups = []  # (delay_ms, kind, [svg elements], extra attributes)


def add(delay, elements, kind="grow", extra=""):
    groups.append((delay, kind, elements, extra))


def veg_delay(x):
    return 380 + int(x / W * 650)


# Hintergrund: ferne Kette, dann die blassen Dolomiten.
add(0, [p(far_range())], extra=' opacity="0.07"')
add(120, [p(dolomites())], extra=' opacity="0.16"')

# Vordergrund mit Gletscher.
# Hell gefüllt, damit die Masse nicht erdrückt: grün bis zur Waldgrenze, darüber
# grauer Fels, auf dem der Gletscher in Papierfarbe steht. Die Kante trägt eine Tintenlinie, die Pflanzen bleiben Tinte.
terrain = poly([(0, H)] + [(px, y(e)) for px, e in TERRAIN] + [(W, H)])
ridge = "M" + " L".join(f"{f(px)} {f(y(e))}" for px, e in TERRAIN)
add(60, [
    p(terrain, ' fill="url(#richness-terrain)"'),
    p(glacier(), ' className="fill-[var(--color-paper)]"'),
    stroke(ridge, 2.2, ' strokeLinejoin="round"'),
])

# Talboden: Pergeln, Obstwiese, Dorfkirche.
for x in range(14, 112, 13):
    add(veg_delay(x), pergola(x))
add(veg_delay(150), church(146))
for x in (184, 200, 216, 232):
    add(veg_delay(x), sway(round_tree(x, 15, 5.5), x))

# Terrassen: Reben unten, Flaumeiche und Kastanien oben, Mauern sind das Gelände.
for x in (272, 284, 306):
    add(veg_delay(x), pergola(x))
add(veg_delay(330), sway(round_tree(334, 20, 7), 334))
add(veg_delay(370), sway(round_tree(372, 24, 9), 372))
add(veg_delay(404), sway(round_tree(406, 30, 11), 406))
add(veg_delay(420), sway(round_tree(424, 26, 9.5), 424))

# Hof mit Hecke auf der Wiese.
add(veg_delay(470), house(486, 18, 12, 10))
add(veg_delay(505), hedge(500, 526))

# Bergwald: Laub unten, Fichten, oben schlanke Lärchen bis zur Waldgrenze.
x = 534.0
while x < 784:
    t = (x - 534) / 250
    if t < 0.22:
        add(veg_delay(x), sway(round_tree(x, rng.uniform(22, 28), rng.uniform(7, 8.5)), x))
    elif t < 0.8:
        add(veg_delay(x), sway(spruce(x, rng.uniform(28, 38), rng.uniform(12, 15)), x))
    else:
        add(veg_delay(x), sway(spruce(x, rng.uniform(22, 28), rng.uniform(8, 10)), x))
    x += rng.uniform(8, 11)

# Almen: Hütte, Kühe, ein paar Latschen.
add(veg_delay(830), house(836, 14, 8, 7))
for cx, facing in ((862, 1), (884, -1), (902, 1)):
    add(veg_delay(cx), cow(cx, facing))
for cx in (808, 818, 914):
    add(veg_delay(cx), [ellipse(cx, g(cx) - 2.5, 5, 3.2)])

# Nordseite: Wald erst weiter unten.
x = 1300.0
while x < W + 10:
    add(veg_delay(x), sway(spruce(x, rng.uniform(26, 34), rng.uniform(11, 13)), x))
    x += rng.uniform(10, 14)

# Klima: Sonne im Süden, Regen am Alpenhauptkamm. Zuletzt die Vögel.
# Sonne nah am linken Rand: Ab `lg` steht ihre Nummer über der ersten
# Legendenspalte, also ganz links.
add(1000, sun(62, 104, 24), "fade")
add(1080, cloud(1316, 118, 1.15), "fade")
add(1160, bird(560, 96, 1) + bird(586, 110, 0.75, -1.7) + bird(540, 116, 0.6, -3.1), "fade")

# Höhenlinien hinter allem: gestrichelt, sehr leise.
levels = {"1000": y(1000), "2000": y(2000), "3000": y(3000)}
level_lines = "".join(f"M0 {f(v)}H{W}" for v in levels.values())

# Hinweislinien von den Zonenetiketten zur Oberfläche. Wie die Etiketten erst ab `md`.
zones = {"valley": (196, 418), "forest": (642, 230), "alpine": (872, 196), "rock": (1000, 128)}
zone_surface = {"valley": g(196) - 18, "forest": g(642) - 40, "alpine": g(872) - 14, "rock": g(1000) - 4}
leaders = "".join(f"M{f(zx)} {f(zy + 8)}V{f(zone_surface[k])}" for k, (zx, zy) in zones.items())


def pct(px, py):
    return {"left": f"{px / W * 100:.2f}%", "top": f"{py / H * 100:.2f}%"}


spots = {
    "markers": {
        # Alle Nummern im Himmel über der Landschaft. Ab `lg` stehen 2 bis 4
        # über ihrer Legendenspalte (x 387, 759, 1131 bei voller Breite).
        "climate": pct(78, 180),  # unter der Sonne
        "culture": pct(387, g(387) - 58),  # über den Bäumen der Terrassen
        "geology": pct(759, y(3200) - 20),  # über den Felstürmen
        "altitude": pct(1130, y(3905) - 22),
    },
    "levels": {k: pct(0, v) for k, v in levels.items()},
    "zones": {k: pct(zx, zy) for k, (zx, zy) in zones.items()},
}

lines = []
for delay, kind, els, extra in groups:
    lines.append(
        f'      <g className="habitat-{kind}" style={{{{ "--habitat-delay": "{delay}ms" }} as CSSProperties}}{extra}>'
        + "".join(els)
        + "</g>"
    )

tsx = f'''// Erzeugt von scripts/build-richness-profile.py – dort ändern, nicht hier.
import type {{ CSSProperties }} from "react";

/**
 * Lage der HTML-Marken und -Etiketten über der Zeichnung, in Prozent der
 * Bildfläche. Kommt aus demselben Skript wie das SVG.
 */
export const richnessProfileSpots = {json.dumps(spots, indent=2)} as const;

/**
 * Schematischer Höhenschnitt durch Südtirol aus Silhouetten, im Stil des
 * Lebensraums unter den Ökosystemleistungen. Rein dekorativ (`aria-hidden`):
 * Was er zeigt, steht in der Legende darunter. Bewegung in globals.css
 * (`habitat-grow`, `habitat-fade`).
 */
export function RichnessProfile({{ className }}: {{ className?: string }}) {{
  return (
    <svg
      viewBox="0 0 {W} {H}"
      aria-hidden
      focusable="false"
      fill="currentColor"
      className={{className}}
    >
      <defs>
        <linearGradient id="richness-terrain" gradientUnits="userSpaceOnUse" x1="0" y1="{f(y(2600))}" x2="0" y2="{f(y(2150))}">
          <stop offset="0" style={{{{ stopColor: "color-mix(in srgb, var(--color-ink) 20%, var(--color-paper))" }}}} />
          <stop offset="1" style={{{{ stopColor: "var(--color-moss)" }}}} />
        </linearGradient>
      </defs>
      <path d="{level_lines}" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" opacity="0.22" vectorEffect="non-scaling-stroke" />
{chr(10).join(lines)}
      <path className="habitat-fade max-md:hidden" style={{{{ "--habitat-delay": "1200ms" }} as CSSProperties}} d="{leaders}" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}}
'''

out = Path(__file__).resolve().parent.parent / "src/components/home/richness-profile.tsx"
out.write_text(tsx)
print(f"wrote {out} ({len(tsx) // 1024} KB, {len(groups)} groups)")
