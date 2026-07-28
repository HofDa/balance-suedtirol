import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Circle,
  ExternalLink,
  FileText,
  Leaf,
  MapPin,
  Microscope,
  Sprout,
  Users,
  ShieldCheck
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/projects/project-card";
import { formatCurrency } from "@/lib/utils";
import type { Project } from "@/types/project";
import type { Locale } from "@/config/site";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Surface } from "@/components/ui/surface";
import { focusRing, focusRingOnDark } from "@/components/ui/focus";
import { ProjectSponsors } from "./project-sponsors";
import { ProjectCategoryIcon } from "./project-category";
import { getProjectCategoryLabel } from "@/config/project-categories";
import { getTranslations } from "@/config/translations";
import { SouthTyrolMap } from "./south-tyrol-map";
import { ProjectShareButton } from "./project-share-button";
import {
  ProjectSupportDialog,
  ProjectSupportTrigger,
  type ProjectSupportCopy
} from "./project-support";

interface ProjectDetailProps {
  project: Project;
  otherProjects: Project[];
  locale: Locale;
}

export function ProjectDetail({ project, otherProjects, locale }: ProjectDetailProps) {
  const progress = Math.min(100, Math.round((project.funded / project.goal) * 100));
  const copy = getTranslations(locale).projectDetail;
  const mapUrl = `https://www.openstreetmap.org/?mlat=${project.location.lat}&mlon=${project.location.lng}#map=14/${project.location.lat}/${project.location.lng}`;
  const timeline = [
    { id: "planning", label: copy.steps.planning },
    { id: "funding", label: copy.steps.funding },
    { id: "implementation", label: copy.steps.implementation },
    { id: "monitoring", label: copy.steps.monitoring },
    { id: "evaluation", label: copy.steps.evaluation }
  ] as const;
  const currentTimelineIndex = {
    "support-needed": 1,
    "in-progress": 2,
    monitoring: 3,
    completed: 4
  }[project.status];
  const supportCopy: ProjectSupportCopy = {
    close: copy.close,
    support: copy.support,
    thankYou: copy.thankYou,
    thankYouCopy: copy.thankYouCopy,
    donation: copy.donation,
    sponsorship: copy.sponsorship,
    volunteering: copy.volunteering,
    amount: copy.amount,
    volunteeringCopy: copy.volunteeringCopy,
    confirm: copy.confirm
  };

  return (
    <>
      <section className="pb-24 pt-8 sm:pt-12">
        <Container>
          <Link
            href={`/${locale}/projekte`}
            className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-forest)] ${focusRing}`}
          >
            <ArrowLeft className="size-4" /> {copy.back}
          </Link>

          <Surface level="sheet" className="mt-7 overflow-hidden p-0 sm:p-0">
            <div className="relative aspect-[21/9] min-h-[260px] overflow-hidden sm:min-h-[360px]">
              <Image
                src={project.image}
                alt={`${project.title}, ${project.municipality}`}
                fill
                priority
                sizes="(min-width: 1280px) 1180px, 100vw"
                className="object-cover"
              />
            </div>
          </Surface>

          <header className="mt-9 max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-[var(--color-forest)]" aria-hidden />
                {project.municipality}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-4 text-[var(--color-forest)]" aria-hidden />
                {project.organization}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-forest)]">
                <ShieldCheck className="size-4" aria-hidden />
                {copy.verified}
              </span>
            </div>
            <h1 className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[66ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
              {project.summary}
            </p>
          </header>

          <section className="mt-10 border-y border-[var(--color-line)] py-6" aria-labelledby="project-habitats">
            <h2 id="project-habitats">
              <Label as="span" size="section">{copy.habitats}</Label>
            </h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {project.categoryIds.map((categoryId) => (
                <div
                  key={categoryId}
                  className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-sage)]/65 px-4 text-sm font-bold text-[var(--color-ink)]"
                >
                  <ProjectCategoryIcon categoryId={categoryId} className="size-4 text-[var(--color-forest)]" />
                  {getProjectCategoryLabel(categoryId, locale)}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 grid overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white lg:grid-cols-[0.78fr_1.22fr]" aria-labelledby="project-location">
            <div className="p-6 sm:p-8">
              <h2 id="project-location">
                <Label as="span" size="section">{copy.location}</Label>
              </h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-semibold text-[var(--color-muted)]">{copy.municipality}</dt>
                  <dd className="mt-1 text-lg font-bold text-[var(--color-ink)]">{project.municipality}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[var(--color-muted)]">{copy.organization}</dt>
                  <dd className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{project.organization}</dd>
                </div>
              </dl>
              <a href={mapUrl} target="_blank" rel="noreferrer" className={`mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-forest)] hover:underline ${focusRing}`}>
                {copy.openMap}
                <ExternalLink className="size-4" aria-hidden />
              </a>
            </div>
            <SouthTyrolMap
              projects={[project, ...otherProjects]}
              activeSlug={project.slug}
              label={copy.mapLabel}
              attribution={copy.mapAttribution}
            />
          </section>

          <section className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
                {copy.whyMatters}
              </h2>
              <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">{project.whyItMatters}</p>
            </div>
            <div className="border-t border-[var(--color-line)] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <h2 className="font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
                {copy.whatItDoes}
              </h2>
              <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">{project.description}</p>
            </div>
          </section>

          <section className="mt-20 rounded-[var(--radius-xl)] bg-[var(--color-sage)]/55 p-6 sm:p-10" aria-labelledby="ecological-impact">
            <div className="max-w-2xl">
              <h2 id="ecological-impact" className="font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
                {copy.ecologicalImpact}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{copy.impactCopy}</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {project.impact.map((metric, index) => (
                <div key={metric.label} className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-5">
                  {index % 2 === 0 ? (
                    <Leaf className="size-5 text-[var(--color-forest)]" aria-hidden />
                  ) : (
                    <Sprout className="size-5 text-[var(--color-forest)]" aria-hidden />
                  )}
                  <p className="mt-5 text-2xl font-bold tracking-[-0.03em] tabular-nums text-[var(--color-ink)]">{metric.value}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-muted)]">{metric.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20" aria-labelledby="project-timeline">
            <h2 id="project-timeline" className="font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">{copy.timeline}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{copy.timelineCopy}</p>
            <ol className="mt-8 grid gap-3 md:grid-cols-5">
              {timeline.map((step, index) => {
                const isComplete = project.status === "completed" || index < currentTimelineIndex;
                const isCurrent = project.status !== "completed" && index === currentTimelineIndex;
                return (
                  <li
                    key={step.id}
                    className={`relative rounded-[var(--radius-lg)] border p-4 ${
                      isCurrent
                        ? "border-[var(--color-forest)] bg-[var(--color-sage)]/55"
                        : "border-[var(--color-line)] bg-white"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="size-5 text-[var(--color-forest)]" aria-hidden />
                    ) : (
                      <Circle className={`size-5 ${isCurrent ? "fill-[var(--color-forest)] text-[var(--color-forest)]" : "text-[var(--color-line)]"}`} aria-hidden />
                    )}
                    <p className="mt-4 text-sm font-bold text-[var(--color-ink)]">{step.label}</p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      {isComplete ? copy.completed : isCurrent ? copy.current : copy.upcoming}
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]" aria-labelledby="project-monitoring">
            <div>
              <h2 id="project-monitoring" className="font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">{copy.monitoring}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">{project.monitoring.summary}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{copy.monitoringCopy}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Leaf, label: copy.species, value: project.monitoring.species },
                { icon: Microscope, label: copy.surveys, value: project.monitoring.surveys },
                { icon: FileText, label: copy.reporting, value: project.monitoring.reporting }
              ].map(({ icon: Icon, label, value }) => (
                <Surface key={label} tone="paper" framed={false} className="sm:p-5">
                  <Icon className="size-5 text-[var(--color-forest)]" aria-hidden />
                  <p className="mt-5 text-xs font-semibold text-[var(--color-muted)]">{label}</p>
                  <p className="mt-1 text-sm font-bold leading-5 text-[var(--color-ink)]">{value}</p>
                </Surface>
              ))}
              <details className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-5 sm:col-span-3">
                <summary className="cursor-pointer text-sm font-bold text-[var(--color-forest)]">{copy.openReport}</summary>
                <div className="mt-4 border-t border-[var(--color-line)] pt-4">
                  <p className="font-semibold text-[var(--color-ink)]">{copy.reportTitle}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{copy.reportNote}</p>
                  <Link href={`/${locale}/methodik`} className={`mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[var(--color-forest)] hover:underline ${focusRing}`}>
                    {copy.methodology}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </details>
            </div>
          </section>

          <section className="mt-20 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="h-fit rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white p-6 sm:p-7">
              <Label size="section">{copy.funding}</Label>
              <p className="mt-5 text-sm font-medium text-[var(--color-muted)]">{copy.fundingProgress}</p>
              <div className="mt-1 flex items-end justify-between gap-3">
                <p className="text-3xl font-bold tracking-[-0.03em] tabular-nums text-[var(--color-ink)]">{formatCurrency(project.funded)}</p>
                <span className="text-sm font-bold tabular-nums text-[var(--color-forest)]">{progress} %</span>
              </div>
              <p className="mt-1 text-xs tabular-nums text-[var(--color-muted)]">
                {copy.fundingTarget.replace("{goal}", formatCurrency(project.goal))}
              </p>
              <Progress value={progress} label={`${copy.fundingProgress}: ${progress} %`} className="mt-5" />
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                <Users className="size-4" aria-hidden />
                {project.supporters} {copy.supporters}
              </p>
              <ProjectSupportTrigger
                label={copy.support}
                className="mt-6 w-full bg-[var(--color-forest)] font-bold hover:bg-[var(--color-ink)]"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-muted)]">
                <span>{copy.tax}</span>
                <ProjectShareButton label={copy.share} title={project.title} />
              </div>
            </aside>
            <Surface level="sheet" tone="paper" framed={false} className="h-fit sm:p-8">
              <div className="flex items-center gap-2 font-bold text-[var(--color-forest)]">
                <ShieldCheck className="size-5" aria-hidden />
                <h2>{copy.transparency}</h2>
              </div>
              <p className="mt-4 text-base leading-7 text-[var(--color-ink)]">
                <strong>{project.organization}</strong> · {project.municipality}
              </p>
              <p className="mt-3 max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">{copy.transparencyCopy}</p>
            </Surface>
          </section>

          <ProjectSponsors
            project={project}
            copy={{
              sponsorsEyebrow: copy.sponsorsEyebrow,
              sponsorsTitle: copy.sponsorsTitle,
              mainSponsor: copy.mainSponsor,
              supportingSponsors: copy.supportingSponsors
            }}
          />

          {otherProjects.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between">
                <div>
                  <Label size="section">{copy.relatedEyebrow}</Label>
                  <h2 className="mt-2 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">{copy.relatedTitle}</h2>
                </div>
                <Link
                  href={`/${locale}/projekte`}
                  className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[var(--color-forest)] hover:underline ${focusRing}`}
                >
                  <span>{copy.showAll}</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} locale={locale} />
                ))}
              </div>
            </div>
          )}

          <section className="mt-20 rounded-[var(--radius-xl)] bg-[var(--color-ink)] p-6 text-white sm:p-10" aria-labelledby="project-final-cta">
            <div className="max-w-2xl">
              <h2 id="project-final-cta" className="font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]">{copy.finalTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">{copy.finalCopy}</p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ProjectSupportTrigger
                label={copy.support}
                variant="accent"
                className={`font-bold ${focusRingOnDark}`}
              />
              <Link
                href={`/${locale}/projekte`}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-white/30 px-5 text-sm font-bold text-white transition hover:bg-white/10 ${focusRingOnDark}`}
              >
                {copy.discoverMore}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </section>
        </Container>
      </section>

      <ProjectSupportDialog
        title={project.title}
        municipality={project.municipality}
        organization={project.organization}
        copy={supportCopy}
      />
    </>
  );
}
