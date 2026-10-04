/**
 * Texte der Methodik-Seite. Die Vergleichswerte stehen als Platzhalter
 * `{co2}`, `{water}` und `{energy}` im Text und kommen zur Laufzeit aus
 * `referenceValues` im Rechner, damit Seite und Rechnung nicht auseinanderlaufen.
 */

const sources = {
  ispraPower: "https://www.isprambiente.gov.it/it/pubblicazioni/rapporti/settore-elettrico-emissioni-di-co2-e-altri-impatti-edizione-2026",
  iso52016: "https://www.iso.org/standard/65696.html",
  energyReport: "https://news.provinz.bz.it/it/news/energy-report-2024-migliora-l-efficienza-energetica-calo-dei-costi",
  arera: "https://www.arera.it/bolletta/glossario-dei-termini/dettaglio/potere-calorifico-superiore-convenzionale-p",
  ispraFuels: "https://www.assolombarda.it/servizi/ambiente/informazioni/ets-tabella-parametri-standard-nazionali",
  taxonomy: "https://eur-lex.europa.eu/eli/reg_del/2021/2139/2026-01-01/eng",
  legionella: "https://edoc.rki.de/bitstream/handle/176904/11930/EB-33-2024-Legionellen.pdf?sequence=1",
  terna: "https://download.terna.it/terna/08_TAVOLE_elettricita_nelle_regioni_8de5cddcf9e8f90.pdf",
  astatPopulation: "https://astat.provinz.bz.it/de/bevoelkerung",
  standby: "https://eur-lex.europa.eu/eli/reg/2023/826/oj",
  lighting: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019R2020",
  ecolabelTaps: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32013D0250",
  ecolabelToilets: "https://eur-lex.europa.eu/eli/dec/2017/175/2023-03-30/eng",
  istatWater: "https://www.istat.it/comunicato-stampa/le-statistiche-dellistat-sullacqua-anni-2020-2023/",
  iso14046: "https://www.iso.org/standard/43263.html",
  waterPlan: "https://umwelt.provinz.bz.it/downloads/04_WNP_BZ_Teil_2_Ziele_und_Kriterien_der_Nutzung_22.06.2017.pdf",
  poore: "https://pubmed.ncbi.nlm.nih.gov/29853680/",
  scarborough: "https://doi.org/10.1038/s43016-023-00795-w",
  weber: "https://pubmed.ncbi.nlm.nih.gov/18546681/",
  forbes: "https://openaccess.city.ac.uk/id/eprint/37734/",
  fao: "https://www.fao.org/sustainable-food-value-chains/library/details/en/c/266219/",
  eeaTextiles: "https://www.eea.europa.eu/en/circularity/sectoral-modules/textiles/greenhouse-gas-emissions-from-eus-textiles-consumption",
  klooster: "https://doi.org/10.55845/ZZUG7076",
  pef: "https://environment.ec.europa.eu/news/new-eu-rules-measuring-environmental-impact-clothes-and-shoes-2025-06-25_en",
  ispraRoad: "https://www.isprambiente.gov.it/en/databases/data-base-collection/air-and-atmospheric-emissions/emissions-in-atmosphere",
  ipcc: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  eeaTrain: "https://www.eea.europa.eu/en/analysis/publications/transport-and-environment-report-2020",
  icao: "https://www.icao.int/environmental-protection/environmental-tools/icec",
  lee: "https://repository.library.noaa.gov/view/noaa/45026",
  unep: "https://wedocs.unep.org/xmlui/bitstream/handle/20.500.11822/39972/Lifestyles_climate.pdf",
  jrc: "https://eplca.jrc.ec.europa.eu/sustainableConsumption.html",
  iso14040: "https://www.iso.org/standard/38498.html",
  iso14067: "https://www.iso.org/standard/71206.html",
  ghg: "https://ghgprotocol.org/product-standard",
  ipbes: "https://doi.org/10.5281/zenodo.3831673",
  baldock: "https://pubmed.ncbi.nlm.nih.gov/25673686/",
  pardee: "https://doi.org/10.1007/s11252-014-0349-0"
} as const;

export const methodologyCopy = {
  de: {
    metaTitle: "Methodik & Quellen",
    metaDescription: "Bilanzgrenzen, Rechenweg, Datenquellen und Unsicherheiten des Lebensraum-Checks für CO₂, Wasser, Energie und Biodiversität.",
    eyebrow: "Methodik · Modell 0.3",
    title: "So entstehen die Werte im Lebensraum-Check",
    lead: "Jede angezeigte Zahl folgt aus deiner Eingabe, einem offen gelegten Faktor und einer klaren Bilanzgrenze. Diese Seite zeigt, welche Werte amtlich oder wissenschaftlich verankert sind — und wo der Rechner bewusst mit einer vereinfachten Annahme arbeitet.",
    status: "Quellenstand: Oktober 2026 · Ergebnisse gerundet · keine geprüfte Individualbilanz",
    principles: [
      ["Orientierung statt Ökobilanz", "Der Check macht Größenordnungen und wirksame Entscheidungen sichtbar. Er ersetzt weder eine Gebäudeenergieberatung noch eine individuelle Lebenszyklusanalyse."],
      ["Pro Person und Jahr", "Alle Mengen beziehen sich auf eine Person und ein Jahr. Bei Strom, Wärme und gemeinsam genutzten Flächen muss der Haushaltswert deshalb durch die Zahl der Personen geteilt werden."],
      ["Explizite Systemgrenzen", "CO₂e umfasst Vorketten nur dort, wo der genannte Faktor sie enthält. Wasser zählt Leitungswasser; Energie den direkt zugeordneten Einsatz einschließlich Wasserbereitstellung und Verkehr."],
      ["Keine Scheingenauigkeit", "Ergebnisse werden gerundet. Regionale Pauschalen und Nutzungsannahmen sind ausdrücklich als Modellannahmen markiert."]
    ],
    boundariesEyebrow: "Bilanzgrenzen",
    boundariesTitle: "Drei Zahlen, drei bewusst verschiedene Grenzen",
    boundariesCopy: "Eine Grenze entscheidet, was eine Kennzahl aussagt. CO₂e, Leitungswasser und zugeordneter Energieeinsatz werden deshalb nicht zu einem einzigen Umweltscore verrechnet.",
    notIncluded: "Nicht enthalten",
    boundaries: [
      { metric: "CO₂e", unit: "kg pro Jahr", scope: "Emissionen der abgefragten Aktivitäten; vorgelagerte Emissionen nur, soweit sie im jeweiligen Faktor ausdrücklich enthalten sind.", excluded: "Kein vollständiger persönlicher Fußabdruck: Wohnungsbau, zahlreiche Konsumgüter, öffentliche Infrastruktur und weitere Lebensbereiche fehlen." },
      { metric: "Trinkwasser", unit: "Liter pro Jahr", scope: "Direktes Leitungswasser für Dusche, Warmwasser, Toilettenspülung und Gartenbewässerung.", excluded: "Virtuelles Wasser in Lebensmitteln, Energie und Kleidung bleibt draußen und wird nicht mit Leitungswasser vermischt." },
      { metric: "Energieeinsatz", unit: "kWh pro Jahr", scope: "Den abgefragten Aktivitäten zugeordneter Strom, Wärme- und Kraftstoffeinsatz sowie Energie für Wasserbereitstellung.", excluded: "Graue Energie von Gebäuden und Produkten wird nicht addiert; ihre Klimawirkung kann teilweise im CO₂e-Faktor stecken." }
    ],
    evidenceEyebrow: "Evidenz je Rechenbereich",
    evidenceTitle: "Vom Datenanker zur Zahl im Rechner",
    evidenceCopy: "Datenanker stammen direkt aus amtlichen Daten oder Publikationen. Abgeleitete Werte folgen einer physikalischen Rechnung. Modellannahmen verdichten eine Bandbreite zu einem handhabbaren Faktor.",
    statusLabels: { anchor: "Datenanker", derived: "Abgeleitet", assumption: "Modellannahme" },
    evidence: [
      {
        title: "Wohnen, Strom und Warmwasser",
        intro: "Die physikalischen Umrechnungen sind direkt; Gebäudebedarf und Nutzung bleiben vereinfachte Annahmen.",
        items: [
          {
            title: "Stromerzeugung Italien · 0,214 kg CO₂/kWh",
            status: "anchor",
            copy: "Als fester location-based Faktor wird der vorläufige ISPRA-Wert für 2025 verwendet. Er beschreibt direkte Emissionen der italienischen Stromerzeugung, nicht den vollständigen Lebenszyklus und keinen individuellen Ökostromvertrag.",
            sources: [{ label: "ISPRA: Emissionen des italienischen Stromsektors, Ausgabe 2026", href: sources.ispraPower }]
          },
          {
            title: "Raumwärme · persönlicher Abrechnungswert",
            status: "anchor",
            copy: "Statt eines pauschalen Gebäudemodells verwendet der Check den persönlichen Anteil am gemessenen Jahresverbrauch. Damit gehen Gebäudezustand, Wohnfläche, Wetter und Verhalten gemeinsam ein. Der Nutzer ordnet das Heizsystem zu; unbekannte und lokale Wärmenetze bleiben eine Unsicherheit. Gas- und Ölrechnungen nennen Smc und Liter statt kWh: Der Check rechnet mit 10,7 kWh je Smc (ARERA-Bezugswert) und rund 10 kWh je Liter Heizöl (ISPRA-Heizwert bei 0,84 kg/l).",
            sources: [
              { label: "ISO 52016-1: Berechnung von Heiz- und Kühlenergiebedarf", href: sources.iso52016 },
              { label: "Land Südtirol: Energy Report 2024", href: sources.energyReport },
              { label: "ARERA: konventioneller oberer Heizwert von Erdgas", href: sources.arera },
              { label: "MASE/ISPRA: nationale Standardparameter, Heizöl", href: sources.ispraFuels }
            ]
          },
          {
            title: "Warmwasser · 0,0302 kWh je Liter",
            status: "derived",
            copy: "Der Wert folgt aus der Wärmekapazität von Wasser und einer Erwärmung von 12 auf 38 °C. Gas, Öl, Wärmepumpe und emissionsarme Wärme werden getrennt gerechnet. Die pauschale Leistungszahl und Netzfaktoren bleiben Modellannahmen. Speichertemperaturen dürfen wegen des Legionellenrisikos nicht pauschal abgesenkt werden.",
            sources: [
              { label: "EU-Taxonomie: 38 °C als Referenztemperatur für Duscharmaturen", href: sources.taxonomy },
              { label: "RKI/UBA: Trinkwassertemperaturen und Legionellen, 2024", href: sources.legionella }
            ]
          },
          {
            title: "Haushaltsstrom, Standby und Beleuchtung",
            status: "anchor",
            copy: "Der Jahreswert aus der Stromrechnung enthält Kühlgeräte, Kochen, Waschen, Spülen, Beleuchtung und Unterhaltungselektronik. Standby und Lampen werden deshalb nur qualitativ beurteilt und nicht nochmals addiert. 1 Watt Dauerlast entspricht zur Einordnung 8,76 kWh im Jahr. „Mittlerer Verbrauch“ und „Weiß ich nicht“ stehen auf rund 950 kWh pro Person: 510,7 GWh Haushaltsstrom in der Provinz Bozen 2024 geteilt durch 539.679 Einwohner.",
            sources: [
              { label: "Terna: Elettricità nelle regioni 2024, Verbrauch der Haushalte nach Provinz", href: sources.terna },
              { label: "ASTAT: Bevölkerung Südtirols", href: sources.astatPopulation },
              { label: "EU 2023/826: Aus-, Bereitschafts- und Netzwerkbetrieb", href: sources.standby },
              { label: "EU 2019/2020: Ökodesign für Lichtquellen", href: sources.lighting }
            ]
          }
        ]
      },
      {
        title: "Wasser im Haushalt und Garten",
        intro: "Gezählt wird die Menge am Hahn. Ein Wasserfußabdruck von Produkten ist eine andere Kennzahl und bleibt bewusst getrennt.",
        items: [
          {
            title: "Dusche und Toilette",
            status: "anchor",
            copy: "Der Rechner spannt 6,5–13 Liter pro Duschminute und 3,5–9 Liter pro Spülung auf. Die EU setzt für wassersparende Armaturen 8 Liter pro Minute und für effiziente Toiletten höchstens 4,5 Liter je Spülung als belastbare Vergleichspunkte.",
            sources: [
              { label: "EU-Ecolabel 2013/250/EU: Sanitärarmaturen", href: sources.ecolabelTaps },
              { label: "EU-Ecolabel für Beherbergungsbetriebe: effiziente Toiletten", href: sources.ecolabelToilets }
            ]
          },
          {
            title: "Vergleichswert · 214 Liter pro Person und Tag",
            status: "anchor",
            copy: "Der volle italienische Vergleichswert entspricht der 2022 von den kommunalen Netzen abgegebenen Trinkwassermenge. Der Check selbst bildet nur die abgefragten Teilbereiche ab und verwendet deshalb einen niedrigeren internen Vergleichswert.",
            sources: [{ label: "ISTAT: Statistiken zum Wasser 2020–2023", href: sources.istatWater }]
          },
          {
            title: "Leitungswasser · 0,5 kWh/m³",
            status: "assumption",
            copy: "Für Förderung, Aufbereitung und Verteilung wird ein pauschaler Strombedarf angesetzt. Lokale Höhenlage, Rohwasserqualität, Netzverluste und Abwasserbehandlung können den tatsächlichen Wert deutlich verändern; Abwasserenergie ist nicht enthalten.",
            sources: [{ label: "ISO 14046: Grundsätze und Anforderungen an Wasserfußabdrücke", href: sources.iso14046 }]
          },
          {
            title: "Garten · 150 bzw. 30 Liter/m² im Jahr",
            status: "assumption",
            copy: "Die Werte bilden einen trockenen Südtiroler Sommer ab: Rasen erhält 150 mm Zusatzwasser, ein standortangepasstes Beet 30 mm. Der Südtiroler Wassernutzungsplan nennt 300 mm als mittleren Bewässerungsbedarf über eine Vegetationsperiode; Gartenart und Mikroklima bleiben entscheidend.",
            sources: [{ label: "Land Südtirol: Wassernutzungsplan, Ziele und Kriterien", href: sources.waterPlan }]
          }
        ]
      },
      {
        title: "Ernährung und Textilien",
        intro: "Hier zählen Lebenszyklusemissionen. Die große Streuung zwischen Produkten wird zu wenigen verständlichen Klassen verdichtet.",
        items: [
          {
            title: "Ernährung · 950 kg Sockel plus Fleischaufschlag",
            status: "assumption",
            copy: "Der lineare Aufschlag von 105 kg CO₂e je zusätzlicher wöchentlicher Fleischmahlzeit ist eine didaktische Verdichtung, kein publizierter Universalwert. Grundlage sind Lebenszyklusdaten, die besonders große Unterschiede zwischen tierischen und pflanzlichen Produkten sowie zwischen Erzeugern zeigen.",
            sources: [
              { label: "Poore & Nemecek (2018), Science, DOI 10.1126/science.aaq0216", href: sources.poore },
              { label: "Scarborough et al. (2023), Nature Food, DOI 10.1038/s43016-023-00795-w", href: sources.scarborough }
            ]
          },
          {
            title: "Herkunft und Saison · bis 400 kg CO₂e",
            status: "assumption",
            copy: "Der Aufschlag bündelt Flugtransport, Kühlkette und beheizte Produktion; er darf nicht als pauschaler Vorteil jedes regionalen Produkts gelesen werden. Im Durchschnitt prägen Produktionsweise und Lebensmittelart den Fußabdruck stärker als die letzte Transportstrecke.",
            sources: [
              { label: "Weber & Matthews (2008), Environmental Science & Technology, DOI 10.1021/es702969f", href: sources.weber },
              { label: "Forbes et al. (2024): Review zu regionalen und saisonalen Lebensmitteln", href: sources.forbes }
            ]
          },
          {
            title: "Lebensmittelabfall · 2,5 kg CO₂e/kg",
            status: "assumption",
            copy: "Der Durchschnittsfaktor bewertet die bereits entstandene Vorkette des weggeworfenen Lebensmittels. Produktmix und Verderbsstufe verursachen eine große Bandbreite; Fleisch wiegt deutlich schwerer als Gemüse.",
            sources: [{ label: "FAO: Food Wastage Footprint – Impacts on Natural Resources", href: sources.fao }]
          },
          {
            title: "Kleidung · 15 / 9 / 3 kg CO₂e je Stück",
            status: "assumption",
            copy: "Gemittelte Stückwerte ersetzen hier keine produktspezifische Ökobilanz. Material, Gewicht, Lebensdauer, Waschen und die Frage, ob Secondhand tatsächlich einen Neukauf ersetzt, bestimmen das Ergebnis.",
            sources: [
              { label: "EEA: 355 kg CO₂e pro Person für Textilkonsum in der EU (2022)", href: sources.eeaTextiles },
              { label: "Klooster et al. (2024): LCA von Neu- und Secondhandkleidung", href: sources.klooster },
              { label: "EU Product Environmental Footprint für Kleidung und Schuhe", href: sources.pef }
            ]
          }
        ]
      },
      {
        title: "Mobilität und Reisen",
        intro: "Kilometer werden mit Verkehrsmittel- oder Fahrzeugfaktoren multipliziert. Auslastung und reale Fahrweise sind die größten Hebel der Unsicherheit.",
        items: [
          {
            title: "Auto · 0,22 kg CO₂e und 0,66 kWh/km",
            status: "assumption",
            copy: "Der Verbrenner basiert auf 6,8 Litern je 100 km, 9,7 kWh je Liter und einem gerundeten Well-to-Wheel-Faktor. Kurzstrecken erhalten einen Kaltstartaufschlag. Fahrzeuggröße, Kraftstoff und Besetzung können stärker wirken als die Rundung.",
            sources: [
              { label: "ISPRA: nationale Emissionsfaktoren des Straßenverkehrs", href: sources.ispraRoad },
              { label: "IPCC 2006 Guidelines, Band 2: Energieträger und Verbrennung", href: sources.ipcc }
            ]
          },
          {
            title: "Bahn/Fernbus · 0,035 kg CO₂e pro Personenkilometer",
            status: "assumption",
            copy: "Ein gemeinsamer Faktor hält die Auswahl einfach, obwohl Bahn und Bus je nach Strommix, Fahrzeug und Auslastung auseinanderliegen. Er dient als belastbare Größenordnung, nicht als Betreibervergleich.",
            sources: [{ label: "EEA Report 19/2020: Train or plane?", href: sources.eeaTrain }]
          },
          {
            title: "Flug · 0,25 kg CO₂e-Wirkungswert pro Personenkilometer",
            status: "assumption",
            copy: "Der pauschale Wirkungswert dient als CO₂e-Näherung und schließt einen Zuschlag für Nicht-CO₂-Effekte ein. Strecke, Flughöhe, Auslastung und Wetter verursachen eine große Bandbreite; der Wert ist keine flugspezifische Inventur.",
            sources: [
              { label: "ICAO Carbon Emissions Calculator: harmonisierte CO₂-Methodik", href: sources.icao },
              { label: "Lee et al. (2021), Atmospheric Environment, DOI 10.1016/j.atmosenv.2020.117834", href: sources.lee }
            ]
          }
        ]
      }
    ],
    comparisonEyebrow: "Vergleichswerte",
    comparisonTitle: "Ein Vergleichswert ist kein Naturgesetz",
    comparisonCopy: "Die internen Vergleichswerte von {co2} kg CO₂e, {water} Litern und {energy} kWh sind auf den abgefragten Ausschnitt kalibrierte Modellwerte. Sie entsprechen einer fest definierten mittleren Antwortkombination im Check — nicht einem amtlichen Durchschnittshaushalt.",
    comparisonNoTarget: "Der Check zeigt bewusst keine persönliche „Paris-Zielmarke“. Globale Lebensstilpfade lassen sich nicht seriös auf den unvollständigen Ausschnitt dieses Rechners übertragen. Ein Ergebnis wird nur dann gegen den internen Vergleich eingeordnet, wenn alle Fragen beantwortet wurden.",
    comparisonSources: [
      { label: "UNEP: Enabling Sustainable Lifestyles in a Climate Emergency", href: sources.unep },
      { label: "JRC: Consumption Footprint – Lebenszyklusbasierte EU-Vergleichsdaten", href: sources.jrc }
    ],
    standardsEyebrow: "Standards",
    standardsTitle: "Der methodische Rahmen hinter der vereinfachten Rechnung",
    standardsCopy: "Der Lebensraum-Check orientiert sich an diesen Standards, ist aber nicht nach ihnen zertifiziert. Eine normkonforme Ökobilanz würde Primärdaten, Sensitivitätsanalysen und eine fachliche Prüfung verlangen.",
    standards: [
      { title: "ISO 14040 und ISO 14044", copy: "Rahmen, Ziel und Untersuchungsgrenze, Sachbilanz, Wirkungsauswertung, Interpretation und transparente Berichterstattung einer Ökobilanz.", href: sources.iso14040 },
      { title: "ISO 14067", copy: "Anforderungen an die Quantifizierung und Berichterstattung des Carbon Footprint von Produkten auf Basis einer Lebenszyklusanalyse.", href: sources.iso14067 },
      { title: "GHG Protocol Product Standard", copy: "Praktischer Standard für Treibhausgasinventare über den Produktlebenszyklus, einschließlich Vorketten und transparenter Unsicherheiten.", href: sources.ghg },
      { title: "ISO 14046", copy: "Rahmen für Wasserfußabdrücke. Er erklärt auch, warum direkt entnommenes Leitungswasser und virtuelles Wasser nicht dieselbe Kennzahl sind.", href: sources.iso14046 }
    ],
    biodiversityEyebrow: "Biodiversität",
    biodiversityTitle: "Ein Wirkungsprofil, keine erfundene Artenzahl",
    biodiversityCopy: "Garten, Ernährung, Mobilität und Konsum wirken auf Lebensräume. Der Check zeigt diese Richtung qualitativ; er behauptet nicht, aus einer Haushaltsantwort eine Zahl geretteter Arten berechnen zu können.",
    biodiversityDetail: "Das Profil gewichtet beobachtbare Merkmale wie Versiegelung, heimische Pflanzen, Blühkontinuität und Niststrukturen. Die ökologische Literatur stützt die Richtung dieser Wirkungen, nicht die exakte Punktzahl. Deshalb bleibt das Profil getrennt von CO₂e, Wasser und Energie.",
    biodiversitySources: [
      { label: "IPBES (2019): Global Assessment on Biodiversity and Ecosystem Services", href: sources.ipbes },
      { label: "Baldock et al. (2015): Bedeutung urbaner Räume für bestäubende Insekten", href: sources.baldock },
      { label: "Pardee & Philpott (2014): Heimische Pflanzen und Wildbienen in Gärten", href: sources.pardee }
    ],
    careLabel: "Unsicherheit & Pflege",
    care: [
      ["Größte Unsicherheiten", "Raumwärme, Ernährungszusammensetzung, Fahrzeugauslastung, Textilart und tatsächliche Gartenbewässerung."],
      ["Interpretation", "Unterschiede zwischen Handlungsoptionen sind aussagekräftiger als die letzte Stelle des Gesamtergebnisses."],
      ["Aktualisierung", "Strommix, Vergleichswerte und Literatur werden mit einer neuen Modellversion aktualisiert; frühere Ergebnisse bleiben dadurch nachvollziehbar."]
    ]
  },
  it: {
    metaTitle: "Metodologia e fonti",
    metaDescription: "Limiti di bilancio, metodo di calcolo, fonti di dati e incertezze del check degli habitat per CO₂, acqua, energia e biodiversità.",
    eyebrow: "Metodologia · Modello 0.3",
    title: "Come nascono i valori del Check degli habitat",
    lead: "Ogni numero mostrato deriva dal tuo dato, da un fattore dichiarato e da un confine di bilancio chiaro. Questa pagina mostra quali valori poggiano su dati ufficiali o scientifici — e dove il calcolatore lavora di proposito con un’ipotesi semplificata.",
    status: "Fonti aggiornate a: ottobre 2026 · risultati arrotondati · nessun bilancio individuale certificato",
    principles: [
      ["Orientamento, non analisi del ciclo di vita", "Il check rende visibili gli ordini di grandezza e le scelte che contano. Non sostituisce né una consulenza energetica sull’edificio né un’analisi del ciclo di vita individuale."],
      ["Per persona e anno", "Tutte le quantità si riferiscono a una persona e a un anno. Per elettricità, calore e superfici condivise il valore della famiglia va quindi diviso per il numero di persone."],
      ["Confini di sistema espliciti", "La CO₂e include le emissioni a monte solo dove il fattore indicato le contiene. L’acqua conta l’acqua del rubinetto; l’energia l’uso direttamente attribuito, compresi la fornitura d’acqua e i trasporti."],
      ["Nessuna falsa precisione", "I risultati sono arrotondati. Valori forfettari regionali e ipotesi d’uso sono indicati esplicitamente come ipotesi di modello."]
    ],
    boundariesEyebrow: "Confini di bilancio",
    boundariesTitle: "Tre numeri, tre confini volutamente diversi",
    boundariesCopy: "Un confine decide che cosa dice un indicatore. Per questo CO₂e, acqua del rubinetto ed energia attribuita non vengono fusi in un unico punteggio ambientale.",
    notIncluded: "Non incluso",
    boundaries: [
      { metric: "CO₂e", unit: "kg all’anno", scope: "Emissioni delle attività richieste; emissioni a monte solo se il rispettivo fattore le include esplicitamente.", excluded: "Nessuna impronta personale completa: mancano costruzione dell’abitazione, molti beni di consumo, infrastrutture pubbliche e altri ambiti di vita." },
      { metric: "Acqua potabile", unit: "litri all’anno", scope: "Acqua del rubinetto usata direttamente per doccia, acqua calda, sciacquone e irrigazione del giardino.", excluded: "L’acqua virtuale in alimenti, energia e abbigliamento resta fuori e non viene mescolata con l’acqua del rubinetto." },
      { metric: "Uso di energia", unit: "kWh all’anno", scope: "Elettricità, calore e carburante attribuiti alle attività richieste, più l’energia per la fornitura d’acqua.", excluded: "L’energia grigia di edifici e prodotti non viene sommata; il suo effetto sul clima può essere in parte compreso nel fattore di CO₂e." }
    ],
    evidenceEyebrow: "Evidenze per ambito di calcolo",
    evidenceTitle: "Dal dato di riferimento al numero nel calcolatore",
    evidenceCopy: "I dati di riferimento provengono direttamente da dati ufficiali o pubblicazioni. I valori derivati seguono un calcolo fisico. Le ipotesi di modello condensano un intervallo in un fattore utilizzabile.",
    statusLabels: { anchor: "Dato di riferimento", derived: "Derivato", assumption: "Ipotesi di modello" },
    evidence: [
      {
        title: "Abitare, elettricità e acqua calda",
        intro: "Le conversioni fisiche sono dirette; fabbisogno dell’edificio e uso restano ipotesi semplificate.",
        items: [
          {
            title: "Produzione elettrica in Italia · 0,214 kg CO₂/kWh",
            status: "anchor",
            copy: "Come fattore fisso location-based si usa il valore provvisorio ISPRA per il 2025. Descrive le emissioni dirette della produzione elettrica italiana, non l’intero ciclo di vita né un contratto individuale di energia verde.",
            sources: [{ label: "ISPRA: Settore elettrico, emissioni di CO₂ e altri impatti, edizione 2026", href: sources.ispraPower }]
          },
          {
            title: "Riscaldamento · valore personale in bolletta",
            status: "anchor",
            copy: "Invece di un modello forfettario dell’edificio, il check usa la quota personale del consumo annuo misurato. Così stato dell’edificio, superficie, clima e comportamento entrano insieme. L’utente indica il sistema di riscaldamento; reti di calore locali o sconosciute restano un’incertezza. Le bollette di gas e gasolio indicano Smc e litri invece di kWh: il check calcola con 10,7 kWh per Smc (valore di riferimento ARERA) e circa 10 kWh per litro di gasolio da riscaldamento (potere calorifico ISPRA a 0,84 kg/l).",
            sources: [
              { label: "ISO 52016-1: calcolo del fabbisogno di energia per riscaldamento e raffrescamento", href: sources.iso52016 },
              { label: "Provincia di Bolzano: Energy Report 2024", href: sources.energyReport },
              { label: "ARERA: potere calorifico superiore convenzionale del gas naturale", href: sources.arera },
              { label: "MASE/ISPRA: parametri standard nazionali, gasolio da riscaldamento", href: sources.ispraFuels }
            ]
          },
          {
            title: "Acqua calda · 0,0302 kWh per litro",
            status: "derived",
            copy: "Il valore deriva dalla capacità termica dell’acqua e da un riscaldamento da 12 a 38 °C. Gas, gasolio, pompa di calore e calore a basse emissioni sono calcolati separatamente. Il coefficiente di prestazione forfettario e i fattori di rete restano ipotesi di modello. Le temperature degli accumuli non vanno abbassate in modo generalizzato per il rischio di legionella.",
            sources: [
              { label: "Tassonomia UE: 38 °C come temperatura di riferimento per le rubinetterie della doccia", href: sources.taxonomy },
              { label: "RKI/UBA: temperature dell’acqua potabile e legionella, 2024", href: sources.legionella }
            ]
          },
          {
            title: "Elettricità domestica, standby e illuminazione",
            status: "anchor",
            copy: "Il valore annuo della bolletta comprende frigorifero, cucina, lavatrice, lavastoviglie, illuminazione ed elettronica. Standby e lampade vengono quindi valutati solo in modo qualitativo e non sommati di nuovo. Per orientarsi: 1 watt di carico continuo corrisponde a 8,76 kWh all’anno. “Consumo medio” e “Non lo so” valgono circa 950 kWh a persona: 510,7 GWh di elettricità domestica in provincia di Bolzano nel 2024 divisi per 539.679 abitanti.",
            sources: [
              { label: "Terna: Elettricità nelle regioni 2024, consumi domestici per provincia", href: sources.terna },
              { label: "ASTAT: popolazione dell’Alto Adige", href: sources.astatPopulation },
              { label: "UE 2023/826: modo spento, standby e standby in rete", href: sources.standby },
              { label: "UE 2019/2020: progettazione ecocompatibile delle sorgenti luminose", href: sources.lighting }
            ]
          }
        ]
      },
      {
        title: "Acqua in casa e in giardino",
        intro: "Si conta la quantità al rubinetto. L’impronta idrica dei prodotti è un altro indicatore e resta volutamente separata.",
        items: [
          {
            title: "Doccia e WC",
            status: "anchor",
            copy: "Il calcolatore copre da 6,5 a 13 litri per minuto di doccia e da 3,5 a 9 litri per scarico. Per le rubinetterie a risparmio idrico l’UE fissa 8 litri al minuto e per i WC efficienti al massimo 4,5 litri per scarico come riferimenti affidabili.",
            sources: [
              { label: "Ecolabel UE 2013/250/UE: rubinetteria sanitaria", href: sources.ecolabelTaps },
              { label: "Ecolabel UE per le strutture ricettive: WC efficienti", href: sources.ecolabelToilets }
            ]
          },
          {
            title: "Valore di confronto · 214 litri per persona al giorno",
            status: "anchor",
            copy: "Il valore di confronto italiano completo corrisponde all’acqua potabile erogata dalle reti comunali nel 2022. Il check rappresenta solo gli ambiti richiesti e usa quindi un valore di confronto interno più basso.",
            sources: [{ label: "ISTAT: Le statistiche dell’Istat sull’acqua, anni 2020–2023", href: sources.istatWater }]
          },
          {
            title: "Acqua del rubinetto · 0,5 kWh/m³",
            status: "assumption",
            copy: "Per captazione, potabilizzazione e distribuzione si assume un fabbisogno elettrico forfettario. Altitudine locale, qualità dell’acqua grezza, perdite di rete e depurazione possono cambiare molto il valore reale; l’energia per le acque reflue non è inclusa.",
            sources: [{ label: "ISO 14046: principi e requisiti per l’impronta idrica", href: sources.iso14046 }]
          },
          {
            title: "Giardino · 150 o 30 litri/m² all’anno",
            status: "assumption",
            copy: "I valori rappresentano un’estate secca in Alto Adige: il prato riceve 150 mm di acqua aggiuntiva, un’aiuola adatta al luogo 30 mm. Il Piano di utilizzazione delle acque dell’Alto Adige indica 300 mm come fabbisogno irriguo medio in una stagione vegetativa; tipo di giardino e microclima restano decisivi.",
            sources: [{ label: "Provincia di Bolzano: Piano di utilizzazione delle acque, obiettivi e criteri", href: sources.waterPlan }]
          }
        ]
      },
      {
        title: "Alimentazione e tessili",
        intro: "Qui contano le emissioni del ciclo di vita. La grande variabilità tra prodotti è condensata in poche classi comprensibili.",
        items: [
          {
            title: "Alimentazione · base di 950 kg più supplemento per la carne",
            status: "assumption",
            copy: "Il supplemento lineare di 105 kg CO₂e per ogni pasto di carne settimanale in più è una sintesi didattica, non un valore universale pubblicato. Si basa su dati di ciclo di vita che mostrano differenze molto grandi tra prodotti animali e vegetali e tra produttori.",
            sources: [
              { label: "Poore & Nemecek (2018), Science, DOI 10.1126/science.aaq0216", href: sources.poore },
              { label: "Scarborough et al. (2023), Nature Food, DOI 10.1038/s43016-023-00795-w", href: sources.scarborough }
            ]
          },
          {
            title: "Provenienza e stagione · fino a 400 kg CO₂e",
            status: "assumption",
            copy: "Il supplemento riunisce trasporto aereo, catena del freddo e produzione in serra riscaldata; non va letto come vantaggio generalizzato di ogni prodotto locale. In media, metodo di produzione e tipo di alimento pesano sull’impronta più dell’ultimo tratto di trasporto.",
            sources: [
              { label: "Weber & Matthews (2008), Environmental Science & Technology, DOI 10.1021/es702969f", href: sources.weber },
              { label: "Forbes et al. (2024): rassegna sugli alimenti locali e stagionali", href: sources.forbes }
            ]
          },
          {
            title: "Spreco alimentare · 2,5 kg CO₂e/kg",
            status: "assumption",
            copy: "Il fattore medio valuta le emissioni già generate a monte dal cibo buttato. Mix di prodotti e fase in cui si guasta causano un intervallo ampio; la carne pesa molto più della verdura.",
            sources: [{ label: "FAO: Food Wastage Footprint – Impacts on Natural Resources", href: sources.fao }]
          },
          {
            title: "Abbigliamento · 15 / 9 / 3 kg CO₂e per capo",
            status: "assumption",
            copy: "Valori medi per capo non sostituiscono un’analisi del ciclo di vita specifica del prodotto. Materiale, peso, durata, lavaggi e la domanda se l’usato sostituisca davvero un acquisto nuovo determinano il risultato.",
            sources: [
              { label: "AEA: 355 kg CO₂e a persona per il consumo di tessili nell’UE (2022)", href: sources.eeaTextiles },
              { label: "Klooster et al. (2024): LCA di abbigliamento nuovo e usato", href: sources.klooster },
              { label: "Impronta ambientale di prodotto UE per abbigliamento e calzature", href: sources.pef }
            ]
          }
        ]
      },
      {
        title: "Mobilità e viaggi",
        intro: "I chilometri vengono moltiplicati per fattori del mezzo o del veicolo. Tasso di occupazione e stile di guida reale sono le maggiori fonti di incertezza.",
        items: [
          {
            title: "Auto · 0,22 kg CO₂e e 0,66 kWh/km",
            status: "assumption",
            copy: "L’auto a combustione si basa su 6,8 litri per 100 km, 9,7 kWh per litro e un fattore well-to-wheel arrotondato. I tragitti brevi ricevono un supplemento per l’avviamento a freddo. Dimensione del veicolo, carburante e numero di occupanti possono pesare più dell’arrotondamento.",
            sources: [
              { label: "ISPRA: fattori di emissione nazionali del trasporto stradale", href: sources.ispraRoad },
              { label: "IPCC 2006 Guidelines, volume 2: energia e combustione", href: sources.ipcc }
            ]
          },
          {
            title: "Treno/autobus a lunga percorrenza · 0,035 kg CO₂e per passeggero-km",
            status: "assumption",
            copy: "Un fattore comune mantiene semplice la scelta, anche se treno e autobus si distinguono per mix elettrico, veicolo e occupazione. Serve come ordine di grandezza affidabile, non come confronto tra operatori.",
            sources: [{ label: "EEA Report 19/2020: Train or plane?", href: sources.eeaTrain }]
          },
          {
            title: "Aereo · 0,25 kg CO₂e di effetto per passeggero-km",
            status: "assumption",
            copy: "Il valore forfettario serve come approssimazione in CO₂e e include un supplemento per gli effetti non-CO₂. Tratta, quota di volo, occupazione e meteo causano un intervallo ampio; il valore non è un inventario specifico del volo.",
            sources: [
              { label: "ICAO Carbon Emissions Calculator: metodologia CO₂ armonizzata", href: sources.icao },
              { label: "Lee et al. (2021), Atmospheric Environment, DOI 10.1016/j.atmosenv.2020.117834", href: sources.lee }
            ]
          }
        ]
      }
    ],
    comparisonEyebrow: "Valori di confronto",
    comparisonTitle: "Un valore di confronto non è una legge di natura",
    comparisonCopy: "I valori di confronto interni di {co2} kg CO₂e, {water} litri e {energy} kWh sono valori di modello calibrati sugli ambiti richiesti. Corrispondono a una combinazione media di risposte definita nel check — non a una famiglia media ufficiale.",
    comparisonNoTarget: "Il check volutamente non mostra un “obiettivo di Parigi” personale. I percorsi globali sugli stili di vita non si trasferiscono in modo serio sull’estratto incompleto di questo calcolatore. Un risultato viene confrontato con il riferimento interno solo se tutte le domande hanno una risposta.",
    comparisonSources: [
      { label: "UNEP: Enabling Sustainable Lifestyles in a Climate Emergency", href: sources.unep },
      { label: "JRC: Consumption Footprint – dati di confronto UE basati sul ciclo di vita", href: sources.jrc }
    ],
    standardsEyebrow: "Standard",
    standardsTitle: "Il quadro metodologico dietro il calcolo semplificato",
    standardsCopy: "Il Check degli habitat si orienta a questi standard, ma non è certificato secondo essi. Un’analisi del ciclo di vita conforme alle norme richiederebbe dati primari, analisi di sensibilità e una revisione specialistica.",
    standards: [
      { title: "ISO 14040 e ISO 14044", copy: "Quadro, obiettivo e campo di applicazione, inventario, valutazione degli impatti, interpretazione e rendicontazione trasparente di un’analisi del ciclo di vita.", href: sources.iso14040 },
      { title: "ISO 14067", copy: "Requisiti per la quantificazione e la rendicontazione dell’impronta di carbonio dei prodotti sulla base di un’analisi del ciclo di vita.", href: sources.iso14067 },
      { title: "GHG Protocol Product Standard", copy: "Standard pratico per gli inventari di gas serra lungo il ciclo di vita del prodotto, comprese le emissioni a monte e incertezze trasparenti.", href: sources.ghg },
      { title: "ISO 14046", copy: "Quadro per l’impronta idrica. Spiega anche perché l’acqua del rubinetto prelevata direttamente e l’acqua virtuale non sono lo stesso indicatore.", href: sources.iso14046 }
    ],
    biodiversityEyebrow: "Biodiversità",
    biodiversityTitle: "Un profilo d’impatto, non un numero di specie inventato",
    biodiversityCopy: "Giardino, alimentazione, mobilità e consumi agiscono sugli habitat. Il check mostra questa direzione in modo qualitativo; non pretende di calcolare da una risposta domestica un numero di specie salvate.",
    biodiversityDetail: "Il profilo pondera caratteristiche osservabili come impermeabilizzazione, piante autoctone, continuità delle fioriture e strutture per la nidificazione. La letteratura ecologica sostiene la direzione di questi effetti, non il punteggio esatto. Per questo il profilo resta separato da CO₂e, acqua ed energia.",
    biodiversitySources: [
      { label: "IPBES (2019): Global Assessment on Biodiversity and Ecosystem Services", href: sources.ipbes },
      { label: "Baldock et al. (2015): importanza delle aree urbane per gli insetti impollinatori", href: sources.baldock },
      { label: "Pardee & Philpott (2014): piante autoctone e api selvatiche nei giardini", href: sources.pardee }
    ],
    careLabel: "Incertezza e aggiornamento",
    care: [
      ["Incertezze maggiori", "Riscaldamento, composizione della dieta, occupazione dei veicoli, tipo di tessuto e irrigazione reale del giardino."],
      ["Interpretazione", "Le differenze tra le opzioni d’azione dicono di più dell’ultima cifra del risultato complessivo."],
      ["Aggiornamento", "Mix elettrico, valori di confronto e letteratura vengono aggiornati con una nuova versione del modello; così i risultati precedenti restano ricostruibili."]
    ]
  },
  en: {
    metaTitle: "Methodology & Sources",
    metaDescription: "Accounting boundaries, calculation method, data sources and uncertainties of the habitat check for CO₂, water, energy and biodiversity.",
    eyebrow: "Methodology · Model 0.3",
    title: "How the values in the Habitat Check come about",
    lead: "Every number shown follows from your input, a disclosed factor and a clear accounting boundary. This page shows which values are anchored in official or scientific data — and where the calculator deliberately works with a simplified assumption.",
    status: "Sources as of: October 2026 · results rounded · not a verified individual footprint",
    principles: [
      ["Orientation, not a life-cycle assessment", "The check makes orders of magnitude and effective decisions visible. It replaces neither a building energy consultation nor an individual life-cycle analysis."],
      ["Per person and year", "All quantities refer to one person and one year. For electricity, heat and shared areas, the household value must therefore be divided by the number of people."],
      ["Explicit system boundaries", "CO₂e includes upstream emissions only where the stated factor contains them. Water counts tap water; energy the directly attributed use, including water supply and transport."],
      ["No false precision", "Results are rounded. Regional flat rates and usage assumptions are explicitly marked as model assumptions."]
    ],
    boundariesEyebrow: "Accounting boundaries",
    boundariesTitle: "Three numbers, three deliberately different boundaries",
    boundariesCopy: "A boundary decides what an indicator says. That is why CO₂e, tap water and attributed energy use are not merged into a single environmental score.",
    notIncluded: "Not included",
    boundaries: [
      { metric: "CO₂e", unit: "kg per year", scope: "Emissions of the activities asked about; upstream emissions only where the respective factor explicitly includes them.", excluded: "Not a complete personal footprint: housing construction, many consumer goods, public infrastructure and other areas of life are missing." },
      { metric: "Drinking water", unit: "litres per year", scope: "Tap water used directly for showering, hot water, toilet flushing and garden irrigation.", excluded: "Virtual water in food, energy and clothing stays out and is not mixed with tap water." },
      { metric: "Energy use", unit: "kWh per year", scope: "Electricity, heat and fuel attributed to the activities asked about, plus energy for water supply.", excluded: "Embodied energy of buildings and products is not added; its climate impact may partly be contained in the CO₂e factor." }
    ],
    evidenceEyebrow: "Evidence by calculation area",
    evidenceTitle: "From data anchor to the number in the calculator",
    evidenceCopy: "Data anchors come directly from official data or publications. Derived values follow a physical calculation. Model assumptions condense a range into a workable factor.",
    statusLabels: { anchor: "Data anchor", derived: "Derived", assumption: "Model assumption" },
    evidence: [
      {
        title: "Housing, electricity and hot water",
        intro: "The physical conversions are direct; building demand and use remain simplified assumptions.",
        items: [
          {
            title: "Italian power generation · 0.214 kg CO₂/kWh",
            status: "anchor",
            copy: "The provisional ISPRA value for 2025 is used as a fixed location-based factor. It describes the direct emissions of Italian power generation, not the full life cycle and not an individual green-power contract.",
            sources: [{ label: "ISPRA: Emissions of the Italian power sector, 2026 edition", href: sources.ispraPower }]
          },
          {
            title: "Space heating · personal billed value",
            status: "anchor",
            copy: "Instead of a flat building model, the check uses your personal share of the measured annual consumption. Building condition, floor area, weather and behaviour all enter together. You assign the heating system; unknown and local heating networks remain an uncertainty. Gas and oil bills state Smc and litres rather than kWh: the check uses 10.7 kWh per Smc (ARERA reference value) and about 10 kWh per litre of heating oil (ISPRA calorific value at 0.84 kg/l).",
            sources: [
              { label: "ISO 52016-1: Calculation of energy needs for heating and cooling", href: sources.iso52016 },
              { label: "Province of Bolzano: Energy Report 2024", href: sources.energyReport },
              { label: "ARERA: conventional gross calorific value of natural gas", href: sources.arera },
              { label: "MASE/ISPRA: national standard parameters, heating oil", href: sources.ispraFuels }
            ]
          },
          {
            title: "Hot water · 0.0302 kWh per litre",
            status: "derived",
            copy: "The value follows from the heat capacity of water and heating from 12 to 38 °C. Gas, oil, heat pump and low-emission heat are calculated separately. The flat coefficient of performance and grid factors remain model assumptions. Storage temperatures must not be lowered across the board because of the risk of Legionella.",
            sources: [
              { label: "EU Taxonomy: 38 °C as reference temperature for shower fittings", href: sources.taxonomy },
              { label: "RKI/UBA: Drinking water temperatures and Legionella, 2024", href: sources.legionella }
            ]
          },
          {
            title: "Household electricity, standby and lighting",
            status: "anchor",
            copy: "The annual value from the electricity bill includes fridges, cooking, washing, dishwashing, lighting and entertainment electronics. Standby and lamps are therefore only assessed qualitatively and not added again. For orientation, 1 watt of continuous load equals 8.76 kWh a year. “Medium consumption” and “Don’t know” are set to about 950 kWh per person: 510.7 GWh of household electricity in the province of Bolzano in 2024 divided by 539,679 residents.",
            sources: [
              { label: "Terna: Elettricità nelle regioni 2024, household consumption by province", href: sources.terna },
              { label: "ASTAT: Population of South Tyrol", href: sources.astatPopulation },
              { label: "EU 2023/826: off mode, standby and networked standby", href: sources.standby },
              { label: "EU 2019/2020: Ecodesign for light sources", href: sources.lighting }
            ]
          }
        ]
      },
      {
        title: "Water in the home and garden",
        intro: "What counts is the amount at the tap. The water footprint of products is a different indicator and deliberately kept separate.",
        items: [
          {
            title: "Shower and toilet",
            status: "anchor",
            copy: "The calculator spans 6.5–13 litres per shower minute and 3.5–9 litres per flush. For water-saving fittings the EU sets 8 litres per minute, and for efficient toilets at most 4.5 litres per flush, as reliable reference points.",
            sources: [
              { label: "EU Ecolabel 2013/250/EU: Sanitary tapware", href: sources.ecolabelTaps },
              { label: "EU Ecolabel for tourist accommodation: efficient toilets", href: sources.ecolabelToilets }
            ]
          },
          {
            title: "Reference value · 214 litres per person and day",
            status: "anchor",
            copy: "The full Italian reference value corresponds to the drinking water supplied by municipal networks in 2022. The check itself covers only the areas asked about and therefore uses a lower internal reference value.",
            sources: [{ label: "ISTAT: Water statistics 2020–2023", href: sources.istatWater }]
          },
          {
            title: "Tap water · 0.5 kWh/m³",
            status: "assumption",
            copy: "A flat electricity demand is assumed for abstraction, treatment and distribution. Local altitude, raw water quality, network losses and wastewater treatment can change the real value considerably; wastewater energy is not included.",
            sources: [{ label: "ISO 14046: Principles and requirements for water footprints", href: sources.iso14046 }]
          },
          {
            title: "Garden · 150 or 30 litres/m² a year",
            status: "assumption",
            copy: "The values reflect a dry South Tyrolean summer: lawn receives 150 mm of extra water, a site-appropriate bed 30 mm. South Tyrol’s water use plan gives 300 mm as the average irrigation need over a growing season; garden type and microclimate remain decisive.",
            sources: [{ label: "Province of Bolzano: Water use plan, objectives and criteria", href: sources.waterPlan }]
          }
        ]
      },
      {
        title: "Food and textiles",
        intro: "Life-cycle emissions count here. The wide spread between products is condensed into a few understandable classes.",
        items: [
          {
            title: "Diet · 950 kg base plus a meat surcharge",
            status: "assumption",
            copy: "The linear surcharge of 105 kg CO₂e per additional weekly meat meal is a teaching simplification, not a published universal value. It is based on life-cycle data showing particularly large differences between animal and plant products and between producers.",
            sources: [
              { label: "Poore & Nemecek (2018), Science, DOI 10.1126/science.aaq0216", href: sources.poore },
              { label: "Scarborough et al. (2023), Nature Food, DOI 10.1038/s43016-023-00795-w", href: sources.scarborough }
            ]
          },
          {
            title: "Origin and season · up to 400 kg CO₂e",
            status: "assumption",
            copy: "The surcharge bundles air freight, cold chain and heated production; it must not be read as a blanket advantage of every local product. On average, production method and type of food shape the footprint more than the last transport leg.",
            sources: [
              { label: "Weber & Matthews (2008), Environmental Science & Technology, DOI 10.1021/es702969f", href: sources.weber },
              { label: "Forbes et al. (2024): Review of local and seasonal food", href: sources.forbes }
            ]
          },
          {
            title: "Food waste · 2.5 kg CO₂e/kg",
            status: "assumption",
            copy: "The average factor values the upstream emissions already caused by the discarded food. Product mix and the stage at which it spoils cause a wide range; meat weighs far more than vegetables.",
            sources: [{ label: "FAO: Food Wastage Footprint – Impacts on Natural Resources", href: sources.fao }]
          },
          {
            title: "Clothing · 15 / 9 / 3 kg CO₂e per item",
            status: "assumption",
            copy: "Averaged per-item values do not replace a product-specific life-cycle assessment. Material, weight, lifetime, washing and whether second-hand actually replaces a new purchase determine the result.",
            sources: [
              { label: "EEA: 355 kg CO₂e per person for textile consumption in the EU (2022)", href: sources.eeaTextiles },
              { label: "Klooster et al. (2024): LCA of new and second-hand clothing", href: sources.klooster },
              { label: "EU Product Environmental Footprint for clothing and footwear", href: sources.pef }
            ]
          }
        ]
      },
      {
        title: "Mobility and travel",
        intro: "Kilometres are multiplied by mode or vehicle factors. Occupancy and real driving style are the biggest sources of uncertainty.",
        items: [
          {
            title: "Car · 0.22 kg CO₂e and 0.66 kWh/km",
            status: "assumption",
            copy: "The combustion car is based on 6.8 litres per 100 km, 9.7 kWh per litre and a rounded well-to-wheel factor. Short trips get a cold-start surcharge. Vehicle size, fuel and occupancy can matter more than the rounding.",
            sources: [
              { label: "ISPRA: national road transport emission factors", href: sources.ispraRoad },
              { label: "IPCC 2006 Guidelines, volume 2: Energy and combustion", href: sources.ipcc }
            ]
          },
          {
            title: "Rail/long-distance bus · 0.035 kg CO₂e per passenger-km",
            status: "assumption",
            copy: "One shared factor keeps the choice simple, although rail and bus differ by power mix, vehicle and occupancy. It serves as a reliable order of magnitude, not as a comparison of operators.",
            sources: [{ label: "EEA Report 19/2020: Train or plane?", href: sources.eeaTrain }]
          },
          {
            title: "Flight · 0.25 kg CO₂e impact value per passenger-km",
            status: "assumption",
            copy: "The flat impact value serves as a CO₂e approximation and includes a surcharge for non-CO₂ effects. Route, altitude, occupancy and weather cause a wide range; the value is not a flight-specific inventory.",
            sources: [
              { label: "ICAO Carbon Emissions Calculator: harmonised CO₂ methodology", href: sources.icao },
              { label: "Lee et al. (2021), Atmospheric Environment, DOI 10.1016/j.atmosenv.2020.117834", href: sources.lee }
            ]
          }
        ]
      }
    ],
    comparisonEyebrow: "Reference values",
    comparisonTitle: "A reference value is not a law of nature",
    comparisonCopy: "The internal reference values of {co2} kg CO₂e, {water} litres and {energy} kWh are model values calibrated to the areas asked about. They correspond to a fixed, medium combination of answers in the check — not to an official average household.",
    comparisonNoTarget: "The check deliberately shows no personal “Paris target”. Global lifestyle pathways cannot be credibly transferred to the incomplete slice this calculator covers. A result is only compared against the internal reference once all questions are answered.",
    comparisonSources: [
      { label: "UNEP: Enabling Sustainable Lifestyles in a Climate Emergency", href: sources.unep },
      { label: "JRC: Consumption Footprint – life-cycle-based EU reference data", href: sources.jrc }
    ],
    standardsEyebrow: "Standards",
    standardsTitle: "The methodological framework behind the simplified calculation",
    standardsCopy: "The Habitat Check follows these standards but is not certified against them. A standard-compliant life-cycle assessment would require primary data, sensitivity analyses and an expert review.",
    standards: [
      { title: "ISO 14040 and ISO 14044", copy: "Framework, goal and scope, inventory analysis, impact assessment, interpretation and transparent reporting of a life-cycle assessment.", href: sources.iso14040 },
      { title: "ISO 14067", copy: "Requirements for quantifying and reporting the carbon footprint of products based on a life-cycle assessment.", href: sources.iso14067 },
      { title: "GHG Protocol Product Standard", copy: "Practical standard for greenhouse gas inventories across the product life cycle, including upstream emissions and transparent uncertainties.", href: sources.ghg },
      { title: "ISO 14046", copy: "Framework for water footprints. It also explains why directly abstracted tap water and virtual water are not the same indicator.", href: sources.iso14046 }
    ],
    biodiversityEyebrow: "Biodiversity",
    biodiversityTitle: "An impact profile, not an invented species count",
    biodiversityCopy: "Garden, diet, mobility and consumption affect habitats. The check shows this direction qualitatively; it does not claim to calculate a number of species saved from a household answer.",
    biodiversityDetail: "The profile weights observable features such as sealed surfaces, native plants, continuous flowering and nesting structures. Ecological literature supports the direction of these effects, not the exact score. That is why the profile stays separate from CO₂e, water and energy.",
    biodiversitySources: [
      { label: "IPBES (2019): Global Assessment on Biodiversity and Ecosystem Services", href: sources.ipbes },
      { label: "Baldock et al. (2015): The importance of urban areas for pollinating insects", href: sources.baldock },
      { label: "Pardee & Philpott (2014): Native plants and wild bees in gardens", href: sources.pardee }
    ],
    careLabel: "Uncertainty & upkeep",
    care: [
      ["Largest uncertainties", "Space heating, diet composition, vehicle occupancy, type of textile and actual garden irrigation."],
      ["Interpretation", "Differences between options for action say more than the last digit of the overall result."],
      ["Updates", "Power mix, reference values and literature are updated with a new model version, so earlier results remain traceable."]
    ]
  }
} as const;
