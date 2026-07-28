"""Turn the South Tyrol administrative boundary into a stylised SVG path.

Source: OpenStreetMap relation for the Autonomous Province of Bolzano,
fetched via Nominatim. Data © OpenStreetMap contributors, ODbL 1.0.

The raw polygon carries a few thousand points — far more detail than a
thumbnail-sized locator map can show, and enough to bloat the bundle. This
script projects it, simplifies it with Douglas-Peucker, and writes a ready to
paste TypeScript module. Rerun only when the outline or the viewBox changes;
the generated file is committed.

    python3 scripts/build-southtyrol-outline.py
"""
import json
import math
import os
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "components", "projects", "south-tyrol-outline.ts")

URL = ("https://nominatim.openstreetmap.org/search"
       "?q=Autonome+Provinz+Bozen&format=json&polygon_geojson=1&limit=1")
UA = "balance-biodiversitaetsplattform/dev (outline build script)"

# Zeichenfläche. 1000 Breite hält die Pfadzahlen kurz und lesbar.
VIEW_W = 1000.0
PAD = 8.0
# Douglas-Peucker-Toleranz in Einheiten der Zeichenfläche. 1.6 lässt die
# markanten Täler stehen und glättet das Grundrauschen einzelner Gemeinden weg.
TOLERANCE = 1.6


def fetch_polygon():
    req = urllib.request.Request(URL, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as fh:
        data = json.load(fh)
    geo = data[0]["geojson"]
    rings = geo["coordinates"] if geo["type"] == "Polygon" else [
        r for poly in geo["coordinates"] for r in poly
    ]
    # Größter Ring ist das Festland; Enklaven und Löcher interessieren hier nicht.
    return max(rings, key=len)


def project(ring):
    """Äquirektangulär mit Breitengrad-Korrektur — bei dieser Ausdehnung genau genug."""
    lats = [p[1] for p in ring]
    lngs = [p[0] for p in ring]
    lat0 = (min(lats) + max(lats)) / 2
    k = math.cos(math.radians(lat0))

    xs = [lng * k for lng in lngs]
    ys = [-lat for lat in lats]  # SVG-y wächst nach unten
    min_x, max_x, min_y, max_y = min(xs), max(xs), min(ys), max(ys)
    scale = (VIEW_W - 2 * PAD) / (max_x - min_x)

    pts = [(PAD + (x - min_x) * scale, PAD + (y - min_y) * scale) for x, y in zip(xs, ys)]
    height = 2 * PAD + (max_y - min_y) * scale
    return pts, height, (min(lngs), max(lngs), min(lats), max(lats), k, scale, min_x, min_y)


def simplify_ring(pts, tol):
    """Douglas-Peucker auf einem geschlossenen Ring.

    Direkt angewendet kollabiert der Algorithmus hier: Anfangs- und Endpunkt
    fallen zusammen, damit ist die Bezugsstrecke null lang und jeder Abstand
    darauf ebenfalls. Deshalb wird der Ring zuerst an zwei weit auseinander
    liegenden Punkten in zwei offene Ketten geteilt.
    """
    if pts[0] == pts[-1]:
        pts = pts[:-1]
    if len(pts) < 4:
        return pts

    ax, ay = pts[0]
    far = max(range(len(pts)), key=lambda i: math.hypot(pts[i][0] - ax, pts[i][1] - ay))
    first = simplify(pts[: far + 1], tol)
    second = simplify(pts[far:] + [pts[0]], tol)
    return first[:-1] + second[:-1]


def simplify(pts, tol):
    """Douglas-Peucker auf einer offenen Kette, iterativ."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i, j = stack.pop()
        ax, ay = pts[i]
        bx, by = pts[j]
        dx, dy = bx - ax, by - ay
        norm = math.hypot(dx, dy) or 1.0
        far_d, far_i = -1.0, -1
        for k in range(i + 1, j):
            px, py = pts[k]
            d = abs(dy * px - dx * py + bx * ay - by * ax) / norm
            if d > far_d:
                far_d, far_i = d, k
        if far_d > tol:
            keep[far_i] = True
            stack.append((i, far_i))
            stack.append((far_i, j))
    return [p for p, k in zip(pts, keep) if k]


def main():
    ring = fetch_polygon()
    pts, height, meta = project(ring)
    simplified = simplify_ring(pts, TOLERANCE)
    min_lng, max_lng, min_lat, max_lat, k, scale, min_x, min_y = meta

    d = "M" + " ".join(f"{x:.1f} {y:.1f}" for x, y in simplified) + "Z"

    body = f'''// Erzeugt von scripts/build-southtyrol-outline.py — nicht von Hand ändern.
// Quelle: Verwaltungsgrenze der Autonomen Provinz Bozen aus OpenStreetMap.
// Data © OpenStreetMap contributors, ODbL 1.0 — die Attribution gehört sichtbar
// an jede Darstellung dieses Umrisses.

/** Zeichenfläche des Pfades. */
export const OUTLINE_VIEWBOX = {{ width: {VIEW_W:.0f}, height: {height:.1f} }};

/** Vereinfachter Umriss, {len(simplified)} Punkte (von {len(pts)}). */
export const SOUTH_TYROL_PATH =
  "{d}";

/**
 * Dieselbe Projektion, mit der der Pfad erzeugt wurde. Nur so landet ein
 * Projektpunkt an der richtigen Stelle im Umriss.
 */
export function projectToOutline(lat: number, lng: number) {{
  const x = {PAD} + (lng * {k:.10f} - {min_x:.10f}) * {scale:.6f};
  const y = {PAD} + (-lat - {min_y:.10f}) * {scale:.6f};
  return {{ x, y }};
}}

/** Grenzen des Umrisses — für Plausibilitätsprüfungen. */
export const OUTLINE_BOUNDS = {{
  minLat: {min_lat:.4f}, maxLat: {max_lat:.4f},
  minLng: {min_lng:.4f}, maxLng: {max_lng:.4f}
}};
'''
    with open(OUT, "w") as fh:
        fh.write(body)

    print(f"Punkte: {len(pts)} -> {len(simplified)}")
    print(f"viewBox: 0 0 {VIEW_W:.0f} {height:.1f}")
    print(f"Pfadlänge: {len(d)} Zeichen")
    print(f"geschrieben: {os.path.relpath(OUT, ROOT)}")


if __name__ == "__main__":
    main()
