import sharp from 'sharp';
import { readFile, mkdir, access } from 'node:fs/promises';
const layout = JSON.parse(await readFile('src/features/house-tour/config/full-house-layout.json', 'utf8'));
const source = 'public/images/house-tour/full-house/house.webp';
const out = 'public/images/house-tour/full-house/objects';
await mkdir(out, { recursive: true });
// Registration windows in the original object crop. Generative extraction may
// add transparent padding or upscale its output; that must never reposition art.
const registration = {
 'bedroom-heating':[1,3,180,95], 'bedroom-textiles':[11,7,47,175], 'bedroom-standby':[1,3,39,106],
 'bath-shower':[1,7,110,214], 'bath-water-heating':[4,3,86,55], 'bath-toilet':[2,1,35,58],
 'living-tv-streaming':[2,3,36,131], 'living-lighting':[2,3,35,89], 'living-plants':[2,2,107,118],
 'kitchen-diet':[1,4,52,170], 'kitchen-origin':[0,1,96,75], 'kitchen-waste':[1,0,185,103],
 'mobility-short':[1,2,53,96], 'mobility-km':[1,1,163,122], 'mobility-long':[0,0,274,145],
 'garden-ground':[1,1,86,99], 'garden-plants':[0,0,286,398], 'garden-structures':[1,1,61,171]
};
let count = 0;
for (const item of layout.objects) {
 const maskPath = `assets-source/house/full-house/masks/${item.id}.png`;
 try { await access(maskPath); } catch { if (process.argv.includes('--partial')) continue; throw new Error(`Missing extraction: ${item.id}`); }
 const [left,top,width,height] = item.box;
 const {data, info} = await sharp(maskPath).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let minX=info.width,minY=info.height,maxX=-1,maxY=-1;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){
  if(data[(y*info.width+x)*4+3]>160){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
 }
 if(maxX<0)throw new Error(`Empty alpha for ${item.id}`);
 const [x,y,w,h]=registration[item.id];
 // Normalize only the generated alpha to the measured source footprint.
 const mask=await sharp(maskPath).extract({left:minX,top:minY,width:maxX-minX+1,height:maxY-minY+1})
  .resize(w,h,{fit:'fill'}).extractChannel(3).threshold(128).png().toBuffer();
 const alpha=await sharp({create:{width,height,channels:3,background:{r:0,g:0,b:0}}})
  .composite([{input:mask,left:x,top:y}]).greyscale().raw().toBuffer();
 const rgb=await sharp(source).extract({left,top,width,height}).raw().toBuffer();
 await sharp(rgb,{raw:{width,height,channels:3}}).joinChannel(alpha,{raw:{width,height,channels:1}})
  .webp({lossless:true,alphaQuality:100}).toFile(`${out}/${item.id}.webp`);
 count++;
}
console.log(`Built ${count} cutouts with original house pixels and fixed source bounds.`);
