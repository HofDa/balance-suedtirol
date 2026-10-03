"""
Erzeugt src/components/home/loss-scene.tsx: denselben Talboden zweimal als
Silhouette, früher und heute, für den Vorher-nachher-Regler im dunklen
Abschnitt „In Südtirol gehen Lebensräume verloren“. Darum hell auf dunkel:
Natur in Almmoos (`currentColor`), Gebautes und Maschinen in Papierfarbe,
Verlorenes als gestrichelter Umriss.

Beide Szenen teilen Gelände, Berge und Maßstab; was sich ändert, steht an
derselben Stelle. Der Regler deckt „heute“ von rechts nach links auf, darum
stehen die Ursachen von rechts nach links in der Reihenfolge der Legende:
  1 Intensivierung       Blumenwiese, Mauer      → gleichförmiges Gras, Traktor
  2 Versiegelung         Auwald                  → Halle, Häuser, Parkplatz
  3 Zerschneidung        Wiese                   → Straße mit Zäunen
  4 Verlust ext. Wiesen  Magerwiese              → wächst zu
  5 Entwässerung         Bach mit Röhricht       → betoniertes Gerinne
  6 Strukturverlust      Einzelbaum und Hecke    → Stümpfe, Umriss
  7 Klimawandel          Waldgrenze tiefer       → Wald steigt bergauf (Berg links)

Stil und Bewegung wie scripts/build-richness-profile.py. Der Zufall ist
geseedet. Aufruf: python3 scripts/build-loss-scene.py
"""

import json
import math
import random
from pathlib import Path

W, H = 1440, 410
VIEW_TOP = 130  # darüber nur Himmel: abgeschnitten
rng = random.Random(5)


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def poly(points):
    return "M" + " L".join(f"{f(px)} {f(py)}" for px, py in points) + "Z"


def p(d, extra=""):
    return f'<path d="{d}"{extra}/>'


def circle(cx, cy, r, extra=""):
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}"{extra}/>'


def ellipse(cx, cy, rx, ry, extra=""):
    return f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(rx)}" ry="{f(ry)}"{extra}/>'


def rect(x, y, w, h, extra=""):
    return f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}"{extra}/>'


def stroke(d, w, extra=""):
    return f'<path d="{d}" fill="none" stroke="currentColor" strokeWidth="{f(w)}" strokeLinecap="round" strokeLinejoin="round"{extra}/>'


PAPER = ' className="fill-[var(--color-paper)]"'
INK = ' className="fill-[var(--color-ink)]"'


def built(elements, opacity=0.82):
    """Gebautes und Maschinen: Papierfarbe, etwas zurückgenommen."""
    return [f'<g className="fill-[var(--color-paper)] stroke-[var(--color-paper)]" opacity="{opacity}">' + "".join(elements) + "</g>"]


# ---------------------------------------------------------------- Gelände

CHANNEL = (530, 590, 386)  # heute: begradigter Bach, links, rechts, Sohle
STREAM = (560, 48, 26)  # früher: natürlicher Bach, Mitte, halbe Breite, Tiefe
SLOPE = 320  # links davon steigt der Hang zum Berg
SCENE = "before"  # wird beim Zeichnen umgeschaltet; gy() liest es


def base_y(x):
    if x >= SLOPE:
        return 360 + 4 * math.sin(x / 90)
    t = (SLOPE - x) / SLOPE
    return base_y(SLOPE) - 215 * t ** 1.4


def gy(x):
    if SCENE == "before":
        cx, hw, depth = STREAM
        if abs(x - cx) < hw:
            return base_y(x) + depth * (0.5 + 0.5 * math.cos(math.pi * (x - cx) / hw))
    elif CHANNEL[0] + 3 <= x <= CHANNEL[1] - 3:
        return CHANNEL[2]
    return base_y(x)


def ground_points():
    pts = []
    x = 0
    while x <= W:
        if SCENE == "after" and CHANNEL[0] <= x <= CHANNEL[1]:
            pts += [(CHANNEL[0], base_y(CHANNEL[0])), (CHANNEL[0] + 3, CHANNEL[2]),
                    (CHANNEL[1] - 3, CHANNEL[2]), (CHANNEL[1], base_y(CHANNEL[1]))]
            x = CHANNEL[1] + 6
            continue
        pts.append((x, gy(x)))
        x += 3 if abs(x - STREAM[0]) < STREAM[1] + 6 else 8
    return pts


FAR = None


def far_range():
    pts: list[tuple[float, float]] = [(0, H)]
    for x in range(0, W + 1, 24):
        pts.append((x, 250 - 40 * math.sin(x / 170 + 0.4) - 22 * math.sin(x / 61) + rng.uniform(-8, 8)))
    return poly(pts + [(W, H)])


# ---------------------------------------------------------------- Figuren

def blade(x, base, h, w, lean):
    return poly([(x - w / 2, base + 2), (x + lean, base - h), (x + w / 2, base + 2)])


def tufts(x1, x2, hmin, hmax, step=(4, 8)):
    d = ""
    x = x1
    while x < x2:
        d += blade(x, gy(x), rng.uniform(hmin, hmax), rng.uniform(1.8, 2.8), rng.uniform(-2.5, 2.5))
        x += rng.uniform(*step)
    return [p(d)]


def flower(x, h):
    base = gy(x)
    lean = rng.uniform(-2, 2)
    out = [stroke(f"M{f(x)} {f(base)}Q{f(x + lean * 0.4)} {f(base - h * 0.5)} {f(x + lean)} {f(base - h)}", 1)]
    hx, hy = x + lean, base - h
    if rng.random() < 0.5:
        for k in range(6):
            a = k / 6 * 2 * math.pi
            out.append(circle(hx + 2 * math.cos(a), hy + 2 * math.sin(a), 1.2))
        out.append(circle(hx, hy, 1.1, INK))
    else:
        for k in range(-2, 3):
            out.append(circle(hx + k * 1.6, hy - 1.6 + abs(k) * 0.6, 1.1))
    return out


def round_tree(x, h, r):
    base = gy(x)
    cy = base - h + r
    tw = max(1.4, r * 0.12)
    out = [p(poly([(x - tw, base + 3), (x - tw * 0.7, cy), (x + tw * 0.7, cy), (x + tw, base + 3)]))]
    local = random.Random(int(x * 7))
    for dx, dy, rr in [(0, 0, 0.78), (-0.5, 0.2, 0.56), (0.5, 0.18, 0.56), (-0.12, -0.42, 0.52), (0.3, -0.3, 0.5), (-0.62, -0.1, 0.4), (0.66, -0.06, 0.4)]:
        out.append(circle(x + dx * r, cy + dy * r, rr * r * local.uniform(0.9, 1.08)))
    return out


def shrub_shape(x, w, h):
    base = gy(x)
    cx, cy = x, base - h * 0.55
    local = random.Random(int(x * 13))
    out = [ellipse(cx, cy, w * 0.43, h * 0.4)]
    for i in range(9):
        a = math.pi + i / 8 * math.pi
        out.append(circle(cx + w * 0.42 * math.cos(a), cy + h * 0.36 * math.sin(a), h * local.uniform(0.16, 0.22)))
    out.append(p(poly([(x - 2, base + 2), (x - 1, cy), (x + 1, cy), (x + 2, base + 2)])))
    return out


def ghost_shrub(x, w, h):
    """Was fehlt: Umriss gestrichelt, darunter der Stumpf."""
    base = gy(x)
    cx, cy = x, base - h * 0.55
    d = f"M{f(cx - w * 0.46)} {f(cy + h * 0.2)}"
    n = 7
    for i in range(1, n + 1):
        a = math.pi + i / n * math.pi
        px, py = cx + w * 0.46 * math.cos(a), cy - h * 0.1 + h * 0.4 * math.sin(a)
        d += f"A{f(w * 0.12)} {f(w * 0.12)} 0 0 1 {f(px)} {f(py)}"
    d += f"L{f(cx + w * 0.46)} {f(cy + h * 0.2)}Q{f(cx)} {f(cy + h * 0.42)} {f(cx - w * 0.46)} {f(cy + h * 0.2)}Z"
    return [
        stroke(d, 1.3, ' strokeDasharray="3 4" opacity="0.6"'),
        p(poly([(x - 3, base + 2), (x - 3, base - 5), (x - 1, base - 6.5), (x + 3, base - 5), (x + 3, base + 2)])),
    ]


def ghost_tree(x, h, r):
    """Gefällter Einzelbaum: Kronenumriss gestrichelt, darunter der Stumpf."""
    base = gy(x)
    cy = base - h + r
    return [
        stroke(f"M{f(x)} {f(cy + r * 0.7)}V{f(base - 8)}", 1.3, ' strokeDasharray="3 4" opacity="0.6"'),
        f'<circle cx="{f(x)}" cy="{f(cy)}" r="{f(r * 0.95)}" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 4" opacity="0.6"/>',
        p(poly([(x - 4.5, base + 2), (x - 4.5, base - 7), (x - 1.5, base - 9), (x + 4.5, base - 7), (x + 4.5, base + 2)])),
    ]


def spruce(x, h, w):
    base = gy(x)
    left, right = [(x, base - h)], []
    for i in range(1, 4):
        yy = base - h + h * 0.82 * i / 3
        hw = w / 2 * (0.4 + 0.6 * i / 3)
        left.append((x - hw, yy))
        right.append((x + hw, yy))
        if i < 3:
            left.append((x - hw * 0.45, yy - h * 0.04))
            right.append((x + hw * 0.45, yy - h * 0.04))
    yl = left[-1][1]
    tw = max(1.1, h * 0.04)
    return [p(poly(left + [(x - tw, yl), (x - tw, base + 3), (x + tw, base + 3), (x + tw, yl)] + list(reversed(right))))]


def cattail(x, h, lean):
    base = gy(x)
    return [stroke(f"M{f(x)} {f(base)}Q{f(x + lean * 0.3)} {f(base - h * 0.6)} {f(x + lean)} {f(base - h)}", 1.3),
            rect(x + lean * 0.88 - 1.5, base - h + 3, 3, 9, ' rx="1.5"')]


def stone_wall(x1, x2):
    out = []
    for row in range(3):
        x = x1 + (row % 2) * 4
        while x < x2 - 4:
            w = rng.uniform(6, 9)
            out.append(rect(x, gy(x) - 6 - row * 5.4, w - 1.2, 4.6, ' rx="2"'))
            x += w
    return out


def butterfly(x, y, s=1.0):
    return [f'<g className="profile-flutter">' + "".join([
        ellipse(x - 2.6 * s, y - 1.4 * s, 2.6 * s, 2 * s), ellipse(x + 2.6 * s, y - 1.4 * s, 2.6 * s, 2 * s),
        ellipse(x - 1.9 * s, y + 1.6 * s, 1.8 * s, 1.4 * s), ellipse(x + 1.9 * s, y + 1.6 * s, 1.8 * s, 1.4 * s),
        ellipse(x, y, 0.6 * s, 2.6 * s)]) + "</g>"]


def bird(x, yy, s, delay=0.0):
    return [f'<g className="profile-bird" style={{{{ "--bird-delay": "{delay}s" }} as CSSProperties}}><g className="profile-wing">'
            + p(f"M{f(x - 9 * s)} {f(yy)}Q{f(x - 4 * s)} {f(yy - 5 * s)} {f(x)} {f(yy + 0.5 * s)}"
                f"Q{f(x + 4 * s)} {f(yy - 5 * s)} {f(x + 9 * s)} {f(yy)}Q{f(x + 4 * s)} {f(yy - 2 * s)} {f(x)} {f(yy + 2.5 * s)}"
                f"Q{f(x - 4 * s)} {f(yy - 2 * s)} {f(x - 9 * s)} {f(yy)}Z") + "</g></g>"]


def tractor(x):
    """Traktor mit Düngerstreuer, nach links fahrend."""
    base = gy(x)
    out = [
        rect(x - 20, base - 17, 24, 9, ' rx="2"'),  # Motorhaube
        p(poly([(x + 2, base - 33), (x + 17, base - 33), (x + 18, base - 12), (x + 1, base - 12)])),  # Kabine
        circle(x + 11, base - 9.5, 9.5),
        circle(x - 13, base - 5.5, 5.5),
        stroke(f"M{f(x - 8)} {f(base - 17)}V{f(base - 25)}", 2.2),
        p(poly([(x + 22, base - 20), (x + 34, base - 20), (x + 31, base - 10), (x + 25, base - 10)])),  # Streuer
    ]
    out.append(rect(x + 5, base - 30, 9, 9, ' rx="1"' + INK))  # Fenster
    out.append(circle(x + 11, base - 9.5, 3.5, INK))
    out.append(circle(x - 13, base - 5.5, 2, INK))
    spray = "".join(f"M{f(x + 34)} {f(base - 12)}Q{f(x + 44 + k * 3)} {f(base - 14 + k * 3)} {f(x + 48 + k * 4)} {f(base - 4 + k * 2)}" for k in range(3))
    out.append(f'<path d="{spray}" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="0.1 3.4"/>')
    return out


def car(x):
    base = gy(x) - 4
    return [p(f"M{f(x - 15)} {f(base - 3)}V{f(base - 8)}Q{f(x - 15)} {f(base - 9.5)} {f(x - 12)} {f(base - 9.5)}H{f(x - 8)}L{f(x - 4)} {f(base - 15)}H{f(x + 7)}L{f(x + 11)} {f(base - 9.5)}H{f(x + 13)}Q{f(x + 15)} {f(base - 9.5)} {f(x + 15)} {f(base - 7)}V{f(base - 3)}Z"),
            circle(x - 8, base - 3, 3, INK), circle(x + 8, base - 3, 3, INK)]


def house(x, w, h, roof):
    base = gy(x)
    return [p(poly([(x - w / 2, base), (x - w / 2, base - h), (x - w / 2 - 2, base - h), (x, base - h - roof),
                    (x + w / 2 + 2, base - h), (x + w / 2, base - h), (x + w / 2, base)]))]


def sun(cx, cy, r):
    rays = ""
    for i in range(12):
        a = i / 12 * 2 * math.pi
        rays += f"M{f(cx + (r + 6) * math.cos(a))} {f(cy + (r + 6) * math.sin(a))}L{f(cx + (r + 14) * math.cos(a))} {f(cy + (r + 14) * math.sin(a))}"
    return [circle(cx, cy, r), stroke(rays, 2.6, ' className="profile-rays"')]


def scaled(elements, x, s):
    """Vergrößert um den Fußpunkt, damit Gebautes auf dem Boden stehen bleibt."""
    base = gy(x)
    return [f'<g transform="translate({f(x)} {f(base)}) scale({s}) translate({f(-x)} {f(-base)})">' + "".join(elements) + "</g>"]


def sway(elements, x):
    delay = -((x / 90) % 6)
    return [f'<g className="profile-sway" style={{{{ "--sway-delay": "{delay:.2f}s" }} as CSSProperties}}>' + "".join(elements) + "</g>"]


# ---------------------------------------------------------------- Szenen


def d(x):
    """Wachsen von rechts nach links, wie der Regler aufdeckt."""
    return 300 + int((W - x) / W * 700)


def frame(groups):
    """Gelände und Berge sind in beiden Szenen gleich gebaut."""
    ground = ground_points()
    groups.insert(0, (40, "grow", [p(poly([(0, H)] + ground + [(W, H)]), ' className="fill-[var(--color-forest)]"'),
                                    stroke("M" + " L".join(f"{f(px)} {f(py)}" for px, py in ground), 2)], ""))
    groups.insert(0, (0, "grow", [p(FAR)], ' opacity="0.07"'))
    return groups


def flow_line(x1, x2, y):
    return (f'<path className="profile-flow" d="M{f(x1)} {f(y)}H{f(x2)}" fill="none" stroke="currentColor" '
            f'strokeWidth="1.6" strokeLinecap="round" strokeDasharray="6 8" opacity="0.8"/>')


def before_scene():
    g = []

    def add(delay, els, kind="grow", extra=""):
        g.append((delay, kind, els, extra))

    # 7 Berg: Waldgrenze tiefer, darüber Rasen
    x = 196.0
    while x < 268:
        add(d(x), sway(spruce(x, rng.uniform(30, 40), rng.uniform(13, 16)), x))
        x += rng.uniform(9, 12)
    add(d(60), tufts(0, 190, 4, 8, (6, 10)))
    for x in range(274, 326, 13):
        add(d(x), flower(x, rng.uniform(9, 15)))
    # 6 Einzelbaum und Hecke
    add(d(370), sway(round_tree(370, 118, 36), 370))
    for x, w, h in ((420, 30, 36), (448, 34, 44), (478, 26, 32)):
        add(d(x), sway(shrub_shape(x, w, h), x))
    # 5 Bach mit Röhricht
    sx, shw, _ = STREAM
    level = base_y(sx) + 7
    water = [(x, gy(x)) for x in range(int(sx - shw), int(sx + shw) + 1, 3) if gy(x) > level]
    add(200, [p(poly([(water[0][0], level)] + water + [(water[-1][0], level)]), PAPER + ' opacity="0.22"'),
              flow_line(water[0][0], water[-1][0], level)])
    for x, h, lean in ((508, 34, -2), (514, 40, 1), (521, 30, 3), (599, 32, -3), (606, 40, 1), (613, 28, 2)):
        add(d(x), cattail(x, h, lean))
    # 4 Magerwiese, 3 Wiese, wo heute die Straße liegt
    add(d(0), tufts(320, 510, 7, 16) + tufts(610, 1440, 7, 16))
    for x in list(range(632, 900, 16)) + list(range(1156, 1430, 19)):
        add(d(x) + 80, flower(x + rng.uniform(-4, 4), rng.uniform(12, 24)))
    add(d(650), sway(round_tree(650, 62, 20), 650))
    # 2 Auwald, wo heute Halle und Häuser stehen
    for x, h, r in ((924, 82, 24), (972, 98, 29), (1026, 86, 25), (1078, 74, 22), (1118, 60, 18)):
        add(d(x), sway(round_tree(x, h, r), x))
    for x, w, h in ((948, 22, 24), (1000, 24, 26), (1052, 22, 22)):
        add(d(x), sway(shrub_shape(x, w, h), x))
    # 1 Blumenwiese mit Trockenmauer
    add(d(1330), stone_wall(1318, 1382))
    # Tiere
    add(1100, butterfly(700, 300, 1.1) + butterfly(820, 316) + butterfly(1210, 298, 0.9) + butterfly(1350, 304) + butterfly(290, 270, 0.9), "fade")
    add(1160, bird(1220, 196, 1) + bird(1246, 208, 0.75, -1.9) + bird(760, 176, 0.8, -3.4), "fade")
    return frame(g)


def after_scene():
    g = []

    def add(delay, els, kind="grow", extra=""):
        g.append((delay, kind, els, extra))

    # 7 Berg: Wald steigt bergauf, Sonne, Pfeil nach oben
    x = 96.0
    while x < 268:
        add(d(x), sway(spruce(x, rng.uniform(30, 40), rng.uniform(13, 16)), x))
        x += rng.uniform(9, 12)
    for x in (56, 76):
        add(d(x), sway(spruce(x, 18, 9), x))
    add(d(20), tufts(0, 44, 4, 8, (6, 10)))
    for x in (290, 306):
        add(d(x), flower(x, rng.uniform(9, 15)))
    arrow = f"M154 {f(gy(154) - 46)}Q104 {f(gy(104) - 62)} 52 {f(gy(52) - 40)}"
    add(1220, [stroke(arrow, 1.8, ' strokeDasharray="0.1 4.2"'),
               stroke(f"M60 {f(gy(52) - 48)}L51 {f(gy(52) - 40)}L62 {f(gy(52) - 36)}", 1.8)], "fade")
    add(1000, sun(250, 186, 17), "fade")
    # 6 Gerodet: Baum und Hecke nur noch als Umriss
    add(d(370), ghost_tree(370, 118, 36))
    for x, w, h in ((420, 30, 36), (450, 34, 42), (480, 28, 34)):
        add(d(x), ghost_shrub(x, w, h))
    add(d(320), tufts(320, 510, 4, 9, (7, 12)))
    # 5 Begradigter Bach im Betonbett
    c1, c2, sole = CHANNEL
    add(d(c1), [rect(c1 + 3, sole - 10, c2 - c1 - 6, 10, PAPER + ' opacity="0.22"'), flow_line(c1 + 4, c2 - 4, sole - 10)]
        + built([stroke(f"M{f(c1)} {f(base_y(c1))}L{f(c1 + 3)} {f(sole)}H{f(c2 - 3)}L{f(c2)} {f(base_y(c2))}", 3)], 0.7))
    # 4 Magerwiese wächst zu
    for x in (630, 642, 760):
        add(d(x), flower(x, rng.uniform(10, 16)))
    for x, w, h in ((660, 18, 18), (688, 24, 24), (718, 30, 30), (748, 32, 34)):
        add(d(x), sway(shrub_shape(x, w, h), x))
    add(d(600), tufts(596, 770, 6, 13, (5, 9)))
    # 3 Straße mit Zäunen
    r1, r2 = 794, 866
    add(d(r1), built([rect(r1, base_y(r1) - 4, r2 - r1, 4)], 0.45)
        + [f'<path d="M{r1 + 6} {f(base_y(r1) - 2)}H{r2 - 4}" stroke="var(--color-ink)" strokeWidth="1.2" strokeDasharray="5 5"/>']
        + built([stroke("".join(f"M{px} {f(gy(px))}V{f(gy(px) - 13)}" for px in list(range(770, 791, 5)) + list(range(870, 891, 5))), 1.5),
                 stroke(f"M770 {f(gy(770) - 11)}H790M770 {f(gy(770) - 6)}H790M870 {f(gy(870) - 11)}H890M870 {f(gy(870) - 6)}H890", 1)], 0.6))
    add(1150, ['<g className="profile-car">'] + built(scaled(car(830), 830, 1.35), 0.9) + ["</g>"], "fade")
    # 2 Versiegelt: Halle, Häuser, Parkplatz
    add(d(920), built([rect(904, gy(920) - 1, 240, 3), rect(910, gy(920) - 46, 112, 46)]
                      + [rect(917 + i * 14, gy(920) - 36, 8, 8, INK) for i in range(7)]
                      + [rect(917 + i * 14, gy(920) - 20, 8, 8, INK) for i in range(7)]
                      + house(1052, 26, 26, 15) + house(1084, 22, 22, 13) + house(1116, 20, 20, 12)))
    # 1 Intensivwiese: gleich hohes Gras, Traktor mit Dünger
    even = ""
    x = 1148.0
    while x < 1440:
        even += blade(x, gy(x), 5.5, 2, 0.6)
        x += 4.4
    add(d(1148), [p(even)])
    add(d(1280), built(scaled(tractor(1280), 1280, 1.4)))
    return frame(g)


FAR = far_range()
SCENE = "before"
BEFORE = before_scene()
SCENE = "after"
AFTER = after_scene()


def pct(px, py):
    return {"left": f"{px / W * 100:.2f}%", "top": f"{(py - VIEW_TOP) / (H - VIEW_TOP) * 100:.2f}%"}


# In der Reihenfolge der Legende; `split` ist die Reglerstellung in Prozent,
# bei der die Nummer aufgedeckt wird (der Regler läuft von 100 nach 0).
MARKERS = [
    ("intensification", 1286, 72),
    ("sealing", 966, 70),
    ("fragmentation", 830, 50),
    ("meadows", 704, 52),
    ("drainage", 560, 38),
    ("structure", 440, 66),
    ("climate", 110, 84),
]
spots = {
    "markers": [
        {"key": key, **pct(x, gy(x) - lift), "split": round(x / W * 100, 2)}
        for key, x, lift in MARKERS
    ],
}


def render(groups):
    return "\n".join(
        f'      <g className="habitat-{kind}" style={{{{ "--habitat-delay": "{delay}ms" }} as CSSProperties}}{extra}>'
        + "".join(els) + "</g>"
        for delay, kind, els, extra in groups
    )


def component(name, doc, groups):
    return f"""
/** {doc} */
export function {name}({{ className }}: {{ className?: string }}) {{
  return (
    <svg viewBox="0 {VIEW_TOP} {W} {H - VIEW_TOP}" aria-hidden focusable="false" fill="currentColor" className={{className}}>
{render(groups)}
    </svg>
  );
}}
"""


tsx = f"""// Erzeugt von scripts/build-loss-scene.py – dort ändern, nicht hier.
import type {{ CSSProperties }} from "react";

/**
 * Lage der Nummern über der Szene „heute“, in Prozent der Bildfläche. Kommt
 * aus demselben Skript wie das SVG.
 */
export const lossSceneSpots = {json.dumps(spots, indent=2)} as const;

/*
 * Derselbe Talboden früher und heute aus Silhouetten, hell auf dunkel, für den
 * Vorher-nachher-Regler. Rein dekorativ (`aria-hidden`): Was sich ändert, steht
 * in der Legende. Bewegung in globals.css (`habitat-*`, `profile-*`).
 */
{component("LossSceneBefore", "Der Talboden, wie er früher war.", BEFORE)}{component("LossSceneAfter", "Derselbe Talboden, wie er heute oft aussieht.", AFTER)}"""

out = Path(__file__).resolve().parent.parent / "src/components/home/loss-scene.tsx"
out.write_text(tsx)
print(f"wrote {out} ({len(tsx) // 1024} KB, {len(BEFORE)} + {len(AFTER)} groups)")
