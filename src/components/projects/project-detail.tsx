import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ExternalLink,
  Leaf,
  MapPin,
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
import { BeforeAfterSlider } from "./before-after-slider";
import { ProjectGallery } from "./project-gallery";
import {
  ProjectSupportDialog,
  ProjectSupportTrigger,
  type ProjectSupportCopy
} from "./project-support";
import { withBasePath } from "@/lib/public-path";

interface ProjectDetailProps {
  project: Project;
  otherProjects: Project[];
  locale: Locale;
}

export function ProjectDetail({ project, otherProjects, locale }: ProjectDetailProps) {
  // Ein Projekt ohne entschiedenes Ziel bekommt keinen Balken: 0 von 0 wäre
  // weder 0 % noch 100 %, sondern eine Zahl, die es nicht gibt.
  const hasFundingTarget = typeof project.goal === "number" && project.goal > 0;
  const progress = hasFundingTarget
    ? Math.min(100, Math.round(((project.funded ?? 0) / project.goal!) * 100))
    : null;
  const copy = getTranslations(locale).projectDetail;
  const mapUrl = `https://www.openstreetmap.org/?mlat=${project.location.lat}&mlon=${project.location.lng}#map=14/${project.location.lat}/${project.location.lng}`;
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

  const beforeAfter = project.beforeAfter?.isPlaceholder ? undefined : project.beforeAfter;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: project.summary,
    image: withBasePath(project.image),
    location: {
      "@type": "Place",
      name: project.municipality,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Südtirol / Alto Adige",
        addressCountry: "IT"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: project.location.lat,
        longitude: project.location.lng
      }
    },
    funder: {
      "@type": "Organization",
      name: project.organization
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="pb-24 pt-8 sm:pt-12">
        <Container>
          <Link
            href={`/${locale}/projekte`}
            className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-forest)] ${focusRing}`}
          >
            <ArrowLeft className="size-4" /> {copy.back}
          </Link>

          {/* Gibt es ein echtes Vorher/Nachher-Paar, ist es das Hero: Es erzählt die
              Maßnahme besser als jedes Einzelbild. Bearbeitete Platzhalterpaare
              bleiben außen vor, bis echte Vorher-Fotos vorliegen. */}
          {beforeAfter ? (
            <figure className="mt-7">
              <BeforeAfterSlider
                before={beforeAfter.before}
                after={beforeAfter.after}
                afterScaleY={beforeAfter.afterScaleY}
                alt={`${project.title}, ${project.municipality}`}
                labels={{
                  before: beforeAfter.beforeLabel ?? copy.before,
                  after: beforeAfter.afterLabel ?? copy.after,
                  slider: copy.beforeAfterSliderLabel
                }}
                aspectClassName={project.slug === "millander-au-erweiterung" ? "aspect-[1491/1055]" : "aspect-[4/3] sm:aspect-[1491/1055]"}
                priority
                className="rounded-[var(--radius-xl)]"
              />
              <figcaption className="mt-3 w-full text-xs leading-5 text-[var(--color-muted)]">
                {beforeAfter.caption}
                {beforeAfter.caption ? " " : ""}
                <span className="text-[var(--color-forest)]">{copy.beforeAfterCopy}</span>
              </figcaption>
            </figure>
          ) : (
            <Surface level="sheet" className="mt-7 overflow-hidden p-0 sm:p-0">
              <div className="relative aspect-[21/9] min-h-[260px] overflow-hidden sm:min-h-[360px]">
                <Image
                  src={withBasePath(project.image)}
                  alt={`${project.title}, ${project.municipality}`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1180px, 100vw"
                  className="object-cover"
                />
              </div>
            </Surface>
          )}

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
              projects={[project]}
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

          {project.sketch && (
            <section className="mt-20" aria-labelledby="project-sketch">
              <h2 id="project-sketch" className="font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
                {copy.sketchTitle}
              </h2>
              <figure className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)]">
                <Image
                  src={withBasePath(project.sketch.src)}
                  alt={project.sketch.alt}
                  width={670}
                  height={945}
                  sizes="(max-width: 768px) 100vw, 670px"
                  className="mx-auto h-auto w-full max-w-[670px]"
                />
              </figure>
            </section>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-20" aria-labelledby="project-gallery">
              <div className="max-w-2xl">
                <h2 id="project-gallery" className="font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
                  {copy.galleryTitle}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{copy.galleryCopy}</p>
              </div>
              <ProjectGallery
                images={project.gallery}
                labels={{ previous: copy.galleryPrevious, next: copy.galleryNext, image: copy.galleryImage, of: getTranslations(locale).card.of, photo: copy.photo }}
              />
            </section>
          )}

          <section className="mt-20 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="h-fit rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white p-6 sm:p-7">
              <Label size="section">{copy.funding}</Label>
              {progress === null ? (
                <p className="mt-5 text-sm leading-6 text-[var(--color-muted)]">{copy.fundingOpen}</p>
              ) : (
                <>
                  <p className="mt-5 text-sm font-medium text-[var(--color-muted)]">{copy.fundingProgress}</p>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    <p className="text-3xl font-bold tracking-[-0.03em] tabular-nums text-[var(--color-ink)]">{formatCurrency(project.funded ?? 0)}</p>
                    <span className="text-sm font-bold tabular-nums text-[var(--color-forest)]">{progress} %</span>
                  </div>
                  <p className="mt-1 text-xs tabular-nums text-[var(--color-muted)]">
                    {copy.fundingTarget.replace("{goal}", formatCurrency(project.goal!))}
                  </p>
                  <Progress value={progress} label={`${copy.fundingProgress}: ${progress} %`} className="mt-5" />
                </>
              )}
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                <Users className="size-4" aria-hidden />
                {project.supporters} {copy.supporters}
              </p>
              <ProjectSupportTrigger
                label={copy.support}
                className="mt-6 w-full bg-[var(--color-forest)] font-bold hover:bg-[var(--color-ink)]"
              />
              <ProjectShareButton copy={copy} title={project.title} description={project.summary} image={withBasePath(project.image)} />
              <p className="mt-3 text-xs text-[var(--color-muted)]">{copy.tax}</p>
            </aside>
            <Surface level="sheet" tone="paper" framed={false} className="h-fit sm:p-8">
              <div className="flex items-center gap-2 font-bold text-[var(--color-forest)]">
                <ShieldCheck className="size-5" aria-hidden />
                <h2>{copy.transparency}</h2>
              </div>
              <p className="mt-4 text-base leading-7 text-[var(--color-ink)]">
                <strong>{project.organization}</strong>
                {project.organizationAddress ? (
                  <span className="mt-1 block text-sm text-[var(--color-muted)]">{project.organizationAddress}</span>
                ) : <> · {project.municipality}</>}
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
