import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRing } from "@/components/ui/focus";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { withBasePath } from "@/lib/public-path";
import { cn } from "@/lib/utils";
import { MobileCollapseSection, MobileCollapseToggle } from "./mobile-collapse";
import { hiddenWhenCollapsed } from "./mobile-collapse-classes";

/**
 * Der Lebensraum-Check als Höhepunkt nach den Neuigkeiten: Das Haus aus dem
 * Check steht groß daneben, jeder Raum trägt sein Thema als Etikett. Das ganze
 * Bild führt in den Check – einzelne Räume lassen sich dort (noch) nicht direkt
 * ansteuern, also verspricht das Bild auch keine Einzelsprünge.
 */

/** Etikettpunkte in Prozent der Bildfläche, aus den Raumrahmen in
 *  features/house-tour/config/full-house-layout.json abgeleitet. Die
 *  Reihenfolge folgt `house.rooms` in den Übersetzungen. */
const roomSpots = [
  { left: "61.6%", top: "52%" }, // Küche
  { left: "37.9%", top: "28%" }, // Bad
  { left: "61.6%", top: "28%" }, // Schlafzimmer
  { left: "13.6%", top: "49.5%" }, // Garage
  { left: "88%", top: "76%", flip: true }, // Garten: auf dem Rasen, nicht über dem Haus
  { left: "38%", top: "52%" } // Wohnzimmer
] as const;

const houseImage = {
  src: "/images/house-tour/full-house/house-teaser.webp",
  blurDataURL:
    "data:image/webp;base64,UklGRsYAAABXRUJQVlA4ILoAAAAwBQCdASoUABQAPu1ur1IppiQiqAgBMB2JZAC1G2ROABEONJfrBcnnGdaXbSyv7MSYAAD88NM5tQ4npPHmz4oi+Ufaee6mxct6V5mCmDa+2OGpTeOehj99McRCSTfG48kQYVvTsld0ppiWN+rTiSSCK3WlAppaA18BslO++RHDPhGPkBwhYtm0CPA8K/LCicUcw5quqlaf+Ok7oN1D3ZejkG1B3n7mvGyV/Do6i9xppkCQgCqINhDEAAA="
};

export function HouseIntro({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).house;
  const href = `/${locale}/haus-tour`;

  return (
    <MobileCollapseSection aria-labelledby="house-title" className="py-16 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
          <div data-home-reveal="rise">
            <SectionHeading
              id="house-title"
              eyebrow={t.eyebrow}
              title={t.title}
              copy={t.copy}
              copyClassName={hiddenWhenCollapsed}
              toggle={<MobileCollapseToggle labelledBy="house-title" />}
            />
            <Link
              href={href}
              className={cn(
                hiddenWhenCollapsed,
                `group mt-8 inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-6 text-sm font-bold text-white transition-colors hover:bg-[var(--color-ink)] ${focusRing}`
              )}
            >
              {t.open}
              <ArrowIcon />
            </Link>
          </div>

          <figure data-home-reveal="scale" className={cn(hiddenWhenCollapsed, "m-0")}>
            <Link
              href={href}
              tabIndex={-1}
              aria-hidden
              className="group relative block overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-sage)] shadow-[var(--shadow-panel)]"
            >
              <Image
                src={withBasePath(houseImage.src)}
                alt=""
                width={1100}
                height={1100}
                placeholder="blur"
                blurDataURL={houseImage.blurDataURL}
                sizes="(min-width: 1240px) 700px, (min-width: 1024px) 58vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <ul className="hidden sm:block">
                {t.rooms.map(([room, topic], index) => {
                  const spot = roomSpots[index];
                  const flip = "flip" in spot && spot.flip;
                  return (
                    <li
                      key={room}
                      className={cn("absolute flex -translate-y-1/2 items-center gap-2", flip && "-translate-x-full flex-row-reverse")}
                      style={{ left: spot.left, top: spot.top }}
                    >
                      <span className={cn(flip ? "-mr-1.5" : "-ml-1.5", "size-3 shrink-0 rounded-full border-2 border-white bg-[var(--color-forest)] shadow-[var(--shadow-on-photo)]")} />
                      <span className="whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--color-ink)]/82 px-2 py-1 leading-tight text-white backdrop-blur-sm">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.14em]">{room}</span>
                        {/* Unter md und zwischen lg und xl ist das Bild zu schmal für zwei Zeilen. */}
                        <span className="block text-[11px] text-white/75 max-md:hidden lg:max-xl:hidden">{topic}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Link>
            {/* Mobil stehen die Räume als Liste unter dem Bild. */}
            <figcaption className="mt-4 sm:hidden">
              <dl className="grid grid-cols-2 gap-x-6">
                {t.rooms.map(([room, topic]) => (
                  <div key={room} className="border-t border-[var(--color-line)] py-3">
                    <dt className="text-sm font-semibold text-[var(--color-ink)]">{room}</dt>
                    <dd className="text-xs text-[var(--color-muted)]">{topic}</dd>
                  </div>
                ))}
              </dl>
            </figcaption>
          </figure>
        </div>
      </Container>
    </MobileCollapseSection>
  );
}
