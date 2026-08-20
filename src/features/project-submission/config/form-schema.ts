import type { Field, FormStep } from "../model/types";

/**
 * Das Einreichungsformular in fünf Schritten.
 *
 * Die Schritte sind nicht frei gewählt: Die Übersichtsseite
 * (`/projekt-einreichen`) beschreibt seit jeher genau diesen Weg — Projektidee,
 * Lebensraum-Analyse, Planung & Budget, Monitoring & Wirkung, Veröffentlichen &
 * einreichen. Das Formular löst dieses Versprechen ein, statt eine zweite,
 * eigene Gliederung danebenzustellen. Wer die Schritte hier ändert, ändert sie
 * auch dort.
 *
 * Herkunft der Felder ist ein Beschreibungsbogen für Renaturierungsprojekte mit
 * elf Abschnitten. Übernommen sind alle Felder; angepasst ist, was auf
 * Deutschland zugeschnitten war: Aus dem Bundesland-Auswahlfeld wurden Gemeinde
 * und Bezirksgemeinschaft, aus dem Gewässertyp die sieben Lebensräume, mit
 * denen die Plattform ohnehin filtert und Karten einfärbt.
 */

/** Die acht Südtiroler Bezirksgemeinschaften; Bozen bildet als Stadtgemeinde eine eigene Einheit. */
const districts: Field["options"] = [
  { value: "vinschgau", label: { de: "Vinschgau", it: "Val Venosta", en: "Vinschgau · Val Venosta" } },
  { value: "burggrafenamt", label: { de: "Burggrafenamt", it: "Burgraviato", en: "Burggrafenamt · Burgraviato" } },
  {
    value: "ueberetsch-unterland",
    label: { de: "Überetsch-Unterland", it: "Oltradige-Bassa Atesina", en: "Überetsch-Unterland · Oltradige-Bassa Atesina" }
  },
  { value: "bozen", label: { de: "Gemeinde Bozen", it: "Comune di Bolzano", en: "City of Bolzano · Bozen" } },
  { value: "salten-schlern", label: { de: "Salten-Schlern", it: "Salto-Sciliar", en: "Salten-Schlern · Salto-Sciliar" } },
  { value: "eisacktal", label: { de: "Eisacktal", it: "Valle Isarco", en: "Eisacktal · Valle Isarco" } },
  { value: "wipptal", label: { de: "Wipptal", it: "Alta Valle Isarco", en: "Wipptal · Alta Valle Isarco" } },
  { value: "pustertal", label: { de: "Pustertal", it: "Val Pusteria", en: "Pustertal · Val Pusteria" } }
];

const goalOptions: Field["options"] = [
  {
    value: "biodiversitaet",
    label: { de: "Erhöhung der Biodiversität", it: "Aumento della biodiversità", en: "Increasing biodiversity" }
  },
  {
    value: "gewaesserqualitaet",
    label: {
      de: "Verbesserung der Gewässerqualität",
      it: "Miglioramento della qualità delle acque",
      en: "Improving water quality"
    }
  },
  {
    value: "hochwasserschutz",
    label: {
      de: "Natürlicher Hochwasserschutz",
      it: "Protezione naturale dalle piene",
      en: "Natural flood protection"
    }
  },
  {
    value: "klimaschutz",
    label: {
      de: "Klimaschutz (z. B. CO₂-Speicherung)",
      it: "Protezione del clima (es. stoccaggio di CO₂)",
      en: "Climate protection (e.g. carbon storage)"
    }
  },
  {
    value: "naherholung",
    label: {
      de: "Schaffung von Naherholungsraum",
      it: "Creazione di spazi ricreativi di prossimità",
      en: "Creating local recreation space"
    }
  },
  {
    value: "umweltbildung",
    label: { de: "Umweltbildung", it: "Educazione ambientale", en: "Environmental education" }
  },
  { value: "sonstiges", label: { de: "Sonstiges", it: "Altro", en: "Other" } }
];

const waterHint = {
  de: "Nur bei Projekten an Gewässern.",
  it: "Solo per progetti su corsi d’acqua.",
  en: "Only for projects on watercourses."
};

export const formSteps: FormStep[] = [
  {
    id: "idee",
    title: { de: "Projektidee", it: "Idea di progetto", en: "Project idea" },
    intro: {
      de: "Wer trägt das Vorhaben, und was soll es erreichen?",
      it: "Chi promuove il progetto e che cosa vuole ottenere?",
      en: "Who is behind the project, and what should it achieve?"
    },
    groups: [
      {
        title: {
          de: "Allgemeine Projektinformationen",
          it: "Informazioni generali sul progetto",
          en: "General project information"
        },
        fields: [
          {
            id: "projektname",
            kind: "text",
            required: true,
            label: { de: "Projekttitel", it: "Titolo del progetto", en: "Project title" },
            placeholder: {
              de: "z. B. Wiedervernässung des Moors am Vahrner See",
              it: "es. riumidificazione della torbiera del Lago di Varna",
              en: "e.g. rewetting the mire at Lake Varna"
            }
          },
          {
            id: "projektleitung",
            kind: "text",
            required: true,
            half: true,
            label: { de: "Projektleitung", it: "Responsabile del progetto", en: "Project lead" },
            placeholder: { de: "Vor- und Nachname", it: "Nome e cognome", en: "First and last name" }
          },
          {
            id: "organisation",
            kind: "text",
            half: true,
            label: { de: "Organisation oder Institution", it: "Organizzazione o ente", en: "Organisation or institution" },
            placeholder: {
              de: "z. B. Gemeinde, Verein, Genossenschaft",
              it: "es. comune, associazione, cooperativa",
              en: "e.g. municipality, association, cooperative"
            }
          },
          {
            id: "email",
            kind: "email",
            required: true,
            half: true,
            label: { de: "E-Mail", it: "E-mail", en: "Email" },
            placeholder: { de: "kontakt@beispiel.it", it: "contatto@esempio.it", en: "contact@example.it" }
          },
          {
            id: "telefon",
            kind: "tel",
            half: true,
            label: { de: "Telefon", it: "Telefono", en: "Phone" },
            placeholder: { de: "+39 0471 123456", it: "+39 0471 123456", en: "+39 0471 123456" }
          },
          {
            id: "startdatum",
            kind: "date",
            half: true,
            label: { de: "Projektstart", it: "Inizio del progetto", en: "Project start" }
          },
          {
            id: "enddatum",
            kind: "date",
            half: true,
            label: { de: "Geplantes Projektende", it: "Fine prevista del progetto", en: "Planned completion" }
          }
        ]
      },
      {
        title: { de: "Projektziele", it: "Obiettivi del progetto", en: "Project goals" },
        fields: [
          {
            id: "hauptziel",
            kind: "textarea",
            required: true,
            label: { de: "Hauptziel des Projekts", it: "Obiettivo principale del progetto", en: "Main objective" },
            placeholder: {
              de: "z. B. Wiederherstellung eines durchgängigen, naturnahen Bachlaufs",
              it: "es. ripristino di un corso d’acqua continuo e vicino allo stato naturale",
              en: "e.g. restoring a continuous, near-natural stream"
            }
          },
          {
            id: "ziele",
            kind: "checkboxes",
            options: goalOptions,
            label: { de: "Spezifische Ziele", it: "Obiettivi specifici", en: "Specific goals" },
            hint: {
              de: "Mehrfachauswahl möglich.",
              it: "È possibile selezionare più opzioni.",
              en: "Select as many as apply."
            }
          },
          {
            id: "sonstige_ziele",
            kind: "textarea",
            label: {
              de: "Sonstige Ziele",
              it: "Altri obiettivi",
              en: "Other goals"
            },
            hint: {
              de: "Nur ausfüllen, wenn oben „Sonstiges“ gewählt wurde.",
              it: "Da compilare solo se sopra è stato scelto «Altro».",
              en: "Only if “Other” was selected above."
            }
          }
        ]
      }
    ]
  },
  {
    id: "lebensraum",
    title: { de: "Lebensraum-Analyse", it: "Analisi dell’habitat", en: "Habitat assessment" },
    intro: {
      de: "Wo liegt das Vorhaben, und welche Lebensräume betrifft es?",
      it: "Dove si trova il progetto e quali habitat riguarda?",
      en: "Where is the project, and which habitats does it affect?"
    },
    groups: [
      {
        title: { de: "Standort", it: "Ubicazione", en: "Location" },
        fields: [
          {
            id: "standortname",
            kind: "text",
            required: true,
            label: {
              de: "Name des Gebiets oder Gewässers",
              it: "Nome dell’area o del corso d’acqua",
              en: "Name of the site or watercourse"
            },
            placeholder: {
              de: "z. B. Rienz bei Bruneck, Feuchtgebiet Ahrntal",
              it: "es. Rienza presso Brunico, zona umida della Valle Aurina",
              en: "e.g. River Rienz near Bruneck, Ahrntal wetland"
            }
          },
          {
            id: "adresse",
            kind: "text",
            label: {
              de: "Adresse, Örtlichkeit oder Grundparzelle",
              it: "Indirizzo, località o particella fondiaria",
              en: "Address, locality or land parcel"
            }
          },
          {
            id: "gemeinde",
            kind: "text",
            required: true,
            half: true,
            label: { de: "Gemeinde", it: "Comune", en: "Municipality" },
            placeholder: { de: "z. B. Brixen", it: "es. Bressanone", en: "e.g. Brixen · Bressanone" }
          },
          {
            id: "bezirksgemeinschaft",
            kind: "select",
            half: true,
            options: districts,
            label: { de: "Bezirksgemeinschaft", it: "Comunità comprensoriale", en: "District community" }
          },
          {
            id: "lebensraum",
            kind: "checkboxes",
            required: true,
            optionsFrom: "habitats",
            label: { de: "Betroffene Lebensräume", it: "Habitat interessati", en: "Habitats concerned" },
            hint: {
              de: "Mehrfachauswahl möglich. Der zuerst gewählte Lebensraum bestimmt später die Darstellung des Projekts auf der Plattform.",
              it: "Selezione multipla possibile. Il primo habitat scelto determina la presentazione del progetto sulla piattaforma.",
              en: "Select as many as apply. The first habitat chosen determines how the project is presented on the platform."
            }
          },
          {
            id: "hoehenlage",
            kind: "number",
            half: true,
            step: "10",
            unit: "m",
            label: { de: "Meereshöhe", it: "Altitudine", en: "Elevation" },
            placeholder: { de: "z. B. 1200", it: "es. 1200", en: "e.g. 1200" },
            hint: {
              de: "Meter über dem Meer; ein Richtwert genügt.",
              it: "Metri sul livello del mare; è sufficiente un valore indicativo.",
              en: "Metres above sea level; an approximate figure is enough."
            }
          },
          {
            id: "standortbeschreibung",
            kind: "textarea",
            label: { de: "Standortbeschreibung", it: "Descrizione del sito", en: "Site description" },
            placeholder: {
              de: "Lage, Größe, heutiger Zustand, bisherige Nutzung",
              it: "Posizione, dimensione, stato attuale, uso attuale",
              en: "Setting, size, current condition, current use"
            }
          }
        ]
      },
      {
        title: {
          de: "Flächen- und Gewässerangaben",
          it: "Dati su superfici e corsi d’acqua",
          en: "Area and watercourse data"
        },
        fields: [
          {
            id: "flaeche_gesamt",
            kind: "number",
            half: true,
            step: "0.01",
            unit: "ha",
            label: { de: "Gesamtfläche des Projekts", it: "Superficie totale del progetto", en: "Total project area" }
          },
          {
            id: "flaeche_aufgewertet",
            kind: "number",
            half: true,
            step: "0.01",
            unit: "ha",
            label: {
              de: "Aufgewertete oder wiederhergestellte Fläche",
              it: "Superficie riqualificata o ripristinata",
              en: "Enhanced or restored area"
            }
          },
          {
            id: "gewaesserlaenge",
            kind: "number",
            half: true,
            step: "0.001",
            unit: "km",
            label: { de: "Gewässerlänge", it: "Lunghezza del corso d’acqua", en: "Length of watercourse" },
            hint: waterHint
          },
          {
            id: "breite",
            kind: "number",
            half: true,
            step: "0.1",
            unit: "m",
            label: { de: "Durchschnittliche Breite", it: "Larghezza media", en: "Average width" },
            hint: waterHint
          }
        ]
      }
    ]
  },
  {
    id: "planung",
    title: { de: "Planung & Budget", it: "Pianificazione e budget", en: "Planning & budget" },
    intro: {
      de: "Welche Maßnahmen sind geplant, wer trägt sie, und wie sind sie finanziert?",
      it: "Quali misure sono previste, chi le realizza e come sono finanziate?",
      en: "Which measures are planned, who carries them out, and how are they financed?"
    },
    groups: [
      {
        title: { de: "Geplante Maßnahmen", it: "Misure previste", en: "Planned measures" },
        fields: [
          {
            id: "massnahmen",
            kind: "textarea",
            required: true,
            label: {
              de: "Beschreibung der geplanten Maßnahmen",
              it: "Descrizione delle misure previste",
              en: "Description of the planned measures"
            },
            placeholder: {
              de: "z. B. Rückbau von Uferverbauungen, Anlegen von Altarmen, Pflanzung heimischer Gehölze",
              it: "es. rimozione di arginature, creazione di lanche, impianto di specie legnose autoctone",
              en: "e.g. removing bank reinforcements, creating side channels, planting native trees"
            }
          },
          {
            id: "methoden",
            kind: "textarea",
            label: {
              de: "Eingesetzte Methoden und Techniken",
              it: "Metodi e tecniche impiegati",
              en: "Methods and techniques used"
            },
            placeholder: {
              de: "z. B. naturnahe Gewässergestaltung, dynamische Entwicklungszonen",
              it: "es. sistemazione naturalistica dei corsi d’acqua, zone a sviluppo dinamico",
              en: "e.g. near-natural river design, dynamic development zones"
            }
          }
        ]
      },
      {
        title: { de: "Kosten und Finanzierung", it: "Costi e finanziamento", en: "Costs and funding" },
        fields: [
          {
            id: "kosten_gesamt",
            kind: "number",
            half: true,
            step: "100",
            unit: "eur",
            label: { de: "Gesamtkosten des Projekts", it: "Costi totali del progetto", en: "Total project cost" }
          },
          {
            id: "foerdermittel",
            kind: "number",
            half: true,
            step: "100",
            unit: "eur",
            label: { de: "Fördermittel", it: "Contributi pubblici", en: "Public funding" }
          },
          {
            id: "eigenanteil",
            kind: "number",
            half: true,
            step: "100",
            unit: "eur",
            label: { de: "Eigenanteil", it: "Quota propria", en: "Own contribution" }
          },
          {
            id: "foerdergeber",
            kind: "textarea",
            label: { de: "Fördergeber", it: "Enti finanziatori", en: "Funding bodies" },
            placeholder: {
              de: "z. B. Autonome Provinz Bozen, EU-LIFE-Programm, Stiftung",
              it: "es. Provincia autonoma di Bolzano, programma UE LIFE, fondazione",
              en: "e.g. Autonomous Province of Bolzano, EU LIFE programme, foundation"
            }
          }
        ]
      },
      {
        title: { de: "Beteiligte Akteure", it: "Soggetti coinvolti", en: "Actors involved" },
        fields: [
          {
            id: "kooperationspartner",
            kind: "textarea",
            label: { de: "Kooperationspartner", it: "Partner di cooperazione", en: "Cooperation partners" },
            placeholder: {
              de: "Namen und Organisationen der beteiligten Partner",
              it: "Nomi e organizzazioni dei partner coinvolti",
              en: "Names and organisations of the partners involved"
            }
          },
          {
            id: "unterstuetzer",
            kind: "textarea",
            label: { de: "Unterstützer und Förderer", it: "Sostenitori e promotori", en: "Supporters and backers" },
            placeholder: {
              de: "z. B. Vereine, Bürgerinitiativen, Unternehmen",
              it: "es. associazioni, iniziative di cittadini, imprese",
              en: "e.g. associations, citizens’ initiatives, companies"
            }
          }
        ]
      },
      {
        title: { de: "Zeitplan und Meilensteine", it: "Cronoprogramma e tappe", en: "Timeline and milestones" },
        fields: [
          {
            id: "meilensteine",
            kind: "textarea",
            label: { de: "Wichtige Meilensteine", it: "Tappe principali", en: "Key milestones" },
            placeholder: {
              de: "z. B. 2026: Planung abgeschlossen · 2027: Baubeginn · 2028: Fertigstellung",
              it: "es. 2026: pianificazione conclusa · 2027: avvio dei lavori · 2028: completamento",
              en: "e.g. 2026: planning complete · 2027: works begin · 2028: completion"
            }
          }
        ]
      }
    ]
  },
  {
    id: "monitoring",
    title: { de: "Monitoring & Wirkung", it: "Monitoraggio e impatto", en: "Monitoring & impact" },
    intro: {
      de: "Woran wird sich zeigen, dass das Projekt wirkt — und wer beobachtet das?",
      it: "Da che cosa si vedrà che il progetto funziona, e chi lo osserverà?",
      en: "How will the project’s effect become visible, and who observes it?"
    },
    groups: [
      {
        title: { de: "Ökologische Auswirkungen", it: "Effetti ecologici", en: "Ecological effects" },
        fields: [
          {
            id: "auswirkungen",
            kind: "textarea",
            label: {
              de: "Erwartete ökologische Auswirkungen",
              it: "Effetti ecologici attesi",
              en: "Expected ecological effects"
            },
            placeholder: {
              de: "z. B. Rückkehr von Fischarten, verbesserter Wasserhaushalt, neue Brutplätze",
              it: "es. ritorno di specie ittiche, migliore bilancio idrico, nuovi siti di nidificazione",
              en: "e.g. return of fish species, improved water balance, new breeding sites"
            }
          },
          {
            id: "monitoring",
            kind: "textarea",
            label: { de: "Geplantes Monitoring", it: "Monitoraggio previsto", en: "Planned monitoring" },
            placeholder: {
              de: "z. B. jährliche Kartierung der Brutvögel, Messung der Wasserqualität",
              it: "es. mappatura annuale degli uccelli nidificanti, misurazione della qualità delle acque",
              en: "e.g. annual breeding-bird survey, water quality measurements"
            }
          }
        ]
      },
      {
        title: {
          de: "Öffentlichkeitsarbeit und Bildung",
          it: "Comunicazione ed educazione",
          en: "Public outreach and education"
        },
        fields: [
          {
            id: "oeffentlichkeitsarbeit",
            kind: "textarea",
            label: {
              de: "Maßnahmen zur Öffentlichkeitsarbeit",
              it: "Attività di comunicazione",
              en: "Public outreach measures"
            },
            placeholder: {
              de: "z. B. Infotafeln, Führungen, Werkstätten, Website",
              it: "es. pannelli informativi, visite guidate, laboratori, sito web",
              en: "e.g. information panels, guided walks, workshops, website"
            }
          },
          {
            id: "bildung",
            kind: "textarea",
            label: { de: "Bildungsangebote", it: "Offerte formative", en: "Educational offerings" },
            placeholder: {
              de: "z. B. Schulprogramme, Citizen-Science-Projekte",
              it: "es. programmi scolastici, progetti di citizen science",
              en: "e.g. school programmes, citizen science projects"
            }
          }
        ]
      }
    ]
  },
  {
    id: "einreichen",
    title: { de: "Veröffentlichen & einreichen", it: "Pubblicare e presentare", en: "Publish & submit" },
    intro: {
      de: "Belege ergänzen, Angaben prüfen, Einreichung abschließen.",
      it: "Aggiungere documenti, verificare i dati, concludere la presentazione.",
      en: "Add supporting material, check the entries, complete the submission."
    },
    groups: [
      {
        title: { de: "Anhang", it: "Allegati", en: "Attachments" },
        fields: [
          {
            id: "anhang",
            kind: "textarea",
            label: {
              de: "Weitere Dokumente oder Links",
              it: "Altri documenti o link",
              en: "Additional documents or links"
            },
            placeholder: {
              de: "Links zu Studien, Plänen, Karten, Fotos",
              it: "Link a studi, piani, mappe, fotografie",
              en: "Links to studies, plans, maps, photographs"
            },
            hint: {
              de: "Dateien lassen sich der E-Mail im letzten Schritt anhängen.",
              it: "I file possono essere allegati all’e-mail nell’ultimo passaggio.",
              en: "Files can be attached to the email in the final step."
            }
          }
        ]
      },
      {
        title: { de: "Einwilligung", it: "Consenso", en: "Consent" },
        fields: [
          {
            id: "datenschutz",
            kind: "consent",
            required: true,
            label: {
              de: "Ich stimme zu, dass die hier gemachten Angaben zur Prüfung des Projekts gespeichert und verarbeitet werden.",
              it: "Acconsento alla conservazione e al trattamento dei dati indicati ai fini della valutazione del progetto.",
              en: "I agree that the information provided here may be stored and processed in order to review the project."
            }
          }
        ]
      }
    ]
  }
];

/** Alle Felder in Reihenfolge — für Zusammenfassung, Prüfung und Versand. */
export const allFields: Field[] = formSteps.flatMap((step) =>
  step.groups.flatMap((group) => group.fields)
);

export function findStepIndexOfField(fieldId: string): number {
  return formSteps.findIndex((step) =>
    step.groups.some((group) => group.fields.some((field) => field.id === fieldId))
  );
}
