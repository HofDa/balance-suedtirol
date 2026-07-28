# Quellmaterial

Hier liegt Ausgangsmaterial, das **nicht ausgeliefert wird**. Alles unter
`public/` ist in Next.js öffentlich abrufbar und Teil jedes Deploys — deshalb
gehören Rohdateien nicht dorthin.

Vorher lagen diese Dateien in `public/assets/house/`. Das waren 51 MB, die keine
Seite referenziert hat, die aber unter einer öffentlichen URL erreichbar waren
und bei jedem Deploy mitgingen. `public/` ist dadurch von 55 MB auf rund 4 MB
geschrumpft.

## `house/`

27 Studio-Renderings der Einrichtungsgegenstände als PNG, dazu `houseempty.png`,
`housefull1.png`, `housefull2.png` und `asset_positions.json`.

Aus diesen Dateien erzeugt `scripts/build-house-cutouts.py` die freigestellten
Sprites in `public/assets/house/cutout/` (22 WebP, zusammen ~376 KB):

```bash
python3 scripts/build-house-cutouts.py
```

Das Skript liest ausschließlich aus diesem Verzeichnis und schreibt
ausschließlich nach `public/`. Die Renderings sind deckende RGB-Bilder auf
nahezu weißem Grund und dürfen nicht direkt über das Haus gelegt werden.

`houseempty.png` ist die Vorlage für `public/assets/house/houseempty.webp`
(1,74 MB → 86 KB). Bei Änderungen neu erzeugen:

```python
from PIL import Image
Image.open("assets-source/house/houseempty.png").save(
    "public/assets/house/houseempty.webp", quality=90, method=6)
```

`housefull1.png` und `housefull2.png` werden von nichts referenziert. Sie liegen
als Gestaltungsreferenz bei.

## `house/processed/`

27 Zwischenstände derselben Motive, gleiche Abmessungen, etwas größer als die
Rohdateien. **Kein Skript erzeugt sie, und nichts referenziert sie.** Sie sind
per `.gitignore` ausgenommen, weil unklar ist, ob sie noch gebraucht werden.

Zu klären: Wenn sie von Hand freigestellt wurden, sind sie nicht reproduzierbar
und sollten gesichert werden. Sind sie ein Zwischenschritt eines abgelösten
Ablaufs, können sie ersatzlos weg — das spart weitere 23 MB.
