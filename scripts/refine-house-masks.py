"""Correct the few house-tour cutout masks that swallow their surroundings.

    python3 scripts/refine-house-masks.py

Runs after `node scripts/build-full-house-objects.mjs` and rewrites the alpha of
selected files in public/images/house-tour/full-house/objects/ in place. Needs
`pip install opencv-python-headless`.

The generated extraction masks are mostly right. Two tools fix the rest, each
only for the objects listed below:

- CLIP: a hand-set outline for patches colour cannot separate (bed).
- GRABCUT: re-decides every pixel from the colours inside and around the
  object, seeded by the existing mask:

- a margin of picture around the object box is certain background, so the
  colour model knows what the surroundings look like;
- the mask's inner core is certain object;
- everything else the mask covers is only probably object.

The result may only remove pixels, never add them, and it is dropped when it
keeps less than MIN_KEPT of the mask: thin parts such as a lamp stand or bike
frame must not be eaten.
"""
import json
import os

import cv2
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LAYOUT = os.path.join(ROOT, "src/features/house-tour/config/full-house-layout.json")
MASTER = os.path.join(ROOT, "assets-source/house/full-house/house-x4.webp")
OBJECTS = os.path.join(ROOT, "public/images/house-tour/full-house/objects")
SCALE = 4
MARGIN = 0.3   # context around the box, as a share of its size
CORE = 0.18    # erosion for the certain-object core, as a share of the shorter side
MIN_KEPT = 0.6
ITERATIONS = 6

# GrabCut only where the contact sheet showed a clear gain. On other objects it
# ate thin parts (bed legs, duvet corner) or frayed edges that match their
# background (tabletop against the cupboards).
GRABCUT = {"kitchen-origin"}

# Where the generated mask swallows a patch of surroundings and colours cannot
# separate it, a hand-set outline clips the mask. Points are fractions of the
# object box, checked against the contact sheet.
CLIP = {
    # Wall to the right of the headboard.
    "bedroom-heating": [(0.0, 0.0), (0.835, 0.0), (0.835, 0.33), (1.0, 0.33), (1.0, 1.0), (0.0, 1.0)],
}

# The fruit tree is built by scripts/build-tree-cutout.py, which reuses
# remove_open_sky() and remove_occluders() from here.

# Objects standing in front of another one are cut out of its mask, so the
# spotlight on the tree does not light up the insect hotel before it.
OCCLUDERS = {
    "garden-plants": ["garden-structures"],
}


def remove_open_sky(alpha: np.ndarray, crop_bgr: np.ndarray) -> np.ndarray:
    """Drop large blue areas that closing folded into a canopy; small gaps between leaves stay."""
    b, g, r = [crop_bgr[..., i].astype(np.int16) for i in range(3)]
    sky = ((b > r + 25) & (b > g + 5)).astype(np.uint8)
    sky = cv2.morphologyEx(sky, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (41, 41)))
    sky = cv2.GaussianBlur(sky.astype(np.float32), (0, 0), 4.0)
    return (alpha.astype(np.float32) * (1 - sky)).round().clip(0, 255).astype(np.uint8)


def remove_occluders(alpha: np.ndarray, box, occluders, layout) -> np.ndarray:
    x, y = box[0] * SCALE, box[1] * SCALE
    result = alpha.astype(np.float32)
    for other_id in occluders:
        other = next(o for o in layout["objects"] if o["id"] == other_id)
        other_alpha = np.asarray(Image.open(os.path.join(OBJECTS, f"{other_id}.webp")).getchannel("A"), np.float32)
        ox, oy = other["box"][0] * SCALE - x, other["box"][1] * SCALE - y
        # Paste the occluder's alpha into this object's frame, clipped to the overlap.
        h, w = result.shape
        oh, ow = other_alpha.shape
        x0, y0, x1, y1 = max(ox, 0), max(oy, 0), min(ox + ow, w), min(oy + oh, h)
        if x0 < x1 and y0 < y1:
            patch = other_alpha[y0 - oy:y1 - oy, x0 - ox:x1 - ox]
            result[y0:y1, x0:x1] *= 1 - patch / 255
    return result.round().clip(0, 255).astype(np.uint8)


def refine(master: np.ndarray, box, alpha: np.ndarray) -> tuple[np.ndarray, float]:
    x, y, w, h = [v * SCALE for v in box]
    mx, my = int(w * MARGIN), int(h * MARGIN)
    x0, y0 = max(x - mx, 0), max(y - my, 0)
    x1, y1 = min(x + w + mx, master.shape[1]), min(y + h + my, master.shape[0])
    region = np.ascontiguousarray(master[y0:y1, x0:x1])

    inside = np.zeros(region.shape[:2], np.uint8)
    inside[y - y0:y - y0 + h, x - x0:x - x0 + w] = (alpha > 128).astype(np.uint8)

    seed = np.full(region.shape[:2], cv2.GC_BGD, np.uint8)
    ring = cv2.dilate(inside, np.ones((9, 9), np.uint8))
    seed[ring > 0] = cv2.GC_PR_BGD
    seed[inside > 0] = cv2.GC_PR_FGD
    k = max(3, int(min(w, h) * CORE)) | 1
    core = cv2.erode(inside, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k)))
    seed[core > 0] = cv2.GC_FGD

    bgd, fgd = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
    cv2.grabCut(region, seed, None, bgd, fgd, ITERATIONS, cv2.GC_INIT_WITH_MASK)
    kept = np.isin(seed, (cv2.GC_FGD, cv2.GC_PR_FGD)).astype(np.uint8)
    # Close pinholes, then drop specks that are not connected to the object.
    kept = cv2.morphologyEx(kept, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    kept = kept[y - y0:y - y0 + h, x - x0:x - x0 + w]

    share = kept.sum() / max((alpha > 128).sum(), 1)
    # Only subtract: soft original alpha where GrabCut keeps the pixel, feathered cut elsewhere.
    cut = cv2.GaussianBlur(kept.astype(np.float32), (0, 0), 1.2)
    return (alpha.astype(np.float32) * np.minimum(cut, 1.0)).round().astype(np.uint8), share


def main():
    layout = json.load(open(LAYOUT))
    master = np.asarray(Image.open(MASTER).convert("RGB"))
    master = cv2.cvtColor(master, cv2.COLOR_RGB2BGR)
    for item in layout["objects"]:
        if item["id"] == "garden-plants":
            continue  # built by scripts/build-tree-cutout.py
        path = os.path.join(OBJECTS, f"{item['id']}.webp")
        cutout = Image.open(path).convert("RGBA")
        alpha = np.asarray(cutout.getchannel("A"))
        if item["id"] in CLIP:
            h, w = alpha.shape
            outline = np.zeros_like(alpha)
            points = np.array([(fx * (w - 1), fy * (h - 1)) for fx, fy in CLIP[item["id"]]], np.int32)
            cv2.fillPoly(outline, [points], 255)
            outline = cv2.GaussianBlur(outline, (0, 0), 1.2)
            alpha = (alpha.astype(np.float32) * outline / 255).round().astype(np.uint8)
        if item["id"] not in GRABCUT:
            if item["id"] in CLIP:
                cutout.putalpha(Image.fromarray(alpha))
                cutout.save(path, "WEBP", quality=88, alpha_quality=100)
                print(f"{item['id']}: clipped by hand outline")
            continue
        refined, share = refine(master, item["box"], alpha)
        if share < MIN_KEPT:
            print(f"{item['id']}: kept {share:.0%} – below {MIN_KEPT:.0%}, mask left as generated")
            continue
        cutout.putalpha(Image.fromarray(refined))
        cutout.save(path, "WEBP", quality=88, alpha_quality=100)
        print(f"{item['id']}: kept {share:.0%}")


if __name__ == "__main__":
    main()
