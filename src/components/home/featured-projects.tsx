import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRing } from "@/components/ui/focus";
import { ProjectCarousel, carouselItemClass } from "./project-carousel";

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
