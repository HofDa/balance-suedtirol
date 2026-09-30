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

Diese Studio-Renderings gehören zur abgelösten Haustour und bleiben als
Gestaltungsreferenz erhalten. Die zugehörigen Sprites und der alte Generator
wurden entfernt; sie werden nicht mehr ausgeliefert.

Die aktive Haustour verwendet `house/full-house/`. Quellen, Masken und
Rebuild-Anleitung stehen in `house/full-house/README.md`.

## `house/processed/`

27 Zwischenstände derselben Motive, gleiche Abmessungen, etwas größer als die
Rohdateien. **Kein Skript erzeugt sie, und nichts referenziert sie.** Sie sind
per `.gitignore` ausgenommen, weil unklar ist, ob sie noch gebraucht werden.

Zu klären: Wenn sie von Hand freigestellt wurden, sind sie nicht reproduzierbar
und sollten gesichert werden. Sind sie ein Zwischenschritt eines abgelösten
Ablaufs, können sie ersatzlos weg — das spart weitere 23 MB.
