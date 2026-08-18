import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { ProjectCardData } from "@/types/project";
import type { Locale } from "@/config/site";
import { ProjectCardSponsor } from "./project-card-sponsor";
import { ProjectCategoryBadge, ProjectCategoryMarker } from "./project-category";
import type { ProjectCategoryId } from "@/config/project-categories";
import { withBasePath } from "@/lib/public-path";

export type ProjectCardViewCopy = {
  view: string;
  status: string;
  statusValue: string;
  mainSponsor: string;
  placeholder: string;
  partner: string;
};

export function ProjectCardView({
  project,
  locale,
  copy,
  categoryLabels,
  /**
   * Benennt die Karte für die View-Transitions-API, damit der Browser sie beim
   * Filtern an ihre neue Rasterposition schiebt, statt sie neu zu zeichnen.
   */
  transitionName
}: {
  project: ProjectCardData;
  locale: Locale;
  copy: ProjectCardViewCopy;
  categoryLabels: Record<ProjectCategoryId, string>;
  transitionName?: string;
}) {
  const primaryCategory = project.categoryIds[0];

  return (
    // Genau ein Link pro Karte: er liegt über der gesamten Fläche (after:inset-0).
    // Vorher führten Bild, Titel und Button als drei getrennte Links zum selben Ziel.
    <article
      style={transitionName ? { viewTransitionName: transitionName } : undefined}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white transition duration-300 hover:border-[var(--color-forest)]/30 hover:shadow-[var(--shadow-hover)] focus-within:ring-2 focus-within:ring-[var(--color-forest)] focus-within:ring-offset-2">
      <ProjectCategoryMarker categoryId={primaryCategory} />
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-sage)]/40">
        <Image
          src={withBasePath(project.image)}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-4 top-4 flex flex-wrap gap-1.5">
          {project.categoryIds.map((categoryId) => (
            <ProjectCategoryBadge
              key={categoryId}
              categoryId={categoryId}
              label={categoryLabels[categoryId]}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            {project.municipality}
          </span>
          <span aria-hidden>·</span>
          <span className="truncate">{project.organization}</span>
        </p>

        <h3 className="mt-2 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-forest)]">
          <Link
            href={`/${locale}/projekte/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
            <span className="sr-only"> – {copy.view}</span>
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-muted)]">{project.summary}</p>

        {project.mainSponsor ? (
          <ProjectCardSponsor
            mainSponsor={project.mainSponsor}
            additionalCount={project.additionalSponsorCount}
            copy={{
              mainSponsor: copy.mainSponsor,
              placeholder: copy.placeholder,
              partner: copy.partner
            }}
          />
        ) : null}

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-[var(--color-line)] pt-4">
            <span className="text-xs text-[var(--color-muted)]">
              <span className="block">{copy.status}</span>
              <span className="mt-0.5 block font-bold text-[var(--color-ink)]">
                {copy.statusValue}
              </span>
            </span>
            <span className="inline-flex min-h-10 items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-forest)] px-3.5 text-sm font-semibold text-white transition-colors group-hover:bg-[var(--color-ink)]" aria-hidden>
              {copy.view}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
