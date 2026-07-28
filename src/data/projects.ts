import type { Project } from "@/types/project";
import type { Locale } from "@/config/site";

export const projects: Project[] = [
  {
    slug: "bluehende-vernetzung-bozen",
    title: "Blühende Vernetzung Bozen",
    summary:
      "Trittsteinbiotope verbinden urbane Grünräume und schaffen Nahrung für Wildbienen und Schmetterlinge.",
    description:
      "Gemeinsam mit Schulen, Wohnanlagen und Betrieben entstehen artenreiche Kleinflächen, die wie ökologische Trittsteine durch das Stadtgebiet wirken. Das Projekt kombiniert Pflanzung, Pflege, Bildungsarbeit und ein mehrjähriges Monitoring.",
    categoryIds: ["settlement-areas", "meadows-dry-grasslands"],
    status: "support-needed",
    municipality: "Bozen",
    organization: "Netzwerk StadtNatur",
    location: { lat: 46.4983, lng: 11.3548 },
    image: "/projects/bluehende-vernetzung-bozen.webp",
    goal: 42000,
    funded: 28600,
    supporters: 184,
    mainSponsor: {
      name: "Hauptförderer Platzhalter",
      logo: "/sponsors/main-sponsor-placeholder.svg",
      contribution: "Platzhalter zur Demonstration der späteren Sponsorendarstellung.",
      isPlaceholder: true
    },
    whyItMatters:
      "Viele Grünflächen im Stadtgebiet sind klein und voneinander getrennt. Für Wildbienen, Schmetterlinge und andere Bestäuber fehlen dadurch durchgehende Nahrungsangebote und sichere Rückzugsorte. Ein Netz aus artenreichen Flächen hilft ihnen, sich wieder durch die Stadt zu bewegen und stabile Populationen aufzubauen.",
    impact: [
      { value: "18", label: "Trittsteinflächen" },
      { value: "3.200 m²", label: "neuer Lebensraum" },
      { value: "5 Jahre", label: "Pflege & Monitoring" },
      { value: "Wildbienen", label: "zentrale Zielgruppe" }
    ],
    monitoring: {
      species: "Wildbienen und Tagfalter",
      surveys: "2 Vegetationserhebungen pro Jahr",
      reporting: "Jährliche Auswertung",
      summary: "Blütenangebot, Pflanzenvielfalt und die Nutzung der Flächen durch Bestäuber werden über fünf Jahre an festen Beobachtungspunkten dokumentiert."
    }
  },
  {
    slug: "lebendige-streuobstwiese-eisacktal",
    title: "Lebendige Streuobstwiese",
    summary:
      "Eine alte Obstwiese wird restauriert und langfristig als artenreicher Kulturlebensraum gesichert.",
    description:
      "Alte Obstsorten, extensive Pflege, Totholzstrukturen und neue Kleingewässer schaffen Lebensraum für Vögel, Käfer, Fledermäuse und Bestäuber. Schulklassen begleiten die Entwicklung der Fläche.",
    categoryIds: ["cultural-landscapes", "meadows-dry-grasslands"],
    status: "in-progress",
    municipality: "Klausen",
    organization: "Kulturlandschaft Eisacktal",
    location: { lat: 46.641, lng: 11.565 },
    image: "/projects/lebendige-streuobstwiese.webp",
    goal: 68000,
    funded: 35500,
    supporters: 241,
    mainSponsor: {
      name: "Hauptförderer Platzhalter",
      logo: "/sponsors/main-sponsor-placeholder.svg",
      contribution: "Platzhalter zur Demonstration der späteren Sponsorendarstellung.",
      isPlaceholder: true
    },
    whyItMatters:
      "Traditionelle Streuobstwiesen gehören zu den artenreichsten Kulturlandschaften Südtirols, verschwinden aber zunehmend durch Nutzungsaufgabe oder intensive Bewirtschaftung. Mit alten Bäumen gehen Nistplätze, Totholzstrukturen und ein über Generationen gewachsener Genpool verloren.",
    impact: [
      { value: "42", label: "Hochstamm-Obstbäume" },
      { value: "1,7 ha", label: "extensive Fläche" },
      { value: "8", label: "alte Sorten" },
      { value: "Vögel & Käfer", label: "Zielartengruppen" }
    ],
    monitoring: {
      species: "Brutvögel, Käfer und Bestäuber",
      surveys: "Jährliche Baum- und Vegetationskartierung",
      reporting: "Bericht nach jeder Pflegesaison",
      summary: "Baumgesundheit, Höhlenstrukturen, Blütenangebot und ausgewählte Artengruppen zeigen, wie sich die extensiv gepflegte Obstwiese entwickelt."
    }
  },
  {
    slug: "moorfenster-pustertal",
    title: "Moorfenster Pustertal",
    summary:
      "Entwässerte Teilflächen werden hydrologisch verbessert und als Feuchtlebensraum wieder sichtbar gemacht.",
    description:
      "Das Projekt untersucht Wasserstände, verschließt ausgewählte Entwässerungsgräben und begleitet die Regeneration mit Vegetations- und Amphibienmonitoring. Ein Steg macht den Lebensraum behutsam erlebbar.",
    categoryIds: ["wetlands", "waters"],
    status: "monitoring",
    municipality: "Olang",
    organization: "Lebensräume Pustertal",
    location: { lat: 46.759, lng: 12.031 },
    image: "/projects/moorfenster-pustertal.webp",
    goal: 92000,
    funded: 61700,
    supporters: 329,
    mainSponsor: {
      name: "Hauptförderer Platzhalter",
      logo: "/sponsors/main-sponsor-placeholder.svg",
      contribution: "Platzhalter zur Demonstration der späteren Sponsorendarstellung.",
      isPlaceholder: true
    },
    whyItMatters:
      "Entwässerungsgräben senken den Wasserstand und verändern die typische Moorvegetation. Dadurch verliert der Lebensraum seine Funktion für spezialisierte Pflanzen und Amphibien – und kann langfristig weniger Wasser und Kohlenstoff speichern.",
    impact: [
      { value: "2,4 ha", label: "Renaturierungsfläche" },
      { value: "12", label: "Messpunkte" },
      { value: "10 Jahre", label: "Wirkungsbeobachtung" },
      { value: "Amphibien", label: "Zielartengruppe" }
    ],
    monitoring: {
      species: "Amphibien und Moorvegetation",
      surveys: "12 feste Wasserstands-Messpunkte",
      reporting: "Jährlicher hydrologischer Bericht",
      summary: "Wasserstände, Vegetationsentwicklung und Amphibienvorkommen werden gemeinsam ausgewertet, um die Wirkung der Wiedervernässung langfristig nachvollziehbar zu machen."
    }
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

const projectTranslations: Record<Exclude<Locale, "de">, Record<string, Partial<Project>>> = {
  it: {
    "bluehende-vernetzung-bozen": {
      title: "Rete fiorita di Bolzano",
      summary: "Biotopi diffusi collegano gli spazi verdi urbani e offrono nutrimento ad api selvatiche e farfalle.",
      description: "Insieme a scuole, condomini e imprese nascono piccole aree ricche di specie che funzionano come punti di collegamento ecologico nel tessuto urbano. Il progetto unisce piantumazione, cura, educazione e monitoraggio pluriennale.",
      whyItMatters: "Molti spazi verdi urbani sono piccoli e isolati. Api selvatiche, farfalle e altri impollinatori non trovano quindi risorse alimentari continue e rifugi sicuri. Una rete di aree ricche di specie consente loro di muoversi nuovamente attraverso la città.",
      municipality: "Bolzano",
      organization: "Rete Natura Urbana",
      impact: [
        { value: "18", label: "aree di connessione" },
        { value: "3.200 m²", label: "nuovo habitat" },
        { value: "5 anni", label: "cura e monitoraggio" },
        { value: "Api selvatiche", label: "gruppo target principale" }
      ],
      monitoring: {
        species: "Api selvatiche e farfalle",
        surveys: "2 rilievi della vegetazione all’anno",
        reporting: "Valutazione annuale",
        summary: "L’offerta di fiori, la diversità vegetale e l’uso delle aree da parte degli impollinatori vengono documentati per cinque anni in punti di osservazione fissi."
      }
    },
    "lebendige-streuobstwiese-eisacktal": {
      title: "Frutteto tradizionale vivo",
      summary: "Un antico frutteto viene restaurato e tutelato a lungo termine come habitat agricolo ricco di specie.",
      description: "Varietà antiche, gestione estensiva, legno morto e nuovi piccoli specchi d’acqua creano habitat per uccelli, coleotteri, pipistrelli e impollinatori. Le classi scolastiche accompagnano lo sviluppo dell’area.",
      whyItMatters: "I frutteti tradizionali sono tra i paesaggi culturali più ricchi di specie dell’Alto Adige, ma stanno scomparendo a causa dell’abbandono o della gestione intensiva. Con i vecchi alberi si perdono cavità, legno morto e varietà sviluppate nel corso di generazioni.",
      municipality: "Chiusa",
      impact: [
        { value: "42", label: "alberi ad alto fusto" },
        { value: "1,7 ha", label: "area estensiva" },
        { value: "8", label: "varietà antiche" },
        { value: "Uccelli e coleotteri", label: "gruppi target" }
      ],
      monitoring: {
        species: "Uccelli nidificanti, coleotteri e impollinatori",
        surveys: "Mappatura annuale di alberi e vegetazione",
        reporting: "Rapporto dopo ogni stagione di cura",
        summary: "Salute degli alberi, cavità, offerta di fiori e gruppi faunistici selezionati mostrano come si sviluppa il frutteto gestito in modo estensivo."
      }
    },
    "moorfenster-pustertal": {
      title: "Finestra sulle torbiere della Val Pusteria",
      summary: "Aree drenate vengono recuperate dal punto di vista idrologico e rese nuovamente visibili come habitat umido.",
      description: "Il progetto studia i livelli dell’acqua, chiude alcuni fossi di drenaggio e accompagna la rigenerazione con il monitoraggio della vegetazione e degli anfibi. Una passerella rende l’habitat accessibile con delicatezza.",
      whyItMatters: "I fossi di drenaggio abbassano il livello dell’acqua e modificano la vegetazione tipica della torbiera. L’habitat perde così la sua funzione per piante specializzate e anfibi e, nel lungo periodo, immagazzina meno acqua e carbonio.",
      municipality: "Valdaora",
      impact: [
        { value: "2,4 ha", label: "area rinaturalizzata" },
        { value: "12", label: "punti di misura" },
        { value: "10 anni", label: "monitoraggio dell’impatto" },
        { value: "Anfibi", label: "gruppo target" }
      ],
      monitoring: {
        species: "Anfibi e vegetazione di torbiera",
        surveys: "12 punti fissi per il livello dell’acqua",
        reporting: "Rapporto idrologico annuale",
        summary: "Livelli dell’acqua, sviluppo della vegetazione e presenza di anfibi vengono valutati insieme per rendere verificabile nel tempo l’effetto della rinaturalizzazione."
      }
    }
  },
  en: {
    "bluehende-vernetzung-bozen": {
      title: "Bolzano Blooming Network",
      summary: "Stepping-stone habitats connect urban green spaces and provide food for wild bees and butterflies.",
      description: "Together with schools, housing developments and businesses, species-rich small sites are being created as ecological stepping stones across the city. The project combines planting, maintenance, education and multi-year monitoring.",
      whyItMatters: "Many urban green spaces are small and isolated. Wild bees, butterflies and other pollinators therefore lack continuous food sources and safe refuges. A network of species-rich sites helps them move through the city and establish stable populations.",
      municipality: "Bolzano",
      organization: "Urban Nature Network",
      impact: [
        { value: "18", label: "stepping-stone sites" },
        { value: "3,200 m²", label: "new habitat" },
        { value: "5 years", label: "care and monitoring" },
        { value: "Wild bees", label: "primary target group" }
      ],
      monitoring: {
        species: "Wild bees and butterflies",
        surveys: "2 vegetation surveys per year",
        reporting: "Annual evaluation",
        summary: "Flower availability, plant diversity and use by pollinators are documented for five years at fixed observation points."
      }
    },
    "lebendige-streuobstwiese-eisacktal": {
      title: "Living Heritage Orchard",
      summary: "An old orchard is being restored and protected as a species-rich cultural habitat.",
      description: "Heritage varieties, extensive management, deadwood structures and new small ponds create habitat for birds, beetles, bats and pollinators. School classes help document how the site develops.",
      whyItMatters: "Traditional orchards are among South Tyrol’s most species-rich cultural landscapes, but are disappearing through abandonment or intensive management. As old trees vanish, nesting cavities, deadwood and locally adapted varieties are lost with them.",
      municipality: "Klausen",
      impact: [
        { value: "42", label: "standard fruit trees" },
        { value: "1.7 ha", label: "extensive habitat" },
        { value: "8", label: "heritage varieties" },
        { value: "Birds & beetles", label: "target groups" }
      ],
      monitoring: {
        species: "Breeding birds, beetles and pollinators",
        surveys: "Annual tree and vegetation survey",
        reporting: "Report after each management season",
        summary: "Tree health, cavities, flower availability and selected species groups show how the extensively managed orchard develops."
      }
    },
    "moorfenster-pustertal": {
      title: "Puster Valley Peatland Window",
      summary: "Drained areas are being restored hydrologically and made visible again as wetland habitat.",
      description: "The project surveys water levels, closes selected drainage ditches and follows regeneration through vegetation and amphibian monitoring. A boardwalk makes the habitat accessible with minimal disturbance.",
      whyItMatters: "Drainage ditches lower the water table and alter characteristic peatland vegetation. The habitat loses its function for specialised plants and amphibians and, over time, stores less water and carbon.",
      municipality: "Olang",
      impact: [
        { value: "2.4 ha", label: "restoration area" },
        { value: "12", label: "monitoring points" },
        { value: "10 years", label: "impact monitoring" },
        { value: "Amphibians", label: "target group" }
      ],
      monitoring: {
        species: "Amphibians and peatland vegetation",
        surveys: "12 fixed water-level points",
        reporting: "Annual hydrological report",
        summary: "Water levels, vegetation development and amphibian records are assessed together to make the long-term effect of rewetting transparent."
      }
    }
  }
};

export function getProjects(locale: Locale): Project[] {
  if (locale === "de") return projects;
  return projects.map((project) => ({ ...project, ...projectTranslations[locale][project.slug] }));
}
