import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { isLocale } from "@/config/site";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";

const principles = [
  ["Keine Scheingenauigkeit", "Biodiversitätswirkungen werden als nachvollziehbare Orientierung dargestellt, nicht als magische Universalzahl."],
  ["Versionierte Modelle", "Fragen, Gewichtungen und Quellen sollen später mit einer Modellversion verknüpft werden."],
  ["Pflichtkriterien", "Ein hoher Gesamtscore darf zentrale ökologische Ausschlusskriterien nicht kompensieren."],
  ["Sichtbare Unsicherheit", "Schätzungen, Annahmen und Grenzen werden dort erläutert, wo sie für Entscheidungen relevant sind."]
];

export default async function MethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <Label size="section">Methodik</Label>
          <h1 className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]">Vertrauen entsteht nicht aus einem grünen Häkchen.</h1>
          <p className="mt-6 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">Diese Seite skizziert die methodischen Leitplanken. Fachgremium, Kriterienkatalog und Quellenmanagement müssen im weiteren Projekt konkretisiert werden.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {principles.map(([title, copy], index) => (
            <Surface key={title} as="article" level="sheet">
              <p className="text-sm font-bold text-[var(--color-forest)]">0{index + 1}</p>
              <h2 className="mt-5 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">{title}</h2>
              <p className="mt-3 leading-7 text-[var(--color-muted)]">{copy}</p>
            </Surface>
          ))}
        </div>
      </Container>
    </section>
  );
}
