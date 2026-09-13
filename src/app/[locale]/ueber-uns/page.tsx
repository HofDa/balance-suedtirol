import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Leaf, Sprout } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { SectionHeading } from "@/components/ui/section-heading";
import { isLocale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRing, focusRingOnDark } from "@/components/ui/focus";

export const metadata: Metadata = {
  title: "Über uns | b*alance Südtirol",
  description:
    "Wer hinter b*alance steht: eine Südtiroler Biologin/ein Südtiroler Biologe, b*nature und b*coop – und wie wir arbeiten."
};

/**
 * Die Seite zur Frage „Wer steht dahinter?“. Person, die beiden Initiativen
 * und die Arbeitsregeln. Name, Foto und Lebenslauf sind noch Platzhalter und
 * als solche sichtbar markiert – wie die Musterzitate im Hero.
 */
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getTranslations(locale).about;
  const orgHrefs = [`/${locale}/projekte`, `/${locale}/haus-tour`];
  const orgIcons = [Leaf, Sprout];

  return (
    <>
      {/* ① Die These. */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Label size="section">{t.eyebrow}</Label>
            <h1 className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]">
              {t.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
              {t.lead}
            </p>
          </div>

          {/* ② Die Person – Porträt links, Text rechts. */}
          <Surface as="section" level="sheet" className="mt-12 grid gap-8 sm:p-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-12">
            <div>
              <Label size="block">{t.personEyebrow}</Label>
              <div
                className="mt-5 flex aspect-[4/5] w-full max-w-[260px] items-end overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-sage)]"
                aria-hidden
              >
                <div className="w-full bg-gradient-to-t from-[var(--color-forest)]/25 to-transparent p-4">
                  <Leaf className="size-8 text-[var(--color-forest)]/70" />
                </div>
              </div>
              <p className="mt-5 text-lg font-bold text-[var(--color-ink)]">{t.personName}</p>
              <p className="text-sm text-[var(--color-muted)]">{t.personRole}</p>
              <span className="mt-3 inline-block rounded-[var(--radius-sm)] bg-[var(--color-ink)]/6 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                {t.personPlaceholder}
              </span>
            </div>
            <div className="space-y-5 lg:pt-9">
              {t.personBio.map((paragraph) => (
                <p key={paragraph} className="max-w-[60ch] leading-7 text-[var(--color-ink)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </Surface>
        </Container>
      </section>

      {/* ③ Die beiden Initiativen. */}
      <section className="bg-[var(--color-sage)]/35 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.orgsEyebrow} title={t.orgsTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {t.orgs.map((org, index) => {
              const Icon = orgIcons[index];
              return (
                <Surface key={org.name} as="article" level="sheet" className="flex flex-col">
                  <div className="flex size-11 items-center justify-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">
                    {org.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-forest)]">{org.role}</p>
                  <p className="mt-4 max-w-[58ch] leading-7 text-[var(--color-muted)]">{org.copy}</p>
                  <Link
                    href={orgHrefs[index]}
                    className={`group mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-[var(--color-forest)] hover:underline ${focusRing}`}
                  >
                    {org.cta}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </Surface>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ④ Die Arbeitsregeln – nummeriert wie auf der Methodik- und der CO₂-Seite. */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.principlesEyebrow} title={t.principlesTitle} />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.principles.map(([title, copy], index) => (
              <Surface key={title} as="li" level="sheet">
                <p className="text-sm font-bold tabular-nums text-[var(--color-forest)]">0{index + 1}</p>
                <h3 className="mt-5 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="mt-3 max-w-[58ch] leading-7 text-[var(--color-muted)]">{copy}</p>
              </Surface>
            ))}
          </ol>
        </Container>
      </section>

      {/* ⑤ Mitmachen. */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink)] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
            <h2 className="max-w-3xl font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
              {t.ctaTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">{t.ctaCopy}</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href={`/${locale}/projekte`}
                className={`group inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper)] ${focusRingOnDark}`}
              >
                {t.ctaProjects}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href={`/${locale}/projekt-einreichen`}
                className={`group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-[var(--color-moss)] ${focusRingOnDark}`}
              >
                {t.ctaSubmit}
              </Link>
              <Link
                href={`/${locale}/methodik`}
                className={`group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-[var(--color-moss)] ${focusRingOnDark}`}
              >
                {t.ctaMethod}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
