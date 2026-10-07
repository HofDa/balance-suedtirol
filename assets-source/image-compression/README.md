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
