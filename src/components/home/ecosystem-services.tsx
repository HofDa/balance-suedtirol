import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";
import { ServiceIllustration } from "./service-illustrations";
import { textDisplay, textTitleTight } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { MobileCollapseSection, MobileCollapseToggle } from "./mobile-collapse";
import { collapsibleHeading, hiddenWhenCollapsed } from "./mobile-collapse-classes";
import { HabitatSilhouette } from "./habitat-silhouette";

/**
 * Sechs Leistungen als offene Komposition: Überschrift links stehend, rechts
 * zwei versetzte Spalten aus Zeichnung und kurzem Text. Keine Rahmen, keine
 * Flächen – die Haarlinie über jedem Eintrag reicht als Ordnung. Am Schluss
 * wächst aus dem dunklen Abschnitt darunter ein Lebensraum aus Silhouetten, und
 * über seiner niedrigen Mitte steht das Fazit.
 */
export function EcosystemServices({ locale }: { locale: Locale }) {
  const t = getHomeStory(locale).services;

  return (
    <MobileCollapseSection aria-labelledby="services-title" className="bg-[var(--color-sage)]/35 pt-16 sm:pt-32">
      <Container>
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div data-home-reveal="rise" className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <Label size="section">{t.eyebrow}</Label>
              <h2
                id="services-title"
                className={cn(textDisplay, "mt-4 text-[var(--color-ink)]", collapsibleHeading)}
              >
                {t.title}
              </h2>
              <MobileCollapseToggle labelledBy="services-title" />
            </div>
            <p className={cn(hiddenWhenCollapsed, "mt-6 max-w-[46ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]")}>
              {t.lead}
            </p>
          </div>

          <ul className={cn(hiddenWhenCollapsed, "grid gap-x-12 gap-y-6 sm:grid-cols-2 sm:gap-y-14 sm:pb-20")}>
            {t.items.map((item, index) => (
              <li key={item.id} className="sm:even:translate-y-20">
                <div
                  data-home-reveal="rise"
                  style={{ "--home-reveal-delay": `${(index % 2) * 90}ms` } as CSSProperties}
                  className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 border-t border-[var(--color-forest)]/25 pt-5 sm:block sm:pt-6"
                >
                  <ServiceIllustration id={item.id} className="row-span-2 size-14 text-[var(--color-forest)] sm:size-24" />
                  <h3 className={cn(textTitleTight, "text-[var(--color-ink)] max-sm:text-lg sm:mt-5")}>
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-[38ch] leading-7 sm:mt-2 text-[var(--color-muted)]">{item.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Das Fazit im Lebensraum: Der Satz steht über der niedrigen Wiese in der
          Mitte, die Bäume an den Rändern rahmen ihn. Ab `lg` rückt die Szene
          unter den Satz hoch; darunter steht er schlicht über ihr. */}
      <div className={cn(hiddenWhenCollapsed, "mt-16 sm:mt-24")}>
        <Container>
          <p
            data-home-reveal="rise"
            className="relative z-10 mx-auto max-w-[22ch] text-center font-display text-balance text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.15] tracking-[-0.025em] text-[var(--color-ink)]"
          >
            {t.conclusion}
          </p>
        </Container>
        <div data-home-reveal="grow" className="relative -mb-px mt-8 lg:-mt-[9vw]">
          <HabitatSilhouette className="block h-auto w-full text-[var(--color-ink)]" />
        </div>
      </div>
    </MobileCollapseSection>
  );
}
