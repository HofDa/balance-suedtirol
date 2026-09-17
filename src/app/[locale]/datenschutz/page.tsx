import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { isLocale, locales, type Locale } from "@/config/site";
import { Surface } from "@/components/ui/surface";
import { withBasePath } from "@/lib/public-path";

const route = "/datenschutz";

const datenschutzMeta: Record<Locale, { title: string; description: string }> = {
  de: { title: "Datenschutzerklärung", description: "Informationen zur Verarbeitung personenbezogener Daten auf b*alance Südtirol." },
  it: { title: "Informativa sulla privacy", description: "Informazioni sul trattamento dei dati personali su b*alance Alto Adige." },
  en: { title: "Privacy Policy", description: "Information about the processing of personal data on b*alance South Tyrol." }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const meta = datenschutzMeta[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: withBasePath(`/${locale}${route}`),
      languages: Object.fromEntries(locales.map((language) => [language, withBasePath(`/${language}${route}`)]))
    }
  };
}

export default async function DatenschutzPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  await params;

  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="font-display text-[length:var(--text-display)] leading-[var(--leading-display)] text-[var(--color-ink)]">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          Schutz Ihrer Daten und Transparenz nach DSGVO.
        </p>

        <Surface level="sheet" className="mt-10 space-y-8 text-sm leading-7 text-[var(--color-ink)]">
          <section>
            <h2 className="mb-2 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] text-[var(--color-ink)]">1. Datenschutz auf einen Blick</h2>
            <p className="text-[var(--color-muted)]">
              Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Die Nutzung unserer Plattform ist weitgehend ohne Angabe personenbezogener Daten möglich.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] text-[var(--color-ink)]">2. Datenerfassung auf unserer Website</h2>
            <p>
              <strong>Interaktiver Lebensraum-Check:</strong> Die Eingaben im Lebensraum-Check werden ausschließlich lokal in Ihrem Browser verarbeitet und gespeichert. Es findet keine serverseitige Profilbildung statt.
            </p>
            <p className="mt-2">
              <strong>Server-Log-Dateien:</strong> Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (IP-Adresse, Browsertyp, Uhrzeit).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] text-[var(--color-ink)]">3. Ihre Rechte</h2>
            <p className="text-[var(--color-muted)]">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
            </p>
          </section>
        </Surface>
      </Container>
    </div>
  );
}
