# Hero b*alance — Accessibility- und Performance-Audit

Stand 27.07.2026 · geprüft an `http://localhost:3000/de` (Dev-Server)
Viewports: 1440×900, 640×400 (≙ 200 % Zoom), 390×844, 320×512 (≙ 400 % Zoom)
Referenz: WCAG 2.2 Level AA, ergänzt um relevante AAA-Kriterien

## Messverfahren

Kontraste sind **hinter den tatsächlichen Glyphen** gemessen, nicht anhand deklarierter
Farben: Screenshot mit Text, Screenshot mit `visibility: hidden`, Differenzmaske,
95. Perzentil des ungünstigsten Hintergrunds. Nur so ist ein Foto als Untergrund
bewertbar.

**Grenze des Verfahrens:** Bei kleiner fetter Schrift auf Volltonfläche drückt die
Kantenglättung den Messwert. Der primäre CTA misst 4,43:1, rechnerisch exakt sind es
**6,19:1** (`#183229` auf `#d7a64b`). Für Volltonflächen gilt der rechnerische Wert.

---

## 1. Problemliste

### ✅ P0 — Inhalt hängt am Ablauf der Animation *(behoben 27.07.2026)*

**Nachweis:** Mit angehaltenen Animationen (`Animation.setPlaybackRate(0)`) steht der
gesamte Hero auf `opacity: 0` — Eyebrow, Headline, Beschreibung, CTAs. Die Elemente
sind im DOM, fokussierbar und anklickbar, aber unsichtbar.

**Ursache:** `.hero-reveal { animation: hero-content-in … both; }` gilt unbedingt. Der
`from`-Zustand (`opacity: 0`) ist damit der Ruhezustand, solange die Animation nicht
läuft oder ihre Verzögerung noch andauert.

**Betroffen:** WCAG 1.4.13 sinngemäß, vor allem aber die Projektvorgabe „vollständiger
Inhalt auch bei deaktivierten Animationen". Reale Auslöser: angehaltene Animationen
durch Erweiterungen, Druckvorschau vor Ablauf der Sequenz, Browser mit deaktivierten
CSS-Animationen, Testumgebungen mit eingefrorener Zeit.

**Umgesetzt:** Animation nur additiv, sichtbar ist der Grundzustand.

```css
/* Grundzustand: sichtbar. Keine Deklaration nötig. */
@media (prefers-reduced-motion: no-preference) {
  .hero-reveal { animation: hero-content-in 450ms cubic-bezier(.22,1,.36,1) both; }
  .header-reveal { animation: header-in 400ms cubic-bezier(.22,1,.36,1) both; }
}
@media print {
  .hero-reveal, .header-reveal { animation: none; opacity: 1; transform: none; }
}
```

Der Sonderfall im `prefers-reduced-motion: reduce`-Block ist entfallen, weil die
Animation dort gar nicht mehr greift.

**Nachgemessen nach der Umstellung** (Deckkraft von Eyebrow, Headline, Beschreibung, CTAs):

| Szenario | vorher | nachher |
|---|---|---|
| Animationen per CSS abgeschaltet (`animation: none !important`) | 0 · 0 · 0 · 0 | 1 · 1 · 1 · 1 |
| `@keyframes` nicht verfügbar | 0 · 0 · 0 · 0 | 1 · 1 · 1 · 1 |
| Druckvorschau | 0 · 0 · 0 · 0 | 1 · 1 · 1 · 1 |
| `prefers-reduced-motion: reduce` | 1 · 1 · 1 · 1 | 1 · 1 · 1 · 1, `animationName: none` |
| Normalfall | Sequenz läuft | Sequenz läuft unverändert |

**Bewusst nicht abgedeckt:** Eine über die Devtools *angehaltene* Animation
(`Animation.setPlaybackRate(0)`) friert weiterhin im Startzustand ein — das ist bei
jeder verzögerten CSS-Einblendung so und über CSS nicht erkennbar. Wer auch diesen Fall
ausschließen will, animiert die Hero-Inhalte ausschließlich mit `transform` und lässt
`opacity` bei 1: Der Inhalt wäre dann selbst bei eingefrorener Animation lesbar, nur um
12 px versetzt. Das kostet die Überblendung.

### ✅ P0 — Kein Sprunglink zum Hauptinhalt *(behoben 27.07.2026)*

**Nachweis:** Erster Link im DOM ist das Logo. Tastaturnutzende durchlaufen sieben
Stationen (Logo, drei Navigationspunkte, drei Sprachen), bevor der primäre CTA kommt —
auf jeder Unterseite erneut.

**Betroffen:** WCAG 2.4.1 Bypass Blocks (Level A) — Verstoß.

**Umgesetzt:** Erstes Element im `body`, sichtbar bei Fokus.

```tsx
<a href="#hauptinhalt"
   className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]
              focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm
              focus:font-semibold focus:text-[var(--color-ink)] focus:outline-none
              focus:ring-2 focus:ring-[var(--color-forest)]">
  Zum Hauptinhalt springen
</a>
```

Dazu `<main id="hauptinhalt" tabIndex={-1}>` in `src/app/[locale]/layout.tsx`.

**Nachgemessen:** Erster Tabstopp der Seite ist „Zum Hauptinhalt springen" (247×44 px),
der Fokus landet nach der Aktivierung auf `MAIN#hauptinhalt`. Übersetzt als
`skipToContent` in `de`, `it`, `en` — im HTML aller drei Sprachen verifiziert.

### 🟠 P1 — Akzentzeile der Headline unter 3:1 auf Mobil

**Nachweis:** 390 px: **2,78:1** gemessen, nötig sind 3:1 für große Schrift (42 px).
Desktop 1440 px: 3,42:1 — knapp bestanden.

**Betroffen:** WCAG 1.4.3 Contrast (Minimum), Level AA — Verstoß auf Mobil.

**Ursache:** Gold `#d7a64b` (relative Leuchtdichte 0,418) verlangt einen Hintergrund
unter 0,107. Gemessen liegt er bei rund 0,118 — etwa 11 % zu hell.

**Drei Lösungen, absteigend nach Bildqualität:**

1. Akzentfarbe nur für Text auf eigener Fläche, in der Headline stattdessen Salbei
   `var(--color-sage)` (dort bereits mit 4,4:1 gemessen).
2. Mobilen Verlauf im Bereich der zweiten Headline-Zeile um etwa 0,08 Alpha verstärken
   (`hero-backdrop.tsx`, zweite Ebene, Stützstelle bei 34 %).
3. Dunkleres Gold als eigenes Token, etwa `#b8862f` (Leuchtdichte 0,25) — ändert
   allerdings die Markenanmutung.

### 🟠 P1 — Externer Link ohne Hinweis auf neuen Tab

**Nachweis:** Der Quellenlink „ORF Tirol, 04.09.2025" trägt `(öffnet in neuem Tab)` als
`sr-only`. Der Lizenzlink „CC BY-SA 2.0" öffnet ebenfalls `target="_blank"`, ohne
Hinweis.

**Betroffen:** WCAG 3.2.5 Change on Request (AAA), G201 als bewährte Praxis.

**Lösung:** Denselben `sr-only`-Zusatz ergänzen, besser: kleine Komponente
`ExternalLink` mit eingebautem Hinweis und `rel="noreferrer"`, damit das nicht pro
Fundstelle entschieden wird.

### 🟡 P2 — Touch-Ziele des Sprachumschalters

**Nachweis:** Desktop 36×36 px, mobiles Menü 44×44 px.

**Betroffen:** WCAG 2.5.8 Target Size (Minimum, AA) verlangt 24×24 — **bestanden**.
2.5.5 (AAA) verlangt 44×44 — auf dem Desktop nicht erreicht.

**Lösung (optional):** `min-h-11 min-w-11` auch in der Desktop-Variante; die Kopfzeile
ist 72 px hoch und trägt das.

Inline-Links im Fließtext („Methodik & Prüfkriterien" 125×20, „CC BY-SA 2.0" 67×12)
fallen unter die Ausnahme *Inline* von 2.5.8 und sind konform.

### 🟡 P2 — Zwei Landmarks mit identischem Namen

**Nachweis:** `nav[Language / Lingua / Sprache]` existiert zweimal (Desktop- und
Mobilvariante). Beim Durchblättern der Landmarks entstehen zwei gleich benannte
Einträge, sobald beide im Baum liegen.

**Lösung:** Der jeweils versteckten Variante `aria-hidden="true"` geben oder die
Sprachnavigation einmal rendern und per CSS umpositionieren.

### 🟡 P2 — `fetchpriority` fehlt am Bild

**Nachweis:** Das `<img>` trägt `decoding="async"`, aber kein `fetchpriority="high"`.
Der Preload-Link im Head ist vorhanden, das Bild ist LCP-Element.

**Lösung:** Prüfen, ob `priority` korrekt durchgereicht wird; andernfalls
`fetchPriority="high"` explizit setzen.

---

## 2. Was geprüft wurde und in Ordnung ist

| Prüfpunkt | Ergebnis |
|---|---|
| Tastaturreihenfolge | 12 Stationen, DOM-Reihenfolge = visuelle Reihenfolge, keine Falle |
| Fokuszustände | alle 12 Stationen mit sichtbarer Veränderung (Pixeldiff 353–15 155 px) |
| Unsichtbare Bedienelemente | Header-CTA korrekt `aria-hidden="true"` + `tabindex="-1"`, beides beim Einblenden entfernt |
| Überschriftenhierarchie | genau ein `h1`, danach `h2` → `h3`, keine Sprünge |
| Landmarks | `header`, `nav`, `main`, `section[aria-labelledby]`, `footer` |
| Hero-Bild | `alt=""` im `aria-hidden`-Container, Nachweis als echter Text daneben |
| Sprachumschalter | `hreflang`, `lang`, `aria-current="page"`, Eigenbezeichnung „Deutsch/Italiano/English" |
| `html lang` | `de` / `it` / `en` serverseitig korrekt |
| prefers-reduced-motion | alle Reveal-Elemente `animation: none`, `opacity: 1` |
| Layout Shift | CLS 0,0000 bei 1600, 390 und reduzierter Bewegung |
| LCP-Element | Hintergrundbild, nicht die Headline — Text-Delays kosten keine LCP |
| Reflow | kein horizontaler Overflow bei 640 px (200 %) und 320 px (400 %) |
| Interaktion während der Animation | primärer CTA ab dem ersten Frame per Treffertest erreichbar |

### Kontraste im Detail

| Element | 1440 px | 390 px | nötig |
|---|---|---|---|
| Eyebrow | 7,38:1 | 6,25:1 | 4,5:1 |
| Headline Zeile 1 | 8,07:1 | 6,52:1 | 3:1 |
| **Headline Akzentzeile** | 3,42:1 | **2,78:1** | 3:1 |
| Beschreibung | 7,91:1 | 8,91:1 | 4,5:1 |
| CTA primär (Label auf Gold) | 6,19:1 rechnerisch | 6,19:1 | 4,5:1 |
| CTA sekundär | 7,65:1 | 11,06:1 | 4,5:1 |
| Trust-Zeile | 7,33:1 | 8,12:1 | 4,5:1 |
| Methodik-Link | 5,21:1 | 8,09:1 | 4,5:1 |
| Bildnachweis | 5,04:1 | 6,97:1 | 4,5:1 |
| Lizenzlink | 4,64:1 | — | 4,5:1 |

---

## 3. Performance

| Messwert | 1600×1000 | 390×844 |
|---|---|---|
| LCP | 1940 ms | 2180 ms |
| LCP-Element | `img.hero-image` | `img.hero-image` |
| CLS | 0,0000 | 0,0000 |

**Einordnung:** Werte stammen vom Dev-Server mit Turbopack und ungecachter
Bildoptimierung; produktiv liegen sie deutlich niedriger. Auffällig ist trotzdem der
Anstieg gegenüber der vorherigen Hero-Fassung (952 ms bei gleicher Umgebung): Der Hero
ist auf `min-h-[calc(100svh-4.5rem)]` gewachsen, das Bild deckt damit eine größere
Fläche ab und wird in einer höheren Auflösungsstufe geladen.

**Maßnahmen:**

1. LCP produktiv gegen ein Budget von 2,5 s messen, nicht im Dev-Server.
2. `sizes="100vw"` ist korrekt; prüfen, ob `quality={82}` bei 2560 px Quellbreite nötig
   ist oder 70 genügt — das Bild ist stark abgedunkelt.
3. `fetchpriority="high"` am `<img>` sicherstellen (siehe P2).
4. Kein weiteres Element mit `priority` laden, damit die Bandbreite beim Hero bleibt.

---

## 4. Akzeptanzkriterien für die Umsetzung

**P0 Animation**
- [ ] Bei `Animation.setPlaybackRate(0)` sind Eyebrow, Headline, Beschreibung und CTAs
      mit `opacity: 1` sichtbar
- [ ] In der Druckvorschau ist der vollständige Hero sichtbar
- [ ] Bei `prefers-reduced-motion: reduce` läuft keine Animation, kein `transform`
- [ ] Keine Information erscheint ausschließlich während oder nach der Animation

**P0 Sprunglink**
- [ ] Erstes fokussierbares Element der Seite ist „Zum Hauptinhalt springen"
- [ ] Bei Fokus sichtbar mit Kontrast ≥ 4,5:1, Ziel `#hauptinhalt` erhält den Fokus
- [ ] In `de`, `it`, `en` übersetzt

**P1 Kontrast**
- [ ] Akzentzeile ≥ 3:1 bei 360, 390 und 1440 px, gemessen hinter den Glyphen
- [ ] Bildhelligkeit rechts oben unverändert (Stichprobe Sättigung/Helligkeit)

**P1 Externe Links**
- [ ] Jeder Link mit `target="_blank"` im Hero hat einen Hinweis für Screenreader
- [ ] `rel="noreferrer"` überall vorhanden

**P2**
- [ ] Sprachumschalter 44×44 px auch auf dem Desktop
- [ ] Nur eine Sprachnavigation im Accessibility-Baum
- [ ] `fetchpriority="high"` am Hero-Bild

---

## 5. Testmatrix

| # | Prüfung | Desktop | Smartphone | Tastatur | Screenreader |
|---|---|---|---|---|---|
| 1 | Kontrast hinter Glyphen, alle Hero-Texte | 1440, 1920 | 360, 390, 430 | — | — |
| 2 | Animationssequenz vollständig, keine Dauerbewegung | ✓ | ✓ | — | — |
| 3 | Animation angehalten → Inhalt sichtbar | ✓ | ✓ | — | — |
| 4 | `prefers-reduced-motion: reduce` | ✓ | ✓ | ✓ | ✓ |
| 5 | Druckvorschau zeigt Hero | ✓ | — | — | — |
| 6 | Tab-Reihenfolge = Leserichtung, keine Falle | — | — | ✓ | — |
| 7 | Fokusring auf jedem Element sichtbar | — | — | ✓ | — |
| 8 | Sprunglink erscheint bei erstem Tab | — | — | ✓ | ✓ |
| 9 | CTA während der Animation bedienbar | ✓ | ✓ | ✓ | — |
| 10 | Überschrift als `h1` angesagt, Region benannt | — | — | — | NVDA, VoiceOver iOS |
| 11 | Zierbild wird nicht vorgelesen | — | — | — | NVDA, VoiceOver iOS |
| 12 | Externe Links als solche angesagt | — | — | ✓ | NVDA, VoiceOver iOS |
| 13 | Sprachwechsel korrekt angesagt (`lang`, `aria-current`) | — | — | ✓ | NVDA, VoiceOver iOS |
| 14 | Touch-Ziele ≥ 24 px, Bedienelemente ≥ 44 px | — | 360, 390 | — | — |
| 15 | 200 % Zoom: kein Verlust von Inhalt oder Funktion | 640×400 | — | — | — |
| 16 | 400 % Reflow: kein horizontales Scrollen | 320×512 | — | — | — |
| 17 | LCP < 2,5 s, CLS < 0,1 (Produktionsbuild) | ✓ | ✓ | — | — |
| 18 | Bildausschnitt mobil zeigt aussagekräftigen Teil | — | 360, 430 | — | — |

**Screenreader-Kombinationen:** NVDA + Firefox (Windows), VoiceOver + Safari (macOS),
VoiceOver + Safari (iOS). Reihenfolge der Ansage im Hero soll lauten: Region
„Dein Zuhause endet nicht an der Haustür" → Überschrift Ebene 1 → Absatz → Link
„Check starten" → Link „Geprüfte Projekte ansehen" → Absatz → Link „Methodik".

**Automatisierte Regression:** Die Messskripte des Audits liegen im Scratchpad
(`contrast3.py` Glyphenkontrast, `a11y.py` Struktur, `keyboard.py` Tab-Reihenfolge und
Animationsabhängigkeit, `perf.py` LCP/CLS). Sie sind an keine CI gebunden — wenn der
Hero häufiger geändert wird, lohnt es, sie als Playwright-Test zu übernehmen.
