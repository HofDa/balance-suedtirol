# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primäre Zielgruppe: Fördergeber und Institutionen.** Menschen, die über Geld,
Förderzusagen oder Kooperationen entscheiden — Verwaltung, Stiftungen,
öffentliche Stellen, potenzielle Trägerorganisationen. Sie kommen nicht, um den
Lebensraum-Check für sich selbst auszufüllen, sondern um zu beurteilen, ob diese
Plattform tragfähig, seriös und förderwürdig ist. Sie prüfen in kurzer Zeit, oft
nebenbei, oft am Desktop, und suchen nach Belegen statt nach Begeisterung. Ihr
Erfolg zählt zuerst: Sie müssen die Plattform verstehen, ihr trauen und sie
weiterempfehlen können.

**Operative Nutzergruppe: Privatpersonen in Südtirol.** Sie sind die Menschen,
für die das Produkt funktional gebaut ist — sie durchlaufen den Lebensraum-Check
zu ihrem eigenen Haushalt und sollen anschließend ein lokales Projekt
unterstützen. Jeder Flow muss für sie vollständig funktionieren, denn die
Fördergeber beurteilen die Plattform genau daran. Sie sind nicht die primäre
Zielgruppe der Überzeugungsarbeit, aber die Zielgruppe der Funktion.

**Dritte Gruppe: Projektträger.** Vereine, Netzwerke und Organisationen, die
Biodiversitätsprojekte einreichen (`/projekt-einreichen`, Prisma-Modelle
`Organization`, `OrganizationMember`, `ProjectStatus`-Workflow). Der
Einreichungsweg ist strukturell angelegt, aber noch nicht funktional.

## Product Purpose

b*alance macht persönliche Biodiversitätswirkung im Alltag verständlich und
führt von dieser Erkenntnis zu konkreten, lokalen Biodiversitätsprojekten in
Südtirol, die sich unterstützen und finanzieren lassen.

Der Kern ist eine zweiteilige Bewegung: Ein interaktiver Selbstcheck (aktuell
`Haus-Tour`/`Lebensraum-Check`, Räume Dach, Schlafzimmer, Bad, Wohnen, Küche,
Mobilität, Garten) erzeugt ein persönliches Ergebnis über vier Dimensionen —
Biodiversität, CO₂, Wasser, Ressourcen. Dieses Ergebnis führt weiter zu
Projekten, die genau dort wirken.

Erfolg heißt: Eine fördergebende Institution kann in wenigen Minuten erkennen,
was die Plattform ist, warum sie glaubwürdig ist und dass der Weg vom Check zur
finanzierten Wirkung real trägt.

## Positioning

**Radikale Lokalität.** Jedes Projekt auf der Plattform liegt in Südtirol, ist
besuchbar, überprüfbar und an eine benannte Gemeinde und Trägerorganisation
gebunden (Bozen, Klausen, Olang …). Eine überregionale Spendenplattform kann das
nicht kopieren, ohne ihre Reichweite aufzugeben: Nähe ist hier keine Eigenschaft,
sondern die Auswahlregel. Wer spendet, kann hinfahren und nachsehen.

Verstärkend, aber nicht als Kernanspruch: der Selbstcheck als Einstieg über den
eigenen Alltag statt über Appell, und ein belegter Bezug zur Forschungslage
statt Gefühlsargumentation.

## Operating Context

- **Dreisprachige Region.** Deutsch, Italienisch und Englisch stehen
  gleichrangig nebeneinander (`/de`, `/it`, `/en`, Root leitet auf `/de`). Das
  ist in Südtirol kein Feature, sondern Grundbedingung der Seriosität.
- **Prüfsituation der Primärzielgruppe.** Fördergeber bewerten oft am Desktop,
  in begrenzter Zeit, häufig im Vergleich mit anderen Anträgen und Plattformen.
  Belege, Quellen und Nachvollziehbarkeit sind ihre Währung.
- **Nutzungssituation des Checks.** Privatpersonen füllen ihn beiläufig aus,
  mobil oder am Rechner; der Einstieg ist auf 3–5 Minuten ausgelegt.
- **Regionale Bezugsgrößen.** Gemeinden und Bezirke Südtirols, reale
  Lebensraumtypen (Wildbienen, Streuobstwiesen, Moore), das
  Biodiversitätsmonitoring Südtirol als Datenkontext.

## Capabilities and Constraints

**Vorhanden:**

- Landingpage, Projektübersicht, dynamische Projektdetailseiten, Methodikseite,
  strukturelle Einreichungsseite, Impressum und Datenschutz
- Interaktiver Lebensraum-Check mit sieben Räumen, ausgelagerter Score-Logik
  (`calculateScores`, Basis 50 je Dimension, geklammert auf 0–100) und
  Ergebnisansicht
- Routenstruktur und Metadaten je Locale, Sprachwechsler, `/api/health`
- Bild-Pipelines: `scripts/build-hero-image.py`, `scripts/build-house-cutouts.py`
- Vorbereitetes Prisma-Schema für PostgreSQL (User, Organization,
  OrganizationMember, Project mit Übersetzungen, Kategorien, Impact-Metriken,
  Updates, TourSession, SavedProject, `ProjectStatus`-Workflow von DRAFT bis
  ARCHIVED)

**Noch nicht implementiert (Vor-Launch-Phase, echtes Produkt geplant):**
Authentifizierung und Organisationsrollen, CMS, Zahlungen und Auszahlungen,
Datei-Uploads, Review-Workflow, produktive Datenbankabfragen, Server Actions für
Formulare, persistente Check-Sessions, vollständige Übersetzungen,
wissenschaftlich validierte Score-Methodik.

**Technische Konstanten:** Next.js 15 App Router, React 19, TypeScript,
Tailwind CSS 4, framer-motion, shadcn/ui-Konfiguration vorbereitet. Keine PWA,
kein Service Worker, keine Offline-Logik — bewusste Entscheidung. Keine externen
Bild-Hosts; alle Assets liegen lokal. Prisma ist bewusst nicht Teil der
Standardinstallation.

**Terminologie:** Die vier Score-Dimensionen heißen Biodiversität, CO₂, Wasser,
Ressourcen. Projektkategorien sind Lebensraumtypen, keine Themenschlagworte.

**Offene Produktentscheidungen — nicht erfinden:**

- **Trägerschaft ist ungeklärt.** Es steht nicht fest, wer die Plattform
  betreibt. Kein Design, keine Kopie und kein Footer darf eine Trägerschaft,
  einen Verein, eine Institution oder einen Absender behaupten.
- **Name des Selbstchecks ist offen.** „Haus-Tour" (Route `/haus-tour`, Code
  unter `src/features/house-tour/`) und „Lebensraum-Check" (Navigation) stehen
  parallel; die Entscheidung steht aus. Keine Fläche darf sich auf einen der
  beiden Namen als endgültig festlegen.
- Zahlungs- und Auszahlungsmodell inklusive rechtlicher und steuerlicher Klärung
- CMS-Wahl, Auth-Lösung, Datenaufteilung PostgreSQL ↔ CMS

## Brand Commitments

- **Name:** `b*alance`, Schreibweise mit Kleinbuchstaben und Asterisk.
- **Beschreibung:** „Biodiversität verstehen, lokale Projekte entdecken und
  gemeinsam Wirkung entfalten."
- **Keine fremde Trägerschaft andeuten.** Eurac Research darf ausschließlich in
  der Autorenzeile eines Zitats und im Quellenlink vorkommen — nie als Label,
  Badge, Logo oder Absender der Plattform. Dasselbe gilt für jede andere
  Institution, solange die Trägerschaft ungeklärt ist.
- **Voice:** differenziert und ehrlich statt werblich. Belegte Formulierungen
  („Kein Verhörraum", „keine grüne Nebelmaschine", offener Disclaimer zur
  didaktischen Vereinfachung des Scores) sind bestätigte Haltung, keine
  Platzhalter. Kein Greenwashing-Vokabular, keine Dringlichkeitsrhetorik.
- **Dreisprachigkeit als Verpflichtung:** Jede inhaltliche Aussage muss in DE,
  IT und EN inhaltsgleich existieren. Eine Sprache darf nicht mehr behaupten als
  eine andere.
- **Regionale Begrenzung als Verpflichtung:** ausschließlich Südtiroler Projekte
  und Lebensräume. Keine Ausweitung des geografischen Versprechens.

## Evidence on Hand

**Real und belegt:**

- Wörtliches Zitat von Ulrike Tappeiner, Projektleiterin Biodiversitätsmonitoring
  Südtirol, Eurac Research: „Südtirol verfügt über einen beeindruckenden Schatz
  an Biodiversität" — Quelle ORF Tirol, 04.09.2025
  (`src/config/hero.ts`, `heroQuote`). Nicht kürzen, nicht umformulieren.
- Aussagen über die eigene Plattform in `heroStats`: Einstiegsdauer 3–5 min,
  100 % Projekte aus Südtirol, dreisprachig angelegt.
- Eigene Audits mit dokumentiertem Messverfahren: `docs/A11Y-PERF-HERO.md`
  (Kontraste hinter den Glyphen gemessen), `docs/UX-REVIEW.md` (Stand
  27.07.2026), `docs/ARCHITECTURE.md`, `docs/VALIDATION.md`,
  `docs/HERO-COPY.md`, `docs/DEPENDENCIES.md`.
- Bild-Assets lokal: `public/assets/hero/` mit `CREDITS.md`,
  `public/assets/house/` inklusive Sprite-Ausschnitte.

**Ausdrücklich nicht vorhanden — darf nicht erfunden werden:**

- Keine echten Projekte. Die drei Projekte in `src/data/projects.ts` (Blühende
  Vernetzung Bozen, Lebendige Streuobstwiese, Moorfenster Pustertal) sind
  Mock-Daten samt Zielsummen, Finanzierungsständen und Unterstützerzahlen.
- Keine realen Trägerorganisationen. „Netzwerk StadtNatur", „Kulturlandschaft
  Eisacktal", „Lebensräume Pustertal" sind erfunden.
- Keine Testimonials, keine Partner, keine Presse, keine Nutzerzahlen, keine
  Fördersummen, keine Auszeichnungen.
- Das Hero-Foto ist ein frei lizenziertes Platzhalterbild (Seiser Alm, mendhak,
  CC BY-SA 2.0, `isPlaceholder: true`), keine Auftragsfotografie.
- Projektbilder sind SVG-Illustrationen, keine Fotos.
- Die Score-Methodik ist didaktisch vereinfacht und wissenschaftlich nicht
  validiert.

## Product Principles

1. **Ehrlichkeit vor Wirkung.** Was Demo ist, wird als Demo gekennzeichnet — für
   Fördergeber ist eine sichtbare Prototyp-Kennzeichnung ein Vertrauenssignal,
   eine kaschierte Lücke ein Ausschlussgrund. Kennzeichnung vereinheitlichen,
   niemals reduzieren.
2. **Jede Aussage braucht einen Beleg oder gehört gestrichen.** Zahlen, Zitate
   und Forschungsbezüge nur mit Quelle. Fremde Forschungszahlen werden nie zu
   Aussagen über die eigene Plattform umgedeutet.
3. **Nähe ist das Argument.** Ort, Gemeinde und Besuchbarkeit stehen im
   Vordergrund; abstrakte globale Wirkung nicht.
4. **Kein Element ohne Funktion.** Ein Filter, der nicht filtert, oder ein CTA,
   der nirgends hinführt, kostet bei der Primärzielgruppe mehr Vertrauen, als
   sein Fehlen kosten würde.
5. **Vom Alltag zur Handlung, ohne Bruch.** Der Weg Check → Ergebnis → passendes
   Projekt → Unterstützung ist der Kernpfad; alles andere ordnet sich ihm unter.
6. **Drei Sprachen, ein Inhalt.** Keine Fläche geht live, deren Aussagen in DE,
   IT und EN auseinanderlaufen.

## Accessibility & Inclusion

- Zielstandard **WCAG 2.2 Level AA**, ergänzt um relevante AAA-Kriterien; das
  bestehende Hero-Audit misst gegen genau diesen Maßstab.
- Kontraste werden hinter den tatsächlichen Glyphen gemessen, nicht anhand
  deklarierter Farben — verpflichtend überall dort, wo Text auf Fotos oder
  Verläufen liegt. Für Volltonflächen gilt der rechnerische Wert.
- Inhalt darf nie am Ablauf einer Animation hängen; `prefers-reduced-motion`
  muss einen vollständigen, gleichwertigen Pfad haben (bereits als P0-Befund
  behoben).
- Geprüfte Viewports: 320, 390, 430, 640, 1280, 1440, 1600, 1920 px sowie 200 %
  und 400 % Zoom.
- `<html lang>` muss serverseitig der jeweiligen Locale entsprechen.
- Mindestschriftgröße in der Tour: 11 px; kleinere Labels sind ein Befund.
- Öffentliche Verwaltung als Zielgruppe legt Barrierefreiheit als
  Vergabekriterium nahe — Konformität ist hier kein Nice-to-have.
