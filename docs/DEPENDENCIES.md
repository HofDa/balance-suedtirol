# Abhängigkeiten

## Laufzeit

- Next.js 15.5.20
- React und React DOM 19.2.7
- Framer Motion für die interaktive Haustour
- Lucide React für Icons
- clsx und tailwind-merge für UI-Klassen

## Entwicklung

- TypeScript
- Tailwind CSS 4
- PostCSS 8.5.20
- ESLint 9 mit Next.js-Konfiguration

## Sicherheitsentscheidung zu PostCSS

Next.js 15.5.20 deklariert intern eine ältere PostCSS-Version. Das Projekt erzwingt deshalb über `overrides` projektweit PostCSS 8.5.20. So wird die gepatchte Version auch für die Next.js-Abhängigkeitskette verwendet.

## Bewusst nicht standardmäßig installiert

- Prisma und Prisma Client
- Authentifizierung
- CMS
- Kartenbibliothek
- Zahlungsanbieter
- Analytics und Monitoring
- PWA- oder Offline-Pakete

Diese Integrationen werden erst ergänzt, wenn die entsprechende Produktphase beginnt.
