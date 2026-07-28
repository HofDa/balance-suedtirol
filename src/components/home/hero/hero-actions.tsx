import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "@/config/translations";
import type { Locale } from "@/config/site";
import { focusRingOnDark } from "@/components/ui/focus";

/**
 * Eine dominante Aktion, ein alternativer Textlink und eine klare methodische
 * Einschränkung. So konkurrieren Projekte und Check nicht um dieselbe Priorität.
 */
export function HeroActions({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).hero;

  return (
    <div className="hero-reveal hero-reveal-actions mt-7 max-[359px]:mt-5">
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5">
        <Link
          href={`/${locale}/haus-tour`}
          className={`hero-cta group relative isolate inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 text-sm font-bold text-[var(--color-ink)] shadow-[var(--shadow-on-photo)] after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-[38%] after:bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.3),transparent)] transition-colors duration-200 ease-out hover:bg-[var(--color-accent-hover)] focus-visible:bg-[var(--color-accent-hover)] ${focusRingOnDark} sm:w-auto`}
        >
          {t.tour}
          <ArrowRight
            className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
            aria-hidden
          />
        </Link>

        <Link
          href={`/${locale}/projekte`}
          className={`group inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-[var(--color-moss)] ${focusRingOnDark}`}
        >
          {t.projects}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden />
        </Link>
      </div>

      <p className="mt-5 flex max-w-2xl flex-col gap-1 border-l border-white/30 pl-3 text-xs leading-5 text-white/80 max-[359px]:mt-3 max-[359px]:text-[0.7rem] max-[359px]:leading-4 sm:flex-row sm:items-center sm:gap-2">
        <span>{t.trust}</span>
        <span className="hidden sm:inline" aria-hidden>·</span>
        <Link
          href={`/${locale}/methodik`}
          className={`inline-flex min-h-11 shrink-0 items-center font-semibold text-[var(--color-moss)] underline decoration-white/30 underline-offset-4 hover:text-white ${focusRingOnDark} sm:min-h-0`}
        >
          {t.methodology}
        </Link>
      </p>
    </div>
  );
}
