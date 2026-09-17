import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/config/site";
import { SubmissionForm } from "@/features/project-submission/components/submission-form";
import { withBasePath } from "@/lib/public-path";

const route = "/projekt-einreichen/formular";

const pageTitles: Record<Locale, { title: string; description: string }> = {
  de: {
    title: "Projekt einreichen – Formular",
    description: "Reiche dein Biodiversitätsprojekt in Südtirol zur Prüfung und Begleitung ein."
  },
  it: {
    title: "Presentare un progetto – modulo",
    description: "Invia il tuo progetto di biodiversità in Alto Adige per la valutazione e l'accompagnamento."
  },
  en: {
    title: "Submit a project – form",
    description: "Submit your biodiversity project in South Tyrol for review and support."
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const meta = pageTitles[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: withBasePath(`/${locale}${route}`),
      languages: Object.fromEntries(locales.map((language) => [language, withBasePath(`/${language}${route}`)]))
    }
  };
}

export default async function SubmissionFormPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <SubmissionForm locale={locale} />;
}
