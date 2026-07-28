"""Prepare a hero photo for src/config/hero.ts.

Takes a full resolution photo, writes a 2560 px wide WebP into
public/assets/hero/ and prints the matching blurDataURL for src/config/hero.ts.

    python3 scripts/build-hero-image.py <input-photo> [output-name]

The hero is rendered full-bleed via next/image, so 2560 px covers a 2x display
at common desktop widths; Next.js derives the smaller sizes itself.
"""
import base64
import io
import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERO = os.path.join(ROOT, "public", "assets", "hero")
TARGET_WIDTH = 2560
MAX_KB = 520  # keep the repo asset small enough to commit comfortably
BLUR_WIDTH = 20


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2

    source = sys.argv[1]
    name = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(os.path.basename(source))[0]
    out = os.path.join(HERO, f"{name}.webp")

    image = Image.open(source).convert("RGB")
    if image.width > TARGET_WIDTH:
        height = round(TARGET_WIDTH * image.height / image.width)
        image = image.resize((TARGET_WIDTH, height), Image.LANCZOS)

    os.makedirs(HERO, exist_ok=True)
    quality = 82
    for quality in (82, 74, 68, 62):
        image.save(out, "WEBP", quality=quality, method=6)
        size_kb = os.path.getsize(out) // 1024
        if size_kb <= MAX_KB:
            break

    preview = image.resize((BLUR_WIDTH, round(BLUR_WIDTH * image.height / image.width)), Image.LANCZOS)
    buffer = io.BytesIO()
    preview.save(buffer, "WEBP", quality=60)
    blur = base64.b64encode(buffer.getvalue()).decode()

    print(f"{out}  {image.width}x{image.height}  {os.path.getsize(out) // 1024} KB  q{quality}")
    print(f'src: "/assets/hero/{name}.webp",')
    print(f'blurDataURL: "data:image/webp;base64,{blur}",')
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
