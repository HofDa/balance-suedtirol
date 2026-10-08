import type { Locale } from "./site";
import type { Localized } from "../lib/i18n";

/**
 * Texte der Startseiten-Erzählung: Vielfalt → Leistungen → Verlust → Projekte →
 * Wirtschaft → Modell → Abschluss.
 *
 * Eigene Datei mit festem Typ statt weiterer Schlüssel in `translations.ts`:
 * Dort prüft niemand, ob IT und EN dieselbe Form haben wie DE. Hier bricht der
 * Typcheck, sobald einer Sprache ein Abschnitt fehlt.
 *
 * Jede Zahl steht mit Quelle. Fremde Institutionen erscheinen nur in der
 * Quellenangabe, nie als Absender der Plattform.
 */

export type ServiceId = "pollination" | "water" | "cooling" | "soil" | "carbon" | "erosion";

export type HomeStoryCopy = {
  /** Punkte unter den Legenden-Karten auf dem Telefon, `{n}` wird ersetzt. */
  legendPager: string;
  richness: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Klima, Kulturlandschaft, Geologie, Höhenstufen – in der Reihenfolge der Legende (von links nach rechts). */
    factors: [string, string][];
    /** Beschriftung des Höhenschnitts. */
    profile: {
      levels: { "1000": string; "2000": string; "3000": string };
      peak: string;
      note: string;
    };
  };
  figures: {
    title: string;
    copy: string;
    /** Zahl, dazu optional ein kleiner Zusatz davor oder danach („ca.“, „von 36“). */
    items: { value: string; prefix?: string; suffix?: string; label: string }[];
    source: string;
  };
  monitoring: { title: string; subtitle: string; href: string };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    items: { id: ServiceId; title: string; copy: string }[];
    /** Fazit unter dem Summenstrich. */
    conclusion: string;
  };
  loss: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Sieben Ursachen; die Szene nummeriert in dieser Reihenfolge. */
    pressures: [string, string][];
    /** Beschriftung der Szene „früher | heute“. */
    scene: { before: string; after: string; slider: string; note: string };
    facts: [string, string][];
    factsSource: string;
    closing: string;
    projectsBridge: string;
  };
  /** Steht als Begründung im Abschnitt „Was ist b*alance?“. */
  economy: {
    eyebrow: string;
    title: string;
    /** Zwei belegte Zahlen zur Abhängigkeit der Wirtschaft von Ökosystemleistungen. */
    figures: [string, string][];
    /** Kurzbeleg unter den Zahlen. */
    source: string;
    /** Aufklappbare Erläuterung: was die Zahlen bedeuten und woher sie stammen. */
    detailsLabel: string;
    details: { title: string; copy: string }[];
    sourcesLabel: string;
    sources: { citation: string; href: string }[];
  };
  model: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: [string, string][];
    more: string;
  };
  closing: {
    title: string;
    copy: string;
    cta: string;
    submit: string;
  };
};

const serviceIds: ServiceId[] = ["pollination", "water", "cooling", "soil", "carbon", "erosion"];

function services(items: [string, string][]) {
  return items.map(([title, copy], index) => ({ id: serviceIds[index], title, copy }));
}

const homeStory: Localized<HomeStoryCopy> = {
  de: {
    legendPager: "Eintrag {n}",
    richness: {
      eyebrow: "Biodiversität in Südtirol",
      title: "Warum Südtirol so artenreich ist",
      lead: "Kaum eine Region Europas vereint auf so engem Raum so viele Lebensräume. Vier Gründe verstärken sich gegenseitig.",
      factors: [
        ["Klima", "Submediterran im Süden, trocken im Vinschgau, feucht am Alpenhauptkamm."],
        ["Kulturlandschaft", "Mähwiesen, Weiden, Hecken, Trockenmauern und Kastanienhaine gibt es nur, weil sie bewirtschaftet werden."],
        ["Geologie", "Kalk und Dolomit neben Granit, Porphyr und Schiefer – saure und basische Böden, verschiedene Pflanzen."],
        ["Höhenstufen", "Von 200 m im Unterland bis 3.905 m am Ortler: Flaumeichen im Tal, Polsterpflanzen am Gipfel."]
      ],
      profile: {
        levels: { "1000": "1.000 m", "2000": "2.000 m", "3000": "3.000 m" },
        peak: "3.905 m",
        note: "Vom Talboden über Wälder und Almen bis hinauf zu Fels und Gletscher."
      }
    },
    figures: {
      title: "Kleine Fläche, große Vielfalt",
      copy: "Südtirol umfasst rund 7.400 km², weniger als 2,5 % der Fläche Italiens. Und doch leben hier:",
      items: [
        { value: "2.500+", label: "Gefäßpflanzenarten" },
        { value: "153", label: "Brutvogelarten" },
        { prefix: "ca.", value: "185", label: "Tagfalterarten" },
        { value: "25", suffix: "von 36", label: "in Italien vorkommenden Fledermausarten" }
      ],
      source: "Artenzahlen: Biodiversitätsmonitoring Südtirol (Eurac Research), Artengruppen Gefäßpflanzen, Vögel, Tagfalter und Fledermäuse. Fläche: Forstdienst der Autonomen Provinz Bozen; ISTAT."
    },
    monitoring: {
      title: "Mehr über den Zustand der Biodiversität in Südtirol erfahren",
      subtitle: "Ergebnisse und Berichte des Biodiversitätsmonitorings Südtirol",
      href: "https://biodiversity.eurac.edu/de/ergebnisse/#reports"
    },
    services: {
      eyebrow: "Ökosystemleistungen",
      title: "Was intakte Lebensräume leisten",
      lead: "Die Fachsprache nennt es Ökosystemleistungen: Arbeit, die Wiesen, Wälder, Böden und Gewässer jeden Tag erledigen, ohne dass sie jemand bestellt oder bezahlt.",
      items: services([
        ["Bestäubung", "Wildbienen und andere Insekten sichern die Fortpflanzung vieler Wild- und Kulturpflanzen."],
        ["Wasserrückhalt", "Intakte Böden und Feuchtgebiete speichern Wasser und reduzieren Abflussspitzen."],
        ["Kühlung", "Vegetation und Böden reduzieren Hitze und verbessern das lokale Mikroklima."],
        ["Bodenfruchtbarkeit", "Bodenorganismen halten Nährstoffkreisläufe am Laufen."],
        ["Kohlenstoffspeicherung", "Wälder, Böden und Moore binden langfristig Kohlenstoff."],
        ["Erosionsschutz", "Vegetation stabilisiert Böden und reduziert Bodenverlust."]
      ]),
      conclusion: "Intakte Lebensräume machen unser Land klimaresilienter."
    },
    loss: {
      eyebrow: "Unter Druck",
      title: "In Südtirol gehen Lebensräume verloren",
      lead: "Der Verlust ist selten spektakulär. Er geschieht Fläche für Fläche – vor allem durch intensive Nutzung und den Klimawandel.",
      pressures: [
        ["Intensivierung", "Mehr Dünger, häufigere Mahd: Aus artenreichen Wiesen werden artenarme."],
        ["Versiegelung", "Siedlungen, Gewerbe und Straßen wachsen auf dem knappen Talboden, wo früher Auen lagen."],
        ["Zerschneidung", "Straßen, Zäune und verbaute Ufer trennen Lebensräume; kleine Bestände verschwinden leichter."],
        ["Verlust extensiver Wiesen", "Magerwiesen und Trockenrasen werden intensiver genutzt oder aufgegeben und wachsen zu."],
        ["Entwässerung", "Feuchtwiesen, Moore und Auen trockengelegt, Bäche begradigt – oft bleiben nur Reste."],
        ["Strukturverlust", "Mit Hecken, Einzelbäumen und Trockenmauern verschwinden Brutplätze, Verstecke und Nahrung."],
        ["Klimawandel", "Wärmere, trockenere Sommer schieben Lebensräume bergauf – Arten der Hochlagen können nicht beliebig ausweichen."]
      ],
      scene: { before: "Früher", after: "Heute", slider: "Früher und heute vergleichen", note: "Schematisch: derselbe Talboden früher und wie er heute oft aussieht. Regler ziehen zum Vergleichen." },
      facts: [
        ["46 %", "der Tagfalterarten Südtirols gelten als regional gefährdet."],
        ["38 %", "der bewerteten Brutvogelarten Südtirols sind gefährdet, vor allem Wiesenbrüter."],
        ["6", "Heu- und Fangschreckenarten sind in Südtirol in den letzten 100 Jahren ausgestorben."],
        ["9", "Libellenarten sind in Südtirol ausgestorben oder verschollen, meist Arten der Talböden."]
      ],
      factsSource: "Quellen: Biodiversitätsmonitoring Südtirol (Eurac Research), Artengruppen Tagfalter und Heuschrecken; Ceresa & Kranebitter (2020), Rote Liste der Brutvögel Südtirols, Gredleriana 20; Lösch et al. (2018), Rote Liste der Libellen Südtirols, Gredleriana 18.",
      closing: "Verlorene Lebensräume lassen sich nicht überall zurückholen. Aber was noch da ist, können wir wiederherstellen, vergrößern und verbinden.",
      projectsBridge: "Hier setzen die b*alance-Projekte an."
    },
    economy: {
      eyebrow: "Natur und Wirtschaft",
      title: "Warum Biodiversitätsverlust auch wirtschaftlich zählt",
      figures: [
        ["75 %", "der Unternehmenskredite in der Eurozone hängen stark von Ökosystemleistungen ab"],
        ["2/3", "der Wertschöpfung in der EU sind in hohem oder mittlerem Maß von der Natur abhängig"]
      ],
      source: "Quellen: Europäische Zentralbank (2023); Gemeinsame Forschungsstelle der EU-Kommission (2025).",
      detailsLabel: "Mehr zu den Zahlen und Quellen",
      details: [
        {
          title: "75 % der Unternehmenskredite",
          copy: "Die Europäische Zentralbank hat ausgewertet, wie die Kredite der Banken im Euroraum an rund 4,2 Millionen Unternehmen von Ökosystemleistungen abhängen. Knapp 75 % – fast 3,24 Billionen Euro – gehen an Unternehmen, die stark von mindestens einer Ökosystemleistung abhängen. Ohne Lieferketten, also nur die direkte Abhängigkeit gerechnet, sind es rund 61 %. Etwa 72 % der Unternehmen im Euroraum, rund 3 Millionen, sind selbst stark abhängig."
        },
        {
          title: "Zwei Drittel der Wertschöpfung",
          copy: "Die Gemeinsame Forschungsstelle der EU-Kommission kommt für die EU auf 65 %: 36 % der Bruttowertschöpfung hängen stark, weitere 29 % mittel von der Natur ab, Lieferketten eingerechnet. Allein im eigenen Betrieb, ohne Zulieferer, sind 44 % stark abhängig. Weil jede Branche Vorleistungen aus naturabhängigen Sektoren braucht, ist die gesamte Wirtschaft betroffen."
        }
      ],
      sourcesLabel: "Quellen",
      sources: [
        { citation: "Lelli, C., Parisi, L., Heemskerk, I., Boldrini, S., Ceglar, A. (2023): Living in a world of disappearing nature: physical risk and the implications for financial stability. ECB Occasional Paper Series No 333. doi:10.2866/670314", href: "https://www.ecb.europa.eu/pub/pdf/scpops/ecb.op333~1b97e436be.en.pdf" },
        { citation: "Hirschbuehl, D., Petracco, M., Neuville, A., Sanchez Arjona, I., Vasilakopoulos, P. (2025): The EU economy’s dependency on nature. European Commission, Joint Research Centre, JRC140003.", href: "https://publications.jrc.ec.europa.eu/repository/handle/JRC140003" }
      ]
    },
    model: {
      eyebrow: "Was ist b*alance?",
      title: "Eine Plattform für Investitionen in Südtiroler Lebensräume",
      lead: "b*alance verbindet drei Seiten: Organisationen, die Lebensräume in Südtirol pflegen und wiederherstellen; Unternehmen und Menschen, die das finanzieren wollen; und eine offene Dokumentation, die zeigt, was mit dem Geld geschieht.",
      steps: [
        ["Einreichen", "Vereine, Stiftungen und Netzwerke reichen Projekte mit Ort, Maßnahmenplan, Laufzeit und Budget ein."],
        ["Prüfen", "Ein Fachgremium aus Ökologie, Agrar- und Umweltwissenschaften prüft Ziele, Laufzeit und Budget vor der Veröffentlichung."],
        ["Unterstützen", "Unternehmen und Privatpersonen unterstützen ein Projekt direkt – und können es besuchen."],
        ["Nachverfolgen", "Zielwerte werden vorab festgelegt. Maßnahmen, Monitoring und Finanzierungsstand stehen auf der Projektseite."]
      ],
      more: "Mehr über b*alance"
    },
    closing: {
      title: "Investiere in unsere Zukunft und bring die Natur ins Gleichgewicht",
      copy: "Unterstütze ein Projekt in Südtirol, das Lebensräume erhält oder wiederherstellt, und verfolge über Jahre, was daraus wird. Wer selbst eine Fläche betreut, kann ein Projekt einreichen.",
      cta: "Unsere Projekte entdecken",
      submit: "Projekt einreichen"
    }
  },
  it: {
    legendPager: "Voce {n}",
    richness: {
      eyebrow: "Biodiversità in Alto Adige",
      title: "Perché l’Alto Adige è così ricco di specie",
      lead: "Poche regioni d’Europa riuniscono così tanti habitat in uno spazio così ridotto. Quattro ragioni si rafforzano a vicenda.",
      factors: [
        ["Clima", "Submediterraneo al sud, arido in Val Venosta, umido lungo la cresta principale delle Alpi."],
        ["Paesaggio culturale", "Prati da sfalcio, pascoli, siepi, muretti a secco e castagneti esistono solo perché vengono coltivati."],
        ["Geologia", "Calcare e dolomia accanto a granito, porfido e scisti – suoli acidi e basici, piante diverse."],
        ["Fasce altitudinali", "Dai 200 m della Bassa Atesina ai 3.905 m dell’Ortles: roverelle nel fondovalle, piante a cuscinetto in vetta."]
      ],
      profile: {
        levels: { "1000": "1.000 m", "2000": "2.000 m", "3000": "3.000 m" },
        peak: "3.905 m",
        note: "Dal fondovalle, attraverso boschi e alpeggi, fino a roccia e ghiaccio in quota."
      }
    },
    figures: {
      title: "Piccola superficie, grande varietà",
      copy: "L’Alto Adige misura circa 7.400 km², meno del 2,5 % della superficie italiana. Eppure qui vivono:",
      items: [
        { value: "2.500+", label: "specie di piante vascolari" },
        { value: "153", label: "specie di uccelli nidificanti" },
        { prefix: "ca.", value: "185", label: "specie di farfalle diurne" },
        { value: "25", suffix: "su 36", label: "specie di pipistrelli presenti in Italia" }
      ],
      source: "Numero di specie: Monitoraggio della biodiversità Alto Adige (Eurac Research), gruppi piante vascolari, uccelli, farfalle diurne e pipistrelli. Superficie: Servizio forestale della Provincia autonoma di Bolzano; ISTAT."
    },
    monitoring: {
      title: "Scopri di più sullo stato della biodiversità in Alto Adige",
      subtitle: "Risultati e rapporti del Monitoraggio della biodiversità Alto Adige",
      href: "https://biodiversity.eurac.edu/it/risultati/#reports"
    },
    services: {
      eyebrow: "Servizi ecosistemici",
      title: "Cosa fanno gli habitat intatti",
      lead: "Il linguaggio tecnico li chiama servizi ecosistemici: il lavoro che prati, boschi, suoli e acque svolgono ogni giorno, senza che nessuno lo ordini o lo paghi.",
      items: services([
        ["Impollinazione", "Api selvatiche e altri insetti garantiscono la riproduzione di molte piante selvatiche e coltivate."],
        ["Ritenzione idrica", "Suoli intatti e zone umide trattengono l’acqua e riducono i picchi di deflusso."],
        ["Raffrescamento", "Vegetazione e suoli riducono il calore e migliorano il microclima locale."],
        ["Fertilità del suolo", "Gli organismi del suolo mantengono attivi i cicli dei nutrienti."],
        ["Stoccaggio del carbonio", "Boschi, suoli e torbiere trattengono il carbonio a lungo termine."],
        ["Protezione dall’erosione", "La vegetazione stabilizza i suoli e riduce la perdita di terreno."]
      ]),
      conclusion: "Gli habitat intatti rendono la nostra terra più resiliente al clima."
    },
    loss: {
      eyebrow: "Sotto pressione",
      title: "In Alto Adige gli habitat stanno scomparendo",
      lead: "La perdita è raramente spettacolare. Avviene superficie dopo superficie – soprattutto per l’uso intensivo e il cambiamento climatico.",
      pressures: [
        ["Intensificazione", "Più concime, sfalci più frequenti: i prati ricchi di specie diventano poveri."],
        ["Impermeabilizzazione", "Insediamenti, aree produttive e strade crescono sullo scarso fondovalle, dove un tempo c’erano le golene."],
        ["Frammentazione", "Strade, recinzioni e sponde artificiali separano gli habitat; le popolazioni piccole scompaiono più facilmente."],
        ["Perdita dei prati estensivi", "Prati magri e aridi vengono sfruttati di più oppure abbandonati e si imboschiscono."],
        ["Drenaggio", "Prati umidi, torbiere e golene prosciugati, torrenti rettificati – spesso restano solo frammenti."],
        ["Perdita di strutture", "Con siepi, alberi isolati e muretti a secco scompaiono siti di nidificazione, rifugi e cibo."],
        ["Cambiamento climatico", "Estati più calde e secche spingono gli habitat verso l’alto – le specie d’alta quota non possono salire all’infinito."]
      ],
      scene: { before: "Prima", after: "Oggi", slider: "Confronta prima e oggi", note: "Schema: lo stesso fondovalle com’era un tempo e come appare spesso oggi. Trascina il cursore per confrontare." },
      facts: [
        ["46 %", "delle specie di farfalle diurne dell’Alto Adige sono considerate minacciate a livello regionale."],
        ["38 %", "delle specie di uccelli nidificanti valutate in Alto Adige sono minacciate, soprattutto quelle che nidificano nei prati."],
        ["6", "specie di ortotteri e mantidi si sono estinte in Alto Adige negli ultimi 100 anni."],
        ["9", "specie di libellule sono estinte o scomparse in Alto Adige, perlopiù specie di fondovalle."]
      ],
      factsSource: "Fonti: Monitoraggio della biodiversità Alto Adige (Eurac Research), gruppi farfalle diurne e ortotteri; Ceresa & Kranebitter (2020), Lista Rossa degli uccelli nidificanti in Alto Adige, Gredleriana 20; Lösch et al. (2018), Lista Rossa delle libellule dell’Alto Adige, Gredleriana 18.",
      closing: "Non ovunque gli habitat perduti si possono recuperare. Ma ciò che resta possiamo ripristinarlo, ampliarlo e ricollegarlo.",
      projectsBridge: "È qui che intervengono i progetti b*alance."
    },
    economy: {
      eyebrow: "Natura ed economia",
      title: "Perché la perdita di biodiversità conta anche per l’economia",
      figures: [
        ["75 %", "dei prestiti alle imprese nell’eurozona dipende fortemente da servizi ecosistemici"],
        ["2/3", "del valore aggiunto dell’UE dipende in misura alta o media dalla natura"]
      ],
      source: "Fonti: Banca centrale europea (2023); Centro comune di ricerca della Commissione europea (2025).",
      detailsLabel: "Di più sui dati e sulle fonti",
      details: [
        {
          title: "75 % dei prestiti alle imprese",
          copy: "La Banca centrale europea ha analizzato quanto i prestiti delle banche dell’area dell’euro a circa 4,2 milioni di imprese dipendano dai servizi ecosistemici. Quasi il 75 % – circa 3.240 miliardi di euro – va a imprese fortemente dipendenti da almeno un servizio ecosistemico. Considerando solo la dipendenza diretta, senza catene di fornitura, la quota è di circa il 61 %. Circa il 72 % delle imprese dell’area dell’euro, circa 3 milioni, è a sua volta fortemente dipendente."
        },
        {
          title: "Due terzi del valore aggiunto",
          copy: "Il Centro comune di ricerca della Commissione europea stima per l’UE il 65 %: il 36 % del valore aggiunto lordo dipende fortemente dalla natura e un altro 29 % in misura media, catene di fornitura comprese. Considerando solo le attività dirette, senza fornitori, il 44 % è fortemente dipendente. Poiché ogni settore ha bisogno di input da settori che dipendono dalla natura, l’intera economia ne è esposta."
        }
      ],
      sourcesLabel: "Fonti",
      sources: [
        { citation: "Lelli, C., Parisi, L., Heemskerk, I., Boldrini, S., Ceglar, A. (2023): Living in a world of disappearing nature: physical risk and the implications for financial stability. ECB Occasional Paper Series No 333. doi:10.2866/670314", href: "https://www.ecb.europa.eu/pub/pdf/scpops/ecb.op333~1b97e436be.en.pdf" },
        { citation: "Hirschbuehl, D., Petracco, M., Neuville, A., Sanchez Arjona, I., Vasilakopoulos, P. (2025): The EU economy’s dependency on nature. European Commission, Joint Research Centre, JRC140003.", href: "https://publications.jrc.ec.europa.eu/repository/handle/JRC140003" }
      ]
    },
    model: {
      eyebrow: "Cos’è b*alance?",
      title: "Una piattaforma per investire negli habitat dell’Alto Adige",
      lead: "b*alance mette in contatto tre parti: le organizzazioni che curano e ripristinano habitat in Alto Adige; le imprese e le persone che vogliono finanziarle; e una documentazione aperta che mostra che cosa succede con il denaro.",
      steps: [
        ["Proporre", "Associazioni, fondazioni e reti presentano progetti con luogo, piano degli interventi, durata e budget."],
        ["Verificare", "Una commissione tecnica di ecologia, scienze agrarie e ambientali verifica obiettivi, durata e budget prima della pubblicazione."],
        ["Sostenere", "Imprese e privati sostengono direttamente un progetto – e possono visitarlo."],
        ["Documentare", "I valori obiettivo sono fissati in anticipo. Interventi, monitoraggio e stato del finanziamento sono sulla pagina del progetto."]
      ],
      more: "Scopri di più su b*alance"
    },
    closing: {
      title: "Investi nel nostro futuro e riporta la natura in equilibrio",
      copy: "Sostieni un progetto in Alto Adige che conserva o ripristina habitat e segui per anni che cosa ne nasce. Chi cura una superficie può proporre un progetto.",
      cta: "Scopri i nostri progetti",
      submit: "Proponi un progetto"
    }
  },
  en: {
    legendPager: "Item {n}",
    richness: {
      eyebrow: "Biodiversity in South Tyrol",
      title: "Why South Tyrol is so rich in species",
      lead: "Few regions in Europe bring together so many habitats in so little space. Four reasons reinforce one another.",
      factors: [
        ["Climate", "Sub-Mediterranean in the south, dry in the Vinschgau, damp along the main Alpine ridge."],
        ["Cultural landscape", "Hay meadows, pastures, hedgerows, dry-stone walls and chestnut groves exist only because they are farmed."],
        ["Geology", "Limestone and dolomite next to granite, porphyry and schist – acidic and alkaline soils, different plants."],
        ["Altitude zones", "From 200 m in the Unterland to 3,905 m on the Ortler: downy oak in the valley, cushion plants on the summit."]
      ],
      profile: {
        levels: { "1000": "1,000 m", "2000": "2,000 m", "3000": "3,000 m" },
        peak: "3,905 m",
        note: "From the valley floor, through forests and high pastures, up to rock and glacier."
      }
    },
    figures: {
      title: "Small in area, big in diversity",
      copy: "South Tyrol covers around 7,400 km², less than 2.5 % of Italy. And yet it is home to:",
      items: [
        { value: "2,500+", label: "vascular plant species" },
        { value: "153", label: "breeding bird species" },
        { prefix: "c.", value: "185", label: "butterfly species" },
        { value: "25", suffix: "of 36", label: "bat species found in Italy" }
      ],
      source: "Species counts: Biodiversity Monitoring South Tyrol (Eurac Research), groups vascular plants, birds, butterflies and bats. Area: Forest Service of the Autonomous Province of Bolzano; ISTAT."
    },
    monitoring: {
      title: "Learn more about the state of biodiversity in South Tyrol",
      subtitle: "Results and reports of Biodiversity Monitoring South Tyrol",
      href: "https://biodiversity.eurac.edu/en/results/#reports"
    },
    services: {
      eyebrow: "Ecosystem services",
      title: "What intact habitats provide",
      lead: "The technical term is ecosystem services: the work that meadows, forests, soils and waters do every day, without anyone ordering or paying for it.",
      items: services([
        ["Pollination", "Wild bees and other insects secure the reproduction of many wild and cultivated plants."],
        ["Water retention", "Intact soils and wetlands store water and reduce peak run-off."],
        ["Cooling", "Vegetation and soils reduce heat and improve the local microclimate."],
        ["Soil fertility", "Soil organisms keep nutrient cycles running."],
        ["Carbon storage", "Forests, soils and peatlands lock up carbon for the long term."],
        ["Erosion control", "Vegetation stabilises soils and reduces soil loss."]
      ]),
      conclusion: "Intact habitats make our land more resilient to climate change."
    },
    loss: {
      eyebrow: "Under pressure",
      title: "Habitats are being lost in South Tyrol",
      lead: "The loss is rarely spectacular. It happens plot by plot – above all through intensive land use and climate change.",
      pressures: [
        ["Intensification", "More fertiliser, more frequent mowing: species-rich meadows become species-poor."],
        ["Soil sealing", "Settlements, business parks and roads grow on the scarce valley floor, where floodplains used to be."],
        ["Fragmentation", "Roads, fences and hardened banks cut habitats apart; small populations disappear more easily."],
        ["Loss of extensive meadows", "Nutrient-poor meadows and dry grasslands are farmed harder or abandoned and scrub over."],
        ["Drainage", "Wet meadows, peatlands and floodplains drained, streams straightened – often only remnants are left."],
        ["Loss of structure", "With hedgerows, solitary trees and dry-stone walls go nesting sites, shelter and food."],
        ["Climate change", "Warmer, drier summers push habitats uphill – high-altitude species cannot keep moving up forever."]
      ],
      scene: { before: "Then", after: "Now", slider: "Compare then and now", note: "Schematic: the same valley floor as it used to be and as it often looks today. Drag the slider to compare." },
      facts: [
        ["46 %", "of South Tyrol’s butterfly species are considered regionally threatened."],
        ["38 %", "of the assessed breeding bird species in South Tyrol are threatened, above all meadow nesters."],
        ["6", "grasshopper and mantis species have died out in South Tyrol over the past 100 years."],
        ["9", "dragonfly species are extinct or lost in South Tyrol, mostly valley-floor species."]
      ],
      factsSource: "Sources: Biodiversity Monitoring South Tyrol (Eurac Research), groups butterflies and grasshoppers; Ceresa & Kranebitter (2020), Red List of breeding birds of South Tyrol, Gredleriana 20; Lösch et al. (2018), Red List of dragonflies of South Tyrol, Gredleriana 18.",
      closing: "Lost habitats cannot be brought back everywhere. But what is still here, we can restore, enlarge and reconnect.",
      projectsBridge: "This is where b*alance projects come in."
    },
    economy: {
      eyebrow: "Nature and the economy",
      title: "Why biodiversity loss also matters economically",
      figures: [
        ["75 %", "of corporate loans in the eurozone depend heavily on ecosystem services"],
        ["2/3", "of value added in the EU depends highly or moderately on nature"]
      ],
      source: "Sources: European Central Bank (2023); European Commission Joint Research Centre (2025).",
      detailsLabel: "More on the figures and sources",
      details: [
        {
          title: "75 % of corporate loans",
          copy: "The European Central Bank analysed how euro area banks’ loans to around 4.2 million companies depend on ecosystem services. Almost 75 % – nearly €3.24 trillion – goes to companies that are highly dependent on at least one ecosystem service. Counting only direct dependency, without supply chains, the share is about 61 %. Around 72 % of euro area companies, roughly 3 million, are themselves highly dependent."
        },
        {
          title: "Two thirds of value added",
          copy: "The European Commission’s Joint Research Centre puts the EU figure at 65 %: 36 % of gross value added depends highly on nature and a further 29 % moderately, supply chains included. Looking only at companies’ own operations, without suppliers, 44 % is highly dependent. Because every sector needs inputs from nature-dependent sectors, the whole economy is exposed."
        }
      ],
      sourcesLabel: "Sources",
      sources: [
        { citation: "Lelli, C., Parisi, L., Heemskerk, I., Boldrini, S., Ceglar, A. (2023): Living in a world of disappearing nature: physical risk and the implications for financial stability. ECB Occasional Paper Series No 333. doi:10.2866/670314", href: "https://www.ecb.europa.eu/pub/pdf/scpops/ecb.op333~1b97e436be.en.pdf" },
        { citation: "Hirschbuehl, D., Petracco, M., Neuville, A., Sanchez Arjona, I., Vasilakopoulos, P. (2025): The EU economy’s dependency on nature. European Commission, Joint Research Centre, JRC140003.", href: "https://publications.jrc.ec.europa.eu/repository/handle/JRC140003" }
      ]
    },
    model: {
      eyebrow: "What is b*alance?",
      title: "A platform for investing in South Tyrol’s habitats",
      lead: "b*alance connects three sides: organisations that care for and restore habitats in South Tyrol; companies and people who want to fund that work; and open documentation that shows what happens with the money.",
      steps: [
        ["Submit", "Associations, foundations and networks submit projects with a location, action plan, duration and budget."],
        ["Review", "An expert panel from ecology, agricultural and environmental sciences reviews goals, duration and budget before publication."],
        ["Support", "Companies and individuals support a project directly – and can visit it."],
        ["Track", "Targets are set in advance. Measures, monitoring and funding status are published on the project page."]
      ],
      more: "More about b*alance"
    },
    closing: {
      title: "Invest in our future and help tip the balance",
      copy: "Support a project in South Tyrol that preserves or restores habitats, and follow what grows from it over the years. If you look after a site yourself, you can submit a project.",
      cta: "Discover our projects",
      submit: "Submit a project"
    }
  }
};

export function getHomeStory(locale: Locale): HomeStoryCopy {
  return homeStory[locale];
}
