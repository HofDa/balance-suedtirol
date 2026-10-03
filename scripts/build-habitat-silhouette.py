"""
Erzeugt src/components/home/habitat-silhouette.tsx: einen Lebensraum aus
Silhouetten (Bäume, Wiese, Röhricht, Tiere, Menschen) als Übergang in den
dunklen Abschnitt darunter.

Maßstab: 1 m = 27 Einheiten (M). Ein Erwachsener mit 1,75 m ist 47 Einheiten
groß, eine Fichte mit 11 m knapp 300. Kleines wird höchstens so weit
überzeichnet, dass es erkennbar bleibt (Blütenköpfe, Igel, Falter).

Aufbau der Szene (viewBox 1440 × 330): Hohe Bäume nur an den Rändern, in der
Mitte (x 380–1060) nichts höher als ein Mensch – darüber steht auf großen
Bildschirmen der Schlusssatz. Der Zufall ist geseedet; das Skript liefert jedes
Mal dieselbe Szene. Aufruf: python3 scripts/build-habitat-silhouette.py
"""

import math
import random
from pathlib import Path

W, H = 1440, 330
M = 27  # Einheiten pro Meter
random.seed(7)


def m(meters):
    return meters * M


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def ground(x):
    return 312 + 5 * math.sin(x / 230) + 2.5 * math.sin(x / 97 + 1.3)


def poly(points):
    return "M" + " L".join(f"{f(x)} {f(y)}" for x, y in points) + "Z"


def circle(cx, cy, r):
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}"/>'


def p(d):
    return f'<path d="{d}"/>'


def blade(x, base, h, w, lean):
    tx, ty = x + lean, base - h
    return (
        f"M{f(x - w / 2)} {f(base + 3)}"
        f"Q{f(x + lean * 0.35 - w * 0.2)} {f(base - h * 0.55)} {f(tx)} {f(ty)}"
        f"Q{f(x + lean * 0.35 + w * 0.35)} {f(base - h * 0.5)} {f(x + w / 2)} {f(base + 3)}Z"
    )


def stem(x, base, h, lean, w=1.2):
    return p(blade(x, base, h, w, lean))


# ---------------------------------------------------------------- Gehölze

def spruce(x, base, h, w):
    tiers = 8
    left, right = [(x, base - h)], []
    for i in range(1, tiers + 1):
        y = base - h + h * 0.86 * i / tiers
        hw = w / 2 * (0.2 + 0.8 * i / tiers)
        left += [(x - hw, y)]
        right += [(x + hw, y)]
        if i < tiers:
            left += [(x - hw * 0.58, y - h * 0.03)]
            right += [(x + hw * 0.58, y - h * 0.03)]
    y_last = left[-1][1]
    tw = max(3, h * 0.018)
    trunk = [(x - tw, y_last), (x - tw, base + 4), (x + tw, base + 4), (x + tw, y_last)]
    return p(poly(left + trunk + list(reversed(right))))


def deciduous(x, base, h, r):
    """Laubbaum: sichtbarer Stamm mit zwei Ästen, Krone aus vielen kleinen,
    unregelmäßigen Blattballen statt einer runden Wolke."""
    crown_bottom = base - h + 1.75 * r
    tw = h * 0.03
    parts = [p(poly([(x - tw, base + 4), (x - tw * 0.65, crown_bottom - 12), (x + tw * 0.65, crown_bottom - 12), (x + tw, base + 4)]))]
    parts.append(p(poly([(x - 2, crown_bottom + 6), (x - r * 0.6, crown_bottom - r * 0.35), (x - r * 0.55, crown_bottom - r * 0.42), (x + 1, crown_bottom - 4)])))
    parts.append(p(poly([(x + 2, crown_bottom + 2), (x + r * 0.58, crown_bottom - r * 0.45), (x + r * 0.52, crown_bottom - r * 0.5), (x - 1, crown_bottom - 8)])))
    cx, cy = x, base - h + r * 0.95
    rng = random.Random(int(x))
    for i in range(18):
        a = i / 18 * 2 * math.pi + rng.uniform(-0.15, 0.15)
        rx, ry = r * 1.05, r * (0.82 if math.sin(a) < 0 else 0.7)
        px, py = cx + rx * math.cos(a) * rng.uniform(0.72, 0.92), cy + ry * math.sin(a) * rng.uniform(0.72, 0.92)
        parts.append(circle(px, py, r * rng.uniform(0.24, 0.34)))
    for dx, dy, rr in [(0, 0, 0.72), (-0.4, 0.1, 0.5), (0.42, 0.08, 0.5), (0, -0.35, 0.5)]:
        parts.append(circle(cx + dx * r, cy + dy * r, rr * r))
    return parts


def shrub(x, base, w, h):
    """Strauch mit Höhe h (Einheiten): Die Krone sitzt etwas über dem Boden,
    damit darunter die Gerten sichtbar bleiben, die aus einem Punkt fächern –
    das unterscheidet ihn vom Stein. Der Rand ist aus kleinen Blattballen
    gezackt."""
    rng = random.Random(int(x) + 3)
    out = []
    # Gerten: schmal zulaufend, aus der Mitte nach außen gespreizt.
    crown_bottom = base - h * 0.28
    for i, spread in enumerate([-0.34, -0.17, 0, 0.18, 0.33]):
        top_x = x + spread * w + rng.uniform(-1.5, 1.5)
        foot = x + spread * 4
        out.append(p(poly([(foot - 1.3, base + 3), (top_x - 0.5, crown_bottom - 4), (top_x + 0.5, crown_bottom - 4), (foot + 1.3, base + 3)])))
    # Krone: Kern als Ellipse, Rand aus Ballen, unten flacher als oben.
    cx, cy = x, base - h * 0.62
    rx, ry = w / 2, h * 0.36
    out.append(f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(rx * 0.86)}" ry="{f(ry * 0.9)}"/>')
    n = 16
    for i in range(n):
        a = math.pi + i / (n - 1) * math.pi + rng.uniform(-0.08, 0.08)  # obere Hälfte
        px = cx + rx * 0.84 * math.cos(a)
        py = cy + ry * 0.84 * math.sin(a)
        out.append(circle(px, py, h * rng.uniform(0.11, 0.17)))
    for i in range(7):  # Unterkante: kleinere Ballen, leicht hängend
        t = (i + 0.5) / 7
        px = cx - rx * 0.8 + rx * 1.6 * t
        py = cy + ry * 0.62 + math.sin(math.pi * t) * ry * 0.18
        out.append(circle(px, py, h * rng.uniform(0.08, 0.12)))
    return out


# ---------------------------------------------------------------- Wiese

def daisy(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [stem(x, base, h, lean), circle(tx, ty, 1.2)]
    for k in range(8):
        a = k * math.pi / 4
        out.append(circle(tx + 2.1 * math.cos(a), ty + 2.1 * math.sin(a), 0.95))
    return out


def umbel(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [stem(x, base, h, lean)]
    for k in range(-3, 4):
        ex, ey = tx + k * 1.5, ty - 2.6 + abs(k) * 0.45
        out.append(p(blade(tx, ty + 0.5, (ty + 0.5) - ey, 0.6, ex - tx)))
        out.append(circle(ex, ey, 0.95))
    return out


def bell(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [stem(x, base, h, lean, 1.0)]
    for i, (bx, by) in enumerate([(tx + 1.4, ty + 1), (tx - 0.6, ty + h * 0.26), (tx + 1.2, ty + h * 0.5)]):
        s = 1 - i * 0.12
        out.append(
            f'<path d="M{f(bx - 0.4)} {f(by - 0.4)}Q{f(bx - 2.2 * s)} {f(by + 0.8)} {f(bx - 1.9 * s)} {f(by + 3 * s)}'
            f'L{f(bx + 1.9 * s)} {f(by + 3 * s)}Q{f(bx + 2.2 * s)} {f(by + 0.8)} {f(bx + 0.4)} {f(by - 0.4)}Z"/>'
        )
    return out


def seedhead(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [stem(x, base, h, lean, 0.9)]
    for i in range(6):
        t = i / 6
        sx, sy = tx - lean * t * 0.35, ty + t * h * 0.3
        side = -1 if i % 2 else 1
        cx, cy = sx + side * 1.3, sy + 1.2
        out.append(f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="0.7" ry="1.7" transform="rotate({f(side * 28)} {f(cx)} {f(cy)})"/>')
    return out


def cattail(x, base, h, lean):
    tx, ty = x + lean, base - h
    out = [stem(x, base, h, lean, 1.4)]
    hx, hy = tx - lean * 0.12, ty + 6
    out.append(f'<rect x="{f(hx - 1.3)}" y="{f(hy - 4.5)}" width="2.6" height="9" rx="1.3"/>')
    return out


# ---------------------------------------------------------------- Tiere

def hedgehog(x, base, length=13):
    """Igel, etwa 1,7-fach überzeichnet (echt knapp 30 cm)."""
    rx, ry = length * 0.42, length * 0.28
    pts = []
    for i in range(0, 21):
        t = math.pi * (0.97 - 0.86 * i / 20)
        r = 1.0 if i % 2 else 1.18
        pts.append((x + rx * r * math.cos(t), base - 0.6 - ry * r * math.sin(t)))
    snout = [(x + rx * 0.85, base - ry * 0.55), (x + rx * 1.42, base - 0.5), (x + rx * 0.9, base + 0.3)]
    body = poly(pts + snout + [(x - rx * 0.95, base + 0.3)])
    return [p(body)]


def butterfly(x, y, span=9):
    """Tagfalter von vorn mit geöffneten Flügeln: große, spitz gerundete
    Vorderflügel, kleinere Hinterflügel, Körper und Fühler."""
    s = span / 11
    out = []
    for d in (1, -1):
        out.append(
            f'<path d="M{f(x + d * 0.4 * s)} {f(y - 0.6 * s)}'
            f'C{f(x + d * 2 * s)} {f(y - 5 * s)} {f(x + d * 5.6 * s)} {f(y - 5.4 * s)} {f(x + d * 5.3 * s)} {f(y - 2.2 * s)}'
            f'C{f(x + d * 5.1 * s)} {f(y - 0.5 * s)} {f(x + d * 2.6 * s)} {f(y + 0.2 * s)} {f(x + d * 0.4 * s)} {f(y + 0.2 * s)}Z"/>'
        )
        out.append(
            f'<path d="M{f(x + d * 0.4 * s)} {f(y + 0.4 * s)}'
            f'C{f(x + d * 3.4 * s)} {f(y + 0.3 * s)} {f(x + d * 4 * s)} {f(y + 3.3 * s)} {f(x + d * 2.1 * s)} {f(y + 3.8 * s)}'
            f'C{f(x + d * 1 * s)} {f(y + 4 * s)} {f(x + d * 0.5 * s)} {f(y + 2.2 * s)} {f(x + d * 0.4 * s)} {f(y + 0.4 * s)}Z"/>'
        )
        out.append(
            f'<path d="M{f(x + d * 0.2 * s)} {f(y - 2 * s)}Q{f(x + d * 0.9 * s)} {f(y - 4.2 * s)} {f(x + d * 2 * s)} {f(y - 4.8 * s)}" '
            f'fill="none" stroke="currentColor" strokeWidth="{f(0.35 * s)}" strokeLinecap="round"/>'
        )
    out.append(f'<ellipse cx="{f(x)}" cy="{f(y + 0.4 * s)}" rx="{f(0.55 * s)}" ry="{f(2.8 * s)}"/>')
    return out


def bird(x, y, s=1.0):
    return [
        f'<path d="M{f(x - 18 * s)} {f(y)}Q{f(x - 9 * s)} {f(y - 10 * s)} {f(x)} {f(y + 1 * s)}'
        f'Q{f(x + 9 * s)} {f(y - 10 * s)} {f(x + 18 * s)} {f(y)}Q{f(x + 9 * s)} {f(y - 4 * s)} {f(x)} {f(y + 5 * s)}'
        f'Q{f(x - 9 * s)} {f(y - 4 * s)} {f(x - 18 * s)} {f(y)}Z"/>'
    ]


def stroke(d, w):
    return f'<path d="{d}" fill="none" stroke="currentColor" strokeWidth="{f(w)}" strokeLinecap="round" strokeLinejoin="round"/>'


def ellipse(cx, cy, rx, ry, rot=0):
    t = f' transform="rotate({f(rot)} {f(cx)} {f(cy)})"' if rot else ""
    return f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(rx)}" ry="{f(ry)}"{t}/>'


def cloud(cx, cy, rx, ry, n, depth=0.55, rng=None):
    """Ellipse mit Wolkenrand: n Bögen, die zwischen Punkten auf der Ellipse
    nach außen wölben – liest sich als Wolle."""
    pts = []
    for i in range(n):
        a = 2 * math.pi * i / n + (rng.uniform(-0.06, 0.06) if rng else 0)
        pts.append((cx + rx * math.cos(a), cy + ry * math.sin(a)))
    d = f"M{f(pts[0][0])} {f(pts[0][1])}"
    for i in range(n):
        x2, y2 = pts[(i + 1) % n]
        chord = math.dist(pts[i], (x2, y2))
        r = chord * depth * (rng.uniform(0.9, 1.1) if rng else 1)
        d += f"A{f(r)} {f(r)} 0 0 1 {f(x2)} {f(y2)}"
    return p(d + "Z")


def sheep(x, base, facing=1, grazing=False, s=1.0):
    """Schaf von der Seite, wie man es aus Piktogrammen kennt: rundlicher
    Rumpf mit Wolkenrand ringsum, glatter tropfenförmiger Kopf mit
    abstehendem Ohr, vier dünne, gerade Beine. Gezeichnet nach rechts blickend
    um den Ursprung, dann gespiegelt und verschoben."""
    rng = random.Random(int(x) + 11)
    out = []
    for lx in (-11, -6.5, 6.5, 11):
        out.append(stroke(f"M{f(lx)} -12L{f(lx)} -0.3", 1.8))
    out.append(cloud(0, -18, 15.5, 8.5, 15, 0.62, rng))
    head = [
        p("M11 -23L17.5 -28.5L20.5 -21L12.5 -15Z"),  # Hals
        p("M17 -26.5Q19.8 -31.8 24 -29L28.3 -21.3Q28.8 -19 26.2 -19.2L18.6 -21.6Z"),
        ellipse(16.4, -29.8, 3.8, 1.25, 27),  # Ohr, steht über die Wolle hinaus
    ]
    if grazing:
        out.append(f'<g transform="rotate(68 14 -20)">{"".join(head)}</g>')
    else:
        out += head
    return [f'<g transform="translate({f(x)} {f(base)}) scale({f(facing * s)} {f(s)})">{"".join(out)}</g>']


def goat(x, base, facing=-1, s=1.0):
    """Ziege im selben Piktogrammstil wie das Schaf: glatter, schlanker Rumpf
    statt Wolle, höhere gerade Beine, Hals schräg nach oben zum Strauch,
    keilförmiger Kopf mit abstehendem Ohr, Bart und nach hinten gebogenen
    Hörnern, kurzer aufgestellter Schwanz. Gezeichnet nach rechts blickend um
    den Ursprung, dann gespiegelt und verschoben."""
    out = []
    for lx in (-10.5, -6.5, 7, 10.5):
        out.append(stroke(f"M{f(lx)} -17L{f(lx)} -0.3", 1.7))
    out.append(p("M-13 -21.5Q-13 -27 -6 -27.5L8 -27.5Q14 -27 14 -21.5Q14 -16.5 8 -16L-6 -16Q-13 -16.5 -13 -21.5Z"))
    out.append(p("M-12 -25L-16.5 -30.5L-15 -31.2L-10.5 -26.5Z"))  # Schwanz
    out.append(p("M8 -26L15 -37L19.5 -34L13.5 -20Z"))  # Hals
    out.append(p("M14.5 -37.5Q17 -41 20.5 -39L26.5 -31.5Q27 -29.6 25 -29.8L18.5 -32Z"))  # Kopf
    out.append(p("M22 -31L23 -26.5L20 -30.5Z"))  # Bart
    out.append(ellipse(14.6, -35.6, 3.4, 1.1, -20))  # Ohr
    out.append(stroke("M16.5 -39.5Q14.5 -45.5 9.5 -45", 1.8))  # Horn
    return [f'<g transform="translate({f(x)} {f(base)}) scale({f(facing * s)} {f(s)})">{"".join(out)}</g>']


def grasshopper(x, y, facing=1, s=1.0, jumping=False):
    """Heuschrecke, stark überzeichnet: langer Leib, das große Sprungbein als
    spitzes Dach darüber, lange Fühler."""
    out = [ellipse(x, y, 4.6 * s, 1.3 * s, -facing * 8), circle(x + facing * 4.4 * s, y - 0.9 * s, 1.4 * s)]
    if jumping:
        out.append(stroke(f"M{f(x - facing * 1 * s)} {f(y)}L{f(x - facing * 5 * s)} {f(y + 1.5 * s)}L{f(x - facing * 9.5 * s)} {f(y + 3.5 * s)}", 1.1 * s))
    else:
        out.append(stroke(f"M{f(x - facing * 0.5 * s)} {f(y)}L{f(x - facing * 3.8 * s)} {f(y - 3.4 * s)}", 1.4 * s))
        out.append(stroke(f"M{f(x - facing * 3.8 * s)} {f(y - 3.4 * s)}L{f(x - facing * 6.2 * s)} {f(y + 2.2 * s)}", 0.6 * s))
    for dx in (1.5, 2.8):
        out.append(stroke(f"M{f(x + facing * dx * s)} {f(y + 0.6 * s)}L{f(x + facing * (dx + 0.6) * s)} {f(y + 2.4 * s)}", 0.5 * s))
    out.append(stroke(f"M{f(x + facing * 5.2 * s)} {f(y - 1.8 * s)}Q{f(x + facing * 8 * s)} {f(y - 7 * s)} {f(x + facing * 12 * s)} {f(y - 6.5 * s)}", 0.35 * s))
    return out


def bee(x, y, facing=1, s=1.0, trail=None):
    """Biene im Flug: runder Leib, zwei Flügel darüber. Optional eine
    gepunktete Flugbahn (Liste von Punkten hinter der Biene)."""
    out = [
        ellipse(x, y, 2.4 * s, 1.5 * s, facing * 12),
        circle(x + facing * 2.4 * s, y - 0.4 * s, 1 * s),
        ellipse(x - facing * 0.4 * s, y - 2.3 * s, 1.1 * s, 2 * s, -facing * 30),
        ellipse(x + facing * 0.8 * s, y - 2.2 * s, 0.9 * s, 1.7 * s, facing * 15),
    ]
    if trail:
        d = f"M{f(trail[0][0])} {f(trail[0][1])}Q{f(trail[1][0])} {f(trail[1][1])} {f(trail[2][0])} {f(trail[2][1])}"
        out.append(f'<path d="{d}" fill="none" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeDasharray="0.1 2.4"/>')
    return out


def songbird(x, base, facing=1, s=1.0):
    """Sitzender Singvogel, etwa 2,5-fach überzeichnet."""
    return [
        ellipse(x, base - 3.6 * s, 3.7 * s, 2.4 * s, -facing * 22),
        circle(x + facing * 2.8 * s, base - 6.2 * s, 1.9 * s),
        p(poly([(x + facing * 4.4 * s, base - 6.8 * s), (x + facing * 6.4 * s, base - 6.1 * s), (x + facing * 4.4 * s, base - 5.5 * s)])),
        p(poly([(x - facing * 2.2 * s, base - 4 * s), (x - facing * 7 * s, base - 0.5 * s), (x - facing * 6 * s, base + 0.6 * s), (x - facing * 1.5 * s, base - 2 * s)])),
        stroke(f"M{f(x)} {f(base - 1.5 * s)}L{f(x + facing * 0.5 * s)} {f(base + 0.5)}", 0.6 * s),
    ]


# ---------------------------------------------------------------- Menschen

def limb(x1, y1, x2, y2, x3, y3, w):
    """Arm oder Bein als runder Strich über ein Gelenk."""
    return (
        f'<path d="M{f(x1)} {f(y1)}L{f(x2)} {f(y2)}L{f(x3)} {f(y3)}" fill="none" '
        f'stroke="currentColor" strokeWidth="{f(w)}" strokeLinecap="round" strokeLinejoin="round"/>'
    )


def person(x, base, h, facing=1, stride=1.0, hand=None):
    """Gehende Figur. `hand` legt die vordere Hand fest (zum Händchenhalten)."""
    head_r = h * 0.085
    shoulder_y, hip_y = base - h * 0.78, base - h * 0.46
    lean = facing * h * 0.02
    out = [circle(x + lean * 1.5, base - h + head_r, head_r)]
    sw, hw = h * 0.105, h * 0.085
    out.append(p(poly([(x + lean - sw, shoulder_y), (x + lean + sw, shoulder_y), (x + hw, hip_y + 1), (x - hw, hip_y + 1)])))
    out.append(f'<ellipse cx="{f(x + lean)}" cy="{f(shoulder_y + 0.5)}" rx="{f(sw)}" ry="{f(h * 0.045)}"/>')
    leg_w, arm_w = h * 0.085, h * 0.062
    step = h * 0.2 * stride
    out.append(limb(x + facing * 0.6, hip_y, x + facing * step * 0.55, base - h * 0.23, x + facing * step, base - 0.6, leg_w))
    out.append(limb(x - facing * 0.6, hip_y, x - facing * step * 0.25, base - h * 0.22, x - facing * step * 0.75, base - 0.6, leg_w))
    sx = x + lean
    if hand:
        out.append(limb(sx + facing * sw * 0.6, shoulder_y + 1, (sx + hand[0]) / 2 + facing * 0.6, (shoulder_y + hand[1]) / 2 + 2, hand[0], hand[1], arm_w))
    else:
        out.append(limb(sx + facing * sw * 0.6, shoulder_y + 1, sx + facing * h * 0.1, base - h * 0.6, sx + facing * h * 0.17, base - h * 0.47, arm_w))
    out.append(limb(sx - facing * sw * 0.6, shoulder_y + 1, sx - facing * h * 0.08, base - h * 0.6, sx - facing * h * 0.13, base - h * 0.48, arm_w))
    return out


def farmer(x, base, h, facing=-1):
    """Bäuerin oder Bauer beim Mähen mit der Sense: breiter Stand, Oberkörper
    nach vorn, beide Hände am Sensenbaum, das Blatt knapp über dem Boden. Das
    Gras unter dem Blatt und dahinter ist schon gemäht (siehe Gräser unten)."""
    head_r = h * 0.085
    hip_x, hip_y = x, base - h * 0.44
    sh_x, sh_y = x + facing * h * 0.09, base - h * 0.74
    out = []
    leg_w = h * 0.085
    out.append(limb(hip_x + facing * 0.6, hip_y, x + facing * h * 0.14, base - h * 0.22, x + facing * h * 0.2, base - 0.6, leg_w))
    out.append(limb(hip_x - facing * 0.6, hip_y, x - facing * h * 0.08, base - h * 0.22, x - facing * h * 0.17, base - 0.6, leg_w))
    sw, hw = h * 0.1, h * 0.085
    out.append(p(poly([(sh_x - sw, sh_y - 0.6), (sh_x + sw, sh_y + 0.6), (hip_x + hw, hip_y + 1), (hip_x - hw, hip_y + 1)])))
    out.append(f'<ellipse cx="{f(sh_x)}" cy="{f(sh_y)}" rx="{f(sw)}" ry="{f(h * 0.045)}"/>')
    hx, hy = sh_x + facing * h * 0.07, sh_y - h * 0.13
    out.append(circle(hx, hy, head_r))
    out.append(f'<ellipse cx="{f(hx)}" cy="{f(hy - head_r * 0.55)}" rx="{f(h * 0.14)}" ry="{f(h * 0.022)}"/>')
    out.append(f'<rect x="{f(hx - head_r * 0.85)}" y="{f(hy - head_r * 1.55)}" width="{f(head_r * 1.7)}" height="{f(head_r * 1.05)}" rx="{f(head_r * 0.35)}"/>')
    top = (x - facing * h * 0.1, base - h * 0.66)
    bottom = (x + facing * h * 0.46, base - h * 0.07)
    ctrl = ((top[0] + bottom[0]) / 2 + facing * h * 0.02, (top[1] + bottom[1]) / 2 - h * 0.08)
    out.append(
        f'<path d="M{f(top[0])} {f(top[1])}Q{f(ctrl[0])} {f(ctrl[1])} {f(bottom[0])} {f(bottom[1])}" fill="none" '
        f'stroke="currentColor" strokeWidth="{f(h * 0.032)}" strokeLinecap="round"/>'
    )

    def on_snath(t):
        return ((1 - t) ** 2 * top[0] + 2 * (1 - t) * t * ctrl[0] + t * t * bottom[0],
                (1 - t) ** 2 * top[1] + 2 * (1 - t) * t * ctrl[1] + t * t * bottom[1])

    arm_w = h * 0.062
    for t, grip in [(0.12, h * 0.07), (0.5, h * 0.06)]:
        gx, gy = on_snath(t)
        out.append(
            f'<path d="M{f(gx)} {f(gy)}L{f(gx + facing * grip * 0.35)} {f(gy - grip)}" fill="none" '
            f'stroke="currentColor" strokeWidth="{f(h * 0.03)}" strokeLinecap="round"/>'
        )
    g1, g2 = on_snath(0.12), on_snath(0.5)
    out.append(limb(sh_x - facing * sw * 0.5, sh_y + 1, (sh_x + g1[0]) / 2 - facing * 1.4, (sh_y + g1[1]) / 2 + 3, g1[0] + facing * h * 0.02, g1[1] - h * 0.06, arm_w))
    out.append(limb(sh_x + facing * sw * 0.5, sh_y + 1, (sh_x + g2[0]) / 2 + facing * 0.7, (sh_y + g2[1]) / 2 + 1.4, g2[0] + facing * h * 0.02, g2[1] - h * 0.05, arm_w))
    bx, by = bottom
    tip = (bx - facing * h * 0.5, base - h * 0.03)
    out.append(
        f'<path d="M{f(bx)} {f(by - h * 0.02)}'
        f'Q{f((bx + tip[0]) / 2)} {f(by - h * 0.07)} {f(tip[0])} {f(tip[1])}'
        f'Q{f((bx + tip[0]) / 2)} {f(by + h * 0.005)} {f(bx)} {f(by + h * 0.03)}Z"/>'
    )
    return out


# ---------------------------------------------------------------- Szene
groups = []  # (delay_ms, kind, [svg elements])


def add(delay, elements, kind="grow"):
    groups.append((delay, kind, elements if isinstance(elements, list) else [elements]))


g = ground

# Ränder: Bäume und Sträucher, zuerst die hohen, damit die Szene von außen wächst.
add(0, spruce(72, g(72), m(10.5), m(3.7)))
add(60, spruce(14, g(14), m(6), m(2.2)))
add(120, deciduous(196, g(196), m(8), m(2.3)))
add(180, spruce(300, g(300), m(7), m(2.5)))
add(260, shrub(360, g(360), m(2.6), m(1.6)))
add(0, spruce(1350, g(1350), m(11), m(3.9)))
add(60, spruce(1428, g(1428), m(5.5), m(2)))
add(120, deciduous(1238, g(1238), m(8.5), m(2.45)))
reeds = []
for i, rx in enumerate([1118, 1126, 1135, 1143, 1152, 1160]):
    h = m([1.7, 1.9, 1.6, 1.85, 1.75, 1.65][i])
    lean = [-2, 1, -1, 3, 1, -2][i]
    reeds += cattail(rx, g(rx), h, lean) if i % 2 else [p(blade(rx, g(rx), h, 1.8, lean * 2))]
add(300, reeds)

# Mitte: Wiese bis Kniehöhe, darüber nur Menschen – der Satz braucht den Himmel.
add(420, daisy(432, g(432), m(0.45), 1))
add(450, umbel(470, g(470), m(0.85), -1))
add(480, daisy(506, g(506), m(0.4), -1))
add(510, bell(530, g(530), m(0.5), 1))
add(540, bell(626, g(626), m(0.55), 1))
add(570, seedhead(650, g(650), m(0.9), 2))
add(600, umbel(704, g(704), m(0.8), 1))
add(630, daisy(730, g(730), m(0.45), 1))
add(660, daisy(764, g(764), m(0.5), -1))
add(690, bell(820, g(820), m(0.5), -1))
add(720, umbel(926, g(926), m(0.9), 1))
add(750, daisy(897, g(897), m(0.4), 1))
add(780, seedhead(944, g(944), m(0.85), -2))
add(810, daisy(962, g(962), m(0.45), 1))

# Gräser über die ganze Breite, in Büscheln gruppiert.
x = 0.0
cluster, cluster_start = [], 0.0
while x < W:
    mid = 380 <= x <= 1060
    mown = 978 <= x <= 1062  # schon gemäht: unter dem Sensenblatt und hinter der Figur
    if mown:
        h = m(random.uniform(0.06, 0.1))
    elif mid:
        h = m(random.uniform(0.22, 0.5))
    else:
        h = m(random.uniform(0.3, 0.75))
    cluster.append(blade(x, g(x), h, random.uniform(2, 3.2), random.uniform(-4, 4)))
    x += random.uniform(4, 8)
    if x - cluster_start > 120 or x >= W:
        add(200 + int(cluster_start / W * 500), p("".join(cluster)))
        cluster, cluster_start = [], x

# Tiere zuletzt.
add(1000, hedgehog(906, g(906)))
add(1100, butterfly(716, g(716) - m(1.05)), "fade")
add(1150, bird(1180, 96, 0.55) + bird(1206, 114, 0.4) + bird(1222, 88, 0.3), "fade")
add(1180, bird(250, 52, 0.5) + bird(276, 66, 0.38) + bird(230, 72, 0.32), "fade")
add(1120, songbird(357, g(360) - 44, 1, 1.0), "fade")

# Weidetiere: eine Ziege knabbert am Strauch, Schafe mit Lamm in der Wiese.
add(900, goat(422, g(422), -1, 0.92))
add(920, sheep(768, g(768), 1, grazing=True))
add(950, sheep(811, g(811), 1, s=0.62))
add(980, sheep(872, g(872), -1))

# Insekten: Heuschrecken im Sprung und auf der gemähten Fläche, Bienen an
# den Blüten, mehr Falter.
add(1060, grasshopper(600, g(600) - m(0.7), 1, 1.0, jumping=True), "fade")
add(1080, grasshopper(1046, g(1046) - 3, -1, 0.9), "fade")
add(1100, bee(476, g(470) - m(0.85) - 6, -1, 1.0, trail=[(498, g(470) - m(1.05)), (490, g(470) - m(0.7)), (480, g(470) - m(0.85) - 5)]), "fade")
add(1130, bee(709, g(704) - m(0.8) - 7, 1, 0.9), "fade")
add(1160, bee(903, g(897) - m(0.4) - 8, -1, 0.9), "fade")
add(1110, butterfly(512, g(512) - m(1.0), 7.5), "fade")
add(1140, butterfly(910, g(910) - m(1.15), 8), "fade")
add(1170, butterfly(1088, g(1088) - m(1.5), 8.5), "fade")
add(1190, butterfly(160, g(160) - m(1.3), 7), "fade")

# Menschen gehören dazu: Elternteil und Kind Hand in Hand, und wer die Wiese
# pflegt: jemand mäht mit der Sense.
adult_h, child_h = m(1.75), m(1.1)
adult_x, child_x = 556, 579
hand = (567.5, g(567.5) - child_h * 0.5)
add(1200, person(adult_x, g(adult_x), adult_h, 1, 0.9, hand=hand) + person(child_x, g(child_x), child_h, 1, 0.8, hand=(hand[0] + 1, hand[1] + 0.5)), "fade")
add(1260, farmer(1012, g(1012), adult_h, -1), "fade")

ground_path = f"M0 {H} L" + " L".join(f"{x} {f(g(x))}" for x in range(0, W + 1, 40)) + f" L{W} {H}Z"

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
