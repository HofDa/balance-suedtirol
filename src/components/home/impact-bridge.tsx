import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Sprout } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { Label } from "@/components/ui/label";
import { focusRingOnDark } from "@/components/ui/focus";
import type { CSSProperties } from "react";

export function ImpactBridge({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).impact;
  return (
    <section id="about-balance" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div
          data-home-reveal="scale"
          className="overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink)] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16"
        >
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Label size="section" tone="moss">{t.eyebrow}</Label>
              <h2 className="mt-4 max-w-3xl font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]">
                {t.title}
              </h2>
              <p className="mt-4 max-w-xl text-[length:var(--text-body)] leading-[1.7] text-white/80">
                {t.copy}
              </p>
              <Link href={`/${locale}/projekte`} className={`group mt-8 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 text-sm font-bold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper)] ${focusRingOnDark}`}>
                {t.cta}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <Feature icon={Sprout} title={t.features[0][0]} copy={t.features[0][1]} index={0} />
              <Feature icon={ShieldCheck} title={t.features[1][0]} copy={t.features[1][1]} index={1} />
              <Feature icon={BarChart3} title={t.features[2][0]} copy={t.features[2][1]} index={2} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Feature({
  icon: Icon,
  title,
  copy,
  index
}: {
  icon: typeof Sprout;
  title: string;
  copy: string;
  index: number;
}) {
  return (
    <div
      data-home-reveal="slide"
      style={{ "--home-reveal-delay": `${120 + index * 80}ms` } as CSSProperties}
      className="group rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-5 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/9"
    >
      <Icon className="size-5 text-[var(--color-moss)] transition-transform duration-300 group-hover:scale-110" />
      <p className="mt-4 font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6 text-white/60">{copy}</p>
    </div>
  );
}
