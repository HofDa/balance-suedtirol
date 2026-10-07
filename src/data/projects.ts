import type { Project, ProjectCardData, ProjectListItem } from "../types/project";
import type { Locale } from "../config/site";

export const projects: Project[] = [
  {
    // Projektstand vom Oktober 2026: Träger, Zeitplan, Budget und Monitoring
    // sind noch offen. Der Kartenpunkt bezeichnet vorerst nur den Ort Kiens.
    slug: "widumwiese-kiens",
    title: "Widumwiese Kiens",
    summary: "Die Wiese beim Widum wird ökologisch aufgewertet, um Lebensraum für Vögel, Igel, Amphibien, Insekten und weitere Lebewesen zu schaffen.",
    description: "Die Fläche wird mit kleinen, aber wirksamen Maßnahmen ökologisch aufgewertet. Es werden einige zusätzliche Apfelbäume gepflanzt, die nicht heimischen Sträucher entfernt und heimische Sträucher in einer doppelten Reihe gesetzt. Ein kleiner Teich, ein Lebensraum für Insekten mit einer Wildbieneninsel und eine wilde Ecke für Igel und andere Lebewesen werden angelegt. Die neue Hecke dient Vögeln als Futterquelle und Nistplatz. Der kleine Teich schafft Lebensraum für Libellen, Amphibien und weitere wasserlebende Lebewesen. Mit diesem Projekt kommen wir dem Auftrag der Diözese nach, die Schöpfung zu bewahren und zu fördern.",
    categoryIds: ["hedges", "cultural-landscapes", "waters"],
    status: "support-needed",
    municipality: "Kiens",
    organization: "Noch zu klären",
    organizationPending: true,
    // Ungefähre Ortslage: https://mapcarta.com/18703318. Widumstandort noch bestätigen.
    location: { lat: 46.8086, lng: 11.8398 },
    locationApproximate: true,
    image: "/projects/widumwiese-kiens.webp",
    supporters: 0,
    whyItMatters: "Das Widum in Kiens liegt idyllisch am Ortsrand nahe der Felder und des Waldes. Sein großer Garten ist eine Mähwiese mit einigen großwüchsigen Apfelbäumen alter Sorten und einer Hecke aus hauptsächlich nicht heimischen Sträuchern. Diese Fläche bietet großes Potenzial für eine wenig aufwendige, aber ökologisch wertvolle Aufwertung – in einem Gebiet, in dem durch Verbauung und Intensivierung wenig Platz für Natur geblieben ist.",
    impact: [
      { value: "1", label: "Hecke für Vögel und Kleinsäuger" },
      { value: "1", label: "wilde Ecke für Igel und weitere Lebewesen" },
      { value: "1", label: "Teich für Wasserlebewesen" },
      { value: "1", label: "kleines Paradies für Insekten" }
    ],
    monitoring: {
      species: "Vögel, Igel, Amphibien, Libellen, Wildbienen und weitere Insekten",
      surveys: "Noch festzulegen",
      reporting: "Noch festzulegen",
      summary: "Das Beobachtungsprogramm wird im Zuge der weiteren Projektplanung festgelegt."
    }
  },
  {
    slug: "millander-au-erweiterung",
    title: "Millander Au – Erweiterung",
    summary:
      "Die Millander Au bei Brixen soll um eine ehemalige Apfelanlage wachsen: Teich, Feuchtwiese und Hecken für rund 130 Vogelarten im Jahr.",
    description:
      "Nördlich an das bestehende Biotop von rund 4,5 Hektar schließt eine ehemals intensiv bewirtschaftete Apfelanlage an. Sie soll zu einem großen Schilfteich, einer bei Hochwasser überfluteten Feuchtwiese, Heckenstreifen, Erleninseln und einem mäandrierenden Wasserlauf werden. Steilwände aus Lehm und Sand bieten Bienenfresser, Uferschwalbe und Eisvogel Brutröhren; ein Aussichtsturm am Eisackdamm, eine Beobachtungswand und eine Beobachtungshütte machen das Biotop behutsam erlebbar. Weitere Grundeigentümer haben ihre Flächen für die Erweiterung in Aussicht gestellt.",
    categoryIds: ["wetlands", "waters", "cultural-landscapes"],
    status: "support-needed",
    municipality: "Brixen",
    organization: "Stiftung Landschaft Südtirol",
      organizationAddress: "Waltherhaus, Schlernstraße 1, 39100 Bozen, Südtirol",
    location: { lat: 46.70061111, lng: 11.65197222 },
    image: "/projects/millander-au-parzelle-mai-2026.webp",
    beforeAfter: {
      before: "/projects/millander-au-heute.webp",
      after: "/projects/millander-au-vision-v9.webp",
      afterScaleY: 1.108,
      afterAlignment: [
        { source: 0.022222, target: 0.000000 },
        { source: 0.124444, target: 0.111111 },
        { source: 0.224444, target: 0.222222 },
        { source: 0.276667, target: 0.277778 },
        { source: 0.326667, target: 0.333333 },
        { source: 0.424444, target: 0.444444 },
        { source: 0.527778, target: 0.555556 },
        { source: 0.625556, target: 0.666667 },
        { source: 0.680000, target: 0.722222 },
        { source: 0.727778, target: 0.777778 },
        { source: 0.860000, target: 0.888889 },
        { source: 1.000000, target: 1.000000 },
      ],
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
    supportedBy: "Amt für Natur – Autonome Provinz Bozen",
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
      "Wir bringen die Wichtigkeit dieser Lebensräume allen Kindern und Erwachsenen mittels Aktionen, wo sie selber die Artenvielfalt des Lebensraumes entdecken, näher. Den Erhalt und die Förderung der Biodiversität erreichen wir durch die Zusammenarbeit mit professionellen Hirt:innen, die mit ihren Nutztieren auf traditionelle Weise diese Lebensräume beweiden. Wo notwendig führen wir händisch Pflegemaßnahmen wie das Entfernen von Sträuchern und Bäumen zur Rückgewinnung von artenreicher Kulturlandschaft durch.",
    categoryIds: ["cultural-landscapes", "meadows-dry-grasslands"],
    status: "support-needed",
    municipality: "Klausen, Natz-Schabs",
    organization: "b*nature",
    // Übergangslösung: b*nature hat seinen Rechtssitz vorerst bei b*coop (siehe Impressum).
    organizationAddress: "c/o b*coop, Vintlerstraße 34, 39042 Brixen",
    location: { lat: 46.6497, lng: 11.5731 },
    // Die vierte Fläche wird ergänzt, sobald sie feststeht.
    sites: [
      { name: "Raier Moos", municipality: "Natz-Schabs" },
      { name: "Gufidaun", municipality: "Klausen" },
      { name: "Kloster Säben", municipality: "Klausen" }
    ],
    image: "/projects/meine-gemeinde-meine-natur.webp",
    gallery: [
      { src: "/projects/meine-gemeinde-meine-natur-herde-hang.webp", alt: "Hirte mit Hütehund und einer Herde aus Ziegen und Schafen an einem steilen Wiesenhang", caption: "Der Hirte, sein Hütehund und die Herde aus Schafen und Ziegen an einem steilen Hang." },
      { src: "/projects/meine-gemeinde-meine-natur-ziegen-weg.webp", alt: "Ziegen auf einem Weg zwischen Holzzäunen, dahinter der Hirte und die Berge", caption: "Unterwegs mit der Herde: Ziegen auf einem Weg zwischen Holzzäunen." },
      { src: "/projects/meine-gemeinde-meine-natur-herde-winter.webp", alt: "Ziegen und Schafe auf einem Weg neben gestapelten Baumstämmen, am Rand liegt Schnee", caption: "Auch im Winter ist die Herde unterwegs." },
      { src: "/projects/meine-gemeinde-meine-natur-hirte-schnee.webp", alt: "Der Hirte mit seinem Hütehund vor der Herde auf einer verschneiten Fläche", caption: "Der Hirte mit Hütehund und Herde im Schnee." },
      { src: "/projects/meine-gemeinde-meine-natur-mahd.webp", alt: "Blick über ein Mähgerät auf eine hochgewachsene Fläche, im Hintergrund arbeitet eine weitere Person", caption: "Die artenreiche Riedwiese wird gemäht, um die Verbrachung zu verringern und den eindringenden Rohrkolben zurückzudrängen." },
      { src: "/projects/meine-gemeinde-meine-natur-rechen.webp", alt: "Eine Person recht auf einer gemähten Fläche das Schnittgut zusammen", caption: "Das Schnittgut wird zusammengerecht." },
      { src: "/projects/meine-gemeinde-meine-natur-maehgut.webp", alt: "Gemähte Wiese mit einem Haufen Schnittgut, dahinter Wald und eine Stromleitung", caption: "Nach der Mahd wird das Schnittgut auf Haufen gesammelt." },
      { src: "/projects/meine-gemeinde-meine-natur-gemaehte-flaeche.webp", alt: "Gemähte Fläche mit Reihen und Haufen aus Schnittgut vor Gehölzen", caption: "Die gemähte Fläche am Ende des Einsatztags." },
      { src: "/projects/meine-gemeinde-meine-natur-haufen-waldrand.webp", alt: "Haufen aus Schnittgut am Waldrand", caption: "Schnittgut-Haufen am Rand der Fläche." }
    ],
    supporters: 0,
    supportedBy: "Amt für Natur – Autonome Provinz Bozen",
    whyItMatters:
      "In fast jeder Ortschaft Südtirols finden wir natürliche und naturnahe Lebensräume, die seltene und gefährdete Lebensgemeinschaften vorweisen und daher als Biotop oder Naturdenkmal geschützt sind. Diese Gebiete befinden sich oft in unmittelbarer Nähe der Ortschaften und wurden meist durch geführte Beweidung von Menschen geschaffen und erhalten. Im Laufe der letzten Jahrzehnte wurde jedoch die Beweidung oft aufgegeben und diese wertvollen Lebensräume verbrachen und verbuschen. Ein vielblütiger Trockenrasen voller Insekten kann so in wenigen Jahren von Sträuchern und Bäumen überwachsen werden.",
    impact: [
      { value: "4", label: "artenreiche Wiesen und Weiden" },
      { value: "30 + 10", label: "Schafe und Ziegen" },
      { value: "40+", label: "Pflanzenarten" },
      { value: "Seltene Tiere", label: "viele seltene Tierarten" }
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
      "Wir klären, ob der Nördliche Weißbrustigel auch in Südtirol vorkommt und wo seine Verbreitungsgrenze verläuft. Gleichzeitig machen wir mit einer breit angelegten Kampagne auf den Igel und seinen Lebensraum aufmerksam: mit Citizen-Science-Aktionen, Workshops, analogen und digitalen Medien und kreativen Ideen, die möglichst viele Menschen erreichen. Und wir handeln konkret: Igel-Straßen verbinden Gärten und weitere Lebensräume, damit sich der Igel frei bewegen kann, und igelfreundliche Schulen schaffen ihm zusätzlichen Raum. Davon profitieren auch viele andere Arten, denn als Schirmart zieht der Igel zahlreiche weitere Pflanzen und Tiere mit.",
    categoryIds: ["settlement-areas", "cultural-landscapes", "forests"],
    status: "support-needed",
    municipality: "Südtirolweit",
    organization: "b*nature",
    // Übergangslösung: b*nature hat seinen Rechtssitz vorerst bei b*coop (siehe Impressum).
    organizationAddress: "c/o b*coop, Vintlerstraße 34, 39042 Brixen",
    location: { lat: 46.68, lng: 11.42 },
    image: "/projects/vorfahrt-fuer-den-igel-foto.webp",
    supporters: 0,
    supportedBy: "Amt für Natur – Autonome Provinz Bozen",
    whyItMatters:
      "Der Igel ist beliebt, scheint in Südtirol aber immer seltener zu werden. Belegen lässt sich das bisher nicht: Zu den heimischen Beständen gibt es keine konkreten Daten. Mit gezielten, standardisierten Erhebungen wollen wir diese Lücke schließen und dabei ein spannendes Rätsel lösen: Leben in Südtirol beide europäischen Igelarten? Neben dem in Europa weit verbreiteten Braunbrustigel (Erinaceus europaeus) ist hier auch der Nördliche Weißbrustigel (Erinaceus roumanicus) zu erwarten, denn er wurde in den östlichen Nachbarländern und -regionen bereits nachgewiesen.",
    impact: [
      { value: "1", label: "mögliche neue Säugetierart für Südtirol" },
      { value: "50+", label: "igelfreundliche Schulen" },
      { value: "50+", label: "Igel-Straßen" },
      { value: "Schirmart", label: "wer den Igel schützt, fördert viele weitere Arten" }
    ],
    monitoring: {
      species: "Braunbrustigel und Nördlicher Weißbrustigel; mitprofitierend Kleinsäuger, Insekten und Regenwürmer",
      surveys: "Standardisierte Bestandserhebungen, ergänzt durch Citizen-Science-Meldungen",
      reporting: "Noch festzulegen",
      summary: "Die Erhebungen sollen erstmals belastbare Zahlen zum Igelbestand liefern und zeigen, ob und wo in Südtirol die Verbreitungsgrenze zwischen den beiden Igelarten verläuft. Der Berichtsrhythmus wird mit der Trägerorganisation noch festgelegt."
    }
  }
];

const projectTranslations: Record<Exclude<Locale, "de">, Record<string, Partial<Project>>> = {
  it: {
    "widumwiese-kiens": {
      title: "Prato della canonica di Chienes",
      summary: "Il prato presso la canonica viene valorizzato dal punto di vista ecologico per creare habitat per uccelli, ricci, anfibi, insetti e altri esseri viventi.",
      municipality: "Chienes",
      organization: "Da chiarire",
      whyItMatters: "La canonica di Chienes si trova in una posizione idilliaca ai margini del paese, vicino ai campi e al bosco. Il suo grande giardino è un prato da sfalcio con alcuni grandi meli di antiche varietà e una siepe composta principalmente da arbusti non autoctoni. Quest’area offre un grande potenziale per una valorizzazione semplice ma ecologicamente preziosa, in una zona dove l’edificazione e l’intensificazione hanno lasciato poco spazio alla natura.",
      description: "L’area viene valorizzata dal punto di vista ecologico con interventi piccoli ma efficaci. Si piantano alcuni meli aggiuntivi, si rimuovono gli arbusti non autoctoni e si piantano arbusti autoctoni su due file. Si realizzano un piccolo stagno, un habitat per gli insetti con un’isola per le api selvatiche e un angolo selvatico per i ricci e altri esseri viventi. La nuova siepe offre cibo e siti di nidificazione agli uccelli. Il piccolo stagno crea habitat per libellule, anfibi e altri organismi acquatici. Con questo progetto rispondiamo all’incarico della diocesi di custodire e promuovere il creato.",
      impact: [
        { value: "1", label: "siepe per uccelli e piccoli mammiferi" },
        { value: "1", label: "angolo selvatico per ricci e altri esseri viventi" },
        { value: "1", label: "stagno per organismi acquatici" },
        { value: "1", label: "piccolo paradiso per gli insetti" }
      ],
      monitoring: {
        species: "Uccelli, ricci, anfibi, libellule, api selvatiche e altri insetti",
        surveys: "Da definire",
        reporting: "Da definire",
        summary: "Il programma di osservazione sarà definito durante la successiva pianificazione del progetto."
      }
    },
    "millander-au-erweiterung": {
      title: "Millander Au – Ampliamento",
      summary: "La Millander Au presso Bressanone deve crescere di un ex meleto: stagno, prato umido e siepi per circa 130 specie di uccelli all’anno.",
      description: "A nord del biotopo esistente di circa 4,5 ettari si trova un ex meleto a coltivazione intensiva. Diventerà un grande stagno con canneto, un prato umido inondato in caso di piena, fasce di siepi, isole di ontani e un corso d’acqua a meandri. Pareti ripide di argilla e sabbia offriranno cavità di nidificazione a gruccione, topino e martin pescatore; una torre panoramica sull’argine dell’Isarco, una parete di osservazione e un capanno renderanno il biotopo fruibile con discrezione. Altri proprietari hanno messo in prospettiva i loro terreni per l’ampliamento.",
      whyItMatters: "La Millander Au è ciò che resta di un paesaggio golenale che un tempo occupava l’intera piana fluviale da Bressanone ad Albes. Nel 1988 è stata salvata all’ultimo momento dall’uso come discarica di macerie e posta sotto tutela. Con fronti di maltempo sulla cresta alpina principale è una sosta vitale per gli uccelli migratori: qui vengono rilevate circa 130 specie all’anno, di cui 30–35 nidificanti. La particella vicina rinaturalizzata nel 2026 mostra quanto rapidamente i nuovi habitat vengano colonizzati.",
      municipality: "Bressanone",
      organization: "Stiftung Landschaft Südtirol",
      organizationAddress: "Casa Walther, Via Sciliar 1, 39100 Bolzano, Alto Adige",
      beforeAfter: {
        before: "/projects/millander-au-heute.webp",
        after: "/projects/millander-au-vision-v9.webp",
      afterScaleY: 1.108,
      afterAlignment: [
        { source: 0.022222, target: 0.000000 },
        { source: 0.124444, target: 0.111111 },
        { source: 0.224444, target: 0.222222 },
        { source: 0.276667, target: 0.277778 },
        { source: 0.326667, target: 0.333333 },
        { source: 0.424444, target: 0.444444 },
        { source: 0.527778, target: 0.555556 },
        { source: 0.625556, target: 0.666667 },
        { source: 0.680000, target: 0.722222 },
        { source: 0.727778, target: 0.777778 },
        { source: 0.860000, target: 0.888889 },
        { source: 1.000000, target: 1.000000 },
      ],
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
      supportedBy: "Ufficio Natura – Provincia autonoma di Bolzano",
      monitoring: {
        species: "Uccelli migratori e nidificanti; ne beneficiano anche anfibi, libellule e altri insetti",
        surveys: "Osservazione ornitologica continua di AuRaum, hyla e AVK Südtirol",
        reporting: "Da definire",
        summary: "La lista annuale delle specie del biotopo e i rilievi sulla particella rinaturalizzata nel 2026 mostrano se i nuovi stagni, prati umidi e siepi raggiungono le specie target. La cadenza dei rapporti sarà concordata con il gruppo di lavoro."
      }
    },
    "meine-gemeinde-meine-natur": {
      title: "Il mio comune, la mia natura",
      organizationAddress: "c/o b*coop, Via Vintler 34, 39042 Bressanone",
      gallery: [
        { src: "/projects/meine-gemeinde-meine-natur-herde-hang.webp", alt: "Pastore con cane da pastore e un gregge di capre e pecore su un ripido pendio erboso", caption: "Il pastore, il suo cane e il gregge di pecore e capre su un pendio ripido." },
        { src: "/projects/meine-gemeinde-meine-natur-ziegen-weg.webp", alt: "Capre su un sentiero tra recinzioni di legno, dietro il pastore e le montagne", caption: "In cammino con il gregge: capre su un sentiero tra recinzioni di legno." },
        { src: "/projects/meine-gemeinde-meine-natur-herde-winter.webp", alt: "Capre e pecore su una strada accanto a cataste di tronchi, ai lati c’è neve", caption: "Il gregge è in cammino anche d’inverno." },
        { src: "/projects/meine-gemeinde-meine-natur-hirte-schnee.webp", alt: "Il pastore con il suo cane davanti al gregge su un terreno innevato", caption: "Il pastore con il cane e il gregge nella neve." },
        { src: "/projects/meine-gemeinde-meine-natur-mahd.webp", alt: "Vista oltre una falciatrice su un’area con erba alta, sullo sfondo lavora un’altra persona", caption: "Il prato umido ricco di specie viene falciato per contrastarne l’abbandono e far arretrare la tifa che lo sta invadendo." },
        { src: "/projects/meine-gemeinde-meine-natur-rechen.webp", alt: "Una persona rastrella l’erba tagliata su un’area falciata", caption: "L’erba tagliata viene raccolta con il rastrello." },
        { src: "/projects/meine-gemeinde-meine-natur-maehgut.webp", alt: "Prato falciato con un cumulo di erba tagliata, dietro bosco e una linea elettrica", caption: "Dopo lo sfalcio l’erba tagliata viene raccolta in cumuli." },
        { src: "/projects/meine-gemeinde-meine-natur-gemaehte-flaeche.webp", alt: "Area falciata con file e cumuli di erba tagliata davanti a boschetti", caption: "L’area falciata alla fine della giornata di lavoro." },
        { src: "/projects/meine-gemeinde-meine-natur-haufen-waldrand.webp", alt: "Cumulo di erba tagliata al margine del bosco", caption: "Cumulo di erba tagliata al margine dell’area." }
      ],
      summary: "Scoprire e curare i biotopi dietro casa: un gregge di pecore e capre mantiene aperti prati aridi e pascoli magri in Valle Isarco.",
      description: "Avviciniamo bambini e adulti all’importanza di questi habitat con attività in cui scoprono di persona la biodiversità del luogo. Conserviamo e promuoviamo la biodiversità collaborando con pastori e pastore professionisti che pascolano questi habitat con i loro animali secondo la tradizione. Dove necessario interveniamo a mano, per esempio rimuovendo arbusti e alberi, per recuperare un paesaggio culturale ricco di specie.",
      whyItMatters: "In quasi ogni località dell’Alto Adige si trovano habitat naturali e seminaturali che ospitano comunità rare e minacciate e sono perciò tutelati come biotopo o monumento naturale. Queste aree si trovano spesso nelle immediate vicinanze dei paesi e sono state create e mantenute dall’uomo, per lo più attraverso il pascolo guidato. Negli ultimi decenni il pascolo è però stato spesso abbandonato e questi habitat preziosi si stanno imboschendo. Un prato arido ricco di fiori e di insetti può così essere invaso da arbusti e alberi nel giro di pochi anni.",
      municipality: "Chiusa, Naz-Sciaves",
      sites: [
        { name: "Raier Moos (Rasa)", municipality: "Naz-Sciaves" },
        { name: "Gudon", municipality: "Chiusa" },
        { name: "Monastero di Sabiona", municipality: "Chiusa" }
      ],
      impact: [
        { value: "4", label: "prati e pascoli ricchi di specie" },
        { value: "30 + 10", label: "pecore e capre" },
        { value: "40+", label: "specie vegetali" },
        { value: "Animali rari", label: "molte specie animali rare" }
      ],
      supportedBy: "Ufficio Natura – Provincia autonoma di Bolzano",
      monitoring: {
        species: "Da definire",
        surveys: "Da definire",
        reporting: "Da definire",
        summary: "Il programma di monitoraggio sarà definito insieme all’organizzazione promotrice. Fino ad allora qui non compare alcun dato che non potrebbe essere mantenuto."
      }
    },
    "vorfahrt-fuer-den-igel": {
      title: "Precedenza al riccio",
      organizationAddress: "c/o b*coop, Via Vintler 34, 39042 Bressanone",
      summary: "Un progetto per la tutela e lo studio del nostro vicino selvatico: rilievi sulla popolazione, una campagna di sensibilizzazione e «strade dei ricci» che collegano i giardini.",
      description: "Verifichiamo se il riccio orientale è presente anche in Alto Adige e dove passa il limite del suo areale. Allo stesso tempo, con un’ampia campagna richiamiamo l’attenzione sul riccio e sul suo habitat: con attività di citizen science, laboratori, media analogici e digitali e idee creative per raggiungere quante più persone possibile. E agiamo in concreto: le «strade dei ricci» collegano giardini e altri habitat perché il riccio possa muoversi liberamente, e le scuole amiche del riccio gli offrono ulteriore spazio. Ne beneficiano anche molte altre specie: come specie ombrello, il riccio porta con sé numerose altre piante e animali.",
      whyItMatters: "Il riccio è molto amato, ma in Alto Adige sembra diventare sempre più raro. Finora però non è possibile dimostrarlo: sulle popolazioni locali mancano dati concreti. Con rilevamenti mirati e standardizzati vogliamo colmare questa lacuna e risolvere un enigma affascinante: in Alto Adige vivono entrambe le specie europee di riccio? Oltre al riccio europeo (Erinaceus europaeus), diffuso in tutta Europa, qui è atteso anche il riccio orientale (Erinaceus roumanicus), già documentato nei Paesi e nelle regioni confinanti a est.",
      municipality: "In tutto l’Alto Adige",
      impact: [
        { value: "1", label: "possibile nuova specie di mammifero per l’Alto Adige" },
        { value: "50+", label: "scuole amiche del riccio" },
        { value: "50+", label: "«strade dei ricci»" },
        { value: "Specie ombrello", label: "chi protegge il riccio favorisce molte altre specie" }
      ],
      supportedBy: "Ufficio Natura – Provincia autonoma di Bolzano",
      monitoring: {
        species: "Riccio europeo occidentale e riccio orientale; ne beneficiano anche micromammiferi, insetti e lombrichi",
        surveys: "Rilievi standardizzati della popolazione, integrati da segnalazioni di citizen science",
        reporting: "Da definire",
        summary: "I rilievi forniranno per la prima volta dati attendibili sulla popolazione di ricci e mostreranno se e dove in Alto Adige passi il limite di areale tra le due specie. La cadenza dei rapporti sarà definita insieme all’organizzazione promotrice."
      }
    }
  },
  en: {
    "widumwiese-kiens": {
      title: "Widum meadow in Kiens",
      summary: "The meadow beside the parish house will be enhanced ecologically to create habitat for birds, hedgehogs, amphibians, insects and other wildlife.",
      organization: "To be clarified",
      whyItMatters: "The parish house in Kiens sits in an idyllic spot on the edge of the village, close to fields and woodland. Its large garden is a hay meadow with several tall apple trees of old varieties and a hedge made up mainly of non-native shrubs. This area offers considerable potential for straightforward yet ecologically valuable improvements in a place where development and intensive land use have left little space for nature.",
      description: "Small but effective measures will enhance the area ecologically. Several additional apple trees will be planted, non-native shrubs removed and native shrubs planted in a double row. A small pond, an insect habitat with an area for wild bees, and a wild corner for hedgehogs and other wildlife will be created. The new hedge will provide food and nesting sites for birds. The small pond will create habitat for dragonflies, amphibians and other aquatic organisms. Through this project we fulfil the diocese’s call to preserve and nurture creation.",
      impact: [
        { value: "1", label: "hedge for birds and small mammals" },
        { value: "1", label: "wild corner for hedgehogs and other wildlife" },
        { value: "1", label: "pond for aquatic wildlife" },
        { value: "1", label: "small paradise for insects" }
      ],
      monitoring: {
        species: "Birds, hedgehogs, amphibians, dragonflies, wild bees and other insects",
        surveys: "To be defined",
        reporting: "To be defined",
        summary: "The monitoring programme will be defined during further project planning."
      }
    },
    "millander-au-erweiterung": {
      title: "Millander Au – Expansion",
      summary: "The Millander Au near Brixen is to grow by a former apple orchard: pond, wet meadow and hedgerows for around 130 bird species a year.",
      description: "North of the existing 4.5-hectare reserve lies a former intensively farmed apple orchard. It is to become a large reed-fringed pond, a wet meadow that floods at high water, strips of hedgerow, alder islands and a meandering watercourse. Steep banks of clay and sand will give bee-eaters, sand martins and kingfishers nesting burrows; an observation tower on the Eisack embankment, a viewing screen and a hide will open the reserve to visitors without disturbing it. Further landowners have offered their plots for the expansion.",
      whyItMatters: "The Millander Au is what remains of a floodplain that once covered the entire river landscape from Brixen to Albeins. In 1988 it was saved at the last moment from becoming a rubble dump and placed under protection. When bad weather sits over the main Alpine ridge it is a vital stopover for migrating birds: around 130 species are recorded here each year, 30 to 35 of which breed in the reserve. The neighbouring plot restored in 2026 shows how quickly new habitats are taken up.",
      municipality: "Brixen",
      organization: "Stiftung Landschaft Südtirol",
      organizationAddress: "Waltherhaus, Schlernstraße 1, 39100 Bolzano / Bozen, South Tyrol",
      beforeAfter: {
        before: "/projects/millander-au-heute.webp",
        after: "/projects/millander-au-vision-v9.webp",
      afterScaleY: 1.108,
      afterAlignment: [
        { source: 0.022222, target: 0.000000 },
        { source: 0.124444, target: 0.111111 },
        { source: 0.224444, target: 0.222222 },
        { source: 0.276667, target: 0.277778 },
        { source: 0.326667, target: 0.333333 },
        { source: 0.424444, target: 0.444444 },
        { source: 0.527778, target: 0.555556 },
        { source: 0.625556, target: 0.666667 },
        { source: 0.680000, target: 0.722222 },
        { source: 0.727778, target: 0.777778 },
        { source: 0.860000, target: 0.888889 },
        { source: 1.000000, target: 1.000000 },
      ],
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
      supportedBy: "Nature Office – Autonomous Province of Bolzano",
      monitoring: {
        species: "Migrating and breeding birds; amphibians, dragonflies and other insects also benefit",
        surveys: "Ongoing bird monitoring by AuRaum, hyla and AVK Südtirol",
        reporting: "To be defined",
        summary: "The reserve’s annual species list and the records from the plot restored in 2026 show whether the new ponds, wet meadows and hedgerows reach the target species. The reporting cycle is still to be agreed with the working group."
      }
    },
    "meine-gemeinde-meine-natur": {
      title: "My municipality, my nature",
      gallery: [
        { src: "/projects/meine-gemeinde-meine-natur-herde-hang.webp", alt: "Shepherd with herding dog and a flock of goats and sheep on a steep grassy slope", caption: "The shepherd, his herding dog and the flock of sheep and goats on a steep slope." },
        { src: "/projects/meine-gemeinde-meine-natur-ziegen-weg.webp", alt: "Goats on a path between wooden fences, with the shepherd and mountains behind", caption: "On the move with the flock: goats on a path between wooden fences." },
        { src: "/projects/meine-gemeinde-meine-natur-herde-winter.webp", alt: "Goats and sheep on a track beside stacked logs, with snow at the edges", caption: "The flock is on the move in winter too." },
        { src: "/projects/meine-gemeinde-meine-natur-hirte-schnee.webp", alt: "The shepherd with his herding dog in front of the flock on snow-covered ground", caption: "The shepherd with dog and flock in the snow." },
        { src: "/projects/meine-gemeinde-meine-natur-mahd.webp", alt: "View over a mower onto a patch of tall vegetation, with another person working in the background", caption: "The species-rich fen meadow is mown to slow its abandonment and push back the encroaching bulrush." },
        { src: "/projects/meine-gemeinde-meine-natur-rechen.webp", alt: "A person raking cut vegetation on a mown area", caption: "The cuttings are raked together." },
        { src: "/projects/meine-gemeinde-meine-natur-maehgut.webp", alt: "Mown meadow with a pile of cuttings, woodland and a power line behind", caption: "After mowing, the cuttings are gathered into piles." },
        { src: "/projects/meine-gemeinde-meine-natur-gemaehte-flaeche.webp", alt: "Mown area with rows and piles of cuttings in front of trees and shrubs", caption: "The mown area at the end of the work day." },
        { src: "/projects/meine-gemeinde-meine-natur-haufen-waldrand.webp", alt: "Pile of cuttings at the edge of the woods", caption: "A pile of cuttings at the edge of the site." }
      ],
      summary: "Discovering and caring for the biotopes on our doorstep: a flock of sheep and goats keeps dry grasslands and poor pastures in the Eisack Valley open.",
      description: "We bring the importance of these habitats closer to children and adults alike through activities in which they discover the habitat’s biodiversity for themselves. We preserve and promote biodiversity by working with professional shepherds who graze these habitats with their livestock in the traditional way. Where necessary, we carry out management work by hand, such as removing shrubs and trees, to restore species-rich cultural landscape.",
      whyItMatters: "In almost every village in South Tyrol there are natural and semi-natural habitats that harbour rare and endangered communities and are therefore protected as biotopes or natural monuments. These areas often lie right next to the settlements and were mostly created and maintained by people through managed grazing. Over recent decades grazing has frequently been abandoned, and these valuable habitats are turning to scrub. A flower-rich dry grassland full of insects can be overgrown by shrubs and trees within a few years.",
      municipality: "Klausen, Natz-Schabs",
      sites: [
        { name: "Raier Moos", municipality: "Natz-Schabs" },
        { name: "Gufidaun", municipality: "Klausen" },
        { name: "Säben Abbey", municipality: "Klausen" }
      ],
      impact: [
        { value: "4", label: "species-rich meadows and pastures" },
        { value: "30 + 10", label: "sheep and goats" },
        { value: "40+", label: "plant species" },
        { value: "Rare animals", label: "many rare animal species" }
      ],
      supportedBy: "Nature Office – Autonomous Province of Bolzano",
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
      description: "We are finding out whether the northern white-breasted hedgehog also occurs in South Tyrol and where the edge of its range lies. At the same time, a broad campaign draws attention to the hedgehog and its habitat: citizen science activities, workshops, analogue and digital media and creative ideas that reach as many people as possible. And we take concrete action: hedgehog highways link gardens and other habitats so the hedgehog can move freely, and hedgehog-friendly schools give it additional space. Many other species benefit too, because as an umbrella species the hedgehog brings numerous other plants and animals along with it.",
      whyItMatters: "The hedgehog is much loved, yet it seems to be getting rarer in South Tyrol. So far this cannot be proven: there are no concrete data on local populations. With targeted, standardised surveys we want to close this gap and solve an intriguing puzzle along the way: do both European hedgehog species live in South Tyrol? Besides the European hedgehog (Erinaceus europaeus), widespread across Europe, the northern white-breasted hedgehog (Erinaceus roumanicus) is also expected here, as it has already been recorded in neighbouring countries and regions to the east.",
      municipality: "South Tyrol-wide",
      impact: [
        { value: "1", label: "possible new mammal species for South Tyrol" },
        { value: "50+", label: "hedgehog-friendly schools" },
        { value: "50+", label: "hedgehog highways" },
        { value: "Umbrella species", label: "protecting the hedgehog benefits many other species" }
      ],
      supportedBy: "Nature Office – Autonomous Province of Bolzano",
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
