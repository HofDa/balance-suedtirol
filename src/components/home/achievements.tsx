import type { CSSProperties } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/public-path";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/config/site";
import { localeTags } from "@/lib/i18n";
import { getTranslations } from "@/config/translations";
import { getAchievementStats, getCompletedProjects, type CompletedProject } from "@/data/achievements";
import { cn, formatCurrency } from "@/lib/utils";
import { textTitle } from "@/components/ui/typography";
import { MobileCollapseSection, MobileCollapseToggle } from "./mobile-collapse";
import { hiddenWhenCollapsed } from "./mobile-collapse-classes";

/**
 * Zwei Ebenen, eine Aussage: oben die Bilanz über alle Projekte, darunter die
 * einzelnen abgeschlossenen Flächen. Die Kennzahlen stehen als Reihe auf einer
 * Fläche statt als vier Karten — sie gehören zusammen und werden zusammen
 * gelesen.
 */
export function Achievements({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).achievements;
  const stats = getAchievementStats();
  const completed = getCompletedProjects(locale);
  const number = new Intl.NumberFormat(localeTags[locale]);
  const photo = getTranslations(locale).hero.photo;

  const figures = [
    { value: number.format(stats.projects), label: t.stats.projects },
    { value: number.format(stats.habitats), label: t.stats.habitats },
    { value: number.format(stats.supporters), label: t.stats.supporters },
    { value: formatCurrency(stats.funded, localeTags[locale]), label: t.stats.funded }
  ];

  return (
    <MobileCollapseSection aria-labelledby="achievements-title" className="py-16 sm:py-32">
      <Container>
        {/* Oben rechts ein Beleg aus dem Gelände: Die Zwergdommel brütet wieder
            in der Millander Au. Die Namensnennung wünscht der Fotograf. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div data-home-reveal="rise">
            <SectionHeading
              id="achievements-title"
              eyebrow={t.eyebrow}
              title={t.title}
              copy={t.copy}
              copyClassName={hiddenWhenCollapsed}
              toggle={<MobileCollapseToggle labelledBy="achievements-title" />}
            />
          </div>
          <figure data-home-reveal="scale" className={cn(hiddenWhenCollapsed, "w-full shrink-0 sm:max-w-md lg:w-[24rem]")}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-sage)]">
              <Image
                src={withBasePath("/projects/millander-au-zwergdommel.webp")}
                alt={t.highlightAlt}
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 448px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-5 text-[var(--color-muted)]">
              {t.highlightCaption} {photo}: Sepp Gamper
            </figcaption>
          </figure>
        </div>

        <div data-home-reveal="scale" className={cn(hiddenWhenCollapsed, "mt-12")}>
          <Surface level="sheet">
            <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {figures.map((figure, index) => (
                <div
                  key={figure.label}
                  className={index > 0 ? "lg:border-l lg:border-[var(--color-line)] lg:pl-8" : undefined}
                >
                  <dt className="sr-only">{figure.label}</dt>
                  <dd>
                    {/* Nicht --text-headline: vier Zahlen nebeneinander, und
                        ein Eurobetrag bei 3rem sprengt seine Spalte. */}
                    <p className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-[var(--color-forest)]">
                      {figure.value}
                    </p>
                    <p className="mt-2 text-[length:var(--text-meta)] leading-[var(--leading-meta)] text-[var(--color-muted)]">
                      {figure.label}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </Surface>
        </div>

        <div data-home-reveal="rise" className={cn(hiddenWhenCollapsed, "mt-16")}>
          <Label size="section" className="mb-3">
            {t.completedEyebrow}
          </Label>
          <h3 className="max-w-[48ch] font-display text-balance text-[length:var(--text-title)] leading-[var(--leading-title)] text-[var(--color-ink)]">
            {t.completedTitle}
          </h3>
        </div>

        {completed.length === 0 ? (
          <p data-home-reveal="rise" className={cn(hiddenWhenCollapsed, "mt-6 text-[length:var(--text-body)] text-[var(--color-muted)]")}>
            {t.completedEmpty}
          </p>
        ) : (
          <ul className={cn(hiddenWhenCollapsed, "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3")}>
            {completed.map((project, index) => (
              <li
                key={project.slug}
                data-home-reveal="rise"
                style={{ "--home-reveal-delay": `${index * 65}ms` } as CSSProperties}
              >
                <CompletedCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </MobileCollapseSection>
  );
}

function CompletedCard({ project }: { project: CompletedProject }) {
  return (
    <Surface
      as="article"
      className="group flex h-full flex-col transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className={cn(textTitle, "tracking-[-0.01em] text-[var(--color-ink)]")}>
          {project.title}
        </h4>
        <span className="shrink-0 text-[length:var(--text-meta)] font-semibold text-[var(--color-muted)]">
          {project.year}
        </span>
      </div>
      <p className="mt-1 text-[length:var(--text-meta)] font-semibold text-[var(--color-forest)]">
        {project.place}
      </p>
      <p className="mt-3 text-[length:var(--text-meta)] leading-[var(--leading-body)] text-[var(--color-muted)]">
        {project.summary}
      </p>

      <div className="mt-auto flex items-baseline gap-2 border-t border-[var(--color-line)] pt-4 text-[length:var(--text-meta)]">
        <span className="font-display text-[1.5rem] leading-none tracking-[-0.02em] text-[var(--color-ink)]">
          {project.result.value}
        </span>
        <span className="text-[var(--color-muted)]">{project.result.label}</span>
      </div>
    </Surface>
  );
}
