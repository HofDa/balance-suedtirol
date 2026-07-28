import Link from "next/link";
import { ArrowUpRight, Bath, Bike, CookingPot, Flower2, LampFloor, Plane } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { Surface } from "@/components/ui/surface";
import { focusRing } from "@/components/ui/focus";
import type { CSSProperties } from "react";

const roomIcons = [CookingPot, Bath, LampFloor, Bike, Flower2, Plane];

export function HouseIntro({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).house;
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div data-home-reveal="rise">
            <SectionHeading
              eyebrow={t.eyebrow}
              title={t.title}
              copy={t.copy}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roomIcons.map((Icon, index) => (
              <div
                key={index}
                data-home-reveal="rise"
                style={{ "--home-reveal-delay": `${index * 65}ms` } as CSSProperties}
              >
                <Surface className="group h-full transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
                  <div className="grid size-10 place-items-center rounded-full bg-[var(--color-moss)]/25 text-[var(--color-forest)] transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:scale-110">
                    <Icon className="size-4.5" />
                  </div>
                  <p className="mt-5 font-semibold text-[var(--color-ink)]">{t.rooms[index][0]}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{t.rooms[index][1]}</p>
                </Surface>
              </div>
            ))}
          </div>
        </div>
        <Link
          href={`/${locale}/haus-tour`}
          data-home-reveal="rise"
          className={`group mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-forest)] ${focusRing}`}
        >
          {t.open}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </section>
  );
}
