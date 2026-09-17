import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { isLocale, locales, type Locale } from "@/config/site";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { withBasePath } from "@/lib/public-path";

const route = "/methodik";

const methodMeta: Record<Locale, { title: string; description: string }> = {
  de: {
    title: "Methodik & Quellen",
    description: "Bilanzgrenzen, Rechenweg, Datenquellen und Unsicherheiten des Lebensraum-Checks für CO₂, Wasser, Energie und Biodiversität."
  },
  it: {
    title: "Metodologia e fonti",
    description: "Limiti di bilancio, metodo di calcolo, fonti di dati e incertezze del check degli habitat per CO₂, acqua, energia e biodiversità."
  },
  en: {
    title: "Methodology & Sources",
    description: "Accounting boundaries, calculation method, data sources and uncertainties of the habitat check for CO₂, water, energy and biodiversity."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const meta = methodMeta[locale];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: withBasePath(`/${locale}${route}`),
      languages: Object.fromEntries(locales.map((language) => [language, withBasePath(`/${language}${route}`)]))
    }
  };
}

const principles = [
  ["Orientierung statt Ökobilanz", "Der Check macht Größenordnungen und wirksame Entscheidungen sichtbar. Er ersetzt weder eine Gebäudeenergieberatung noch eine individuelle Lebenszyklusanalyse."],
  ["Pro Person und Jahr", "Alle Mengen beziehen sich auf eine Person und ein Jahr. Bei Strom, Wärme und gemeinsam genutzten Flächen muss der Haushaltswert deshalb durch die Zahl der Personen geteilt werden."],
  ["Explizite Systemgrenzen", "CO₂e umfasst Vorketten nur dort, wo der genannte Faktor sie enthält. Wasser zählt Leitungswasser; Energie den direkt zugeordneten Einsatz einschließlich Wasserbereitstellung und Verkehr."],
  ["Keine Scheingenauigkeit", "Ergebnisse werden gerundet. Regionale Pauschalen und Nutzungsannahmen sind ausdrücklich als Modellannahmen markiert."]
] as const;

const boundaries = [
  { metric: "CO₂e", unit: "kg pro Jahr", scope: "Emissionen der abgefragten Aktivitäten; vorgelagerte Emissionen nur, soweit sie im jeweiligen Faktor ausdrücklich enthalten sind.", excluded: "Kein vollständiger persönlicher Fußabdruck: Wohnungsbau, zahlreiche Konsumgüter, öffentliche Infrastruktur und weitere Lebensbereiche fehlen." },
  { metric: "Trinkwasser", unit: "Liter pro Jahr", scope: "Direktes Leitungswasser für Dusche, Warmwasser, Toilettenspülung und Gartenbewässerung.", excluded: "Virtuelles Wasser in Lebensmitteln, Energie und Kleidung bleibt draußen und wird nicht mit Leitungswasser vermischt." },
  { metric: "Energieeinsatz", unit: "kWh pro Jahr", scope: "Den abgefragten Aktivitäten zugeordneter Strom, Wärme- und Kraftstoffeinsatz sowie Energie für Wasserbereitstellung.", excluded: "Graue Energie von Gebäuden und Produkten wird nicht addiert; ihre Klimawirkung kann teilweise im CO₂e-Faktor stecken." }
] as const;

type Evidence = {
  title: string;
  status: "Datenanker" | "Abgeleitet" | "Modellannahme";
  copy: string;
  sources: { label: string; href: string }[];
};

const evidence: { title: string; intro: string; items: Evidence[] }[] = [
  {
    title: "Wohnen, Strom und Warmwasser",
    intro: "Die physikalischen Umrechnungen sind direkt; Gebäudebedarf und Nutzung bleiben vereinfachte Annahmen.",
    items: [
      {
        title: "Stromerzeugung Italien · 0,214 kg CO₂/kWh",
        status: "Datenanker",
        copy: "Als fester location-based Faktor wird der vorläufige ISPRA-Wert für 2025 verwendet. Er beschreibt direkte Emissionen der italienischen Stromerzeugung, nicht den vollständigen Lebenszyklus und keinen individuellen Ökostromvertrag.",
        sources: [{ label: "ISPRA: Emissionen des italienischen Stromsektors, Ausgabe 2026", href: "https://www.isprambiente.gov.it/it/pubblicazioni/rapporti/settore-elettrico-emissioni-di-co2-e-altri-impatti-edizione-2026" }]
      },
      {
        title: "Raumwärme · persönlicher Abrechnungswert",
        status: "Datenanker",
        copy: "Statt eines pauschalen Gebäudemodells verwendet der Check den persönlichen Anteil am gemessenen Jahresverbrauch. Damit gehen Gebäudezustand, Wohnfläche, Wetter und Verhalten gemeinsam ein. Der Nutzer ordnet das Heizsystem zu; unbekannte und lokale Wärmenetze bleiben eine Unsicherheit.",
        sources: [
          { label: "ISO 52016-1: Berechnung von Heiz- und Kühlenergiebedarf", href: "https://www.iso.org/standard/65696.html" },
          { label: "Land Südtirol: Energy Report 2024", href: "https://news.provinz.bz.it/it/news/energy-report-2024-migliora-l-efficienza-energetica-calo-dei-costi" }
        ]
      },
      {
        title: "Warmwasser · 0,0302 kWh je Liter",
        status: "Abgeleitet",
        copy: "Der Wert folgt aus der Wärmekapazität von Wasser und einer Erwärmung von 12 auf 38 °C. Gas, Öl, Wärmepumpe und emissionsarme Wärme werden getrennt gerechnet. Die pauschale Leistungszahl und Netzfaktoren bleiben Modellannahmen. Speichertemperaturen dürfen wegen des Legionellenrisikos nicht pauschal abgesenkt werden.",
        sources: [
          { label: "EU-Taxonomie: 38 °C als Referenztemperatur für Duscharmaturen", href: "https://eur-lex.europa.eu/eli/reg_del/2021/2139/2026-01-01/eng" },
          { label: "RKI/UBA: Trinkwassertemperaturen und Legionellen, 2024", href: "https://edoc.rki.de/bitstream/handle/176904/11930/EB-33-2024-Legionellen.pdf?sequence=1" }
        ]
      },
      {
        title: "Haushaltsstrom, Standby und Beleuchtung",
        status: "Datenanker",
        copy: "Der Jahreswert aus der Stromrechnung enthält Kühlgeräte, Kochen, Waschen, Spülen, Beleuchtung und Unterhaltungselektronik. Standby und Lampen werden deshalb nur qualitativ beurteilt und nicht nochmals addiert. 1 Watt Dauerlast entspricht zur Einordnung 8,76 kWh im Jahr.",
        sources: [
          { label: "EU 2023/826: Aus-, Bereitschafts- und Netzwerkbetrieb", href: "https://eur-lex.europa.eu/eli/reg/2023/826/oj/deu" },
          { label: "EU 2019/2020: Ökodesign für Lichtquellen", href: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32019R2020" }
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
        status: "Datenanker",
        copy: "Der Rechner spannt 6,5–13 Liter pro Duschminute und 3,5–9 Liter pro Spülung auf. Die EU setzt für wassersparende Armaturen 8 Liter pro Minute und für effiziente Toiletten höchstens 4,5 Liter je Spülung als belastbare Vergleichspunkte.",
        sources: [
          { label: "EU-Ecolabel 2013/250/EU: Sanitärarmaturen", href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32013D0250" },
          { label: "EU-Ecolabel für Beherbergungsbetriebe: effiziente Toiletten", href: "https://eur-lex.europa.eu/eli/dec/2017/175/2023-03-30/eng" }
        ]
      },
      {
        title: "Vergleichswert · 214 Liter pro Person und Tag",
        status: "Datenanker",
        copy: "Der volle italienische Vergleichswert entspricht der 2022 von den kommunalen Netzen abgegebenen Trinkwassermenge. Der Check selbst bildet nur die abgefragten Teilbereiche ab und verwendet deshalb einen niedrigeren internen Vergleichswert.",
        sources: [{ label: "ISTAT: Statistiken zum Wasser 2020–2023", href: "https://www.istat.it/comunicato-stampa/le-statistiche-dellistat-sullacqua-anni-2020-2023/" }]
      },
      {
        title: "Leitungswasser · 0,5 kWh/m³",
        status: "Modellannahme",
        copy: "Für Förderung, Aufbereitung und Verteilung wird ein pauschaler Strombedarf angesetzt. Lokale Höhenlage, Rohwasserqualität, Netzverluste und Abwasserbehandlung können den tatsächlichen Wert deutlich verändern; Abwasserenergie ist nicht enthalten.",
        sources: [{ label: "ISO 14046: Grundsätze und Anforderungen an Wasserfußabdrücke", href: "https://www.iso.org/standard/43263.html" }]
      },
      {
        title: "Garten · 150 bzw. 30 Liter/m² im Jahr",
        status: "Modellannahme",
        copy: "Die Werte bilden einen trockenen Südtiroler Sommer ab: Rasen erhält 150 mm Zusatzwasser, ein standortangepasstes Beet 30 mm. Der Südtiroler Wassernutzungsplan nennt 300 mm als mittleren Bewässerungsbedarf über eine Vegetationsperiode; Gartenart und Mikroklima bleiben entscheidend.",
        sources: [{ label: "Land Südtirol: Wassernutzungsplan, Ziele und Kriterien", href: "https://umwelt.provinz.bz.it/downloads/04_WNP_BZ_Teil_2_Ziele_und_Kriterien_der_Nutzung_22.06.2017.pdf" }]
      }
    ]
  },
  {
    title: "Ernährung und Textilien",
    intro: "Hier zählen Lebenszyklusemissionen. Die große Streuung zwischen Produkten wird zu wenigen verständlichen Klassen verdichtet.",
    items: [
      {
        title: "Ernährung · 950 kg Sockel plus Fleischaufschlag",
        status: "Modellannahme",
        copy: "Der lineare Aufschlag von 105 kg CO₂e je zusätzlicher wöchentlicher Fleischmahlzeit ist eine didaktische Verdichtung, kein publizierter Universalwert. Grundlage sind Lebenszyklusdaten, die besonders große Unterschiede zwischen tierischen und pflanzlichen Produkten sowie zwischen Erzeugern zeigen.",
        sources: [
          { label: "Poore & Nemecek (2018), Science, DOI 10.1126/science.aaq0216", href: "https://pubmed.ncbi.nlm.nih.gov/29853680/" },
          { label: "Scarborough et al. (2023), Nature Food, DOI 10.1038/s43016-023-00795-w", href: "https://doi.org/10.1038/s43016-023-00795-w" }
        ]
      },
      {
        title: "Herkunft und Saison · bis 400 kg CO₂e",
        status: "Modellannahme",
        copy: "Der Aufschlag bündelt Flugtransport, Kühlkette und beheizte Produktion; er darf nicht als pauschaler Vorteil jedes regionalen Produkts gelesen werden. Im Durchschnitt prägen Produktionsweise und Lebensmittelart den Fußabdruck stärker als die letzte Transportstrecke.",
        sources: [
          { label: "Weber & Matthews (2008), Environmental Science & Technology, DOI 10.1021/es702969f", href: "https://pubmed.ncbi.nlm.nih.gov/18546681/" },
          { label: "Forbes et al. (2024): Review zu regionalen und saisonalen Lebensmitteln", href: "https://openaccess.city.ac.uk/id/eprint/37734/" }
        ]
      },
      {
        title: "Lebensmittelabfall · 2,5 kg CO₂e/kg",
        status: "Modellannahme",
        copy: "Der Durchschnittsfaktor bewertet die bereits entstandene Vorkette des weggeworfenen Lebensmittels. Produktmix und Verderbsstufe verursachen eine große Bandbreite; Fleisch wiegt deutlich schwerer als Gemüse.",
        sources: [{ label: "FAO: Food Wastage Footprint – Impacts on Natural Resources", href: "https://www.fao.org/sustainable-food-value-chains/library/details/en/c/266219/" }]
      },
      {
        title: "Kleidung · 15 / 9 / 3 kg CO₂e je Stück",
        status: "Modellannahme",
        copy: "Gemittelte Stückwerte ersetzen hier keine produktspezifische Ökobilanz. Material, Gewicht, Lebensdauer, Waschen und die Frage, ob Secondhand tatsächlich einen Neukauf ersetzt, bestimmen das Ergebnis.",
        sources: [
          { label: "EEA: 355 kg CO₂e pro Person für Textilkonsum in der EU (2022)", href: "https://www.eea.europa.eu/en/circularity/sectoral-modules/textiles/greenhouse-gas-emissions-from-eus-textiles-consumption" },
          { label: "Klooster et al. (2024): LCA von Neu- und Secondhandkleidung", href: "https://doi.org/10.55845/ZZUG7076" },
          { label: "EU Product Environmental Footprint für Kleidung und Schuhe", href: "https://environment.ec.europa.eu/news/new-eu-rules-measuring-environmental-impact-clothes-and-shoes-2025-06-25_en" }
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
        status: "Modellannahme",
        copy: "Der Verbrenner basiert auf 6,8 Litern je 100 km, 9,7 kWh je Liter und einem gerundeten Well-to-Wheel-Faktor. Kurzstrecken erhalten einen Kaltstartaufschlag. Fahrzeuggröße, Kraftstoff und Besetzung können stärker wirken als die Rundung.",
        sources: [
          { label: "ISPRA: nationale Emissionsfaktoren des Straßenverkehrs", href: "https://www.isprambiente.gov.it/en/databases/data-base-collection/air-and-atmospheric-emissions/emissions-in-atmosphere" },
          { label: "IPCC 2006 Guidelines, Band 2: Energieträger und Verbrennung", href: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html" }
        ]
      },
      {
        title: "Bahn/Fernbus · 0,035 kg CO₂e pro Personenkilometer",
        status: "Modellannahme",
        copy: "Ein gemeinsamer Faktor hält die Auswahl einfach, obwohl Bahn und Bus je nach Strommix, Fahrzeug und Auslastung auseinanderliegen. Er dient als belastbare Größenordnung, nicht als Betreibervergleich.",
        sources: [{ label: "EEA Report 19/2020: Train or plane?", href: "https://www.eea.europa.eu/en/analysis/publications/transport-and-environment-report-2020" }]
      },
      {
        title: "Flug · 0,25 kg CO₂e-Wirkungswert pro Personenkilometer",
        status: "Modellannahme",
        copy: "Der pauschale Wirkungswert dient als CO₂e-Näherung und schließt einen Zuschlag für Nicht-CO₂-Effekte ein. Strecke, Flughöhe, Auslastung und Wetter verursachen eine große Bandbreite; der Wert ist keine flugspezifische Inventur.",
        sources: [
          { label: "ICAO Carbon Emissions Calculator: harmonisierte CO₂-Methodik", href: "https://www.icao.int/environmental-protection/environmental-tools/icec" },
          { label: "Lee et al. (2021), Atmospheric Environment, DOI 10.1016/j.atmosenv.2020.117834", href: "https://repository.library.noaa.gov/view/noaa/45026" }
        ]
      }
    ]
  }
];

const standards = [
  { title: "ISO 14040 und ISO 14044", copy: "Rahmen, Ziel und Untersuchungsgrenze, Sachbilanz, Wirkungsauswertung, Interpretation und transparente Berichterstattung einer Ökobilanz.", href: "https://www.iso.org/standard/38498.html" },
  { title: "ISO 14067", copy: "Anforderungen an die Quantifizierung und Berichterstattung des Carbon Footprint von Produkten auf Basis einer Lebenszyklusanalyse.", href: "https://www.iso.org/standard/71206.html" },
  { title: "GHG Protocol Product Standard", copy: "Praktischer Standard für Treibhausgasinventare über den Produktlebenszyklus, einschließlich Vorketten und transparenter Unsicherheiten.", href: "https://ghgprotocol.org/product-standard" },
  { title: "ISO 14046", copy: "Rahmen für Wasserfußabdrücke. Er erklärt auch, warum direkt entnommenes Leitungswasser und virtuelles Wasser nicht dieselbe Kennzahl sind.", href: "https://www.iso.org/standard/43263.html" }
] as const;

const statusStyles: Record<Evidence["status"], string> = {
  Datenanker: "bg-[var(--color-sage)] text-[var(--color-forest)]",
  Abgeleitet: "bg-[var(--color-paper)] text-[var(--color-ink)]",
  Modellannahme: "bg-amber-50 text-amber-900"
};

function SourceLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-start gap-1.5 text-sm font-semibold leading-6 text-[var(--color-forest)] underline decoration-[var(--color-forest)]/25 underline-offset-4 transition-colors hover:text-[var(--color-ink)]">
      <span>{label}</span>
      <ArrowUpRight className="mt-1 size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </a>
  );
}

export default async function MethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Label size="section">Methodik · Modell 0.2</Label>
            <h1 className="mt-4 font-display text-balance text-[length:var(--text-display)] leading-[var(--leading-display)]">So entstehen die Werte im Lebensraum-Check.</h1>
            <p className="mt-6 max-w-[62ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">Jede angezeigte Zahl folgt aus deiner Eingabe, einem offen gelegten Faktor und einer klaren Bilanzgrenze. Diese Seite zeigt, welche Werte amtlich oder wissenschaftlich verankert sind — und wo der Rechner bewusst mit einer vereinfachten Annahme arbeitet.</p>
            <p className="mt-4 text-sm font-semibold text-[var(--color-forest)]">Quellenstand: August 2026 · Ergebnisse gerundet · keine geprüfte Individualbilanz</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {principles.map(([title, copy], index) => (
              <Surface key={title} as="article" level="sheet">
                <p className="text-sm font-bold tabular-nums text-[var(--color-forest)]">0{index + 1}</p>
                <h2 className="mt-5 text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">{title}</h2>
                <p className="mt-3 max-w-[58ch] leading-7 text-[var(--color-muted)]">{copy}</p>
              </Surface>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-sage)]/35 py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Bilanzgrenzen" title="Drei Zahlen, drei bewusst verschiedene Grenzen." copy="Eine Grenze entscheidet, was eine Kennzahl aussagt. CO₂e, Leitungswasser und zugeordneter Energieeinsatz werden deshalb nicht zu einem einzigen Umweltscore verrechnet." />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {boundaries.map((boundary) => (
              <Surface key={boundary.metric} as="article" level="sheet">
                <Label size="block">{boundary.unit}</Label>
                <h3 className="mt-4 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]">{boundary.metric}</h3>
                <p className="mt-5 leading-7 text-[var(--color-muted)]">{boundary.scope}</p>
                <div className="mt-6 border-t border-[var(--color-line)] pt-5">
                  <p className="text-sm font-bold text-[var(--color-ink)]">Nicht enthalten</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{boundary.excluded}</p>
                </div>
              </Surface>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Evidenz je Rechenbereich" title="Vom Datenanker zur Zahl im Rechner." copy="Datenanker stammen direkt aus amtlichen Daten oder Publikationen. Abgeleitete Werte folgen einer physikalischen Rechnung. Modellannahmen verdichten eine Bandbreite zu einem handhabbaren Faktor." />
          <div className="mt-12 space-y-14">
            {evidence.map((group, groupIndex) => (
              <section key={group.title} aria-labelledby={`evidence-${groupIndex}`}>
                <div className="max-w-3xl">
                  <h2 id={`evidence-${groupIndex}`} className="text-[length:var(--text-title)] font-semibold leading-[var(--leading-title)] tracking-[-0.02em]">{group.title}</h2>
                  <p className="mt-2 leading-7 text-[var(--color-muted)]">{group.intro}</p>
                </div>
                <div className="mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white">
                  {group.items.map((item, index) => (
                    <article key={item.title} className={`grid gap-5 p-5 sm:p-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] lg:gap-10 ${index > 0 ? "border-t border-[var(--color-line)]" : ""}`}>
                      <div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${statusStyles[item.status]}`}>{item.status}</span>
                        <h3 className="mt-4 font-semibold leading-6">{item.title}</h3>
                      </div>
                      <div>
                        <p className="leading-7 text-[var(--color-muted)]">{item.copy}</p>
                        <ul className="mt-4 space-y-2">
                          {item.sources.map((source) => <li key={source.href}><SourceLink {...source} /></li>)}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-ink)] py-14 text-white sm:py-20">
        <Container>
          <div className="mb-16 grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <Label size="section" tone="moss">Vergleichswerte</Label>
              <h2 className="mt-4 font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]">Ein Vergleichswert ist kein Naturgesetz.</h2>
            </div>
            <div className="space-y-5 text-white/65">
              <p className="leading-7">Die internen Vergleichswerte von 4.000 kg CO₂e, 53.000 Litern und 9.500 kWh sind auf den abgefragten Ausschnitt kalibrierte Modellwerte. Sie entsprechen einer fest definierten mittleren Antwortkombination im Check — nicht einem amtlichen Durchschnittshaushalt.</p>
              <p className="leading-7">Der Check zeigt bewusst keine persönliche „Paris-Zielmarke“. Globale Lebensstilpfade lassen sich nicht seriös auf den unvollständigen Ausschnitt dieses Rechners übertragen. Ein Ergebnis wird nur dann gegen den internen Vergleich eingeordnet, wenn alle Fragen beantwortet wurden.</p>
              <div className="flex flex-col items-start gap-2 pt-1">
                <a href="https://wedocs.unep.org/xmlui/bitstream/handle/20.500.11822/39972/Lifestyles_climate.pdf" target="_blank" rel="noreferrer" className="group inline-flex items-start gap-1.5 text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 hover:text-[var(--color-moss)]"><span>UNEP: Enabling Sustainable Lifestyles in a Climate Emergency</span><ArrowUpRight className="mt-0.5 size-3.5 shrink-0" aria-hidden /></a>
                <a href="https://eplca.jrc.ec.europa.eu/sustainableConsumption.html" target="_blank" rel="noreferrer" className="group inline-flex items-start gap-1.5 text-sm font-semibold text-white underline decoration-white/25 underline-offset-4 hover:text-[var(--color-moss)]"><span>JRC: Consumption Footprint – Lebenszyklusbasierte EU-Vergleichsdaten</span><ArrowUpRight className="mt-0.5 size-3.5 shrink-0" aria-hidden /></a>
              </div>
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <Label size="section" tone="moss">Standards</Label>
              <h2 className="mt-4 font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)]">Der methodische Rahmen hinter der vereinfachten Rechnung.</h2>
              <p className="mt-5 max-w-[52ch] leading-7 text-white/65">Der Lebensraum-Check orientiert sich an diesen Standards, ist aber nicht nach ihnen zertifiziert. Eine normkonforme Ökobilanz würde Primärdaten, Sensitivitätsanalysen und eine fachliche Prüfung verlangen.</p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {standards.map((standard, index) => (
                <li key={standard.title} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs font-bold tabular-nums text-[var(--color-moss)]">0{index + 1}</p>
                  <a href={standard.href} target="_blank" rel="noreferrer" className="group mt-4 inline-flex items-start gap-1.5 font-semibold text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-[var(--color-moss)]">
                    <span>{standard.title}</span><ArrowUpRight className="mt-1 size-3.5 shrink-0" aria-hidden />
                  </a>
                  <p className="mt-2 text-sm leading-6 text-white/60">{standard.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading eyebrow="Biodiversität" title="Ein Wirkungsprofil, keine erfundene Artenzahl." copy="Garten, Ernährung, Mobilität und Konsum wirken auf Lebensräume. Der Check zeigt diese Richtung qualitativ; er behauptet nicht, aus einer Haushaltsantwort eine Zahl geretteter Arten berechnen zu können." />
            <Surface level="sheet">
              <p className="leading-7 text-[var(--color-muted)]">Das Profil gewichtet beobachtbare Merkmale wie Versiegelung, heimische Pflanzen, Blühkontinuität und Niststrukturen. Die ökologische Literatur stützt die Richtung dieser Wirkungen, nicht die exakte Punktzahl. Deshalb bleibt das Profil getrennt von CO₂e, Wasser und Energie.</p>
              <ul className="mt-6 space-y-3 border-t border-[var(--color-line)] pt-6">
                <li><SourceLink label="IPBES (2019): Global Assessment on Biodiversity and Ecosystem Services" href="https://doi.org/10.5281/zenodo.3831673" /></li>
                <li><SourceLink label="Baldock et al. (2015): Bedeutung urbaner Räume für bestäubende Insekten" href="https://pubmed.ncbi.nlm.nih.gov/25673686/" /></li>
                <li><SourceLink label="Pardee & Philpott (2014): Heimische Pflanzen und Wildbienen in Gärten" href="https://doi.org/10.1007/s11252-014-0349-0" /></li>
              </ul>
            </Surface>
          </div>
          <Surface level="sheet" tone="paper" className="mt-12">
            <Label size="block">Unsicherheit & Pflege</Label>
            <div className="mt-5 grid gap-8 md:grid-cols-3">
              <div><h3 className="font-semibold">Größte Unsicherheiten</h3><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Raumwärme, Ernährungszusammensetzung, Fahrzeugauslastung, Textilart und tatsächliche Gartenbewässerung.</p></div>
              <div><h3 className="font-semibold">Interpretation</h3><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Unterschiede zwischen Handlungsoptionen sind aussagekräftiger als die letzte Stelle des Gesamtergebnisses.</p></div>
              <div><h3 className="font-semibold">Aktualisierung</h3><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Strommix, Vergleichswerte und Literatur werden mit einer neuen Modellversion aktualisiert; frühere Ergebnisse bleiben dadurch nachvollziehbar.</p></div>
            </div>
          </Surface>
        </Container>
      </section>
    </>
  );
}
