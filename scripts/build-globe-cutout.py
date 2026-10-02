"""Build the globe cutout (mobility-long) from its measured shape.

    python3 scripts/build-globe-cutout.py

Runs last, after `node scripts/build-full-house-objects.mjs` and
`python3 scripts/refine-house-masks.py`; it writes
public/images/house-tour/full-house/objects/mobility-long.webp.

The travel question used to sit on the gravel drive in the garage. It now
belongs to the globe on the living-room sideboard. There is no generated mask
for the globe, and colour does not separate it: its green continents have the
same tone as the wall behind. So the sphere is taken as an ellipse fitted on
the 4× master (Hough circle: centre 78.5/88.5, r 66.7), and the meridian ring,
stem and foot — near-black metal — come from the picture by darkness, kept only
where they connect to the sphere.
"""
import json
import os

import numpy as np
import cv2
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LAYOUT = os.path.join(ROOT, "src/features/house-tour/config/full-house-layout.json")
MASTER = os.path.join(ROOT, "assets-source/house/full-house/house-x4.webp")
OUT = os.path.join(ROOT, "public/images/house-tour/full-house/objects/mobility-long.webp")
SCALE = 4
ID = "mobility-long"

with open(LAYOUT) as handle:
    layout = json.load(handle)
box = next(item["box"] for item in layout["objects"] if item["id"] == ID)
left, top, width, height = (value * SCALE for value in box)

master = Image.open(MASTER).convert("RGB")
crop = master.crop((left, top, left + width, top + height))

# Sphere in px of the master crop (the box at 4×), from the Hough fit.
SPHERE = (77.5, 90.5, 61.5, 66.5)  # centre x, centre y, radius x, radius y
# Ring, stem and foot are near-black against the sage wall and the wood of
# the sideboard; they are taken from the picture itself rather than drawn,
# so the mask follows the painted edge instead of an estimated arc.
DARK = 70  # luminance below this counts as globe metal
SIDEBOARD_TOP = 206  # below this row only the foot belongs to the globe

grey = np.asarray(crop.convert("L"), dtype=np.uint8)
yy, xx = np.mgrid[0:height, 0:width]
cx, cy, rx, ry = SPHERE
sphere = ((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2 <= 1.0

# Dark only counts where globe metal can be: a band just outside the sphere
# (the meridian ring), the stem below it and the oval foot. Elsewhere the
# shadow on the wall and the sideboard's edge would be just as dark.
dist = np.sqrt(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2)
ring_zone = (dist >= 0.9) & (dist <= 1.22) & ((xx > cx - 10) | (yy > cy + 40))
knob_zone = (xx >= 96) & (xx <= 112) & (yy <= 26)
stem_zone = (xx >= 66) & (xx <= 90) & (yy >= 150) & (yy < SIDEBOARD_TOP)
foot_zone = ((xx - 79) / 41.0) ** 2 + ((yy - 203) / 12.0) ** 2 <= 1.0
dark = (grey < DARK) & (ring_zone | knob_zone | stem_zone | foot_zone)
# Keep only the dark parts connected to the sphere: the ring and stand, not
# shadows elsewhere in the crop.
seed = ((sphere | dark) * 255).astype(np.uint8)
seed = cv2.morphologyEx(seed, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
count, labels = cv2.connectedComponents(seed)
keep = np.unique(labels[sphere])
shape = np.isin(labels, keep[keep > 0]).astype(np.uint8) * 255
# Fill holes: flood the background from a corner, everything not reached is inside.
flood = shape.copy()
cv2.floodFill(flood, np.zeros((height + 2, width + 2), np.uint8), (0, 0), 255)
shape = shape | cv2.bitwise_not(flood)

alpha = Image.fromarray(shape).filter(ImageFilter.GaussianBlur(0.7))
cutout = crop.copy()
cutout.putalpha(alpha)
cutout.save(OUT, "WEBP", quality=88, alpha_quality=100)
print(f"{ID}: globe cutout {width}x{height} from sphere fit and dark metal")
