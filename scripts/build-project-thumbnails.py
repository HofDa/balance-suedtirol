"""Verkleinerte Fassungen der Projektbilder für Karten und Vorschaubilder.

GitHub Pages liefert Bilder ohne Next-Bildoptimierer aus (`unoptimized`), also
immer in voller Größe. Karten (rund 400 px breit) und Vorschaubilder (unter
100 px) bekommen deshalb eigene, kleine Dateien neben dem Original:

  name.webp -> name-sm.webp (800 px breit) und name-xs.webp (240 px breit)

Welche Datei die Seite nimmt, entscheidet `projectImageVariant` in
`src/lib/image-variants.ts`. Nach neuen oder geänderten Projektbildern erneut
ausführen:

  python3 scripts/build-project-thumbnails.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "public" / "projects"
VARIANTS = {"sm": (800, 62), "xs": (240, 60)}

for src in sorted(ROOT.glob("*.webp")):
    if src.stem.endswith(("-sm", "-xs")):
        continue
    with Image.open(src) as im:
        im = im.convert("RGB")
        for suffix, (width, quality) in VARIANTS.items():
            out = src.with_name(f"{src.stem}-{suffix}.webp")
            w = min(width, im.width)
            h = round(im.height * w / im.width)
            im.resize((w, h), Image.LANCZOS).save(out, quality=quality, method=6)
            print(f"{out.name}: {src.stat().st_size // 1024} KB -> {out.stat().st_size // 1024} KB")
