---
name: b*alance
description: Die kultivierte Landschaft — Südtiroler Material, präzise Kanten, ein einziger goldener Akzent.
colors:
  paper: "#f7f6f0"
  surface: "#ffffff"
  ink: "#183229"
  forest: "#285744"
  muted: "#657069"
  moss: "#bdd5a9"
  sage: "#dfe8d6"
  stone: "#e9e8e0"
  accent: "#d7a64b"
  accent-hover: "#e8b65c"
  clay: "#b06a52"
  clay-ink: "#8d5240"
  line: "rgba(24, 50, 41, 0.12)"
typography:
  display:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.125rem, 4.5vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "0.18em"
rounded:
  sharp: "0px"
  sm: "2px"
  md: "4px"
  lg: "6px"
  xl: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "96px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.surface}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.ink}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "40px"
  chip-filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "40px"
  chip-filter-active:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
  card-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input-search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px 8px 36px"
    height: "40px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "0 8px"
    height: "44px"
---

# Design System: b*alance

## Overview

**Creative North Star: "Die kultivierte Landschaft"**

Südtirol ist keine Wildnis. Es ist eine Landschaft, die seit Jahrhunderten
bearbeitet wird — Terrassen, Mähwiesen, Trockenmauern, Obstanger. Genau daraus
bezieht dieses System sein Material: Bergpapier statt Weiß, Tannentinte statt
Schwarz, Almmoos und Salbei als Flächen, Lehm als Warnung, Almgold als das eine
Licht, das den Blick lenkt. Die Farben kommen aus dem Ort, den die Plattform
vertritt. Nichts davon leuchtet, und nichts davon behauptet Ökologie — es zeigt
sie.

Die Form dagegen ist Kultur, nicht Natur: gerade Kanten, knappe Radien,
lineare Trennungen. Wo die Farbe warm und gewachsen ist, ist die Geometrie
gemessen. Diese Spannung ist der Kern des Systems — eine Wiese, die vermessen
wurde. Sie hält die Plattform gleichzeitig glaubwürdig für Fördergeber und
zugänglich für Menschen, die zum ersten Mal über den eigenen Haushalt
nachdenken. Fläche schafft Tiefe, nicht Schatten: Papier trägt Weiß, Weiß trägt
Salbei, eine Haarlinie trennt. Erst wenn jemand mit dem Zeiger oder der Tastatur
etwas berührt, antwortet die Oberfläche.

Ausdrücklich verworfen: leuchtende Öko-Signalfarben (Neon-Lime, Mint, Koralle —
diese Werte standen hier bereits einmal im Hero und wurden entfernt),
Spendenplattform-Dramaturgie mit Countdown und Druckzählern, Startup-SaaS-Optik
mit Verlaufsmarken und Glasmorphismus, sowie dekorative Illustration ohne
Informationswert.

**Key Characteristics:**

- Papierfarbener Grund (`#f7f6f0`), nie reines Weiß als Seitenhintergrund
- Ein einziger Akzent — Almgold — und der trägt Text, statt welcher zu sein
- Farbe bedeutet etwas: Bergwald positiv, Lehm belastend, Gold handlungsfähig
- Tonale Schichtung statt Schatten; Schatten sind Zustandsantwort
- Präzise, knappe Radien (0–8 px); die Pille ist abgeschafft
- Zwei Schriften, streng getrennt: Newsreader spricht, Public Sans arbeitet
- Zahlen immer `tabular-nums` — Werte sollen beim Ändern nicht springen

## Colors

Eine gedeckte Landschaftspalette aus einem einzigen Grünstamm, aufgehellt zu
Papier und Stein, zugespitzt durch genau zwei Fremdtöne: Gold für Handlung,
Lehm für Belastung.

### Primary

- **Almgold** (`#d7a64b`): Der einzige Marken-Akzent. Füllt den primären
  Handlungsknopf (Check starten, Projekt unterstützen) und markiert den
  Tastaturfokus im gesamten Lebensraum-Check. Es ist die einzige warme Farbe im
  System und deshalb sofort als „hier" lesbar. Mit Tannentinte darauf misst es
  6,19:1.
- **Almgold hell** (`#e8b65c`): Ausschließlich Hover- und Fokuszustand des
  Akzentknopfs. Nie als Ruhezustand.

### Secondary

- **Bergwald** (`#285744`): Die Arbeitsfarbe. Trägt sekundäre Aktionen, aktive
  Filter-Chips, Fortschrittsbalken, das Wortmarken-Signet und — semantisch
  entscheidend — jeden positiven Wert im Lebensraum-Check. Auf Bergpapier als
  Text 7,65:1; als Fläche braucht sie weißen Text (8,28:1).
- **Almmoos** (`#bdd5a9`): Akzent*text* auf dunklem Grund. Eyebrow-Zeilen im
  Hero, Hover sekundärer Links auf Foto, Textmarkierung (`::selection`). Auf dem
  Hero-Verlauf 3,94:1 — der Grund, warum Akzenttext grün und nicht golden ist.

### Tertiary

- **Lehm** (`#b06a52`): Reserviert. Erscheint ausschließlich dort, wo ein Wert
  belastet — der nach links laufende Balken im Wirkungsdiagramm. Keine
  Dekoration, keine Marke.
- **Gebrannter Lehm** (`#8d5240`): Dieselbe Bedeutung als Text, wo Lehm als
  Schrift zu hell wäre — negative Deltas in der Wertetafel (3,86:1 auf Papier).

### Neutral

- **Bergpapier** (`#f7f6f0`): Der Seitengrund. Warm, leicht vergilbt, nie
  reinweiß — Papier statt Bildschirm.
- **Reinweiß** (`#ffffff`): Die gehobene Ebene. Karten, Panels und
  Formularflächen liegen als Weiß auf Papier. Das ist der Haupt-Tiefenmechanismus
  des Systems.
- **Tannentinte** (`#183229`): Fließtext, Überschriften und die dunklen
  Großflächen — Hero-Grund, Footer, primärer Knopf. Ein sehr dunkles Grün, kein
  Schwarz.
- **Nebelgrau** (`#657069`): Sekundärtext, Metazeilen, inaktive Navigation. Grün
  unterlegt, damit es zur Palette gehört statt sie zu neutralisieren.
- **Salbeischleier** (`#dfe8d6`): Ruhige Füllfläche für Bildunterlagen und
  Gartenzonen; die dritte tonale Ebene über Weiß.
- **Kalkstein** (`#e9e8e0`): Leere Spur eines Fortschrittsbalkens, unbefüllte
  Zustände.
- **Feldlinie** (`rgba(24, 50, 41, 0.12)`): Die einzige Trennlinie des Systems.
  Grün getönt, 1 px, nie schwarz.

### Named Rules

**Die Trägerregel.** Almgold ist eine Flächenfarbe, keine Textfarbe. Es füllt
Knöpfe und markiert Fokus; es steht nie als Schrift auf Foto, Verlauf oder
Papier. Braucht Text den Akzentton, gilt Almmoos auf Dunkel und Bergwald auf
Papier. Grund: Gold hat eine relative Leuchtdichte von 0,422 und verlangt darunter
einen Hintergrund unter 0,107 — der Hero liefert 0,118, gemessen 2,81:1 gegen
geforderte 3:1.

**Die Bedeutungsregel.** Bergwald heißt positiv, Lehm heißt belastend. Keine der
beiden Farben darf dekorativ eingesetzt werden, solange der Lebensraum-Check sie
semantisch führt. Wer eine Fläche einfärben will, nimmt Salbei oder Kalkstein.

**Die Ein-Licht-Regel.** Pro Ansicht trägt höchstens ein Element Almgold als
Fläche. Zwei goldene Knöpfe nebeneinander gibt es nicht — der Akzent lebt von
seiner Seltenheit.

## Typography

**Display Font:** Newsreader (mit `Georgia`, `Times New Roman`, `serif`)
**Body Font:** Public Sans (mit `ui-sans-serif`, `system-ui`, `-apple-system`)
**Label/Mono Font:** keiner; Zahlen laufen über `font-variant-numeric: tabular-nums`

Beide Schriften werden über `src/config/fonts.ts` mit `next/font/google` zur
Bauzeit heruntergeladen und als woff2 aus dem eigenen Ursprung ausgeliefert. Zur
Laufzeit gibt es keinen externen Host — dieselbe Regel wie bei den Bildern.
`adjustFontFallback` erzeugt metrisch angepasste Ersatzschriften, damit während
des Ladens kein Umbruch springt.

**Character:** Eine Kontrastpaarung mit klar getrennten Aufgaben. **Newsreader
spricht**: eine Editorial-Antiqua mit erkennbarem Duktus, die den Überschriften
eine gewachsene, redaktionell glaubwürdige Stimme gibt — sie trägt die
Landschaftsseite des North Stars. **Public Sans arbeitet**: eine institutionelle
Grotesk aus dem US-Designsystem, gebaut für Behördentexte, mit echten
Tabellenziffern und ruhigem Schriftbild bei 11–16 px. Sie trägt die
Vermessungsseite.

Die Trennung ist streng: Die Antiqua erscheint ausschließlich auf den beiden
obersten Stufen. Alles, was gelesen, bedient oder gerechnet wird, ist Grotesk.

### Hierarchy

- **Display** (Newsreader 600, `clamp(2.125rem, 4.5vw, 4.25rem)`, LH 1.04,
  LS −0.03em): Nur die Seitenüberschrift. Die Akzentzeile trägt Almmoos, nicht
  Gold. Immer mit `text-wrap: balance`.
- **Headline** (Newsreader 600, `clamp(1.875rem, 4vw, 3rem)`, LH 1.1, LS −0.03em):
  Abschnittsüberschriften über `SectionHeading`.
- **Title** (Public Sans 600, 1.25rem, LH 1.375, LS −0.02em): Projekttitel auf
  Karten, Panelüberschriften im Check, Zwischenüberschriften in Rechtstexten.
- **Body** (Public Sans 400, 1rem/1.7, auf großen Flächen 1.125rem/1.7):
  Fließtext in Nebelgrau, Zeilenlänge maximal 58 Zeichen.
- **Label** (Public Sans 700, 0.6875rem, LS 0.18em, Versalien): über die
  `<Label>`-Komponente in drei Stufen — `section` (0.22em), `block` (0.18em),
  `dense` (0.14em).

### Named Rules

**Die Stimmenregel.** Newsreader trägt Display und Headline, sonst nichts. Ein
Serifen-Fließtext, ein Serifen-Knopf oder eine Serifen-Tabelle bricht die
Arbeitsteilung, auf der dieses System beruht.

**Die Elf-Pixel-Regel.** Keine Schrift unter 11 px. Öffentliche Flächen und der
Lebensraum-Check erfüllen das inzwischen vollständig; die einzigen
Unterschreitungen liegen im Möbel-Editor, der hinter `NODE_ENV === "development"`
steht und Nutzer nie erreicht.

**Die Zahlenregel.** Jede Zahl, die sich ändern kann — Score, Delta, Prozentsatz,
Betrag — läuft in `tabular-nums`. Werte dürfen beim Aktualisieren nicht seitlich
wandern.

**Die Gegenlichtregel.** Heller Text auf dunklem Grund oder Fotografie bekommt
eine Spur mehr Durchschuss (1.75 statt 1.7) und leicht positive Laufweite
(+0.01em). Ohne diese Kompensation wirkt Public Sans auf Tannentinte gedrängt.

## Layout

Ein zentrierter Textkorpus mit maximal **1240 px** Breite, gefasst über die
`Container`-Komponente mit 20 px Innenabstand mobil und 32 px ab `sm`. Der
Kopfbereich ist 72 px hoch, klebt am oberen Rand und liegt als
papierfarbene Fläche mit 88 % Deckkraft und `backdrop-blur` über dem Inhalt.

**Abschnittsrhythmus:** 96 px vertikal, ab `sm` 128 px. Innerhalb eines
Abschnitts staffeln sich Abstände in 8er-Schritten: 8, 16, 24, 40. Karten tragen
24 px Innenabstand, großflächige Panels 36 px.

**Raster:** Projektlisten laufen einspaltig, ab `sm` zweispaltig, ab `lg`
dreispaltig mit 24 px Rinne. Der Lebensraum-Check bricht aus dem Textkorpus aus
und arbeitet als zweispaltige Anwendungsfläche — Szene links, Steuerung rechts —
die mobil untereinander klappt. Die Hausübersicht selbst ist ein 6×6-Raster mit
10 px Fugen, das mobil auf zwei Spalten kollabiert.

**Bruchpunkte:** 360 px (Kleingeräte, eigene Sonderregeln unter 359 px), 640 px,
1024 px, 1280 px, 1536 px. Zusätzlich eine Höhenregel: zwischen 640 px Breite und
860 px Höhe schrumpfen Hero-Abstände und Zitatgröße, damit Überschrift und
Knöpfe auf flachen Notebooks ohne Scrollen sichtbar bleiben.

**Dichte:** Öffentliche Seiten sind großzügig, der Lebensraum-Check ist dicht.
Das ist Absicht — die Landingpage überzeugt, das Werkzeug arbeitet.

### Named Rules

**Die Vierundvierzig-Regel.** Jedes bedienbare Element ist mindestens 44 px hoch.
Im Bestand konsequent über `min-h-11` und `min-h-12` durchgesetzt.

## Elevation & Depth

Das System ist **tonal geschichtet, nicht beschattet**. Tiefe entsteht durch
Flächenwechsel und Haarlinien: Bergpapier als Grund, Reinweiß als gehobene
Ebene, Salbei als dritte Stufe, dazwischen 1 px Feldlinie. Ein Element ist nicht
deshalb wichtiger, weil es schwebt, sondern weil es heller ist als das darunter.

Schatten sind **Zustandsantwort, kein Ruhezustand**. Sie erscheinen, wenn jemand
mit Zeiger oder Tastatur ein Element berührt, und verschwinden wieder. Ihre
Tönung ist immer grün, nie neutralgrau — ein grauer Schatten auf warmem Papier
wirkt schmutzig.

### Shadow Vocabulary

- **Hover-Anhebung** (`box-shadow: 0 18px 45px rgba(33, 56, 44, 0.12)`): Antwort
  einer Projektkarte auf Zeiger oder Fokus. Nur dann.
- **Panelrahmen** (`box-shadow: 0 24px 70px rgba(32, 55, 44, 0.08)`): Die eine
  Ausnahme — große eigenständige Formularflächen dürfen dauerhaft eine sehr
  weiche Fassung tragen, weil sie sonst im Papier verschwimmen.
- **Akzentknopf** (`box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2)`): Trägt den
  goldenen Knopf auf Fotografie, wo tonale Schichtung nicht greift.

### Named Rules

**Die Ruhe-Regel.** Flächen liegen im Ruhezustand flach. Wer einen Schatten
setzt, muss den Zustand benennen können, der ihn auslöst.

**Die Grünschatten-Regel.** Jeder Schatten ist grün getönt
(`rgba(3x, 5x, 4x, α)`). Neutralgraue oder schwarze Schatten sind verboten,
außer über Fotografie.

## Shapes

> **Zielbild, noch nicht Bestand — aber einen Schalter entfernt.** Der Code
> läuft inzwischen vollständig über die Tokens `--radius-sharp/sm/md/lg/xl` in
> `globals.css`; kein Radius steht mehr ausgeschrieben in einer Komponente.
> Die Tokenwerte bilden derzeit noch die runde Bestandsform ab. Der Wechsel auf
> die kantige Zielform ist damit ein Wechsel dieser fünf Zeilen und keine
> Wanderung durch den Code. Echte Kreise tragen bewusst weiterhin
> `rounded-full` und sind vom Wechsel ausgenommen.

Die Geometrie ist **gemessen, nicht gewachsen**. Wo die Farbwelt aus der
Landschaft kommt, kommt die Form aus der Kartierung: gerade Kanten, knappe
Radien, klare Winkel. Eine Radienleiter aus fünf Stufen deckt das gesamte System
ab:

- **sharp** (0 px): Bilder, Fortschrittsspuren, vollflächige Bänder, Trennungen
- **sm** (2 px): Chips, Rubrikmarken, kleine Schalter
- **md** (4 px): Knöpfe, Eingabefelder, Navigationsziele
- **lg** (6 px): Karten, Listenelemente, Räume der Hausübersicht
- **xl** (8 px): große eigenständige Panels, Dialoge, das Formularblatt

**Borders:** 1 px Feldlinie als Standard. Der einzige zulässige gestrichelte
Rahmen markiert einen Leerzustand („keine Projekte gefunden"). Aktive Zustände
verstärken die Linie auf Bergwald mit 45 % Deckkraft, statt eine zweite Linie
hinzuzufügen.

**Fokus:** 2 px Almgold-Ring mit 2 px Versatz im Lebensraum-Check, 2 px Bergwald
auf öffentlichen Seiten, 2 px Weiß auf dunklen Flächen. Der Ring folgt der Form
des Elements.

### Named Rules

**Die Lineal-Regel.** Kein Radius über 8 px, keine Pille. Ein rundes Element ist
nur dann rund, wenn es tatsächlich ein Kreis ist — Signet, Zähler,
Schritt-Nummer, Icon-Knopf.

**Die Ein-Kanten-Regel.** Ein Element trennt sich vom Untergrund entweder durch
seine Fläche oder durch seine Linie, nie durch beides plus Schatten.

## Components

Die geteilten Bausteine liegen in `src/components/ui/`. Wer eine dieser Formen
neu ausschreibt, statt sie zu importieren, erzeugt genau die Drift, die diese
Dateien beseitigt haben:

| Baustein | Datei | Deckt ab |
|---|---|---|
| `<Label>` | `ui/label.tsx` | Eyebrow, Rubrik, Kategoriemarke — Stufen `section`, `block`, `dense` |
| `<Surface>` | `ui/surface.tsx` | Weiß auf Bergpapier mit Feldlinie — Stufen `card`, `sheet`, `inset` |
| `<Progress>` | `ui/progress.tsx` | Einseitiger Fortschritts- und Standbalken |
| `<Button>` | `ui/button.tsx` | Primärknopf |
| `chipClass()` | `ui/chip.ts` | Chip-Hülle, Varianten `bordered` und `plain` |
| `focusRing*` | `ui/focus.ts` | Die drei Fokusringe, gewählt nach Untergrund |

### Buttons

- **Shape:** Knappe Kante (4 px), mindestens 44 px hoch, Label in Versalien-naher
  Halbfettung
- **Primär:** Tannentinte-Fläche, weißer Text, 10/20 px Innenabstand. Der
  Arbeitsknopf — Formulare, Bestätigungen, Navigation in Anwendungen.
- **Akzent:** Almgold-Fläche, Tintentext, 48 px hoch, 24 px seitlich. Nur die
  eine Hauptaktion pro Ansicht (Check starten, Projekt unterstützen).
- **Hover / Focus:** Primär wechselt auf Bergwald, Akzent auf Almgold hell.
  Farbwechsel über 200 ms `ease-out`, ohne Positionsversatz — die Fläche
  antwortet, sie springt nicht. Fokus setzt den Ring nach Shapes.
- **Leise (Ghost):** Transparent, Bergwald-Text, Hover legt 5 % Tinte unter.
  Werkzeugleisten des Lebensraum-Checks, Zurücksetzen, Panelgröße.
- **Textlink als Alternative:** Der zweite Weg im Hero ist kein Knopf, sondern
  ein unterstrichener Link — damit zwei Aktionen nie um dieselbe Priorität
  konkurrieren.

### Chips

- **Style:** 2 px Kante, 40 px hoch, 16 px seitlich, Label 11 px halbfett
- **Unselektiert:** Weiße Fläche, Tintentext, Linie mit 10 % Schwarz; Hover
  verstärkt die Linie auf 25 %
- **Selektiert:** Bergwald-Fläche, weißer Text, vorangestelltes Häkchen. Der
  Zustand ist an Fläche *und* Symbol ablesbar, nicht nur an Farbe.
- **Als Navigation** (Räume im Check): dieselbe Form ohne Rahmen; aktiv
  Bergwald-Fläche, abgeschlossen mit Häkchen, begonnen mit Punkt, unberührt ohne
  Symbol. Die Leiste läuft waagrecht mit ausblendender Maske am rechten Rand und
  ohne sichtbare Bildlaufleiste.

### Cards / Containers

- **Corner Style:** 6 px
- **Background:** Reinweiß auf Bergpapier
- **Shadow Strategy:** flach im Ruhezustand; Hover-Anhebung nach Elevation
- **Border:** 1 px Feldlinie; Hover wechselt auf Bergwald mit 30 % Deckkraft
- **Internal Padding:** 20 px mobil, 24 px ab `sm`
- **Bild:** 16:10, kantenbündig (0 px), Salbei als Unterlage während des Ladens

### Inputs / Fields

- **Style:** Weiße Fläche, 1 px Linie mit 10 % Schwarz, 4 px Kante, 40 px hoch.
  Vorangestelltes Symbol sitzt 14 px vom linken Rand, der Text beginnt bei 36 px.
- **Focus:** Linie wechselt auf Bergwald, dazu ein 2 px Ring in Bergwald mit
  20 % Deckkraft. Kein Glühen, keine Größenänderung.
- **Placeholder:** Nebelgrau.
- **Error:** *Offene Lücke.* Das System hat keine Fehlerfarbe. Lehm ist durch die
  Bedeutungsregel für belastende Werte gesperrt und darf hier nicht einspringen,
  solange die Frage nicht entschieden ist.

### Navigation

- **Kopfbereich:** 72 px hoch, klebend, Bergpapier mit 88 % Deckkraft und
  `backdrop-blur`, darunter 1 px Linie. Links das Signet — ein echter Kreis mit
  Bergwald-Fläche und weißem Blatt — neben der Wortmarke in 20 px, eng gesetzt.
- **Links:** 14 px, mittelfett, Nebelgrau; Hover wechselt auf Tannentinte. Kein
  Unterstrich, keine Markierung der aktiven Seite im Bestand.
- **Mobil:** Ein `<details>`-Menü ohne JavaScript. Das Blatt öffnet eine weiße
  Fläche mit 8 px Kante, darin die Navigationsziele, ein abgetrennter Bereich für
  Projektträger und der Hauptknopf in Bergwald.
- **Sprachwechsler:** Ab `sm` im Kopfbereich sichtbar, mobil im Menüfuß.

### Die Südtirol-Karte (Signature)

Der Standortnachweis der Plattform und die sichtbarste Einlösung der
Positionierung „radikale Lokalität".

- **Form:** Der Umriss der Autonomen Provinz Bozen als einzelner SVG-Pfad,
  Salbeifläche mit 2 px Bergwald-Kontur, runde Ecken an den Knoten. Der Pfad
  entsteht aus der OSM-Verwaltungsgrenze und wird per Douglas-Peucker auf 397
  Punkte reduziert — genug für die markanten Täler, wenig genug für 4,6 KB.
  Erzeugt von `scripts/build-southtyrol-outline.py`.
- **Punkte:** Ein Projekt ist ein Punkt in der Markerfarbe seines **primären
  Lebensraums**. Die Farbe codiert also dieselbe Kategorie wie die Marke auf der
  Projektkarte; sie ist keine Dekoration. Lehm bleibt ausgespart.
- **Rangfolge über Größe, nicht über Deckkraft:** Das aktive Projekt trägt
  Radius 13 mit Tintenkontur, Papierhof und einem weiten Ring; die übrigen
  tragen Radius 8, voll deckend. Ein abgeblendeter Kategorieton wäre auf 8 px
  nicht mehr unterscheidbar.
- **Zwei Trennungen pro Punkt:** ein Hof in Bergpapier gegen die Salbeifläche,
  eine Tintenkontur gegen den Hof. Nur so bleibt jeder der sieben
  Kategorietöne lesbar, auch die hellen.
- **Kein Netzwerk:** Der Umriss ist Markup, keine Kachelkarte. Damit entfallen
  Drittanbieter-Request, Einwilligungsklick und Ladezustand. Die
  ODbL-Attribution steht als `figcaption` unter der Grafik — sie ist Pflicht,
  nicht Zierde.

### Der Lebensraum-Check (Signature)

Die charakteristischste Fläche der Plattform und der einzige Ort, an dem das
System als Werkzeug statt als Publikation auftritt.

- **Aufbau:** Waagrechte Raumleiste als Chips, darunter zweispaltig die Szene
  (Haus mit eingeblendeten Möbel-Sprites auf quadratischer Zeichenfläche) und das
  Steuerungspanel. Am Fuß der rechten Spalte steht dauerhaft die Wertetafel.
- **Wertetafel:** Vier Dimensionen — Biodiversität, CO₂, Wasser, Ressourcen — je
  als Zahl, farbiges Delta und Standbalken. Positive Deltas in Bergwald, negative
  in gebranntem Lehm.
- **Wirkungsdiagramm:** Der einzige zweiseitige Balken des Systems. Die Mitte ist
  Null, nach rechts in Bergwald bedeutet Verbesserung, nach links in Lehm
  Belastung, beschriftet mit „belastet" und „verbessert". Ein Haarstrich markiert
  die Nulllinie.
- **Panelgrößen:** kompakt, normal, erweitert — umschaltbar über einen leisen
  Kreisknopf.
- **Bewegung:** Balken wachsen in 350–400 ms `easeOut`, Zahlenwechsel blenden
  über 180 ms mit 4 px Versatz. Bei `prefers-reduced-motion` entfallen alle
  Ein- und Ausblendungen ersatzlos, die Werte stehen sofort.

## Do's and Don'ts

### Do:

- **Do** Almgold ausschließlich als Fläche einsetzen — Knopf oder Fokusring —
  und höchstens einmal pro Ansicht (Trägerregel, Ein-Licht-Regel).
- **Do** Akzenttext grün setzen: Almmoos `#bdd5a9` auf Dunkel und Foto, Bergwald
  `#285744` auf Bergpapier.
- **Do** Tiefe über Flächenwechsel bauen: Bergpapier → Reinweiß → Salbei, dazu
  1 px Feldlinie.
- **Do** Schatten nur als Antwort auf Hover oder Fokus setzen, und immer grün
  getönt.
- **Do** Radien ausschließlich über `var(--radius-*)` setzen, nie als Zahl in
  einer Komponente.
- **Do** die Bausteine aus `src/components/ui/` importieren, statt Label,
  Fläche, Chip, Balken oder Fokusring neu auszuschreiben.
- **Do** jede veränderliche Zahl in `tabular-nums` setzen.
- **Do** jedes bedienbare Element auf mindestens 44 px Höhe bringen.
- **Do** Zustände doppelt kodieren — Farbe *und* Symbol oder Text, nie Farbe
  allein.
- **Do** Kontraste hinter den tatsächlichen Glyphen messen, wenn Text auf Foto
  oder Verlauf liegt; deklarierte Werte gelten dort nicht.
- **Do** bei `prefers-reduced-motion` einen vollständigen, gleichwertigen Pfad
  liefern — der Ruhezustand jeder Animation ist „sichtbar".

### Don't:

- **Don't** Almgold als Schriftfarbe verwenden, auf keinem Untergrund. Im Hero
  steht das derzeit noch so (`src/components/home/hero/index.tsx:30`) und misst
  2,81:1 bei 390 px — ein offener WCAG-1.4.3-Verstoß, kein Vorbild.
- **Don't** Lehm oder gebrannten Lehm dekorativ einsetzen. Beide bedeuten
  „belastet", solange der Lebensraum-Check sie semantisch führt.
- **Don't** Bergwald als Markenakzent zweckentfremden — es bedeutet bereits
  Aktion *und* positiven Wert; eine dritte Bedeutung löscht die ersten beiden.
- **Don't** leuchtende Öko-Signalfarben einführen: kein Neon-Lime `#dcff58`,
  kein Mint `#67efc3`, keine Koralle `#ff9278`. Diese Werte standen hier bereits
  im Hero und wurden bewusst entfernt.
- **Don't** neue Pillen bauen (`rounded-full`) außer für echte Kreise: Signet,
  Zähler, Schritt-Nummer, Icon-Knopf.
- **Don't** Radien über 8 px vergeben.
- **Don't** neutralgraue oder schwarze Schatten setzen.
- **Don't** reines Weiß als Seitengrund verwenden — der Grund ist Bergpapier.
- **Don't** Schrift unter 11 px setzen, auch nicht in der dichten Tour-Ansicht.
- **Don't** Verlaufsflächen als Markenelement einsetzen. Verläufe existieren
  ausschließlich zur Textabsicherung über Fotografie.
- **Don't** Dringlichkeitsdramaturgie einbauen: keine Countdowns, keine
  Live-Spendenzähler, keine Emotionsportraits als Druckmittel.
- **Don't** Farbe als einzigen Zustandsträger verwenden.
