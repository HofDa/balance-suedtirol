import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { SectionHeading } from "@/components/ui/section-heading";
import { isLocale, locales } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRing, focusRingOnDark } from "@/components/ui/focus";
import { withBasePath } from "@/lib/public-path";

const route = "/was-ist-balance";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getTranslations(locale).whatIs;
  return {
    title: t.eyebrow,
    description: t.lead,
    alternates: {
      canonical: withBasePath(`/${locale}${route}`),
      languages: Object.fromEntries(locales.map((language) => [language, withBasePath(`/${language}${route}`)]))
    }
  };
}

/**
 * Die Seite zur ersten Frage überhaupt: „Was ist das hier?“ Sie erklärt den
 * Kernpfad Check → Ergebnis → Projekt → Unterstützung, grenzt die Plattform
 * gegen das ab, was sie bewusst nicht tut, und nennt die drei Zielgruppen mit
 * je einem Weg. Die Frage „Wer steht dahinter?“ beantwortet `/ueber-uns`.
 */
export default async function WhatIsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getTranslations(locale).whatIs;
  const notHrefs = [`/${locale}/co2-und-biodiversitaet`, `/${locale}/projekte`, `/${locale}/methodik`];
  const whoHrefs = [`/${locale}/haus-tour`, `/${locale}/projekt-einreichen`, `/${locale}/ueber-uns`];

  return (
    <>
      {/* ① Die These, in einem Satz plus Lead. */}
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

          {/* ② Der Kernpfad in vier Schritten – nummeriert wie die Regeln auf
              der Über-uns-Seite, damit beide als dasselbe Format lesbar sind. */}
          <div className="mt-14 sm:mt-20">
            <SectionHeading eyebrow={t.howEyebrow} title={t.howTitle} />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.steps.map(([title, copy], index) => (
                <Surface key={title} as="li" level="sheet" className="sm:p-6">
                  <p className="text-sm font-bold tabular-nums text-[var(--color-forest)]">0{index + 1}</p>
                  <h3 className="mt-5 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">
                    {title}
                  </h3>
                  <p className="mt-3 leading-7 text-[var(--color-muted)]">{copy}</p>
                </Surface>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ③ Die Abgrenzung: was die Plattform bewusst nicht tut, mit dem Weg zur
          jeweiligen Begründung. */}
      <section className="bg-[var(--color-sage)]/35 py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <SectionHeading eyebrow={t.notEyebrow} title={t.notTitle} />
            <dl>
              {t.nots.map(([title, copy], index) => (
                <div key={title} className="border-t border-[var(--color-line)] py-6 first:border-t-0 first:pt-0">
                  <dt className="text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em] text-[var(--color-ink)]">
                    {title}
                  </dt>
                  <dd className="mt-2 max-w-[58ch] leading-7 text-[var(--color-muted)]">
                    {copy}{" "}
                    <Link
                      href={notHrefs[index]}
                      className={`inline-flex items-center gap-1 py-2 font-semibold text-[var(--color-forest)] underline-offset-4 hover:underline ${focusRing}`}
                    >
                      {t.notLinks[index]}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* ④ Für wen – drei Gruppen, je ein Weg. */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.whoEyebrow} title={t.whoTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.who.map(([title, copy, cta], index) => (
              <Surface key={title} as="article" level="sheet" className="flex flex-col">
                <h3 className="text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="mt-3 max-w-[58ch] flex-1 leading-7 text-[var(--color-muted)]">{copy}</p>
                <Link
                  href={whoHrefs[index]}
                  className={`group mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-[var(--color-forest)] hover:underline ${focusRing}`}
                >
                  {cta}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </Surface>
            ))}
          </div>

          {/* Stand der Plattform – sichtbar, nicht versteckt. */}
          <div className="mt-10 max-w-[68ch] border-t border-[var(--color-line)] pt-6">
            <Label size="block" tone="muted">{t.statusEyebrow}</Label>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{t.statusCopy}</p>
          </div>
        </Container>
      </section>

      {/* ⑤ Anfangen. */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="flex flex-col items-start gap-6 overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink)] px-6 py-12 text-white sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-14 lg:px-16">
            <h2 className="font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
              {t.ctaTitle}
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/haus-tour`}
                className={`group inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-accent-hover)] ${focusRingOnDark}`}
              >
                {t.ctaCheck}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href={`/${locale}/projekte`}
                className={`inline-flex min-h-11 items-center text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 hover:text-[var(--color-moss)] ${focusRingOnDark}`}
              >
                {t.ctaProjects}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
