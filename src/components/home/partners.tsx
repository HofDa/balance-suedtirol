import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { focusRing } from "@/components/ui/focus";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { getPlatformPartners, getSciencePartners, type Partner } from "@/data/partners";
import { submissionRecipient } from "@/features/project-submission/config/copy";
import { withBasePath } from "@/lib/public-path";

/**
 * Partner als ruhige Leiste statt als zwei ganze Abschnitte: oben, wer die
 * Plattform trägt, darunter, wer die Methodik fachlich begleitet. Partner
 * stehen als Wortmarke, solange kein freigegebenes Logo vorliegt – ein
 * Platzhalterlogo wäre eine Attrappe, der Name mit der Marke „Platzhalter“ ist
 * ehrlicher.
 */
export function Partners({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale);
  const t = translations.partners;
  const science = translations.sciencePartners;
  const placeholderLabel = translations.card.placeholder;
  const rows = [
    { label: t.eyebrow, partners: getPlatformPartners(locale) as (Partner & { field?: string })[] },
    { label: science.eyebrow, partners: getSciencePartners(locale) as (Partner & { field?: string })[] }
  ];

  return (
    <section aria-labelledby="partners-title" className="py-14 sm:py-20">
      <Container>
        <div data-home-reveal="rise" className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2
            id="partners-title"
            className="font-display text-balance text-[1.625rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[2rem]"
          >
            {t.title}
          </h2>
          <a
            href={`mailto:${submissionRecipient}?subject=${encodeURIComponent(t.become)}`}
            className={`group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[var(--color-forest)] ${focusRing}`}
          >
            {t.become}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div data-home-reveal="rise" className="mt-8 border-y border-[var(--color-line)]">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-3 border-t border-[var(--color-line)] py-6 first:border-t-0 lg:grid-cols-[12rem_minmax(0,1fr)] lg:items-center lg:gap-8"
            >
              <Label size="block" tone="muted">{row.label}</Label>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {row.partners.map((partner) => (
                  <li key={partner.slug} title={partner.role} className="flex flex-col">
                    {partner.field ? (
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-forest)]">{partner.field}</span>
                    ) : null}
                    <PartnerIdentity partner={partner} placeholderLabel={placeholderLabel} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p data-home-reveal="rise" className="mt-4 max-w-[62ch] text-[length:var(--text-meta)] leading-[var(--leading-meta)] text-[var(--color-muted)]">
          {t.placeholderNote}
        </p>
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
    <span className="text-[length:var(--text-body)] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
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
