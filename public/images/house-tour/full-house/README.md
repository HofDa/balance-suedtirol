# Full-house scene assets

All files here are generated from the 4× master
`assets-source/house/full-house/house-x4.webp`; do not edit them by hand.

- `house.webp`: the overview, 2508 × 2508 (2× the 1254 px original).
- `rooms/`: one camera crop per room at full master resolution, so the room
  view stays sharp when it fills the panel.
- `objects/`: 18 cutouts with master RGB and a soft alpha edge taken from the
  high-resolution extraction masks. They drive the spotlight highlight.

- `sky-mask.png`: open sky of `house.webp` (alpha), so the drifting clouds on
  the overview pass behind roof, trees and mountains. Rebuild:
  `python3 scripts/build-sky-mask.py`.

Source boxes: `src/features/house-tour/config/full-house-layout.json` (pixels of
the 1254 px original). Rebuild: `node scripts/build-full-house-objects.mjs`,
then `python3 scripts/refine-house-masks.py`, then the two shape-built cutouts
`python3 scripts/build-tree-cutout.py` and `python3 scripts/build-globe-cutout.py`.
Extraction prompts, masks and the original: `assets-source/house/full-house/README.md`.

## Delivery compression (7 October 2026)

After generation, WebP delivery files were re-encoded with quality 80,
alphaQuality 100 and effort 6 where this saved at least 10%. Dimensions and
all alpha-channel pixels were verified unchanged, so layout coordinates,
cutouts and the sky mask retain their alignment. PNGs use lossless compression
only. Regeneration restores the generator's encoding settings; this delivery
compression can then be applied again to the newly generated files.
Per-file settings and sizes: `assets-source/image-compression/report-2026-10-07.json`.
