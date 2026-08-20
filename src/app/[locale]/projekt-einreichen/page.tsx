import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChartNoAxesCombined,
  ClipboardList,
  FileCheck2,
  Leaf,
  Lightbulb
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { isLocale, type Locale } from "@/config/site";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { focusRing } from "@/components/ui/focus";

const stepIcons = [Lightbulb, Leaf, ClipboardList, ChartNoAxesCombined, FileCheck2];

const pageCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    copy: string;
    journey: string[];
    frameworkLabel: string;
    frameworkTitle: string;
    frameworkCopy: string;
    stepLabel: string;
    steps: Array<{ title: string; copy: string }>;
    cta: string;
    note: string;
  }
> = {
  de: {
    eyebrow: "Begleitete Projektentwicklung",
    title: "Von der Idee zum lebendigen Lebensraum.",
    copy: "B*alance begleitet Projektträger Schritt für Schritt dabei, aus einer ersten Idee ein ökologisch fundiertes, realistisch geplantes und transparent dokumentiertes Biodiversitätsprojekt zu entwickeln.",
    journey: ["Idee", "Planung", "Umsetzung", "Monitoring", "Transparente Wirkung"],
    frameworkLabel: "Der Weg mit B*alance",
    frameworkTitle: "Ein klarer Rahmen für wirksame Projekte",
    frameworkCopy: "Ökologische Bewertung, Budget und Monitoring werden von Anfang an zusammen gedacht. So entstehen nachvollziehbare Projekte mit messbaren Zielen.",
    stepLabel: "Schritt",
    steps: [
      {
        title: "Projektidee",
        copy: "Ziel, Ort und ökologische Ausgangslage des Vorhabens gemeinsam schärfen."
      },
      {
        title: "Lebensraum-Analyse",
        copy: "Lebensräume, Arten und den konkreten Handlungsbedarf fundiert erfassen."
      },
      {
        title: "Planung & Budget",
        copy: "Maßnahmen, Zuständigkeiten, Zeitplan und Finanzierung realistisch strukturieren."
      },
      {
        title: "Monitoring & Wirkung",
        copy: "Messbare Ziele, geeignete Indikatoren und die langfristige Beobachtung definieren."
      },
      {
        title: "Veröffentlichen & einreichen",
        copy: "Das Projekt transparent dokumentieren und nachvollziehbar zur Prüfung einreichen."
      }
    ],
    cta: "Projekt einreichen",
    note: "B*alance schafft den Rahmen – die fachliche Verantwortung bleibt bei den Projektträgern und ihren Partnern."
  },
  it: {
    eyebrow: "Sviluppo guidato dei progetti",
    title: "Dall’idea a un habitat vitale.",
    copy: "B*alance accompagna i promotori passo dopo passo nel trasformare una prima idea in un progetto per la biodiversità ecologicamente fondato, realistico e documentato in modo trasparente.",
    journey: ["Idea", "Pianificazione", "Realizzazione", "Monitoraggio", "Impatto trasparente"],
    frameworkLabel: "Il percorso con B*alance",
    frameworkTitle: "Un quadro chiaro per progetti efficaci",
    frameworkCopy: "Valutazione ecologica, budget e monitoraggio vengono considerati insieme fin dall’inizio. Nascono così progetti comprensibili con obiettivi misurabili.",
    stepLabel: "Fase",
    steps: [
      {
        title: "Idea di progetto",
        copy: "Definire con chiarezza obiettivo, luogo e situazione ecologica di partenza."
      },
      {
        title: "Analisi dell’habitat",
        copy: "Rilevare in modo fondato habitat, specie e necessità concreta di intervento."
      },
      {
        title: "Pianificazione e budget",
        copy: "Strutturare realisticamente misure, responsabilità, tempi e finanziamento."
      },
      {
        title: "Monitoraggio e impatto",
        copy: "Definire obiettivi misurabili, indicatori adeguati e osservazione a lungo termine."
      },
      {
        title: "Pubblicare e presentare",
        copy: "Documentare il progetto con trasparenza e presentarlo in modo verificabile."
      }
    ],
    cta: "Presenta un progetto",
    note: "B*alance offre il quadro metodologico; la responsabilità tecnica resta ai promotori e ai loro partner."
  },
  en: {
    eyebrow: "Guided project development",
    title: "From an idea to a thriving habitat.",
    copy: "B*alance guides project owners step by step from an initial idea to a biodiversity project that is ecologically sound, realistically planned and transparently documented.",
    journey: ["Idea", "Planning", "Implementation", "Monitoring", "Transparent impact"],
    frameworkLabel: "The journey with B*alance",
    frameworkTitle: "A clear framework for effective projects",
    frameworkCopy: "Ecological assessment, budgeting and monitoring are considered together from the start, creating transparent projects with measurable goals.",
    stepLabel: "Step",
    steps: [
      {
        title: "Project idea",
        copy: "Clarify the objective, location and ecological starting point of the project."
      },
      {
        title: "Habitat assessment",
        copy: "Establish the habitats, species and specific ecological need for action."
      },
      {
        title: "Planning & budget",
        copy: "Structure measures, responsibilities, timeline and financing realistically."
      },
      {
        title: "Monitoring & impact",
        copy: "Define measurable goals, suitable indicators and long-term observation."
      },
      {
        title: "Publish & submit",
        copy: "Document the project transparently and submit it for a traceable review."
      }
    ],
    cta: "Submit a Project",
    note: "B*alance provides the framework; technical responsibility remains with project owners and their partners."
  }
};

export default async function SubmitProjectPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = pageCopy[locale];

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Label size="section">{copy.eyebrow}</Label>
            <h1 className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
              {copy.copy}
            </p>

            <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs font-semibold text-[var(--color-forest)]" aria-label={copy.frameworkLabel}>
              {copy.journey.map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="rounded-full bg-[var(--color-sage)] px-3 py-2">{item}</span>
                  {index < copy.journey.length - 1 && (
                    <ArrowRight className="size-3.5 text-[var(--color-muted)]" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </div>

          <Surface level="sheet" className="shadow-[var(--shadow-panel)]">
            <div className="max-w-2xl">
              <Label size="dense">{copy.frameworkLabel}</Label>
              <h2 className="mt-2 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">
                {copy.frameworkTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                {copy.frameworkCopy}
              </p>
            </div>

            <ol className="mt-8" aria-label={copy.frameworkTitle}>
              {copy.steps.map((step, index) => {
                const Icon = stepIcons[index];
                const isLast = index === copy.steps.length - 1;
                return (
                  <li
                    key={step.title}
                    className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-4"
                  >
                    {!isLast && (
                      <span
                        className="absolute bottom-0 left-6 top-12 w-px -translate-x-1/2 bg-[var(--color-forest)]/20"
                        aria-hidden
                      />
                    )}
                    <span className="relative z-10 grid size-12 place-items-center rounded-full border border-[var(--color-forest)]/20 bg-[var(--color-sage)] text-[var(--color-forest)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className={isLast ? "pb-1" : "pb-7"}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                        {copy.stepLabel} {index + 1}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-[var(--color-ink)]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 border-t border-[var(--color-line)] pt-6">
              <Link
                href={`/${locale}/projekt-einreichen/formular`}
                className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-forest)] sm:w-auto ${focusRing}`}
              >
                {copy.cta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <p className="mt-4 max-w-2xl text-xs leading-5 text-[var(--color-muted)]">
                {copy.note}
              </p>
            </div>
          </Surface>
        </div>
      </Container>
    </section>
  );
}
