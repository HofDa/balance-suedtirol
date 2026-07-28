# UX/UI-Review b*alance — Stand 27.07.2026

**Rolle:** Review aus Sicht Senior UX/UI Design
**Ziel der Plattform:** Menschen über den eigenen Alltag abholen und zu lokalen
Biodiversitätsprojekten in Südtirol führen, die sie unterstützen können.
**Anspruch:** engaging, professionell, vertrauenswürdig, einfach zu navigieren.

**Geprüft:** Startseite, Projektliste, Projektdetail, Projekt einreichen, Methodik,
Haus-Tour (Haus-, Frage-, Wirkungs- und Ergebnisansicht) — jeweils bei 430, 1280,
1440, 1600 und 1920 px.

---

## 1. Gesamteindruck

Die Basis ist deutlich besser als bei den meisten Prototypen: ruhige, glaubwürdige
Farbwelt, ein echter (belegter) Forschungsbezug im Hero, konsistente Radien und
Buttons, ehrliche Kennzeichnung von Demo-Inhalten, funktionierender
Reduced-Motion-Pfad. Die Haus-Tour ist nach dem Umbau klar strukturiert und die
Ergebnisseite verweist auf Projekte — der wichtigste Funnel existiert.

Die drei größten Schwächen liegen genau auf dem Kernziel:

1. **Der Weg zum Geld/zur Unterstützung ist der schwächste Pfad der Seite.**
   Projektkarten haben keinen Handlungs-CTA, die Detailseite endet in einem
   Platzhalter, und der Übergang Tour → Projekte transportiert keinerlei Kontext.
2. **Das Farbsystem ist auseinandergelaufen.** Im Hero leben inzwischen Neon-Lime
   (`#dcff58`), Mint (`#67efc3`), Koralle (`#ff9278`/`#ff765e`) und ein Gold-Hover
   (`#ffd45c`) — der Rest der Seite spricht die gedeckte Token-Palette. Das wirkt
   wie zwei verschiedene Produkte und kostet den „big corporation"-Eindruck am
   stärksten.
3. **Prototyp-Reste stehen an Publikumsflächen.** Debug-Chips in der Tour,
   Entwickler-Sprech als Subline, ein Häkchen an einem nie ausgefüllten
   Formular-Schritt, tote Footer-Einträge.

---

## 2. Was bereits gut funktioniert (behalten)

- **Hero:** großes Bild, belegtes Zitat mit Quelle, klare Doppel-CTA. Das Zitat als
  flacher Block wirkt seriös; Bild-Credit sauber gelöst.
- **Tonalität der Texte:** „Kein Verhörraum", „keine grüne Nebelmaschine",
  Disclaimer zur didaktischen Vereinfachung — differenziert und glaubwürdig.
- **Tour-Layout:** eine Steuerungsebene, Werte auf Weiß, Terrakotta konsequent für
  Negatives, Fortschritt als Linie. Szene + Panel-Aufteilung ist verständlich.
- **Projektkarten-Inhalt:** Kategorie, Ort, Fortschritt, Zielsumme — die richtige
  Informationshierarchie ist da.
- **Ehrlichkeit:** Demo-Zustände werden nicht versteckt. Das Muster muss nur
  einheitlich werden (siehe 3.7).

---

## 3. Befunde

Schweregrade: 🔴 kritisch fürs Ziel · 🟠 deutlich spürbar · 🟡 Feinschliff

### 3.1 🔴 Conversion-Pfad zu Projekten bricht ab

- Projektkarten (`project-card.tsx`) haben als einzige Affordanz ein kleines
  Pfeil-Icon; kein Label wie „Projekt ansehen", unklar ob die ganze Karte klickbar
  ist. Auf Touch fehlt jeder Hinweis.
- Detailseite: rechts eine gute Finanzkarte, aber „Projekt unterstützen" führt
  nirgendwohin und darunter steht nur der Platzhalterkasten „Geplante
  Transparenzebene". Kein „weitere Projekte", kein Teilen, keine Trägerorganisation
  mit Profil — die Seite ist eine Sackgasse.
- Tour-Ergebnis → „Passende Projekte" linkt auf die ungefilterte Liste. Das
  Versprechen „passend" wird nicht eingelöst (kein Themen-Mapping
  Raum ↔ Projektkategorie).
- Header-CTA „Projekte entdecken" dupliziert den Nav-Punkt „Projekte" mit anderem
  Label und zeigt auf der Projektseite auf sich selbst.

### 3.2 🔴 Zwei konkurrierende Farbsysteme

`hero.tsx` nutzt hartkodierte Neon-Werte (`statColors`-Array, Lime-CTA,
Koralle-Blob, Gold-Hover), der Rest der Site die Tokens aus `globals.css`
(Forest/Sage/Gold-Akzent/Clay). Konsequenzen:

- Die drei Hero-Kennzahlen sind in drei Deko-Farben gefärbt, die nichts codieren —
  gleichzeitig ist Terrakotta in der Tour semantisch für „negativ" reserviert.
  Koralle im Hero kollidiert damit direkt.
- Der Lime-CTA hat mit Gold-Hover einen Farbwechsel ohne Bedeutung.
- Entscheidung nötig: **ein** Akzent (Empfehlung: das vorhandene Gold `#d7a64b`
  für Highlights + Forest für Aktionen, oder bewusst Lime als einziger
  Marken-Akzent — dann aber als Token und überall).

### 3.3 🟠 Prototyp-Reste an Publikumsflächen

- Tour-Szene zeigt die Debug-Chips „Drag & Drop: AUS" / „Grid: AUS"
  (`house-visual.tsx`).
- Projektliste: Subline „Die Karten arbeiten derzeit mit Demo-Daten und zeigen die
  geplante Informationshierarchie" — Entwickler-Sprech als Hero-Copy.
- Einreichen: Schritt 1 trägt ein Häkchen, obwohl nichts ausgefüllt wurde — wirkt
  wie ein Bug; „Demo-Einreichung beginnen" ist ein `<button>` ohne Aktion.
- Footer: „Datenschutz" und „Impressum" sind `<span>`s, die wie Links aussehen.
  Für eine Vertrauensplattform sind das Pflichtseiten.

### 3.4 🟠 Navigation & Mehrsprachigkeit

- Der Hero bewirbt „DE · IT · EN / dreisprachig angelegt", aber auf dem Desktop
  gibt es keinen Sprachwechsler (nur im Mobile-Menü versteckt). Claim und UI
  widersprechen sich.
- `src/app/layout.tsx` setzt fix `lang="de"` — auch unter `/it` und `/en`
  (A11y/SEO-Fehler, sobald Übersetzungen existieren).
- „Haus-Tour" als Name ist laut Produktentscheidung abzulösen (offen aus dem
  letzten Review); der Begriff steht in Nav, Hero-CTA, Footer und Tour.

### 3.5 🟠 Projektliste zu dünn für die zentrale Seite

Die wichtigste Seite der Plattform ist eine Drei-Karten-Reihe mit einem
funktionslosen Filter-Button. Es fehlt: Kategorien-/Bezirksfilter (real),
Sortierung, Anzahl der Projekte, ein Themen-Einstieg („Wildbienen", „Moore" …)
und ein Hinweis, was „unterstützen" konkret bedeutet. Der Filter-Button, der
nichts tut, beschädigt Vertrauen mehr als gar keiner.

### 3.6 🟠 Illustrationen tragen keine Identität

Alle drei Projektbilder sind Varianten derselben Berg-Silhouette; auf der
Detailseite nimmt sie ~420 px Höhe ohne Informationswert ein. Projekte brauchen
mittelfristig echte Fotos (Fotografen-Pipeline existiert bereits für den Hero —
`scripts/build-hero-image.py` ließe sich verallgemeinern); kurzfristig stärker
differenzierte Motive + geringere Bildhöhe auf der Detailseite.

### 3.7 🟡 Demo-Kennzeichnung uneinheitlich

Drei verschiedene Muster: Fließtext-Subline (Projekte), Kleingedrucktes unter dem
CTA (Detail, Einreichen), „(Platzhalter)" im Bild-Credit (Hero). Empfehlung: ein
wiederverwendbares, dezentes „Prototyp"-Badge mit Tooltip/einem Satz, überall
gleich gesetzt.

### 3.8 🟡 Kleinigkeiten

- Reset der Tour nutzt natives `window.confirm` — bricht die Gestaltung (und
  blockiert Browser-Automation); eigener Dialog oder Undo-Snackbar.
- Tour-Typografie unterschreitet mehrfach 11 px (9–10 px Labels) — an der Grenze
  der Lesbarkeit, v. a. mobil.
- Footer ist sehr karg für eine Plattform, die Seriosität ausstrahlen will: keine
  Trägerschaft/Kontakt, keine Newsletter-/Social-Zeile, kein Hinweis zur
  Datenbasis (Eurac-Quelle wäre hier gut aufgehoben).
- Methodik-Seite: vier Karten sind ein guter Anfang, aber es fehlt der eine Satz,
  *wer* hinter der Plattform steht — für Vertrauen wichtiger als jede Karte.
- Projektdetail mobil: Finanzkarte erst nach dem gesamten Text erreichbar;
  Sticky-CTA („Unterstützen") am unteren Rand prüfen.

---

## 4. Maßnahmen als PR-Liste (priorisiert)

### P0 — Kernziel & Vertrauen

| # | PR | Inhalt | Akzeptanz |
|---|----|--------|-----------|
| 1 | `fix/color-system-consolidation` | Neon-Werte aus `hero.tsx` entfernen oder als einzigen Akzent-Token übernehmen; `statColors` streichen; ein Akzent site-weit; Clay bleibt exklusiv „negativ" | Kein Hex-Wert außerhalb `globals.css`-Tokens in Komponenten |
| 2 | `feat/project-card-cta` | Ganze Karte klickbar (`<Link>` um die Karte), sichtbarer CTA „Projekt ansehen", Hover/Focus-State, Touch-tauglich | Karte per Tastatur fokussierbar, CTA-Label sichtbar |
| 3 | `feat/project-detail-next-steps` | Unter der Transparenz-Box: „Weitere Projekte"-Reihe (2–3 Karten), Trägerorganisation benannt, Bildhöhe reduziert; mobil Sticky-Support-CTA | Detailseite hat keinen Dead-End mehr |
| 4 | `fix/remove-debug-ui` | Debug-Chips aus `house-visual.tsx` hinter ein Dev-Flag; Häkchen an Schritt 1 der Einreichen-Seite entfernen; Demo-Subline der Projektliste in Nutzersprache umformulieren | Keine Entwickler-Artefakte in Standard-Ansicht |
| 5 | `feat/legal-pages` | Impressum + Datenschutz als echte Routen, Footer-`span`s zu Links | Beide Seiten erreichbar, Footer ohne Schein-Links |

### P1 — Funnel & Navigation

| # | PR | Inhalt | Akzeptanz |
|---|----|--------|-----------|
| 6 | `feat/tour-to-projects-context` | Mapping Raum/Score → Projektkategorie; „Passende Projekte" übergibt Filter (z. B. `?thema=wildbienen`); Ergebnis-Screen nennt die Verbindung („Dein größtes Potenzial: Wasser → Moorprojekte") | Link aus Tour landet auf vorgefilterter Liste mit sichtbarem Filter-Chip |
| 7 | `feat/project-list-filters` | Filter (Kategorie, Bezirk) real umsetzen oder Button entfernen; Projektanzahl anzeigen; Sortierung „Fast finanziert / Neu" | Kein UI-Element ohne Funktion |
| 8 | `fix/header-cta` | Header-CTA von „Projekte entdecken" (Dopplung) auf die primäre Handlung stellen — auf Projektseiten z. B. „Projekt unterstützen", sonst Tour-Einstieg; Self-Links vermeiden | CTA zeigt nie auf die aktuelle Seite |
| 9 | `feat/language-switcher` | *(umgesetzt)* Sprachwechsler im Header; `lang` pro Locale serverseitig, dafür ist `[locale]/layout.tsx` jetzt das Root-Layout; `/` leitet auf `/de`; Titel, Beschreibung, Canonical und hreflang je Sprache | `<html lang>` stimmt auf `/de`, `/it`, `/en`; unbekannte Route 404; `/` → 307 auf `/de` |
| 10 | `feat/rename-haus-tour` | Umbenennung gemäß Namensentscheidung (steht noch aus) in Nav, CTA, Route (+ Redirect), Footer, Meta | Alter Pfad leitet weiter |

### P2 — Politur & Ausbau

| # | PR | Inhalt |
|---|----|--------|
| 11 | `feat/prototype-badge` | Einheitliches „Prototyp"-Badge als Komponente; ersetzt alle drei bisherigen Demo-Hinweismuster |
| 12 | `feat/custom-confirm-dialog` | `window.confirm` beim Tour-Reset durch styled Dialog oder Undo-Toast ersetzen |
| 13 | `fix/tour-type-scale` | Mindestgröße 11 px für alle Labels in der Tour; Typo-Stufen auf 8-px-Raster dokumentieren |
| 14 | `feat/footer-trust-block` | Footer ausbauen: Träger/Kontakt, Datenquelle (Eurac-Monitoring als Quelle verlinkt), Sprachzeile |
| 15 | `feat/project-photography` | `build-hero-image.py` zu generischem Bild-Skript verallgemeinern; Projektbilder auf Fotos umstellen, Credits wie im Hero |
| 16 | `feat/methodik-about` | Methodik um „Wer steht dahinter"-Abschnitt ergänzen |

### Hero-Texte — Details und Varianten in `docs/HERO-COPY.md`

| # | PR | Inhalt | Akzeptanz |
|---|----|--------|-----------|
| 17 | `feat/hero-copy-connection` | Neue Hero-Texte (Empfehlung: Variante 1 + Subheadline aus 2) in `de`, `it`, `en`; „spielerisch" und „Stärke lokale Natur" entfallen | Headline ≤ 9 Wörter je Sprache, kein verbotenes Wort, Umbruch bei 390/768/1280/1920 px geprüft |
| 18 | `feat/hero-microcopy` | Microcopy-Zeile unter dem primären CTA (Element und Schlüssel `hero.microcopy` neu) | Kontrast ≥ 4,5:1 hinter den Glyphen, auf 390 px maximal zwei Zeilen |
| 19 | `fix/hero-cta-name-neutral` | CTA und `hero.stats[0]` vom alten Produktnamen lösen, bis PR 10 entschieden ist | „Haus-Tour" kommt im Hero in keiner Sprache mehr vor |
| 20 | `fix/hero-copy-locale-parity` | IT/EN-Fassungen inhaltlich angleichen (Ist-Stand weicht ab: EN ohne „geprüft", IT ohne Regionalbezug) | Jede Aussage der DE-Fassung in IT und EN vorhanden, Länge ±15 % |
| 21 | `fix/hero-accent-contrast` | *(umgesetzt)* Goldene Headline-Zeile erreichte 1,4:1 / 2,2:1 statt 3:1 — auf Salbei umgestellt, Verläufe folgen dem Text statt der Bildfläche | 3,9:1 mobil, 4,2:1 Desktop, gemessen hinter den Glyphen |

---

## 5. Nicht anfassen

- Zitat-Block im Hero (Beleg + Quelle) — Alleinstellungsmerkmal gegenüber
  typischen Spendenseiten.
- Terrakotta-Semantik und die Werte-Tafel der Tour.
- Die ehrliche Grundhaltung der Texte — nur das *Muster* der Kennzeichnung
  vereinheitlichen, nicht die Ehrlichkeit reduzieren.
