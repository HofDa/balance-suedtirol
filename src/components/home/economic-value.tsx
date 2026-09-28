import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";
import { getTranslations } from "@/config/translations";

/**
 * Die Brücke von Ökologie zu Wirtschaft – bewusst nüchtern: vier Abhängigkeiten
 * aus dem Südtiroler Alltag, dazu zwei belegte Zahlen. Die alarmierenden
 * Billionenbeträge der Erklärseite bleiben dort; hier geht es um Stabilität,
 * nicht um Schrecken.
 */
export function EconomicValue({ locale }: { locale: Locale }) {
  const t = getHomeStory(locale).economy;
  // Dieselben belegten Zahlen wie auf der Erklärseite: Kreditabhängigkeit und
  // Anteil an der EU-Wirtschaftsleistung.
  const figures = getTranslations(locale).biodiversityExplainer.economyFigures.slice(2);

  return (
    <section aria-labelledby="economy-title" className="py-24 sm:py-32">
      <Container>
        <div data-home-reveal="rise" className="max-w-[62ch]">
          <Label size="section">{t.eyebrow}</Label>
          <h2
            id="economy-title"
            className="mt-4 font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)] text-[var(--color-ink)]"
          >
            {t.title}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
            {t.lead}
          </p>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-20">
          <dl data-home-reveal="rise" className="grid gap-x-10 sm:grid-cols-2">
            {t.points.map(([term, description]) => (
              <div key={term} className="border-t border-[var(--color-line)] py-6">
                <dt className="text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em] text-[var(--color-ink)]">
                  {term}
                </dt>
                <dd className="mt-2 max-w-[44ch] leading-7 text-[var(--color-muted)]">{description}</dd>
              </div>
            ))}
          </dl>

          <div data-home-reveal="rise" className="lg:border-l lg:border-[var(--color-line)] lg:pl-12">
            <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
              {figures.map(([value, label]) => (
                <div key={value} className="flex flex-col-reverse">
                  <dt className="mt-3 max-w-[30ch] text-sm leading-6 text-[var(--color-muted)]">{label}</dt>
                  <dd className="font-display text-[length:var(--text-display)] leading-none tracking-[-0.035em] tabular-nums text-[var(--color-forest)]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-xs leading-5 text-[var(--color-muted)]">{t.source}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
