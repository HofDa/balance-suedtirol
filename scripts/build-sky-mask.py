"""Build the sky mask for the drifting clouds on the house overview.

The clouds must pass behind the roof, the trees and the mountains, so they are
masked to the open sky of the painting. Colour alone is not enough (solar
panels, a bathroom mirror and shaded snow are blue too), so the mask is the
intersection of a hand-drawn polygon above the ridge line and the sky-blue
pixels inside it. Painted clouds are not sky-blue and stay unmasked: the
drifting haze passes behind them.

Input:  public/images/house-tour/full-house/house.webp
Output: public/images/house-tour/full-house/sky-mask.png (white, alpha = sky),
        at half the 1254 px layout resolution; CSS stretches it over the scene.
"""
import colorsys
import os

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOLDER = os.path.join(ROOT, "public", "images", "house-tour", "full-house")
LAYOUT = 1254
SIZE = 627

# Open sky above the ridge line and around the roof, in layout pixels.
SKY_POLYGON = [
    (0, 0), (1254, 0), (1254, 218), (1180, 224), (1130, 208), (1100, 199),
    (1050, 224), (1000, 239), (948, 258), (942, 232), (903, 121), (357, 121),
    (314, 232), (314, 296), (250, 314), (200, 321), (150, 314), (110, 298),
    (60, 318), (0, 318),
]


def is_sky(rgb):
    r, g, b = (c / 255 for c in rgb)
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    return 0.5 < h < 0.68 and s > 0.1 and v > 0.55 and b > r + 0.06


def main():
    scale = SIZE / LAYOUT
    image = Image.open(os.path.join(FOLDER, "house.webp")).convert("RGB")
    small = image.resize((SIZE, SIZE), Image.LANCZOS)
    pixels = small.load()

    region = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(region).polygon([(x * scale, y * scale) for x, y in SKY_POLYGON], fill=255)

    blue = Image.new("L", (SIZE, SIZE), 0)
    blue_pixels = blue.load()
    for y in range(int(SIZE * 0.3)):
        for x in range(SIZE):
            if is_sky(pixels[x, y]):
                blue_pixels[x, y] = 255

    alpha = ImageChops.multiply(region, blue)
    # Close pinholes, pull the edge a pixel away from roof and leaves, soften.
    alpha = alpha.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(5))
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.2))

    mask = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 0))
    mask.putalpha(alpha)
    mask.save(os.path.join(FOLDER, "sky-mask.png"), optimize=True)


if __name__ == "__main__":
    main()
