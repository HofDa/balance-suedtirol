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

/** Fachliche Begleitung — gleiche Regel: erst nennen, wenn freigegeben. */
export const sciencePartners: SciencePartner[] = [
  {
    slug: "vegetationsoekologie",
    name: "Forschungspartner Platzhalter",
    field: "Vegetationsökologie",
    role: "Prüft die Lebensraumtypologie und die Monitoringprotokolle der Projekte.",
    isPlaceholder: true
  },
  {
    slug: "artenschutz",
    name: "Fachbeirat Platzhalter",
    field: "Artenschutz",
    role: "Begutachtet neue Projekte vor der Aufnahme in die Plattform.",
    isPlaceholder: true
  },
  {
    slug: "datengrundlagen",
    name: "Datenpartner Platzhalter",
    field: "Datengrundlagen",
    role: "Ordnet die verwendeten Kennzahlen und Berechnungsfaktoren fachlich ein.",
    isPlaceholder: true
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
    vegetationsoekologie: {
      name: "Partner di ricerca segnaposto",
      field: "Ecologia vegetale",
      role: "Verifica la tipologia degli habitat e i protocolli di monitoraggio dei progetti."
    },
    artenschutz: {
      name: "Comitato tecnico segnaposto",
      field: "Tutela delle specie",
      role: "Valuta i nuovi progetti prima dell’inserimento nella piattaforma."
    },
    datengrundlagen: {
      name: "Partner dei dati segnaposto",
      field: "Basi di dati",
      role: "Inquadra dal punto di vista tecnico gli indicatori e i fattori di calcolo utilizzati."
    }
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
    vegetationsoekologie: {
      name: "Research partner placeholder",
      field: "Vegetation ecology",
      role: "Reviews the habitat typology and the monitoring protocols of the projects."
    },
    artenschutz: {
      name: "Advisory board placeholder",
      field: "Species conservation",
      role: "Assesses new projects before they are admitted to the platform."
    },
    datengrundlagen: {
      name: "Data partner placeholder",
      field: "Data foundations",
      role: "Puts the figures and calculation factors used into technical context."
    }
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
