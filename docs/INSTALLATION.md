# Installation und Fehlerdiagnose

## Empfohlene Installation

```bash
cp .env.example .env
npm ci
npm run dev
```

`npm ci` verwendet exakt die Versionen aus `package-lock.json` und ist für den ersten Installationslauf vorgesehen.

## Registry prüfen

Das Projekt enthält eine `.npmrc`, die ausdrücklich die öffentliche npm-Registry verwendet:

```text
https://registry.npmjs.org/
```

Prüfen:

```bash
npm config get registry
```

Sollte lokal eine andere globale Registry erzwungen werden:

```bash
npm config set registry https://registry.npmjs.org/
```

## Saubere Neuinstallation

```bash
rm -rf node_modules .next .next-dev
npm cache verify
npm ci
```

Die Lockdatei sollte nicht gelöscht werden, solange keine bewusste Aktualisierung der Abhängigkeiten geplant ist.

## Sicherheitsprüfung

```bash
npm audit
```

Im geprüften Ausgangszustand wurden keine bekannten Schwachstellen gemeldet. Verwende nicht ungeprüft `npm audit fix --force`, weil npm dabei Hauptversionen oder unpassende ältere Versionen installieren kann.

## Prisma später ergänzen

Prisma ist nicht Teil der Standardinstallation. Dadurch muss beim ersten Frontend-Setup keine native Prisma-Engine nachgeladen werden.

```bash
npm install --save-exact @prisma/client@6.19.3
npm install --save-dev --save-exact prisma@6.19.3
npx prisma generate
```

Das vorbereitete Schema liegt unter `prisma/schema.prisma`.
