# Website-Bildkomprimierung

Der Bericht vom 7. Oktober 2026 dokumentiert Dateigröße vor und nach der
Komprimierung sowie die übernommenen Dateien (`accepted: true`).

- Fotos: WebP, Qualität 65, Aufwand 6; Breite maximal 1600 px,
  Startseitenmotiv maximal 1920 px, keine neuen Ausschnitte.
- Haustour und beschriftete Skizze: WebP, Qualität 80, Aufwand 6,
  Alpha-Qualität 100, unveränderte Abmessungen.
- PNGs: verlustfreie Komprimierung, keine Palettenreduktion.
- Übernommen wurden nur Fassungen mit mindestens 10 % Ersparnis.
- Das bereits optimierte Kiens-Bild blieb unverändert.

Die PNG-Pixel und Alpha-Kanäle wurden auf identische Werte geprüft.
Die Vorher/Nachher-Bilder behielten ihre Abmessungen und Ausrichtung.
Stichproben der Startseite, Haustour, Millander-Au-Vision und Skizze wurden
visuell geprüft. Originaldateien sind weiterhin über die bisherigen Quellen
und die Git-Historie verfügbar; lokale Sicherungen dieser Bearbeitung liegen
unter `/tmp/balance-compression/originals/`.

## Verkleinerte Projektbilder (8. Oktober 2026)

GitHub Pages liefert Bilder ohne Next-Optimierer in voller Größe aus. Karten,
Galerie-Vorschaubilder, das Haustour-Ergebnis und die Kachel „Erfolge“ nehmen
deshalb eigene kleine Fassungen: `name-sm.webp` (800 px, Qualität 62) und
`name-xs.webp` (240 px, Qualität 60), erzeugt mit
`scripts/build-project-thumbnails.py`, ausgewählt über
`src/lib/image-variants.ts`. Nach neuen Projektbildern das Skript erneut
ausführen.
