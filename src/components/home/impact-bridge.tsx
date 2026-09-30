import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";
import { getTranslations } from "@/config/translations";
import { focusRingOnDark } from "@/components/ui/focus";
import { ArrowIcon } from "@/components/ui/arrow-icon";

/**
 * Der Abschluss nimmt die Leitzeile des Heros wieder auf. Eine Aktion mit
 * Gewicht, eine als Textlink – keine Box in der Box. Darunter, durch eine
 * Haarlinie getrennt, die CO₂-Haltung als eine Zeile: Sie hat ihre eigene
 * Seite und braucht auf der Startseite keinen eigenen Abschnitt mehr.
 */
export function ImpactBridge({ locale }: { locale: Locale }) {
  const t = getHomeStory(locale).closing;
  const translations = getTranslations(locale);
  const stance = translations.carbonStance;

  return (
    <section id="about-balance" aria-labelledby="closing-title" className="scroll-mt-24 bg-[var(--color-ink)] py-28 text-white sm:py-40">
      <Container>
        <div data-home-reveal="rise" className="max-w-4xl">
          <h2
            id="closing-title"
            className="font-display text-balance text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.02] tracking-[-0.035em]"
          >
            {t.title}
          </h2>
          <p className="mt-6 max-w-[56ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-white/80">
            {t.copy}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href={`/${locale}/projekte`}
              className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-accent-hover)] ${focusRingOnDark}`}
            >
              {t.cta}
              <ArrowIcon className="duration-200" />
            </Link>
            <Link
              href={`/${locale}/projekt-einreichen`}
              className={`inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-[var(--color-moss)] ${focusRingOnDark}`}
            >
              {t.submit}
            </Link>
          </div>
        </div>

        <Link
          href={`/${locale}/co2-und-biodiversitaet`}
          data-home-reveal="rise"
          className={`group mt-16 flex flex-col gap-2 border-t border-white/15 pt-8 sm:mt-20 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 ${focusRingOnDark}`}
        >
          <span className="max-w-[48ch] font-display text-balance text-[1.375rem] leading-[1.3] tracking-[-0.015em] text-white transition-colors group-hover:text-[var(--color-moss)] sm:text-[1.625rem]">
            {stance.title}
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[var(--color-moss)]">
            {translations.featured.stanceReadMore}
            <ArrowIcon className="duration-200" />
          </span>
        </Link>
      </Container>
    </section>
  );
}
