import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { focusRing } from "@/components/ui/focus";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";
import { textHeadline, textLead, textTitleTight } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { MobileCollapseSection, MobileCollapseToggle } from "./mobile-collapse";
import { collapsibleHeading, hiddenWhenCollapsed } from "./mobile-collapse-classes";

/**
 * „Was ist b*alance?“ steht bewusst spät: Erst wenn klar ist, was auf dem
 * Spiel steht und welche Projekte es gibt, lohnt die Erklärung des Modells.
 * Vier Schritte als nummerierte Zeile, nicht als Kacheln.
 */
export function BalanceModel({ locale }: { locale: Locale }) {
  const t = getHomeStory(locale).model;

  return (
    <MobileCollapseSection aria-labelledby="model-title" className="bg-[var(--color-sage)]/35 py-16 sm:py-32">
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

        <ol data-home-reveal="rise" className={cn(hiddenWhenCollapsed, "mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4")}>
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
      </Container>
    </MobileCollapseSection>
  );
}
