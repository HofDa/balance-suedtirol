# Architekturüberblick

## Ziel dieses Grundgerüsts

Das Repository trennt bereits öffentliche Seiten, wiederverwendbare UI-Bausteine, Feature-Logik, Konfiguration und Mock-Daten. Es ist absichtlich noch kein vollständiges Crowdfunding-System.

## Aktuelle Schichten

- `src/app`: Routing, Layouts und Seiteneinstiege
- `src/components`: rein visuelle und zusammengesetzte Komponenten
- `src/features`: domänenspezifische Logik wie Haustour und Score-Berechnung
- `src/data`: temporäre Mock-Daten
- `src/config`: globale Produkt- und Locale-Konfiguration
- `src/lib`: allgemeine Hilfsfunktionen
- `prisma`: relationales Ausgangsmodell für PostgreSQL

## Bewusste Grenzen

Noch nicht implementiert sind:

- Authentifizierung und Rollen
- CMS-Anbindung
- Projekt-Review-Workflow
- echte Projektfinanzierung
- Uploads
- Server Actions für Formulare
- persistente Haustour-Sessions
- wissenschaftlich validiertes Score-Modell
- vollständige Übersetzungen

## Empfohlene nächste Architekturentscheidungen

1. Payload CMS oder Sanity festlegen.
2. Better Auth oder Auth.js anhand Organisations- und Rollenanforderungen wählen.
3. Projekt- und Score-Daten klar zwischen PostgreSQL und CMS aufteilen.
4. Server Actions nur als Transportebene verwenden; Geschäftslogik in Feature-Services halten.
5. Zahlungen und Auszahlungen rechtlich sowie steuerlich klären, bevor ein Anbieter fest verdrahtet wird.

## Offline/PWA

Es existieren bewusst kein Service Worker, kein Web-App-Manifest und keine Offline-Caches. Für diese Plattform ist eine normale responsive Webanwendung zunächst die sinnvollere und wartbarere Basis.
