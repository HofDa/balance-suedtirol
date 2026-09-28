import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { focusRing } from "@/components/ui/focus";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";

/**
 * „Was ist b*alance?“ steht bewusst spät: Erst wenn klar ist, was auf dem
 * Spiel steht und welche Projekte es gibt, lohnt die Erklärung des Modells.
 * Vier Schritte als nummerierte Zeile, nicht als Kacheln.
 */
export function BalanceModel({ locale }: { locale: Locale }) {
  const t = getHomeStory(locale).model;

  return (
    <section aria-labelledby="model-title" className="bg-[var(--color-sage)]/35 py-24 sm:py-32">
      <Container>
        <div data-home-reveal="rise" className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[62ch]">
            <Label size="section">{t.eyebrow}</Label>
            <h2
              id="model-title"
              className="mt-4 font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)] text-[var(--color-ink)]"
            >
              {t.title}
            </h2>
            <p className="mt-5 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
              {t.lead}
            </p>
          </div>
          <Link
            href={`/${locale}/was-ist-balance`}
            className={`group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[var(--color-forest)] ${focusRing}`}
          >
            {t.more}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>

        <ol data-home-reveal="rise" className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map(([title, copy], index) => (
            <li key={title} className="border-t border-[var(--color-forest)]/25 py-6">
              <span className="font-display text-[2.5rem] leading-none tracking-[-0.03em] tabular-nums text-[var(--color-forest)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em] text-[var(--color-ink)]">
                {title}
              </h3>
              <p className="mt-2 max-w-[36ch] leading-7 text-[var(--color-muted)]">{copy}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
