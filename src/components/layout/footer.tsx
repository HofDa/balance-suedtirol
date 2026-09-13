import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRingOnDark } from "@/components/ui/focus";

export function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).footer;
  const linkClass = `inline-flex min-h-10 items-center text-sm text-white/68 transition duration-200 hover:translate-x-0.5 hover:text-white ${focusRingOnDark}`;

  return (
    <footer className="border-t border-white/8 bg-[var(--color-ink)] py-16 text-white sm:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.45fr_0.7fr_0.7fr] lg:gap-20">
          <div className="md:col-span-2 lg:col-span-1">
            <Link
              href={`/${locale}`}
              className={`inline-flex min-h-11 items-center font-semibold tracking-[-0.03em] transition-transform duration-200 ease-out hover:scale-[1.02] ${focusRingOnDark}`}
            >
              <span className="text-2xl font-bold tracking-tight text-white">b*alance</span>
            </Link>
            <p className="mt-5 max-w-[34ch] text-base leading-7 text-white/78">
              {t.mission}
            </p>
            <p className="mt-6 max-w-[46ch] text-sm leading-6 text-white/58">
              {t.science}
            </p>
            <Link
              href={`/${locale}/methodik`}
              className={`mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-white/80 underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-white/65 ${focusRingOnDark}`}
            >
              {t.methodology}
            </Link>
          </div>

          <nav aria-label={t.explore}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/58">{t.explore}</p>
            <ul className="mt-5 space-y-1">
              <li>
                <Link href={`/${locale}/haus-tour`} className={linkClass}>{t.habitatCheck}</Link>
              </li>
              <li>
                <Link href={`/${locale}/projekte`} className={linkClass}>{t.projects}</Link>
              </li>
              <li>
                <Link href={`/${locale}/projekt-einreichen`} className={linkClass}>{t.submitProject}</Link>
              </li>
              <li>
                <Link href={`/${locale}/co2-und-biodiversitaet`} className={linkClass}>{t.carbonStance}</Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.about}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/58">{t.about}</p>
            <ul className="mt-5 space-y-1">
              <li>
                <Link href={`/${locale}/ueber-uns`} className={linkClass}>{t.aboutBalance}</Link>
              </li>
              <li>
                <Link href={`/${locale}/datenschutz`} className={linkClass}>{t.privacy}</Link>
              </li>
              <li>
                <Link href={`/${locale}/impressum`} className={linkClass}>{t.imprint}</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/58 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.copyright}</p>
          <p>{t.closing}</p>
        </div>
      </Container>
    </footer>
  );
}
