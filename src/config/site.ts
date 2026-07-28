export const locales = ["de", "it", "en"] as const;
export type Locale = (typeof locales)[number];

export const siteConfig = {
  name: "b*alance",
  description:
    "Biodiversität verstehen, lokale Projekte entdecken und gemeinsam Wirkung entfalten.",
  navigation: [
    { label: "Projekte", href: "/projekte" }
  ]
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
