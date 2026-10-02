import { localizedAlternates } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourAppShell } from "@/features/house-tour/components/tour-app-shell";
import { isLocale } from "@/config/site";
import type { Localized } from "@/lib/i18n";

const route = "/haus-tour";

const pageLabels: Localized<{ title: string; description: string; ariaLabel: string }> = {
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
    alternates: localizedAlternates(locale, route)
  };
}

export default async function HouseTourPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    // Mobil deckt die Tour die Kopfzeile der Website ab: deren 72 px fehlten
    // sonst dem Raumbild. Der Weg zurück zur Website steht in der Werkzeugleiste.
    <section className="fixed inset-x-0 bottom-0 top-0 z-[60] h-dvh overflow-hidden overscroll-none bg-[var(--color-paper)] [padding-bottom:env(safe-area-inset-bottom)] [padding-top:env(safe-area-inset-top)] md:top-[4.5rem] md:z-40 md:h-[calc(100dvh-4.5rem)] md:pt-0" aria-label={pageLabels[locale].ariaLabel}>
      <TourAppShell locale={locale} />
    </section>
  );
}
