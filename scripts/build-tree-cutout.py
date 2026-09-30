"""Build the fruit-tree cutout (garden-plants) from colour instead of the generated mask.

    python3 scripts/build-tree-cutout.py

Runs last, after `node scripts/build-full-house-objects.mjs` and
`python3 scripts/refine-house-masks.py`; it replaces
public/images/house-tour/full-house/objects/garden-plants.webp.

The generated extraction stopped at the top of its box, so the spotlight cut the
canopy off in a straight line, and closing it into one silhouette lit up sky and
mountains between the branches. Here the canopy is found by colour (leaves,
apples, bark) inside a hand-set outline that keeps the bushes behind the tree
out. Small gaps between leaves are closed so the highlight stays calm, large
patches of sky and mountain stay open. The trunk below the canopy still comes
from the generated mask, and the insect hotel in front is cut out again.
"""
import importlib.util
import json
import os

import cv2
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LAYOUT = os.path.join(ROOT, "src/features/house-tour/config/full-house-layout.json")
MASTER = os.path.join(ROOT, "assets-source/house/full-house/house-x4.webp")
EXTRACTION = os.path.join(ROOT, "assets-source/house/full-house/masks/garden-plants.png")
OUT = os.path.join(ROOT, "public/images/house-tour/full-house/objects/garden-plants.webp")
SCALE = 4
ID = "garden-plants"

# Where the generated extraction sat: its old object box in source px. Its mask
# is still used for the trunk, so it is placed exactly as before.
EXTRACTION_BOX = (963, 315, 286, 398)
# Below this line (source px) the canopy ends and the trunk mask takes over.
CANOPY_BOTTOM = 565
# Outline of the canopy in source px: excludes the bushes behind the tree on
# the left and the fence below; colour decides everything inside it.
CANOPY = [
    (1003, 478), (1022, 432), (1052, 392), (1082, 352), (1118, 318), (1150, 292),
    (1185, 272), (1220, 258), (1254, 258), (1254, 610), (1215, 600), (1185, 578),
    (1140, 568), (1085, 562), (1040, 548), (1012, 520),
]
CLOSE_RADIUS = 10       # master px; fills gaps between single leaves
MIN_COMPONENT = 400     # master px; drops stray specks
# Holes smaller than this (master px², about 25 × 25 source px) are filled: they
# showed as grey dots of dimmed sky across the lit canopy. Larger openings stay.
MAX_HOLE = 10000
FEATHER = 1.5


def load_refine_helpers():
    spec = importlib.util.spec_from_file_location("refine", os.path.join(ROOT, "scripts", "refine-house-masks.py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def canopy_by_colour(crop_bgr: np.ndarray) -> np.ndarray:
    hsv = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2HSV_FULL).astype(np.float32) / 255
    hue, sat, val = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    leaves = (hue >= 0.10) & (hue <= 0.38) & (sat >= 0.28) & (val >= 0.2)
    apples = ((hue <= 0.04) | (hue >= 0.93)) & (sat >= 0.35) & (val >= 0.25)
    bark = (hue >= 0.03) & (hue <= 0.14) & (sat >= 0.15) & (sat <= 0.65) & (val <= 0.62)
    return (leaves | apples | bark).astype(np.uint8) * 255


def fill_small_holes(mask: np.ndarray) -> np.ndarray:
    holes = (mask == 0).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(holes, 4)
    filled = mask.copy()
    for index in range(1, count):
        left, top, width, height, area = stats[index]
        touches_edge = left == 0 or top == 0 or left + width == mask.shape[1] or top + height == mask.shape[0]
        if area < MAX_HOLE and not touches_edge:
            filled[labels == index] = 255
    return filled


def trunk_from_extraction(box, shape) -> np.ndarray:
    """The generated mask, scaled into its old box and placed in the new frame."""
    alpha = np.asarray(Image.open(EXTRACTION).convert("RGBA").getchannel("A"))
    ys, xs = np.nonzero(alpha > 160)
    alpha = alpha[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    ex, ey, ew, eh = [v * SCALE for v in EXTRACTION_BOX]
    alpha = cv2.resize(alpha, (ew, eh), interpolation=cv2.INTER_LANCZOS4)
    canvas = np.zeros(shape, np.uint8)
    ox, oy = ex - box[0] * SCALE, ey - box[1] * SCALE
    x0, y0 = max(ox, 0), max(oy, 0)
    x1, y1 = min(ox + ew, shape[1]), min(oy + eh, shape[0])
    canvas[y0:y1, x0:x1] = alpha[y0 - oy:y1 - oy, x0 - ox:x1 - ox]
    canvas[: (CANOPY_BOTTOM - box[1]) * SCALE] = 0
    return canvas


def main():
    refine = load_refine_helpers()
    layout = json.load(open(LAYOUT))
    box = next(o for o in layout["objects"] if o["id"] == ID)["box"]
    x, y, w, h = [v * SCALE for v in box]
    master = cv2.imread(MASTER, cv2.IMREAD_COLOR)
    crop = np.ascontiguousarray(master[y:y + h, x:x + w])

    outline = np.zeros(crop.shape[:2], np.uint8)
    points = np.array([((px - box[0]) * SCALE, (py - box[1]) * SCALE) for px, py in CANOPY], np.int32)
    cv2.fillPoly(outline, [points], 255)
    canopy = cv2.bitwise_and(canopy_by_colour(crop), outline)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * CLOSE_RADIUS + 1, 2 * CLOSE_RADIUS + 1))
    canopy = cv2.morphologyEx(canopy, cv2.MORPH_CLOSE, kernel)
    canopy = cv2.bitwise_and(canopy, outline)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(canopy, 8)
    for index in range(1, count):
        if stats[index, cv2.CC_STAT_AREA] < MIN_COMPONENT:
            canopy[labels == index] = 0
    canopy = fill_small_holes(canopy)
    canopy = refine.remove_open_sky(canopy, crop)

    alpha = np.maximum(canopy, trunk_from_extraction(box, crop.shape[:2]))
    alpha = cv2.GaussianBlur(alpha, (0, 0), FEATHER)
    alpha = refine.remove_occluders(alpha, box, refine.OCCLUDERS[ID], layout)

    rgba = np.dstack([cv2.cvtColor(crop, cv2.COLOR_BGR2RGB), alpha])
    Image.fromarray(rgba).save(OUT, quality=88, alpha_quality=100, method=6)
    print(f"{ID}: {w // SCALE}×{h // SCALE} source px, canopy by colour")


if __name__ == "__main__":
    main()
