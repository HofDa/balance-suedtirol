import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/config/site";
import { Surface } from "@/components/ui/surface";

export const metadata: Metadata = {
  title: "Impressum | b*alance Südtirol",
  description: "Rechtliche Informationen und Impressum der Plattform b*alance Südtirol."
};

export default async function ImpressumPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  await params;

  return (
    <main className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="font-display text-[length:var(--text-display)] leading-[var(--leading-display)] text-[var(--color-ink)]">
          Impressum
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          Angaben gemäß Informationspflichten für digitale Dienste.
        </p>

        <Surface level="sheet" className="mt-10 space-y-8 text-sm leading-7 text-[var(--color-ink)]">
          <section>
            <h2 className="mb-2 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] text-[var(--color-ink)]">Herausgeber & Plattformbetreiber</h2>
            <p className="font-medium">b*alance Südtirol – Initiativgruppe Biodiversität</p>
            <p>Dr.-Julius-Perathoner-Straße 12</p>
            <p>39100 Bozen (BZ), Südtirol – Italien</p>
          </section>

          <section>
            <h2 className="mb-2 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] text-[var(--color-ink)]">Kontakt</h2>
            <p>E-Mail: info@balance-suedtirol.it</p>
            <p>Telefon: +39 0471 000 000</p>
          </section>

          <section>
            <h2 className="mb-2 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] text-[var(--color-ink)]">Wissenschaftlicher Beirat & Datenquelle</h2>
            <p>
              Die Methodik und Wirkungsberechnungen basieren auf wissenschaftlichen Datenmodellen zur Südtiroler Artenvielfalt in Zusammenarbeit mit lokalen Forschungs- und Naturschutzpartnern (u. a. Eurac Research Biodiversity Monitoring).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] text-[var(--color-ink)]">Haftungsausschluss</h2>
            <p className="text-[var(--color-muted)]">
              Die Inhalte dieser Plattform wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>
        </Surface>
      </Container>
    </main>
  );
}
