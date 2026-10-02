import Link from "@/components/ui/site-link";
import { ArrowDown } from "lucide-react";
import { getTranslations } from "@/config/translations";
import type { Locale } from "@/config/site";
import { focusRingOnDark } from "@/components/ui/focus";
import { ArrowIcon } from "@/components/ui/arrow-icon";

/**
 * Ein Knopf mit Gewicht – zu den Projekten, dem Kern der Plattform – und
 * daneben leise der Einstieg in die Erzählung darunter. Der Knopf trägt
 * denselben Akzent wie der Abschluss der Seite.
 */
export function HeroActions({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).hero;

  return (
    <div className="hero-reveal hero-reveal-actions mt-8 flex flex-col items-start gap-3 max-[359px]:mt-5 sm:flex-row sm:items-center sm:gap-6">
      <Link
        href={`/${locale}/projekte`}
        className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-accent-hover)] ${focusRingOnDark}`}
      >
        {t.projects}
        <ArrowIcon className="duration-200" />
      </Link>
      <a
        href="#vielfalt"
        className={`group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-[var(--color-moss)] ${focusRingOnDark}`}
      >
        {t.next}
        <ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5" aria-hidden />
      </a>
    </div>
  );
}
