# Logos der Gründungsförderer

Originale (vom Auftraggeber geliefert, unverändert):

- `alperia-original.jpg` – 1500 × 500, CMYK, weißer Grund (925 KB)
- `raiffeisen-eisacktal-original.jpg` – 1102 × 413, grüne Logobox (164 KB)

Website-Fassungen in `public/partners/`, jeweils mindestens doppelte Anzeigegröße:

- `alperia.webp` – 360 × 120, verlustfrei, transparent. Das Logo ist einfarbig
  (#006666): Der Alphakanal stammt aus dem Rotkanal des Originals, die Farbe
  bleibt unverändert. ~7 KB.
- `raiffeisen-eisacktal.webp` – 600 × 208, Qualität 88. Die Logobox ist auf
  gleichmäßigen Rand (55 px im Original) um das Zeichen zugeschnitten, damit
  es in der grünen Kachel mittig sitzt; Zeichen und Farbe sind unverändert.
  ~15 KB.

Anzeigegröße steht in `src/data/partners.ts` (`logoSize`).

Die Logos werden mit `unoptimized` eingebunden: Der Bildoptimierer von Next
wandelt Dateien mit Transparenz je nach Browser in JPEG um (Alperia verschwand).
