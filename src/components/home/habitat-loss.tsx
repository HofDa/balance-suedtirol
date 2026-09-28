import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { focusRingOnDark } from "@/components/ui/focus";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";

/**
 * Hier kippt die Erzählung. Der Wechsel auf Tannentinte markiert ihn, ohne
 * Warnfarbe und ohne Katastrophenbild: sieben sachliche Ursachen, zwei belegte
 * Zahlen, dann direkt der Weg zu den Projekten, die dagegen arbeiten.
 */
export function HabitatLoss({ locale }: { locale: Locale }) {
  const t = getHomeStory(locale).loss;

  return (
    <section aria-labelledby="loss-title" className="bg-[var(--color-ink)] py-24 text-white sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div data-home-reveal="rise" className="lg:sticky lg:top-28 lg:self-start">
            <Label size="section" tone="moss">
              {t.eyebrow}
            </Label>
            <h2
              id="loss-title"
              className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]"
            >
              {t.title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-white/80">
              {t.lead}
            </p>

            <dl className="mt-12 grid gap-8 sm:grid-cols-2">
              {t.facts.map(([value, label]) => (
                <div key={value} className="flex flex-col-reverse border-t border-white/15 pt-5">
                  <dt className="mt-3 max-w-[30ch] text-sm leading-6 text-white/75">{label}</dt>
                  <dd className="font-display text-[length:var(--text-display)] leading-none tracking-[-0.035em] tabular-nums text-[var(--color-moss)]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-5 text-white/60">{t.factsSource}</p>
          </div>

          <ol data-home-reveal="rise">
            {t.pressures.map(([title, copy], index) => (
              <li
                key={title}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-t border-white/15 py-6 last:border-b sm:grid-cols-[3rem_minmax(0,1fr)]"
              >
                <span className="pt-0.5 text-sm font-bold tabular-nums text-[var(--color-moss)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-[54ch] leading-7 text-white/70">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div
          data-home-reveal="rise"
          className="mt-20 flex flex-col gap-8 border-t border-white/15 pt-10 sm:mt-24 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-[40ch] font-display text-balance text-[1.625rem] leading-[1.25] tracking-[-0.02em] sm:text-[2rem]">
            {t.closing}
          </p>
          <Link
            href={`/${locale}/projekte`}
            className={`group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-accent-hover)] ${focusRingOnDark}`}
          >
            {t.cta}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
