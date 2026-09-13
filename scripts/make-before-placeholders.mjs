// Erzeugt Platzhalter-"Vorher"-Bilder aus den bestehenden Projektfotos:
// entsättigt, etwas dunkler und ins Bräunliche gezogen, damit die Fläche wie
// vor der Maßnahme wirkt. Nur bis echte Vorher-Fotos vorliegen.
import sharp from "sharp";

const slugs = ["bluehende-vernetzung-bozen", "lebendige-streuobstwiese", "moorfenster-pustertal"];

for (const slug of slugs) {
  await sharp(`public/projects/${slug}.webp`)
    .modulate({ saturation: 0.35, brightness: 0.88 })
    .tint({ r: 214, g: 196, b: 168 })
    .webp({ quality: 78 })
    .toFile(`public/projects/${slug}-before.webp`);
  console.log(`wrote ${slug}-before.webp`);
}
