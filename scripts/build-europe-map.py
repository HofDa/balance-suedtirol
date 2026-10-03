"""
Erzeugt src/components/home/europe-map.ts: Europa als Silhouette für die
Infografik „Warum Biodiversitätsverlust auch wirtschaftlich zählt“.

Drei Flächen: der Euroraum (zur Zahl der Unternehmenskredite, EZB 2023), die
EU-27 (zur Wertschöpfung, JRC 2025) und das übrige Europa als leiser Grund.
Zu jeder Zahl rechnet das Skript die Höhe aus, bis zu der die Fläche von unten
gefüllt sein muss, damit genau dieser Anteil der Landfläche bedeckt ist –
75 % des Euroraums, zwei Drittel der EU. Die Füllung ist also flächentreu,
nicht nur ein Balken in Landesform.

Quelle: Natural Earth, Admin 0 Countries 1:50m (gemeinfrei). Projektion:
Lambert flächentreu azimutal um 10° O / 52° N (wie ETRS89-LAEA), damit
Flächenanteile im Bild stimmen. Danach Douglas-Peucker. Aufruf:
python3 scripts/build-europe-map.py
"""

import json
import math
import urllib.request
from pathlib import Path

URL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson"

# Euroraum im Bezugsjahr der EZB-Studie (2023, mit Kroatien).
EUROZONE = {"AUT", "BEL", "HRV", "CYP", "EST", "FIN", "FRA", "DEU", "GRC", "IRL", "ITA",
            "LVA", "LTU", "LUX", "MLT", "NLD", "PRT", "SVK", "SVN", "ESP"}
EU = EUROZONE | {"BGR", "CZE", "DNK", "HUN", "POL", "ROU", "SWE"}
# Übriges Europa als Grund; Russland, Türkei und Nordafrika bleiben weg,
# sonst schrumpft die EU im Bild.
# Kleinstaaten (Andorra, Monaco, San Marino, Vatikan, Liechtenstein) bleiben
# weg: In dieser Größe wären sie nur Punkte.
OTHER = {"GBR", "NOR", "ISL", "CHE", "ALB", "MKD", "MNE", "SRB", "BIH", "KOS", "XKX",
         "MDA", "UKR", "BLR"}

LON0, LAT0 = math.radians(10), math.radians(52)
BOX = (-25, 34, 35, 72)  # lon/lat-Rahmen: schneidet Übersee-Gebiete ab
W = 400
PAD = 4
TOL = 2.4  # Douglas-Peucker in Bildeinheiten: bewusst grob, eine Silhouette, keine Karte
MIN_AREA = 40  # kleinere Inseln fallen weg (Bildeinheiten²)


def laea(lon, lat):
    lon, lat = math.radians(lon), math.radians(lat)
    k = math.sqrt(2 / (1 + math.sin(LAT0) * math.sin(lat) + math.cos(LAT0) * math.cos(lat) * math.cos(lon - LON0)))
    x = k * math.cos(lat) * math.sin(lon - LON0)
    y = k * (math.cos(LAT0) * math.sin(lat) - math.sin(LAT0) * math.cos(lat) * math.cos(lon - LON0))
    return x, -y


def dp(points, tol):
    if len(points) < 3:
        return points
    a, b = points[0], points[-1]
    dx, dy = b[0] - a[0], b[1] - a[1]
    norm = math.hypot(dx, dy) or 1e-9
    best, idx = 0.0, 0
    for i in range(1, len(points) - 1):
        d = abs(dy * points[i][0] - dx * points[i][1] + b[0] * a[1] - b[1] * a[0]) / norm
        if d > best:
            best, idx = d, i
    if best <= tol:
        return [a, b]
    return dp(points[: idx + 1], tol)[:-1] + dp(points[idx:], tol)


def dp_ring(ring, tol):
    """Geschlossener Ring: Anfang und Ende fallen zusammen, darum am fernsten
    Punkt teilen und beide Hälften einzeln vereinfachen."""
    far = max(range(len(ring)), key=lambda i: math.dist(ring[0], ring[i]))
    return dp(ring[: far + 1], tol)[:-1] + dp(ring[far:], tol)


def iso(props):
    for key in ("ISO_A3", "ADM0_A3", "ISO_A3_EH", "SOV_A3"):
        v = props.get(key)
        if v and v != "-99":
            return v
    return None


data = json.load(urllib.request.urlopen(urllib.request.Request(URL, headers={"User-Agent": "balance build script"}), timeout=120))
groups = {"eurozone": [], "eu_only": [], "other": []}
for feat in data["features"]:
    code = iso(feat["properties"])
    if code == "FRA" or feat["properties"].get("ADM0_A3") == "FRA":
        code = "FRA"
    if code in EUROZONE:
        key = "eurozone"
    elif code in EU:
        key = "eu_only"
    elif code in OTHER:
        key = "other"
    else:
        continue
    geom = feat["geometry"]
    polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    for poly in polys:
        outer = poly[0]
        lons = [p[0] for p in outer]
        lats = [p[1] for p in outer]
        cx, cy = sum(lons) / len(lons), sum(lats) / len(lats)
        if not (BOX[0] <= cx <= BOX[2] and BOX[1] <= cy <= BOX[3]):
            continue  # Übersee
        groups[key].append([[laea(*pt) for pt in ring] for ring in poly])

# In die Zeichenfläche einpassen.
allpts = [pt for g in groups.values() for poly in g for ring in poly for pt in ring]
minx, maxx = min(p[0] for p in allpts), max(p[0] for p in allpts)
miny, maxy = min(p[1] for p in allpts), max(p[1] for p in allpts)
s = (W - 2 * PAD) / (maxx - minx)
H = round((maxy - miny) * s + 2 * PAD)


def ring_area(ring):
    return 0.5 * sum(ring[i][0] * ring[i - 1][1] - ring[i - 1][0] * ring[i][1] for i in range(len(ring)))


def fit(pt):
    return ((pt[0] - minx) * s + PAD, (pt[1] - miny) * s + PAD)


for key in groups:
    out = []
    for poly in groups[key]:
        rings = []
        for ring in poly:
            r = dp_ring([fit(p) for p in ring], TOL)
            if len(r) >= 4 and abs(ring_area(r)) >= MIN_AREA:
                rings.append(r)
        if rings:
            out.append(rings)
    groups[key] = out


def clip_below(ring, cut):
    """Sutherland-Hodgman gegen die Halbebene y >= cut (unterhalb im Bild)."""
    out = []
    for i in range(len(ring)):
        cur, prev = ring[i], ring[i - 1]
        cin, pin = cur[1] >= cut, prev[1] >= cut
        if cin != pin:
            t = (cut - prev[1]) / (cur[1] - prev[1])
            out.append((prev[0] + t * (cur[0] - prev[0]), cut))
        if cin:
            out.append(cur)
    return out


def area_below(polys, cut):
    return abs(sum(ring_area(clip_below(r, cut)) for poly in polys for r in poly if len(clip_below(r, cut)) >= 3))


def fill_line(polys, share):
    total = area_below(polys, -1)
    lo, hi = 0.0, float(H)
    for _ in range(50):
        mid = (lo + hi) / 2
        if area_below(polys, mid) > share * total:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def path(polys):
    return "".join("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in ring) + "Z" for poly in polys for ring in poly)


eurozone = groups["eurozone"]
eu = groups["eurozone"] + groups["eu_only"]
cut_ez = fill_line(eurozone, 0.75)
cut_eu = fill_line(eu, 2 / 3)

tsx = f'''// Erzeugt von scripts/build-europe-map.py – dort ändern, nicht hier.
// Umrisse: Natural Earth, Admin 0 Countries 1:50m (gemeinfrei).

export const europeViewBox = "0 0 {W} {H}";

/** Euroraum (Stand 2023), übrige EU-Staaten, übriges Europa als Grund. */
export const europePaths = {{
  eurozone: "{path(groups["eurozone"])}",
  euOnly: "{path(groups["eu_only"])}",
  other: "{path(groups["other"])}"
}} as const;

/**
 * Füllhöhe in Prozent der Bildhöhe, von oben gemessen: Unterhalb dieser Linie
 * liegt genau der genannte Anteil der Landfläche (flächentreue Projektion).
 */
export const europeFillTop = {{
  eurozone75: {cut_ez / H * 100:.2f},
  eu23: {cut_eu / H * 100:.2f}
}} as const;
'''
out = Path(__file__).resolve().parent.parent / "src/components/home/europe-map.ts"
out.write_text(tsx)
print(f"wrote {out} ({len(tsx) // 1024} KB), H={H}, fill tops: EZ {cut_ez / H:.3f}, EU {cut_eu / H:.3f}")
