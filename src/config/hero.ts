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
