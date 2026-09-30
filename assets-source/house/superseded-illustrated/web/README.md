# Calculator illustrations

User-supplied artwork, imported on 2026-09-21. Whole sheets are encoded as WebP
(quality 86); SVG viewBox windows select rooms and objects without modifying the
artwork. Coordinate definitions: `src/features/house-tour/config/illustrations.ts`.

| WebP | Supplied source PNG |
| --- | --- |
| house | ChatGPT Image 21. Sept. 2026, 14_45_54.png |
| rooms | ChatGPT Image 21. Sept. 2026, 14_46_09.png |
| living | ChatGPT Image 21. Sept. 2026, 14_46_21.png |
| bedroom | ChatGPT Image 21. Sept. 2026, 14_46_17.png |
| bath | ChatGPT Image 21. Sept. 2026, 14_46_13.png |
| kitchen | Illustrierte Küchen-Assettafel im Landhausstil.png |

The other supplied living-room sheets repeat these objects. The dark asset
sheet (14_46_04) was omitted to keep the light illustration treatment consistent.
The six delivered files total approximately 911 KiB.

`objects/` contains individual transparent WebP cutouts for clickable room
furniture. Rebuild with `node scripts/build-illustrated-objects.mjs`; imagegen
extraction prompts and masks are in `assets-source/house/illustrated-masks/`.
