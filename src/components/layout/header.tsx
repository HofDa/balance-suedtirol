import Link from "next/link";
import { Menu } from "lucide-react";
import { siteConfig, type Locale } from "@/config/site";
import { Container } from "@/components/ui/container";
import { getTranslations } from "@/config/translations";
import { LanguageSwitcher } from "./language-switcher";
import { NavLink } from "./nav-link";
import { Label } from "@/components/ui/label";
import { focusRing, focusRingTool } from "@/components/ui/focus";

export function Header({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  return (
    <header className="header-reveal sticky top-0 z-50 border-b border-[var(--color-line)] bg-transparent backdrop-blur-xl transition-colors duration-300">
      <Container className="relative flex h-18 items-center justify-between">
        {/* Left: LOGO */}
        <Link
          href={`/${locale}`}
          className={`inline-flex min-h-11 shrink-0 items-center font-semibold tracking-[-0.03em] transition-transform duration-200 ease-out hover:scale-[1.02] ${focusRing}`}
        >
          <span className="text-2xl font-bold tracking-tight text-[var(--color-ink)]">b*alance</span>
        </Link>

        {/* Right: Aligned Navigation Group (Projects · DE · IT · EN · CTA) */}
        <div className="hidden items-center lg:flex">
          <nav className="flex items-center" aria-label={t.navLabel}>
            {siteConfig.navigation.map((item, index) => (
              <NavLink key={item.href} href={`/${locale}${item.href}`}>
                {t.nav[index]}
              </NavLink>
            ))}
          </nav>

          <div className="ml-8 flex items-center">
            <LanguageSwitcher locale={locale} />
          </div>

          <Link
            href={`/${locale}/haus-tour`}
            className={`ml-10 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-bold text-white shadow-sm transition-all duration-200 ease-out hover:bg-[var(--color-ink)] hover:shadow-md ${focusRingTool}`}
          >
            {t.headerCta}
          </Link>
        </div>

        {/* Tablet / Mobile Menu Header Trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} />
          </div>

          <Link
            href={`/${locale}/haus-tour`}
            className={`inline-flex h-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-forest)] px-3.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[var(--color-ink)] ${focusRingTool}`}
          >
            {t.headerCta}
          </Link>

          <details className="group">
            <summary
              className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-[var(--color-line)] bg-white [&::-webkit-details-marker]:hidden"
              aria-label={t.menu}
            >
              <Menu className="size-5 text-[var(--color-ink)]" />
            </summary>

            <nav
              className="absolute inset-x-5 top-[4.75rem] rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white p-4 shadow-xl"
              aria-label={t.mobileNavLabel}
            >
              <div className="flex flex-col gap-1">
                {siteConfig.navigation.map((item, index) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className={`flex min-h-11 items-center rounded-[var(--radius-lg)] px-4 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-paper)] ${focusRing}`}
                  >
                    {t.nav[index]}
                  </Link>
                ))}
                <Link
                  href={`/${locale}/methodik`}
                  className={`flex min-h-11 items-center rounded-[var(--radius-lg)] px-4 text-sm font-semibold text-[var(--color-muted)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] ${focusRing}`}
                >
                  {t.footer.methodology}
                </Link>
              </div>

              <div className="mt-3 border-t border-[var(--color-line)] pt-3">
                <Label size="block" tone="muted" className="px-4 py-1.5 text-xs">
                  {t.projectOwners}
                </Label>
                <Link
                  href={`/${locale}/projekt-einreichen`}
                  className={`flex min-h-11 items-center rounded-[var(--radius-lg)] px-4 text-sm font-semibold text-[var(--color-forest)] hover:bg-[var(--color-paper)] ${focusRing}`}
                >
                  {t.submitProject}
                </Link>
              </div>

              <Link
                href={`/${locale}/haus-tour`}
                className={`mt-4 flex min-h-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[var(--color-ink)] ${focusRingTool}`}
              >
                {t.headerCta}
              </Link>

              <div className="mt-4 border-t border-[var(--color-line)] px-4 pt-3 sm:hidden">
                <LanguageSwitcher locale={locale} />
              </div>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
