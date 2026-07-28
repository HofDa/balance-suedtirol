# b*alance – Biodiversitätsplattform Südtirol

Ein lauffähiges Next.js-Grundgerüst für eine hochwertige Plattform, die persönliche Biodiversitätswirkung verständlich macht und lokale Projekte sichtbar sowie finanzierbar macht.

## Enthalten

- Next.js 15 App Router, React 19 und TypeScript
- Tailwind CSS 4 und vorbereitete shadcn/ui-Konfiguration
- responsive Landingpage
- klickbarer Prototyp der interaktiven Haustour
- ausgelagerte Haustour- und Score-Logik
- Projektübersicht und dynamische Projektdetailseiten
- strukturelle Projekt-Einreichungsseite
- Methodikseite
- Routenstruktur für Deutsch, Italienisch und Englisch
- vorbereitetes Prisma-Schema für PostgreSQL, ohne Prisma in der Standardinstallation
- lokale Beispielgrafiken ohne externe Bild-Hosts
- Health-Route unter `/api/health`
- keine PWA-, Service-Worker- oder Offline-Logik

## Voraussetzungen

- Node.js 20.18 oder neuer
- npm 10 oder neuer empfohlen

## Installation

```bash
cp .env.example .env
npm ci
npm run dev
```

Öffne anschließend `http://localhost:3000`.

Falls du bewusst Abhängigkeiten aktualisieren möchtest, nutze `npm install`. Für eine reproduzierbare Erstinstallation ist `npm ci` vorgesehen.

## Qualitätsprüfungen

```bash
npm audit
npm run typecheck
npm run lint
npm run build
```

Oder gesammelt:

```bash
npm run check
```

## Hero-Bild

Der Hero auf der Startseite zeigt ein vollflächiges Foto mit einem belegten Zitat von Eurac Research oben links und dem Bild-Credit unten rechts. Bild, Zitat und Kennzahlen stehen in `src/config/hero.ts`, die Datei liegt in `public/assets/hero/`.

Aktuell ist ein frei lizenziertes Platzhalterfoto der Seiser Alm eingesetzt. Austausch gegen ein Foto von Fotografen:

```bash
python3 scripts/build-hero-image.py ~/pfad/zum/foto.jpg name-des-motivs
```

Details und Lizenzhinweise stehen in `public/assets/hero/CREDITS.md`.

## Haus-Grafiken

Die Haustour zeichnet Möbel als einzelne Sprites auf `public/assets/house/houseempty.webp`. Die Sprites liegen in `public/assets/house/cutout/` und werden aus den Studio-Renderings in `assets-source/house/` erzeugt:

```bash
python3 scripts/build-house-cutouts.py
```

Das Skript entfernt den weißen Hintergrund, beschneidet die Motive und schreibt verkleinerte WebP-Dateien. Die Ausgangsbilder selbst sind deckende RGB-Renderings und dürfen nicht direkt über das Haus gelegt werden. Die Platzierung steht in `src/features/house-tour/config/house-overlays.ts`, angegeben in Prozent der quadratischen Zeichenfläche.

Photovoltaik und Regentonne sind bereits in `houseempty.webp` gemalt und lassen sich deshalb nicht abhängig von der Antwort ein- oder ausblenden.

### Warum das Quellmaterial nicht in `public/` liegt

Next liefert alles unter `public/` unter einer öffentlichen URL aus und nimmt es in jeden Deploy mit. Die Roh-Renderings lagen dort und machten 51 MB aus, die keine Seite referenziert hat. Sie liegen jetzt unter `assets-source/`, das nicht ausgeliefert wird — Details in `assets-source/README.md`.

Ausgeliefert werden nur die Ergebnisse: 22 Sprites (~376 KB) und das Hintergrundbild als WebP (86 KB statt 1,74 MB als PNG). `public/` ist dadurch von 55 MB auf rund 4 MB geschrumpft.

## Südtirol-Karte

Die Projektdetailseite zeigt den Standort auf einem stilisierten Umriss Südtirols statt auf einer Kachelkarte. Der Umriss ist ein SVG-Pfad im Markup — kein Drittanbieter-Request, kein Einwilligungsklick, kein Ladezustand.

Der Pfad wird aus der OpenStreetMap-Verwaltungsgrenze der Autonomen Provinz Bozen erzeugt und auf 397 Punkte vereinfacht:

```bash
python3 scripts/build-southtyrol-outline.py
```

Das Skript schreibt `src/components/projects/south-tyrol-outline.ts` — Pfad, viewBox und die zugehörige Projektionsfunktion. Nur wenn Punkte über `projectToOutline()` platziert werden, landen sie an der richtigen Stelle. Die Datei ist generiert und wird mitversioniert; das Skript läuft nur, wenn sich Umriss oder Zeichenfläche ändern.

Die Daten stehen unter ODbL. Die Attribution steht als Bildunterschrift unter jeder Darstellung und darf nicht entfernt werden.

## Datenbank

Das UI verwendet zunächst Mock-Daten. Das Schema unter `prisma/schema.prisma` ist als Ausgangspunkt für die Backend-Phase vorbereitet. Prisma ist bewusst nicht Teil der Standardinstallation, damit der erste Installationslauf keine zusätzlichen nativen Prisma-Engines herunterladen muss.

Sobald die Datenbankphase beginnt:

```bash
npm install --save-exact @prisma/client@6.19.3
npm install --save-dev --save-exact prisma@6.19.3
npx prisma generate
npx prisma db push
```

Vor `db push` muss `DATABASE_URL` in `.env` auf eine PostgreSQL-Datenbank zeigen.

## Noch nicht implementiert

- Authentifizierung und Organisationsrollen
- CMS
- Zahlungen
- Datei-Uploads
- Review-Workflow
- produktive Datenbankabfragen
- vollständige fachliche Score-Methodik

Weitere Architekturhinweise stehen in `docs/ARCHITECTURE.md`.
