import type { Locale } from "@/config/site";

export type Partner = {
  slug: string;
  name: string;
  /** Was die Partnerschaft konkret trägt — eine Zeile, keine Werbung. */
  role: string;
  /** Freigegebenes Logo in /public. Ohne Logo steht der Name als Wortmarke. */
  logo?: string;
  website?: string;
  /** Macht Demo-Einträge im Prototyp sichtbar von echten Partnern unterscheidbar. */
  isPlaceholder?: boolean;
};

/**
 * Partner, die den Betrieb der Plattform tragen.
 *
 * Alle Einträge sind bis zu einer bestätigten Zusage Platzhalter. Fremde
 * Institutionen stehen hier erst, wenn die Nennung ausdrücklich freigegeben
 * ist — eine angedeutete Trägerschaft wäre gegenüber Besuchern und der
 * genannten Organisation irreführend.
 */
export const platformPartners: Partner[] = [
  {
    slug: "hauptpartner",
    name: "Hauptpartner Platzhalter",
    role: "Trägt den laufenden Betrieb der Plattform.",
    isPlaceholder: true
  },
  {
    slug: "regionalpartner",
    name: "Regionalpartner Platzhalter",
    role: "Begleitet die Projektprüfung vor Ort in Südtirol.",
    isPlaceholder: true
  },
  {
    slug: "technologiepartner",
    name: "Technologiepartner Platzhalter",
    role: "Stellt Hosting, Karten und Infrastruktur bereit.",
    isPlaceholder: true
  },
  {
    slug: "kommunikationspartner",
    name: "Kommunikationspartner Platzhalter",
    role: "Bringt Projektaufrufe und Ergebnisse in die Öffentlichkeit.",
    isPlaceholder: true
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
    hauptpartner: {
      name: "Partner principale segnaposto",
      role: "Sostiene il funzionamento corrente della piattaforma."
    },
    regionalpartner: {
      name: "Partner regionale segnaposto",
      role: "Accompagna la verifica dei progetti sul territorio altoatesino."
    },
    technologiepartner: {
      name: "Partner tecnologico segnaposto",
      role: "Mette a disposizione hosting, mappe e infrastruttura."
    },
    kommunikationspartner: {
      name: "Partner di comunicazione segnaposto",
      role: "Porta all’attenzione del pubblico appelli e risultati dei progetti."
    },
    "it-u": { field: "IT:U Linz", role: "Interdisciplinary Transformation University Austria, Linz" },
    unibz: { field: "Università di Bolzano", role: "Libera Università di Bolzano" },
    eurac: { role: "Eurac Research, Istituto per l’ambiente alpino, Bolzano" }
  },
  en: {
    hauptpartner: {
      name: "Lead partner placeholder",
      role: "Supports the day-to-day operation of the platform."
    },
    regionalpartner: {
      name: "Regional partner placeholder",
      role: "Accompanies project review on the ground in South Tyrol."
    },
    technologiepartner: {
      name: "Technology partner placeholder",
      role: "Provides hosting, maps and infrastructure."
    },
    kommunikationspartner: {
      name: "Communications partner placeholder",
      role: "Brings project appeals and results to a wider public."
    },
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
