import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourAppShell } from "@/features/house-tour/components/tour-app-shell";
import { isLocale, type Locale } from "@/config/site";

const pageLabels: Record<Locale, { title: string; ariaLabel: string }> = {
  de: { title: "Lebensraum-Check", ariaLabel: "Interaktiver Lebensraum-Check" },
  it: { title: "Check degli habitat", ariaLabel: "Check interattivo degli habitat" },
  en: { title: "Habitat Check", ariaLabel: "Interactive Habitat Check" }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: pageLabels[locale].title };
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
