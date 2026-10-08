import { localeTags } from "@/lib/i18n";
import Image from "next/image";
import Link from "@/components/ui/site-link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ExternalLink,
  MapPin,
  ShieldCheck
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";
import type { Locale } from "@/config/site";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { focusRing } from "@/components/ui/focus";
import { ProjectSponsors } from "./project-sponsors";
import { ProjectCategoryIcon } from "./project-category";
import { getProjectCategoryLabel } from "@/config/project-categories";
import { getTranslations } from "@/config/translations";
import { SouthTyrolMap } from "./south-tyrol-map";
import { ProjectShareButton } from "./project-share-button";
import { ProjectSupportBar } from "./project-support-bar";
import { BeforeAfterSlider } from "./before-after-slider";
import { ProjectGallery } from "./project-gallery";
import {
  ProjectSupportDialog,
  type ProjectSupportCopy
} from "./project-support";
import { withBasePath } from "@/lib/public-path";
import { textDisplay, textHeadline } from "@/components/ui/typography";

interface ProjectDetailProps {
  project: Project;
  otherProjects: Project[];
  locale: Locale;
}

export function ProjectDetail({ project, otherProjects, locale }: ProjectDetailProps) {
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
  const isHedgehogProject = project.slug === "vorfahrt-fuer-den-igel";

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
      geo: project.locationApproximate ? undefined : {
        "@type": "GeoCoordinates",
        latitude: project.location.lat,
        longitude: project.location.lng
      }
    },
    funder: project.organizationPending ? undefined : {
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
      <section className="pt-8 sm:pt-12">
        <Container className="pb-16">
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
                afterAlignment={beforeAfter.afterAlignment}
                alt={`${project.title}, ${project.municipality}`}
                labels={{
                  before: beforeAfter.beforeLabel ?? copy.before,
                  after: beforeAfter.afterLabel ?? copy.after,
                  slider: copy.beforeAfterSliderLabel
                }}
                aspectClassName={
                  project.slug === "widumwiese-kiens"
                    ? "aspect-[1441/1045]"
                    : project.slug === "millander-au-erweiterung"
                      ? "aspect-[1491/1055]"
                      : "aspect-[4/3] sm:aspect-[1491/1055]"
                }
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
              <div
                className={cn(
                  "relative overflow-hidden",
                  isHedgehogProject
                    ? "aspect-[4/3] sm:aspect-[16/9]"
                    : project.slug === "widumwiese-kiens"
                      ? "aspect-[16/9]"
                      : "aspect-[21/9] min-h-[260px] sm:min-h-[360px]"
                )}
              >
                <Image
                  src={withBasePath(project.image)}
                  alt={`${project.title}, ${project.municipality}`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1180px, 100vw"
                  className={cn(
                    "object-cover",
                    isHedgehogProject && "object-[35%_50%] sm:object-center"
                  )}
                />
                {project.image === "/placeholder-grid.svg" && (
                  <p className="absolute inset-x-0 bottom-0 bg-white/90 px-5 py-3 text-sm text-[var(--color-muted)]">{copy.imagePending}</p>
                )}
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
              {!project.organizationPending && (
                <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-forest)]">
                  <ShieldCheck className="size-4" aria-hidden />
                  {copy.verified}
                </span>
              )}
            </div>
            <h1 className={cn(textDisplay, "mt-4")}>
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
                {project.sites && project.sites.length > 0 ? (
                  <div>
                    <dt className="text-xs font-semibold text-[var(--color-muted)]">{copy.sites}</dt>
                    <dd className="mt-1">
                      <ul className="space-y-2">
                        {project.sites.map((site) => (
                          <li key={site.name}>
                            <span className="block text-lg font-bold leading-snug text-[var(--color-ink)]">{site.name}</span>
                            <span className="block text-sm text-[var(--color-muted)]">{copy.municipality} {site.municipality}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : (
                  <div>
                    <dt className="text-xs font-semibold text-[var(--color-muted)]">{copy.municipality}</dt>
                    <dd className="mt-1 text-lg font-bold text-[var(--color-ink)]">{project.municipality}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-semibold text-[var(--color-muted)]">{copy.organization}</dt>
                  <dd className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{project.organization}</dd>
                </div>
                {project.organizationAddress && (
                  <div>
                    <dt className="text-xs font-semibold text-[var(--color-muted)]">{copy.organizationAddress}</dt>
                    <dd className="mt-1 text-sm text-[var(--color-ink)]">{project.organizationAddress}</dd>
                  </div>
                )}
              </dl>
              {project.locationApproximate && (
                <p className="mt-5 text-sm leading-6 text-[var(--color-muted)]">{copy.locationApproximate}</p>
              )}
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
              <h2 className={textHeadline}>
                {copy.whyMatters}
              </h2>
              <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">{project.whyItMatters}</p>
            </div>
            <div className="border-t border-[var(--color-line)] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <h2 className={textHeadline}>
                {copy.whatItDoes}
              </h2>
              <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">{project.description}</p>
            </div>
          </section>

          {/* Kennzahlen als offene Zeile wie auf der Startseite: Haarlinie oben,
              senkrechte Trennungen, Zahl in der Display-Schrift. Keine Kästen
              in einem Kasten. */}
          <section className="mt-20" aria-labelledby="ecological-impact">
            <div className="max-w-2xl">
              <h2 id="ecological-impact" className="font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
                {copy.ecologicalImpact}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{copy.impactCopy}</p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[var(--color-line)] pt-8 sm:mt-10 lg:grid-cols-4 lg:gap-x-0">
              {project.impact.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`flex flex-col-reverse justify-end ${index % 4 > 0 ? "lg:border-l lg:border-[var(--color-line)] lg:pl-10" : ""} ${
                    index % 4 < 3 ? "lg:pr-10" : ""
                  }`}
                >
                  <dt className="mt-3 max-w-[24ch] text-sm leading-6 text-[var(--color-muted)]">{metric.label}</dt>
                  <dd className="whitespace-nowrap font-display text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.035em] tabular-nums text-[var(--color-forest)]">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

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

          <ProjectSponsors
            project={project}
            copy={{
              title: copy.backersTitle,
              intro: copy.transparencyCopy,
              organization: copy.organization,
              supportedBy: copy.supportedBy,
              mainSponsor: copy.mainSponsor,
              coSponsors: copy.coSponsors,
              sponsorOpen: copy.sponsorOpen,
              sponsorOpenShort: copy.sponsorOpenShort,
              placeholder: getTranslations(locale).card.placeholder,
              website: copy.sponsorWebsite
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
                  className={`group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-forest)] hover:underline ${focusRing}`}
                >
                  <span>{copy.showAll}</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} locale={locale} />
                ))}
              </div>
            </div>
          )}

        </Container>

        <ProjectSupportBar
          funded={project.funded}
          goal={project.goal}
          supporters={project.supporters}
          localeTag={localeTags[locale]}
          copy={copy}
          share={
            <ProjectShareButton
              copy={copy}
              title={project.title}
              description={project.summary}
              image={withBasePath(project.image)}
              className="sm:px-6"
              tone="dark"
            />
          }
        />
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
