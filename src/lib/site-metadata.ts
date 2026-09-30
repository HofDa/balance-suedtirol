import type { Metadata } from "next";
import { locales, type Locale } from "../config/site";
import { withBasePath } from "./public-path";

export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://balance-suedtirol.it");

export function absoluteSiteUrl(path: string) {
  return new URL(withBasePath(path), siteUrl.origin).href;
}

export function localizedAlternates(locale: Locale, route = ""): NonNullable<Metadata["alternates"]> {
  return {
    canonical: absoluteSiteUrl(`/${locale}${route}`),
    languages: Object.fromEntries(locales.map((language) => [language, absoluteSiteUrl(`/${language}${route}`)])),
  };
}
