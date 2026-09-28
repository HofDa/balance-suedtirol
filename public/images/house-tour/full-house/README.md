# Full-house scene assets

All files here are generated from the 4× master
`assets-source/house/full-house/house-x4.webp`; do not edit them by hand.

- `house.webp`: the overview, 2508 × 2508 (2× the 1254 px original).
- `rooms/`: one camera crop per room at full master resolution, so the room
  view stays sharp when it fills the panel.
- `objects/`: 18 cutouts with master RGB and a soft alpha edge taken from the
  high-resolution extraction masks. They drive the spotlight highlight.

Source boxes: `src/features/house-tour/config/full-house-layout.json` (pixels of
the 1254 px original). Rebuild: `node scripts/build-full-house-objects.mjs`,
then `python3 scripts/refine-house-masks.py`.
Extraction prompts, masks and the original: `assets-source/house/full-house/README.md`.
