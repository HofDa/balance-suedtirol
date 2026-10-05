import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { focusRing } from "@/components/ui/focus";
import type { Locale } from "@/config/site";
import { getHomeStory } from "@/config/home-story";
import { MobileCollapseSection, MobileCollapseToggle } from "./mobile-collapse";
import { collapsibleHeading, hiddenWhenCollapsed } from "./mobile-collapse-classes";
import { textDisplay, textHeadline, textLead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";
import { RichnessProfile, richnessProfileSpots as spots } from "./richness-profile";
import { SceneNumber } from "./scene-number";
import { LegendCarousel, LegendMarker } from "./legend-carousel";

/** Marken in der Grafik, eine je Faktor, in der Reihenfolge der Legende (von links nach rechts). */
const markers: ReadonlyArray<{ key: keyof typeof spots.markers; factor: number }> = [
  { key: "climate", factor: 0 },
  { key: "culture", factor: 1 },
  { key: "geology", factor: 2 },
  { key: "altitude", factor: 3 }
];

const levelKeys = ["1000", "2000", "3000"] as const;

/**
 * Lage einer Nummer: im Himmel über ihrem Motiv; ab `lg` genau über der
 * Nummer ihrer Legendenspalte (vier Spalten, `gap-x-10`, Nummer 1.5rem
 * breit). Die Motive im Skript stehen so, dass beides zusammenfällt.
 */
function markerStyle(spot: { left: string; top: string }, column: number, delay: number) {
  return {
    top: spot.top,
    "--spot-left": spot.left,
    "--col": column,
    "--habitat-delay": `${delay}ms`
  } as CSSProperties;
}

/**
 * Der erste Abschnitt nach dem Hero: Was Südtirol besitzt. Statt Foto und
 * Fließtext ein Höhenschnitt aus Silhouetten, auf dem vier Nummern die Gründe
 * zeigen; darunter die Legende in je einem Satz. Dann die Zahlen als
 * typografische Zeile und der Weg zum Monitoringbericht als eigene Zeile.
 */
export function BiodiversityRichness({ locale }: { locale: Locale }) {
  const story = getHomeStory(locale);
  const t = story.richness;
  const figures = story.figures;

  return (
    <MobileCollapseSection id="vielfalt" aria-labelledby="vielfalt-title" className="scroll-mt-20 py-16 sm:py-32">
      <Container>
        <div data-home-reveal="rise" className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="relative">
            <Label size="section">{t.eyebrow}</Label>
            <h2
              id="vielfalt-title"
              className={cn(textDisplay, "mt-4 text-[var(--color-ink)]", collapsibleHeading)}
            >
              {t.title}
            </h2>
            <MobileCollapseToggle labelledBy="vielfalt-title" />
          </div>
          <p className={cn(hiddenWhenCollapsed, textLead, "lg:pb-2")}>{t.lead}</p>
        </div>

        <div data-legend-scope className={hiddenWhenCollapsed}>
        <figure className="mt-10 sm:mt-16">
          {/* Auf dem Telefon randlos, damit die Zeichnung nicht noch kleiner wird. */}
          <div data-home-reveal="grow" className="relative -mx-5 text-[var(--color-ink)] sm:mx-0">
            <RichnessProfile className="block h-auto w-full" />
            <div className="text-[11px] font-bold uppercase tracking-[0.14em]">
              {levelKeys.map((key) => (
                <span
                  key={key}
                  aria-hidden
                  className="absolute hidden -translate-y-full pb-1 normal-case tracking-normal text-[var(--color-muted)] sm:block"
                  style={spots.levels[key]}
                >
                  {t.profile.levels[key]}
                </span>
              ))}
              {markers.map(({ key, factor }) => (
                <span
                  key={key}
                  className={cn(
                    "habitat-fade absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2",
                    "left-[var(--spot-left)]",
                    // 1 bleibt unter der Sonne; 2 bis 4 rücken über ihre Legendenspalte.
                    factor > 0 && "lg:left-[calc(var(--col)*(100%_-_7.5rem)/4_+_var(--col)*2.5rem_+_0.75rem)]",
                    // 4 und 2 etwas höher, sonst sitzen sie auf Grat und Baumkronen.
                    (key === "altitude" || key === "culture") && "-mt-2.5 sm:-mt-4"
                  )}
                  style={markerStyle(spots.markers[key], factor, 1300 + factor * 120)}
                >
                  <LegendMarker index={factor} label={`${factor + 1}: ${t.factors[factor][0]}`}>
                    <SceneNumber
                      n={factor + 1}
                      marker
                      className="profile-marker relative shadow-[var(--shadow-on-photo)] max-sm:size-[18px] max-sm:text-[10px] max-sm:ring-1"
                      style={{ "--marker-delay": `${factor * 1.1}s` } as CSSProperties}
                    />
                  </LegendMarker>
                  {key === "altitude" ? (
                    <span aria-hidden className="absolute left-full ml-2 hidden whitespace-nowrap normal-case tracking-normal text-[var(--color-ink)] sm:block">
                      {t.profile.peak}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
          <figcaption className="mt-3 text-xs leading-5 text-[var(--color-muted)]">{t.profile.note}</figcaption>
        </figure>

        {/* Telefon: wischbare Kartenreihe, damit die Grafik im Bild bleibt. */}
        <LegendCarousel className="mt-6 sm:hidden" items={t.factors} tone="light" pagerLabel={story.legendPager} stagger />
        <ol className="mt-10 hidden gap-x-10 gap-y-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {t.factors.map(([term, description], index) => (
            <li
              key={term}
              data-home-reveal="rise"
              style={{ "--home-reveal-delay": `${index * 80}ms` } as CSSProperties}
              className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 border-t border-[var(--color-line)] pt-5"
            >
              <SceneNumber n={index + 1} className="mt-px ring-0" />
              <div>
                <h3 className="font-semibold tracking-[-0.01em] text-[var(--color-ink)]">{term}</h3>
                <p className="mt-1 max-w-[40ch] leading-7 text-[var(--color-muted)]">{description}</p>
              </div>
            </li>
          ))}
        </ol>
        </div>

        {/* Die Zahlenebene: groß gesetzt, durch Haarlinien getrennt, ohne Rahmen. */}
        <div data-home-reveal="rise" className={cn(hiddenWhenCollapsed, "mt-16 sm:mt-32")}>
          <h3 className={cn(textHeadline, "max-w-[24ch] text-[var(--color-ink)]")}>
            {figures.title}
          </h3>
          <p className={cn(textLead, "mt-4 text-pretty")}>
            {figures.copy}
          </p>
          {/* Jede Zahl einzeilig, Zusätze wie „ca.“ oder „von 36“ klein daneben:
              So stehen alle vier auf einer Grundlinie, und die Beschriftungen
              darunter beginnen auf gleicher Höhe. */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[var(--color-line)] pt-8 sm:mt-12 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-0 lg:pt-10">
            {figures.items.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col-reverse justify-end ${index > 0 ? "lg:border-l lg:border-[var(--color-line)] lg:pl-10" : ""} ${
                  index < figures.items.length - 1 ? "lg:pr-10" : ""
                }`}
              >
                <dt className="mt-4 max-w-[24ch] text-sm leading-6 text-[var(--color-muted)]">{item.label}</dt>
                <dd className="whitespace-nowrap font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-none tracking-[-0.035em] tabular-nums text-[var(--color-forest)]">
                  {item.prefix ? (
                    <span className="mr-[0.25em] text-[0.42em] tracking-[-0.01em] text-[var(--color-forest)]/75">{item.prefix}</span>
                  ) : null}
                  <CountUp value={item.value} />
                  {item.suffix ? (
                    <span className="ml-[0.3em] text-[0.42em] tracking-[-0.01em] text-[var(--color-forest)]/75">{item.suffix}</span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-[90ch] text-xs leading-5 text-[var(--color-muted)]">{figures.source}</p>
        </div>

        {/* Der Bericht als eigene Zeile: Er ist die Vertiefung, keine Fußnote. */}
        <a
          href={story.monitoring.href}
          target="_blank"
          rel="noreferrer"
          data-home-reveal="rise"
          className={`${hiddenWhenCollapsed} group mt-10 flex sm:mt-14 items-center justify-between gap-6 border-y border-[var(--color-line)] py-7 sm:py-9 ${focusRing}`}
        >
          <span className="min-w-0">
            <span className="block font-display text-balance text-[1.5rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-forest)] sm:text-[2rem]">
              {story.monitoring.title}
            </span>
            <span className="mt-2 block text-sm leading-6 text-[var(--color-muted)]">{story.monitoring.subtitle}</span>
          </span>
          <ArrowUpRight
            className="size-7 shrink-0 text-[var(--color-forest)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:size-9"
            strokeWidth={1.5}
            aria-hidden
          />
        </a>
      </Container>
    </MobileCollapseSection>
  );
}
