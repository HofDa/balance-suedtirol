import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRing } from "@/components/ui/focus";
import type { CSSProperties } from "react";

export function FeaturedProjects({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).featured;
  const localizedProjects = getProjects(locale);
  return (
    <section className="bg-[var(--color-sage)]/35 py-24 sm:py-32">
      <Container>
        <div
          data-home-reveal="rise"
          className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"
        >
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            copy={t.copy}
          />
          <Link href={`/${locale}/projekte`} className={`group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[var(--color-forest)] ${focusRing}`}>
            {t.all}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localizedProjects.map((project, index) => (
            <div
              key={project.slug}
              data-home-reveal="rise"
              style={{ "--home-reveal-delay": `${index * 85}ms` } as CSSProperties}
            >
              <ProjectCard project={project} locale={locale} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
