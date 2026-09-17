import type { Locale } from "./site";

const translations = {
  de: {
    nav: ["Was ist b*alance", "Projekte", "Biodiversität in Südtirol", "CO₂-Kompensation?", "Über uns"],
    navLabel: "Hauptnavigation",
    skipToContent: "Zum Hauptinhalt springen",
    mobileNavLabel: "Mobile Navigation",
    headerCta: "Check starten",
    projectOwners: "Für Projektträger",
    submitProject: "Projekt einreichen",
    menu: "Menü öffnen",
    footer: {
      mission: "Biodiversitätsprojekte in Südtirol, die man unterstützen und besuchen kann.",
      science: "Methodik und Projektdaten sind offen dokumentiert.",
      methodology: "Methodik",
      carbonStance: "CO₂ & Biodiversität",
      explore: "Entdecken",
      habitatCheck: "Lebensraum-Check",
      projects: "Projekte",
      submitProject: "Projekt einreichen",
      about: "Plattform",
      contact: "Kontakt",
      contactCopy: "Fragen zur Plattform, zu Projekten oder zur Zusammenarbeit:",
      newsletter: "Newsletter",
      newsletterCopy: "Neuigkeiten von den Projektflächen und Termine, ein paar Mal im Jahr per E-Mail.",
      newsletterCta: "Zum Newsletter anmelden",
      newsletterSubject: "Anmeldung zum b*alance-Newsletter",
      newsletterBody: "Bitte nehmt mich in den b*alance-Newsletter auf.",
      whatIs: "Was ist b*alance",
      aboutBalance: "Über uns",
      privacy: "Datenschutz",
      imprint: "Impressum",
      copyright: "© 2026 b*alance"
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
      title: "Raum für Raum: Was dein Alltag mit Biodiversität zu tun hat.",
      copy: "Jeder Raum steht für einen Bereich deines Alltags. Der Check zeigt, welche Entscheidungen mit Artenvielfalt zusammenhängen und wo sie außerhalb deiner vier Wände wirken.",
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
      title: "Projekte in Südtirol.",
      copy: "Jedes Projekt hat eine Gemeinde, eine Trägerorganisation und einen dokumentierten Stand. Alle lassen sich besuchen.",
      all: "Alle Projekte",
      previous: "Vorheriges Projekt",
      next: "Nächstes Projekt",
      stanceButton: "Warum Biodiversität statt CO₂?",
      stanceTeaser: "Artenvielfalt ist für unser Leben mindestens so wichtig wie das Klima. CO₂-Kompensation braucht zudem Fläche, die es in Südtirol nicht gibt. Lebensräume vor Ort kann man erhalten und besuchen.",
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
      title: "Wer die Plattform mitträgt.",
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
      eyebrow: "Mitmachen",
      title: "Ein Projekt unterstützen – oder eines einreichen.",
      copy: "Wer ein Projekt unterstützt, kann es besuchen und über Jahre verfolgen. Wer selbst eine Fläche betreut, kann ein Projekt einreichen; ein Fachgremium prüft es vor der Veröffentlichung.",
      cta: "Projekte ansehen",
      features: [
        ["Vor Ort", "Jedes Projekt liegt in Südtirol und hat eine Adresse."],
        ["Geprüft", "Ein Fachgremium prüft Ziele, Laufzeit und Budget vor der Aufnahme."],
        ["Dokumentiert", "Maßnahmen, Monitoring und Finanzierungsstand stehen auf der Projektseite."]
      ]
    },
    biodiversityExplainer: {
      button: "Biodiversität in Südtirol",
      teaser: "Außergewöhnliche Artenvielfalt auf engem Raum – und warum unsere Wirtschaft intakte Lebensräume braucht.",
      open: "Kurz erklärt",
      eyebrow: "Biodiversität",
      title: "Warum Südtirol so artenreich ist – und was daran hängt.",
      lead: "Biodiversität ist die Vielfalt der Arten, ihrer Gene und ihrer Lebensräume. Südtirol zählt darin zu den reichsten Regionen Mitteleuropas: Mehr als 2.500 Gefäßpflanzenarten sind hier nachgewiesen, dazu eine entsprechende Vielfalt an Schmetterlingen, Heuschrecken, Vögeln und Fledermäusen. Der Grund liegt in der Landschaft selbst. Zwischen Talboden und Gipfel wechseln Klima, Gestein und Boden auf kurzer Distanz – und mit ihnen die Lebensräume, von der Trockenwiese über Auwald und Alm bis zum Moor.",
      keyFigure: ["2.500+", "Gefäßpflanzenarten sind in Südtirol nachgewiesen"],
      keyFigureSource: "Eurac Research, Biodiversitätsmonitoring Südtirol",
      servicesTitle: "Was intakte Lebensräume leisten",
      services: [
        "Bestäubung: Wildbienen, Schmetterlinge und andere Insekten bestäuben Obst, Gemüse und Wildpflanzen.",
        "Wasser und Boden: Artenreiche Wiesen und Hecken halten Wasser am Hang, bremsen Erosion und bauen Boden auf.",
        "Widerstandskraft: Vielfältige Lebensräume überstehen Dürre, Starkregen und Schädlinge besser als verarmte.",
        "Klima: Moore, alte Wiesenböden und Hecken speichern Kohlenstoff."
      ],
      economyTitle: "Warum der Verlust wirtschaftlich zählt",
      economyCopy: "Naturverlust ist kein reines Umweltthema. Der Weltbiodiversitätsrat IPBES beziffert die Geldflüsse in naturschädigende Aktivitäten allein für 2023 auf rund 7,3 Billionen US-Dollar – etwa 33-mal so viel, wie Staaten und Unternehmen im selben Jahr für den Erhalt der Natur aufwendeten. In der Eurozone hängen rund 75 Prozent der Unternehmenskredite stark von mindestens einer Ökosystemleistung ab. Die Förderbank KfW schätzt, dass zwei Drittel der EU-Wirtschaftsleistung direkt oder indirekt auf solchen Leistungen beruhen.",
      economyFigures: [
        ["7,3 Bio. US-$", "flossen 2023 in naturschädigende Aktivitäten"],
        ["33×", "mehr als im selben Jahr in den Erhalt der Natur"],
        ["75 %", "der Unternehmenskredite in der Eurozone hängen stark von Ökosystemleistungen ab"],
        ["2/3", "der EU-Wirtschaftsleistung beruhen direkt oder indirekt auf Ökosystemleistungen"]
      ],
      localTitle: "Auch in Südtirol gehen Lebensräume verloren",
      localCopy: "Diese Abhängigkeit ist hier konkret: Der Obstbau braucht Bestäuber, der Tourismus lebt von der Landschaft, Siedlungen an Hängen brauchen stabile Böden. Zugleich setzen intensive Bewirtschaftung, Verbauung und Klimawandel die Lebensräume unter Druck. Artenreiche Mager- und Feuchtwiesen werden seltener, Rückzugsräume verschwinden oder werden voneinander getrennt. Mit ihnen verlieren Arten ihre Lebensgrundlage – und die Region Leistungen, auf die sie angewiesen ist. Die Projekte auf dieser Plattform erhalten solche Lebensräume oder stellen sie wieder her.",
      source: "Südtirol: Eurac Research, Biodiversitätsmonitoring Südtirol – Gefäßpflanzen und Ergebnisbericht 2019–2023. Wirtschaftliche Zahlen nach: Der Spiegel 37/2026, „Wenn die Umweltkrise zur Finanzkrise wird“ (Tim Bartz, Markus Becker), mit Bezug auf den Weltbiodiversitätsrat IPBES, eine Studie in „Nature“ (September 2025) und die KfW.",
      cta: "Lebensraum-Check starten"
    },
    whatIs: {
      eyebrow: "Was ist b*alance",
      title: "Eine Plattform für Biodiversitätsprojekte in Südtirol.",
      lead: "b*alance verbindet zwei Dinge: einen kurzen Check, der zeigt, wo dein Alltag Natur beansprucht, und geprüfte Projekte in Südtirol, die Lebensräume erhalten oder wiederherstellen. Wer den Check macht, findet am Ende Projekte, die genau dort wirken.",
      howEyebrow: "So funktioniert es",
      howTitle: "Vom eigenen Alltag zu einem Projekt vor Ort.",
      steps: [
        ["Check machen", "Sieben Räume, kurze Fragen, drei bis fünf Minuten. Es geht um Ernährung, Wasser, Energie, Wege, Garten und Reisen."],
        ["Ergebnis verstehen", "Das Ergebnis zeigt Größenordnungen in vier Dimensionen: Biodiversität, CO₂, Wasser, Ressourcen. Es ist eine Orientierung, keine Bilanz."],
        ["Projekt finden", "Zu jedem Ergebnis passen Projekte in Südtirol – mit Gemeinde, Trägerorganisation, Maßnahmenplan und Monitoring."],
        ["Unterstützen und besuchen", "Wer ein Projekt unterstützt, kann hinfahren, den Fortschritt verfolgen und die Ergebnisse auf der Projektseite nachlesen."]
      ],
      notEyebrow: "Was b*alance nicht ist",
      notTitle: "Drei Dinge, die wir bewusst nicht tun.",
      nots: [
        ["Kein Kompensationsrechner", "Der Check weist CO₂ aus, verkauft aber keinen Ausgleich. Warum, steht auf einer eigenen Seite."],
        ["Keine Plattform ohne Ort", "Jedes Projekt liegt in Südtirol und hat eine Adresse. Nähe ist die Auswahlregel, nicht ein Merkmal."],
        ["Keine Aussage ohne Beleg", "Zahlen und Forschungsbezüge stehen mit Quelle. Was wir nicht belegen können, streichen wir."]
      ],
      notLinks: ["CO₂ & Biodiversität", "Projekte ansehen", "Methodik & Quellen"],
      whoEyebrow: "Für wen",
      whoTitle: "Drei Gruppen, drei Wege.",
      who: [
        ["Privatpersonen", "Den Check machen, das eigene Ergebnis verstehen und ein Projekt in der Nähe unterstützen.", "Check starten"],
        ["Projektträger", "Vereine, Netzwerke und Organisationen reichen Projekte ein; ein Fachgremium prüft sie vor der Veröffentlichung.", "Projekt einreichen"],
        ["Gemeinden und Förderer", "Geprüfte, dokumentierte Projekte mit Ort, Laufzeit und Budget – als Grundlage für Förderung und Kooperation.", "Über uns"]
      ],
      statusEyebrow: "Stand",
      statusCopy: "Die Plattform ist im Aufbau. Projektdaten, Zahlen und Zitate sind teils Platzhalter und überall dort, wo sie es sind, als solche gekennzeichnet.",
      ctaTitle: "Anfangen",
      ctaCheck: "Check starten",
      ctaProjects: "Projekte ansehen"
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
      lead: "Der Lebensraum-Check zeigt, wie viel CO₂ dein Alltag verursacht. Was er nicht tut: dir eins zu eins vorrechnen, wie viel Euro du zahlen solltest, um das auszugleichen. Das ist eine bewusste Entscheidung – hier stehen die Gründe.",
      scopeEyebrow: "Bilanzgrenze",
      scopeTitle: "Was der Check rechnet – und was nicht.",
      scopeCopy: "Der CO₂e-Wert ist ein transparenter Ausschnitt: die abgefragten Aktivitäten pro Person und Jahr. Konsum, Gebäude und öffentliche Leistungen fehlen, Vorketten sind nur enthalten, wo der Faktor sie abbildet. Aus einer so vereinfachten Zahl einen Euro-Betrag abzuleiten, würde ihr eine Genauigkeit unterstellen, die sie nicht hat.",
      reasonsEyebrow: "Vier Gründe",
      reasonsTitle: "Warum sich Ausstoß nicht sauber gegenrechnen lässt.",
      reasons: [
        ["Eine Tonne ist überall gleich. Ein Lebensraum nicht.", "Kompensation setzt voraus, dass eine Tonne hier gegen eine Tonne anderswo tauschbar ist. Ein Moor im Pustertal hat diesen Tauschwert nicht: Was dort verloren geht, entsteht anderswo nicht noch einmal – nicht mit denselben Arten, nicht im selben Wasserhaushalt."],
        ["Die Emission wirkt sofort, die Speicherung braucht Jahrzehnte.", "Kohlenstoff, der heute frei wird, wirkt heute. Eine Hecke oder ein wiedervernässtes Moor bindet ihn über Jahrzehnte – und nur so lange, wie die Fläche bleibt, was sie ist. Dürre, Brand oder eine neue Nutzung setzen ihn wieder frei."],
        ["Bezahlt ist nicht vermieden.", "Ein Rechner, der mit einem Betrag endet, verschiebt die Frage von „Was ändere ich?“ zu „Was kostet es?“. Der Check ist für die erste Frage gebaut: Er zeigt, wo deine Zahlen groß sind – denn dort ist auch dein Spielraum am größten."],
        ["Wir könnten das Versprechen nicht belegen.", "Ein Ausgleich müsste nachweisen, dass eine Fläche ohne die Zahlung nicht entstanden wäre und dauerhaft bleibt. Diesen Nachweis kann die Plattform heute nicht führen – und eine Aussage ohne Beleg streichen wir."]
      ],
      localEyebrow: "Und warum nicht hier?",
      localTitle: "In Südtirol ist Fläche knapp.",
      localCopy: "Kompensation braucht Fläche: neuen Wald, der Kohlenstoff bindet, oder Wald, der ohne die Zahlung verloren ginge. In Südtirol ist beides knapp. Sechs von zehn Hektar liegen über 1.600 Metern, ein Fünftel ist Fels und Gletscher, die Hälfte ist bereits Wald. Der verbleibende Raum wird von Dörfern, Betrieben und Landwirtschaft gebraucht.",
      localFigures: [
        ["51 %", "der Landesfläche sind Wald – 375.351 von 739.997 Hektar."],
        ["59,5 %", "der Landesfläche liegen über 1.600 Metern. Nur 5,5 % sind dauerhaft besiedelbar."],
        ["3-fach", "überschätzt war die CO₂-Wirkung von 18 tropischen Waldschutzprojekten laut einer Studie in „Science“."]
      ],
      localClosing: "Großflächige Kompensation findet deshalb meist weit entfernt statt, und ihre Wirkung ist von hier aus schwer zu überprüfen. Wir setzen stattdessen auf Projekte in Südtirol, die man besuchen, begleiten und über Jahre beobachten kann.",
      localSources: [
        { label: "Forstdienst Autonome Provinz Bozen: Südtirols Wald – Flächen und Zahlen", href: "https://forstdienst.provinz.bz.it/de/wald-holz/suedtirols-wald-flaechen" },
        { label: "ASTAT – Landesinstitut für Statistik: Dauersiedlungsgebiet in Südtirol – 2012 (Übersichten 28–30)", href: "https://assets-eu-01.kc-usercontent.com/b5376750-8076-01cf-17d2-d343e29778a7/5d16ffd8-363e-4d29-93f6-cdb4d67f53c5/pressnote_899333_dsg_2012.pdf" },
        { label: "West et al. (2023): Action needed to make carbon offsets from forest conservation work for climate change mitigation, Science 381 (2023)", href: "https://www.science.org/doi/10.1126/science.ade3535" }
      ],
      insteadEyebrow: "Was stattdessen zählt",
      insteadTitle: "Lebensräume erhalten und wiederherstellen.",
      insteadCopy: "Eine artenreiche Wiese bietet Lebensraum, hält Wasser im Hang, trägt Boden und übersteht ein trockenes Jahr besser als eine verarmte. Wer sie erhält, gleicht nichts aus – er erhält, was Landwirtschaft, Wasser und Boden brauchen.",
      storageTitle: "Kohlenstoff speichern diese Flächen trotzdem.",
      storageCopy: "Moore, alte Wiesenböden, Hecken und Streuobstbestände speichern Kohlenstoff – ein guter Grund, sie zu schützen. Wir schreiben diese Speicherung aber niemandem gut und rechnen sie nicht in Tonnen um. Wer sie als Gegenwert verkauft, gibt das Versprechen, das wir nicht geben wollen.",
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
      title: "Sie betreuen ein Biodiversitätsprojekt in Südtirol?",
      copy: "Reichen Sie es ein. Ein Fachgremium prüft Ziele, Laufzeit und Budget; danach entscheidet sich die Aufnahme.",
      cta: "Projekt einreichen"
    },
    projectsPage: {
      eyebrow: "Projektplattform",
      title: "Projekte in Südtirol.",
      copy: "Wälder, Gewässer, Kulturlandschaften und andere Lebensräume – jedes Projekt mit Gemeinde, Trägerorganisation und aktuellem Stand.",
      filterTitle: "Nach Lebensraum filtern",
      filterCopy: "Lebensraum wählen oder nach Projekt und Ort suchen.",
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
      mapLabel: "Südtirol im Umriss mit dem Standort dieses Projekts.",
      mapAttribution: "Umriss: © OpenStreetMap-Mitwirkende (ODbL)",
      openMap: "Auf OpenStreetMap ansehen",
      whyMatters: "Warum dieses Projekt wichtig ist",
      whatItDoes: "Was das Projekt konkret tut",
      beforeAfterTitle: "Vorher / Nachher",
      beforeAfterCopy: "Regler ziehen, um zu vergleichen.",
      before: "Vorher",
      after: "Nachher",
      beforeAfterSliderLabel: "Vergleich zwischen Vorher und Nachher",
      galleryTitle: "Bilder",
      galleryCopy: "Flächen, Maßnahmen und Arten aus dem Projektgebiet.",
      galleryPrevious: "Vorheriges Bild",
      galleryNext: "Nächstes Bild",
      galleryImage: "Bild",
      photo: "Foto",
      ecologicalImpact: "Ökologische Wirkung",
      impactCopy: "Die Ziele sind vorab festgelegt und werden im Monitoring nachgehalten.",
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
      shareProject: "Projekt teilen",
      copyLink: "Link kopieren",
      linkCopied: "Link kopiert",
      copyFailed: "Kopieren nicht möglich. Bitte den Link unten manuell kopieren.",
      transparency: "Trägerorganisation & Transparenz",
      transparencyCopy: "Maßnahmenplan, Monitoring und Ergebnisse stehen auf dieser Seite und werden aktualisiert.",
      sponsorsEyebrow: "Ermöglicht durch",
      sponsorsTitle: "Förderpartner des Projekts",
      mainSponsor: "Hauptförderer",
      supportingSponsors: "Weitere Förderpartner",
      relatedEyebrow: "Weitere Projekte",
      relatedTitle: "Ähnliche Projekte in Südtirol",
      showAll: "Alle anzeigen",
      finalTitle: "Dieses Projekt unterstützen",
      finalCopy: "Direkt unterstützen oder weitere Projekte in Südtirol ansehen.",
      discoverMore: "Weitere Biodiversitätsprojekte",
      close: "Dialog schließen",
      thankYou: "Vielen Dank für deine Unterstützung!",
      thankYouCopy: "Der Stand des Projekts wird auf dieser Seite aktualisiert.",
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
    nav: ["Che cos’è b*alance", "Progetti", "Biodiversità in Alto Adige", "Compensazione della CO₂?", "Chi siamo"],
    navLabel: "Navigazione principale",
    skipToContent: "Vai al contenuto principale",
    mobileNavLabel: "Navigazione mobile",
    headerCta: "Avvia il check",
    projectOwners: "Per chi propone progetti",
    submitProject: "Proponi un progetto",
    menu: "Apri il menu",
    footer: {
      mission: "Progetti per la biodiversità in Alto Adige, da sostenere e da visitare.",
      science: "Metodo e dati dei progetti sono documentati apertamente.",
      methodology: "Metodo",
      carbonStance: "CO₂ e biodiversità",
      explore: "Scopri",
      habitatCheck: "Check degli habitat",
      projects: "Progetti",
      submitProject: "Proponi un progetto",
      about: "Piattaforma",
      contact: "Contatto",
      contactCopy: "Domande sulla piattaforma, sui progetti o sulla collaborazione:",
      newsletter: "Newsletter",
      newsletterCopy: "Novità dalle aree dei progetti e appuntamenti, alcune volte l’anno via e-mail.",
      newsletterCta: "Iscriviti alla newsletter",
      newsletterSubject: "Iscrizione alla newsletter b*alance",
      newsletterBody: "Vi chiedo di iscrivermi alla newsletter b*alance.",
      whatIs: "Che cos’è b*alance",
      aboutBalance: "Chi siamo",
      privacy: "Privacy",
      imprint: "Note legali",
      copyright: "© 2026 b*alance"
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
      title: "Stanza per stanza: cosa c’entra la tua vita quotidiana con la biodiversità.",
      copy: "Ogni stanza rappresenta un ambito della tua vita quotidiana. Il check mostra quali scelte hanno a che fare con la varietà delle specie e dove agiscono fuori dalle tue quattro mura.",
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
      title: "Progetti in Alto Adige.",
      copy: "Ogni progetto ha un comune, un ente promotore e uno stato documentato. Tutti si possono visitare.",
      all: "Tutti i progetti",
      previous: "Progetto precedente",
      next: "Progetto successivo",
      stanceButton: "Perché biodiversità invece di CO₂?",
      stanceTeaser: "La varietà delle specie è per la nostra vita importante almeno quanto il clima. La compensazione di CO₂ ha inoltre bisogno di superficie, e in Alto Adige non c’è. Gli habitat sul posto si possono conservare e visitare.",
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
      title: "Chi sostiene la piattaforma.",
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
      eyebrow: "Partecipare",
      title: "Sostenere un progetto – o proporne uno.",
      copy: "Chi sostiene un progetto può visitarlo e seguirlo negli anni. Chi cura un’area può proporre un progetto; una commissione tecnica lo valuta prima della pubblicazione.",
      cta: "Vedi i progetti",
      features: [
        ["Sul posto", "Ogni progetto si trova in Alto Adige e ha un indirizzo."],
        ["Valutato", "Una commissione tecnica verifica obiettivi, durata e budget prima dell’ammissione."],
        ["Documentato", "Interventi, monitoraggio e stato del finanziamento sono sulla pagina del progetto."]
      ]
    },
    biodiversityExplainer: {
      button: "Biodiversità in Alto Adige",
      teaser: "Una straordinaria ricchezza di specie in poco spazio: perché la nostra economia ha bisogno di habitat intatti.",
      open: "In breve",
      eyebrow: "Biodiversità",
      title: "Perché l’Alto Adige è così ricco di specie – e cosa ne dipende.",
      lead: "La biodiversità è la varietà delle specie, dei loro geni e dei loro habitat. L’Alto Adige è tra le regioni più ricche dell’Europa centrale: qui sono documentate più di 2.500 specie di piante vascolari, insieme a una varietà corrispondente di farfalle, cavallette, uccelli e pipistrelli. La ragione sta nel paesaggio stesso. Tra fondovalle e vetta, clima, roccia e suolo cambiano a breve distanza – e con loro gli habitat, dal prato arido al bosco ripariale, dalla malga alla torbiera.",
      keyFigure: ["2.500+", "specie di piante vascolari documentate in Alto Adige"],
      keyFigureSource: "Eurac Research, Monitoraggio della biodiversità Alto Adige",
      servicesTitle: "Cosa fanno gli habitat intatti",
      services: [
        "Impollinazione: api selvatiche, farfalle e altri insetti impollinano frutta, verdura e piante spontanee.",
        "Acqua e suolo: prati ricchi di specie e siepi trattengono l’acqua sui pendii, frenano l’erosione e costruiscono suolo.",
        "Resilienza: habitat diversificati resistono a siccità, piogge intense e parassiti meglio di quelli impoveriti.",
        "Clima: torbiere, vecchi suoli prativi e siepi immagazzinano carbonio."
      ],
      economyTitle: "Perché la perdita conta economicamente",
      economyCopy: "La perdita di natura non è solo una questione ambientale. L’IPBES stima che nel solo 2023 siano confluiti circa 7.300 miliardi di dollari in attività dannose per la natura – circa 33 volte quanto Stati e imprese hanno speso nello stesso anno per conservarla. Nell’eurozona circa il 75 per cento dei prestiti alle imprese dipende fortemente da almeno un servizio ecosistemico. La banca di sviluppo KfW stima che due terzi della produzione economica dell’UE si basino direttamente o indirettamente su tali servizi.",
      economyFigures: [
        ["7.300 mrd $", "confluiti nel 2023 in attività dannose per la natura"],
        ["33×", "più di quanto speso nello stesso anno per conservare la natura"],
        ["75 %", "dei prestiti alle imprese nell’eurozona dipende fortemente da servizi ecosistemici"],
        ["2/3", "della produzione economica dell’UE si basa direttamente o indirettamente su servizi ecosistemici"]
      ],
      localTitle: "Anche in Alto Adige gli habitat scompaiono",
      localCopy: "Qui questa dipendenza è concreta: la frutticoltura ha bisogno di impollinatori, il turismo vive del paesaggio, gli insediamenti sui pendii hanno bisogno di suoli stabili. Allo stesso tempo gestione intensiva, edificazione e cambiamento climatico mettono sotto pressione gli habitat. I prati magri e umidi ricchi di specie diventano più rari, le aree di rifugio scompaiono o vengono isolate. Con loro le specie perdono le condizioni necessarie per vivere – e la regione perde servizi da cui dipende. I progetti su questa piattaforma conservano o ripristinano questi habitat.",
      source: "Alto Adige: Eurac Research, Monitoraggio della biodiversità Alto Adige – Piante vascolari e rapporto sui risultati 2019–2023. Cifre economiche da: Der Spiegel 37/2026, «Wenn die Umweltkrise zur Finanzkrise wird» (Tim Bartz, Markus Becker), con riferimento all’IPBES, a uno studio su «Nature» (settembre 2025) e alla KfW.",
      cta: "Avvia l’habitat check"
    },
    whatIs: {
      eyebrow: "Che cos’è b*alance",
      title: "Una piattaforma per progetti di biodiversità in Alto Adige.",
      lead: "b*alance unisce due cose: un breve check che mostra dove la tua vita quotidiana pesa sulla natura, e progetti valutati in Alto Adige che conservano o ripristinano habitat. Chi fa il check trova alla fine progetti che agiscono proprio lì.",
      howEyebrow: "Come funziona",
      howTitle: "Dalla propria quotidianità a un progetto sul posto.",
      steps: [
        ["Fare il check", "Sette stanze, domande brevi, da tre a cinque minuti. Si parla di alimentazione, acqua, energia, spostamenti, giardino e viaggi."],
        ["Capire il risultato", "Il risultato mostra ordini di grandezza in quattro dimensioni: biodiversità, CO₂, acqua, risorse. È un orientamento, non un bilancio."],
        ["Trovare un progetto", "A ogni risultato corrispondono progetti in Alto Adige – con comune, ente promotore, piano degli interventi e monitoraggio."],
        ["Sostenere e visitare", "Chi sostiene un progetto può andarci, seguirne i progressi e leggere i risultati sulla pagina del progetto."]
      ],
      notEyebrow: "Che cosa b*alance non è",
      notTitle: "Tre cose che scegliamo di non fare.",
      nots: [
        ["Nessun calcolatore di compensazione", "Il check indica la CO₂, ma non vende compensazioni. Il perché è spiegato in una pagina dedicata."],
        ["Nessuna piattaforma senza luogo", "Ogni progetto si trova in Alto Adige e ha un indirizzo. La vicinanza è il criterio di selezione, non una caratteristica."],
        ["Nessuna affermazione senza prova", "Cifre e riferimenti scientifici hanno una fonte. Ciò che non possiamo provare, lo togliamo."]
      ],
      notLinks: ["CO₂ e biodiversità", "Vedi i progetti", "Metodo e fonti"],
      whoEyebrow: "Per chi",
      whoTitle: "Tre gruppi, tre strade.",
      who: [
        ["Privati", "Fare il check, capire il proprio risultato e sostenere un progetto vicino.", "Avvia il check"],
        ["Enti promotori", "Associazioni, reti e organizzazioni propongono progetti; una commissione tecnica li valuta prima della pubblicazione.", "Proponi un progetto"],
        ["Comuni e finanziatori", "Progetti valutati e documentati con luogo, durata e budget – come base per finanziamenti e collaborazioni.", "Chi siamo"]
      ],
      statusEyebrow: "Stato",
      statusCopy: "La piattaforma è in costruzione. Dati dei progetti, cifre e citazioni sono in parte segnaposto e, ovunque lo siano, contrassegnati come tali.",
      ctaTitle: "Iniziare",
      ctaCheck: "Avvia il check",
      ctaProjects: "Vedi i progetti"
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
      lead: "L’habitat check mostra quanta CO₂ produce la tua vita quotidiana. Quello che non fa: dirti uno a uno quanti euro dovresti pagare per compensarla. È una scelta consapevole – qui ci sono le ragioni.",
      scopeEyebrow: "Confine di bilancio",
      scopeTitle: "Che cosa calcola il check – e che cosa no.",
      scopeCopy: "Il valore di CO₂e è uno spaccato trasparente: le attività rilevate per persona e anno. Mancano consumi, edifici e servizi pubblici; le filiere a monte sono incluse solo dove il fattore le rappresenta. Ricavare un importo in euro da un numero così semplificato gli attribuirebbe una precisione che non ha.",
      reasonsEyebrow: "Quattro ragioni",
      reasonsTitle: "Perché le emissioni non si compensano in modo pulito.",
      reasons: [
        ["Una tonnellata è uguale ovunque. Un habitat no.", "La compensazione presuppone che una tonnellata qui sia scambiabile con una tonnellata altrove. Una torbiera in Val Pusteria non ha questo valore di scambio: ciò che va perso lì non rinasce altrove – non con le stesse specie, non con lo stesso regime idrico."],
        ["L’emissione agisce subito, lo stoccaggio richiede decenni.", "Il carbonio liberato oggi agisce oggi. Una siepe o una torbiera riallagata lo lega nell’arco di decenni – e solo finché la superficie resta ciò che è. Siccità, incendi o un nuovo uso lo liberano di nuovo."],
        ["Pagato non significa evitato.", "Un calcolatore che finisce con un importo sposta la domanda da «Che cosa cambio?» a «Quanto costa?». Il check è fatto per la prima domanda: mostra dove i tuoi numeri sono grandi – perché lì è anche più ampio il tuo margine d’azione."],
        ["Non potremmo dimostrare la promessa.", "Una compensazione dovrebbe dimostrare che una superficie non sarebbe nata senza il pagamento e che resterà nel tempo. Oggi la piattaforma non può fornire questa prova – e un’affermazione senza prova la cancelliamo."]
      ],
      localEyebrow: "E perché non qui?",
      localTitle: "In Alto Adige lo spazio è poco.",
      localCopy: "La compensazione ha bisogno di superficie: nuovo bosco che lega carbonio, o bosco che senza il pagamento andrebbe perso. In Alto Adige entrambi sono scarsi. Sei ettari su dieci si trovano sopra i 1.600 metri, un quinto è roccia e ghiacciaio, la metà è già bosco. Lo spazio che resta serve a paesi, aziende e agricoltura.",
      localFigures: [
        ["51 %", "del territorio provinciale è bosco – 375.351 di 739.997 ettari."],
        ["59,5 %", "del territorio si trova sopra i 1.600 metri. Solo il 5,5 % è insediabile in modo permanente."],
        ["3 volte", "sovrastimato l’effetto sulla CO₂ di 18 progetti tropicali di tutela forestale, secondo uno studio su «Science»."]
      ],
      localClosing: "La compensazione su larga scala avviene perciò per lo più lontano da qui, e il suo effetto è difficile da verificare. Noi puntiamo invece su progetti in Alto Adige che si possono visitare, seguire e osservare per anni.",
      localSources: [
        { label: "Servizio forestale Provincia autonoma di Bolzano: il bosco altoatesino – superfici e cifre", href: "https://forstdienst.provinz.bz.it/de/wald-holz/suedtirols-wald-flaechen" },
        { label: "ASTAT – Istituto provinciale di statistica: Territorio insediativo in provincia di Bolzano – 2012 (prospetti 28–30)", href: "https://assets-eu-01.kc-usercontent.com/b5376750-8076-01cf-17d2-d343e29778a7/5d16ffd8-363e-4d29-93f6-cdb4d67f53c5/pressnote_899333_dsg_2012.pdf" },
        { label: "West et al. (2023): Action needed to make carbon offsets from forest conservation work for climate change mitigation, Science 381 (2023)", href: "https://www.science.org/doi/10.1126/science.ade3535" }
      ],
      insteadEyebrow: "Che cosa conta invece",
      insteadTitle: "Conservare e ripristinare gli habitat.",
      insteadCopy: "Un prato ricco di specie offre habitat, trattiene l’acqua sul pendio, tiene il suolo e supera un anno secco meglio di uno impoverito. Chi lo conserva non compensa nulla – conserva ciò di cui agricoltura, acqua e suolo hanno bisogno.",
      storageTitle: "Queste superfici immagazzinano comunque carbonio.",
      storageCopy: "Torbiere, vecchi suoli prativi, siepi e frutteti tradizionali immagazzinano carbonio – una buona ragione per proteggerli. Ma non accreditiamo questo stoccaggio a nessuno e non lo convertiamo in tonnellate. Chi lo vende come contropartita fa la promessa che noi non vogliamo fare.",
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
      title: "Curate un progetto per la biodiversità in Alto Adige?",
      copy: "Proponetelo. Una commissione tecnica verifica obiettivi, durata e budget; poi si decide l’ammissione.",
      cta: "Proponi un progetto"
    },
    projectsPage: {
      eyebrow: "Piattaforma dei progetti",
      title: "Progetti in Alto Adige.",
      copy: "Boschi, acque, paesaggi rurali e altri habitat – ogni progetto con comune, ente promotore e stato attuale.",
      filterTitle: "Filtra per habitat",
      filterCopy: "Scegli un habitat o cerca un progetto o un luogo.",
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
      mapLabel: "Profilo dell'Alto Adige con il luogo di questo progetto.",
      mapAttribution: "Profilo: © contributori OpenStreetMap (ODbL)",
      openMap: "Visualizza su OpenStreetMap",
      whyMatters: "Perché questo progetto è importante",
      whatItDoes: "Cosa fa concretamente il progetto",
      beforeAfterTitle: "Prima / Dopo",
      beforeAfterCopy: "Trascina il cursore per confrontare.",
      before: "Prima",
      after: "Dopo",
      beforeAfterSliderLabel: "Confronto tra prima e dopo",
      galleryTitle: "Immagini",
      galleryCopy: "Aree, interventi e specie dall’area del progetto.",
      galleryPrevious: "Immagine precedente",
      galleryNext: "Immagine successiva",
      galleryImage: "Immagine",
      photo: "Foto",
      ecologicalImpact: "Effetto ecologico",
      impactCopy: "Gli obiettivi sono fissati in anticipo e verificati nel monitoraggio.",
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
      shareProject: "Condividi il progetto",
      copyLink: "Copia il link",
      linkCopied: "Link copiato",
      copyFailed: "Copia non riuscita. Copia manualmente il link qui sotto.",
      transparency: "Organizzazione e trasparenza",
      transparencyCopy: "Piano degli interventi, monitoraggio e risultati sono su questa pagina e vengono aggiornati.",
      sponsorsEyebrow: "Reso possibile da",
      sponsorsTitle: "Partner finanziatori del progetto",
      mainSponsor: "Partner principale",
      supportingSponsors: "Altri partner",
      relatedEyebrow: "Altri progetti",
      relatedTitle: "Progetti simili in Alto Adige",
      showAll: "Mostra tutti",
      finalTitle: "Sostieni questo progetto",
      finalCopy: "Sostienilo direttamente o guarda altri progetti in Alto Adige.",
      discoverMore: "Altri progetti per la biodiversità",
      close: "Chiudi finestra",
      thankYou: "Grazie per il tuo sostegno!",
      thankYouCopy: "Lo stato del progetto viene aggiornato su questa pagina.",
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
    nav: ["What is b*alance", "Projects", "Biodiversity in South Tyrol", "CO₂ offsetting?", "About us"],
    navLabel: "Main navigation",
    skipToContent: "Skip to main content",
    mobileNavLabel: "Mobile navigation",
    headerCta: "Start check",
    projectOwners: "For project teams",
    submitProject: "Submit a project",
    menu: "Open menu",
    footer: {
      mission: "Biodiversity projects in South Tyrol you can support and visit.",
      science: "Method and project data are openly documented.",
      methodology: "Methodology",
      carbonStance: "CO₂ & biodiversity",
      explore: "Explore",
      habitatCheck: "Habitat Check",
      projects: "Projects",
      submitProject: "Submit a Project",
      about: "Platform",
      contact: "Contact",
      contactCopy: "Questions about the platform, the projects or working together:",
      newsletter: "Newsletter",
      newsletterCopy: "News from the project sites and upcoming dates, a few times a year by email.",
      newsletterCta: "Subscribe to the newsletter",
      newsletterSubject: "Subscription to the b*alance newsletter",
      newsletterBody: "Please add me to the b*alance newsletter.",
      whatIs: "What is b*alance",
      aboutBalance: "About us",
      privacy: "Privacy Policy",
      imprint: "Imprint",
      copyright: "© 2026 b*alance"
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
      title: "Room by room: what your everyday life has to do with biodiversity.",
      copy: "Each room stands for one part of your everyday life. The check shows which decisions relate to species diversity and where they take effect beyond your four walls.",
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
      title: "Projects in South Tyrol.",
      copy: "Every project has a municipality, a project organisation and a documented status. All of them can be visited.",
      all: "All projects",
      previous: "Previous project",
      next: "Next project",
      stanceButton: "Why biodiversity instead of CO₂?",
      stanceTeaser: "Biodiversity matters to our lives at least as much as the climate. CO₂ offsetting also needs land, and South Tyrol has none to spare. Habitats nearby can be preserved and visited.",
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
      title: "Who supports the platform.",
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
      eyebrow: "Get involved",
      title: "Support a project – or submit one.",
      copy: "If you support a project, you can visit it and follow it over the years. If you look after a site yourself, you can submit a project; an expert panel reviews it before publication.",
      cta: "View projects",
      features: [
        ["On site", "Every project is in South Tyrol and has an address."],
        ["Reviewed", "An expert panel checks goals, duration and budget before admission."],
        ["Documented", "Measures, monitoring and funding status are on the project page."]
      ]
    },
    biodiversityExplainer: {
      button: "Biodiversity in South Tyrol",
      teaser: "Exceptional species diversity in a small area, and why our economy needs intact habitats.",
      open: "In short",
      eyebrow: "Biodiversity",
      title: "Why South Tyrol is so rich in species – and what depends on it.",
      lead: "Biodiversity is the variety of species, their genes and their habitats. South Tyrol ranks among the richest regions in Central Europe: more than 2,500 vascular plant species are recorded here, along with a corresponding variety of butterflies, grasshoppers, birds and bats. The reason lies in the landscape itself. Between valley floor and summit, climate, rock and soil change over short distances – and with them the habitats, from dry meadow to riparian forest, alpine pasture and bog.",
      keyFigure: ["2,500+", "vascular plant species recorded in South Tyrol"],
      keyFigureSource: "Eurac Research, Biodiversity Monitoring South Tyrol",
      servicesTitle: "What intact habitats provide",
      services: [
        "Pollination: wild bees, butterflies and other insects pollinate fruit, vegetables and wild plants.",
        "Water and soil: species-rich meadows and hedges hold water on slopes, slow erosion and build soil.",
        "Resilience: diverse habitats withstand drought, heavy rain and pests better than depleted ones.",
        "Climate: bogs, old meadow soils and hedges store carbon."
      ],
      economyTitle: "Why the loss counts economically",
      economyCopy: "Nature loss is not purely an environmental issue. The IPBES puts the money flowing into nature-damaging activities in 2023 alone at around 7.3 trillion US dollars – roughly 33 times what governments and companies spent on conserving nature in the same year. In the eurozone, around 75 percent of corporate loans depend heavily on at least one ecosystem service. The development bank KfW estimates that two thirds of EU economic output rests directly or indirectly on such services.",
      economyFigures: [
        ["$7.3 tn", "flowed into nature-damaging activities in 2023"],
        ["33×", "more than was spent on conserving nature in the same year"],
        ["75 %", "of corporate loans in the eurozone depend heavily on ecosystem services"],
        ["2/3", "of EU economic output rests directly or indirectly on ecosystem services"]
      ],
      localTitle: "Habitats are being lost in South Tyrol too",
      localCopy: "Here the dependence is tangible: fruit growing needs pollinators, tourism lives off the landscape, settlements on slopes need stable soils. At the same time, intensive land use, development and climate change put habitats under pressure. Species-rich dry and wet meadows are becoming rarer; refuges disappear or become isolated. With them, species lose the conditions they need – and the region loses services it depends on. The projects on this platform preserve or restore such habitats.",
      source: "South Tyrol: Eurac Research, Biodiversity Monitoring South Tyrol – Vascular plants and results report 2019–2023. Economic figures from: Der Spiegel 37/2026, “Wenn die Umweltkrise zur Finanzkrise wird” (Tim Bartz, Markus Becker), citing the IPBES, a study in “Nature” (September 2025) and the KfW.",
      cta: "Start the habitat check"
    },
    whatIs: {
      eyebrow: "What is b*alance",
      title: "A platform for biodiversity projects in South Tyrol.",
      lead: "b*alance brings two things together: a short check that shows where your everyday life draws on nature, and reviewed projects in South Tyrol that preserve or restore habitats. Whoever takes the check ends up with projects that act exactly there.",
      howEyebrow: "How it works",
      howTitle: "From your own everyday life to a project nearby.",
      steps: [
        ["Take the check", "Seven rooms, short questions, three to five minutes. It covers food, water, energy, journeys, garden and travel."],
        ["Understand the result", "The result shows orders of magnitude in four dimensions: biodiversity, CO₂, water, resources. It is guidance, not an account."],
        ["Find a project", "Every result matches projects in South Tyrol – with municipality, project organisation, action plan and monitoring."],
        ["Support and visit", "If you support a project, you can go there, follow its progress and read the results on the project page."]
      ],
      notEyebrow: "What b*alance is not",
      notTitle: "Three things we deliberately do not do.",
      nots: [
        ["No offset calculator", "The check reports CO₂ but sells no offset. Why is explained on its own page."],
        ["No platform without a place", "Every project is in South Tyrol and has an address. Proximity is the selection rule, not a feature."],
        ["No claim without evidence", "Figures and research references come with a source. What we cannot back up, we cut."]
      ],
      notLinks: ["CO₂ & biodiversity", "View projects", "Method & sources"],
      whoEyebrow: "Who it is for",
      whoTitle: "Three groups, three paths.",
      who: [
        ["Individuals", "Take the check, understand your own result and support a project nearby.", "Start the check"],
        ["Project organisations", "Associations, networks and organisations submit projects; an expert panel reviews them before publication.", "Submit a project"],
        ["Municipalities and funders", "Reviewed, documented projects with place, duration and budget – as a basis for funding and cooperation.", "About us"]
      ],
      statusEyebrow: "Status",
      statusCopy: "The platform is under construction. Project data, figures and quotes are partly placeholders and, wherever they are, marked as such.",
      ctaTitle: "Get started",
      ctaCheck: "Start the check",
      ctaProjects: "View projects"
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
      lead: "The habitat check shows how much CO₂ your everyday life causes. What it does not do: tell you, one to one, how many euros you should pay to offset it. That is a deliberate decision – here are the reasons.",
      scopeEyebrow: "Accounting boundary",
      scopeTitle: "What the check calculates – and what it does not.",
      scopeCopy: "The CO₂e value is a transparent excerpt: the activities surveyed, per person and year. Consumption, buildings and public services are missing; upstream chains are included only where the factor covers them. Deriving a euro amount from such a simplified figure would lend it a precision it does not have.",
      reasonsEyebrow: "Four reasons",
      reasonsTitle: "Why emissions cannot be cleanly cancelled out.",
      reasons: [
        ["A tonne is the same everywhere. A habitat is not.", "Offsetting assumes that a tonne here can be traded for a tonne elsewhere. A bog in the Puster Valley has no such exchange value: what is lost there does not reappear elsewhere – not with the same species, not with the same water balance."],
        ["Emissions act now, storage takes decades.", "Carbon released today acts today. A hedge or a rewetted bog binds it over decades – and only as long as the land stays what it is. Drought, fire or a change of use release it again."],
        ["Paid is not avoided.", "A calculator that ends with an amount shifts the question from “What do I change?” to “What does it cost?”. The check is built for the first question: it shows where your numbers are large – because that is where your room to act is largest."],
        ["We could not back up the promise.", "An offset would have to prove that a site would not have come into being without the payment and that it will last. The platform cannot provide that proof today – and a claim without evidence gets cut."]
      ],
      localEyebrow: "And why not here?",
      localTitle: "Land is scarce in South Tyrol.",
      localCopy: "Offsetting needs land: new forest that stores carbon, or forest that would be lost without the payment. Both are scarce in South Tyrol. Six in ten hectares lie above 1,600 metres, a fifth is rock and glacier, half is already forest. The space that remains is needed for villages, businesses and farmland.",
      localFigures: [
        ["51%", "of the province is forest – 375,351 of 739,997 hectares."],
        ["59.5%", "of the province lies above 1,600 metres. Only 5.5% can be permanently settled."],
        ["3×", "overestimated: the CO₂ effect of 18 tropical forest-protection projects, according to a study in Science."]
      ],
      localClosing: "Large-scale offsetting therefore mostly takes place far from here, and its effect is hard to verify from a distance. We focus instead on projects in South Tyrol that you can visit, follow and watch over the years.",
      localSources: [
        { label: "Forest Service, Autonomous Province of Bolzano: South Tyrol’s forest – areas and figures", href: "https://forstdienst.provinz.bz.it/de/wald-holz/suedtirols-wald-flaechen" },
        { label: "ASTAT – Provincial Statistics Institute: Permanent settlement area in South Tyrol – 2012 (tables 28–30)", href: "https://assets-eu-01.kc-usercontent.com/b5376750-8076-01cf-17d2-d343e29778a7/5d16ffd8-363e-4d29-93f6-cdb4d67f53c5/pressnote_899333_dsg_2012.pdf" },
        { label: "West et al. (2023): Action needed to make carbon offsets from forest conservation work for climate change mitigation, Science 381 (2023)", href: "https://www.science.org/doi/10.1126/science.ade3535" }
      ],
      insteadEyebrow: "What counts instead",
      insteadTitle: "Keeping habitats, and bringing them back.",
      insteadCopy: "A species-rich meadow provides habitat, holds water on the slope, keeps soil in place and survives a dry year better than a depleted one. Whoever keeps it offsets nothing – they keep what farming, water and soil need.",
      storageTitle: "These sites store carbon all the same.",
      storageCopy: "Bogs, old meadow soils, hedges and traditional orchards store carbon – a good reason to protect them. But we credit that storage to no one and do not convert it into tonnes. Selling it as a counter-value makes the promise we do not want to make.",
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
      title: "Do you run a biodiversity project in South Tyrol?",
      copy: "Submit it. An expert panel reviews goals, duration and budget; admission is decided afterwards.",
      cta: "Submit a project"
    },
    projectsPage: {
      eyebrow: "Project platform",
      title: "Projects in South Tyrol.",
      copy: "Forests, waters, cultural landscapes and other habitats – every project with its municipality, project organisation and current status.",
      filterTitle: "Filter by habitat",
      filterCopy: "Choose a habitat or search for a project or place.",
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
      mapLabel: "Outline of South Tyrol with the location of this project.",
      mapAttribution: "Outline: © OpenStreetMap contributors (ODbL)",
      openMap: "View on OpenStreetMap",
      whyMatters: "Why this project matters",
      whatItDoes: "What the project is doing",
      beforeAfterTitle: "Before / After",
      beforeAfterCopy: "Drag the handle to compare.",
      before: "Before",
      after: "After",
      beforeAfterSliderLabel: "Comparison between before and after",
      galleryTitle: "Images",
      galleryCopy: "Sites, measures and species from the project area.",
      galleryPrevious: "Previous image",
      galleryNext: "Next image",
      galleryImage: "Image",
      photo: "Photo",
      ecologicalImpact: "Ecological impact",
      impactCopy: "The goals are set in advance and tracked in the monitoring.",
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
      shareProject: "Share project",
      copyLink: "Copy link",
      linkCopied: "Link copied",
      copyFailed: "Unable to copy. Please copy the link below manually.",
      transparency: "Project team & transparency",
      transparencyCopy: "Action plan, monitoring and results are on this page and are kept up to date.",
      sponsorsEyebrow: "Made possible by",
      sponsorsTitle: "Project funding partners",
      mainSponsor: "Lead sponsor",
      supportingSponsors: "Supporting partners",
      relatedEyebrow: "More projects",
      relatedTitle: "Similar projects in South Tyrol",
      showAll: "View all",
      finalTitle: "Support this project",
      finalCopy: "Support it directly or view more projects in South Tyrol.",
      discoverMore: "Discover more biodiversity projects",
      close: "Close dialog",
      thankYou: "Thank you for your support!",
      thankYouCopy: "The project's status is updated on this page.",
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
