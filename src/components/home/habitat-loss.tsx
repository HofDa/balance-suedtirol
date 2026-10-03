import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";
import { textDisplay } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { MobileCollapseSection, MobileCollapseToggle } from "./mobile-collapse";
import { collapsibleHeading, hiddenWhenCollapsed } from "./mobile-collapse-classes";
import { LossComparison } from "./loss-comparison";
import { LossSceneAfter, LossSceneBefore, lossSceneSpots as spots } from "./loss-scene";
import { CountUp } from "./count-up";
import { focusRingOnDark } from "@/components/ui/focus";

/**
 * Hier kippt die Erzählung. Der Wechsel auf Tannentinte markiert ihn, ohne
 * Warnfarbe und ohne Katastrophenbild: derselbe Talboden früher und heute im
 * Vorher-nachher-Regler, der beim Erscheinen die sieben Ursachen von links
 * nach rechts aufdeckt, darunter die Legende in je einem
 * Satz und zwei belegte Zahlen. Dann ein Schlusssatz, unter dem direkt die
 * Projekte folgen.
 */
export function HabitatLoss({ locale }: { locale: Locale }) {
  const t = getHomeStory(locale).loss;

  return (
    <MobileCollapseSection aria-labelledby="loss-title" className="bg-[var(--color-ink)] pb-10 pt-16 text-white sm:pb-16 sm:pt-32">
      <Container>
        <div data-home-reveal="rise" className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="relative">
            <Label size="section" tone="moss">
              {t.eyebrow}
            </Label>
            <h2 id="loss-title" className={cn(textDisplay, "mt-4", collapsibleHeading)}>
              {t.title}
            </h2>
            <MobileCollapseToggle labelledBy="loss-title" tone="dark" />
          </div>
          <p
            className={cn(
              hiddenWhenCollapsed,
              "max-w-[52ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-white/80 lg:pb-2"
            )}
          >
            {t.lead}
          </p>
        </div>

        <div className={hiddenWhenCollapsed}>
          <LossComparison
            before={<LossSceneBefore className="block h-auto w-full" />}
            after={<LossSceneAfter className="block h-auto w-full" />}
            markers={spots.markers}
            items={t.pressures}
            caption={t.scene.note}
            pagerLabel={getHomeStory(locale).legendPager}
            beforeLabel={t.scene.before}
            afterLabel={t.scene.after}
            sliderLabel={t.scene.slider}
            aside={
              <div data-home-reveal="rise" className="lg:mx-auto lg:w-full lg:max-w-3xl lg:text-center">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:gap-x-16">
                  {t.facts.map(([value, label]) => (
                    <div key={value} className="flex flex-col-reverse justify-end border-t border-white/15 pt-5">
                      <dt className="mt-3 max-w-[30ch] text-sm leading-6 text-white/75 lg:mx-auto">{label}</dt>
                      <dd className="font-display text-[length:var(--text-display)] leading-none tracking-[-0.035em] tabular-nums text-[var(--color-moss)]">
                        <CountUp value={value} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-xs leading-5 text-white/60">{t.factsSource}</p>
              </div>
            }
          />
        </div>

        {/* Aussage und dezenter Sprunglink führen direkt zu den Projekten. */}
        <div
          className={cn(hiddenWhenCollapsed, "mt-12 border-t border-white/15 pt-8 text-center sm:mt-24 sm:pt-10")}
        >
          <p
            data-home-reveal="focus"
            className="mx-auto max-w-[42ch] font-display text-balance text-center text-[clamp(1.625rem,3vw,2.75rem)] leading-[1.25] tracking-[-0.02em]"
          >
            {t.closing}
          </p>
          <div
            data-home-reveal="rise"
            style={{ "--home-reveal-delay": "450ms" } as CSSProperties}
            className="mt-6 sm:mt-8"
          >
            <a
              href="#projekte"
              className={cn("group inline-flex min-h-11 flex-col items-center justify-center gap-3 rounded-[var(--radius-sm)] px-2 py-2 text-sm font-semibold text-[var(--color-moss)] underline-offset-4 hover:underline", focusRingOnDark)}
            >
              {t.projectsBridge}
              <ArrowDown aria-hidden className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </Container>
    </MobileCollapseSection>
  );
}
