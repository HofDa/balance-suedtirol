# UX-Review Lebensraum-Check — Journey, Eingabe, Bilanz (Stand 10.08.2026)

**Fokus:** Der Weg durchs Haus soll intuitiver werden — besonders die
Eingabe-Ansicht (Objekt/Frage) und die Feedback-/Bilanz-Ansichten.
**Haltungsrahmen:** rooted in science and data — jede Zahl braucht Anker,
Quelle und ausgewiesene Bilanzgrenze (vgl. PRODUCT.md, Prinzip 2).
**Nummerierung:** setzt `docs/UX-REVIEW.md` fort (dort PR 1–21).

---

## 1. Diagnose des Kernproblems

Die Tour hat drei strukturelle Reibungen, aus denen fast alle Einzelbefunde
folgen:

1. **Doppelte Interaktion pro Objekt.** Jedes der 21 Objekte verlangt heute
   zwei Handlungen an zwei Orten: erst liest man im Panel „Entdecke: X",
   dann klickt man das Objekt in der Szene an, dann antwortet man, dann
   führt „Weiter entdecken" zurück in den Entdecken-Zwischenzustand — und
   der nächste Klick muss wieder in der Szene stattfinden
   (`tour-app-shell.tsx:59–68`, `object-context-panel.tsx:261–284`).
   Das Auge pendelt pro Frage zweimal zwischen Szene und Panel.
2. **Keine sichtbare Reiseroute.** Es gibt keine dauerhafte Raum-Navigation;
   die Werkzeugleiste kennt nur „Haus", einen Objektzähler und Reset
   (`tour-toolbar.tsx`). Wo man im Haus steht und was noch fehlt, ist nur
   über den Umweg Hausübersicht ablesbar. DESIGN.md beschreibt die
   Raumleiste als Signature-Element — sie existiert im Code nicht mehr.
3. **Zwei konkurrierende Zahlensysteme mit gleichen Namen.** Die drei
   physischen Kennzahlen (CO₂ kg, Trinkwasser L, Endenergie kWh) und die
   vier qualitativen 0–100-Indizes (Biodiversität, CO₂, Wasser, Ressourcen)
   stehen auf der Bilanz nebeneinander; „CO₂" und „Wasser" bezeichnen dort
   zwei verschiedene Größen auf demselben Bildschirm
   (`tour-results.tsx:55–115`, `scoring.ts`, `calculator.ts:93–125`).
   Für ein Produkt, das mit Wissenschaftlichkeit argumentiert, ist das die
   teuerste Unschärfe.

Dazu ein handfester Layout-Defekt: Die Ergebnisansicht rendert in der linken
Rasterspalte der App-Shell. Mobil bedeutet das: Die gesamte Bilanz scrollt in
einem 42dvh hohen Fenster, darunter steht eine fast leere Hilfsspalte
(„Weiter geht es im Haus") (`tour-app-shell.tsx:92–96, 171–186`).

---

## 2. PR-Liste

**Umsetzungsstand (Branch `feat/tour-journey-ux`):**

- **Umgesetzt:** PR 22, 23, 24, 25, 26, 27, 29, 31, 32, 33, 34, 35, 36, 37, 38.
- **Teilweise:** PR 28 — die Fragen zeigen jetzt ihren Rechenweg samt Annahme,
  einzeln gepflegt in `questionBasis` und aus denselben Konstanten gespeist wie
  der Rechner. Bewusst *nicht* als „Quelle" ausgewiesen: `docs/BILANZ-FAKTOREN.md`
  enthält Faktoren und Annahmen, aber keine externen Belegstellen. Solange die
  fehlen, wäre das Wort „Quelle" selbst eine unbelegte Behauptung. Offen bleiben
  echte Quellenangaben je Faktorgruppe und die Anker auf der Methodikseite.
- **Teilweise:** PR 30 — die Zuordnung Dimension → Lebensraum ist deklarativ und
  deckt alle vier Dimensionen mit Begründung ab. Ob der übergebene Filter auf
  `/projekte` tatsächlich greift, hängt weiter an PR 7 aus `docs/UX-REVIEW.md`.
- **Offen:** PR 39 (`window.confirm` beim Reset), PR 40 (einheitlicher
  Vereinfachungs-Disclaimer).

Schweregrade: P0 = Journey bricht / Kernaussage unklar · P1 = deutlich
spürbar · P2 = Feinschliff.

### P0 — Journey-Struktur & Bilanz-Klarheit

| # | PR | Inhalt | Akzeptanz |
|---|----|--------|-----------|
| 22 | `feat/tour-direct-question-flow` | Pflicht-Szenenklick abschaffen: „Weiter" öffnet direkt die nächste offene Frage (`objectOpen` bleibt `true`), die Szene folgt passiv mit Hervorhebung. Szenenklick bleibt als freier Direktzugriff auf jedes Objekt. Der „Entdecke:"-Zwischenzustand erscheint höchstens einmal beim Raumeintritt, nicht vor jedem Objekt. | Ein Raum ist komplett beantwortbar, ohne die Szene je anzuklicken; Szenenklick springt weiterhin zu jedem Objekt; Interaktionen pro Objekt: 1 Antwort + 1 Weiter. |
| 23 | `fix/tour-results-fullscreen` | `view === "results"` verlässt das Zweispalten-Raster und rendert als eigene, volle Scrollfläche; die Hilfsspalte „Weiter geht es im Haus" entfällt (der CTA wandert in die Bilanz selbst). | Bei 320/390/430 px kein verschachteltes Scrollen; Bilanz nutzt die volle Höhe; kein doppelter „Zur Hausübersicht"-Pfad. |
| 24 | `fix/metric-vs-score-terminology` | Die vier 0–100-Indizes umbenennen bzw. klar von den Messwerten trennen: eine Sektion „Gerechnet" (kg, L, kWh — mit Bilanzgrenze) und eine Sektion „Eingeschätzt" (qualitative Indizes) mit einem Satz zur Skala (Basis 50, Spanne 0–100, didaktisch vereinfacht). Kein Label darf doppelt vergeben sein. | Auf der Bilanz bezeichnet jeder Begriff genau eine Größe; die 0–100-Skala ist am Ort der Zahl erklärt; DE/IT/EN identisch. |
| 25 | `feat/results-narrative-structure` | Bilanz als Erzählreihenfolge statt Kachelteppich: ① Abdeckung („4 von 6 Räumen erfasst — Wohnen, Ernährung, Mobilität"), ② die drei Messwerte als Balken gegen den Durchschnitt (die vorhandene `MetricBars`-Komponente wird auf der Bilanz heute gar nicht genutzt) mit Marke für den Durchschnitt und für das Paris-Ziel 1.500 kg (`co2TargetKg` existiert, erscheint aber nur im Fließtext), ③ die Indizes, ④ Empfehlung → Projekte. Biodiversität — der Kern der Plattform — muss im ersten Screenful sichtbar sein, nicht als kleinste Kachel. | Jede Zahl hat ihren Vergleichsanker im selben Blickfeld; Biodiversität im ersten Screenful; „x % des Durchschnitts" nie ohne sichtbaren Balken/Anker. |

### P1 — Orientierung, Eingabe, wissenschaftliche Belege

| # | PR | Inhalt | Akzeptanz |
|---|----|--------|-----------|
| 26 | `feat/tour-room-navigation` | Dauerhafte Raumleiste gemäß DESIGN.md (Signature): Chips je Raum mit Zustand (aktiv = Bergwald-Fläche, abgeschlossen = Häkchen, begonnen = Punkt), horizontal scrollbar mit Maskenausblendung. Ersetzt den Umweg über die Hausübersicht als einzige Raumwechsel-Route. | Raumwechsel aus jedem Zustand in ≤ 1 Klick; aktueller Raum immer sichtbar; Tastatur-navigierbar. |
| 27 | `fix/question-panel-hierarchy` | Das Fragen-Panel trägt heute 9 Informationsschichten (2 Fortschrittsbalken, 3-Kennzahlen-Ticker, Eyebrow, Objektlabel, Frage, Optionen mit Werten, Wirkungskasten, „Noch möglich", Beschreibung, Scope-Note). Ordnung: Frage → Optionen → Wirkung; der Raum-Fortschritt zieht in die Raumleiste (PR 26), der Kennzahlen-Ticker erscheint erst, sobald er sich ändert, Beschreibung/Scope-Note als eingeklappte „Mehr dazu"-Zeile. | 4-Optionen-Frage passt bei 390×844 ohne Panel-Scroll; ≤ 4 gleichzeitig sichtbare Informationsgruppen (Cognitive-Load-Checkliste). |
| 28 | `feat/question-sources` | Jede Frage bekommt einen sichtbaren Beleg: „Quelle"-Aufklapper je Frage mit Faktor, Annahme und Quellenangabe aus `docs/BILANZ-FAKTOREN.md`; die Methodik-Seite erhält Anker je Faktorgruppe. Heute erscheint im UI keine einzige Quelle, obwohl die Faktoren dokumentiert sind. | Jede Frage exponiert ≥ 1 Quelle; Anker-Links aus Tour und Bilanz in die Methodik funktionieren; keine Aussage ohne Beleg im Eingabefluss. |
| 29 | `feat/results-partial-honesty` | Unvollständige Bilanz ehrlich rahmen: fehlende Räume als Chips mit direktem Einstieg („+ Küche erfassen"), ein Satz, dass die Summen mit jedem Raum steigen. Absolute Zahlen ohne Abdeckungshinweis wirken vollständiger, als sie sind. | Bei < 6 Räumen nennt die Bilanz die fehlenden Räume und verlinkt sie; Formulierung in DE/IT/EN inhaltsgleich. |
| 30 | `feat/results-recommendation-engine` | Die hartkodierte IIFE-Empfehlung (`tour-results.tsx:142–179`, Kommentar „PR #6") durch eine deklarative Zuordnungstabelle Dimension → Lebensraum-Kategorie ersetzen, alle vier Dimensionen abdecken, Begründungssatz je Zuordnung; Filterübergabe an `/projekte` verifizieren (hängt an alter PR 7). | Link landet auf vorgefilterter Liste mit sichtbarem Filter-Chip; Zuordnung vollständig und aus Daten, nicht aus if-Ketten. |
| 31 | `feat/room-completion-insight` | Raumabschluss-Screen von generischem Lob auf Erkenntnis umstellen: größter Verursacher des Raums („Heizen trägt x % deiner bisherigen Bilanz") und größter verbleibender Hebel (aggregiertes `bestCaseSaving` je Raum). Die Daten liegen im Calculator bereits vor. | Jeder Raumabschluss nennt einen belegbaren Raum-Befund mit Zahl; der Weiter-CTA bleibt die dominante Aktion. |
| 32 | `fix/impact-feedback-comparison` | `InputImpactFeedback` vergleicht den Wert einer einzelnen Eingabe mit dem Jahres-Durchschnitt der ganzen Kategorie („x % des Vergleichswerts") — Einzelposten gegen Gesamtdurchschnitt ist kein Like-for-like-Vergleich. Reframen als Anteil an der eigenen bisherigen Jahressumme oder gegen die Spannweite der Frage. | Jeder Prozentwert vergleicht Gleiches mit Gleichem; Beschriftung nennt die Bezugsgröße explizit. |
| 33 | `feat/tour-resume-affordance` | Hausübersicht bei vorhandenem Spielstand: statt des Drei-Schritte-Tutorials ein primärer „Weitermachen: {Raum} ({n}/{m})"-Einstieg in den letzten unfertigen Raum; Tutorial nur beim ersten Besuch. Spielstand liegt bereits in localStorage. | Wiederkehrende Nutzer erreichen ihre nächste offene Frage in 1 Klick; Erstbesucher sehen weiterhin die Anleitung. |
| 34 | `fix/tour-toolbar-results-label` | Der Ergebnis-Button liest sich als Zähler („12/21 Objekte"), nicht als Aktion. Label „Bilanz" + Zähler; im deaktivierten Zustand Hinweis, wodurch er sich aktiviert. | Nutzer können die Aktion ohne Icon-Deutung benennen; aria-Label und sichtbares Label decken sich. |

### P2 — Feinschliff & Effizienz

| # | PR | Inhalt |
|---|----|--------|
| 35 | `fix/answer-back-navigation` | „Zurück"-Weg zum vorherigen Objekt im Raum (Button + Pfeiltasten); heute gibt es nur vorwärts oder Szenenklick. |
| 36 | `feat/tour-keyboard-flow` | Zifferntasten 1–4 wählen Optionen, Enter führt weiter — der Power-Pfad für die Prüfsituation der Fördergeber am Desktop. |
| 37 | `fix/aria-live-scope` | `aria-live="polite"` umschließt das gesamte Panel (`object-context-panel.tsx:200`); jede Navigation liest alles neu vor. Live-Region auf den Wirkungskasten begrenzen. |
| 38 | `feat/option-value-clarity` | Werte je Option: „pro Jahr" einmal als Spaltenkopf statt implizit; Zahlen bis zur Auswahl abgedämpft, danach betont; „keine Emissionen" → „keine direkten Emissionen" (Bilanzgrenze!). |
| 39 | `feat/custom-reset-dialog` | = alte PR 12: `window.confirm` beim Reset (`tour-app-shell.tsx:83`) durch gestalteten Dialog oder Undo-Pfad ersetzen. |
| 40 | `feat/uncertainty-disclaimer-unified` | Der Satz zur didaktischen Vereinfachung als einheitliches Muster auf Intro und Bilanz (folgt dem Prototyp-Badge aus alter PR 11); „Alle Faktoren … stehen in der Methodik" (`tour-results.tsx:87–90`) endlich verlinken. |

---

## 3. Abhängigkeiten & Reihenfolge

- **PR 26 vor PR 27**: Der Raum-Fortschritt kann erst aus dem Panelkopf
  verschwinden, wenn die Raumleiste ihn trägt.
- **PR 24 vor PR 25**: Erst Begriffe trennen, dann die Erzählstruktur bauen —
  sonst wird die falsche Taxonomie schön layoutet.
- **PR 30 hängt an alter PR 7** (echte Filter auf `/projekte`).
- **PR 22, 23** sind unabhängig und die beiden größten Hebel; mit ihnen
  beginnen.

## 4. Nicht anfassen

- Die Bilanzgrenzen-Logik im Calculator (drei bewusst unterschiedliche
  Grenzen, dokumentiert) — sie ist die wissenschaftliche Substanz; die PRs
  machen sie sichtbar, nicht anders.
- Terrakotta/Lehm-Semantik, Werte-Tafel, `tabular-nums`, Reduced-Motion-Pfad.
- Die ehrliche Tonalität der Abschluss- und Hinweistexte.
