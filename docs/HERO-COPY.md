# Hero-Texte b*alance — Varianten, Bewertung, Umsetzung

Stand 27.07.2026 · UX Writing / Markenstrategie
Zugehörige PRs: 17–21 · **PR 17–20 umgesetzt am 27.07.2026**, Messwerte am Ende

**Markenidee:** Unser eigener Lebensraum ist mit den Lebensräumen von Tieren,
Pflanzen und anderen Menschen verbunden.

**Leitplanken:** in Sekunden verständlich · emotional, aber wissenschaftlich seriös ·
regional ohne Tourismussprache · keine Schuldkommunikation · Headline maximal 9 Wörter ·
verboten: „grün", „retten", „Öko-Check", „Zukunftshaus".

**Technischer Rahmen:** Die Headline ist in `src/config/translations.ts` in `title` und
`accent` geteilt; `accent` wird farblich abgesetzt (Salbei, siehe Kontrastmessung in
PR 21). Alle Texte existieren dreifach: `de`, `it`, `en`.

---

## Stand vor PR 17 (zum Zurückrollen)

Zwischenstand kurz vor der Umsetzung, falls die alte Fassung wiederhergestellt werden soll:

| Element | Text |
|---|---|
| Eyebrow | Interaktive Biodiversitätsplattform für Südtirol |
| Headline | Dein Alltag prägt Lebensräume. |
| Subheadline | Erkunde in einer interaktiven Haus-Tour, wie alltägliche Entscheidungen auf Natur und Ressourcen wirken – und entdecke passende Projekte aus Südtirol. |
| CTA 1 | Haus-Tour starten · 3–5 Min. |
| CTA 2 | Projekte entdecken |
| Microcopy | — (Element existierte nicht) |

Davor, zu Beginn des Reviews: „Biodiversität beginnt im Alltag" / „Verstehe deinen
Einfluss. Stärke lokale Natur." / „Entdecke spielerisch, wie deine Entscheidungen
Biodiversität beeinflussen …"

Zwei inhaltliche Schwächen: **„spielerisch"** untergräbt die Seriosität, die das
Eurac-Zitat daneben aufbaut. **„Stärke lokale Natur"** verspricht eine Wirkung, die erst
nach der Projektunterstützung eintritt — der Hero löst sie nicht ein.

---

## Variante 1 — Verbundenheit

Setzt die Markenidee an den Anfang: Die Grenze zwischen drinnen und draußen gibt es nicht.

| Element | Text |
|---|---|
| Eyebrow | Lebensräume hängen zusammen |
| Headline (7 W.) | Dein Zuhause endet nicht an der Haustür. |
| — `title` | Dein Zuhause endet nicht |
| — `accent` | an der Haustür. |
| Subheadline | In wenigen Minuten zeigt die Tour, wie Wohnen, Essen und Wege die Lebensräume in Südtirol prägen — und welche geprüften Projekte genau dort ansetzen. |
| CTA 1 | Tour starten |
| CTA 2 | Projekte ansehen |
| Microcopy | 3–5 Minuten · ohne Anmeldung |

## Variante 2 — Ursache und Wirkung

Konkretes Versprechen statt Appell; die Zahl macht die Tour greifbar.

| Element | Text |
|---|---|
| Eyebrow | Vom Wohnzimmer in die Landschaft |
| Headline (6 W.) | Was drinnen zählt, wirkt draußen weiter. |
| — `title` | Was drinnen zählt, |
| — `accent` | wirkt draußen weiter. |
| Subheadline | Sieben Räume, kurze Fragen, ein persönliches Ergebnis: Du siehst, welche Entscheidungen Lebensräume entlasten — und findest Projekte, die dort weiterarbeiten. |
| CTA 1 | Haus-Tour starten |
| CTA 2 | Projekte entdecken |
| Microcopy | Jederzeit unterbrechbar, dein Stand bleibt erhalten |

## Variante 3 — Mitgestaltung

Verschiebt die Rolle vom Betrachter zum Beteiligten; stärkste Handlungsrichtung ohne Schuld.

| Element | Text |
|---|---|
| Eyebrow | Biodiversitätsplattform Südtirol |
| Headline (5 W.) | Gestalte mit, wo Lebensräume entstehen. |
| — `title` | Gestalte mit, |
| — `accent` | wo Lebensräume entstehen. |
| Subheadline | Erst verstehen, dann mitwirken: Die Tour übersetzt deinen Alltag in Wirkung und führt dich zu Projekten, die in Südtirol Lebensräume schaffen und pflegen. |
| CTA 1 | Wirkung entdecken |
| CTA 2 | Projekte unterstützen |
| Microcopy | Beginnt bei dir zuhause · 3–5 Minuten |

## Variante 4 — Regionale Verankerung

Nennt die Lebensräume beim Namen; regional durch Sache, nicht durch Panorama.

| Element | Text |
|---|---|
| Eyebrow | Alltag und Landschaft in Südtirol |
| Headline (6 W.) | Südtirols Lebensräume beginnen in deinem Zuhause. |
| — `title` | Südtirols Lebensräume |
| — `accent` | beginnen in deinem Zuhause. |
| Subheadline | Wildbienen, Streuobstwiesen, Moore: Die Tour verbindet deine Entscheidungen mit den Lebensräumen vor der Tür — und mit den Menschen, die sie erhalten. |
| CTA 1 | Haus-Tour starten |
| CTA 2 | Projekte in deiner Nähe |
| Microcopy | Wenige Minuten · ohne Anmeldung |

## Variante 5 — Nachvollziehbarkeit

Zahlt auf das Eurac-Zitat ein; Seriosität als Unterschied zu klassischen Spendenseiten.

| Element | Text |
|---|---|
| Eyebrow | Wissen, das im Alltag ankommt |
| Headline (6 W.) | Verstehe, was dein Alltag draußen bewirkt. |
| — `title` | Verstehe, was dein Alltag |
| — `accent` | draußen bewirkt. |
| Subheadline | Die Tour macht Zusammenhänge sichtbar — vereinfacht, aber nachvollziehbar — und führt zu Projekten aus Südtirol, deren Fortschritt offen einsehbar bleibt. |
| CTA 1 | Zusammenhänge entdecken |
| CTA 2 | Projekte ansehen |
| Microcopy | 3–5 Minuten · Ergebnis bleibt gespeichert |

---

## Bewertung (1–5)

| Variante | Klarheit | Eigenständigkeit | Emotionalität | Conversion | Markenpassung | Σ |
|---|---|---|---|---|---|---|
| 1 Verbundenheit | 4 | 5 | 5 | 4 | 5 | **23** |
| 2 Ursache/Wirkung | 5 | 3 | 3 | 5 | 4 | **20** |
| 3 Mitgestaltung | 4 | 4 | 4 | 4 | 5 | **21** |
| 4 Regional | 5 | 4 | 4 | 4 | 4 | **21** |
| 5 Nachvollziehbarkeit | 4 | 3 | 2 | 3 | 4 | **16** |

- **1** trägt die Markenidee am reinsten und bleibt hängen, sagt aber nicht, was einen erwartet.
- **2** ist am schnellsten verstanden und verkauft die Tour am besten, klingt austauschbarer.
- **3** hat die stärkste Handlungsrichtung, ist als Einstieg für Erstbesucher eine Spur früh.
- **4** verankert regional ohne Tourismussprache, wirkt aber behauptend.
- **5** ist die seriöseste und die kälteste; verdoppelt, was das Zitat daneben schon leistet.

**Empfehlung:** Headline und Eyebrow aus **Variante 1**, Subheadline aus **Variante 2**.
Die Metapher öffnet, das konkrete Versprechen fängt auf. Primärer CTA „Tour starten",
solange die Umbenennung der Haus-Tour (PR 10) offen ist.

**Belegbarkeit der Microcopy:** Es gibt keine Anmeldung, der Tour-Stand liegt im
localStorage (`balance-house-tour-v2`), die 3–5 Minuten stehen bereits in der
Kennzahlenleiste, die Tour umfasst sieben Räume (`availableRooms`).

---

## Umsetzung als PRs

### PR 17 — `feat/hero-copy-connection`

Neue Hero-Texte nach Empfehlung (Variante 1 + Subheadline aus 2) in `de`, `it`, `en`.

- `src/config/translations.ts`: `hero.eyebrow`, `hero.title`, `hero.accent`, `hero.copy`
- „spielerisch" und „Stärke lokale Natur" entfallen ersatzlos
- IT/EN sind Übersetzungen der Bedeutung, keine Wort-für-Wort-Übertragung;
  Wortgrenze der Headline gilt pro Sprache
- **Entscheidung offen:** Falls nicht Variante 1+2, die gewählte Variante aus diesem
  Dokument übernehmen — die Struktur der PRs bleibt gleich
- **Akzeptanz:** Headline ≤ 9 Wörter in allen drei Sprachen; keines der verbotenen
  Wörter im Hero; Umbruch bei 390, 768, 1280, 1920 px geprüft (`accent` beginnt auf
  neuer Zeile, keine Waisenwörter)

### PR 18 — `feat/hero-microcopy`

Microcopy-Zeile unter dem primären CTA einführen — das Element existiert bisher nicht.

- `src/components/home/hero.tsx`: Zeile unter der CTA-Gruppe, `text-xs`, gedeckt
  (`text-white/70`), mit demselben Textschatten wie die Subheadline
- `src/config/translations.ts`: neuer Schlüssel `hero.microcopy` in allen drei Sprachen
- Nur belegbare Aussagen (siehe oben); keine erfundenen Zahlen
- **Akzeptanz:** Kontrast der Zeile ≥ 4,5:1 gegen den gemessenen Hintergrund
  (Messskript: `scratchpad/contrast.py`-Ansatz, Glyphenmaske); Zeile bricht auf 390 px
  nicht in drei Zeilen um

### PR 19 — `fix/hero-cta-name-neutral`

CTA-Beschriftungen und Kennzahlen vom alten Produktnamen lösen, bis PR 10 entschieden ist.

- `hero.tour`: „Haus-Tour starten" → „Tour starten" (analog IT/EN)
- `hero.stats[0]`: „für deinen Einstieg in die Haus-Tour" → „für deinen Einstieg"
- **Akzeptanz:** Der String „Haus-Tour" kommt im Hero in keiner Sprache mehr vor;
  nach PR 10 wird der neue Name an genau diesen Stellen wieder eingesetzt

### PR 20 — `fix/hero-copy-locale-parity`

Prüfen, dass die drei Sprachfassungen dieselbe Aussage treffen — der Ist-Stand weicht ab
(z. B. EN „right where you live" gegen DE „direkt vor deiner Haustür", IT ohne die
Zusage „geprüft"), was bei den neuen Texten nicht wieder passieren soll.

- Gegenüberstellung aller `hero.*`-Schlüssel in einer Tabelle im PR-Text
- Regionalbezug in IT/EN ausschreiben („Alto Adige" / „South Tyrol"), nicht weglassen
- **Akzeptanz:** Jede Aussage der deutschen Fassung ist in IT und EN vorhanden;
  Länge der Subheadline in allen Sprachen innerhalb ±15 % der deutschen Fassung

### PR 21 — `fix/hero-accent-contrast` *(bereits umgesetzt, hier zur Nachverfolgung)*

Die Akzentfarbe der Headline war auf dem Foto nicht lesbar (Gold `#d7a64b`: 1,4:1 mobil,
2,2:1 Desktop — nötig 3:1). Umgestellt auf Salbei (3,9:1 / 4,2:1), Verläufe folgen jetzt
dem Text statt der ganzen Bildfläche. Bei neuer Headline-Farbe erneut messen.


---

## Umsetzungsprotokoll (27.07.2026)

PR 17–20 sind umgesetzt, PR 21 war bereits erledigt. Gemessene Kontrastwerte hinter den
tatsächlichen Glyphen (95. Perzentil des hellsten Untergrunds, Messverfahren:
Screenshot mit und ohne Text, Differenzmaske):

| Element | 600 px | 1600 px | gefordert |
|---|---|---|---|
| Headline | 7,21:1 | 8,07:1 | 3:1 (große Schrift) |
| Akzentzeile | 4,77:1 | 5,96:1 | 3:1 (große Schrift) |
| Subheadline | 6,95:1 | 7,05:1 | 4,5:1 |
| Microcopy | 8,56:1 | 10,91:1 | 4,5:1 |
| Prozessliste | 5,98:1 | 9,55:1 | 4,5:1 |
| Trust-Zeile | 9,05:1 | 8,81:1 | 4,5:1 |

Zwei Korrekturen, die während der Umsetzung nötig wurden:

1. **Mobiler Verlauf ergänzt.** Auf schmalen Displays steht der Text im oberen Drittel
   (7–48 % der Hero-Höhe), wo der Grundverlauf am schwächsten ist. Subheadline und
   Prozessliste lagen dort bei 3,97:1 und 3,36:1. Ein zusätzlicher Verlauf von oben
   (`sm:hidden`) behebt das; der Desktop-Verlauf bleibt unverändert.
2. **Akzentzeile als eigene Zeile.** Bei `title`/`accent` im Fließtext brach der
   Farbwechsel mitten in der Zeile um („… endet nicht **an** / **der Haustür.**").
   Die Akzentspanne ist jetzt `block`.

Offen und außerhalb dieser PRs: Der Header-CTA heißt weiterhin „Haus-Tour starten"
(`headerCta`), die Navigation ebenso — beides gehört zu PR 10 (Umbenennung).
