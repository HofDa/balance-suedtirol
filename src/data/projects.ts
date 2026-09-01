import type { Project, ProjectCardData, ProjectListItem } from "@/types/project";
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
  },
  {
    // Quelle: biotope_website.odt (Projektträger b*nature). Offene Punkte aus
    // dem Dokument sind hier als solche markiert statt geschätzt zu werden:
    // Gesamtfläche, Finanzierungsziel und das Monitoringprotokoll fehlen noch.
    slug: "meine-gemeinde-meine-natur",
    title: "Meine Gemeinde, meine Natur",
    summary:
      "Die Biotope vor unserer Haustür entdecken und pflegen: Eine Schaf- und Ziegenherde hält Trockenrasen und Magerweiden im Eisacktal offen.",
    description:
      "Wir bringen die Wichtigkeit dieser Lebensräume allen Alters- und Bevölkerungsgruppen näher und führen Pflegemaßnahmen zum Erhalt der Biodiversität in diesen Biotopen durch. Dabei arbeiten wir mit einem professionellen Hirten zusammen, der mit seiner Schaf- und Ziegenherde auf traditionelle Weise diese Lebensräume pflegt. Die Flächen liegen in Raas, Gufidaun und Klausen.",
    categoryIds: ["cultural-landscapes", "meadows-dry-grasslands"],
    status: "support-needed",
    municipality: "Klausen",
    organization: "b*nature",
    location: { lat: 46.6497, lng: 11.5731 },
    image: "/projects/meine-gemeinde-meine-natur.webp",
    supporters: 0,
    mainSponsor: {
      name: "Amt für Natur – Autonome Provinz Bozen",
      contribution: "Im Projektdokument als Förderpartner genannt."
    },
    whyItMatters:
      "In fast jeder Ortschaft Südtirols finden wir natürliche und naturnahe Lebensräume, die seltene und gefährdete Lebensgemeinschaften vorweisen und daher als Biotop oder Naturdenkmal geschützt sind. Diese Gebiete befinden sich oft in unmittelbarer Nähe der Ortschaften und wurden meist durch geführte Beweidung von Menschen geschaffen und erhalten. Im Laufe der letzten Jahrzehnte wurde jedoch die Beweidung oft aufgegeben und diese wertvollen Lebensräume verbrachen und verbuschen. Ein vielblütiger Trockenrasen voller Insekten kann so in wenigen Jahren von Sträuchern und Bäumen überwachsen werden.",
    impact: [
      { value: "4", label: "Biotopflächen" },
      { value: "30", label: "Schafe in der Herde" },
      { value: "10", label: "Ziegen in der Herde" },
      { value: "Trockenrasen", label: "zentraler Lebensraum" }
    ],
    monitoring: {
      species: "Noch festzulegen",
      surveys: "Noch festzulegen",
      reporting: "Noch festzulegen",
      summary: "Das Beobachtungsprogramm wird mit der Trägerorganisation noch festgelegt. Bis dahin steht hier keine Angabe, die sich später nicht halten ließe."
    }
  },
  {
    // Quelle: igel_website.odt (Projektträger b*nature). Offen im Dokument und
    // deshalb hier nicht ausgefüllt: Flächenangabe und Finanzierungsziel.
    slug: "vorfahrt-fuer-den-igel",
    title: "Vorfahrt für den Igel",
    summary:
      "Ein Projekt zu Schutz und Erforschung unseres wilden Nachbarn: Erhebungen zum Bestand, eine Sensibilisierungskampagne und vernetzte Igel-Straßen zwischen den Gärten.",
    description:
      "Wir untersuchen, ob der Nördliche Weißbrustigel auch in Südtirol vorkommt und wo bei uns die eventuelle Verbreitungsgrenze verläuft. Außerdem starten wir eine Informations- und Sensibilisierungskampagne für den Igel und seinen Lebensraum. Dazu nutzen wir verschiedenste Medien, Kommunikationsmittel und kreative Ideen, um so viele Personen wie möglich zu erreichen: Citizen-Science-Aktivitäten, analoge und digitale Medien, Workshops und vieles mehr. Schließlich setzen wir konkrete Maßnahmen zum Schutz und zur Verbesserung seines Lebensraums um: sogenannte Igel-Straßen, in denen sich der Igel frei zwischen den Gärten und weiteren Lebensräumen bewegen kann. Denn mit dem Igel als Schirmart erreichen wir auch den Erhalt und die Förderung vieler weiterer Pflanzen- und Tierarten.",
    categoryIds: ["settlement-areas", "cultural-landscapes", "forests"],
    status: "support-needed",
    municipality: "Südtirolweit",
    organization: "b*nature",
    location: { lat: 46.68, lng: 11.42 },
    image: "/projects/vorfahrt-fuer-den-igel.webp",
    supporters: 0,
    mainSponsor: {
      name: "Amt für Natur – Autonome Provinz Bozen",
      contribution: "Im Projektdokument als Förderpartner genannt."
    },
    whyItMatters:
      "Der Igel ist ein sehr beliebtes Tier, das jedoch laut subjektiver Wahrnehmung immer seltener in Südtirol zu sichten ist. Es liegen bislang aber keine konkreten Daten zu den heimischen Igel-Beständen vor. Deshalb möchten wir gezielte, standardisierte Erhebungen zum aktuellen Bestand des Igels durchführen und dabei ein spannendes Rätsel lösen: Gibt es bei uns in Südtirol beide europäische Igelarten? Denn neben dem in Europa weit verbreiteten Braunbrustigel (Erinaceus europaeus) ist in Südtirol auch der Nördliche Weißbrustigel (Erinaceus roumanicus) zu erwarten, welcher in den östlichen Nachbarländern und -regionen nachgewiesen wurde.",
    impact: [
      { value: "50+", label: "geplante Igel-Straßen" },
      { value: "1", label: "mögliche neue Säugetierart für Südtirol" },
      { value: "Schirmart", label: "der Igel steht für viele weitere Arten" },
      { value: "Südtirolweit", label: "Erhebungsgebiet" }
    ],
    monitoring: {
      species: "Braunbrustigel und Nördlicher Weißbrustigel; mitprofitierend Kleinsäuger, Insekten und Regenwürmer",
      surveys: "Standardisierte Bestandserhebungen, ergänzt durch Citizen-Science-Meldungen",
      reporting: "Noch festzulegen",
      summary: "Die Erhebungen sollen erstmals belastbare Zahlen zum Igelbestand liefern und zeigen, ob und wo in Südtirol die Verbreitungsgrenze zwischen den beiden Igelarten verläuft. Der Berichtsrhythmus wird mit der Trägerorganisation noch festgelegt."
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
    },
    "meine-gemeinde-meine-natur": {
      title: "Il mio comune, la mia natura",
      summary: "Scoprire e curare i biotopi dietro casa: un gregge di pecore e capre mantiene aperti prati aridi e pascoli magri in Valle Isarco.",
      description: "Vogliamo far conoscere l’importanza di questi habitat a ogni fascia d’età e a tutta la popolazione, realizzando interventi di cura per conservare la biodiversità di questi biotopi. Collaboriamo con un pastore professionista che con il suo gregge di pecore e capre cura questi habitat secondo la tradizione. Le superfici si trovano a Rasa, Gudon e Chiusa.",
      whyItMatters: "In quasi ogni località dell’Alto Adige si trovano habitat naturali e seminaturali che ospitano comunità rare e minacciate e sono perciò tutelati come biotopo o monumento naturale. Queste aree si trovano spesso nelle immediate vicinanze dei paesi e sono state create e mantenute dall’uomo, per lo più attraverso il pascolo guidato. Negli ultimi decenni il pascolo è però stato spesso abbandonato e questi habitat preziosi si stanno imboschendo. Un prato arido ricco di fiori e di insetti può così essere invaso da arbusti e alberi nel giro di pochi anni.",
      municipality: "Chiusa",
      impact: [
        { value: "4", label: "superfici di biotopo" },
        { value: "30", label: "pecore nel gregge" },
        { value: "10", label: "capre nel gregge" },
        { value: "Prati aridi", label: "habitat centrale" }
      ],
      mainSponsor: {
        name: "Ufficio Natura – Provincia autonoma di Bolzano",
        contribution: "Indicato come partner finanziatore nel documento di progetto."
      },
      monitoring: {
        species: "Da definire",
        surveys: "Da definire",
        reporting: "Da definire",
        summary: "Il programma di monitoraggio sarà definito insieme all’organizzazione promotrice. Fino ad allora qui non compare alcun dato che non potrebbe essere mantenuto."
      }
    },
    "vorfahrt-fuer-den-igel": {
      title: "Precedenza al riccio",
      summary: "Un progetto per la tutela e lo studio del nostro vicino selvatico: rilievi sulla popolazione, una campagna di sensibilizzazione e «strade dei ricci» che collegano i giardini.",
      description: "Stiamo verificando se il riccio orientale sia presente anche in Alto Adige e dove passi l’eventuale limite del suo areale. Avviamo inoltre una campagna di informazione e sensibilizzazione sul riccio e sul suo habitat, usando i media e gli strumenti di comunicazione più diversi e molte idee creative per raggiungere il maggior numero di persone: attività di citizen science, media analogici e digitali, laboratori e molto altro. Infine realizziamo misure concrete per proteggere e migliorare il suo habitat: le cosiddette «strade dei ricci», che permettono all’animale di muoversi liberamente tra i giardini e gli altri habitat. Con il riccio come specie ombrello tuteliamo e favoriamo anche molte altre specie vegetali e animali.",
      whyItMatters: "Il riccio è un animale molto amato che, secondo la percezione comune, si avvista sempre più raramente in Alto Adige. Finora però non esistono dati concreti sulle popolazioni locali. Per questo vogliamo condurre rilievi mirati e standardizzati sulla consistenza attuale del riccio e risolvere al tempo stesso un enigma affascinante: in Alto Adige sono presenti entrambe le specie europee di riccio? Accanto al riccio europeo occidentale (Erinaceus europaeus), diffuso in tutta Europa, in Alto Adige è infatti atteso anche il riccio orientale (Erinaceus roumanicus), documentato nei paesi e nelle regioni confinanti a est.",
      municipality: "In tutto l’Alto Adige",
      impact: [
        { value: "50+", label: "«strade dei ricci» previste" },
        { value: "1", label: "possibile nuova specie di mammifero per l’Alto Adige" },
        { value: "Specie ombrello", label: "il riccio rappresenta molte altre specie" },
        { value: "Tutto l’Alto Adige", label: "area di rilevamento" }
      ],
      mainSponsor: {
        name: "Ufficio Natura – Provincia autonoma di Bolzano",
        contribution: "Indicato come partner finanziatore nel documento di progetto."
      },
      monitoring: {
        species: "Riccio europeo occidentale e riccio orientale; ne beneficiano anche micromammiferi, insetti e lombrichi",
        surveys: "Rilievi standardizzati della popolazione, integrati da segnalazioni di citizen science",
        reporting: "Da definire",
        summary: "I rilievi forniranno per la prima volta dati attendibili sulla popolazione di ricci e mostreranno se e dove in Alto Adige passi il limite di areale tra le due specie. La cadenza dei rapporti sarà definita insieme all’organizzazione promotrice."
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
    },
    "meine-gemeinde-meine-natur": {
      title: "My municipality, my nature",
      summary: "Discovering and caring for the biotopes on our doorstep: a flock of sheep and goats keeps dry grasslands and poor pastures in the Eisack Valley open.",
      description: "We want to bring the importance of these habitats home to every age group and part of the population, and carry out management work that preserves the biodiversity of these biotopes. We work with a professional shepherd who tends these habitats in the traditional way with his flock of sheep and goats. The sites lie in Raas, Gufidaun and Klausen.",
      whyItMatters: "In almost every village in South Tyrol there are natural and semi-natural habitats that harbour rare and endangered communities and are therefore protected as biotopes or natural monuments. These areas often lie right next to the settlements and were mostly created and maintained by people through managed grazing. Over recent decades grazing has frequently been abandoned, and these valuable habitats are turning to scrub. A flower-rich dry grassland full of insects can be overgrown by shrubs and trees within a few years.",
      municipality: "Klausen",
      impact: [
        { value: "4", label: "biotope sites" },
        { value: "30", label: "sheep in the flock" },
        { value: "10", label: "goats in the flock" },
        { value: "Dry grassland", label: "core habitat" }
      ],
      mainSponsor: {
        name: "Nature Office – Autonomous Province of Bolzano",
        contribution: "Named as funding partner in the project document."
      },
      monitoring: {
        species: "To be defined",
        surveys: "To be defined",
        reporting: "To be defined",
        summary: "The monitoring programme will be defined together with the lead organisation. Until then, no figure appears here that could not be upheld later."
      }
    },
    "vorfahrt-fuer-den-igel": {
      title: "Right of way for the hedgehog",
      summary: "A project to protect and study our wild neighbour: population surveys, an awareness campaign, and connected hedgehog highways between gardens.",
      description: "We are investigating whether the northern white-breasted hedgehog also occurs in South Tyrol, and where the boundary of its range might run. We are also launching an information and awareness campaign for the hedgehog and its habitat, using a wide range of media, communication tools and creative ideas to reach as many people as possible: citizen science activities, analogue and digital media, workshops and much more. Finally, we are putting concrete measures in place to protect and improve its habitat — so-called hedgehog highways, along which the animal can move freely between gardens and other habitats. With the hedgehog as an umbrella species, we also conserve and support many other plant and animal species.",
      whyItMatters: "The hedgehog is a much-loved animal that, by general impression, is seen less and less often in South Tyrol. So far, however, there are no concrete data on local hedgehog populations. We therefore want to carry out targeted, standardised surveys of the current population and solve an intriguing puzzle at the same time: do both European hedgehog species occur here in South Tyrol? Alongside the widespread European hedgehog (Erinaceus europaeus), the northern white-breasted hedgehog (Erinaceus roumanicus) is also expected in South Tyrol, having been recorded in the neighbouring countries and regions to the east.",
      municipality: "South Tyrol-wide",
      impact: [
        { value: "50+", label: "planned hedgehog highways" },
        { value: "1", label: "possible new mammal species for South Tyrol" },
        { value: "Umbrella species", label: "the hedgehog stands for many others" },
        { value: "South Tyrol-wide", label: "survey area" }
      ],
      mainSponsor: {
        name: "Nature Office – Autonomous Province of Bolzano",
        contribution: "Named as funding partner in the project document."
      },
      monitoring: {
        species: "European and northern white-breasted hedgehog; small mammals, insects and earthworms benefit alongside them",
        surveys: "Standardised population surveys, complemented by citizen science records",
        reporting: "To be defined",
        summary: "The surveys will provide the first reliable figures on the hedgehog population and show whether and where the range boundary between the two species runs in South Tyrol. The reporting cycle will be defined together with the lead organisation."
      }
    }
  }
};

export function getProjects(locale: Locale): Project[] {
  if (locale === "de") return projects;
  return projects.map((project) => ({ ...project, ...projectTranslations[locale][project.slug] }));
}

export function toProjectCardData(project: Project): ProjectCardData {
  return {
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    categoryIds: project.categoryIds,
    status: project.status,
    municipality: project.municipality,
    organization: project.organization,
    image: project.image,
    mainSponsor: project.mainSponsor,
    additionalSponsorCount: project.otherSponsors?.length ?? 0
  };
}

/** Nur Felder, die Filter und Karten im Client tatsächlich benötigen. */
export function getProjectListItems(locale: Locale): ProjectListItem[] {
  return getProjects(locale).map((project) => ({
    ...toProjectCardData(project),
    goal: project.goal,
    funded: project.funded
  }));
}
