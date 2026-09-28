import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { focusRing } from "@/components/ui/focus";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { textHeadline } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/arrow-icon";

/**
 * Kurzfassung der CO₂-Haltung: These, die drei Gründe als Überschriften und
 * der Weg zur ganzen Seite. Ausgeführt werden die Gründe dort.
 */
export function CarbonStanceTeaser({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale);
  const t = translations.carbonStance;

  return (
    <section aria-labelledby="carbon-title" className="bg-[var(--color-sage)]/35 py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div data-home-reveal="rise">
            <Label size="section">{t.eyebrow}</Label>
            <h2
              id="carbon-title"
              className={cn(textHeadline, "mt-4 text-[var(--color-ink)]")}
            >
              {t.title}
            </h2>
            <p className="mt-5 max-w-[54ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
              {translations.featured.stanceTeaser}
            </p>
            <Link
              href={`/${locale}/co2-und-biodiversitaet`}
              className={`group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-forest)] ${focusRing}`}
            >
              {translations.featured.stanceReadMore}
              <ArrowIcon />
            </Link>
          </div>

          <div data-home-reveal="rise">
            <Label size="block" tone="muted">
              {t.reasonsEyebrow}
            </Label>
            <ol className="mt-4">
              {t.reasons.map(([title], index) => (
                <li
                  key={title}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-[var(--color-forest)]/25 py-5 last:border-b"
                >
                  <span className="pt-1 text-sm font-bold tabular-nums text-[var(--color-forest)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-[1.375rem] leading-[1.3] tracking-[-0.015em] text-[var(--color-ink)]">
                    {title}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
