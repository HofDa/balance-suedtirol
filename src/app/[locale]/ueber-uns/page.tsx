import { localizedAlternates } from "@/lib/site-metadata";
import Link from "@/components/ui/site-link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Leaf, Sprout } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { SectionHeading } from "@/components/ui/section-heading";
import { isLocale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRing, focusRingOnDark } from "@/components/ui/focus";
import { textDisplay, textHeadline, textLead, textTitleTight } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/arrow-icon";

const route = "/ueber-uns";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getTranslations(locale).about;
  return {
    title: t.eyebrow,
    description: t.lead,
    alternates: localizedAlternates(locale, route)
  };
}

/**
 * Die Seite zur Frage „Wer steht dahinter?“. Das Team als Gruppe, die beiden
 * Initiativen und die Arbeitsregeln. Einzelne Personen werden bewusst nicht
 * genannt.
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
            <h1 className={cn(textDisplay, "mt-4")}>
              {t.title}
            </h1>
            <p className={cn(textLead, "mt-6")}>
              {t.lead}
            </p>
          </div>

          {/* ② Das Team – als Gruppe beschrieben, ohne einzelne Personen. */}
          <Surface as="section" level="sheet" className="mt-12 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <div>
                <Label size="block">{t.teamEyebrow}</Label>
                <h2 className={cn(textHeadline, "mt-4")}>
                  {t.teamTitle}
                </h2>
              </div>
              <div className="space-y-5">
                {t.teamBio.map((paragraph) => (
                  <p key={paragraph} className="max-w-[60ch] leading-7 text-[var(--color-ink)]">
                    {paragraph}
                  </p>
                ))}
              </div>
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
                  <h3 className={cn(textTitleTight, "mt-5")}>
                    {org.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-forest)]">{org.role}</p>
                  <p className="mt-4 max-w-[58ch] leading-7 text-[var(--color-muted)]">{org.copy}</p>
                  <Link
                    href={orgHrefs[index]}
                    className={`group mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-[var(--color-forest)] hover:underline ${focusRing}`}
                  >
                    {org.cta}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
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
                <h3 className={cn(textTitleTight, "mt-5")}>
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
            <h2 className={cn(textHeadline, "max-w-3xl")}>
              {t.ctaTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">{t.ctaCopy}</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href={`/${locale}/projekte`}
                className={`group inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper)] ${focusRingOnDark}`}
              >
                {t.ctaProjects}
                <ArrowIcon />
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
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
