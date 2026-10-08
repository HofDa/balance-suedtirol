/**
 * Kleinere Fassung eines Projektbilds aus /public/projects. GitHub Pages
 * liefert Bilder ohne Optimierer in voller Größe aus; Karten und
 * Vorschaubilder nehmen deshalb vorab verkleinerte Dateien
 * (scripts/build-project-thumbnails.py): `sm` 800 px, `xs` 240 px breit.
 * Andere Pfade (etwa der SVG-Platzhalter) bleiben unverändert.
 */
export function projectImageVariant(src: string, variant: "sm" | "xs") {
  return /^\/projects\/[^/]+\.webp$/.test(src) ? src.replace(/\.webp$/, `-${variant}.webp`) : src;
}
