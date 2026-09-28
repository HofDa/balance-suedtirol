import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
const out = 'public/images/house-tour/illustrated/objects';
await mkdir(out, { recursive: true });
// The generated alpha isolates each object. Keep the supplied RGB artwork,
// avoiding color changes made by background extraction at the edges.
const crops = {
 bedroom: {
  'bedroom-heating':[668,219,544,330], 'bedroom-textiles':[1006,564,223,373], 'bedroom-standby':[274,662,123,221],
  'bedroom-art':[453,656,144,208], 'bedroom-nightstand':[45,695,185,195]
 },
 bath: {
  'bath-shower':[878,82,111,433], 'bath-water-heating':[1146,301,275,180], 'bath-toilet':[656,568,137,162],
  'bath-tub':[579,307,284,207], 'bath-mirror':[1154,118,257,173]
 },
 living: {
  'living-tv-streaming':[970,655,252,307], 'living-lighting':[451,587,125,365], 'living-plants':[1073,970,144,187],
  'living-sofa':[28,690,421,261], 'mobility-long':[840,235,207,193], 'mobility-km':[1067,232,145,192]
 },
 kitchen: {
  'kitchen-diet':[1055,104,172,496], 'kitchen-origin':[700,392,335,205], 'kitchen-waste':[25,953,384,226],
  'kitchen-cabinets':[26,702,486,218]
 },
 rooms: {
  'garden-ground':[874,313,335,110], 'garden-plants':[891,20,287,279], 'garden-structures':[1353,91,79,208]
 }
};
for (const [sheet, items] of Object.entries(crops)) {
 const maskPath = `assets-source/house/illustrated-masks/${sheet}.png`;
 for (const [name, [left,top,width,height]] of Object.entries(items)) {
  const region = {left,top,width,height};
  const alpha = await sharp(maskPath).extract(region).extractChannel(3).raw().toBuffer();
  await sharp(`public/images/house-tour/illustrated/${sheet}.webp`).extract(region)
   .joinChannel(alpha, { raw: { width, height, channels: 1 } }).webp({quality:90,alphaQuality:100}).toFile(`${out}/${name}.webp`);
 }
}
await copyFile('public/assets/house/cutout/car.webp', `${out}/mobility-short.webp`);
console.log('Exported 24 transparent scene objects.');
