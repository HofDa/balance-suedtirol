import type { Locale } from "@/config/site";

export type Partner = {
  slug: string;
  name: string;
  /** Was die Partnerschaft konkret trägt — eine Zeile, keine Werbung. */
  role: string;
  /** Freigegebenes Logo in /public. Ohne Logo steht der Name als Wortmarke. */
  logo?: string;
  /** Anzeigegröße des Logos in px (die Datei hat mindestens die doppelte Auflösung). */
  logoSize?: { width: number; height: number };
  /** Eigene Grundfarbe des Logos (Logobox): Die Kachel füllt sich damit, das Logo verschwimmt nicht als Kasten im Kasten. */
  logoBackground?: string;
  website?: string;
  /** Macht Demo-Einträge im Prototyp sichtbar von echten Partnern unterscheidbar. */
  isPlaceholder?: boolean;
};

/**
 * Gründungsförderer, die b*alance finanziell ermöglicht haben. Logos liegen
 * optimiert in /public/partners, die Originale in assets-source/partners.
 * Fremde Institutionen stehen hier nur mit ausdrücklich freigegebener Nennung.
 */
export const platformPartners: Partner[] = [
  {
    slug: "raiffeisen-eisacktal",
    name: "Raiffeisenkasse Eisacktal",
    role: "Gründungsförderer",
    logo: "/partners/raiffeisen-eisacktal.webp",
    logoSize: { width: 600, height: 208 },
    logoBackground: "rgb(0 127 50)"
  },
  {
    slug: "alperia",
    name: "Alperia",
    role: "Gründungsförderer",
    logo: "/partners/alperia.webp",
    logoSize: { width: 150, height: 50 }
  }
];

export type SciencePartner = Partner & {
  /** Fachgebiet, aus dem die Begleitung kommt. */
  field: string;
};

/**
 * Wissenschaftliche Partner. `field` trägt die Institution (steht als Kleinzeile
 * über dem Namen), `role` ist der ausgeschriebene Institutsname für den Tooltip.
 */
export const sciencePartners: SciencePartner[] = [
  {
    slug: "it-u",
    name: "Elisabeth Gsottbauer",
    field: "IT:U Linz",
    role: "Interdisciplinary Transformation University Austria, Linz"
  },
  {
    slug: "unibz",
    name: "Camilla Wellstein",
    field: "Universität Bozen",
    role: "Freie Universität Bozen"
  },
  {
    slug: "eurac",
    name: "Andreas Hilpold & Georg Niedrist",
    field: "Eurac Research",
    role: "Eurac Research, Institut für Alpine Umwelt, Bozen"
  }
];

type PartnerTranslation = Partial<Pick<SciencePartner, "name" | "role" | "field">>;

const partnerTranslations: Record<Exclude<Locale, "de">, Record<string, PartnerTranslation>> = {
  it: {
    alperia: { role: "Sostenitore fondatore" },
    "raiffeisen-eisacktal": { name: "Cassa Raiffeisen della Valle Isarco", role: "Sostenitore fondatore" },
    "it-u": { field: "IT:U Linz", role: "Interdisciplinary Transformation University Austria, Linz" },
    unibz: { field: "Università di Bolzano", role: "Libera Università di Bolzano" },
    eurac: { role: "Eurac Research, Istituto per l’ambiente alpino, Bolzano" }
  },
  en: {
    alperia: { role: "Founding supporter" },
    "raiffeisen-eisacktal": { role: "Founding supporter" },
    "it-u": { field: "IT:U Linz", role: "Interdisciplinary Transformation University Austria, Linz" },
    unibz: { field: "University of Bozen-Bolzano", role: "Free University of Bozen-Bolzano" },
    eurac: { role: "Eurac Research, Institute for Alpine Environment, Bolzano" }
  }
};

function localize<T extends Partner>(items: T[], locale: Locale): T[] {
  if (locale === "de") return items;
  return items.map((item) => ({ ...item, ...partnerTranslations[locale][item.slug] }));
}

export function getPlatformPartners(locale: Locale): Partner[] {
  return localize(platformPartners, locale);
}

export function getSciencePartners(locale: Locale): SciencePartner[] {
  return localize(sciencePartners, locale);
}
