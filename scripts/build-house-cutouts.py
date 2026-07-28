"""Cut the product shots out of their white studio background.

The originals are opaque RGB renders on a near-white sweep. Thresholding alone
would eat the white objects (bathtub, sink, toilet, fridge), so the background
is found by propagating inward from the border through near-white pixels only.
Input:  studio renderings in assets-source/house/ — outside public/, so the
        ~50 MB of source material is never served or deployed.
Output: tight-trimmed RGBA sprites in public/assets/house/cutout/.
"""
import json
import os

import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOUSE = os.path.join(ROOT, "assets-source", "house")
OUT = os.path.join(ROOT, "public", "assets", "house", "cutout")
NEAR_WHITE = 228  # min channel value counted as background sweep
# The canvas is at most 560 CSS px wide and the widest sprite covers ~28% of it,
# so ~320 px is enough even on a 2x display. 512 px leaves some headroom without
# shipping the full 1300 px studio renders to the browser.
MAX_EDGE = 512
QUALITY = 82

# Only the sprites referenced by config/house-overlays.ts. The roof PV panels and
# the rain barrel are already painted into houseempty.png, so pvroof/raincollector
# are deliberately not built.
KEEP = [
    "bed.png", "bike.png", "biglamp.png", "car.png", "carpet.png", "chairsanddesk.png",
    "closet.png", "couch.png", "cupboard.png", "cupboard2.png", "cupboard_tv.png",
    "fridge.png", "globe.png", "kitchenwall.png", "lamp.png",
    "picture.png", "plant.png", "showerbath.png", "sink.png", "suitcase.png",
    "toilet.png", "tv.png",
]


def background_mask(rgb):
    """Border-connected near-white region."""
    light = (rgb.min(axis=2) >= NEAR_WHITE)
    reach = np.zeros_like(light)
    reach[0] |= light[0]
    reach[-1] |= light[-1]
    reach[:, 0] |= light[:, 0]
    reach[:, -1] |= light[:, -1]

    while True:
        grown = reach.copy()
        grown[1:] |= reach[:-1]
        grown[:-1] |= reach[1:]
        grown[:, 1:] |= reach[:, :-1]
        grown[:, :-1] |= reach[:, 1:]
        grown &= light
        if grown.sum() == reach.sum():
            return reach
        reach = grown


def main():
    os.makedirs(OUT, exist_ok=True)
    meta = {}
    for fname in KEEP:
        src = Image.open(os.path.join(HOUSE, fname)).convert("RGB")
        rgb = np.asarray(src, dtype=np.uint8)
        bg = background_mask(rgb)

        alpha = np.where(bg, 0, 255).astype(np.uint8)
        a_img = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.6))
        out = Image.merge("RGBA", (*src.split(), a_img))

        box = out.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
        if box:
            out = out.crop(box)

        if max(out.size) > MAX_EDGE:
            scale = MAX_EDGE / max(out.size)
            out = out.resize((max(1, round(out.width * scale)), max(1, round(out.height * scale))), Image.LANCZOS)

        target = os.path.splitext(fname)[0] + ".webp"
        out.save(os.path.join(OUT, target), quality=QUALITY, method=6)

        w, h = out.size
        meta[target] = {"w": w, "h": h, "aspect": round(w / h, 4),
                       "opaque_pct": round(float((np.asarray(out)[:, :, 3] > 128).mean()) * 100, 1)}
        print(f"{target:26} {w:5}x{h:<5} aspect={w / h:6.3f} opaque={meta[target]['opaque_pct']:5.1f}%")

    with open(os.path.join(os.path.dirname(__file__), "cutout_meta.json"), "w") as fh:
        json.dump(meta, fh, indent=2)


if __name__ == "__main__":
    main()
