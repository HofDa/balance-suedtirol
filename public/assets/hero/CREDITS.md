# Hero-Bilder

## seiser-alm-placeholder.webp

Platzhalter, bis die Bilder der Fotografen vorliegen.

- Motiv: Almwiese auf der Seiser Alm mit Langkofel und Plattkofel, Südtirol
- Fotograf: mendhak
- Lizenz: CC BY-SA 2.0
- Quelle: https://commons.wikimedia.org/wiki/File:Alpe_Di_Siusi_open_meadow_area.jpg
- Original: 5966 x 3356 px, hier auf 2560 px Breite als WebP verkleinert

CC BY-SA 2.0 verlangt Namensnennung und Lizenzangabe. Beides steht im Bild-Credit
unten rechts im Hero und ist auf die Dateiseite verlinkt.

Bei Bildern von Fotografen ist vorab schriftlich zu klären: Nutzungsumfang,
Laufzeit, Bearbeitung (Zuschnitt und Abdunkelung für die Textlesbarkeit) und die
gewünschte Schreibweise der Namensnennung.

## Neues Hero-Bild einsetzen

```bash
python3 scripts/build-hero-image.py ~/pfad/zum/foto.jpg name-des-motivs
```

Das Skript schreibt die WebP-Datei hierher und gibt `src` sowie `blurDataURL`
für `src/config/hero.ts` aus. Dort zusätzlich `alt`, `photographer`, `location`,
`license` und `sourceUrl` anpassen und `isPlaceholder` auf `false` setzen.
