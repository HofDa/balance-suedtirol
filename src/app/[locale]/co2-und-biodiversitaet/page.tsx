import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { SectionHeading } from "@/components/ui/section-heading";
import { isLocale, locales } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRing, focusRingOnDark } from "@/components/ui/focus";
import { withBasePath } from "@/lib/public-path";

const route = "/co2-und-biodiversitaet";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getTranslations(locale);
  return {
    title: t.carbonStance.eyebrow,
    description: t.featured.stanceTeaser,
    alternates: {
      canonical: withBasePath(`/${locale}${route}`),
      languages: Object.fromEntries(locales.map((language) => [language, withBasePath(`/${language}${route}`)]))
    }
  };
}

/**
 * Die Haltungsseite zur naheliegendsten Rückfrage an den Check: „Ihr rechnet
 * mein CO₂ aus — wo kann ich es ausgleichen?"
 *
 * Die vier Gründe argumentieren ohne Zahlen aus dem eigenen Haus: Bilanzgrenze
 * des Rechners (`docs/BILANZ-FAKTOREN.md`) und die Methodikregel, dass eine
 * Aussage ohne Beleg gestrichen wird. Der Südtirol-Abschnitt („Und warum nicht
 * hier?“) führt drei Kennzahlen – jede mit Quelle unter dem Block.
 */
export default async function CarbonStancePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getTranslations(locale).carbonStance;

  return (
    <>
      {/* ① Die These, allein auf der Seite. */}
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

          {/* ② Erst die Bilanzgrenze klären, sonst liest sich die Absage wie
              Ausweichen vor der Zahl. */}
          <Surface as="section" level="sheet" className="mt-12 max-w-3xl">
            <Label size="block">{t.scopeEyebrow}</Label>
            <h2 className="mt-4 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">
              {t.scopeTitle}
            </h2>
            <p className="mt-4 max-w-[58ch] leading-7 text-[var(--color-muted)]">{t.scopeCopy}</p>
          </Surface>
        </Container>
      </section>

      {/* ③ Die vier Gründe — nummeriert wie auf der Methodikseite, damit beide
          Argumentationsflächen als dasselbe Format erkennbar sind. */}
      <section className="bg-[var(--color-sage)]/35 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.reasonsEyebrow} title={t.reasonsTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {t.reasons.map(([title, copy], index) => (
              <Surface key={title} as="article" level="sheet">
                <p className="text-sm font-bold tabular-nums text-[var(--color-forest)]">
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="mt-3 max-w-[58ch] leading-7 text-[var(--color-muted)]">{copy}</p>
              </Surface>
            ))}
          </div>
        </Container>
      </section>

      {/* ③b Der Südtirol-Grund: Kompensation braucht Fläche, und die gibt es hier
          nicht. Drei belegte Zahlen tragen das Argument, die Quellen stehen dabei. */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading eyebrow={t.localEyebrow} title={t.localTitle} copy={t.localCopy} />
            <div>
              <dl className="grid gap-3 sm:grid-cols-3">
                {t.localFigures.map(([value, label]) => (
                  <Surface key={value} level="sheet" className="sm:p-5">
                    <dt className="font-display text-3xl tracking-[-0.03em] tabular-nums text-[var(--color-forest)]">{value}</dt>
                    <dd className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{label}</dd>
                  </Surface>
                ))}
              </dl>
              <p className="mt-6 max-w-[58ch] leading-7 text-[var(--color-ink)]">{t.localClosing}</p>
              <ul className="mt-5 space-y-1 text-xs leading-5 text-[var(--color-muted)]">
                {t.localSources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noreferrer" className={`underline underline-offset-2 hover:text-[var(--color-forest)] ${focusRing}`}>
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ④ Die Gegenposition: Biodiversität als eigener Grund, Kohlenstoff als
          Wirkung. Beide Absätze gehören zusammen und stehen deshalb nebeneinander. */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow={t.insteadEyebrow}
              title={t.insteadTitle}
              copy={t.insteadCopy}
            />
            <Surface level="sheet">
              <h2 className="text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">
                {t.storageTitle}
              </h2>
              <p className="mt-4 max-w-[58ch] leading-7 text-[var(--color-muted)]">
                {t.storageCopy}
              </p>
            </Surface>
          </div>
        </Container>
      </section>

      {/* ⑤ Der Ausweg aus der Absage: drei Schritte und der Weg zu den Projekten. */}
      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink)] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
            <Label size="section" tone="moss">
              {t.pathEyebrow}
            </Label>
            <h2 className="mt-4 max-w-3xl font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
              {t.pathTitle}
            </h2>

            <ol className="mt-10 grid gap-3 sm:grid-cols-3">
              {t.path.map(([title, copy], index) => (
                <li
                  key={title}
                  className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-5"
                >
                  <p className="text-xs font-bold tabular-nums text-[var(--color-moss)]">
                    0{index + 1}
                  </p>
                  <p className="mt-4 font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">{copy}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href={`/${locale}/projekte`}
                className={`group inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper)] ${focusRingOnDark}`}
              >
                {t.ctaProjects}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <Link
                href={`/${locale}/methodik`}
                className={`group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-[var(--color-moss)] ${focusRingOnDark}`}
              >
                {t.ctaMethod}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
