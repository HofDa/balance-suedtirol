import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRing } from "@/components/ui/focus";
import { ArrowIcon } from "@/components/ui/arrow-icon";

/**
 * Der Lebensraum-Check auf der Startseite: eine Einladung, kein Knopf im Hero.
 * Die Räume stehen als ruhige Liste – Raum und Alltagsbereich –, nicht als
 * Icon-Raster.
 */
export function HouseIntro({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).house;

  return (
    <section aria-label={t.eyebrow} className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
          <div data-home-reveal="rise">
            <SectionHeading eyebrow={t.eyebrow} title={t.title} copy={t.copy} />
            <Link
              href={`/${locale}/haus-tour`}
              className={`group mt-8 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-forest)] ${focusRing}`}
            >
              {t.open}
              <ArrowIcon />
            </Link>
          </div>

          <dl data-home-reveal="rise" className="grid gap-x-10 sm:grid-cols-2">
            {t.rooms.map(([room, topic]) => (
              <div key={room} className="flex items-baseline justify-between gap-4 border-t border-[var(--color-line)] py-4">
                <dt className="font-semibold text-[var(--color-ink)]">{room}</dt>
                <dd className="text-right text-sm text-[var(--color-muted)]">{topic}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
