import type { Locale } from "../config/site";
import { projects } from "./projects";

/**
 * Die Kennzahlen werden aus den Projektdaten gerechnet, nicht gepflegt.
 * Eine gepflegte Zahl driftet, sobald ein Projekt dazukommt — und eine Bilanz,
 * die den Projekten widerspricht, ist schlimmer als keine.
 */
export function getAchievementStats() {
  const habitats = new Set(projects.flatMap((project) => project.categoryIds));
  return {
    projects: projects.length,
    habitats: habitats.size,
    supporters: projects.reduce((sum, project) => sum + project.supporters, 0),
    funded: projects.reduce((sum, project) => sum + (project.funded ?? 0), 0)
  };
}

export type CompletedProject = {
  slug: string;
  /** Jahr des Abschlusses. */
  year: string;
  title: string;
  place: string;
  summary: string;
  /** Das eine nachprüfbare Ergebnis der Fläche. */
  result: { value: string; label: string };
};

/**
 * Beispielinhalte für die Prototyp-Ansicht, wie die Platzhalter-Förderer in
 * `projects.ts`. Sobald ein Projekt der Plattform tatsächlich abgeschlossen
 * ist, ersetzt sein Eintrag den passenden Platzhalter hier.
 */
export const completedProjects: CompletedProject[] = [
  {
    slug: "heckenband-vinschgau",
    year: "2025",
    title: "Heckenband Vinschgau",
    place: "Latsch",
    summary:
      "Entlang von Feldwegen und Gräben entstand eine durchgehende Hecke aus heimischen Sträuchern. Die Pflege ist über einen Bewirtschaftungsvertrag langfristig gesichert.",
    result: { value: "2,1 km", label: "neue Feldhecke" }
  },
  {
    slug: "laichgewaesser-unterland",
    year: "2024",
    title: "Laichgewässer Unterland",
    place: "Salurn",
    summary:
      "Vierzehn flache Tümpel ergänzen ein bestehendes Feuchtgebiet. Nach zwei Jahren sind alle Gewässer von Amphibien besiedelt.",
    result: { value: "14", label: "neue Laichgewässer" }
  },
  {
    slug: "wiesenbrueter-ahrntal",
    year: "2024",
    title: "Wiesenbrüterflächen Ahrntal",
    place: "Sand in Taufers",
    summary:
      "Höfe haben die Mahd auf ausgewählten Flächen nach hinten verlegt, damit Gelege und Jungvögel die Saison überstehen.",
    result: { value: "36 ha", label: "angepasste Mahd" }
  }
];

type CompletedTranslation = Partial<Pick<CompletedProject, "title" | "place" | "summary">> & {
  result?: { label: string };
};

const completedTranslations: Record<Exclude<Locale, "de">, Record<string, CompletedTranslation>> = {
  it: {
    "heckenband-vinschgau": {
      title: "Corridoio di siepi in Val Venosta",
      place: "Laces",
      summary:
        "Lungo strade di campagna e fossi è nata una siepe continua di arbusti autoctoni. La manutenzione è garantita a lungo termine da un contratto di gestione.",
      result: { label: "di nuova siepe campestre" }
    },
    "laichgewaesser-unterland": {
      title: "Zone di riproduzione in Bassa Atesina",
      place: "Salorno",
      summary:
        "Quattordici pozze poco profonde completano una zona umida esistente. Dopo due anni tutte le pozze sono colonizzate da anfibi.",
      result: { label: "nuove pozze di riproduzione" }
    },
    "wiesenbrueter-ahrntal": {
      title: "Prati per uccelli nidificanti in Valle Aurina",
      place: "Campo Tures",
      summary:
        "Alcune aziende agricole hanno posticipato lo sfalcio su superfici selezionate, così che nidi e giovani uccelli superino la stagione.",
      result: { label: "a sfalcio posticipato" }
    }
  },
  en: {
    "heckenband-vinschgau": {
      title: "Vinschgau hedgerow corridor",
      place: "Latsch",
      summary:
        "A continuous hedge of native shrubs was planted along field tracks and ditches. Long-term care is secured through a management agreement.",
      result: { label: "of new field hedge" }
    },
    "laichgewaesser-unterland": {
      title: "Unterland breeding ponds",
      place: "Salurn",
      summary:
        "Fourteen shallow ponds extend an existing wetland. After two years, amphibians have colonised every one of them.",
      result: { label: "new breeding ponds" }
    },
    "wiesenbrueter-ahrntal": {
      title: "Ahrntal meadow-bird sites",
      place: "Sand in Taufers",
      summary:
        "Farms delayed mowing on selected meadows so that clutches and fledglings survive the season.",
      result: { label: "of delayed mowing" }
    }
  }
};

export function getCompletedProjects(locale: Locale): CompletedProject[] {
  if (locale === "de") return completedProjects;
  return completedProjects.map((project) => {
    const translation = completedTranslations[locale][project.slug];
    return {
      ...project,
      ...translation,
      result: { ...project.result, ...translation?.result }
    };
  });
}
