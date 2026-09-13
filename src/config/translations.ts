import type { Locale } from "./site";

const translations = {
  de: {
    nav: ["Projekte"],
    navLabel: "Hauptnavigation",
    skipToContent: "Zum Hauptinhalt springen",
    mobileNavLabel: "Mobile Navigation",
    headerCta: "Check starten",
    projectOwners: "Für Projektträger",
    submitProject: "Projekt einreichen",
    menu: "Menü öffnen",
    footer: {
      mission: "Eine digitale Plattform, die Menschen, Projekte und Biodiversität in Südtirol verbindet.",
      science: "Wissenschaftlich fundierte Methodik und transparente Projektdokumentation.",
      methodology: "Methodik",
      carbonStance: "CO₂ & Biodiversität",
      explore: "Entdecken",
      habitatCheck: "Lebensraum-Check",
      projects: "Projekte",
      submitProject: "Projekt einreichen",
      about: "Über uns",
      aboutBalance: "Über uns",
      privacy: "Datenschutz",
      imprint: "Impressum",
      copyright: "© 2026 b*alance",
      closing: "Für die Biodiversität in Südtirol gemacht."
    },
    hero: {
      eyebrow: "Lebensraum-Check für Südtirol",
      title: "Biodiversität ist die",
      accent: "Grundlage unseres Lebens.",
      copy: "Mit kurzen Fragen erfährst du, wie dein Alltag mit der Natur in Südtirol zusammenhängt und welche Projekte zu ihrem Schutz beitragen.",
      tour: "Check starten · 3–5 Minuten",
      projects: "Geprüfte Projekte ansehen",
      trust: "Die Ergebnisse dienen der Orientierung.",
      methodology: "Methodik & Quellen",
      photo: "Foto",
      quotesLabel: "Stimmen aus Südtirol",
      quoteItem: "Zitat",
      quotesMockup: "Musterzitate"
    },
    house: {
      eyebrow: "Von Räumen zu Lebensräumen",
      title: "Entdecke Raum für Raum, wie dein Alltag die Biodiversität beeinflusst.",
      copy: "Jeder Raum steht für einen Bereich deines Alltags. Entdecke, wie deine Entscheidungen mit Artenvielfalt und Lebensräumen zusammenhängen und welche Auswirkungen sie außerhalb deiner vier Wände haben.",
      open: "Lebensraum-Check öffnen",
      rooms: [
        ["Küche", "Ernährung & Herkunft"],
        ["Bad", "Wasser & Ressourcen"],
        ["Schlafzimmer", "Energie & Materialien"],
        ["Garage", "Wege & Verkehr"],
        ["Garten", "Lebensräume & Biodiversität"],
        ["Wohnzimmer", "Reiseziele & Mobilität"]
      ]
    },
    featured: {
      eyebrow: "Lokale Projekte",
      title: "Entdecke Projekte, die Lebensräume stärken.",
      copy: "Jedes Projekt trägt dazu bei, Biodiversität in Südtirol zu erhalten oder wiederherzustellen. Verfolge den Fortschritt, lerne die Menschen dahinter kennen und unterstütze Projekte, die dir am Herzen liegen.",
      all: "Alle Projekte",
      previous: "Vorheriges Projekt",
      next: "Nächstes Projekt",
      stanceButton: "Warum nicht CO₂?",
      stanceReadMore: "Ganze Haltung lesen",
      stanceClose: "Schließen"
    },
    news: {
      eyebrow: "Aktuelles",
      title: "Neuigkeiten und Veranstaltungen.",
      copy: "Was auf den Projektflächen passiert und wo man mitkommen kann: Begehungen, Pflanzaktionen und neue Ergebnisse aus dem Monitoring.",
      kinds: {
        news: "Neuigkeit",
        event: "Veranstaltung"
      },
      empty: "Zurzeit sind keine Termine angekündigt."
    },
    achievements: {
      eyebrow: "Bisher erreicht",
      title: "Was auf den Flächen entstanden ist.",
      copy: "Die Kennzahlen fassen den Stand aller Projekte auf der Plattform zusammen. Sie werden aus den Projektdaten gerechnet und ändern sich mit ihnen.",
      stats: {
        projects: "Projekte auf der Plattform",
        habitats: "Lebensraumtypen",
        supporters: "Unterstützerinnen und Unterstützer",
        funded: "zugesagte Mittel"
      },
      completedEyebrow: "Abgeschlossen",
      completedTitle: "Projekte, die fertig sind und weiterwirken.",
      completedEmpty: "Noch ist kein Projekt abgeschlossen. Sobald das erste seine Pflegephase beendet, steht es hier."
    },
    partners: {
      eyebrow: "Getragen von",
      title: "Partner, die die Plattform möglich machen.",
      copy: "b*alance wird von Organisationen unterstützt, die Betrieb, Prüfung und Reichweite mittragen. Was jede Partnerschaft beiträgt, steht offen dabei.",
      placeholderNote: "Alle Einträge sind Platzhalter, bis eine Partnerschaft bestätigt und ihre Nennung freigegeben ist.",
      become: "Partner werden"
    },
    sciencePartners: {
      eyebrow: "Fachliche Begleitung",
      title: "Wer die Methodik mitprüft.",
      copy: "Lebensraumtypologie, Monitoringprotokolle und Kennzahlen werden fachlich begleitet. Die Begleitung prüft die Methodik — die Verantwortung für die Inhalte bleibt bei der Plattform."
    },
    impact: {
      eyebrow: "VOM WISSEN ZUM HANDELN",
      title: "Gemeinsam Lebensräume stärken.",
      copy: "Entdecke Projekte, unterstütze bestehende Initiativen oder bringe deine eigene Idee ein. Gemeinsam schaffen wir mehr Raum für Biodiversität in Südtirol.",
      cta: "Lokale Projekte entdecken",
      features: [
        ["Regional", "Projekte für die Natur direkt vor deiner Haustür."],
        ["Transparent", "Klare Kriterien sowie offen dokumentierte Maßnahmen und Fortschritte."],
        ["Wirksam", "Jedes Projekt stärkt Lebensräume und fördert die Biodiversität in Südtirol."]
      ]
    },
    biodiversityExplainer: {
      button: "Was ist Biodiversität?",
      eyebrow: "Biodiversität",
      title: "Die Vielfalt, von der alles andere abhängt.",
      lead: "Biodiversität ist die Vielfalt des Lebens auf drei Ebenen: die Vielfalt der Arten, die genetische Vielfalt innerhalb der Arten und die Vielfalt der Lebensräume, in denen sie vorkommen. In Südtirol reicht sie von der Trockenwiese im Vinschgau bis zum Hochmoor im Pustertal.",
      servicesTitle: "Was sie leistet",
      services: [
        "Bestäubung: Wildbienen, Schmetterlinge und andere Insekten bestäuben Obst, Gemüse und Wildpflanzen.",
        "Wasser und Boden: Artenreiche Wiesen und Hecken halten Wasser im Hang, schützen vor Erosion und bauen Boden auf.",
        "Widerstandskraft: Vielfältige Lebensräume überstehen Dürre, Starkregen und Schädlinge besser als verarmte.",
        "Klima: Intakte Moore, alte Wiesenböden und Hecken speichern Kohlenstoff – als Wirkung, nicht als Ware."
      ],
      economyTitle: "Warum der Verlust auch wirtschaftlich zählt",
      economyCopy: "Der Weltbiodiversitätsrat beziffert die Geldflüsse in naturzerstörende Aktivitäten allein für 2023 auf rund 7,3 Billionen US-Dollar – etwa 33-mal so viel, wie Staaten und Unternehmen für den Erhalt der Natur ausgaben. In der Eurozone hängen rund 75 Prozent der Unternehmenskredite in hohem Maße von mindestens einer Ökosystemleistung ab; die Förderbank KfW schätzt, dass zwei Drittel der EU-Wirtschaftsleistung direkt oder indirekt auf Ökosystemleistungen beruhen. Naturverlust ist damit kein Randthema, sondern ein systemisches Risiko.",
      localTitle: "Was das für Südtirol heißt",
      localCopy: "Eine Landwirtschaft, die auf Bestäubung angewiesen ist, ein Tourismus, der von Landschaft lebt, und Siedlungen an Hängen, die stabile Böden brauchen: Hier ist Biodiversität keine abstrakte Größe, sondern die Grundlage von Alltag und Einkommen. Jedes Projekt auf dieser Plattform erhält oder stellt ein Stück davon wieder her.",
      source: "Zahlen nach: Der Spiegel 37/2026, „Wenn die Umweltkrise zur Finanzkrise wird“ (Tim Bartz, Markus Becker), mit Bezug auf den Weltbiodiversitätsrat IPBES, eine Studie in „Nature“ (September 2025) und die KfW.",
      cta: "Lebensraum-Check starten"
    },
    about: {
      eyebrow: "Wer dahinter steht",
      title: "Biodiversität vor Ort erhalten und stärken – das ist das Thema.",
      lead: "b*alance ist aus der Arbeit einer Südtiroler Biologin/eines Südtiroler Biologen entstanden, die sich seit Jahren mit einer Frage beschäftigt: Wie lässt sich die Artenvielfalt dort bewahren und fördern, wo wir leben – in der Gemeinde, auf der Wiese hinterm Hof, am Bach im Ort?",
      personEyebrow: "Die Person",
      personName: "Name Platzhalter",
      personRole: "Biolog:in, Südtirol",
      personBio: [
        "Ausbildung in Biologie, Schwerpunkt Ökologie und Naturschutz. Die Arbeit findet weniger am Schreibtisch als in der Fläche statt: Trockenrasen, Feuchtgebiete, Hecken und Streuobstwiesen in Südtirol kartieren, Pflegemaßnahmen planen und begleiten, mit Gemeinden, Bäuerinnen und Bauern, Schulen und Naturschutzgruppen zusammenarbeiten.",
        "Die Überzeugung dahinter: Biodiversität ist kein Ersatzmaß für Klimaschutz und keine Ware, die sich verrechnen lässt. Sie ist die Grundlage, auf der alles andere steht – und sie lässt sich nur dort erhalten, wo sie ist. Deshalb geht es hier um konkrete Flächen in Südtirol, nicht um Zertifikate."
      ],
      personPlaceholder: "Platzhalter – Name, Foto und Lebenslauf folgen.",
      orgsEyebrow: "Zwei Initiativen, ein Ziel",
      orgsTitle: "b*nature und b*coop",
      orgs: [
        {
          name: "b*nature",
          role: "Naturschutz in der Fläche",
          copy: "b*nature plant und führt Biodiversitätsprojekte in Südtirol durch: Biotoppflege mit Schaf- und Ziegenherden, Erhebungen zu gefährdeten Arten, Bildungsarbeit mit Gemeinden und Schulen. Auf dieser Plattform ist b*nature Trägerin der Projekte „Meine Gemeinde, meine Natur“ und „Vorfahrt für den Igel“.",
          cta: "Projekte von b*nature"
        },
        {
          name: "b*coop",
          role: "Plattform und Beratung",
          copy: "b*coop betreibt die Plattform b*alance: den Lebensraum-Check, die Prüfung und Dokumentation der Projekte und die Verbindung zu Fachberater:innen für Biodiversität, Energie und Ressourcen. Ziel ist, dass aus dem Verstehen ein Verringern wird – und aus dem Verringern ein Stärken vor Ort.",
          cta: "Lebensraum-Check"
        }
      ],
      principlesEyebrow: "Wie wir arbeiten",
      principlesTitle: "Fünf Regeln, an denen wir uns messen lassen.",
      principles: [
        ["Vor Ort statt irgendwo", "Jedes Projekt liegt in Südtirol, hat eine Adresse und lässt sich besuchen."],
        ["Geprüft, bevor es online geht", "Ein Fachgremium aus Ökologie, Agrar- und Umweltwissenschaften prüft Ziele, Laufzeit und Budget jedes Projekts."],
        ["Messbar statt gefühlt", "Habitatfläche, Strukturvielfalt und Zielarten werden festgelegt und im Monitoring nachgehalten."],
        ["Verringern vor Ausgleichen", "Der Check zeigt, wo die eigenen Zahlen groß sind. Ein Kompensationsversprechen geben wir nicht."],
        ["Keine Aussage ohne Beleg", "Was wir nicht belegen können, streichen wir – auch auf dieser Seite."]
      ],
      ctaTitle: "Mitmachen",
      ctaCopy: "Ein Projekt unterstützen, ein eigenes einreichen oder einfach mit dem Check anfangen.",
      ctaProjects: "Projekte ansehen",
      ctaSubmit: "Projekt einreichen",
      ctaMethod: "Methodik & Quellen"
    },
    carbonStance: {
      eyebrow: "CO₂ & Biodiversität",
      title: "Warum es hier keinen Kompensationsrechner gibt.",
      lead: "Der Lebensraum-Check rechnet aus, wie viel CO₂ dein Alltag verursacht. Er bietet dir aber nicht an, diese Menge gegen einen Betrag wieder auszugleichen. Das ist keine Lücke, sondern eine Entscheidung — und hier stehen die Gründe dafür.",
      scopeEyebrow: "Bilanzgrenze",
      scopeTitle: "Was der Check rechnet, und was er nicht behauptet.",
      scopeCopy: "Der CO₂e-Wert im Ergebnis ist ein transparenter Ausschnitt der abgefragten Aktivitäten pro Person und Jahr. Vorketten sind nur enthalten, wenn der jeweilige Faktor sie ausdrücklich abbildet; Konsum, Gebäude und öffentliche Leistungen fehlen. Aus dieser bewusst vereinfachten Zahl einen Euro-Betrag abzuleiten, würde ihr eine Genauigkeit geben, die sie nicht hat.",
      reasonsEyebrow: "Vier Gründe",
      reasonsTitle: "Warum sich Ausstoß nicht sauber gegenrechnen lässt.",
      reasons: [
        ["Eine Tonne ist überall gleich. Ein Lebensraum nicht.", "Kompensation lebt davon, dass eine Tonne hier gegen eine Tonne irgendwo tauschbar ist. Ein Moor im Pustertal hat diesen Tauschwert nicht. Was dort verloren geht, entsteht anderswo nicht noch einmal — nicht mit denselben Arten, nicht im selben Wasserhaushalt, nicht an derselben Stelle im Gefüge."],
        ["Die Emission wirkt sofort, die Speicherung braucht Jahrzehnte.", "Kohlenstoff, der heute frei wird, wirkt heute. Eine Hecke, eine Magerwiese, ein wiedervernässtes Moor binden ihn über Jahrzehnte — und nur so lange, wie die Fläche bleibt, was sie ist. Dürre, Brand oder eine geänderte Nutzung drehen die Bindung wieder zurück. Diese zeitliche Lücke verschwindet nicht dadurch, dass eine Bilanz sie auf null setzt."],
        ["Bezahlt ist nicht vermieden.", "Ein Rechner, der am Ende einen Betrag nennt, verschiebt die Frage von „Was ändere ich?“ zu „Was kostet es?“. Der Check ist für die erste Frage gebaut. Er zeigt dir, wo deine eigenen Zahlen groß sind — weil dort auch dein Handlungsspielraum am größten ist."],
        ["Wir könnten das Versprechen nicht belegen.", "Ein Ausgleich müsste nachweisen, dass eine Fläche ohne die Zahlung nicht entstanden wäre und dass sie dauerhaft bleibt. Diesen Nachweis kann die Plattform heute nicht führen. Eine Aussage ohne Beleg gehört nach unseren eigenen Regeln gestrichen, nicht eingebaut."]
      ],
      insteadEyebrow: "Was stattdessen zählt",
      insteadTitle: "Lebensräume erhalten und wiederherstellen.",
      insteadCopy: "Biodiversität ist hier kein Ersatzmaß für Klimaschutz, sondern ein eigener Grund. Eine artenreiche Wiese bietet Lebensraum, hält Wasser im Hang, trägt Boden und übersteht ein trockenes Jahr besser als eine verarmte. Wer sie erhält, gleicht damit nichts aus — er erhält die Grundlage, auf der alles andere steht.",
      storageTitle: "Kohlenstoff kommt trotzdem vor — als Wirkung, nicht als Ware.",
      storageCopy: "Intakte Moore, alte Wiesenböden, Hecken und Streuobstbestände speichern Kohlenstoff. Das ist eine reale Wirkung intakter Lebensräume und ein guter Grund, sie zu schützen. Wir schreiben diese Speicherung aber niemandem gut und rechnen sie nicht in Tonnen um. In dem Moment, in dem man sie als Gegenwert verkauft, steht man wieder bei dem Versprechen, das wir gerade nicht geben wollen.",
      pathEyebrow: "Der Weg stattdessen",
      pathTitle: "Verstehen, verringern, vor Ort stärken.",
      path: [
        ["Verstehen", "Der Check zeigt dir Größenordnungen statt einer Rechnung, die sich begleichen lässt."],
        ["Verringern", "Dort ansetzen, wo die eigenen Zahlen groß sind — das bleibt der wirksamste Schritt."],
        ["Vor Ort stärken", "Ein Projekt in Südtirol unterstützen, das sich besuchen und nachprüfen lässt."]
      ],
      ctaProjects: "Projekte ansehen",
      ctaMethod: "Methodik & Annahmen"
    },
    projectSubmission: {
      eyebrow: "Für Projektträger",
      title: "Ihr Projekt stärkt Lebensräume in Südtirol?",
      copy: "Reichen Sie es zur transparenten Prüfung und möglichen Aufnahme in die Plattform ein.",
      cta: "Projekt zur Prüfung einreichen"
    },
    projectsPage: {
      eyebrow: "Projektplattform",
      title: "Gemeinsam Lebensräume erhalten.",
      copy: "Entdecke Projekte, die Wälder, Gewässer, Kulturlandschaften und andere Lebensräume in Südtirol schützen, aufwerten oder wiederherstellen. Verfolge ihre Entwicklung und unterstütze die Projekte, die dir wichtig sind.",
      filterTitle: "Welcher Lebensraum interessiert dich?",
      filterCopy: "Wähle einen Lebensraum oder suche nach einem Projekt in Südtirol.",
      search: "Projekt oder Ort suchen …",
      result: "Projekt",
      results: "Projekte",
      moreFilters: "Weitere Filter",
      crowdfunding: "Crowdfunding",
      allCrowdfunding: "Alle Finanzierungsstände",
      crowdfundingOpen: "Unterstützung möglich",
      crowdfundingFunded: "Finanzierungsziel erreicht",
      phase: "Projektphase",
      allPhases: "Alle Projektphasen",
      phases: {
        planning: "Planung",
        implementation: "Umsetzung",
        monitoring: "Monitoring",
        completed: "Abschluss"
      },
      reset: "Filter zurücksetzen",
      empty: "Keine passenden Projekte gefunden",
      emptyHint: "Versuche einen anderen Suchbegriff oder setze die Filter zurück.",
      showAll: "Alle Projekte anzeigen",
      statusFilter: "Projektstatus",
      allStatuses: "Alle Projekte",
      statuses: {
        "support-needed": "Unterstützung gesucht",
        "in-progress": "In Umsetzung",
        monitoring: "Monitoring",
        completed: "Abgeschlossen"
      }
    },
    projectDetail: {
      back: "Zurück zu den Projekten",
      verified: "Geprüfter Projektträger",
      habitats: "Lebensräume",
      location: "Projektstandort",
      municipality: "Gemeinde",
      organization: "Projektträger",
      mapLabel: "Südtirol im Umriss mit den Standorten aller Projekte; das ausgewählte Projekt ist hervorgehoben.",
      mapAttribution: "Punktfarbe = primärer Lebensraum · Umriss: © OpenStreetMap-Mitwirkende (ODbL)",
      openMap: "Auf OpenStreetMap ansehen",
      whyMatters: "Warum dieses Projekt wichtig ist",
      whatItDoes: "Was das Projekt konkret tut",
      beforeAfterTitle: "Vorher / Nachher",
      beforeAfterCopy: "Vorher und nachher vom selben Standpunkt – Regler ziehen, um zu vergleichen.",
      before: "Vorher",
      after: "Nachher",
      beforeAfterSliderLabel: "Vergleich zwischen Vorher und Nachher",
      beforeAfterPlaceholderNote: "Platzhalter: Bis echte Vorher-Fotos vorliegen, zeigt die linke Seite eine bearbeitete Version des Projektfotos.",
      galleryTitle: "Blick in die Fläche",
      galleryCopy: "Aufnahmen aus dem Projektgebiet: die Flächen, die Maßnahmen und die Arten, um die es hier geht.",
      photo: "Foto",
      ecologicalImpact: "Ökologische Wirkung",
      impactCopy: "Messbare Ziele machen sichtbar, welchen Beitrag das Projekt für Lebensräume und Artenvielfalt leisten soll.",
      timeline: "Projektverlauf",
      timelineCopy: "Der aktuelle Stand und die nächsten Schritte auf einen Blick.",
      steps: {
        planning: "Planung",
        funding: "Finanzierung",
        implementation: "Umsetzung",
        monitoring: "Monitoring",
        evaluation: "Abschlussevaluierung"
      },
      current: "Aktueller Schritt",
      completed: "Abgeschlossen",
      upcoming: "Als Nächstes",
      monitoring: "Monitoring",
      monitoringCopy: "Die ökologische Entwicklung wird nach festen Kriterien beobachtet und regelmäßig dokumentiert.",
      species: "Beobachtete Artengruppen",
      surveys: "Erhebungen",
      reporting: "Berichtszyklus",
      openReport: "Beispielbericht öffnen",
      reportTitle: "Monitoringbericht · Beispiel",
      reportNote: "Die Projektdaten sind derzeit Platzhalter. Der finale Bericht wird hier mit Methodik, Rohdaten und Ergebnissen veröffentlicht.",
      methodology: "Methodik ansehen",
      funding: "Projektfinanzierung",
      fundingProgress: "Finanzierungsstand",
      fundingTarget: "von {goal} Zielsumme",
      fundingOpen: "Das Finanzierungsziel steht noch nicht fest. Sobald es die Trägerorganisation festgelegt hat, steht der Finanzierungsstand hier.",
      supporters: "Unterstützer",
      support: "Projekt unterstützen",
      tax: "Steuerlich absetzbar",
      share: "Teilen",
      transparency: "Trägerorganisation & Transparenz",
      transparencyCopy: "Maßnahmenplan, Monitoring und Ergebnisse werden nachvollziehbar dokumentiert und auf dieser Seite aktualisiert.",
      sponsorsEyebrow: "Ermöglicht durch",
      sponsorsTitle: "Förderpartner des Projekts",
      mainSponsor: "Hauptförderer",
      supportingSponsors: "Weitere Förderpartner",
      relatedEyebrow: "Weitere Initiativen",
      relatedTitle: "Ähnliche Projekte in Südtirol",
      showAll: "Alle anzeigen",
      finalTitle: "Möchtest du zu diesem Lebensraum beitragen?",
      finalCopy: "Unterstütze das Projekt direkt oder entdecke weitere Biodiversitätsprojekte in Südtirol.",
      discoverMore: "Weitere Biodiversitätsprojekte",
      close: "Dialog schließen",
      thankYou: "Vielen Dank für deine Unterstützung!",
      thankYouCopy: "Du leistest einen wertvollen Beitrag für die Südtiroler Natur.",
      donation: "Spende",
      sponsorship: "Patenschaft",
      volunteering: "Mithelfen",
      amount: "Beitragsbetrag (€)",
      volunteeringCopy: "Als ehrenamtliche Person unterstützt du bei Pflanzaktionen und Monitoring vor Ort. Wir senden dir alle Details per E-Mail.",
      confirm: "Jetzt verbindlich bestätigen"
    },
    card: { view: "Projekt ansehen", of: "von", supporters: "Unterstützer", funding: "Finanzierung", open: "offen", status: "Projektstatus", mainSponsor: "Hauptförderer", placeholder: "Platzhalter", partner: "Partner" }
  },
  it: {
    nav: ["Progetti"],
    navLabel: "Navigazione principale",
    skipToContent: "Vai al contenuto principale",
    mobileNavLabel: "Navigazione mobile",
    headerCta: "Avvia il check",
    projectOwners: "Per chi propone progetti",
    submitProject: "Proponi un progetto",
    menu: "Apri il menu",
    footer: {
      mission: "Una piattaforma digitale che connette persone, progetti e biodiversità in Alto Adige.",
      science: "Metodologia scientificamente fondata e documentazione trasparente dei progetti.",
      methodology: "Metodo",
      carbonStance: "CO₂ e biodiversità",
      explore: "Scopri",
      habitatCheck: "Check degli habitat",
      projects: "Progetti",
      submitProject: "Proponi un progetto",
      about: "Informazioni",
      aboutBalance: "Chi siamo",
      privacy: "Privacy",
      imprint: "Note legali",
      copyright: "© 2026 b*alance",
      closing: "Creato per la biodiversità in Alto Adige."
    },
    hero: {
      eyebrow: "Check degli habitat per l’Alto Adige",
      title: "La biodiversità è la",
      accent: "base della nostra vita.",
      copy: "Con brevi domande scoprirai come le tue scelte quotidiane influenzano la natura in Alto Adige e quali progetti contribuiscono alla sua tutela.",
      tour: "Avvia il check · 3–5 minuti",
      projects: "Vedi i progetti verificati",
      trust: "I risultati servono da orientamento.",
      methodology: "Metodo & fonti",
      photo: "Foto",
      quotesLabel: "Voci dall’Alto Adige",
      quoteItem: "Citazione",
      quotesMockup: "Citazioni di esempio"
    },
    house: {
      eyebrow: "Dagli ambienti agli habitat",
      title: "Scopri ambiente per ambiente come le tue scelte influenzano la biodiversità.",
      copy: "Ogni ambiente della casa rappresenta un aspetto della tua vita quotidiana. Scopri come le tue scelte sono collegate alla biodiversità e agli habitat e quali effetti producono anche al di fuori delle tue quattro mura.",
      open: "Apri il check degli habitat",
      rooms: [
        ["Cucina", "Alimentazione e provenienza"],
        ["Bagno", "Acqua e risorse"],
        ["Camera da letto", "Energia e materiali"],
        ["Garage", "Percorsi e trasporti"],
        ["Giardino", "Habitat e biodiversità"],
        ["Soggiorno", "Destinazioni e mobilità"]
      ]
    },
    featured: {
      eyebrow: "Progetti locali",
      title: "Scopri i progetti che rafforzano gli habitat.",
      copy: "Ogni progetto contribuisce a tutelare o ripristinare la biodiversità in Alto Adige. Segui i progressi, conosci le persone coinvolte e sostieni i progetti a cui tieni di più.",
      all: "Tutti i progetti",
      previous: "Progetto precedente",
      next: "Progetto successivo",
      stanceButton: "Perché non CO₂?",
      stanceReadMore: "Leggi la posizione completa",
      stanceClose: "Chiudi"
    },
    news: {
      eyebrow: "Attualità",
      title: "Notizie ed eventi.",
      copy: "Cosa succede sulle aree di progetto e dove è possibile partecipare: visite guidate, azioni di piantumazione e nuovi risultati del monitoraggio.",
      kinds: {
        news: "Notizia",
        event: "Evento"
      },
      empty: "Al momento non ci sono appuntamenti in programma."
    },
    achievements: {
      eyebrow: "Risultati finora",
      title: "Ciò che è nato sulle superfici.",
      copy: "Gli indicatori riassumono lo stato di tutti i progetti della piattaforma. Sono calcolati dai dati di progetto e cambiano insieme a essi.",
      stats: {
        projects: "progetti sulla piattaforma",
        habitats: "tipi di habitat",
        supporters: "sostenitrici e sostenitori",
        funded: "fondi impegnati"
      },
      completedEyebrow: "Conclusi",
      completedTitle: "Progetti conclusi che continuano a produrre effetti.",
      completedEmpty: "Nessun progetto è ancora concluso. Non appena il primo termina la fase di cura, comparirà qui."
    },
    partners: {
      eyebrow: "Sostenuta da",
      title: "I partner che rendono possibile la piattaforma.",
      copy: "b*alance è sostenuta da organizzazioni che contribuiscono al funzionamento, alla verifica e alla diffusione. Il contributo di ogni partnership è indicato in modo trasparente.",
      placeholderNote: "Tutte le voci sono segnaposto finché una partnership non è confermata e la sua citazione autorizzata.",
      become: "Diventare partner"
    },
    sciencePartners: {
      eyebrow: "Accompagnamento tecnico-scientifico",
      title: "Chi verifica la metodologia.",
      copy: "La tipologia degli habitat, i protocolli di monitoraggio e gli indicatori sono accompagnati sul piano scientifico. L’accompagnamento verifica il metodo — la responsabilità dei contenuti resta della piattaforma."
    },
    impact: {
      eyebrow: "DALLA CONOSCENZA ALL’AZIONE",
      title: "Rafforziamo insieme gli habitat.",
      copy: "Scopri i progetti, sostieni le iniziative esistenti o proponi la tua idea. Insieme creiamo più spazio per la biodiversità in Alto Adige.",
      cta: "Scopri i progetti locali",
      features: [
        ["Regionale", "Progetti per la natura proprio vicino a te."],
        ["Trasparente", "Criteri chiari ed azioni e progressi documentati apertamente."],
        ["Efficace", "Ogni progetto rafforza gli habitat e promuove la biodiversità in Alto Adige."]
      ]
    },
    biodiversityExplainer: {
      button: "Cos’è la biodiversità?",
      eyebrow: "Biodiversità",
      title: "La varietà da cui dipende tutto il resto.",
      lead: "La biodiversità è la varietà della vita su tre livelli: la varietà delle specie, la varietà genetica all’interno delle specie e la varietà degli habitat in cui vivono. In Alto Adige va dal prato arido della Val Venosta alla torbiera alta della Val Pusteria.",
      servicesTitle: "Cosa fa per noi",
      services: [
        "Impollinazione: api selvatiche, farfalle e altri insetti impollinano frutta, verdura e piante spontanee.",
        "Acqua e suolo: prati ricchi di specie e siepi trattengono l’acqua sui pendii, proteggono dall’erosione e costruiscono suolo.",
        "Resilienza: habitat diversificati resistono a siccità, piogge intense e parassiti meglio di quelli impoveriti.",
        "Clima: torbiere intatte, vecchi suoli prativi e siepi immagazzinano carbonio – come effetto, non come merce."
      ],
      economyTitle: "Perché la perdita conta anche economicamente",
      economyCopy: "L’IPBES stima che nel solo 2023 siano confluiti circa 7.300 miliardi di dollari in attività che distruggono la natura – circa 33 volte quanto Stati e imprese hanno speso per conservarla. Nell’eurozona circa il 75 per cento dei crediti alle imprese dipende in misura elevata da almeno un servizio ecosistemico; la banca pubblica tedesca KfW stima che due terzi del prodotto economico dell’UE poggino direttamente o indirettamente sui servizi ecosistemici. La perdita di natura non è un tema marginale, ma un rischio sistemico.",
      localTitle: "Cosa significa per l’Alto Adige",
      localCopy: "Un’agricoltura che dipende dall’impollinazione, un turismo che vive di paesaggio e insediamenti sui pendii che hanno bisogno di suoli stabili: qui la biodiversità non è una grandezza astratta, ma la base della vita quotidiana e del reddito. Ogni progetto su questa piattaforma ne conserva o ne ripristina un pezzo.",
      source: "Cifre da: Der Spiegel 37/2026, «Wenn die Umweltkrise zur Finanzkrise wird» (Tim Bartz, Markus Becker), con riferimento all’IPBES, a uno studio su «Nature» (settembre 2025) e alla KfW.",
      cta: "Avvia l’habitat check"
    },
    about: {
      eyebrow: "Chi c’è dietro",
      title: "Conservare e rafforzare la biodiversità sul posto: questo è il tema.",
      lead: "b*alance nasce dal lavoro di una biologa/un biologo altoatesino che da anni si occupa di una domanda: come conservare e favorire la varietà delle specie lì dove viviamo – nel comune, sul prato dietro il maso, lungo il torrente in paese?",
      personEyebrow: "La persona",
      personName: "Nome segnaposto",
      personRole: "Biologa/biologo, Alto Adige",
      personBio: [
        "Formazione in biologia, con focus su ecologia e conservazione della natura. Il lavoro si svolge meno alla scrivania che sul campo: mappare prati aridi, zone umide, siepi e frutteti tradizionali in Alto Adige, pianificare e seguire interventi di cura, collaborare con comuni, contadine e contadini, scuole e gruppi naturalistici.",
        "La convinzione di fondo: la biodiversità non è un sostituto della protezione del clima né una merce da conteggiare. È la base su cui poggia tutto il resto – e si conserva solo dove si trova. Per questo qui si parla di superfici concrete in Alto Adige, non di certificati."
      ],
      personPlaceholder: "Segnaposto – nome, foto e curriculum seguiranno.",
      orgsEyebrow: "Due iniziative, un obiettivo",
      orgsTitle: "b*nature e b*coop",
      orgs: [
        {
          name: "b*nature",
          role: "Tutela della natura sul campo",
          copy: "b*nature pianifica e realizza progetti di biodiversità in Alto Adige: cura dei biotopi con greggi di pecore e capre, rilievi su specie minacciate, attività educative con comuni e scuole. Su questa piattaforma b*nature è responsabile dei progetti «Il mio comune, la mia natura» e «Precedenza al riccio».",
          cta: "Progetti di b*nature"
        },
        {
          name: "b*coop",
          role: "Piattaforma e consulenza",
          copy: "b*coop gestisce la piattaforma b*alance: l’habitat check, la verifica e la documentazione dei progetti e il collegamento con consulenti per biodiversità, energia e risorse. L’obiettivo è che dal capire nasca il ridurre – e dal ridurre il rafforzare sul posto.",
          cta: "Habitat check"
        }
      ],
      principlesEyebrow: "Come lavoriamo",
      principlesTitle: "Cinque regole su cui ci facciamo misurare.",
      principles: [
        ["Sul posto, non altrove", "Ogni progetto è in Alto Adige, ha un indirizzo e si può visitare."],
        ["Verificato prima di andare online", "Un comitato di esperti in ecologia, scienze agrarie e ambientali verifica obiettivi, durata e budget di ogni progetto."],
        ["Misurabile, non a sensazione", "Superficie di habitat, diversità strutturale e specie target vengono definite e seguite nel monitoraggio."],
        ["Ridurre prima di compensare", "Il check mostra dove i tuoi numeri sono grandi. Una promessa di compensazione non la facciamo."],
        ["Nessuna affermazione senza prova", "Ciò che non possiamo documentare lo togliamo – anche da questa pagina."]
      ],
      ctaTitle: "Partecipa",
      ctaCopy: "Sostieni un progetto, proponi il tuo o inizia semplicemente con il check.",
      ctaProjects: "Vedi i progetti",
      ctaSubmit: "Proponi un progetto",
      ctaMethod: "Metodologia e fonti"
    },
    carbonStance: {
      eyebrow: "CO₂ e biodiversità",
      title: "Perché qui non trovi un calcolatore di compensazione.",
      lead: "L’habitat check calcola quanta CO₂ produce la tua vita quotidiana. Non ti propone però di compensare quella quantità con un pagamento. Non è una mancanza, è una scelta — e qui trovi le ragioni.",
      scopeEyebrow: "Confine di bilancio",
      scopeTitle: "Che cosa calcola il check e che cosa non pretende di dire.",
      scopeCopy: "Il valore di CO₂ nel risultato è un’impronta completa, filiera inclusa, per persona e per anno. È costruito come ordine di grandezza, per mostrarti quale ambito della tua quotidianità pesa di più — non come bilancio ambientale certificato. Ricavare un importo in euro da un numero volutamente semplificato gli attribuirebbe una precisione che non ha.",
      reasonsEyebrow: "Quattro ragioni",
      reasonsTitle: "Perché le emissioni non si compensano in modo pulito.",
      reasons: [
        ["Una tonnellata è uguale ovunque. Un habitat no.", "La compensazione si regge sull’idea che una tonnellata qui valga una tonnellata altrove. Una torbiera in Val Pusteria non ha questo valore di scambio. Ciò che si perde lì non ricompare altrove — non con le stesse specie, non nello stesso regime idrico, non nello stesso punto della rete."],
        ["L’emissione agisce subito, l’accumulo richiede decenni.", "Il carbonio liberato oggi agisce oggi. Una siepe, un prato magro, una torbiera riumidificata lo fissano nell’arco di decenni — e solo finché quella superficie resta ciò che è. Siccità, incendio o un cambio d’uso annullano il processo. Questo scarto temporale non sparisce perché un bilancio lo azzera."],
        ["Pagato non significa evitato.", "Un calcolatore che alla fine indica un importo sposta la domanda da «che cosa cambio?» a «quanto costa?». Il check è costruito per la prima domanda. Ti mostra dove i tuoi numeri sono grandi — perché è lì che hai anche il margine d’azione più ampio."],
        ["Non potremmo dimostrare quella promessa.", "Una compensazione dovrebbe dimostrare che una superficie non sarebbe nata senza quel pagamento e che resterà nel tempo. Oggi la piattaforma non può fornire questa prova. Secondo le nostre stesse regole, un’affermazione senza prova va tolta, non aggiunta."]
      ],
      insteadEyebrow: "Che cosa conta invece",
      insteadTitle: "Conservare e ripristinare gli habitat.",
      insteadCopy: "Qui la biodiversità non è una misura sostitutiva della protezione del clima, ma una ragione a sé. Un prato ricco di specie offre habitat, trattiene l’acqua sul versante, sostiene il suolo e supera un’annata secca meglio di uno impoverito. Chi lo conserva non compensa nulla: conserva la base su cui poggia tutto il resto.",
      storageTitle: "Il carbonio c’è comunque — come effetto, non come merce.",
      storageCopy: "Torbiere intatte, suoli prativi antichi, siepi e frutteti tradizionali immagazzinano carbonio. È un effetto reale degli habitat integri ed è un buon motivo per proteggerli. Non accreditiamo però questo accumulo a nessuno e non lo convertiamo in tonnellate. Nel momento in cui lo si vende come controvalore, si torna alla promessa che qui non vogliamo fare.",
      pathEyebrow: "La strada che proponiamo",
      pathTitle: "Capire, ridurre, rafforzare sul posto.",
      path: [
        ["Capire", "Il check ti mostra ordini di grandezza, non un conto da saldare."],
        ["Ridurre", "Agire dove i propri numeri sono grandi resta il passo più efficace."],
        ["Rafforzare sul posto", "Sostenere un progetto in Alto Adige che si può visitare e verificare."]
      ],
      ctaProjects: "Vedi i progetti",
      ctaMethod: "Metodo e assunzioni"
    },
    projectSubmission: {
      eyebrow: "Per chi propone progetti",
      title: "Il vostro progetto rafforza gli habitat in Alto Adige?",
      copy: "Proponetelo per una valutazione trasparente e una possibile pubblicazione sulla piattaforma.",
      cta: "Proponi il progetto"
    },
    projectsPage: {
      eyebrow: "Piattaforma dei progetti",
      title: "Insieme per preservare gli habitat.",
      copy: "Scopri i progetti che proteggono, valorizzano o ripristinano boschi, acque, paesaggi culturali e altri habitat dell’Alto Adige. Segui il loro sviluppo e sostieni i progetti che ti stanno a cuore.",
      filterTitle: "Quale habitat ti interessa?",
      filterCopy: "Scegli un habitat o cerca un progetto in Alto Adige.",
      search: "Cerca progetto o luogo …",
      result: "progetto",
      results: "progetti",
      moreFilters: "Altri filtri",
      crowdfunding: "Crowdfunding",
      allCrowdfunding: "Tutti gli stati di finanziamento",
      crowdfundingOpen: "Sostegno possibile",
      crowdfundingFunded: "Obiettivo raggiunto",
      phase: "Fase del progetto",
      allPhases: "Tutte le fasi",
      phases: {
        planning: "Pianificazione",
        implementation: "Attuazione",
        monitoring: "Monitoraggio",
        completed: "Conclusione"
      },
      reset: "Azzera filtri",
      empty: "Nessun progetto corrispondente",
      emptyHint: "Prova un altro termine di ricerca o azzera i filtri.",
      showAll: "Mostra tutti i progetti",
      statusFilter: "Stato del progetto",
      allStatuses: "Tutti i progetti",
      statuses: {
        "support-needed": "Sostegno richiesto",
        "in-progress": "In corso",
        monitoring: "Monitoraggio",
        completed: "Concluso"
      }
    },
    projectDetail: {
      back: "Torna ai progetti",
      verified: "Organizzazione verificata",
      habitats: "Habitat",
      location: "Luogo del progetto",
      municipality: "Comune",
      organization: "Organizzazione",
      mapLabel: "Profilo dell'Alto Adige con le sedi di tutti i progetti; il progetto selezionato è evidenziato.",
      mapAttribution: "Colore del punto = habitat principale · Profilo: © contributori OpenStreetMap (ODbL)",
      openMap: "Visualizza su OpenStreetMap",
      whyMatters: "Perché questo progetto è importante",
      whatItDoes: "Cosa fa concretamente il progetto",
      beforeAfterTitle: "Prima / Dopo",
      beforeAfterCopy: "Lo stesso punto di vista, prima e dopo l’intervento. Trascina il cursore per confrontare.",
      before: "Prima",
      after: "Dopo",
      beforeAfterSliderLabel: "Confronto tra prima e dopo",
      beforeAfterPlaceholderNote: "Segnaposto: finché non ci sono foto reali del prima, il lato sinistro mostra una versione modificata della foto del progetto.",
      galleryTitle: "Uno sguardo sull’area",
      galleryCopy: "Immagini dall’area di progetto: le superfici, gli interventi e le specie di cui si tratta.",
      photo: "Foto",
      ecologicalImpact: "Effetto ecologico",
      impactCopy: "Obiettivi misurabili mostrano il contributo previsto per gli habitat e la biodiversità.",
      timeline: "Sviluppo del progetto",
      timelineCopy: "Lo stato attuale e i prossimi passi in sintesi.",
      steps: {
        planning: "Pianificazione",
        funding: "Finanziamento",
        implementation: "Attuazione",
        monitoring: "Monitoraggio",
        evaluation: "Valutazione finale"
      },
      current: "Fase attuale",
      completed: "Concluso",
      upcoming: "Prossimamente",
      monitoring: "Monitoraggio",
      monitoringCopy: "Lo sviluppo ecologico viene osservato secondo criteri definiti e documentato regolarmente.",
      species: "Gruppi osservati",
      surveys: "Rilievi",
      reporting: "Ciclo dei rapporti",
      openReport: "Apri rapporto di esempio",
      reportTitle: "Rapporto di monitoraggio · Esempio",
      reportNote: "I dati del progetto sono attualmente segnaposto. Il rapporto finale con metodo, dati grezzi e risultati sarà pubblicato qui.",
      methodology: "Vedi il metodo",
      funding: "Finanziamento del progetto",
      fundingProgress: "Stato del finanziamento",
      fundingTarget: "su {goal} previsti",
      fundingOpen: "L’obiettivo di finanziamento non è ancora stabilito. Non appena l’organizzazione promotrice lo definirà, lo stato del finanziamento comparirà qui.",
      supporters: "sostenitori",
      support: "Sostieni il progetto",
      tax: "Fiscalmente detraibile",
      share: "Condividi",
      transparency: "Organizzazione e trasparenza",
      transparencyCopy: "Azioni, monitoraggio e risultati vengono documentati in modo comprensibile e aggiornati su questa pagina.",
      sponsorsEyebrow: "Reso possibile da",
      sponsorsTitle: "Partner finanziatori del progetto",
      mainSponsor: "Partner principale",
      supportingSponsors: "Altri partner",
      relatedEyebrow: "Altre iniziative",
      relatedTitle: "Progetti simili in Alto Adige",
      showAll: "Mostra tutti",
      finalTitle: "Vuoi contribuire a questo habitat?",
      finalCopy: "Sostieni direttamente il progetto o scopri altri progetti per la biodiversità in Alto Adige.",
      discoverMore: "Altri progetti per la biodiversità",
      close: "Chiudi finestra",
      thankYou: "Grazie per il tuo sostegno!",
      thankYouCopy: "Dai un contributo prezioso alla natura dell’Alto Adige.",
      donation: "Donazione",
      sponsorship: "Sostegno",
      volunteering: "Volontariato",
      amount: "Importo (€)",
      volunteeringCopy: "Come volontario o volontaria puoi partecipare alle attività di piantumazione e monitoraggio sul posto. Ti invieremo tutti i dettagli via e-mail.",
      confirm: "Conferma"
    },
    card: { view: "Vedi il progetto", of: "su", supporters: "sostenitori", funding: "Finanziamento", open: "mancanti", status: "Stato del progetto", mainSponsor: "Partner principale", placeholder: "Segnaposto", partner: "Partner" }
  },
  en: {
    nav: ["Projects"],
    navLabel: "Main navigation",
    skipToContent: "Skip to main content",
    mobileNavLabel: "Mobile navigation",
    headerCta: "Start check",
    projectOwners: "For project teams",
    submitProject: "Submit a project",
    menu: "Open menu",
    footer: {
      mission: "A digital platform connecting people, projects and biodiversity in South Tyrol.",
      science: "Scientifically grounded methodology and transparent project documentation.",
      methodology: "Methodology",
      carbonStance: "CO₂ & biodiversity",
      explore: "Explore",
      habitatCheck: "Habitat Check",
      projects: "Projects",
      submitProject: "Submit a Project",
      about: "About",
      aboutBalance: "About us",
      privacy: "Privacy Policy",
      imprint: "Imprint",
      copyright: "© 2026 b*alance",
      closing: "Made for biodiversity in South Tyrol."
    },
    hero: {
      eyebrow: "Habitat Check for South Tyrol",
      title: "Biodiversity is the",
      accent: "foundation of our lives.",
      copy: "With short questions, find out how your daily life connects to nature in South Tyrol and which projects contribute to its protection.",
      tour: "Start check · 3–5 minutes",
      projects: "View verified projects",
      trust: "Results serve as general guidance.",
      methodology: "Methodology & sources",
      photo: "Photo",
      quotesLabel: "Voices from South Tyrol",
      quoteItem: "Quote",
      quotesMockup: "Sample quotes"
    },
    house: {
      eyebrow: "From rooms to habitats",
      title: "Discover room by room how your daily life affects biodiversity.",
      copy: "Each room represents a different part of your everyday life. Discover how your choices are connected to biodiversity and habitats, and how their effects extend beyond your own home.",
      open: "Open the Habitat Check",
      rooms: [
        ["Kitchen", "Food & Origin"],
        ["Bathroom", "Water & Resources"],
        ["Bedroom", "Energy & Materials"],
        ["Garage", "Routes & Transport"],
        ["Garden", "Habitats & Biodiversity"],
        ["Living Room", "Destinations & Mobility"]
      ]
    },
    featured: {
      eyebrow: "Local projects",
      title: "Discover projects that strengthen habitats.",
      copy: "Every project contributes to preserving or restoring biodiversity in South Tyrol. Track progress, meet the people behind them, and support projects close to your heart.",
      all: "All projects",
      previous: "Previous project",
      next: "Next project",
      stanceButton: "Why not CO₂?",
      stanceReadMore: "Read the full position",
      stanceClose: "Close"
    },
    news: {
      eyebrow: "Latest",
      title: "News and events.",
      copy: "What is happening on the project sites and where you can join in: field walks, planting days and new monitoring results.",
      kinds: {
        news: "News",
        event: "Event"
      },
      empty: "No dates are currently announced."
    },
    achievements: {
      eyebrow: "Achieved so far",
      title: "What has taken shape on the ground.",
      copy: "These figures summarise the state of every project on the platform. They are calculated from the project data and change along with it.",
      stats: {
        projects: "projects on the platform",
        habitats: "habitat types",
        supporters: "supporters",
        funded: "committed funding"
      },
      completedEyebrow: "Completed",
      completedTitle: "Projects that are finished and still working.",
      completedEmpty: "No project has been completed yet. As soon as the first finishes its care phase, it will appear here."
    },
    partners: {
      eyebrow: "Supported by",
      title: "The partners who make the platform possible.",
      copy: "b*alance is supported by organisations that help carry its operation, its review process and its reach. What each partnership contributes is stated openly.",
      placeholderNote: "Every entry is a placeholder until a partnership is confirmed and its mention approved.",
      become: "Become a partner"
    },
    sciencePartners: {
      eyebrow: "Scientific guidance",
      title: "Who reviews the methodology.",
      copy: "Habitat typology, monitoring protocols and key figures are reviewed by specialists. That guidance checks the method — responsibility for the content stays with the platform."
    },
    impact: {
      eyebrow: "FROM KNOWLEDGE TO ACTION",
      title: "Strengthening habitats together.",
      copy: "Discover projects, support existing initiatives, or submit your own idea. Together we create more space for biodiversity in South Tyrol.",
      cta: "Discover local projects",
      features: [
        ["Regional", "Projects for nature right on your doorstep."],
        ["Transparent", "Clear criteria and openly documented measures and progress."],
        ["Effective", "Every project strengthens habitats and fosters biodiversity in South Tyrol."]
      ]
    },
    biodiversityExplainer: {
      button: "What is biodiversity?",
      eyebrow: "Biodiversity",
      title: "The variety everything else depends on.",
      lead: "Biodiversity is the variety of life on three levels: the variety of species, the genetic variety within species, and the variety of habitats they live in. In South Tyrol it ranges from the dry grassland of the Vinschgau valley to the raised bog in the Puster valley.",
      servicesTitle: "What it does for us",
      services: [
        "Pollination: wild bees, butterflies and other insects pollinate fruit, vegetables and wild plants.",
        "Water and soil: species-rich meadows and hedgerows hold water on slopes, protect against erosion and build soil.",
        "Resilience: diverse habitats withstand drought, heavy rain and pests better than depleted ones.",
        "Climate: intact bogs, old meadow soils and hedgerows store carbon – as an effect, not as a commodity."
      ],
      economyTitle: "Why the loss also counts economically",
      economyCopy: "The IPBES puts the money flowing into nature-destroying activities in 2023 alone at around 7.3 trillion US dollars – roughly 33 times what governments and companies spent on conserving nature. In the eurozone, around 75 percent of corporate loans depend heavily on at least one ecosystem service; the German development bank KfW estimates that two thirds of EU economic output rest directly or indirectly on ecosystem services. Nature loss is not a side issue but a systemic risk.",
      localTitle: "What this means for South Tyrol",
      localCopy: "Agriculture that relies on pollination, tourism that lives off the landscape, and settlements on slopes that need stable soils: here biodiversity is not an abstract quantity but the basis of everyday life and income. Every project on this platform preserves or restores a piece of it.",
      source: "Figures from: Der Spiegel 37/2026, “Wenn die Umweltkrise zur Finanzkrise wird” (Tim Bartz, Markus Becker), citing the IPBES, a study in “Nature” (September 2025) and the KfW.",
      cta: "Start the habitat check"
    },
    about: {
      eyebrow: "Who is behind it",
      title: "Preserving and strengthening biodiversity locally – that is the topic.",
      lead: "b*alance grew out of the work of a South Tyrolean biologist who has spent years on one question: how can we preserve and enhance the variety of species where we live – in the municipality, on the meadow behind the farm, along the stream in the village?",
      personEyebrow: "The person",
      personName: "Name placeholder",
      personRole: "Biologist, South Tyrol",
      personBio: [
        "Trained in biology with a focus on ecology and nature conservation. The work happens less at a desk than in the field: mapping dry grasslands, wetlands, hedgerows and traditional orchards in South Tyrol, planning and accompanying management measures, working with municipalities, farmers, schools and conservation groups.",
        "The conviction behind it: biodiversity is not a substitute for climate protection and not a commodity that can be offset. It is the foundation everything else rests on – and it can only be preserved where it is. That is why this is about concrete sites in South Tyrol, not certificates."
      ],
      personPlaceholder: "Placeholder – name, photo and CV to follow.",
      orgsEyebrow: "Two initiatives, one goal",
      orgsTitle: "b*nature and b*coop",
      orgs: [
        {
          name: "b*nature",
          role: "Conservation in the field",
          copy: "b*nature plans and carries out biodiversity projects in South Tyrol: habitat management with sheep and goat flocks, surveys of threatened species, education work with municipalities and schools. On this platform b*nature runs the projects “My municipality, my nature” and “Right of way for the hedgehog”.",
          cta: "Projects by b*nature"
        },
        {
          name: "b*coop",
          role: "Platform and advice",
          copy: "b*coop runs the b*alance platform: the habitat check, the review and documentation of projects, and the link to specialist advisers for biodiversity, energy and resources. The aim is for understanding to lead to reducing – and reducing to strengthening locally.",
          cta: "Habitat check"
        }
      ],
      principlesEyebrow: "How we work",
      principlesTitle: "Five rules we can be measured against.",
      principles: [
        ["Local, not somewhere", "Every project is in South Tyrol, has an address and can be visited."],
        ["Reviewed before it goes online", "A panel from ecology, agricultural and environmental science reviews each project’s goals, duration and budget."],
        ["Measured, not felt", "Habitat area, structural diversity and target species are defined and tracked in monitoring."],
        ["Reduce before offsetting", "The check shows where your own numbers are large. We make no offsetting promise."],
        ["No claim without evidence", "What we cannot back up, we remove – on this page too."]
      ],
      ctaTitle: "Get involved",
      ctaCopy: "Support a project, submit your own, or simply start with the check.",
      ctaProjects: "View projects",
      ctaSubmit: "Submit a project",
      ctaMethod: "Method & sources"
    },
    carbonStance: {
      eyebrow: "CO₂ & biodiversity",
      title: "Why there is no offset calculator here.",
      lead: "The habitat check works out how much CO₂ your everyday life causes. What it does not do is offer to cancel that amount out against a payment. This is not a gap, it is a decision — and these are the reasons for it.",
      scopeEyebrow: "Accounting boundary",
      scopeTitle: "What the check calculates, and what it does not claim.",
      scopeCopy: "The CO₂ figure in your result is a full footprint including supply chains, per person and year. It is built as an order of magnitude, so you can see which part of your everyday life weighs heavily — not as an audited life-cycle assessment. Deriving a euro amount from a deliberately simplified number would lend it a precision it does not have.",
      reasonsEyebrow: "Four reasons",
      reasonsTitle: "Why emissions cannot be cleanly cancelled out.",
      reasons: [
        ["A tonne is the same everywhere. A habitat is not.", "Offsetting rests on the idea that a tonne here trades against a tonne somewhere else. A bog in the Puster Valley has no such exchange rate. What is lost there does not reappear elsewhere — not with the same species, not in the same water regime, not at the same point in the fabric."],
        ["The emission acts now, the storage takes decades.", "Carbon released today acts today. A hedgerow, a species-rich meadow, a rewetted bog bind it over decades — and only for as long as the site stays what it is. Drought, fire or a change of use reverse it. That gap in time does not disappear because a balance sheet sets it to zero."],
        ["Paid for is not avoided.", "A calculator that ends in an amount shifts the question from “what do I change?” to “what does it cost?”. The check is built for the first question. It shows you where your own numbers are large — because that is where your room to act is largest too."],
        ["We could not back the promise up.", "An offset would have to show that a site would not have existed without the payment, and that it will last. The platform cannot provide that evidence today. By our own rules, a claim without evidence gets cut, not built in."]
      ],
      insteadEyebrow: "What counts instead",
      insteadTitle: "Keeping habitats, and bringing them back.",
      insteadCopy: "Biodiversity here is not a stand-in measure for climate action, it is a reason in its own right. A species-rich meadow provides habitat, holds water on the slope, carries soil and gets through a dry year better than a depleted one. Keeping it does not balance anything out — it keeps the ground everything else stands on.",
      storageTitle: "Carbon is still part of it — as an effect, not as a product.",
      storageCopy: "Intact bogs, old meadow soils, hedgerows and traditional orchards store carbon. That is a real effect of intact habitats and a good reason to protect them. But we do not credit that storage to anyone and we do not convert it into tonnes. The moment it is sold as a counter-value, you are back at the promise we are choosing not to make.",
      pathEyebrow: "The path we suggest instead",
      pathTitle: "Understand, reduce, strengthen locally.",
      path: [
        ["Understand", "The check shows you orders of magnitude, not a bill that can be settled."],
        ["Reduce", "Starting where your own numbers are large remains the most effective step."],
        ["Strengthen locally", "Support a project in South Tyrol that you can visit and check for yourself."]
      ],
      ctaProjects: "View projects",
      ctaMethod: "Method & assumptions"
    },
    projectSubmission: {
      eyebrow: "For project teams",
      title: "Does your project strengthen habitats in South Tyrol?",
      copy: "Submit it for transparent review and possible inclusion on the platform.",
      cta: "Submit project for review"
    },
    projectsPage: {
      eyebrow: "Project platform",
      title: "Preserving habitats together.",
      copy: "Discover projects that protect, enhance or restore forests, waters, cultural landscapes and other habitats in South Tyrol. Follow their development and support the projects that matter to you.",
      filterTitle: "Which habitat interests you?",
      filterCopy: "Select a habitat or search for a project in South Tyrol.",
      search: "Search project or location …",
      result: "project",
      results: "projects",
      moreFilters: "More filters",
      crowdfunding: "Crowdfunding",
      allCrowdfunding: "All funding states",
      crowdfundingOpen: "Support possible",
      crowdfundingFunded: "Funding goal reached",
      phase: "Project phase",
      allPhases: "All project phases",
      phases: {
        planning: "Planning",
        implementation: "Implementation",
        monitoring: "Monitoring",
        completed: "Completion"
      },
      reset: "Reset filters",
      empty: "No matching projects found",
      emptyHint: "Try a different search term or reset the filters.",
      showAll: "Show all projects",
      statusFilter: "Project status",
      allStatuses: "All projects",
      statuses: {
        "support-needed": "Support needed",
        "in-progress": "In progress",
        monitoring: "Monitoring",
        completed: "Completed"
      }
    },
    projectDetail: {
      back: "Back to projects",
      verified: "Verified project team",
      habitats: "Habitats",
      location: "Project location",
      municipality: "Municipality",
      organization: "Project team",
      mapLabel: "Outline of South Tyrol with the locations of all projects; the selected project is highlighted.",
      mapAttribution: "Dot colour = primary habitat · Outline: © OpenStreetMap contributors (ODbL)",
      openMap: "View on OpenStreetMap",
      whyMatters: "Why this project matters",
      whatItDoes: "What the project is doing",
      beforeAfterTitle: "Before / After",
      beforeAfterCopy: "The same viewpoint, before and after the intervention. Drag the handle to compare.",
      before: "Before",
      after: "After",
      beforeAfterSliderLabel: "Comparison between before and after",
      beforeAfterPlaceholderNote: "Placeholder: until real before photos are available, the left side shows an edited version of the project photo.",
      galleryTitle: "A look at the site",
      galleryCopy: "Images from the project area: the sites, the measures and the species this is about.",
      photo: "Photo",
      ecologicalImpact: "Ecological impact",
      impactCopy: "Measurable goals show how the project is expected to benefit habitats and biodiversity.",
      timeline: "Project timeline",
      timelineCopy: "The current stage and next steps at a glance.",
      steps: {
        planning: "Planning",
        funding: "Funding",
        implementation: "Implementation",
        monitoring: "Monitoring",
        evaluation: "Final evaluation"
      },
      current: "Current stage",
      completed: "Completed",
      upcoming: "Up next",
      monitoring: "Monitoring",
      monitoringCopy: "Ecological development is observed against defined criteria and documented regularly.",
      species: "Species groups observed",
      surveys: "Surveys",
      reporting: "Reporting cycle",
      openReport: "Open sample report",
      reportTitle: "Monitoring report · Sample",
      reportNote: "The project data is currently placeholder content. The final report will be published here with methods, raw data and results.",
      methodology: "View methodology",
      funding: "Project funding",
      fundingProgress: "Funding progress",
      fundingTarget: "of {goal} target",
      fundingOpen: "The funding target has not been set yet. As soon as the lead organisation defines it, the funding progress will appear here.",
      supporters: "supporters",
      support: "Support this project",
      tax: "Tax deductible",
      share: "Share",
      transparency: "Project team & transparency",
      transparencyCopy: "Measures, monitoring and results are documented transparently and updated on this page.",
      sponsorsEyebrow: "Made possible by",
      sponsorsTitle: "Project funding partners",
      mainSponsor: "Lead sponsor",
      supportingSponsors: "Supporting partners",
      relatedEyebrow: "More initiatives",
      relatedTitle: "Similar projects in South Tyrol",
      showAll: "View all",
      finalTitle: "Would you like to contribute to this habitat?",
      finalCopy: "Support this project directly or discover more biodiversity projects in South Tyrol.",
      discoverMore: "Discover more biodiversity projects",
      close: "Close dialog",
      thankYou: "Thank you for your support!",
      thankYouCopy: "You are making a valuable contribution to nature in South Tyrol.",
      donation: "Donation",
      sponsorship: "Sponsorship",
      volunteering: "Volunteer",
      amount: "Contribution amount (€)",
      volunteeringCopy: "As a volunteer, you can help with planting and on-site monitoring. We will send you all details by email.",
      confirm: "Confirm contribution"
    },
    card: { view: "View project", of: "of", supporters: "supporters", funding: "Funding", open: "remaining", status: "Project status", mainSponsor: "Lead sponsor", placeholder: "Placeholder", partner: "Partner" }
  }
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}
