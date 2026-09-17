import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourAppShell } from "@/features/house-tour/components/tour-app-shell";
import { isLocale, locales, type Locale } from "@/config/site";
import { withBasePath } from "@/lib/public-path";

const route = "/haus-tour";

const pageLabels: Record<Locale, { title: string; description: string; ariaLabel: string }> = {
  de: {
    title: "Lebensraum-Check",
    description: "Raum für Raum: Was dein Alltag mit Biodiversität zu tun hat. Interaktiver Selbstcheck für Südtirol.",
    ariaLabel: "Interaktiver Lebensraum-Check"
  },
  it: {
    title: "Check degli habitat",
    description: "Stanza per stanza: come la vita quotidiana si collega alla biodiversità in Alto Adige.",
    ariaLabel: "Check interattivo degli habitat"
  },
  en: {
    title: "Habitat Check",
    description: "Room by room: how everyday decisions connect to biodiversity in South Tyrol.",
    ariaLabel: "Interactive Habitat Check"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const meta = pageLabels[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: withBasePath(`/${locale}${route}`),
      languages: Object.fromEntries(locales.map((language) => [language, withBasePath(`/${language}${route}`)]))
    }
  };
}

export default async function HouseTourPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 h-[calc(100dvh-4.5rem)] overflow-hidden overscroll-none bg-[var(--color-paper)] [padding-bottom:env(safe-area-inset-bottom)]" aria-label={pageLabels[locale].ariaLabel}>
      <TourAppShell locale={locale} />
    </section>
  );
}
