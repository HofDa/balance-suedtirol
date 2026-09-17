import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig, type Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { focusRingOnDark } from "@/components/ui/focus";

/**
 * Vier Spalten auf dem Desktop, gleich hoch: Marke, Entdecken, Plattform,
 * Kontakt. Datenschutz und Impressum stehen in der Fußzeile neben dem
 * Copyright – sie gehören zu keiner Rubrik und füllten die Plattform-Spalte
 * nur auf.
 *
 * Kontakt und Newsletter laufen über dasselbe Postfach. Die Anmeldung ist ein
 * vorausgefülltes Mail: Es gibt noch keinen Server, der ein Formular annehmen
 * könnte, und ein Formular ohne Empfänger wäre schlimmer als keines.
 */
export function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).footer;
  const linkClass = `inline-flex min-h-10 items-center text-sm text-white/68 transition duration-200 hover:translate-x-0.5 hover:text-white ${focusRingOnDark}`;
  const headingClass = "text-xs font-bold uppercase tracking-[0.16em] text-white/58";
  const newsletterHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(t.newsletterSubject)}&body=${encodeURIComponent(t.newsletterBody)}`;

  return (
    <footer className="border-t border-white/8 bg-[var(--color-ink)] py-16 text-white sm:py-20">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr] lg:gap-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={`/${locale}`}
              className={`inline-flex min-h-11 items-center font-semibold tracking-[-0.03em] transition-transform duration-200 ease-out hover:scale-[1.02] ${focusRingOnDark}`}
            >
              <span className="text-2xl font-bold tracking-tight text-white">b*alance</span>
            </Link>
            <p className="mt-5 max-w-[34ch] text-base leading-7 text-white/78">{t.mission}</p>
            <p className="mt-5 max-w-[40ch] text-sm leading-6 text-white/58">{t.science}</p>
          </div>

          <nav aria-label={t.explore}>
            <p className={headingClass}>{t.explore}</p>
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
            <p className={headingClass}>{t.about}</p>
            <ul className="mt-5 space-y-1">
              <li>
                <Link href={`/${locale}/was-ist-balance`} className={linkClass}>{t.whatIs}</Link>
              </li>
              <li>
                <Link href={`/${locale}/ueber-uns`} className={linkClass}>{t.aboutBalance}</Link>
              </li>
              <li>
                <Link href={`/${locale}/methodik`} className={linkClass}>{t.methodology}</Link>
              </li>
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className={headingClass}>{t.contact}</p>
            <p className="mt-5 text-sm leading-6 text-white/68">{t.contactCopy}</p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className={`mt-1 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 transition hover:decoration-white/65 ${focusRingOnDark}`}
            >
              <Mail className="size-4 text-[var(--color-moss)]" aria-hidden />
              {siteConfig.contactEmail}
            </a>

            <p className={`mt-8 ${headingClass}`}>{t.newsletter}</p>
            <p className="mt-3 max-w-[36ch] text-sm leading-6 text-white/68">{t.newsletterCopy}</p>
            <a
              href={newsletterHref}
              className={`mt-4 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] border border-white/25 px-4 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/8 ${focusRingOnDark}`}
            >
              {t.newsletterCta}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/58 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            <li>
              <Link href={`/${locale}/datenschutz`} className={`inline-flex min-h-8 items-center text-white/58 transition hover:text-white ${focusRingOnDark}`}>
                {t.privacy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/impressum`} className={`inline-flex min-h-8 items-center text-white/58 transition hover:text-white ${focusRingOnDark}`}>
                {t.imprint}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
