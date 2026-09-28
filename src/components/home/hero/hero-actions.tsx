import { ArrowDown } from "lucide-react";
import { getTranslations } from "@/config/translations";
import type { Locale } from "@/config/site";
import { focusRingOnDark } from "@/components/ui/focus";

/**
 * Keine Knöpfe im Hero: Die Leitzeile trägt die erste Bildschirmhöhe allein.
 * Check und Projekte sind über die Navigation erreichbar; hier steht nur der
 * leise Einstieg in die Erzählung darunter.
 */
export function HeroActions({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).hero;

  return (
    <div className="hero-reveal hero-reveal-actions mt-8 max-[359px]:mt-5">
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
