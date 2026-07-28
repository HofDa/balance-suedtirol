import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { fontVariables } from "@/config/fonts";
import { isLocale, locales, type Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  de: {
    title: "b*alance – Biodiversitätsplattform Südtirol",
    description: "Biodiversität verstehen, lokale Projekte entdecken und gemeinsam Wirkung entfalten."
  },
  it: {
    title: "b*alance – Piattaforma per la biodiversità dell’Alto Adige",
    description: "Capire la biodiversità, scoprire progetti locali e agire insieme."
  },
  en: {
    title: "b*alance – Biodiversity platform for South Tyrol",
    description: "Understand biodiversity, discover local projects and act together."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = metadataByLocale[isLocale(locale) ? locale : "de"];

  return {
    title: { default: meta.title, template: "%s | b*alance" },
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((language) => [language, `/${language}`]))
    }
  };
}

/**
 * Zugleich Root-Layout: Es rendert `html` und `body`, damit das `lang`-Attribut
 * serverseitig zur Route passt. Alle Seiten der Anwendung liegen unter `[locale]`.
 */
export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getTranslations(locale);

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        {/* Erstes fokussierbares Element der Seite: überspringt Kopfzeile,
            Navigation und Sprachumschalter (WCAG 2.4.1). */}
        <a
          href="#hauptinhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[var(--radius-md)] focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
        >
          {t.skipToContent}
        </a>
        <Header locale={locale} />
        <main id="hauptinhalt" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
