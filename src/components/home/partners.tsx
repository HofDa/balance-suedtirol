import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { Label } from "@/components/ui/label";
import { focusRing } from "@/components/ui/focus";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { getPlatformPartners, getSciencePartners, type Partner } from "@/data/partners";
import { submissionRecipient } from "@/features/project-submission/config/copy";
import { withBasePath } from "@/lib/public-path";

/**
 * Partner werden als Wortmarke gezeigt, solange kein freigegebenes Logo
 * vorliegt. Ein Platzhalterlogo für vier verschiedene Häuser wäre eine
 * Attrappe — der Name mit der Marke „Platzhalter“ ist ehrlicher und liest sich
 * in der Reihe genauso ruhig.
 */
export function PlatformPartners({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).partners;
  const placeholderLabel = getTranslations(locale).card.placeholder;
  const partners = getPlatformPartners(locale);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div
          data-home-reveal="rise"
          className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"
        >
          <SectionHeading eyebrow={t.eyebrow} title={t.title} copy={t.copy} />
          <a
            href={`mailto:${submissionRecipient}?subject=${encodeURIComponent(t.become)}`}
            className={`group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[var(--color-forest)] ${focusRing}`}
          >
            {t.become}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner, index) => (
            <li
              key={partner.slug}
              data-home-reveal="rise"
              style={{ "--home-reveal-delay": `${index * 65}ms` } as CSSProperties}
            >
              <Surface className="flex h-full flex-col transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
                <PartnerIdentity partner={partner} placeholderLabel={placeholderLabel} />
                <p className="mt-4 text-[length:var(--text-meta)] leading-[var(--leading-body)] text-[var(--color-muted)]">
                  {partner.role}
                </p>
              </Surface>
            </li>
          ))}
        </ul>

        <p data-home-reveal="rise" className="mt-6 max-w-[62ch] text-[length:var(--text-meta)] leading-[var(--leading-meta)] text-[var(--color-muted)]">
          {t.placeholderNote}
        </p>
      </Container>
    </section>
  );
}

/**
 * Die fachliche Begleitung steht als Liste, nicht als Kachelreihe: Hier zählt
 * nicht die Marke, sondern welches Fachgebiet was prüft.
 */
export function SciencePartners({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).sciencePartners;
  const placeholderLabel = getTranslations(locale).card.placeholder;
  const partners = getSciencePartners(locale);

  return (
    <section className="bg-[var(--color-sage)]/35 py-24 sm:py-32">
      <Container>
        <div data-home-reveal="rise">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} copy={t.copy} />
        </div>

        <div data-home-reveal="scale" className="mt-12">
          <Surface level="sheet">
            <ul className="divide-y divide-[var(--color-line)]">
              {partners.map((partner) => (
                <li
                  key={partner.slug}
                  className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] sm:gap-8"
                >
                  <div>
                    <Label size="block" tone="forest" className="mb-2">
                      {partner.field}
                    </Label>
                    <PartnerIdentity partner={partner} placeholderLabel={placeholderLabel} />
                  </div>
                  <p className="text-[length:var(--text-meta)] leading-[var(--leading-body)] text-[var(--color-muted)]">
                    {partner.role}
                  </p>
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      </Container>
    </section>
  );
}

function PartnerIdentity({
  partner,
  placeholderLabel
}: {
  partner: Partner;
  placeholderLabel: string;
}) {
  const name = partner.logo ? (
    <Image
      src={withBasePath(partner.logo)}
      alt={partner.name}
      width={160}
      height={44}
      className="h-auto max-h-11 w-auto max-w-40 object-contain"
    />
  ) : (
    <span className="text-[length:var(--text-body-lg)] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
      {partner.name}
    </span>
  );

  const identity = (
    <span className="inline-flex flex-wrap items-center gap-2">
      {name}
      {partner.isPlaceholder ? (
        <span className="rounded-[var(--radius-sm)] bg-[var(--color-stone)] px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          {placeholderLabel}
        </span>
      ) : null}
    </span>
  );

  if (!partner.website) return identity;

  return (
    <a
      href={partner.website}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex min-h-11 items-center gap-2 ${focusRing}`}
    >
      {identity}
      <ArrowUpRight className="size-3.5 shrink-0 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-forest)]" aria-hidden />
    </a>
  );
}
