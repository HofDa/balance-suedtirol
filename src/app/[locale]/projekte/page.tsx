import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectListClient } from "@/components/projects/project-list-client";
import { getProjectListItems } from "@/data/projects";
import { isLocale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { Label } from "@/components/ui/label";
import { focusRing } from "@/components/ui/focus";
import {
  getAllCategoriesLabel,
  getProjectCategories,
  type ProjectCategoryId
} from "@/config/project-categories";

export const metadata: Metadata = {
  title: "Projekte | b*alance Südtirol",
  description: "Geprüfte regionale Biodiversitätsprojekte in Südtirol entdecken und unterstützen."
};

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const translations = getTranslations(locale);
  const submission = translations.projectSubmission;
  const page = translations.projectsPage;
  const categories = getProjectCategories(locale);
  const localizedProjects = getProjectListItems(locale);
  const categoryLabels = Object.fromEntries(
    categories.map(({ id, label }) => [id, label])
  ) as Record<ProjectCategoryId, string>;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <Label size="section">{page.eyebrow}</Label>
          <h1 className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]">{page.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
            {page.copy}
          </p>
        </div>

        {/* useSearchParams braucht eine Suspense-Grenze, sonst scheitert das Prerendering. */}
        <Suspense fallback={<div className="mt-12 h-96" aria-hidden />}>
          <ProjectListClient
            projects={localizedProjects}
            locale={locale}
            categories={categories}
            allCategoryLabel={getAllCategoriesLabel(locale)}
            copy={page}
            cardCopy={{
              view: translations.card.view,
              status: translations.card.status,
              mainSponsor: translations.card.mainSponsor,
              placeholder: translations.card.placeholder,
              partner: translations.card.partner
            }}
            categoryLabels={categoryLabels}
          />
        </Suspense>

        <aside className="mt-14 flex flex-col gap-6 rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-sage)]/55 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div className="max-w-2xl">
            <Label size="block">{submission.eyebrow}</Label>
            <h2 className="mt-3 font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]">{submission.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)] sm:text-base">{submission.copy}</p>
          </div>
          <Link
            href={`/${locale}/projekt-einreichen`}
            className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 text-sm font-bold text-white transition hover:bg-[var(--color-forest)] ${focusRing}`}
          >
            {submission.cta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </aside>
      </Container>
    </section>
  );
}
