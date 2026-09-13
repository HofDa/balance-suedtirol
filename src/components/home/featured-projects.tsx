import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRing } from "@/components/ui/focus";
import { ProjectCarousel, carouselItemClass } from "./project-carousel";
import { ArrowRight } from "lucide-react";
import { ExplainerButton } from "./explainer-button";

export function FeaturedProjects({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).featured;
  const stance = getTranslations(locale).carbonStance;
  const bio = getTranslations(locale).biodiversityExplainer;
  const localizedProjects = getProjects(locale);
  return (
    <section className="relative bg-[var(--color-sage)]/35 py-24 sm:py-32">
      {/* Ab Tablet schweben sie oben rechts über der Sektion, bündig mit dem
          Container-Rand; am Handy stehen sie im Fluss über der Überschrift,
          sonst kollidieren sie mit ihr. */}
      <Container className="-mt-12 mb-8 flex flex-wrap items-end justify-end gap-3 sm:pointer-events-none sm:absolute sm:inset-x-0 sm:top-8 sm:z-10 sm:my-0">
        <ExplainerButton
          shape="leaf"
          className="sm:pointer-events-auto"
          copy={{
            button: bio.button,
            close: t.stanceClose,
            eyebrow: bio.eyebrow,
            title: bio.title,
            lead: bio.lead,
            sections: [
              { heading: bio.servicesTitle, items: bio.services },
              { heading: bio.economyTitle, copy: bio.economyCopy },
              { heading: bio.localTitle, copy: bio.localCopy }
            ],
            source: { label: bio.source },
            cta: { label: bio.cta, href: `/${locale}/haus-tour` }
          }}
        />
        <ExplainerButton
          shape="cloud"
          className="sm:pointer-events-auto"
          copy={{
            button: t.stanceButton,
            close: t.stanceClose,
            eyebrow: stance.eyebrow,
            title: stance.title,
            lead: stance.lead,
            sections: [
              { heading: stance.reasonsTitle, items: stance.reasons.map(([title]) => title) },
              { heading: stance.insteadTitle, copy: stance.insteadCopy }
            ],
            cta: { label: t.stanceReadMore, href: `/${locale}/co2-und-biodiversitaet` }
          }}
        />
      </Container>
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

        {/* Die Einblendung liegt auf der Spur, nicht mehr gestaffelt auf den
            einzelnen Karten: Wer seitlich aus dem Ausschnitt ragt, schneidet
            den Viewport nie, und der IntersectionObserver ließe solche Karten
            auf Deckkraft 0 stehen, bis man sie herangeblättert hat. */}
        <div data-home-reveal="rise" className="mt-12">
          <ProjectCarousel copy={{ previous: t.previous, next: t.next }}>
            {localizedProjects.map((project) => (
              <li key={project.slug} className={carouselItemClass}>
                <ProjectCard project={project} locale={locale} />
              </li>
            ))}
          </ProjectCarousel>
        </div>
      </Container>
    </section>
  );
}
