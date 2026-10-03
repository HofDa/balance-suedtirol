"""
Erzeugt src/components/home/logo-butterfly.tsx: den Schmetterling aus dem
Logo (public/balance-logo-transparent.png) als Vektorform, für den Abschluss
der Startseite, wo er auf dem Leitsatz landet.

Der Schmetterling wird aus dem Logo ausgeschnitten, über den Alphakanal
freigestellt und mit OpenCV nachgezogen (Umrisse mit Löchern, gerade Stücke
vereinfacht). Gefüllt wird mit `evenodd`, so bleiben die hellen Flügelflächen
offen wie im Logo. Aufruf: python3 scripts/build-logo-butterfly.py
"""

from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/balance-logo-transparent.png"
OUT = ROOT / "src/components/home/logo-butterfly.tsx"
CROP = (750, 170, 1370, 625)  # x0, y0, x1, y1: nur der Schmetterling
EPS = 0.7  # Vereinfachung in Pixeln des Logos

img = cv2.imread(str(SRC), cv2.IMREAD_UNCHANGED)
assert img is not None, SRC
x0, y0, x1, y1 = CROP
alpha = img[y0:y1, x0:x1, 3]
_, mask = cv2.threshold(alpha, 110, 255, cv2.THRESH_BINARY)

contours, _ = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
xs, ys = np.where(mask > 0)[1], np.where(mask > 0)[0]
bx0, by0, bx1, by1 = xs.min() - 2, ys.min() - 2, xs.max() + 2, ys.max() + 2


def fmt(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


parts = []
for contour in contours:
    if cv2.contourArea(contour) < 6:
        continue
    pts = cv2.approxPolyDP(contour, EPS, True)[:, 0, :]
    parts.append("M" + "L".join(f"{fmt(px - bx0)} {fmt(py - by0)}" for px, py in pts) + "Z")

w, h = bx1 - bx0, by1 - by0
tsx = f'''// Erzeugt von scripts/build-logo-butterfly.py – dort ändern, nicht hier.

/** Der Schmetterling aus dem Logo, als Fläche mit `evenodd`. Rein dekorativ. */
export function LogoButterfly({{ className }}: {{ className?: string }}) {{
  return (
    <svg viewBox="0 0 {w} {h}" aria-hidden focusable="false" fill="currentColor" fillRule="evenodd" className={{className}}>
      <path d="{"".join(parts)}" />
    </svg>
  );
}}
'''
OUT.write_text(tsx)
print(f"wrote {OUT} ({len(tsx) // 1024} KB, {len(parts)} contours, {w}x{h})")
