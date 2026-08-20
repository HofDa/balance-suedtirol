import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/config/site";
import { SubmissionForm } from "@/features/project-submission/components/submission-form";

const pageTitles: Record<Locale, string> = {
  de: "Projekt einreichen – Formular",
  it: "Presentare un progetto – modulo",
  en: "Submit a project – form"
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: pageTitles[locale] };
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
