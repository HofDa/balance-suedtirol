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
 * Zwei getrennte Abschnitte: Wer die Plattform finanziell ermöglicht hat,
 * steht auf Papier – Überschrift links, Logos als weiße Kacheln rechts, Fläche
 * statt Schatten. Wer die Methodik fachlich begleitet, liegt davon abgesetzt
 * auf einem Salbeiband, als Spalten mit Kopflinie. Die Wissenschaft steht nicht
 * unter der Finanzierung. Partner ohne freigegebenes Logo stehen als Wortmarke
 * mit der Marke „Platzhalter“ – ein Platzhalterlogo wäre eine Attrappe.
 */
export function Partners({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale);
  const t = translations.partners;
  const science = translations.sciencePartners;
  const placeholderLabel = translations.card.placeholder;
  const financial = getPlatformPartners(locale);
  const scientific = getSciencePartners(locale);

  return (
    <>
      <section aria-labelledby="partners-title" className="py-16 sm:py-24">
        <Container>
          <div data-home-reveal="rise" className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
            <div>
              <Label size="section">{t.eyebrow}</Label>
              <h2
                id="partners-title"
                className="mt-4 max-w-[26ch] font-display text-balance text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[2.25rem]"
              >
                {t.title}
              </h2>
              <a
                href={`mailto:${submissionRecipient}?subject=${encodeURIComponent(t.become)}`}
                className={`group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-forest)] underline-offset-4 hover:underline ${focusRing}`}
              >
                {t.become}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {financial.map((partner) => (
                <li key={partner.slug}>
                  <PartnerTile partner={partner} placeholderLabel={placeholderLabel} />
                </li>
              ))}
            </ul>
          </div>

          {financial.some((partner) => partner.isPlaceholder) ? (
            <p data-home-reveal="rise" className="mt-6 max-w-[62ch] text-[length:var(--text-meta)] leading-[var(--leading-meta)] text-[var(--color-muted)]">
              {t.placeholderNote}
            </p>
          ) : null}
        </Container>
      </section>

      <section aria-labelledby="science-partners-title" className="bg-[var(--color-sage)]/35 py-14 sm:py-20">
        <Container>
          <div data-home-reveal="rise" className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <h2
              id="science-partners-title"
              className="font-display text-balance text-[1.5rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[1.875rem]"
            >
              {science.eyebrow}
            </h2>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
              {scientific.map((partner) => (
                <li
                  key={partner.slug}
                  title={partner.role}
                  className="border-t-2 border-[var(--color-forest)]/40 pt-4"
                >
                  <Label size="block">{partner.field}</Label>
                  <p className="mt-2 text-[length:var(--text-body)] font-semibold leading-snug tracking-[-0.01em] text-[var(--color-ink)]">
                    {partner.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}

function PartnerTile({ partner, placeholderLabel }: { partner: Partner; placeholderLabel: string }) {
  // Logoboxen füllen die ganze Kachel in ihrer eigenen Farbe (nahtlos, die Datei
  // hat dieselbe Grundfarbe); freigestellte Logos stehen mittig auf Weiß.
  const boxed = Boolean(partner.logo && partner.logoBackground);
  const mark = partner.logo ? (
    // Bereits optimierte Logos direkt ausliefern: Der Bildoptimierer wandelt
    // Dateien mit Transparenz je nach Browser in JPEG um.
    <Image
      unoptimized
      src={withBasePath(partner.logo)}
      alt={partner.name}
      width={partner.logoSize?.width ?? 160}
      height={partner.logoSize?.height ?? 44}
      style={boxed ? undefined : { width: partner.logoSize?.width, height: "auto" }}
      className={boxed ? "h-auto w-full max-w-[22rem]" : "max-w-full object-contain"}
    />
  ) : (
    <span className="flex flex-col items-center gap-2 text-center">
      <span className="text-[length:var(--text-body)] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
        {partner.name}
      </span>
      {partner.isPlaceholder ? (
        <span className="rounded-[var(--radius-sm)] bg-[var(--color-stone)] px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          {placeholderLabel}
        </span>
      ) : null}
    </span>
  );

  const tile = `grid min-h-36 place-items-center overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] sm:min-h-44 ${
    boxed ? "p-0" : "bg-[var(--color-surface)] p-8"
  }`;
  const tileStyle = boxed ? { backgroundColor: partner.logoBackground } : undefined;

  if (!partner.website) {
    return (
      <div title={partner.role} style={tileStyle} className={tile}>
        {mark}
      </div>
    );
  }

  return (
    <a
      href={partner.website}
      target="_blank"
      rel="noreferrer"
      title={partner.role}
      style={tileStyle}
      className={`${tile} transition-colors duration-[var(--duration-state)] hover:border-[var(--color-forest)]/35 ${focusRing}`}
    >
      {mark}
    </a>
  );
}
