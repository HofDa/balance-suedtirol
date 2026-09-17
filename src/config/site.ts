export const locales = ["de", "it", "en"] as const;
export type Locale = (typeof locales)[number];

export const siteConfig = {
  name: "b*alance",
  /** Postfach von b*nature; Anlaufstelle für Kontakt und Newsletter-Anmeldung. */
  contactEmail: "info@bnature.bz",
  description:
    "Biodiversität verstehen, lokale Projekte entdecken und gemeinsam Wirkung entfalten.",
  navigation: [
    { label: "Was ist b*alance", href: "/was-ist-balance" },
    { label: "Projekte", href: "/projekte" },
    { label: "Biodiversität in Südtirol", href: "/biodiversitaet-in-suedtirol" },
    { label: "CO₂-Kompensation?", href: "/co2-und-biodiversitaet" },
    { label: "Über uns", href: "/ueber-uns" }
  ]
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
