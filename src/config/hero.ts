import type { Locale } from "./site";

export type HeroImage = {
  src: string;
  alt: string;
  /** Tiny inline preview so der Hero nicht weiß aufblitzt, bevor das Foto geladen ist. */
  blurDataURL: string;
  photographer: string;
  location: string;
  license: string;
  /** Quelle des Bildes, wird im Credit verlinkt. */
  sourceUrl: string;
  /** true, solange ein Stockfoto statt eines Fotografinnen- oder Fotografenbildes liegt. */
  isPlaceholder: boolean;
};

export type HeroQuote = {
  text: string;
  author: string;
  role: string;
  organisation: string;
  sourceLabel: string;
  sourceUrl: string;
};

/**
 * Platzhalter bis die Bilder der Fotografen vorliegen.
 * Zum Austauschen: neue Datei nach `public/assets/hero/` legen, hier `src`, `alt`,
 * `photographer`, `location`, `license`, `sourceUrl` ersetzen und `isPlaceholder` auf
 * false setzen. Datei und `blurDataURL` erzeugt `scripts/build-hero-image.py`.
 */
export const heroImage: HeroImage = {
  src: "/assets/hero/seiser-alm-placeholder.webp",
  alt: "Weite Almwiese auf der Seiser Alm mit einzelnem Herbstbaum, Heustadel und den Gipfeln von Langkofel und Plattkofel im Hintergrund",
  blurDataURL:
    "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAACwBACdASoUAAsAPrVInkmnJCKhMAgA4BaJagCdMoRwHuAt/8BrIX3hZQeUif8oAP2dcpOvOu1jby/RsPHKeqX8xXkIjMtRZTOXL4JatzfCPLdxhZcNegiaoj8Yu7jiT0qpJjatIEy3RIFWbaTqfQlyv6lG5cpSaJoKj1QcTsyA9nZk4BLWlsStuQAAAA==",
  photographer: "mendhak",
  location: "Seiser Alm, Südtirol",
  license: "CC BY-SA 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Alpe_Di_Siusi_open_meadow_area.jpg",
  isPlaceholder: true
};

/**
 * Wörtliches Zitat zur Vorstellung des ersten Ergebnisberichts des
 * Biodiversitätsmonitorings Südtirol. Nur belegte Zitate verwenden, nichts kürzen
 * oder umformulieren.
 *
 * Das Zitat ist eine Quellenangabe, keine Trägerschaft: Eurac Research darf im
 * Hero ausschließlich in der Autorenzeile und im Quellenlink vorkommen, nicht als
 * Label, Badge oder Absender der Plattform.
 */
export const heroQuote: HeroQuote = {
  text: "Südtirol verfügt über einen beeindruckenden Schatz an Biodiversität",
  author: "Ulrike Tappeiner",
  role: "Projektleiterin Biodiversitätsmonitoring Südtirol",
  organisation: "Eurac Research",
  sourceLabel: "ORF Tirol, 04.09.2025",
  sourceUrl: "https://tirol.orf.at/stories/3320220/"
};

/** Nur Aussagen über die eigene Plattform, keine fremden Forschungszahlen. */
export const heroStats = [
  { value: "3–5 min", label: "für deinen Einstieg in den Lebensraum-Check" },
  { value: "100 %", label: "Projekte aus Südtirol" },
  { value: "DE · IT · EN", label: "dreisprachig angelegt" }
] as const;

export type HeroQuoteMock = {
  id: string;
  /** Zitattext je Sprache — frei übersetzbar, weil es sich um Musterinhalte handelt. */
  text: Record<Locale, string>;
  /** Platzhaltername. Echte Personen erst nennen, wenn Zitat und Nennung freigegeben sind. */
  author: string;
  role: Record<Locale, string>;
};

/**
 * Musterzitate für die Zitatebene im Hero.
 *
 * Bewusst erfundene Stimmen mit Platzhalternamen: Ein zugeordnetes Zitat ohne
 * Freigabe wäre eine Behauptung über eine reale Person. Das belegte Zitat oben
 * (`heroQuote`) läuft hier nicht mit, weil es wörtlich zitiert werden muss und
 * sich deshalb nicht in drei Sprachen ausspielen lässt.
 *
 * Zum Ersetzen: `text` und `role` durch die freigegebene Fassung ersetzen,
 * `author` auf den echten Namen setzen und `heroQuotesAreMockup` auf false stellen.
 */
export const heroQuotesAreMockup = true;

export const heroQuotes: HeroQuoteMock[] = [
  {
    id: "wiese",
    text: {
      de: "Wenn die Wiese hinterm Hof im Juni wieder summt, weiß ich, dass wir etwas richtig gemacht haben.",
      it: "Quando a giugno il prato dietro il maso torna a ronzare, so che abbiamo fatto qualcosa di giusto.",
      en: "When the meadow behind the farm hums again in June, I know we got something right."
    },
    author: "Name Platzhalter",
    role: {
      de: "Bäuerin, Vinschgau",
      it: "Agricoltrice, Val Venosta",
      en: "Farmer, Vinschgau"
    }
  },
  {
    id: "hecke",
    text: {
      de: "Biodiversität ist nichts Fernes. Sie fängt an der Hecke am Feldrand an.",
      it: "La biodiversità non è qualcosa di lontano. Comincia dalla siepe a bordo campo.",
      en: "Biodiversity is not something distant. It starts at the hedge along the field."
    },
    author: "Name Platzhalter",
    role: {
      de: "Freiwilliger, Pustertal",
      it: "Volontario, Val Pusteria",
      en: "Volunteer, Puster Valley"
    }
  },
  {
    id: "zaehlen",
    text: {
      de: "Wir sehen erst, was fehlt, wenn wir anfangen zu zählen.",
      it: "Ci accorgiamo di ciò che manca solo quando iniziamo a contare.",
      en: "We only notice what is missing once we start counting."
    },
    author: "Name Platzhalter",
    role: {
      de: "Projektbegleitung, Eisacktal",
      it: "Accompagnamento di progetto, Valle Isarco",
      en: "Project support, Eisacktal"
    }
  }
];
