import type { CSSProperties } from "react";
import Link from "@/components/ui/site-link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { focusRing, focusRingOnDark } from "@/components/ui/focus";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";
import { textHeadline, textLead, textTitleTight } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { EuroCoins, EuropeFill } from "./europe-fill";
import { CountUp } from "./count-up";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { MobileCollapseSection, MobileCollapseToggle } from "./mobile-collapse";
import { collapsibleHeading, hiddenWhenCollapsed } from "./mobile-collapse-classes";

/**
 * „Was ist b*alance?“ steht bewusst spät: Erst wenn klar ist, was auf dem
 * Spiel steht und welche Projekte es gibt, lohnt die Erklärung des Modells.
 * Vier Schritte als nummerierte Zeile, darunter als Begründung zwei belegte
 * Zahlen dazu, wie sehr die Wirtschaft an intakter Natur hängt – früher ein
 * eigener Abschnitt, jetzt der Grund, warum das Modell sich lohnt.
 */
export function BalanceModel({ locale }: { locale: Locale }) {
  const story = getHomeStory(locale);
  const t = story.model;
  const economy = story.economy;

  return (
    <MobileCollapseSection aria-labelledby="model-title" className="bg-[var(--color-sage)]/35 py-16 sm:py-28">
      <Container>
        <div data-home-reveal="rise" className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[62ch]">
            <div className="relative">
              <Label size="section">{t.eyebrow}</Label>
              <h2
                id="model-title"
                className={cn(textHeadline, "mt-4 text-[var(--color-ink)]", collapsibleHeading)}
              >
                {t.title}
              </h2>
              <MobileCollapseToggle labelledBy="model-title" />
            </div>
            <p className={cn(textLead, "mt-5", hiddenWhenCollapsed)}>
              {t.lead}
            </p>
          </div>
          <Link
            href={`/${locale}/was-ist-balance`}
            className={`${hiddenWhenCollapsed} group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[var(--color-forest)] ${focusRing}`}
          >
            {t.more}
            <ArrowIcon />
          </Link>
        </div>

        <ol data-home-reveal="rise" className={cn(hiddenWhenCollapsed, "mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4")}>
          {t.steps.map(([title, copy], index) => (
            <li key={title} className="border-t border-[var(--color-forest)]/25 py-6">
              <span className="font-display text-[2.5rem] leading-none tracking-[-0.03em] tabular-nums text-[var(--color-forest)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={cn(textTitleTight, "mt-5 text-[var(--color-ink)]")}>
                {title}
              </h3>
              <p className="mt-2 max-w-[36ch] leading-7 text-[var(--color-muted)]">{copy}</p>
            </li>
          ))}
        </ol>

        {/* Warum das zählt: zwei Zahlen auf dunklem Grund, groß gesetzt. */}
        <div
          data-home-reveal="scale"
          className={cn(
            hiddenWhenCollapsed,
            "mt-10 grid gap-8 rounded-[var(--radius-xl)] bg-[var(--color-ink)] p-6 text-white sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12"
          )}
        >
          <div>
            <Label size="section" tone="moss">{economy.eyebrow}</Label>
            <h3 className="mt-3 max-w-[22ch] font-display text-balance text-[1.625rem] leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">
              {economy.title}
            </h3>
          </div>
          <div>
            <dl className="grid grid-cols-2 gap-6 sm:gap-10">
              {/* 75 %: Euroraum als Silhouette, flächentreu gefüllt. 2/3: zwei von drei 1-Euro-Münzen. */}
              {economy.figures.map(([value, label], index) => (
                <div
                  key={value}
                  className="flex flex-col border-t border-white/15 pt-5"
                  // Erst die Grafik, dann ihr Text: Karte fertig nach 1.9 s, Münzen nach 4 s.
                  style={{ "--text-delay": index === 0 ? "1900ms" : "4000ms" } as CSSProperties}
                >
                  {index === 0 ? (
                    <EuropeFill className="order-1 mb-5 w-full max-w-[15rem]" />
                  ) : (
                    <EuroCoins filled={2} total={3} className="order-1 mb-5 w-full max-w-[15rem]" />
                  )}
                  <dt className="economy-text order-3 mt-3 max-w-[30ch] text-sm leading-6 text-white/75">{label}</dt>
                  <dd className="economy-text order-2 font-display text-[length:var(--text-display)] leading-none tracking-[-0.035em] tabular-nums text-[var(--color-moss)]">
                    {/* 75 % zählt hoch, sobald es erscheint; „2/3“ bleibt stehen. */}
                    {index === 0 ? <CountUp value={value} delay={1900} /> : value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-5 text-white/55">{economy.source}</p>
          </div>

          {/* Aufklappbar: was hinter den Zahlen steht und wo es nachzulesen ist. */}
          <details className="group/details border-t border-white/15 pt-5 lg:col-span-2">
            <summary
              className={`inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-bold text-[var(--color-moss)] [&::-webkit-details-marker]:hidden ${focusRingOnDark}`}
            >
              {economy.detailsLabel}
              <ChevronDown className="size-4 transition-transform duration-200 group-open/details:rotate-180" aria-hidden />
            </summary>
            <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-12">
              {economy.details.map((item) => (
                <div key={item.title}>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 max-w-[62ch] text-sm leading-6 text-white/75">{item.copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">{economy.sourcesLabel}</p>
              <ol className="mt-3 space-y-2">
                {economy.sources.map((source) => (
                  <li key={source.href} className="max-w-[110ch] text-xs leading-5 text-white/70">
                    {source.citation}{" "}
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 font-semibold text-[var(--color-moss)] underline decoration-[var(--color-moss)]/40 underline-offset-2 hover:decoration-[var(--color-moss)] ${focusRingOnDark}`}
                    >
                      {new URL(source.href).hostname.replace(/^www\./, "")}
                      <ArrowUpRight className="size-3" aria-hidden />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </details>
        </div>
      </Container>
    </MobileCollapseSection>
  );
}
