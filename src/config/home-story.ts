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
  richness: {
    eyebrow: string;
    title: string;
    lead: string;
    factors: [string, string][];
    imageAlt: string;
    imageCaption: string;
    /** Beschriftung der Höhenstufen im Foto, von oben nach unten. */
    annotations: { peaks: string; alpine: string; pastures: string; forest: string; valley: string };
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
    pressures: [string, string][];
    facts: [string, string][];
    factsSource: string;
    closing: string;
  };
  economy: {
    eyebrow: string;
    title: string;
    lead: string;
    points: [string, string][];
    source: string;
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

/** Foto im Vielfalt-Abschnitt. Lizenz verlangt Namensnennung und Lizenzangabe. */
export const richnessImage = {
  src: "/assets/landscape/vinschgau-ganglegg.webp",
  width: 1800,
  height: 1350,
  blurDataURL:
    "data:image/webp;base64,UklGRqwAAABXRUJQVlA4IKAAAAAwBACdASoUAA8APrVInkmnJCKhMAgA4BaJbACdMoGv/gMRhuWzDGID5+AA/qscOp/7Q1yXP3jNsLfYLi/dZm8EQWw07t3CnszOgHifCJFw1XpPiGsko46GbENl9/7Hq+gPoh7a2msP+2ZkHEDuNwp/c1m/7TPnGQcCXbUfXuFzt+cMTYaBlZ3dKtvyC/M1/CyyMTP+Fg64wMf0PNEO43AA",
  photographer: "Armin S Kowalski",
  license: "CC BY-SA 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Panorama_vom_Ganglegg_-_Schluderns_-_Vinschgau_-_20160622_(28187381764).jpg"
} as const;

const serviceIds: ServiceId[] = ["pollination", "water", "cooling", "soil", "carbon", "erosion"];

function services(items: [string, string][]) {
  return items.map(([title, copy], index) => ({ id: serviceIds[index], title, copy }));
}

const homeStory: Localized<HomeStoryCopy> = {
  de: {
    richness: {
      eyebrow: "Biodiversität in Südtirol",
      title: "Warum Südtirol so artenreich ist",
      lead: "Kaum eine Region Europas vereint auf so engem Raum so viele Lebensräume. Dafür gibt es vier Gründe, und sie verstärken sich gegenseitig.",
      factors: [
        ["Höhe", "Von gut 200 Metern im Unterland bis 3.905 Metern am Ortler: Flaumeichen und Trockenrasen im Tal, Polsterpflanzen im Hochgebirge."],
        ["Geologie", "Kalk und Dolomit neben Granit, Porphyr und Schiefer. Saure und basische Böden tragen ganz unterschiedliche Pflanzen."],
        ["Klima", "Submediterrane Wärme im Süden, trockene inneralpine Täler wie der Vinschgau, feuchte Lagen am Alpenhauptkamm."],
        ["Kulturlandschaft", "Jahrhundertelange Nutzung hat Mähwiesen, Weiden, Hecken, Trockenmauern und Kastanienhaine geschaffen – Lebensräume, die es ohne Bewirtschaftung nicht gäbe."]
      ],
      imageAlt: "Blick über den Vinschgau bei Schluderns: Dorf und Felder im Talboden, bewaldete Hänge, Wiesen, Weiden, Almen und vergletscherte Gipfel im Hintergrund",
      imageCaption: "Vinschgau bei Schluderns: Talboden, Kulturlandschaft, Wald, Wiesen, Weiden, Almen und Hochgebirge in einem Blick.",
      annotations: { peaks: "Hochgebirge", alpine: "Almen", pastures: "Wiesen und Weiden", forest: "Wald", valley: "Talboden & Kulturland" }
    },
    figures: {
      title: "Kleine Fläche, große Vielfalt.",
      copy: "Südtirol umfasst rund 7.400 km², weniger als 2,5 % der Fläche Italiens. Und doch leben hier:",
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
      lead: "Der Verlust ist selten spektakulär. Er geschieht Fläche für Fläche: Eine Wiese wird häufiger gemäht, ein Graben verrohrt, eine Hecke gerodet. Das Biodiversitätsmonitoring Südtirol nennt intensive Nutzung und Klimawandel als die großen Belastungen.",
      pressures: [
        ["Intensivierung", "Mehr Dünger, frühere und häufigere Mahd: Aus artenreichen Wiesen werden grasreiche Bestände mit wenigen Arten."],
        ["Versiegelung", "Siedlungen, Gewerbe und Straßen wachsen auf dem knappen, ebenen Talboden – dort, wo früher die Auen lagen."],
        ["Zerschneidung", "Straßen, Zäune und verbaute Ufer trennen Lebensräume. Kleine, isolierte Bestände verschwinden leichter."],
        ["Verlust extensiver Wiesen", "Magerwiesen und Trockenrasen werden intensiver genutzt oder aufgegeben – dann wachsen sie zu."],
        ["Entwässerung", "Feuchtwiesen, Moore und Auen wurden trockengelegt, Bäche begradigt. Oft sind nur kleine Reste geblieben."],
        ["Strukturverlust", "Hecken, Einzelbäume, Trockenmauern und Säume verschwinden – und mit ihnen Brutplätze, Verstecke und Nahrung."],
        ["Klimawandel", "Wärmere, trockenere Sommer verschieben Lebensräume bergauf. Arten der Hochlagen können nicht beliebig ausweichen."]
      ],
      facts: [
        ["46 %", "der Tagfalterarten Südtirols gelten als regional gefährdet."],
        ["6", "Heu- und Fangschreckenarten sind in Südtirol in den letzten 100 Jahren ausgestorben."]
      ],
      factsSource: "Quelle: Biodiversitätsmonitoring Südtirol (Eurac Research), Artengruppen Tagfalter und Heuschrecken.",
      closing: "Verlorene Lebensräume lassen sich nicht überall zurückholen. Aber an vielen Orten lassen sie sich erhalten, vergrößern und wieder verbinden."
    },
    economy: {
      eyebrow: "Natur und Wirtschaft",
      title: "Warum Biodiversitätsverlust auch wirtschaftlich zählt",
      lead: "Natur ist nicht erst dann wertvoll, wenn sie Geld einbringt. Aber ökologische Stabilität ist eine Grundlage wirtschaftlicher Stabilität – in Südtirol lässt sich das besonders gut sehen.",
      points: [
        ["Landwirtschaft", "Obst- und Weinbau, Grünland und Almwirtschaft sind auf Bestäuber, fruchtbare Böden und verlässliches Wasser angewiesen."],
        ["Naturgefahren", "Schutzwald, Auen und bewachsene Hänge puffern Hochwasser, Muren und Erosion teilweise ab – ein Schutz, der sonst gebaut werden müsste."],
        ["Tourismus", "Gäste kommen wegen der Landschaft. Blühende Almen, Wälder und klare Bäche sind das, was Südtirol ausmacht."],
        ["Unternehmen", "Auch Betriebe ohne eigene Fläche hängen über Rohstoffe, Wasser, Lieferketten und Standortqualität von stabilen Ökosystemen ab."]
      ],
      source: "Nach: Der Spiegel 37/2026, „Wenn die Umweltkrise zur Finanzkrise wird“, mit Bezug auf eine Studie in „Nature“ (September 2025) und die KfW."
    },
    model: {
      eyebrow: "Was ist b*alance?",
      title: "Eine Plattform für Investitionen in Südtiroler Lebensräume.",
      lead: "b*alance verbindet drei Seiten: Organisationen, die Lebensräume in Südtirol pflegen und wiederherstellen; Unternehmen und Menschen, die das finanzieren wollen; und eine offene Dokumentation, die zeigt, was mit dem Geld geschieht.",
      steps: [
        ["Einreichen", "Vereine, Stiftungen und Netzwerke reichen Projekte mit Ort, Maßnahmenplan, Laufzeit und Budget ein."],
        ["Prüfen", "Ein Fachgremium aus Ökologie, Agrar- und Umweltwissenschaften prüft Ziele, Laufzeit und Budget vor der Veröffentlichung."],
        ["Unterstützen", "Unternehmen und Privatpersonen unterstützen ein Projekt direkt – und können es besuchen."],
        ["Nachhalten", "Zielwerte werden vorab festgelegt. Maßnahmen, Monitoring und Finanzierungsstand stehen auf der Projektseite."]
      ],
      more: "Mehr über b*alance"
    },
    closing: {
      title: "Investiere in unsere Zukunft.",
      copy: "Unterstütze ein Projekt in Südtirol, das Lebensräume erhält oder wiederherstellt, und verfolge über Jahre, was daraus wird. Wer selbst eine Fläche betreut, kann ein Projekt einreichen.",
      cta: "Unsere Projekte entdecken",
      submit: "Projekt einreichen"
    }
  },
  it: {
    richness: {
      eyebrow: "Biodiversità in Alto Adige",
      title: "Perché l’Alto Adige è così ricco di specie",
      lead: "Poche regioni d’Europa riuniscono così tanti habitat in uno spazio così ridotto. Le ragioni sono quattro e si rafforzano a vicenda.",
      factors: [
        ["Altitudine", "Da poco più di 200 metri nella Bassa Atesina ai 3.905 metri dell’Ortles: roverelle e prati aridi nel fondovalle, piante a cuscinetto in alta montagna."],
        ["Geologia", "Calcare e dolomia accanto a granito, porfido e scisti. Suoli acidi e basici ospitano piante molto diverse."],
        ["Clima", "Il calore submediterraneo del sud, valli interne aride come la Val Venosta, versanti umidi lungo la cresta principale delle Alpi."],
        ["Paesaggio culturale", "Secoli di utilizzo hanno creato prati da sfalcio, pascoli, siepi, muretti a secco e castagneti – habitat che senza coltivazione non esisterebbero."]
      ],
      imageAlt: "Vista sulla Val Venosta presso Sluderno: paese e campi nel fondovalle, versanti boscosi, prati, pascoli, alpeggi e vette con ghiacciai sullo sfondo",
      imageCaption: "Val Venosta presso Sluderno: fondovalle, paesaggio coltivato, bosco, prati, pascoli, alpeggi e alta montagna in un solo sguardo.",
      annotations: { peaks: "Alta montagna", alpine: "Alpeggi", pastures: "Prati e pascoli", forest: "Bosco", valley: "Fondovalle e colture" }
    },
    figures: {
      title: "Piccola superficie, grande varietà.",
      copy: "L’Alto Adige misura circa 7.400 km², meno del 2,5 % della superficie italiana. Eppure qui vivono:",
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
      lead: "La perdita è raramente spettacolare. Avviene superficie dopo superficie: un prato falciato più spesso, un fosso intubato, una siepe estirpata. Il Monitoraggio della biodiversità Alto Adige indica l’uso intensivo e il cambiamento climatico come le grandi pressioni.",
      pressures: [
        ["Intensificazione", "Più concime, sfalci più precoci e frequenti: i prati ricchi di specie diventano prati con poche specie."],
        ["Impermeabilizzazione", "Insediamenti, aree produttive e strade crescono sullo scarso fondovalle pianeggiante – dove un tempo c’erano le golene."],
        ["Frammentazione", "Strade, recinzioni e sponde artificiali separano gli habitat. Popolazioni piccole e isolate scompaiono più facilmente."],
        ["Perdita dei prati estensivi", "Prati magri e prati aridi vengono sfruttati in modo più intensivo oppure abbandonati – e allora si imboschiscono."],
        ["Drenaggio", "Prati umidi, torbiere e golene sono stati prosciugati, i torrenti rettificati. Spesso ne restano solo piccoli frammenti."],
        ["Perdita di strutture", "Siepi, alberi isolati, muretti a secco e fasce erbose scompaiono – e con loro siti di nidificazione, rifugi e cibo."],
        ["Cambiamento climatico", "Estati più calde e secche spostano gli habitat verso l’alto. Le specie d’alta quota non possono spostarsi all’infinito."]
      ],
      facts: [
        ["46 %", "delle specie di farfalle diurne dell’Alto Adige sono considerate minacciate a livello regionale."],
        ["6", "specie di ortotteri e mantidi si sono estinte in Alto Adige negli ultimi 100 anni."]
      ],
      factsSource: "Fonte: Monitoraggio della biodiversità Alto Adige (Eurac Research), gruppi farfalle diurne e ortotteri.",
      closing: "Non ovunque gli habitat perduti si possono recuperare. Ma in molti luoghi si possono conservare, ampliare e ricollegare."
    },
    economy: {
      eyebrow: "Natura ed economia",
      title: "Perché la perdita di biodiversità conta anche per l’economia",
      lead: "La natura non ha valore solo quando rende denaro. Ma la stabilità ecologica è una base della stabilità economica – e in Alto Adige lo si vede particolarmente bene.",
      points: [
        ["Agricoltura", "Frutticoltura e viticoltura, prati e alpeggi dipendono da impollinatori, suoli fertili e acqua affidabile."],
        ["Pericoli naturali", "Boschi di protezione, golene e versanti vegetati attenuano in parte piene, colate detritiche ed erosione – una protezione che altrimenti andrebbe costruita."],
        ["Turismo", "Gli ospiti vengono per il paesaggio. Alpeggi fioriti, boschi e ruscelli limpidi sono ciò che rende unico l’Alto Adige."],
        ["Imprese", "Anche le aziende senza superfici proprie dipendono da ecosistemi stabili attraverso materie prime, acqua, catene di fornitura e qualità del territorio."]
      ],
      source: "Secondo: Der Spiegel 37/2026, «Wenn die Umweltkrise zur Finanzkrise wird», con riferimento a uno studio su «Nature» (settembre 2025) e alla KfW."
    },
    model: {
      eyebrow: "Cos’è b*alance?",
      title: "Una piattaforma per investire negli habitat dell’Alto Adige.",
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
      title: "Investi nel nostro futuro.",
      copy: "Sostieni un progetto in Alto Adige che conserva o ripristina habitat e segui per anni che cosa ne nasce. Chi cura una superficie può proporre un progetto.",
      cta: "Scopri i nostri progetti",
      submit: "Proponi un progetto"
    }
  },
  en: {
    richness: {
      eyebrow: "Biodiversity in South Tyrol",
      title: "Why South Tyrol is so rich in species",
      lead: "Few regions in Europe bring together so many habitats in so little space. There are four reasons, and they reinforce one another.",
      factors: [
        ["Altitude", "From just over 200 metres in the Unterland to 3,905 metres on the Ortler: downy oak and dry grassland in the valley, cushion plants in the high mountains."],
        ["Geology", "Limestone and dolomite next to granite, porphyry and schist. Acidic and alkaline soils carry very different plants."],
        ["Climate", "Sub-Mediterranean warmth in the south, dry inner-Alpine valleys such as the Vinschgau, damp slopes along the main Alpine ridge."],
        ["Cultural landscape", "Centuries of use have created hay meadows, pastures, hedgerows, dry-stone walls and chestnut groves – habitats that would not exist without farming."]
      ],
      imageAlt: "View over the Vinschgau near Schluderns: village and fields on the valley floor, forested slopes, meadows, pastures, high pastures and glaciated peaks behind",
      imageCaption: "Vinschgau near Schluderns: valley floor, farmland, forest, meadows, pastures, high pastures and high peaks in a single view.",
      annotations: { peaks: "High mountains", alpine: "High pastures", pastures: "Meadows and pastures", forest: "Forest", valley: "Valley floor & farmland" }
    },
    figures: {
      title: "Small in area, big in diversity.",
      copy: "South Tyrol covers around 7,400 km², less than 2.5 % of Italy. And yet it is home to:",
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
      lead: "The loss is rarely spectacular. It happens plot by plot: a meadow mown more often, a ditch piped, a hedgerow grubbed out. Biodiversity Monitoring South Tyrol names intensive land use and climate change as the major pressures.",
      pressures: [
        ["Intensification", "More fertiliser, earlier and more frequent mowing: species-rich meadows turn into grassy swards with few species."],
        ["Soil sealing", "Settlements, business parks and roads grow on the scarce, flat valley floor – where the floodplains used to be."],
        ["Fragmentation", "Roads, fences and hardened riverbanks cut habitats apart. Small, isolated populations disappear more easily."],
        ["Loss of extensive meadows", "Nutrient-poor meadows and dry grasslands are either farmed more intensively or abandoned – and then they scrub over."],
        ["Drainage", "Wet meadows, peatlands and floodplains were drained, streams straightened. Often only small remnants are left."],
        ["Loss of structure", "Hedgerows, solitary trees, dry-stone walls and field margins disappear – and with them nesting sites, shelter and food."],
        ["Climate change", "Warmer, drier summers push habitats uphill. High-altitude species cannot keep moving up forever."]
      ],
      facts: [
        ["46 %", "of South Tyrol’s butterfly species are considered regionally threatened."],
        ["6", "grasshopper and mantis species have died out in South Tyrol over the past 100 years."]
      ],
      factsSource: "Source: Biodiversity Monitoring South Tyrol (Eurac Research), groups butterflies and grasshoppers.",
      closing: "Lost habitats cannot be brought back everywhere. But in many places they can be preserved, enlarged and reconnected."
    },
    economy: {
      eyebrow: "Nature and the economy",
      title: "Why biodiversity loss also matters economically",
      lead: "Nature is not only valuable when it makes money. But ecological stability is a foundation of economic stability – and South Tyrol shows this particularly clearly.",
      points: [
        ["Agriculture", "Fruit and wine growing, grassland and alpine farming depend on pollinators, fertile soils and reliable water."],
        ["Natural hazards", "Protective forests, floodplains and vegetated slopes partly buffer floods, debris flows and erosion – protection that would otherwise have to be built."],
        ["Tourism", "Visitors come for the landscape. Flowering alpine pastures, forests and clear streams are what makes South Tyrol."],
        ["Businesses", "Even companies without land of their own depend on stable ecosystems through raw materials, water, supply chains and the quality of their location."]
      ],
      source: "After: Der Spiegel 37/2026, “Wenn die Umweltkrise zur Finanzkrise wird”, citing a study in Nature (September 2025) and KfW."
    },
    model: {
      eyebrow: "What is b*alance?",
      title: "A platform for investing in South Tyrol’s habitats.",
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
      title: "Invest in our future.",
      copy: "Support a project in South Tyrol that preserves or restores habitats, and follow what grows from it over the years. If you look after a site yourself, you can submit a project.",
      cta: "Discover our projects",
      submit: "Submit a project"
    }
  }
};

export function getHomeStory(locale: Locale): HomeStoryCopy {
  return homeStory[locale];
}
