# Illustrated object isolation

Generated with the built-in imagegen tool using the supplied asset sheets on
2026-09-21. These PNGs preserve the generated transparency and sheet coordinates.
They are source material, not served to browsers.

Prompt used for each sheet:

> Use case: background-extraction. Remove ONLY the cream paper background
> outside the objects and replace it with genuine transparent alpha. Keep every
> object at its original coordinates and size on the same-size canvas; preserve
> sheet layout, colors, line art, materials, and original aspect ratio. Keep
> room shells and their interior wall/floor pixels intact; remove only background
> BETWEEN assets. Preserve light-colored object interiors. No additional objects,
> no redesign, no text, no baked-in checkerboard. Output transparent PNG for
> compositing individual objects in an interactive web room.

`node scripts/build-illustrated-objects.mjs` extracts separate WebP objects. It
uses the generated alpha with the supplied artwork's RGB to preserve the original
colors, including at edges. The car reuses the existing transparent project asset.
Scene positions and question mappings live in `config/illustrations.ts` under
`src/features/house-tour`. Interactive objects have hover, keyboard-focus and
selected outlines; the question panel and outline share the same question index.
