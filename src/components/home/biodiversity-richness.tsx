import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { focusRing } from "@/components/ui/focus";
import type { Locale } from "@/config/site";
import { getHomeStory, richnessImage } from "@/config/home-story";
import { getTranslations } from "@/config/translations";
import { withBasePath } from "@/lib/public-path";
import { MobileDisclosureList } from "./mobile-disclosure-list";
import { textDisplay, textHeadline, textLead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * Höhenstufen im Foto, von oben nach unten. Die Punkte sitzen auf dem Motiv
 * (Prozent der Bildfläche) und erklären, was der Text behauptet: viele
 * Lebensräume in einem Blick. Unter `sm` stehen sie nur in der Bildunterschrift.
 */
const annotationSpots = [
  { key: "peaks", left: "27%", top: "31%" },
  { key: "forest", left: "44%", top: "40%" },
  { key: "pastures", left: "79%", top: "48%" },
  { key: "valley", left: "66%", top: "67%" }
] as const;

/**
 * Der erste Abschnitt nach dem Hero: Was Südtirol besitzt. Text und Foto
 * nebeneinander, darunter die Zahlen als typografische Zeile – keine Karten –
 * und der Weg zum Monitoringbericht als eigene, breite Zeile statt als
 * Fußnote.
 */
export function BiodiversityRichness({ locale }: { locale: Locale }) {
  const story = getHomeStory(locale);
  const t = story.richness;
  const figures = story.figures;
  const photo = getTranslations(locale).hero.photo;

  return (
    <section id="vielfalt" aria-labelledby="vielfalt-title" className="scroll-mt-20 py-16 sm:py-32">
      <Container>
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div data-home-reveal="rise">
            <Label size="section">{t.eyebrow}</Label>
            <h2
              id="vielfalt-title"
              className={cn(textDisplay, "mt-4 text-[var(--color-ink)]")}
            >
              {t.title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
              {t.lead}
            </p>

            <MobileDisclosureList
              className="mt-8"
              items={t.factors.map(([term, description]) => ({ key: term, summary: term, body: description }))}
            />
            <dl className="mt-10 hidden sm:block">
              {t.factors.map(([term, description]) => (
                <div
                  key={term}
                  className="grid gap-1 border-t border-[var(--color-line)] py-5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="font-semibold tracking-[-0.01em] text-[var(--color-ink)]">{term}</dt>
                  <dd className="max-w-[52ch] leading-7 text-[var(--color-muted)]">{description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure data-home-reveal="scale" className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-stone)]">
              <Image
                src={withBasePath(richnessImage.src)}
                alt={t.imageAlt}
                width={richnessImage.width}
                height={richnessImage.height}
                placeholder="blur"
                blurDataURL={richnessImage.blurDataURL}
                sizes="(min-width: 1240px) 680px, (min-width: 1024px) 55vw, 100vw"
                className="h-auto w-full"
              />
              <ul className="hidden sm:block" aria-hidden>
                {annotationSpots.map((spot) => (
                  <li
                    key={spot.key}
                    className="absolute flex -translate-y-1/2 items-center gap-2"
                    style={{ left: spot.left, top: spot.top }}
                  >
                    <span className="-ml-1.5 size-3 shrink-0 rounded-full border-2 border-white bg-[var(--color-forest)] shadow-[var(--shadow-on-photo)]" />
                    <span className="rounded-[var(--radius-sm)] bg-[var(--color-ink)]/78 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                      {t.annotations[spot.key]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <figcaption className="mt-3 flex flex-col gap-1 text-xs leading-5 text-[var(--color-muted)] sm:flex-row sm:justify-between sm:gap-6">
              <span>{t.imageCaption}</span>
              <span className="shrink-0">
                {photo}: {richnessImage.photographer} ·{" "}
                <a
                  href={richnessImage.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`underline underline-offset-2 hover:text-[var(--color-forest)] ${focusRing}`}
                >
                  {richnessImage.license}
                </a>
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Die Zahlenebene: groß gesetzt, durch Haarlinien getrennt, ohne Rahmen. */}
        <div data-home-reveal="rise" className="mt-16 sm:mt-32">
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
                  {item.value}
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
          className={`group mt-10 flex sm:mt-14 items-center justify-between gap-6 border-y border-[var(--color-line)] py-7 sm:py-9 ${focusRing}`}
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
    </section>
  );
}
