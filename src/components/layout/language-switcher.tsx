"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/config/site";
import { focusRing } from "@/components/ui/focus";

const languageNames: Record<Locale, string> = {
  de: "Deutsch",
  it: "Italiano",
  en: "English"
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const alternatives = locales.filter((language) => language !== locale);

  const localizedPath = (language: Locale) => {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) segments[1] = language;
    else segments.splice(1, 0, language);
    return segments.join("/") || `/${language}`;
  };

  return (
    <nav className="flex items-center gap-1.5" aria-label="Language / Lingua / Sprache">
      {alternatives.map((language, index) => (
        <Fragment key={language}>
          {index > 0 ? (
            <span className="text-xs text-[var(--color-muted)]/40 select-none" aria-hidden="true">
              ·
            </span>
          ) : null}
          <Link
            href={localizedPath(language)}
            hrefLang={language}
            lang={language}
            aria-label={languageNames[language]}
            className={`inline-flex min-h-9 items-center text-[13px] font-medium uppercase tracking-wider text-[var(--color-muted)]/75 transition-colors duration-200 hover:text-[var(--color-ink)] ${focusRing}`}
          >
            {language}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
