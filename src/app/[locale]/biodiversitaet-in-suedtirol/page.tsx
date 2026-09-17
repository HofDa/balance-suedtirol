import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { focusRing } from "@/components/ui/focus";
import { isLocale, locales } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { withBasePath } from "@/lib/public-path";

const route = "/biodiversitaet-in-suedtirol";

const headlineClass =
  "font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)] text-[var(--color-ink)]";

function splitKeyword(item: string): [string, string] {
  const index = item.indexOf(": ");
  return index > 0 ? [item.slice(0, index), item.slice(index + 2)] : [item, ""];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getTranslations(locale).biodiversityExplainer;
  return {
    title: t.button,
    description: t.teaser,
    alternates: {
      canonical: withBasePath(`/${locale}${route}`),
      languages: Object.fromEntries(locales.map((language) => [language, withBasePath(`/${language}${route}`)]))
    }
  };
}

/**
 * Die Erklärseite zur ersten Frage, die Besucher stellen: Warum Biodiversität,
 * und warum hier? Aufgebaut wie die CO₂-Haltungsseite – These, Leistungen,
 * belegte Zahlen, Südtirol-Bezug – damit beide Argumentationsflächen als
 * dasselbe Format erkennbar sind. Jede Zahl steht mit Quelle am Fuß der Seite.
 */
export default async function BiodiversityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const translations = getTranslations(locale);
  const t = translations.biodiversityExplainer;
  const [figureValue, figureLabel] = t.keyFigure;

  return (
    <>
      {/* ① These und die eine Zahl, die sie trägt. */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Label size="section">{t.eyebrow}</Label>
              <h1 className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]">
                {t.title}
              </h1>
              <p className="mt-6 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
                {t.lead}
              </p>
            </div>
            <aside className="self-end border-t border-[var(--color-line)] pt-6 lg:pl-10 lg:border-l lg:border-t-0 lg:pt-0">
              <p className="font-display text-5xl tracking-[-0.03em] tabular-nums text-[var(--color-forest)] sm:text-6xl">{figureValue}</p>
              <p className="mt-3 max-w-[28ch] text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em] text-[var(--color-ink)]">
                {figureLabel}
              </p>
              <p className="mt-3 text-xs leading-5 text-[var(--color-muted)]">{t.keyFigureSource}</p>
            </aside>
          </div>

          {/* ② Was Lebensräume leisten: vier Stichworte als Tafel, nicht als Karten. */}
          <Surface as="section" level="sheet" className="mt-14 sm:mt-20">
            <h2 className={headlineClass}>{t.servicesTitle}</h2>
            <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
              {t.services.map((service) => {
                const [keyword, explanation] = splitKeyword(service);
                return (
                  <div key={keyword} className="border-t border-[var(--color-line)] py-5">
                    <dt className="text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em] text-[var(--color-ink)]">
                      {keyword}
                    </dt>
                    <dd className="mt-2 max-w-[48ch] leading-7 text-[var(--color-muted)]">{explanation}</dd>
                  </div>
                );
              })}
            </dl>
          </Surface>
        </Container>
      </section>

      {/* ③ Das wirtschaftliche Argument: Text links, vier belegte Zahlen rechts –
          dasselbe Format wie die Südtirol-Zahlen auf der CO₂-Seite. */}
      <section className="bg-[var(--color-sage)]/35 py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:items-start">
            <div className="max-w-[62ch]">
              <h2 className={headlineClass}>{t.economyTitle}</h2>
              <p className="mt-5 max-w-[58ch] leading-7 text-[var(--color-muted)]">{t.economyCopy}</p>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {t.economyFigures.map(([value, label]) => (
                <Surface key={value} level="sheet" className="sm:p-5">
                  <dt className="font-display text-3xl tracking-[-0.03em] tabular-nums text-[var(--color-forest)]">{value}</dt>
                  <dd className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{label}</dd>
                </Surface>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* ④ Der Südtirol-Bezug und die Wege weiter; darunter die Quellen. */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <h2 className={`${headlineClass} max-w-[62ch]`}>{t.localTitle}</h2>
            <div>
              <p className="max-w-[58ch] leading-7 text-[var(--color-muted)]">{t.localCopy}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href={`/${locale}/projekte`}
                  className={`group inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-forest)] ${focusRing}`}
                >
                  {translations.nav[0]}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
                <Link
                  href={`/${locale}/haus-tour`}
                  className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-forest)] underline-offset-4 hover:underline ${focusRing}`}
                >
                  {t.cta} <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-14 border-t border-[var(--color-line)] pt-6 text-xs leading-5 text-[var(--color-muted)] sm:mt-20">
            <p className="max-w-[80ch]">{t.source}</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {[
                { href: "https://biodiversity.eurac.edu/de/was-erheben-wir/gefaesspflanzen/", label: `Eurac Research: ${t.eyebrow}` },
                { href: "https://doi.org/10.57749/08ce-cw08", label: "Biodiversity Monitoring South Tyrol 2019–2023" }
              ].map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 underline underline-offset-4 hover:text-[var(--color-forest)] ${focusRing}`}
                  >
                    {source.label}
                    <ArrowUpRight className="size-3" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        </Container>
      </section>
    </>
  );
}
