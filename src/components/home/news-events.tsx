import type { CSSProperties } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { getNewsItems } from "@/data/news";
import type { NewsItem } from "@/types/news";

const localeTags: Record<Locale, string> = { de: "de-IT", it: "it-IT", en: "en-GB" };

/**
 * Termine und Neuigkeiten stehen in einem Raster, nicht in zwei Spalten:
 * Beides ist datiert und wird gleich gelesen. Unterschieden wird nur durch die
 * Rubrik und die Zeile mit Ort und Uhrzeit, die es bei Neuigkeiten nicht gibt.
 */
export function NewsEvents({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).news;
  const items = getNewsItems(locale);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div data-home-reveal="rise">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} copy={t.copy} />
        </div>

        {items.length === 0 ? (
          <p data-home-reveal="rise" className="mt-12 text-[length:var(--text-body)] text-[var(--color-muted)]">
            {t.empty}
          </p>
        ) : (
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li
                key={item.slug}
                data-home-reveal="rise"
                style={{ "--home-reveal-delay": `${index * 65}ms` } as CSSProperties}
              >
                <NewsCard item={item} locale={locale} kindLabel={t.kinds[item.kind]} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

function NewsCard({
  item,
  locale,
  kindLabel
}: {
  item: NewsItem;
  locale: Locale;
  kindLabel: string;
}) {
  const isEvent = item.kind === "event";

  return (
    <Surface
      as="article"
      className="group flex h-full flex-col transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Label
          size="dense"
          tone={isEvent ? "ink" : "forest"}
          as="span"
          className={`inline-flex items-center rounded-[var(--radius-sm)] px-2 py-1 ${
            isEvent ? "bg-[var(--color-accent)]/30" : "bg-[var(--color-sage)]"
          }`}
        >
          {kindLabel}
        </Label>
        <time
          dateTime={item.date}
          className="inline-flex items-center gap-1.5 text-[length:var(--text-meta)] font-semibold text-[var(--color-muted)]"
        >
          <CalendarDays className="size-4" aria-hidden />
          {formatDate(item.date, locale)}
        </time>
      </div>

      <h3 className="mt-4 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.01em] text-[var(--color-ink)]">
        {item.title}
      </h3>
      <p className="mt-2 text-[length:var(--text-meta)] leading-[var(--leading-body)] text-[var(--color-muted)]">
        {item.summary}
      </p>

      {item.place || item.time ? (
        <div className="mt-5 flex flex-col gap-1.5 border-t border-[var(--color-line)] pt-4 text-[length:var(--text-meta)] leading-[var(--leading-meta)] text-[var(--color-ink)]">
          {item.time ? (
            <div className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-[var(--color-forest)]" aria-hidden />
              <span>{item.time}</span>
            </div>
          ) : null}
          {item.place ? (
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-[var(--color-forest)]" aria-hidden />
              <span>{item.place}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </Surface>
  );
}

/** Über UTC formatiert, sonst liegt das Datum je nach Zeitzone einen Tag daneben. */
function formatDate(raw: string, locale: Locale) {
  const [year, month, day] = raw.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}
