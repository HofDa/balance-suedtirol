import sharp from 'sharp';
import { readFile, mkdir, access } from 'node:fs/promises';

// All layout coordinates are pixels in the 1254 px original. The master is the
// 4× upscale (scripts/upscale-house.py); every web asset is cut from it so the
// overview, the room crops and the object cutouts share the same pixels.
const layout = JSON.parse(await readFile('src/features/house-tour/config/full-house-layout.json', 'utf8'));
const master = 'assets-source/house/full-house/house-x4.webp';
const out = 'public/images/house-tour/full-house';
const SCALE = 4;
await mkdir(`${out}/objects`, { recursive: true });
await mkdir(`${out}/rooms`, { recursive: true });

const meta = await sharp(master).metadata();
if (meta.width !== layout.size[0] * SCALE) throw new Error(`Master must be ${layout.size[0] * SCALE} px wide, got ${meta.width}`);
const scaled = (box) => box.map((value) => value * SCALE);

// Overview: half the master, i.e. 2× the original.
await sharp(master).resize(layout.size[0] * 2).webp({ quality: 88 }).toFile(`${out}/house.webp`);

// Rooms: the camera crop at full master resolution, so zooming in stays sharp.
for (const [room, box] of Object.entries(layout.rooms)) {
  const [left, top, width, height] = scaled(box);
  await sharp(master).extract({ left, top, width, height }).webp({ quality: 86 }).toFile(`${out}/rooms/${room}.webp`);
}

// Registration windows in the original object crop. Generative extraction may
// add transparent padding or upscale its output; that must never reposition art.
const registration = {
 'bedroom-heating':[1,3,180,95], 'bedroom-textiles':[11,7,47,175], 'bedroom-standby':[1,3,39,106],
 'bath-shower':[1,7,110,214], 'bath-water-heating':[4,3,86,55], 'bath-toilet':[2,1,35,58],
 'living-tv-streaming':[2,3,36,131], 'living-lighting':[2,3,35,89], 'living-plants':[2,2,107,118],
 'kitchen-diet':[1,4,52,170], 'kitchen-origin':[0,1,96,75], 'kitchen-waste':[1,0,185,103],
 'mobility-short':[1,2,53,96], 'mobility-km':[1,1,163,122], 'mobility-long':[0,0,274,145]
};

// Built from colour by scripts/build-tree-cutout.py: the generated tree mask
// stopped at the top of its box and cut the canopy off.
const builtElsewhere = new Set(['garden-plants']);

// Objects whose generated mask is unusable get a drawn outline instead, in
// absolute source pixels. The raised bed's mask covered path and plants and
// stopped short of its right half, which runs on behind the insect-hotel post.
// The insect hotel's mask sat to the left and missed the side wall and half the post.
const outlines = {
 'garden-ground': [[1061,727],[1160,739],[1160,790],[1090,810],[1063,790]],
 'garden-structures': [
  [1147,584],[1177,583],[1195,611],[1191,618],[1191,678],[1174,683],[1171,683],[1171,765],
  [1160,765],[1160,683],[1126,682],[1126,620],[1117,618]
 ]
};

async function outlineAlpha(points, [left, top], width, height) {
 const path = points.map(([px, py]) => `${(px - left) * SCALE},${(py - top) * SCALE}`).join(' ');
 const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="black"/><polygon points="${path}" fill="white"/></svg>`;
 return sharp(Buffer.from(svg)).blur(0.6).greyscale().extractChannel(0).raw().toBuffer();
}

// Gradient magnitude of a single-channel raw buffer (central differences).
function edges(data, width, height) {
 const out = new Float32Array(width * height);
 for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
  const i = y * width + x;
  out[i] = Math.hypot(data[i + 1] - data[i - 1], data[i + width] - data[i - width]);
 }
 return out;
}

// The registration windows were measured by hand in whole source pixels, so a
// mask can sit a pixel off. Slide its edge over the picture's edges and keep
// the offset where they coincide best.
const MAX_SHIFT = 2 * SCALE;
function bestOffset(maskEdges, imageEdges, width, height) {
 let best = { dx: 0, dy: 0, score: -Infinity };
 for (let dy = -MAX_SHIFT; dy <= MAX_SHIFT; dy++) for (let dx = -MAX_SHIFT; dx <= MAX_SHIFT; dx++) {
  let score = 0;
  for (let y = MAX_SHIFT; y < height - MAX_SHIFT; y += 2) for (let x = MAX_SHIFT; x < width - MAX_SHIFT; x += 2) {
   const m = maskEdges[y * width + x];
   if (m) score += m * imageEdges[(y + dy) * width + x + dx];
  }
  if (score > best.score) best = { dx, dy, score };
 }
 return best;
}

let count = 0;
for (const item of layout.objects) {
 if (builtElsewhere.has(item.id)) continue;
 if (outlines[item.id]) {
  const [left, top, width, height] = scaled(item.box);
  const alpha = await outlineAlpha(outlines[item.id], item.box, width, height);
  const rgb = await sharp(master).extract({ left, top, width, height }).raw().toBuffer();
  await sharp(rgb, { raw: { width, height, channels: 3 } }).joinChannel(alpha, { raw: { width, height, channels: 1 } })
   .webp({ quality: 88, alphaQuality: 100 }).toFile(`${out}/objects/${item.id}.webp`);
  console.log(`${item.id}: drawn outline`);
  count++;
  continue;
 }
 const maskPath = `assets-source/house/full-house/masks/${item.id}.png`;
 try { await access(maskPath); } catch { if (process.argv.includes('--partial')) continue; throw new Error(`Missing extraction: ${item.id}`); }
 const [left, top, width, height] = scaled(item.box);
 const { data, info } = await sharp(maskPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
 let minX = info.width, minY = info.height, maxX = -1, maxY = -1;
 for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  if (data[(y * info.width + x) * 4 + 3] > 160) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); }
 }
 if (maxX < 0) throw new Error(`Empty alpha for ${item.id}`);
 const [x, y, w, h] = scaled(registration[item.id]);
 // The generated alpha is far larger than the object; scale it down with a
 // smooth filter and keep its soft edge. A hard threshold here is what made
 // the old outline step visibly at room zoom.
 const mask = await sharp(maskPath).extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
  .extractChannel(3).resize(w, h, { fit: 'fill', kernel: 'lanczos3' }).blur(0.6).png().toBuffer();
 // Place the mask on a padded canvas so a shift may cross the crop edge, then cut back.
 const placeMask = async (dx, dy) => {
  const padded = await sharp({ create: { width: width + 2 * MAX_SHIFT, height: height + 2 * MAX_SHIFT, channels: 3, background: { r: 0, g: 0, b: 0 } } })
   .composite([{ input: mask, left: x + dx + MAX_SHIFT, top: y + dy + MAX_SHIFT }]).png().toBuffer();
  return sharp(padded).extract({ left: MAX_SHIFT, top: MAX_SHIFT, width, height }).greyscale().raw().toBuffer();
 };
 const rgb = await sharp(master).extract({ left, top, width, height }).raw().toBuffer();
 const grey = await sharp(master).extract({ left, top, width, height }).greyscale().raw().toBuffer();
 const { dx, dy } = bestOffset(edges(await placeMask(0, 0), width, height), edges(grey, width, height), width, height);
 if (dx || dy) console.log(`${item.id}: mask shifted by ${dx / SCALE}, ${dy / SCALE} source px`);
 const alpha = await placeMask(dx, dy);
 await sharp(rgb, { raw: { width, height, channels: 3 } }).joinChannel(alpha, { raw: { width, height, channels: 1 } })
  .webp({ quality: 88, alphaQuality: 100 }).toFile(`${out}/objects/${item.id}.webp`);
 count++;
}
console.log(`Built overview, ${Object.keys(layout.rooms).length} rooms and ${count} cutouts from the 4× master.`);
