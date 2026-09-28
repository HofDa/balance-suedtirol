# Full-house registered cutouts

Source: the user-supplied `ChatGPT Image 21. Sept. 2026, 14_45_54.png`,
1254 × 1254 pixels, kept here as `house-original.png`.

`house-x4.webp` is its 4× upscale (5016 × 5016), made with
`scripts/upscale-house.py` (Real-ESRGAN x4plus plus a quarter Lanczos for
texture). The original is too small for the room view: a room spans about
290 source pixels but fills roughly 630 CSS pixels, 1260 device pixels on a
retina screen. Every web asset in `public/images/house-tour/full-house/` is cut
from the master.

The authoritative room crops and object rectangles are in
`src/features/house-tour/config/full-house-layout.json`. Coordinates are original
source pixels, never percentages measured against a reconstructed room. Both
the overview and room camera crops use these same coordinates. Highlights never
scale or translate an object.

## Extraction

18 individual extractions were generated using the built-in imagegen tool.
`inputs/` contains the exact crops sent to the tool. `masks/` preserves its full
transparent PNG outputs. Each call used this prompt, substituting the subject,
size and position from the layout manifest:

> Use case: background-extraction. Input is an EXACT pixel crop from a full house
> illustration, not a reference for redrawing. Isolate ONLY [subject]. Replace
> all other pixels with true transparent alpha. Preserve the object at precisely
> the original position, size, perspective and visible silhouette. Never
> reconstruct hidden or occluded parts. Never center, move, resize, rotate,
> stylize, sharpen or redesign the object. Output canvas MUST remain [width] by
> [height] pixels. Preserve empty transparent margins. Keep original object
> colors. Transparent PNG, no checkerboard or colored matte. This cutout will be
> overlaid back onto the full house at original coordinates ([x], [y]), so pixel
> registration is critical.

The tool sometimes changes padding and output resolution. The export script
registers its alpha to measured source foreground bounds and uses the master
RGB, rather than generated RGB. The masks are much larger than their objects;
the script scales them down smoothly and keeps their soft edge instead of
thresholding, so the silhouette does not step at room zoom. Hidden furniture is
not introduced into the scene. The picture itself remains the resting image;
cutouts drive the spotlight (the scene dims, the object stays bright).

## Corrections

A few generated masks needed help. Each fix is limited to the objects listed in
its script and was checked against a contact sheet (master crop with the mask
contour drawn in):

- **Alignment**, every object: the build script slides each mask up to 2 source
  px so its edge meets the picture's edges; the registration windows were
  measured by hand in whole pixels.
- **Drawn outline** (`outlines` in the build script): the raised bed and the
  insect hotel. Their masks covered path and plants or sat to one side and
  missed half the object, so the layout boxes were widened and the alpha is a
  polygon instead.
- **Smoothed silhouette** (`SMOOTH`, `scripts/refine-house-masks.py`): the fruit
  tree. Its mask was lace with a hole between every leaf; it is closed into one
  soft canopy, open sky is removed by colour, the insect hotel in front is cut
  out (`OCCLUDERS`) and the mask runs to the picture edge (`EXTEND_RIGHT`).
- **Hand clip** (`CLIP` in `scripts/refine-house-masks.py`): the bed, whose mask
  included wall right of the headboard.
- **GrabCut** (`GRABCUT`, same script): the kitchen shelves and the driveway.
  On other objects it ate thin parts such as bed legs, so it stays opt-in.

Rebuild the overview, the room crops and all 18 cutouts, then apply the
corrections (needs `pip install opencv-python-headless`):

```sh
node scripts/build-full-house-objects.mjs
python3 scripts/refine-house-masks.py
```

Final assets: `public/images/house-tour/full-house/objects/`.
The former asset-sheet implementation is archived under
`assets-source/house/superseded-illustrated/` and is no longer served by the app.
