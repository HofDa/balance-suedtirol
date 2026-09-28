import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";
import { ServiceIllustration } from "./service-illustrations";

/**
 * Sechs Leistungen als offene Komposition: Überschrift links stehend, rechts
 * zwei versetzte Spalten aus Zeichnung und kurzem Text. Keine Rahmen, keine
 * Flächen – die Haarlinie über jedem Eintrag reicht als Ordnung.
 */
export function EcosystemServices({ locale }: { locale: Locale }) {
  const t = getHomeStory(locale).services;

  return (
    <section aria-labelledby="services-title" className="bg-[var(--color-sage)]/35 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div data-home-reveal="rise" className="lg:sticky lg:top-28 lg:self-start">
            <Label size="section">{t.eyebrow}</Label>
            <h2
              id="services-title"
              className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)] text-[var(--color-ink)]"
            >
              {t.title}
            </h2>
            <p className="mt-6 max-w-[46ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
              {t.lead}
            </p>
          </div>

          <ul className="grid gap-x-12 gap-y-14 sm:grid-cols-2 sm:pb-20">
            {t.items.map((item, index) => (
              <li key={item.id} className="sm:even:translate-y-20">
                <div
                  data-home-reveal="rise"
                  style={{ "--home-reveal-delay": `${(index % 2) * 90}ms` } as CSSProperties}
                  className="border-t border-[var(--color-forest)]/25 pt-6"
                >
                  <ServiceIllustration id={item.id} className="size-24 text-[var(--color-forest)]" />
                  <h3 className="mt-5 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em] text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[38ch] leading-7 text-[var(--color-muted)]">{item.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
