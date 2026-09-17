import Link from "next/link";
import { ArrowRight, Cloud, Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";
import { focusRing } from "@/components/ui/focus";
import { siteConfig, type Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";

export function HomeExplainers({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const links = [
    { label: t.biodiversityExplainer.button, href: "/biodiversitaet-in-suedtirol", Icon: Leaf },
    // Das Label kommt aus der Navigation, gesucht über den Pfad – ein fester
    // Index verrutscht, sobald die Navigation einen Eintrag dazubekommt.
    { label: t.nav[siteConfig.navigation.findIndex((item) => item.href === "/co2-und-biodiversitaet")], href: "/co2-und-biodiversitaet", Icon: Cloud }
  ];

  return (
    <section className="py-6 sm:py-8" aria-label={links.map((link) => link.label).join(" / ")}>
      <Container>
        <div data-home-reveal="rise" className="flex flex-wrap items-center gap-3">
          {links.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={`/${locale}${href}`}
              className={`group inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-forest)]/20 bg-white px-5 py-3 text-sm font-semibold tracking-[-0.01em] text-[var(--color-forest)] shadow-sm transition duration-200 hover:border-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-white hover:shadow-md active:scale-[0.98] ${focusRing}`}
            >
              <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {label}
              <ArrowRight className="ml-1 size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
