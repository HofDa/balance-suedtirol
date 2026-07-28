import { Container } from "@/components/ui/container";
import { heroImage } from "@/config/hero";
import { getTranslations } from "@/config/translations";
import type { Locale } from "@/config/site";
import { HeroActions } from "./hero-actions";
import { HeroBackdrop } from "./hero-backdrop";
import { Label } from "@/components/ui/label";
import { focusRingOnDark } from "@/components/ui/focus";

/**
 * Der Hero beantwortet nur vier Fragen: Worum geht es, was muss ich tun,
 * was erhalte ich und wie belastbar ist das Ergebnis? Wissenschaftliches Zitat,
 * Prozessgrafik und Kennzahlen stehen bewusst nicht in dieser ersten Ebene.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).hero;

  return (
    <section className="hero relative isolate overflow-hidden bg-[var(--color-ink)]" aria-labelledby="hero-title">
      <HeroBackdrop />

      <Container className="hero-shell relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-12 max-[359px]:py-6 sm:py-16">
        <div className="max-w-[48rem]">
          <Label size="block" tone="moss" className="hero-reveal hero-reveal-eyebrow">
            {t.eyebrow}
          </Label>

          <h1
            id="hero-title"
            className="font-display hero-reveal hero-reveal-headline mt-4 text-balance text-[length:var(--text-display)] leading-[var(--leading-display)] text-white"
          >
            {t.title} <span className="block text-[var(--color-moss)]">{t.accent}</span>
          </h1>

          {/* Heller Text auf dunklem Grund: eine Spur mehr Durchschuss und
              Laufweite, sonst wirkt er gedrängt. */}
          <p className="hero-reveal hero-reveal-copy mt-5 max-w-[58ch] text-[length:var(--text-body)] leading-[1.75] tracking-[0.01em] text-white max-[359px]:mt-4 sm:text-[length:var(--text-body-lg)]">
            {t.copy}
          </p>

          <HeroActions locale={locale} />
        </div>

        <p className="absolute bottom-3 right-5 text-xs font-medium text-white/90 sm:bottom-4 sm:text-sm">
          {t.photo}: <span className="text-white/80">{heroImage.photographer}</span> ·{" "}
          <a
            href={heroImage.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className={`text-white underline decoration-white/40 underline-offset-2 hover:decoration-white ${focusRingOnDark}`}
          >
            {heroImage.license}
          </a>
        </p>
      </Container>
    </section>
  );
}
