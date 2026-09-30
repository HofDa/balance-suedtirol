"""4× upscale of the house illustration for the house tour.

    python3 scripts/upscale-house.py <RealESRGAN_x4plus.pth> \
        assets-source/house/full-house/house-original.png \
        assets-source/house/full-house/house-x4.webp

Weights (not in the repo, 64 MB, sha256 4fa0d389…682f1):
https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth

Runs Real-ESRGAN x4plus (RRDBNet) on the CPU in overlapping tiles, about
15 minutes for the full picture. The network sharpens edges but smooths fine
texture such as wood grain, so a quarter of a plain Lanczos upscale is mixed
back in. Afterwards rebuild the web assets with
`node scripts/build-full-house-objects.mjs`.
"""
import sys
import time

import numpy as np
import torch
from PIL import Image
from torch import nn
from torch.nn import functional as F


TEXTURE_MIX = 0.25


class ResidualDenseBlock(nn.Module):
    def __init__(self, nf=64, gc=32):
        super().__init__()
        self.conv1 = nn.Conv2d(nf, gc, 3, 1, 1)
        self.conv2 = nn.Conv2d(nf + gc, gc, 3, 1, 1)
        self.conv3 = nn.Conv2d(nf + 2 * gc, gc, 3, 1, 1)
        self.conv4 = nn.Conv2d(nf + 3 * gc, gc, 3, 1, 1)
        self.conv5 = nn.Conv2d(nf + 4 * gc, nf, 3, 1, 1)
        self.lrelu = nn.LeakyReLU(0.2, inplace=True)

    def forward(self, x):
        x1 = self.lrelu(self.conv1(x))
        x2 = self.lrelu(self.conv2(torch.cat((x, x1), 1)))
        x3 = self.lrelu(self.conv3(torch.cat((x, x1, x2), 1)))
        x4 = self.lrelu(self.conv4(torch.cat((x, x1, x2, x3), 1)))
        x5 = self.conv5(torch.cat((x, x1, x2, x3, x4), 1))
        return x5 * 0.2 + x


class RRDB(nn.Module):
    def __init__(self, nf=64, gc=32):
        super().__init__()
        self.rdb1 = ResidualDenseBlock(nf, gc)
        self.rdb2 = ResidualDenseBlock(nf, gc)
        self.rdb3 = ResidualDenseBlock(nf, gc)

    def forward(self, x):
        return self.rdb3(self.rdb2(self.rdb1(x))) * 0.2 + x


class RRDBNet(nn.Module):
    def __init__(self, nf=64, nb=23, gc=32):
        super().__init__()
        self.conv_first = nn.Conv2d(3, nf, 3, 1, 1)
        self.body = nn.Sequential(*[RRDB(nf, gc) for _ in range(nb)])
        self.conv_body = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_up1 = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_up2 = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_hr = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_last = nn.Conv2d(nf, 3, 3, 1, 1)
        self.lrelu = nn.LeakyReLU(0.2, inplace=True)

    def forward(self, x):
        feat = self.conv_first(x)
        feat = feat + self.conv_body(self.body(feat))
        feat = self.lrelu(self.conv_up1(F.interpolate(feat, scale_factor=2, mode="nearest")))
        feat = self.lrelu(self.conv_up2(F.interpolate(feat, scale_factor=2, mode="nearest")))
        return self.conv_last(self.lrelu(self.conv_hr(feat)))


def main():
    weights, source, target = sys.argv[1:4]
    torch.set_num_threads(8)
    model = RRDBNet()
    state = torch.load(weights, map_location="cpu", weights_only=True)
    model.load_state_dict(state.get("params_ema", state.get("params", state)), strict=True)
    model.eval()

    img = np.asarray(Image.open(source).convert("RGB"), dtype=np.float32) / 255.0
    h, w, _ = img.shape
    scale, tile, pad = 4, 192, 16
    out = np.zeros((h * scale, w * scale, 3), dtype=np.float32)
    tensor = torch.from_numpy(img).permute(2, 0, 1).unsqueeze(0)
    tiles = [(y, x) for y in range(0, h, tile) for x in range(0, w, tile)]
    start = time.time()
    with torch.inference_mode():
        for n, (y, x) in enumerate(tiles, 1):
            y0, x0 = max(y - pad, 0), max(x - pad, 0)
            y1, x1 = min(y + tile + pad, h), min(x + tile + pad, w)
            result = model(tensor[:, :, y0:y1, x0:x1]).clamp(0, 1)[0].permute(1, 2, 0).numpy()
            ty1, tx1 = min(y + tile, h), min(x + tile, w)
            oy, ox = (y - y0) * scale, (x - x0) * scale
            out[y * scale:ty1 * scale, x * scale:tx1 * scale] = result[oy:oy + (ty1 - y) * scale, ox:ox + (tx1 - x) * scale]
            print(f"tile {n}/{len(tiles)}  {time.time() - start:.0f}s", flush=True)
    lanczos = np.asarray(Image.open(source).convert("RGB").resize((w * scale, h * scale), Image.LANCZOS), dtype=np.float32) / 255.0
    mixed = out * (1 - TEXTURE_MIX) + lanczos * TEXTURE_MIX
    result = Image.fromarray((mixed * 255).round().clip(0, 255).astype(np.uint8))
    if target.endswith(".webp"):
        result.save(target, "WEBP", quality=95, method=6)
    else:
        result.save(target)
    print("done", target, result.size)


if __name__ == "__main__":
    main()
