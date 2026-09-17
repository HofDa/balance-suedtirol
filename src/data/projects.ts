import type { Project, ProjectCardData, ProjectListItem } from "../types/project";
import type { Locale } from "../config/site";

export const projects: Project[] = [
  {
    slug: "millander-au-erweiterung",
    title: "Millander Au – Erweiterung",
    summary:
      "Die Millander Au bei Brixen soll um eine ehemalige Apfelanlage wachsen: Teich, Feuchtwiese und Hecken für rund 130 Vogelarten im Jahr.",
    description:
      "Nördlich an das bestehende Biotop von rund 4,5 Hektar schließt eine ehemals intensiv bewirtschaftete Apfelanlage an. Sie soll zu einem großen Schilfteich, einer bei Hochwasser überfluteten Feuchtwiese, Heckenstreifen, Erleninseln und einem mäandrierenden Wasserlauf werden. Steilwände aus Lehm und Sand bieten Bienenfresser, Uferschwalbe und Eisvogel Brutröhren; ein Aussichtsturm am Eisackdamm, eine Beobachtungswand und eine Beobachtungshütte machen das Biotop behutsam erlebbar. Weitere Grundeigentümer haben ihre Flächen für die Erweiterung in Aussicht gestellt. Der Ankauf ist auf Spenden angewiesen.",
    categoryIds: ["wetlands", "waters", "cultural-landscapes"],
    status: "support-needed",
    municipality: "Brixen",
    organization: "Stiftung Landschaft Südtirol",
      organizationAddress: "Waltherhaus, Schlernstraße 1, 39100 Bozen, Südtirol",
    location: { lat: 46.70061111, lng: 11.65197222 },
    image: "/projects/millander-au-parzelle-mai-2026.webp",
    beforeAfter: {
      before: "/projects/millander-au-heute.webp",
      after: "/projects/millander-au-vision-v8.webp",
      beforeLabel: "Heute",
      afterLabel: "Vision",
      caption:
        "Die Millander Au heute aus der Luft und als Visualisierung nach der geplanten Erweiterung: Teiche, Feuchtwiesen und Hecken auf der ehemaligen Apfelanlage."
    },
    gallery: [
      { src: "/projects/millander-au-erweiterung-before.webp", alt: "Teich während der Erweiterungsarbeiten mit Bagger", caption: "Erweiterung des bestehenden Teichs mit der Forststation Brixen im Jänner 2025." },
      { src: "/projects/millander-au-erweiterung-after.webp", alt: "Erweiterter Teich mit begrünten Ufern", caption: "Dieselbe Fläche im Mai 2025, wenige Monate nach den Arbeiten." },
      { src: "/projects/millander-au-parzelle-mai-2026.webp", alt: "Mäandrierender Wasserlauf auf der renaturierten Parzelle", caption: "Die im März 2026 renaturierte Parzelle mit neuem Wasserlauf, zwei Monate später." },
      { src: "/projects/millander-au-hochwasser-2024.webp", alt: "Millander Au bei Hochwasser im Oktober 2024", caption: "Hochwasser im Oktober 2024: Die Au nimmt Wasser auf, das sonst flussabwärts drückt." },
      { src: "/projects/millander-au-hecke.webp", alt: "Blühende Hecke am Unterrichterweg", caption: "Hecke am Unterrichterweg, Brutplatz und Herbstnahrung für Singvögel." },
      { src: "/projects/millander-au-zwergdommel.webp", alt: "Zwergdommel im Schilf", caption: "Zwergdommel im Schilf. 2025 brütete sie erstmals seit rund 30 Jahren wieder in der Au.", credit: "Sepp Gamper" },
      { src: "/projects/millander-au-bekassine.webp", alt: "Bekassine am Ufer", caption: "Bekassine auf Nahrungssuche am Ufer, einer der Zugvögel, die hier rasten.", credit: "Sepp Gamper" }
    ],
    supporters: 0,
    whyItMatters:
      "Die Millander Au ist der Rest einer Auenlandschaft, die einst die gesamte Flusslandschaft von Brixen bis Albeins einnahm. 1988 wurde sie in letzter Sekunde vor der Nutzung als Bauschuttdeponie bewahrt und unter Schutz gestellt. Bei Schlechtwetterfronten über dem Alpenhauptkamm ist sie für Zugvögel eine überlebenswichtige Raststätte: Rund 130 Vogelarten werden hier jährlich nachgewiesen, 30 bis 35 davon brüten im Biotop. Die 2026 renaturierte Nachbarparzelle zeigt, wie schnell neue Lebensräume angenommen werden.",
    impact: [
      { value: "4,5 ha", label: "bestehendes Biotop" },
      { value: "ca. 3 ha", label: "geplante Erweiterung" },
      { value: "ca. 130", label: "Vogelarten pro Jahr" },
      { value: "30–35", label: "Brutvogelarten" }
    ],
    monitoring: {
      species: "Zug- und Brutvögel; mitprofitierend Amphibien, Libellen und weitere Insekten",
      surveys: "Laufende Vogelbeobachtung durch AuRaum, hyla und AVK Südtirol",
      reporting: "Noch festzulegen",
      summary: "Die jährliche Artenliste des Biotops und die Nachweise auf der 2026 renaturierten Parzelle zeigen, ob die neuen Teiche, Feuchtwiesen und Hecken die Zielarten erreichen. Der Berichtsrhythmus wird mit der Arbeitsgruppe noch festgelegt."
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
    "millander-au-erweiterung": {
      title: "Millander Au – Ampliamento",
      summary: "La Millander Au presso Bressanone deve crescere di un ex meleto: stagno, prato umido e siepi per circa 130 specie di uccelli all’anno.",
      description: "A nord del biotopo esistente di circa 4,5 ettari si trova un ex meleto a coltivazione intensiva. Diventerà un grande stagno con canneto, un prato umido inondato in caso di piena, fasce di siepi, isole di ontani e un corso d’acqua a meandri. Pareti ripide di argilla e sabbia offriranno cavità di nidificazione a gruccione, topino e martin pescatore; una torre panoramica sull’argine dell’Isarco, una parete di osservazione e un capanno renderanno il biotopo fruibile con discrezione. Altri proprietari hanno messo in prospettiva i loro terreni per l’ampliamento. L’acquisto dipende dalle donazioni.",
      whyItMatters: "La Millander Au è ciò che resta di un paesaggio golenale che un tempo occupava l’intera piana fluviale da Bressanone ad Albes. Nel 1988 è stata salvata all’ultimo momento dall’uso come discarica di macerie e posta sotto tutela. Con fronti di maltempo sulla cresta alpina principale è una sosta vitale per gli uccelli migratori: qui vengono rilevate circa 130 specie all’anno, di cui 30–35 nidificanti. La particella vicina rinaturalizzata nel 2026 mostra quanto rapidamente i nuovi habitat vengano colonizzati.",
      municipality: "Bressanone",
      organization: "Stiftung Landschaft Südtirol",
      organizationAddress: "Casa Walther, Via Sciliar 1, 39100 Bolzano, Alto Adige",
      beforeAfter: {
        before: "/projects/millander-au-heute.webp",
        after: "/projects/millander-au-vision-v8.webp",
        beforeLabel: "Oggi",
        afterLabel: "Visione",
        caption: "La Millander Au oggi dall’alto e come visualizzazione dopo l’ampliamento previsto: stagni, prati umidi e siepi sull’ex frutteto."
      },
      gallery: [
        { src: "/projects/millander-au-erweiterung-before.webp", alt: "Stagno durante i lavori di ampliamento con escavatore", caption: "Ampliamento dello stagno esistente con la Stazione forestale di Bressanone nel gennaio 2025." },
        { src: "/projects/millander-au-erweiterung-after.webp", alt: "Stagno ampliato con vegetazione sulle sponde", caption: "La stessa area nel maggio 2025, pochi mesi dopo i lavori." },
        { src: "/projects/millander-au-parzelle-mai-2026.webp", alt: "Corso d’acqua a meandri sulla particella rinaturalizzata", caption: "La particella rinaturalizzata nel marzo 2026 con il nuovo corso d’acqua, due mesi dopo." },
        { src: "/projects/millander-au-hochwasser-2024.webp", alt: "Millander Au durante la piena dell’ottobre 2024", caption: "Piena nell’ottobre 2024: la golena assorbe acqua che altrimenti preme a valle." },
        { src: "/projects/millander-au-hecke.webp", alt: "Siepe in fiore lungo l’Unterrichterweg", caption: "Siepe lungo l’Unterrichterweg, sito di nidificazione e cibo autunnale per i passeriformi." },
        { src: "/projects/millander-au-zwergdommel.webp", alt: "Tarabusino nel canneto", caption: "Tarabusino nel canneto. Nel 2025 ha nidificato di nuovo nella golena per la prima volta da circa 30 anni.", credit: "Sepp Gamper" },
        { src: "/projects/millander-au-bekassine.webp", alt: "Beccaccino sulla riva", caption: "Beccaccino in cerca di cibo sulla riva, uno dei migratori che sostano qui.", credit: "Sepp Gamper" }
      ],
      impact: [
        { value: "4,5 ha", label: "biotopo esistente" },
        { value: "ca. 3 ha", label: "ampliamento previsto" },
        { value: "ca. 130", label: "specie di uccelli all’anno" },
        { value: "30–35", label: "specie nidificanti" }
      ],
      monitoring: {
        species: "Uccelli migratori e nidificanti; ne beneficiano anche anfibi, libellule e altri insetti",
        surveys: "Osservazione ornitologica continua di AuRaum, hyla e AVK Südtirol",
        reporting: "Da definire",
        summary: "La lista annuale delle specie del biotopo e i rilievi sulla particella rinaturalizzata nel 2026 mostrano se i nuovi stagni, prati umidi e siepi raggiungono le specie target. La cadenza dei rapporti sarà concordata con il gruppo di lavoro."
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
    "millander-au-erweiterung": {
      title: "Millander Au – Expansion",
      summary: "The Millander Au near Brixen is to grow by a former apple orchard: pond, wet meadow and hedgerows for around 130 bird species a year.",
      description: "North of the existing 4.5-hectare reserve lies a former intensively farmed apple orchard. It is to become a large reed-fringed pond, a wet meadow that floods at high water, strips of hedgerow, alder islands and a meandering watercourse. Steep banks of clay and sand will give bee-eaters, sand martins and kingfishers nesting burrows; an observation tower on the Eisack embankment, a viewing screen and a hide will open the reserve to visitors without disturbing it. Further landowners have offered their plots for the expansion. Buying them depends on donations.",
      whyItMatters: "The Millander Au is what remains of a floodplain that once covered the entire river landscape from Brixen to Albeins. In 1988 it was saved at the last moment from becoming a rubble dump and placed under protection. When bad weather sits over the main Alpine ridge it is a vital stopover for migrating birds: around 130 species are recorded here each year, 30 to 35 of which breed in the reserve. The neighbouring plot restored in 2026 shows how quickly new habitats are taken up.",
      municipality: "Brixen",
      organization: "Stiftung Landschaft Südtirol",
      organizationAddress: "Waltherhaus, Schlernstraße 1, 39100 Bolzano / Bozen, South Tyrol",
      beforeAfter: {
        before: "/projects/millander-au-heute.webp",
        after: "/projects/millander-au-vision-v8.webp",
        beforeLabel: "Today",
        afterLabel: "Vision",
        caption: "The Millander Au today from the air and as a visualisation after the planned expansion: ponds, wet meadows and hedges on the former apple orchard."
      },
      gallery: [
        { src: "/projects/millander-au-erweiterung-before.webp", alt: "Pond during expansion works with an excavator", caption: "Expansion of the existing pond with the Brixen forestry station in January 2025." },
        { src: "/projects/millander-au-erweiterung-after.webp", alt: "Expanded pond with vegetated banks", caption: "The same area in May 2025, a few months after the works." },
        { src: "/projects/millander-au-parzelle-mai-2026.webp", alt: "Meandering watercourse on the restored plot", caption: "The plot restored in March 2026 with its new watercourse, two months later." },
        { src: "/projects/millander-au-hochwasser-2024.webp", alt: "Millander Au during the October 2024 flood", caption: "High water in October 2024: the floodplain takes up water that would otherwise push downstream." },
        { src: "/projects/millander-au-hecke.webp", alt: "Flowering hedgerow along the Unterrichterweg", caption: "Hedgerow along the Unterrichterweg, nesting site and autumn food for songbirds." },
        { src: "/projects/millander-au-zwergdommel.webp", alt: "Little bittern in the reeds", caption: "Little bittern in the reeds. In 2025 it bred in the reserve again for the first time in around 30 years.", credit: "Sepp Gamper" },
        { src: "/projects/millander-au-bekassine.webp", alt: "Common snipe on the bank", caption: "Common snipe feeding on the bank, one of the migrants that rest here.", credit: "Sepp Gamper" }
      ],
      impact: [
        { value: "4.5 ha", label: "existing reserve" },
        { value: "approx. 3 ha", label: "planned expansion" },
        { value: "approx. 130", label: "bird species per year" },
        { value: "30–35", label: "breeding species" }
      ],
      monitoring: {
        species: "Migrating and breeding birds; amphibians, dragonflies and other insects also benefit",
        surveys: "Ongoing bird monitoring by AuRaum, hyla and AVK Südtirol",
        reporting: "To be defined",
        summary: "The reserve’s annual species list and the records from the plot restored in 2026 show whether the new ponds, wet meadows and hedgerows reach the target species. The reporting cycle is still to be agreed with the working group."
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
