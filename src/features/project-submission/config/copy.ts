import type { Locale } from "@/config/site";

/**
 * Texte der Formularhülle — alles, was nicht Feldbeschriftung ist.
 *
 * Sprachzuerst wie `translations.ts`: Es sind wenige, zusammenhängende Sätze,
 * und sie wollen als Sprache gelesen werden. Die Feldbeschriftungen liegen aus
 * dem in `model/types.ts` beschriebenen Grund umgekehrt.
 */
export type SubmissionCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  backToOverview: string;
  stepOf: (current: number, total: number) => string;
  stepsLabel: string;
  required: string;
  requiredNote: string;
  optional: string;
  next: string;
  back: string;
  reviewTitle: string;
  reviewCopy: string;
  edit: string;
  notProvided: string;
  submit: string;
  errorTitle: string;
  errorCopy: (count: number) => string;
  errors: {
    required: string;
    choice: string;
    email: string;
    endBeforeStart: string;
    consent: string;
  };
  budgetHint: (parts: string, total: string) => string;
  draftSaved: string;
  draftDiscard: string;
  draftDiscardConfirm: string;
  doneTitle: string;
  doneCopy: string;
  doneMailFallback: string;
  openMail: string;
  download: string;
  print: string;
  restart: string;
  attachNote: string;
  mailSubject: (project: string) => string;
  mailIntro: string;
};

const copy: Record<Locale, SubmissionCopy> = {
  de: {
    eyebrow: "Projekteinreichung",
    title: "Ihr Projekt beschreiben.",
    lead: "Fünf Schritte von der Projektidee bis zur Einreichung. Sie können jederzeit zurückgehen und Angaben ändern.",
    backToOverview: "Zur Übersicht",
    stepOf: (current, total) => `Schritt ${current} von ${total}`,
    stepsLabel: "Schritte der Einreichung",
    required: "Pflichtfeld",
    requiredNote: "Mit * gekennzeichnete Felder sind Pflichtfelder.",
    optional: "optional",
    next: "Weiter",
    back: "Zurück",
    reviewTitle: "Angaben prüfen",
    reviewCopy: "Bitte lesen Sie Ihre Angaben noch einmal durch. Über „Bearbeiten“ kommen Sie in den jeweiligen Schritt zurück.",
    edit: "Bearbeiten",
    notProvided: "keine Angabe",
    submit: "Projekt einreichen",
    errorTitle: "Bitte ergänzen",
    errorCopy: (count) =>
      count === 1 ? "Eine Angabe fehlt noch oder ist unvollständig." : `${count} Angaben fehlen noch oder sind unvollständig.`,
    errors: {
      required: "Bitte ausfüllen.",
      choice: "Bitte mindestens eine Möglichkeit wählen.",
      email: "Bitte eine gültige E-Mail-Adresse angeben.",
      endBeforeStart: "Das Projektende liegt vor dem Projektstart.",
      consent: "Ohne diese Zustimmung können wir die Angaben nicht prüfen."
    },
    budgetHint: (parts, total) =>
      `Fördermittel und Eigenanteil ergeben zusammen ${parts}, angegeben sind Gesamtkosten von ${total}. Das kann so stimmen — prüfen Sie es bitte kurz.`,
    draftSaved: "Entwurf lokal gespeichert",
    draftDiscard: "Entwurf verwerfen",
    draftDiscardConfirm: "Wirklich alle Eingaben löschen?",
    doneTitle: "Ihre Einreichung ist fertig.",
    doneCopy:
      "Wir haben eine E-Mail an info@balance-suedtirol.it vorbereitet und in Ihrem E-Mail-Programm geöffnet. Eingereicht ist das Projekt, sobald Sie dort auf „Senden“ klicken — automatisch übertragen wird nichts.",
    doneMailFallback:
      "Hat sich kein E-Mail-Programm geöffnet? Speichern Sie die Angaben als Datei und senden Sie sie an info@balance-suedtirol.it.",
    openMail: "E-Mail erneut öffnen",
    download: "Als Textdatei speichern",
    print: "Drucken oder als PDF sichern",
    restart: "Neue Einreichung beginnen",
    attachNote:
      "Ihre Angaben sind zu umfangreich für eine vorausgefüllte E-Mail. Die vollständige Fassung wurde als Datei gespeichert — bitte hängen Sie sie der E-Mail an.",
    mailSubject: (project) => `Projekteinreichung: ${project}`,
    mailIntro: "Einreichung über die Plattform b*alance"
  },
  it: {
    eyebrow: "Presentazione del progetto",
    title: "Descrivere il vostro progetto.",
    lead: "Cinque passaggi, dall’idea di progetto alla presentazione. Potete tornare indietro e modificare i dati in qualsiasi momento.",
    backToOverview: "Torna alla panoramica",
    stepOf: (current, total) => `Passaggio ${current} di ${total}`,
    stepsLabel: "Passaggi della presentazione",
    required: "Campo obbligatorio",
    requiredNote: "I campi contrassegnati con * sono obbligatori.",
    optional: "facoltativo",
    next: "Avanti",
    back: "Indietro",
    reviewTitle: "Verificare i dati",
    reviewCopy: "Rileggete i dati inseriti. Con «Modifica» tornate al passaggio corrispondente.",
    edit: "Modifica",
    notProvided: "nessun dato",
    submit: "Presenta il progetto",
    errorTitle: "Da completare",
    errorCopy: (count) =>
      count === 1 ? "Manca ancora un dato o è incompleto." : `Mancano ancora ${count} dati o sono incompleti.`,
    errors: {
      required: "Campo da compilare.",
      choice: "Selezionate almeno un’opzione.",
      email: "Indicate un indirizzo e-mail valido.",
      endBeforeStart: "La fine del progetto precede l’inizio.",
      consent: "Senza questo consenso non possiamo esaminare i dati."
    },
    budgetHint: (parts, total) =>
      `Contributi pubblici e quota propria danno insieme ${parts}, mentre i costi totali indicati sono ${total}. Può essere corretto — vi chiediamo solo di verificarlo.`,
    draftSaved: "Bozza salvata localmente",
    draftDiscard: "Elimina la bozza",
    draftDiscardConfirm: "Eliminare davvero tutti i dati inseriti?",
    doneTitle: "La vostra presentazione è pronta.",
    doneCopy:
      "Abbiamo preparato un’e-mail per info@balance-suedtirol.it e l’abbiamo aperta nel vostro programma di posta. Il progetto è presentato quando premete «Invia» — nulla viene trasmesso automaticamente.",
    doneMailFallback:
      "Non si è aperto nessun programma di posta? Salvate i dati come file e inviateli a info@balance-suedtirol.it.",
    openMail: "Riapri l’e-mail",
    download: "Salva come file di testo",
    print: "Stampa o salva in PDF",
    restart: "Inizia una nuova presentazione",
    attachNote:
      "I dati sono troppo estesi per un’e-mail precompilata. La versione completa è stata salvata come file: allegatelo all’e-mail.",
    mailSubject: (project) => `Presentazione di progetto: ${project}`,
    mailIntro: "Presentazione tramite la piattaforma b*alance"
  },
  en: {
    eyebrow: "Project submission",
    title: "Describe your project.",
    lead: "Five steps from project idea to submission. You can go back and change your entries at any time.",
    backToOverview: "Back to overview",
    stepOf: (current, total) => `Step ${current} of ${total}`,
    stepsLabel: "Submission steps",
    required: "Required",
    requiredNote: "Fields marked with * are required.",
    optional: "optional",
    next: "Continue",
    back: "Back",
    reviewTitle: "Check your entries",
    reviewCopy: "Please read through your entries once more. “Edit” takes you back to the relevant step.",
    edit: "Edit",
    notProvided: "not provided",
    submit: "Submit project",
    errorTitle: "Please complete",
    errorCopy: (count) =>
      count === 1 ? "One entry is still missing or incomplete." : `${count} entries are still missing or incomplete.`,
    errors: {
      required: "Please complete this field.",
      choice: "Please choose at least one option.",
      email: "Please enter a valid email address.",
      endBeforeStart: "The project ends before it starts.",
      consent: "Without this consent we cannot review your entries."
    },
    budgetHint: (parts, total) =>
      `Public funding and own contribution add up to ${parts}, while the stated total cost is ${total}. That may well be correct — please just double-check.`,
    draftSaved: "Draft saved locally",
    draftDiscard: "Discard draft",
    draftDiscardConfirm: "Really delete all entries?",
    doneTitle: "Your submission is ready.",
    doneCopy:
      "We have prepared an email to info@balance-suedtirol.it and opened it in your mail programme. The project is submitted once you press “Send” there — nothing is transmitted automatically.",
    doneMailFallback:
      "No mail programme opened? Save your entries as a file and send them to info@balance-suedtirol.it.",
    openMail: "Open the email again",
    download: "Save as text file",
    print: "Print or save as PDF",
    restart: "Start a new submission",
    attachNote:
      "Your entries are too long for a pre-filled email. The complete version has been saved as a file — please attach it to the email.",
    mailSubject: (project) => `Project submission: ${project}`,
    mailIntro: "Submission via the b*alance platform"
  }
};

export function getSubmissionCopy(locale: Locale): SubmissionCopy {
  return copy[locale];
}

/** Empfängeradresse, identisch mit dem Impressum. */
export const submissionRecipient = "info@balance-suedtirol.it";
