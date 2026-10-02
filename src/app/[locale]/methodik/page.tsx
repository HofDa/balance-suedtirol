import { localizedAlternates } from "@/lib/site-metadata";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { isLocale, type Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { referenceValues } from "@/features/house-tour/model/calculator";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { localeTags } from "@/lib/i18n";
import { textDisplay, textHeadline, textTitleTight } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const route = "/methodik";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getTranslations(locale).methodology;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localizedAlternates(locale, route)
  };
}

type EvidenceStatus = "anchor" | "derived" | "assumption";

const statusStyles: Record<EvidenceStatus, string> = {
  anchor: "bg-[var(--color-sage)] text-[var(--color-forest)]",
  derived: "bg-[var(--color-paper)] text-[var(--color-ink)]",
  assumption: "bg-amber-50 text-amber-900"
};

/** Die Vergleichswerte kommen aus dem Rechner, damit Text und Rechnung nicht auseinanderlaufen. */
function withReferenceValues(text: string, locale: Locale) {
  const format = new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 0 });
  return text
    .replace("{co2}", format.format(referenceValues.co2Kg))
    .replace("{water}", format.format(referenceValues.waterL))
    .replace("{energy}", format.format(referenceValues.energyKwh));
}

function SourceLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-start gap-1.5 text-sm font-semibold leading-6 text-[var(--color-forest)] underline decoration-[var(--color-forest)]/25 underline-offset-4 transition-colors hover:text-[var(--color-ink)]">
      <span>{label}</span>
      <ArrowUpRight className="mt-1 size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </a>
  );
}

export default async function MethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getTranslations(locale).methodology;

  return (
    <>
      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Label size="section">{t.eyebrow}</Label>
            <h1 className={cn(textDisplay, "mt-4")}>{t.title}</h1>
            <p className="mt-6 max-w-[62ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">{t.lead}</p>
            <p className="mt-4 text-sm font-semibold text-[var(--color-forest)]">{t.status}</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {t.principles.map(([title, copy], index) => (
              <Surface key={title} as="article" level="sheet">
                <p className="text-sm font-bold tabular-nums text-[var(--color-forest)]">0{index + 1}</p>
                <h2 className={cn(textTitleTight, "mt-5")}>{title}</h2>
                <p className="mt-3 max-w-[58ch] leading-7 text-[var(--color-muted)]">{copy}</p>
              </Surface>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-sage)]/35 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.boundariesEyebrow} title={t.boundariesTitle} copy={t.boundariesCopy} />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {t.boundaries.map((boundary) => (
              <Surface key={boundary.metric} as="article" level="sheet">
                <Label size="block">{boundary.unit}</Label>
                <h3 className="mt-4 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">{boundary.metric}</h3>
                <p className="mt-5 leading-7 text-[var(--color-muted)]">{boundary.scope}</p>
                <div className="mt-6 border-t border-[var(--color-line)] pt-5">
                  <p className="text-sm font-bold text-[var(--color-ink)]">{t.notIncluded}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{boundary.excluded}</p>
                </div>
              </Surface>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.evidenceEyebrow} title={t.evidenceTitle} copy={t.evidenceCopy} />
          <div className="mt-12 space-y-14">
            {t.evidence.map((group, groupIndex) => (
              <section key={group.title} aria-labelledby={`evidence-${groupIndex}`}>
                <div className="max-w-3xl">
                  <h2 id={`evidence-${groupIndex}`} className={textTitleTight}>{group.title}</h2>
                  <p className="mt-2 leading-7 text-[var(--color-muted)]">{group.intro}</p>
                </div>
                <div className="mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white">
                  {group.items.map((item, index) => (
                    <article key={item.title} className={`grid gap-5 p-5 sm:p-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] lg:gap-10 ${index > 0 ? "border-t border-[var(--color-line)]" : ""}`}>
                      <div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${statusStyles[item.status as EvidenceStatus]}`}>{t.statusLabels[item.status as EvidenceStatus]}</span>
                        <h3 className="mt-4 font-semibold leading-6">{item.title}</h3>
                      </div>
                      <div>
                        <p className="leading-7 text-[var(--color-muted)]">{item.copy}</p>
                        <ul className="mt-4 space-y-2">
                          {item.sources.map((source) => <li key={source.href}><SourceLink {...source} /></li>)}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-ink)] py-14 text-white sm:py-20">
        <Container>
          <div className="mb-16 grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <Label size="section" tone="moss">{t.comparisonEyebrow}</Label>
              <h2 className={cn(textHeadline, "mt-4")}>{t.comparisonTitle}</h2>
            </div>
            <div className="space-y-5 text-white/65">
              <p className="leading-7">{withReferenceValues(t.comparisonCopy, locale)}</p>
              <p className="leading-7">{t.comparisonNoTarget}</p>
              <div className="flex flex-col items-start gap-2 pt-1">
                {t.comparisonSources.map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="group inline-flex items-start gap-1.5 text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 hover:text-[var(--color-moss)]"><span>{source.label}</span><ArrowUpRight className="mt-0.5 size-3.5 shrink-0" aria-hidden /></a>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <Label size="section" tone="moss">{t.standardsEyebrow}</Label>
              <h2 className={cn(textHeadline, "mt-4")}>{t.standardsTitle}</h2>
              <p className="mt-5 max-w-[52ch] leading-7 text-white/65">{t.standardsCopy}</p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {t.standards.map((standard, index) => (
                <li key={standard.title} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs font-bold tabular-nums text-[var(--color-moss)]">0{index + 1}</p>
                  <a href={standard.href} target="_blank" rel="noreferrer" className="group mt-4 inline-flex items-start gap-1.5 font-semibold text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-[var(--color-moss)]">
                    <span>{standard.title}</span><ArrowUpRight className="mt-1 size-3.5 shrink-0" aria-hidden />
                  </a>
                  <p className="mt-2 text-sm leading-6 text-white/60">{standard.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading eyebrow={t.biodiversityEyebrow} title={t.biodiversityTitle} copy={t.biodiversityCopy} />
            <Surface level="sheet">
              <p className="leading-7 text-[var(--color-muted)]">{t.biodiversityDetail}</p>
              <ul className="mt-6 space-y-3 border-t border-[var(--color-line)] pt-6">
                {t.biodiversitySources.map((source) => <li key={source.href}><SourceLink {...source} /></li>)}
              </ul>
            </Surface>
          </div>
          <Surface level="sheet" tone="paper" className="mt-12">
            <Label size="block">{t.careLabel}</Label>
            <div className="mt-5 grid gap-8 md:grid-cols-3">
              {t.care.map(([title, copy]) => (
                <div key={title}><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{copy}</p></div>
              ))}
            </div>
          </Surface>
        </Container>
      </section>
    </>
  );
}
