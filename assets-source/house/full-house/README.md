# Full-house registered cutouts

Source: the user-supplied `ChatGPT Image 21. Sept. 2026, 14_45_54.png`,
1254 × 1254 pixels. Its lossless web copy is
`public/images/house-tour/full-house/house.webp`.

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
registers its alpha to measured source foreground bounds and uses the original
house RGB, rather than generated RGB. Hidden furniture is not introduced into the
scene. The full original remains the resting image; cutouts provide selectable
silhouette outlines at fixed positions.

Rebuild all 18 lossless WebP cutouts:

```sh
node scripts/build-full-house-objects.mjs
```

Final assets: `public/images/house-tour/full-house/objects/`.
The former asset-sheet implementation is archived under
`assets-source/house/superseded-illustrated/` and is no longer served by the app.
