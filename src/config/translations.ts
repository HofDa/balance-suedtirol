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
      copy: "Lebensraumtypologie, Monitoringprotokolle und Kennzahlen werden fachlich begleitet. Die Begleitung prüft die Methodik. Die Verantwortung für die Inhalte bleibt bei der Plattform."
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
        "Klima: Intakte Moore, alte Wiesenböden und Hecken speichern Kohlenstoff."
      ],
      economyTitle: "Warum der Verlust auch wirtschaftlich zählt",
      economyCopy: "Der Weltbiodiversitätsrat beziffert die Geldflüsse in naturzerstörende Aktivitäten allein für 2023 auf rund 7,3 Billionen US-Dollar. Das ist etwa 33-mal so viel, wie Staaten und Unternehmen für den Erhalt der Natur ausgaben. In der Eurozone hängen rund 75 Prozent der Unternehmenskredite stark von mindestens einer Ökosystemleistung ab. Die Förderbank KfW schätzt, dass zwei Drittel der EU-Wirtschaftsleistung direkt oder indirekt auf Ökosystemleistungen beruhen.",
      localTitle: "Was das für Südtirol heißt",
      localCopy: "Die Landwirtschaft braucht Bestäuber, der Tourismus lebt von der Landschaft, Siedlungen an Hängen brauchen stabile Böden. Jedes Projekt auf dieser Plattform erhält ein Stück davon oder stellt es wieder her.",
      source: "Zahlen nach: Der Spiegel 37/2026, „Wenn die Umweltkrise zur Finanzkrise wird“ (Tim Bartz, Markus Becker), mit Bezug auf den Weltbiodiversitätsrat IPBES, eine Studie in „Nature“ (September 2025) und die KfW.",
      cta: "Lebensraum-Check starten"
    },
    about: {
      eyebrow: "Wer dahinter steht",
      title: "Artenvielfalt dort erhalten, wo wir leben.",
      lead: "b*alance ist aus der Arbeit vieler Südtiroler Biolog:innen entstanden, die seit Jahren an einer Frage arbeiten: Wie lässt sich die Artenvielfalt in der eigenen Gemeinde bewahren und fördern, auf der Wiese hinterm Hof und am Bach im Ort?",
      teamEyebrow: "Das Team",
      teamTitle: "Biolog:innen aus Südtirol, die in der Fläche arbeiten.",
      teamBio: [
        "Alle haben Biologie studiert, mit Schwerpunkt Ökologie und Naturschutz, und arbeiten seit Jahren in Südtirol. Sie kartieren Trockenrasen, Feuchtgebiete, Hecken und Streuobstwiesen, planen und begleiten Pflegemaßnahmen und arbeiten dabei mit Gemeinden, Bäuerinnen und Bauern, Schulen und Naturschutzgruppen zusammen.",
        "Was sie verbindet: Biodiversität lässt sich nur dort erhalten, wo sie vorkommt. Deshalb geht es auf dieser Plattform um konkrete Flächen in Südtirol."
      ],
      teamMemberName: "Name Platzhalter",
      teamMemberRole: "Biolog:in",
      teamPlaceholder: "Platzhalter. Namen, Fotos und Schwerpunkte folgen.",
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
          copy: "b*coop betreibt die Plattform b*alance: den Lebensraum-Check, die Prüfung und Dokumentation der Projekte und die Verbindung zu Fachberater:innen für Biodiversität, Energie und Ressourcen. Wer seine Zahlen kennt, kann sie verringern und ein Projekt vor Ort unterstützen.",
          cta: "Lebensraum-Check"
        }
      ],
      principlesEyebrow: "Wie wir arbeiten",
      principlesTitle: "Fünf Regeln, an denen wir uns messen lassen.",
      principles: [
        ["Vor Ort", "Jedes Projekt liegt in Südtirol, hat eine Adresse und lässt sich besuchen."],
        ["Geprüft, bevor es online geht", "Ein Fachgremium aus Ökologie, Agrar- und Umweltwissenschaften prüft Ziele, Laufzeit und Budget jedes Projekts."],
        ["Messbar", "Habitatfläche, Strukturvielfalt und Zielarten werden vorab festgelegt und im Monitoring nachgehalten."],
        ["Verringern vor Ausgleichen", "Der Check zeigt, wo die eigenen Zahlen groß sind. Ein Kompensationsversprechen geben wir nicht."],
        ["Keine Aussage ohne Beleg", "Was wir nicht belegen können, streichen wir. Das gilt auch für diese Seite."]
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
      lead: "Der Lebensraum-Check rechnet aus, wie viel CO₂ dein Alltag verursacht. Er bietet dir aber nicht an, diese Menge gegen einen Betrag wieder auszugleichen. Das ist eine bewusste Entscheidung. Hier stehen die Gründe.",
      scopeEyebrow: "Bilanzgrenze",
      scopeTitle: "Was der Check rechnet, und was er nicht behauptet.",
      scopeCopy: "Der CO₂e-Wert im Ergebnis ist ein transparenter Ausschnitt der abgefragten Aktivitäten pro Person und Jahr. Vorketten sind nur enthalten, wenn der jeweilige Faktor sie ausdrücklich abbildet; Konsum, Gebäude und öffentliche Leistungen fehlen. Aus dieser bewusst vereinfachten Zahl einen Euro-Betrag abzuleiten, würde ihr eine Genauigkeit geben, die sie nicht hat.",
      reasonsEyebrow: "Vier Gründe",
      reasonsTitle: "Warum sich Ausstoß nicht sauber gegenrechnen lässt.",
      reasons: [
        ["Eine Tonne ist überall gleich. Ein Lebensraum nicht.", "Kompensation lebt davon, dass eine Tonne hier gegen eine Tonne irgendwo tauschbar ist. Ein Moor im Pustertal hat diesen Tauschwert nicht. Was dort verloren geht, entsteht anderswo nicht noch einmal, weder mit denselben Arten noch im selben Wasserhaushalt."],
        ["Die Emission wirkt sofort, die Speicherung braucht Jahrzehnte.", "Kohlenstoff, der heute frei wird, wirkt heute. Eine Hecke, eine Magerwiese, ein wiedervernässtes Moor binden ihn über Jahrzehnte, und nur so lange, wie die Fläche bleibt, was sie ist. Dürre, Brand oder eine geänderte Nutzung setzen ihn wieder frei. Eine Bilanz, die beides gleichsetzt, übergeht diese Lücke."],
        ["Bezahlt ist nicht vermieden.", "Ein Rechner, der am Ende einen Betrag nennt, verschiebt die Frage von „Was ändere ich?“ zu „Was kostet es?“. Der Check ist für die erste Frage gebaut. Er zeigt dir, wo deine eigenen Zahlen groß sind, weil dort auch dein Handlungsspielraum am größten ist."],
        ["Wir könnten das Versprechen nicht belegen.", "Ein Ausgleich müsste nachweisen, dass eine Fläche ohne die Zahlung nicht entstanden wäre und dass sie dauerhaft bleibt. Diesen Nachweis kann die Plattform heute nicht führen. Nach unseren eigenen Regeln wird eine Aussage ohne Beleg gestrichen."]
      ],
      localEyebrow: "Und warum nicht hier?",
      localTitle: "In Südtirol gibt es die Fläche dafür nicht.",
      localCopy: "Kompensation braucht Fläche: neuen Wald, der Kohlenstoff bindet, oder Wald, der ohne die Zahlung gerodet würde. Beides gibt es in Südtirol kaum. Sechs von zehn Hektar liegen über 1.600 Metern, ein Fünftel ist Fels und Gletscher, die Hälfte ist bereits Wald. Zieht man Fels, Wasser, Steilhänge, Höhe und Wald ab, bleiben nicht einmal zehn Prozent des Landes. Auf diesem Rest liegen Dörfer, Betriebe und Landwirtschaft. Was hier neu bewaldet werden könnte, ist entweder schon Wald oder wird anders gebraucht.",
      localFigures: [
        ["51 %", "der Landesfläche sind Wald: 375.351 von 739.997 Hektar."],
        ["59,5 %", "der Landesfläche liegen über 1.600 Metern; nur 5,5 % sind überhaupt dauerhaft besiedelbar, knapp 3 % sind besiedelt."],
        ["3-fach", "überhöht: 18 tropische Waldschutz-Projekte wurden genutzt, um fast dreimal so viel CO₂ auszugleichen, wie sie tatsächlich einsparten. Von 26 untersuchten Projekten verringerten die meisten die Entwaldung kaum."]
      ],
      localClosing: "Großflächige Kompensation findet deshalb im globalen Süden statt, weit weg von denen, die dafür zahlen. Und selbst dort hält sie oft nicht, was sie verspricht. Wir unterstützen stattdessen Projekte in Südtirol, die man besuchen, begleiten und über Jahre beobachten kann.",
      localSources: [
        { label: "Forstdienst Autonome Provinz Bozen: Südtirols Wald – Flächen und Zahlen", href: "https://forstdienst.provinz.bz.it/de/wald-holz/suedtirols-wald-flaechen" },
        { label: "ASTAT – Landesinstitut für Statistik: Dauersiedlungsgebiet in Südtirol – 2012 (Übersichten 28–30)", href: "https://assets-eu-01.kc-usercontent.com/b5376750-8076-01cf-17d2-d343e29778a7/5d16ffd8-363e-4d29-93f6-cdb4d67f53c5/pressnote_899333_dsg_2012.pdf" },
        { label: "West et al. (2023): Action needed to make carbon offsets from forest conservation work for climate change mitigation, Science 381 (2023)", href: "https://www.science.org/doi/10.1126/science.ade3535" }
      ],
      insteadEyebrow: "Was stattdessen zählt",
      insteadTitle: "Lebensräume erhalten und wiederherstellen.",
      insteadCopy: "Eine artenreiche Wiese bietet Lebensraum, hält Wasser im Hang, trägt Boden und übersteht ein trockenes Jahr besser als eine verarmte. Wer sie erhält, gleicht damit nichts aus. Er erhält, was für Landwirtschaft, Wasser und Boden gebraucht wird.",
      storageTitle: "Kohlenstoff speichern diese Flächen trotzdem.",
      storageCopy: "Intakte Moore, alte Wiesenböden, Hecken und Streuobstbestände speichern Kohlenstoff. Das ist ein guter Grund, sie zu schützen. Wir schreiben diese Speicherung aber niemandem gut und rechnen sie nicht in Tonnen um. Sobald man sie als Gegenwert verkauft, gibt man das Versprechen, das wir nicht geben wollen.",
      pathEyebrow: "Der Weg stattdessen",
      pathTitle: "Verstehen, verringern, vor Ort stärken.",
      path: [
        ["Verstehen", "Der Check zeigt dir Größenordnungen statt einer Rechnung, die sich begleichen lässt."],
        ["Verringern", "Dort ansetzen, wo die eigenen Zahlen groß sind. Das bleibt der wirksamste Schritt."],
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
      beforeAfterCopy: "Vorher und nachher vom selben Standpunkt. Regler ziehen, um zu vergleichen.",
      before: "Vorher",
      after: "Nachher",
      beforeAfterSliderLabel: "Vergleich zwischen Vorher und Nachher",
      beforeAfterPlaceholderNote: "Platzhalter: Bis echte Vorher-Fotos vorliegen, zeigt die linke Seite eine bearbeitete Version des Projektfotos.",
      galleryTitle: "Blick in die Fläche",
      galleryCopy: "Aufnahmen aus dem Projektgebiet: Flächen, Maßnahmen und Arten.",
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
      copy: "La tipologia degli habitat, i protocolli di monitoraggio e gli indicatori sono accompagnati sul piano scientifico. L’accompagnamento verifica il metodo. La responsabilità dei contenuti resta della piattaforma."
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
        "Clima: torbiere intatte, vecchi suoli prativi e siepi immagazzinano carbonio."
      ],
      economyTitle: "Perché la perdita conta anche economicamente",
      economyCopy: "L’IPBES stima che nel solo 2023 siano confluiti circa 7.300 miliardi di dollari in attività che distruggono la natura. È circa 33 volte quanto Stati e imprese hanno speso per conservarla. Nell’eurozona circa il 75 per cento dei crediti alle imprese dipende fortemente da almeno un servizio ecosistemico. La banca pubblica tedesca KfW stima che due terzi del prodotto economico dell’UE poggino direttamente o indirettamente sui servizi ecosistemici.",
      localTitle: "Cosa significa per l’Alto Adige",
      localCopy: "L’agricoltura ha bisogno di impollinatori, il turismo vive del paesaggio, gli insediamenti sui pendii hanno bisogno di suoli stabili. Ogni progetto su questa piattaforma ne conserva o ne ripristina un pezzo.",
      source: "Cifre da: Der Spiegel 37/2026, «Wenn die Umweltkrise zur Finanzkrise wird» (Tim Bartz, Markus Becker), con riferimento all’IPBES, a uno studio su «Nature» (settembre 2025) e alla KfW.",
      cta: "Avvia l’habitat check"
    },
    about: {
      eyebrow: "Chi c’è dietro",
      title: "Conservare la biodiversità là dove viviamo.",
      lead: "b*alance nasce dal lavoro di molte biologhe e biologi altoatesini che da anni lavorano a una domanda: come conservare e favorire la varietà delle specie nel proprio comune, sul prato dietro il maso e lungo il torrente in paese?",
      teamEyebrow: "Il team",
      teamTitle: "Biologhe e biologi dell’Alto Adige che lavorano sul campo.",
      teamBio: [
        "Tutte e tutti hanno studiato biologia, con focus su ecologia e conservazione della natura, e lavorano da anni in Alto Adige. Mappano prati aridi, zone umide, siepi e frutteti tradizionali, pianificano e seguono interventi di cura e collaborano con comuni, contadine e contadini, scuole e gruppi naturalistici.",
        "Ciò che li unisce: la biodiversità si conserva solo dove si trova. Per questo su questa piattaforma si parla di superfici concrete in Alto Adige."
      ],
      teamMemberName: "Nome segnaposto",
      teamMemberRole: "Biologa/biologo",
      teamPlaceholder: "Segnaposto. Nomi, foto e specializzazioni seguiranno.",
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
          copy: "b*coop gestisce la piattaforma b*alance: l’habitat check, la verifica e la documentazione dei progetti e il collegamento con consulenti per biodiversità, energia e risorse. Chi conosce i propri numeri può ridurli e sostenere un progetto sul posto.",
          cta: "Habitat check"
        }
      ],
      principlesEyebrow: "Come lavoriamo",
      principlesTitle: "Cinque regole su cui ci facciamo misurare.",
      principles: [
        ["Sul posto", "Ogni progetto è in Alto Adige, ha un indirizzo e si può visitare."],
        ["Verificato prima di andare online", "Un comitato di esperti in ecologia, scienze agrarie e ambientali verifica obiettivi, durata e budget di ogni progetto."],
        ["Misurabile", "Superficie di habitat, diversità strutturale e specie target vengono definite in anticipo e seguite nel monitoraggio."],
        ["Ridurre prima di compensare", "Il check mostra dove i tuoi numeri sono grandi. Una promessa di compensazione non la facciamo."],
        ["Nessuna affermazione senza prova", "Ciò che non possiamo documentare lo togliamo. Vale anche per questa pagina."]
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
      lead: "L’habitat check calcola quanta CO₂ produce la tua vita quotidiana. Non ti propone però di compensare quella quantità con un pagamento. È una scelta consapevole. Qui trovi le ragioni.",
      scopeEyebrow: "Confine di bilancio",
      scopeTitle: "Che cosa calcola il check e che cosa non pretende di dire.",
      scopeCopy: "Il valore di CO₂e nel risultato è una parte trasparente delle attività rilevate, per persona e per anno. Le filiere a monte sono incluse solo se il rispettivo fattore le rappresenta esplicitamente; consumi, edifici e servizi pubblici mancano. Ricavare un importo in euro da un numero volutamente semplificato gli attribuirebbe una precisione che non ha.",
      reasonsEyebrow: "Quattro ragioni",
      reasonsTitle: "Perché le emissioni non si compensano in modo pulito.",
      reasons: [
        ["Una tonnellata è uguale ovunque. Un habitat no.", "La compensazione si regge sull’idea che una tonnellata qui valga una tonnellata altrove. Una torbiera in Val Pusteria non ha questo valore di scambio. Ciò che si perde lì non ricompare altrove, né con le stesse specie né nello stesso regime idrico."],
        ["L’emissione agisce subito, l’accumulo richiede decenni.", "Il carbonio liberato oggi agisce oggi. Una siepe, un prato magro, una torbiera riumidificata lo fissano nell’arco di decenni, e solo finché quella superficie resta ciò che è. Siccità, incendio o un cambio d’uso lo liberano di nuovo. Un bilancio che mette le due cose sullo stesso piano ignora questo scarto."],
        ["Pagato non significa evitato.", "Un calcolatore che alla fine indica un importo sposta la domanda da «che cosa cambio?» a «quanto costa?». Il check è costruito per la prima domanda. Ti mostra dove i tuoi numeri sono grandi, perché è lì che hai anche il margine d’azione più ampio."],
        ["Non potremmo dimostrare quella promessa.", "Una compensazione dovrebbe dimostrare che una superficie non sarebbe nata senza quel pagamento e che resterà nel tempo. Oggi la piattaforma non può fornire questa prova. Secondo le nostre stesse regole, un’affermazione senza prova va tolta."]
      ],
      localEyebrow: "E perché non qui?",
      localTitle: "In Alto Adige non c’è lo spazio per farlo.",
      localCopy: "La compensazione ha bisogno di superficie: nuovo bosco che fissi carbonio, o bosco che senza il pagamento verrebbe abbattuto. In Alto Adige non c’è quasi né l’uno né l’altro. Sei ettari su dieci si trovano sopra i 1.600 metri, un quinto è roccia e ghiacciaio, la metà è già bosco. Tolti roccia, acqua, pendii ripidi, quota e bosco resta meno del dieci per cento del territorio. Su questo resto stanno paesi, aziende e agricoltura. Ciò che qui si potrebbe rimboschire o è già bosco o serve ad altro.",
      localFigures: [
        ["51 %", "del territorio provinciale è bosco: 375.351 su 739.997 ettari."],
        ["59,5 %", "del territorio si trova sopra i 1.600 metri; solo il 5,5 % è in linea di principio insediabile in modo permanente, meno del 3 % è insediato."],
        ["3 volte", "tanto: 18 progetti di tutela forestale tropicale sono stati usati per compensare quasi il triplo della CO₂ effettivamente risparmiata. Dei 26 progetti esaminati, la maggior parte ha ridotto appena la deforestazione."]
      ],
      localClosing: "La compensazione su larga scala avviene quindi nel Sud globale, lontano da chi paga. E anche lì spesso non mantiene ciò che promette. Noi sosteniamo invece progetti in Alto Adige che si possono visitare, seguire e osservare per anni.",
      localSources: [
        { label: "Servizio forestale Provincia autonoma di Bolzano: il bosco altoatesino – superfici e cifre", href: "https://forstdienst.provinz.bz.it/de/wald-holz/suedtirols-wald-flaechen" },
        { label: "ASTAT – Istituto provinciale di statistica: Territorio insediativo in provincia di Bolzano – 2012 (prospetti 28–30)", href: "https://assets-eu-01.kc-usercontent.com/b5376750-8076-01cf-17d2-d343e29778a7/5d16ffd8-363e-4d29-93f6-cdb4d67f53c5/pressnote_899333_dsg_2012.pdf" },
        { label: "West et al. (2023): Action needed to make carbon offsets from forest conservation work for climate change mitigation, Science 381 (2023)", href: "https://www.science.org/doi/10.1126/science.ade3535" }
      ],
      insteadEyebrow: "Che cosa conta invece",
      insteadTitle: "Conservare e ripristinare gli habitat.",
      insteadCopy: "Un prato ricco di specie offre habitat, trattiene l’acqua sul versante, sostiene il suolo e supera un’annata secca meglio di uno impoverito. Chi lo conserva non compensa nulla. Conserva ciò che serve ad agricoltura, acqua e suolo.",
      storageTitle: "Queste superfici immagazzinano comunque carbonio.",
      storageCopy: "Torbiere intatte, suoli prativi antichi, siepi e frutteti tradizionali immagazzinano carbonio. È un buon motivo per proteggerli. Non accreditiamo però questo accumulo a nessuno e non lo convertiamo in tonnellate. Appena lo si vende come controvalore, si fa la promessa che non vogliamo fare.",
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
      beforeAfterCopy: "Prima e dopo dallo stesso punto di vista. Trascina il cursore per confrontare.",
      before: "Prima",
      after: "Dopo",
      beforeAfterSliderLabel: "Confronto tra prima e dopo",
      beforeAfterPlaceholderNote: "Segnaposto: finché non ci sono foto reali del prima, il lato sinistro mostra una versione modificata della foto del progetto.",
      galleryTitle: "Uno sguardo sull’area",
      galleryCopy: "Immagini dall’area di progetto: superfici, interventi e specie.",
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
      copy: "Habitat typology, monitoring protocols and key figures are reviewed by specialists. That guidance checks the method. Responsibility for the content stays with the platform."
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
        "Climate: intact bogs, old meadow soils and hedgerows store carbon."
      ],
      economyTitle: "Why the loss also counts economically",
      economyCopy: "The IPBES puts the money flowing into nature-destroying activities in 2023 alone at around 7.3 trillion US dollars. That is roughly 33 times what governments and companies spent on conserving nature. In the eurozone, around 75 percent of corporate loans depend heavily on at least one ecosystem service. The German development bank KfW estimates that two thirds of EU economic output rest directly or indirectly on ecosystem services.",
      localTitle: "What this means for South Tyrol",
      localCopy: "Farming needs pollinators, tourism lives off the landscape, and settlements on slopes need stable soils. Every project on this platform preserves or restores a piece of that.",
      source: "Figures from: Der Spiegel 37/2026, “Wenn die Umweltkrise zur Finanzkrise wird” (Tim Bartz, Markus Becker), citing the IPBES, a study in “Nature” (September 2025) and the KfW.",
      cta: "Start the habitat check"
    },
    about: {
      eyebrow: "Who is behind it",
      title: "Preserving biodiversity where we live.",
      lead: "b*alance grew out of the work of many South Tyrolean biologists who have spent years on one question: how can the variety of species be preserved and enhanced in their own municipality, on the meadow behind the farm and along the stream in the village?",
      teamEyebrow: "The team",
      teamTitle: "Biologists from South Tyrol who work in the field.",
      teamBio: [
        "All of them studied biology with a focus on ecology and nature conservation and have worked in South Tyrol for years. They map dry grasslands, wetlands, hedgerows and traditional orchards, plan and accompany management measures, and work with municipalities, farmers, schools and conservation groups.",
        "What they share: biodiversity can only be preserved where it occurs. That is why this platform is about concrete sites in South Tyrol."
      ],
      teamMemberName: "Name placeholder",
      teamMemberRole: "Biologist",
      teamPlaceholder: "Placeholder. Names, photos and specialisms to follow.",
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
          copy: "b*coop runs the b*alance platform: the habitat check, the review and documentation of projects, and the link to specialist advisers for biodiversity, energy and resources. Anyone who knows their numbers can reduce them and support a project nearby.",
          cta: "Habitat check"
        }
      ],
      principlesEyebrow: "How we work",
      principlesTitle: "Five rules we can be measured against.",
      principles: [
        ["Local", "Every project is in South Tyrol, has an address and can be visited."],
        ["Reviewed before it goes online", "A panel from ecology, agricultural and environmental science reviews each project’s goals, duration and budget."],
        ["Measurable", "Habitat area, structural diversity and target species are defined up front and tracked in monitoring."],
        ["Reduce before offsetting", "The check shows where your own numbers are large. We make no offsetting promise."],
        ["No claim without evidence", "What we cannot back up, we remove. That applies to this page as well."]
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
      lead: "The habitat check works out how much CO₂ your everyday life causes. What it does not do is offer to cancel that amount out against a payment. That is a deliberate decision. These are the reasons.",
      scopeEyebrow: "Accounting boundary",
      scopeTitle: "What the check calculates, and what it does not claim.",
      scopeCopy: "The CO₂e figure in your result is a transparent slice of the activities asked about, per person and year. Upstream emissions are included only where the respective factor explicitly covers them; consumption, buildings and public services are missing. Deriving a euro amount from a deliberately simplified number would lend it a precision it does not have.",
      reasonsEyebrow: "Four reasons",
      reasonsTitle: "Why emissions cannot be cleanly cancelled out.",
      reasons: [
        ["A tonne is the same everywhere. A habitat is not.", "Offsetting rests on the idea that a tonne here trades against a tonne somewhere else. A bog in the Puster Valley has no such exchange rate. What is lost there does not reappear elsewhere, not with the same species and not in the same water regime."],
        ["The emission acts now, the storage takes decades.", "Carbon released today acts today. A hedgerow, a species-rich meadow, a rewetted bog bind it over decades, and only for as long as the site stays what it is. Drought, fire or a change of use release it again. A balance sheet that treats the two as equal ignores that gap."],
        ["Paid for is not avoided.", "A calculator that ends in an amount shifts the question from “what do I change?” to “what does it cost?”. The check is built for the first question. It shows you where your own numbers are large, because that is where your room to act is largest too."],
        ["We could not back the promise up.", "An offset would have to show that a site would not have existed without the payment, and that it will last. The platform cannot provide that evidence today. By our own rules, a claim without evidence gets cut."]
      ],
      localEyebrow: "And why not here?",
      localTitle: "South Tyrol has no land to spare for it.",
      localCopy: "Offsetting needs land: new forest that stores carbon, or forest that would be cleared without the payment. South Tyrol has hardly any of either. Six hectares in ten lie above 1,600 metres, a fifth is rock and glacier, half is already forest. Take away rock, water, steep slopes, altitude and forest and less than ten percent of the province remains. Villages, businesses and farms sit on that remainder. Whatever could be newly forested here is either forest already or needed for something else.",
      localFigures: [
        ["51%", "of the province is forest: 375,351 of 739,997 hectares."],
        ["59.5%", "of the province lies above 1,600 metres; only 5.5% is permanently settleable at all, and under 3% is settled."],
        ["3×", "over-credited: 18 tropical forest-protection projects were used to offset nearly three times the CO₂ they actually saved. Of 26 projects examined, most barely reduced deforestation."]
      ],
      localClosing: "Large-scale offsetting therefore happens in the global South, far from those who pay for it. And even there it often fails to deliver what it promises. We support projects in South Tyrol instead, ones you can visit, follow and watch over the years.",
      localSources: [
        { label: "Forest Service, Autonomous Province of Bolzano: South Tyrol’s forest – areas and figures", href: "https://forstdienst.provinz.bz.it/de/wald-holz/suedtirols-wald-flaechen" },
        { label: "ASTAT – Provincial Statistics Institute: Permanent settlement area in South Tyrol – 2012 (tables 28–30)", href: "https://assets-eu-01.kc-usercontent.com/b5376750-8076-01cf-17d2-d343e29778a7/5d16ffd8-363e-4d29-93f6-cdb4d67f53c5/pressnote_899333_dsg_2012.pdf" },
        { label: "West et al. (2023): Action needed to make carbon offsets from forest conservation work for climate change mitigation, Science 381 (2023)", href: "https://www.science.org/doi/10.1126/science.ade3535" }
      ],
      insteadEyebrow: "What counts instead",
      insteadTitle: "Keeping habitats, and bringing them back.",
      insteadCopy: "A species-rich meadow provides habitat, holds water on the slope, carries soil and gets through a dry year better than a depleted one. Keeping it does not balance anything out. It keeps what farming, water and soil depend on.",
      storageTitle: "These sites store carbon all the same.",
      storageCopy: "Intact bogs, old meadow soils, hedgerows and traditional orchards store carbon. That is a good reason to protect them. But we do not credit that storage to anyone and we do not convert it into tonnes. As soon as it is sold as a counter-value, you are making the promise we choose not to make.",
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
      beforeAfterCopy: "Before and after from the same viewpoint. Drag the handle to compare.",
      before: "Before",
      after: "After",
      beforeAfterSliderLabel: "Comparison between before and after",
      beforeAfterPlaceholderNote: "Placeholder: until real before photos are available, the left side shows an edited version of the project photo.",
      galleryTitle: "A look at the site",
      galleryCopy: "Images from the project area: sites, measures and species.",
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
