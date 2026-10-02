import type { RoomId } from "../model/types";

/**
 * Inhalt der Tour auf Italienisch und Englisch. Das Deutsche bleibt die Quelle
 * in `config/*.ts`, weil Rechner und Tests dort die Struktur lesen; diese
 * Datei überlagert nur Texte. Ein Test prüft, dass jede Frage, jede Option und
 * jede Quellenangabe in beiden Sprachen vorliegt — eine Sprache darf nicht
 * mehr oder weniger behaupten als eine andere.
 *
 * Quellen: Amtliche Titel werden nicht übersetzt, sondern mit Nummer und
 * Originaltitel zitiert, damit niemand nach einer Publikation sucht, die es
 * unter dem übersetzten Namen nicht gibt.
 */

export type OptionText = { label: string; regionalAverage?: { basis: string; source: string } };
export type QuestionText = {
  title: string;
  sceneLabel: string;
  description: string;
  impactText: string;
  tip: string;
  scopeNote?: string;
  adjust?: { label: string; unit: string; hint?: string; baseUnit?: string };
  options: Record<string, OptionText>;
};
export type RoomText = {
  title: string;
  shortTitle: string;
  description: string;
  /** Satz im Raumabschluss. */
  completion: string;
  questions: Record<string, QuestionText>;
};

const ASTAT_ENERGY = "ASTAT, astat info 61/2022 (Energieverbrauch der Südtiroler Haushalte 2021)";
const ASTAT_MOBILITY = "ASTAT, astat info 51/2024 (Lokale Mobilität: Wege 2024)";
const TERNA_ASTAT_ELECTRICITY = "Terna, Elettricità nelle regioni 2024; ASTAT, Bevölkerungsstand 31.12.2024";

/** Der deutsche Abschlusssatz je Raum; der Rest des Deutschen steht in `config/`. */
export const germanCompletion: Record<RoomId, string> = {
  bath: "Du hast erkundet, wie Wasserverbrauch und Alltagsprodukte mit Gewässern und natürlichen Ressourcen zusammenhängen.",
  bedroom: "Du hast erkundet, wie Wärme, Textilien und Elektronik Ressourcen und Lebensräume beeinflussen.",
  living: "Du hast erkundet, wie Energie, Geräte und Fernreisen mit der Biodiversität verbunden sind.",
  kitchen: "Du hast erkundet, wie Ernährung, Herkunft und Abfälle Flächen und Lebensräume beeinflussen.",
  mobility: "Du hast erkundet, wie unsere Wege Energie, Flächen und die Qualität lokaler Lebensräume prägen.",
  garden: "Du hast erkundet, wie Boden, Pflanzen und Strukturen direkt neue Lebensräume schaffen."
};

const it: Record<RoomId, RoomText> = {
  bedroom: {
    title: "Camera da letto e tessili",
    shortTitle: "Camera",
    description: "Esplora temperatura, armadio e apparecchi in standby in camera da letto.",
    completion: "Hai esplorato come calore, tessili ed elettronica influiscono su risorse e habitat.",
    questions: {
      "bedroom-heating": {
        title: "Come ti riscaldi e quanto consumi in un anno?",
        sceneLabel: "Letto e clima",
        description:
          "Il riscaldamento è di solito la voce energetica più grande della casa. Il valore reale della bolletta rappresenta edificio, superficie, clima e abitudini meglio di una stima forfettaria.",
        impactText:
          "La tua quota del consumo annuo viene valutata con il fattore del sistema di riscaldamento. Con una pompa di calore si intende l’elettricità acquistata; con gas, gasolio o teleriscaldamento l’energia fornita.",
        tip: "Usa se possibile l’ultima bolletta annuale e dividi un consumo comune per il numero di persone in casa.",
        adjust: {
          label: "La tua quota del consumo annuo",
          unit: "kWh",
          hint: "Con una pompa di calore solo la sua elettricità; dividi il consumo comune per persona."
        },
        options: {
          "heat-oil": { label: "Gasolio" },
          "heat-gas": { label: "Metano" },
          "heat-district": { label: "Teleriscaldamento o biomassa" },
          "heat-pump": { label: "Pompa di calore" },
          "heat-unknown": {
            label: "Non lo so o altro",
            regionalAverage: {
              basis:
                "Vettori energetici del riscaldamento principale in Alto Adige: 47 % metano, 33 % biomassa, 10 % gasolio, 5 % GPL, 4 % elettricità. La quantità resta quella predefinita del calcolatore.",
              source: ASTAT_ENERGY
            }
          }
        }
      },
      "bedroom-textiles": {
        title: "Quanti capi d’abbigliamento aggiungi in un anno?",
        sceneLabel: "Armadio",
        description:
          "Un capo nuovo porta con sé tutto il suo zaino: coltivazione della fibra, tintura, cucitura, trasporto. Con l’usato quasi tutto questo viene meno.",
        impactText:
          "Dietro una maglietta di cotone ci sono circa 2.700 litri d’acqua — però là dove cresce il cotone. Quest’acqua virtuale per questo non compare di proposito nel contatore dell’acqua: è contenuta nel dato di CO₂.",
        tip: "La regola più efficace non è rinunciare agli acquisti, ma la durata d’uso: indossato il doppio del tempo significa metà impronta al giorno.",
        scopeNote:
          "Conta solo sull’impatto climatico rilevato. Acqua virtuale ed energia di produzione restano fuori da questi confini di bilancio.",
        adjust: {
          label: "Capi nuovi all’anno",
          unit: "pezzi",
          hint: "Conta tutto: magliette, pantaloni, scarpe, giacche, biancheria."
        },
        options: {
          "textiles-fast": { label: "Soprattutto nuovo, spesso moda a basso prezzo" },
          "textiles-mixed": { label: "Un misto di nuovo e usato" },
          "textiles-slow": { label: "Soprattutto usato, fibre biologiche o riparato" }
        }
      },
      "bedroom-standby": {
        title: "Quanti apparecchi restano sempre collegati alla rete?",
        sceneLabel: "Comò e lampade",
        description:
          "Router, caricabatterie, televisore, macchina del caffè, console: ognuno assorbe in standby da uno a cinque watt. Giorno e notte, tutto l’anno.",
        impactText:
          "In molte case lo standby vale quasi un decimo del consumo elettrico — per apparecchi che intanto non fanno nulla.",
        tip: "Il router non è tra questi: spegnerlo di notte fa risparmiare poco e disturba gli aggiornamenti. Conviene di più l’angolo TV, gli elettrodomestici da cucina e le stazioni di ricarica.",
        scopeNote:
          "Il consumo è già compreso nella tua elettricità domestica e qui non viene sommato una seconda volta. La risposta agisce solo sul profilo qualitativo.",
        adjust: { label: "Apparecchi sempre accesi", unit: "pezzi" },
        options: {
          "standby-all": { label: "Tutto resta collegato" },
          "standby-partial": { label: "Qualcosa viene spento" },
          "standby-off": { label: "Uso ciabatte con interruttore" }
        }
      }
    }
  },
  bath: {
    title: "Bagno",
    shortTitle: "Bagno",
    description: "Ottimizzare il consumo di acqua ed energia per doccia, bagno e lavarsi le mani.",
    completion: "Hai esplorato come il consumo d’acqua e i prodotti di ogni giorno sono legati alle acque e alle risorse naturali.",
    questions: {
      "bath-shower": {
        title: "Come fai la doccia?",
        sceneLabel: "Doccia e vasca",
        description:
          "Dopo il riscaldamento, l’acqua calda è la voce energetica più grande della casa. Contano due grandezze: quanto dura la doccia e quanta acqua lascia passare il soffione.",
        impactText:
          "Un soffione a risparmio dimezza la portata senza che la doccia sembri più debole. Insieme a qualche minuto in meno fa risparmiare diverse migliaia di litri d’acqua potabile e alcune centinaia di chilowattora all’anno.",
        tip: "Misuralo una volta: tieni il soffione in un secchio da 10 litri. Se si riempie in meno di 50 secondi, conviene un soffione a risparmio.",
        adjust: {
          label: "Per quante canzoni dura la tua doccia?",
          unit: "canzoni",
          hint: "Una canzone dura circa tre minuti. Si calcola una doccia al giorno; un bagno in vasca vale tre o quattro canzoni.",
          baseUnit: "min"
        },
        options: {
          "bath-long": { label: "Docce lunghe o spesso il bagno in vasca" },
          "bath-normal": { label: "Doccia normale, soffione standard" },
          "bath-eco": { label: "Doccia breve con soffione a risparmio" }
        }
      },
      "bath-water-heating": {
        title: "Come viene scaldata la tua acqua calda?",
        sceneLabel: "Lavabo",
        description:
          "Questa risposta decide anche quanto costa ogni doccia: la stessa quantità d’acqua calda causa emissioni molto diverse a seconda del sistema. Il valore qui conta l’acqua calda fuori dalla doccia — lavarsi le mani, lavare i piatti, pulire.",
        impactText:
          "Una pompa di calore ricava da un chilowattora di elettricità il triplo di calore. Il solare termico d’estate copre quasi tutto il fabbisogno senza bruciare combustibile.",
        tip: "Non abbassare mai la temperatura in modo generico: con accumuli centralizzati e ricircolo valgono di norma, contro la legionella, almeno 60 °C nell’accumulo e 55 °C nell’impianto. Chiedi a un installatore o al gestore.",
        options: {
          "electric-boiler": { label: "Boiler elettrico o scaldabagno istantaneo" },
          "gas-boiler": { label: "Caldaia a gas" },
          "oil-boiler": { label: "Caldaia a gasolio" },
          "heat-pump": { label: "Pompa di calore per acqua calda" },
          "solar-district": { label: "Solare termico o teleriscaldamento a basse emissioni" },
          "hot-water-average": {
            label: "Non lo so",
            regionalAverage: {
              basis:
                "Vettori energetici per l’acqua calda in Alto Adige: 44 % metano, 26 % biomassa, 10 % gasolio, 5 % GPL, 10 % elettricità, 5 % energia solare.",
              source: ASTAT_ENERGY
            }
          }
        }
      },
      "bath-toilet": {
        title: "Quanta acqua usa lo sciacquone?",
        sceneLabel: "WC",
        description:
          "Dopo la doccia, lo sciacquone è la seconda voce d’acqua della casa. Le cassette più vecchie scaricano nove litri, quelle moderne a doppio tasto bastano tre o quattro.",
        impactText:
          "L’acqua potabile viene captata, trattata e distribuita con grande dispendio e poi, come acqua di scarico, depurata un’altra volta. Ogni litro risparmiato alleggerisce entrambi i lati di questa catena.",
        tip: "Niente doppio tasto? Un kit con tasto stop costa poco e di solito si monta senza idraulico.",
        adjust: { label: "Scarichi al giorno", unit: "×" },
        options: {
          "flush-full": { label: "Cassetta vecchia, sempre scarico pieno" },
          "flush-mixed": { label: "Tasto risparmio presente, usato ogni tanto" },
          "flush-saving": { label: "Doppio tasto, usato sempre" }
        }
      }
    }
  },
  living: {
    title: "Soggiorno",
    shortTitle: "Soggiorno",
    description: "Elettricità domestica, illuminazione, viaggi lunghi e un uso consapevole degli apparecchi in soggiorno.",
    completion: "Hai esplorato come energia, apparecchi e viaggi lunghi sono legati alla biodiversità.",
    questions: {
      "living-tv-streaming": {
        title: "Quanta elettricità domestica ti spetta in un anno?",
        sceneLabel: "TV e mobile",
        description:
          "Il consumo annuo della bolletta comprende frigorifero, cucina, lavatrice, lavastoviglie, illuminazione, elettronica e altri apparecchi. Per questo è più affidabile di singole stime per apparecchio.",
        impactText:
          "Si calcola la tua quota del prelievo misurato dalla rete con il fattore di produzione elettrica italiano. Un contratto di energia verde o un impianto fotovoltaico proprio non vengono accreditati individualmente in questo calcolo semplificato location-based.",
        tip: "Prendi il consumo dell’ultima bolletta annuale e dividilo per il numero di persone. Togli l’elettricità di una pompa di calore indicata a parte.",
        adjust: {
          label: "Elettricità domestica per persona all’anno",
          unit: "kWh",
          hint: "Tutti gli elettrodomestici insieme; togli l’elettricità della pompa di calore se è già nel riscaldamento."
        },
        options: {
          "electricity-high": { label: "Consumo alto" },
          "electricity-medium": { label: "Consumo medio" },
          "electricity-low": { label: "Consumo basso" },
          "electricity-average": {
            label: "Non lo so",
            regionalAverage: {
              basis:
                "Nel 2024 le famiglie della provincia di Bolzano hanno consumato in tutto 510,7 GWh di elettricità; con 539.679 abitanti sono circa 950 kWh a persona.",
              source: TERNA_ASTAT_ELECTRICITY
            }
          }
        }
      },
      "living-lighting": {
        title: "Con cosa illumini la tua casa?",
        sceneLabel: "Lampada e luce a soffitto",
        description:
          "Un LED produce la stessa luminosità di una lampadina a incandescenza con circa un ottavo della potenza. Con una lampada alogena la differenza è un po’ minore, ma resta grande.",
        impactText:
          "Si calcola con tre ore di accensione al giorno per tutti i punti luce. La differenza tra una casa con alogene e una tutta a LED è di diverse centinaia di chilowattora all’anno.",
        tip: "I LED bianco caldo a 2700 kelvin danno la stessa luce accogliente di una lampadina a incandescenza. L’effetto freddo dei LED, spesso lamentato, dipende dalla temperatura di colore sbagliata, non dalla tecnica.",
        scopeNote:
          "Il consumo dell’illuminazione è già compreso nell’elettricità domestica indicata. La risposta non viene sommata e agisce solo sul profilo qualitativo.",
        adjust: { label: "Punti luce in casa", unit: "pezzi" },
        options: {
          "light-old": { label: "Soprattutto alogene e a incandescenza" },
          "light-mixed": { label: "Misto, in parte già LED" },
          "light-led": { label: "Tutto LED" },
          "light-average": {
            label: "Non lo so",
            regionalAverage: {
              basis:
                "Nelle case altoatesine il 28 % delle lampade sono ancora lampadine tradizionali a incandescenza e il 72 % lampade a risparmio energetico.",
              source: ASTAT_ENERGY
            }
          }
        }
      },
      "living-plants": {
        title: "Che ruolo hanno le piante in casa?",
        sceneLabel: "Piante e divano",
        description:
          "Le piante d’appartamento possono favorire la qualità dello stare e il legame con la natura. Un contributo affidabile alla biodiversità locale non se ne può dedurre.",
        impactText:
          "Questa domanda non viene usata come misura di biodiversità. Per le specie selvatiche contano spazi esterni, piante autoctone e strutture non illuminate.",
        tip: "Specie robuste come il clorofito o la sansevieria chiedono poca acqua e perdonano cure irregolari.",
        scopeNote:
          "Non conta né sui valori misurati né sull’indice di biodiversità; serve solo come domanda di riflessione.",
        options: {
          "no-plants": { label: "Nessuna pianta nella stanza" },
          "some-plants": { label: "Qualche pianta d’appartamento" },
          "green-oasis": { label: "Molto verde e materiali naturali" }
        }
      },
      "mobility-long": {
        title: "Con cosa viaggi sulle lunghe distanze?",
        sceneLabel: "Mappamondo e viaggi",
        description:
          "Un solo volo può pesare più di un intero anno di mobilità quotidiana. Per questo qui è un’opzione a sé e non finisce in una categoria generica.",
        impactText:
          "Si calcola per passeggero-chilometro: treno circa 0,035 kg di CO₂e, auto con due persone circa 0,15 kg, aereo come valore d’impatto CO₂e forfettario circa 0,25 kg, compreso un supplemento per gli effetti in alta quota.",
        tip: "Un treno notturno sostituisce insieme un pernottamento e un volo. Sulle tratte fino a circa 1.000 chilometri il treno, da porta a porta, spesso non è nemmeno più lento.",
        adjust: {
          label: "Chilometri di viaggio all’anno",
          unit: "km",
          hint: "Andata e ritorno insieme. Da Bolzano a Roma e ritorno sono circa 1.400 km."
        },
        options: {
          "long-car": { label: "Per lo più in auto" },
          "long-transit": { label: "Per lo più in treno o pullman" },
          "long-flight": { label: "Regolarmente in aereo" }
        }
      }
    }
  },
  kitchen: {
    title: "Cucina",
    shortTitle: "Cucina",
    description: "Quello che finisce nel piatto collega uso del suolo, clima e risorse.",
    completion: "Hai esplorato come alimentazione, provenienza e scarti influiscono su superfici e habitat.",
    questions: {
      "kitchen-diet": {
        title: "Quanto spesso c’è carne nel piatto?",
        sceneLabel: "Frigorifero",
        description:
          "Dopo abitare e mobilità, l’alimentazione è la terza voce — e l’unica su cui si decide di nuovo più volte al giorno.",
        impactText:
          "Si calcola con una base di circa 950 kg di CO₂e per un’alimentazione prevalentemente vegetale e un supplemento di circa 105 kg per ogni pasto di carne in più alla settimana. Il manzo pesa molto più del pollame.",
        tip: "Il salto più grande è tra ogni giorno e più volte alla settimana. Due giorni fissi senza carne valgono più di qualsiasi rinuncia agli imballaggi.",
        scopeNote:
          "Conta solo sulla CO₂. L’acqua dietro l’alimentazione è acqua virtuale delle regioni di coltivazione e resta fuori dal confine di bilancio.",
        adjust: {
          label: "Pasti con carne a settimana",
          unit: "× a settimana"
        },
        options: {
          "diet-meat": { label: "Carne quasi ogni giorno" },
          "diet-mixed": { label: "Carne più volte alla settimana" },
          "diet-plant": { label: "Prevalentemente vegetale" }
        }
      },
      "kitchen-origin": {
        title: "Quanto è locale e di stagione?",
        sceneLabel: "Alimenti e provenienza",
        description:
          "La distanza da sola dice poco. Conta la combinazione: merce arrivata in aereo e serre riscaldate pesano molto più di un trasporto su camion dal Paese vicino.",
        impactText:
          "Il supplemento pieno per merce importata e fuori stagione è di circa 400 kg di CO₂e all’anno. Chi compra soprattutto locale e di stagione lo riduce a un sesto.",
        tip: "Un calendario delle stagioni sulla porta del frigorifero funziona meglio di qualsiasi regola sulla provenienza — il problema sono i pomodori a gennaio, non i pomodori in sé.",
        scopeNote: "Conta solo sulla CO₂, come tutte le domande sull’alimentazione.",
        adjust: { label: "Quota locale e di stagione", unit: "%" },
        options: {
          "origin-imported": { label: "Soprattutto importato, indipendentemente dalla stagione" },
          "origin-partial": { label: "In parte locale" },
          "origin-seasonal": { label: "Soprattutto locale e di stagione" }
        }
      },
      "kitchen-waste": {
        title: "Quanto cibo finisce nella spazzatura?",
        sceneLabel: "Tavolo e scorte",
        description:
          "Il cibo buttato è la voce più costosa in assoluto: coltivazione, trasporto, refrigerazione e lavorazione sono già avvenuti, il beneficio viene meno.",
        impactText:
          "Ogni chilo di cibo buttato porta con sé in media circa 2,5 kg di CO₂e. Nelle famiglie italiane finiscono nella spazzatura circa 65 kg a persona all’anno.",
        tip: "Una scatola per gli avanzi ben visibile, all’altezza degli occhi nel frigorifero, funziona meglio di qualsiasi lista della spesa.",
        scopeNote: "Conta solo sulla CO₂, come tutte le domande sull’alimentazione.",
        adjust: {
          label: "Quante porzioni finiscono nella spazzatura a settimana?",
          unit: "porzioni",
          hint: "Una porzione è un piatto di cibo, circa 400 g — o mezza pagnotta.",
          baseUnit: "kg"
        },
        options: {
          "waste-often": { label: "Regolarmente, spesso cibo andato a male" },
          "waste-sometimes": { label: "Qualche avanzo ogni tanto" },
          "waste-planned": { label: "Quasi nulla, buona pianificazione e riuso degli avanzi" }
        }
      }
    }
  },
  mobility: {
    title: "Mobilità",
    shortTitle: "Mobilità",
    description: "Gli spostamenti quotidiani influenzano emissioni, consumo di suolo e qualità del nostro habitat.",
    completion: "Hai esplorato come i nostri spostamenti influiscono su energia, suolo e qualità degli habitat locali.",
    questions: {
      "mobility-short": {
        title: "Come fai i tragitti brevi sotto i cinque chilometri?",
        sceneLabel: "Scegliere il tragitto breve",
        description:
          "Nei primi chilometri il motore è freddo. Il consumo è allora ben sopra il valore di omologazione e il catalizzatore non lavora ancora bene.",
        impactText:
          "I tragitti brevi sono l’ambito con più margine: meta e tempo cambiano poco, l’impronta scende a un cinquantesimo.",
        tip: "La decisione si prende sulla porta di casa. Se casco, chiavi e giacca antipioggia stanno vicino alla bici e l’auto è parcheggiata due strade più in là, la scelta cambia da sola.",
        adjust: {
          label: "Chilometri brevi a settimana",
          unit: "km",
          hint: "Spesa, scuola, lavoro, visite — tutto sotto i cinque chilometri."
        },
        options: {
          car: { label: "Quasi sempre in auto" },
          mixed: { label: "Misto, a seconda di tempo e orari" },
          active: { label: "Quasi sempre a piedi, in bici o e-bike" },
          "short-average": {
            label: "Non lo so",
            regionalAverage: {
              basis:
                "In Alto Adige il 21 % dei tragitti fino a 2 km si fa in auto o moto, il 60 % di quelli da 2 a 10 km. Le quote di tragitti sono usate come quote di chilometri; i chilometri settimanali restano quelli predefiniti del calcolatore.",
              source: ASTAT_MOBILITY
            }
          }
        }
      },
      "mobility-km": {
        title: "Quanti chilometri in auto fai per il resto in un anno?",
        sceneLabel: "Guardare i tragitti dell’anno",
        description:
          "Tutto tranne i tragitti brevi di prima: pendolarismo, gite, commissioni. Uno sguardo al contachilometri dell’anno scorso è più preciso di qualsiasi stima.",
        impactText:
          "Per la maggior parte delle persone è la voce singola più grande di tutto il bilancio. Un’auto elettrica la riduce, con il mix elettrico italiano, a circa un quarto; risparmiare chilometri agisce in più.",
        tip: "Prima della domanda sul motore viene quella sull’occupazione: due persone in auto dimezzano subito il valore a testa.",
        adjust: {
          label: "Chilometri in auto all’anno",
          unit: "km",
          hint: "Come conducente o passeggero, diviso per il numero di persone a bordo."
        },
        options: {
          "car-combustion": { label: "Benzina o diesel" },
          "car-efficient": { label: "Utilitaria o ibrida" },
          "car-electric": { label: "Auto elettrica" },
          "car-none": { label: "Nessuna auto in famiglia" }
        }
      }
    }
  },
  garden: {
    title: "Giardino",
    shortTitle: "Giardino",
    description: "Un giardino vivo nasce da cibo, luoghi di nidificazione e strutture varie.",
    completion: "Hai esplorato come suolo, piante e strutture creano direttamente nuovi habitat.",
    questions: {
      "garden-ground": {
        title: "Com’è sistemata la superficie intorno alla casa?",
        sceneLabel: "Sistemare il suolo",
        description:
          "Qui il bilancio mostra una tensione che va sopportata: la ghiaia non ha bisogno di acqua e nel consumo d’acqua risulta la migliore — per la biodiversità è la peggiore di tutte le possibilità.",
        impactText:
          "Nelle estati secche dell’Alto Adige un prato richiede circa 150 litri per metro quadrato all’anno, un’aiuola naturale con specie adatte circa un quinto. Un suolo aperto e permeabile trattiene la pioggia invece di mandarla in fognatura.",
        tip: "Inizia a desigillare piccole superfici. Già una striscia di terreno soleggiata e senza vegetazione è preziosa per le api selvatiche che nidificano nel suolo.",
        adjust: {
          label: "Superficie irrigata",
          unit: "m²",
          hint: "Solo la superficie che annaffi davvero. Un posto auto misura circa 12 m²."
        },
        options: {
          gravel: { label: "Soprattutto ghiaia, pavimentazione o pietrisco" },
          lawn: { label: "Prato curato" },
          "natural-bed": { label: "Aiuola naturale con terreno aperto" }
        }
      },
      "garden-plants": {
        title: "Quali piante crescono qui?",
        sceneLabel: "Scegliere le piante",
        description:
          "Fioriture lungo tutte le stagioni garantiscono cibo affidabile. Non conta la quantità, ma il vuoto di fine estate.",
        impactText:
          "Le piante da fiore autoctone sono adatte agli insetti locali; molte specie di api selvatiche non sanno che farsene dei fiori ornamentali doppi. Su CO₂, acqua ed energia questa scelta non ha effetti misurabili — sulla biodiversità davanti a casa sì.",
        tip: "Bastano da tre a cinque specie autoctone con fioriture scalate. Lascia in piedi le infiorescenze secche durante l’inverno: sono cibo e rifugio insieme.",
        scopeNote: "Non conta su nessuno dei tre indicatori. L’effetto riguarda la biodiversità.",
        options: {
          few: { label: "Quasi nessuna pianta" },
          ornamental: { label: "Soprattutto piante ornamentali" },
          native: { label: "Piante da fiore autoctone con fioriture scalate" }
        }
      },
      "garden-structures": {
        title: "Quali habitat aggiungi?",
        sceneLabel: "Aggiungere habitat",
        description:
          "Un hotel per insetti aiuta solo una piccola parte delle specie, e solo in un ambiente adatto. La maggior parte delle api selvatiche nidifica nel suolo, non nei fori.",
        impactText:
          "Cibo, strutture per nidificare, terreno aperto e varietà di strutture agiscono insieme. Legno morto e un punto d’acqua poco profondo sostengono molti più gruppi di specie di un solo hotel per insetti.",
        tip: "Spegni l’illuminazione notturna permanente in giardino — attira gli insetti notturni dai dintorni e costa loro la notte.",
        scopeNote: "Non conta su nessuno dei tre indicatori. L’effetto riguarda la biodiversità.",
        options: {
          none: { label: "Nessuna struttura aggiuntiva" },
          hotel: { label: "Solo un hotel per insetti" },
          diverse: { label: "Terreno aperto, legno morto e un punto d’acqua" }
        }
      }
    }
  }
};

const en: Record<RoomId, RoomText> = {
  bedroom: {
    title: "Bedroom & textiles",
    shortTitle: "Bedroom",
    description: "Explore room temperature, wardrobe and standby devices in the bedroom.",
    completion: "You explored how heat, textiles and electronics affect resources and habitats.",
    questions: {
      "bedroom-heating": {
        title: "How do you heat, and how much do you use in a year?",
        sceneLabel: "Bed & room climate",
        description:
          "Space heating is usually the largest energy item in a household. The actual figure on your bill reflects the building, floor area, weather and heating habits better than a flat estimate.",
        impactText:
          "Your share of the annual consumption is rated with the factor of your heating system. For a heat pump this means the electricity bought; for gas, oil or district heating, the energy delivered.",
        tip: "Use your last annual bill if you can, and divide shared consumption by the number of people in the household.",
        adjust: {
          label: "Your share of annual consumption",
          unit: "kWh",
          hint: "For a heat pump only its electricity; split shared consumption per person."
        },
        options: {
          "heat-oil": { label: "Heating oil" },
          "heat-gas": { label: "Natural gas" },
          "heat-district": { label: "District heating or biomass" },
          "heat-pump": { label: "Heat pump" },
          "heat-unknown": {
            label: "Don’t know or other",
            regionalAverage: {
              basis:
                "Energy sources of main heating in South Tyrol: 47 % natural gas, 33 % biomass, 10 % heating oil, 5 % LPG, 4 % electricity. The amount stays at the calculator’s default.",
              source: ASTAT_ENERGY
            }
          }
        }
      },
      "bedroom-textiles": {
        title: "How many items of clothing do you add in a year?",
        sceneLabel: "Wardrobe",
        description:
          "A new garment carries its whole backpack with it: growing the fibre, dyeing, sewing, transport. With second-hand, almost all of that falls away.",
        impactText:
          "Behind one cotton T-shirt are around 2,700 litres of water — but where the cotton grows. This virtual water is therefore deliberately left out of the water meter; it sits in the CO₂ figure.",
        tip: "The most effective rule isn’t buying less, it’s wearing longer: worn twice as long means half the footprint per day.",
        scopeNote:
          "Counts only towards the recorded climate impact. Virtual water and production energy lie outside these boundaries.",
        adjust: {
          label: "New items of clothing per year",
          unit: "items",
          hint: "Count everything: shirts, trousers, shoes, jackets, underwear."
        },
        options: {
          "textiles-fast": { label: "Mostly new, often cheap fashion" },
          "textiles-mixed": { label: "A mix of new and second-hand" },
          "textiles-slow": { label: "Mostly second-hand, organic fibres or repaired" }
        }
      },
      "bedroom-standby": {
        title: "How many devices stay plugged in all the time?",
        sceneLabel: "Chest of drawers & lamps",
        description:
          "Router, chargers, TV, coffee machine, games console: each draws one to five watts on standby. Around the clock, all year.",
        impactText:
          "In many households standby accounts for almost a tenth of electricity use — for devices doing nothing at all.",
        tip: "The router isn’t one of them: switching it off at night saves little and gets in the way of updates. The TV corner, kitchen appliances and charging stations are more worthwhile.",
        scopeNote:
          "This consumption is already part of your household electricity and isn’t added a second time here. The answer only affects the qualitative profile.",
        adjust: { label: "Devices always on", unit: "items" },
        options: {
          "standby-all": { label: "Everything stays plugged in" },
          "standby-partial": { label: "Some things get switched off" },
          "standby-off": { label: "Switchable power strips in use" }
        }
      }
    }
  },
  bath: {
    title: "Bathroom",
    shortTitle: "Bathroom",
    description: "Reduce water and energy use for showering, bathing and washing hands.",
    completion: "You explored how water use and everyday products connect to waters and natural resources.",
    questions: {
      "bath-shower": {
        title: "How do you shower?",
        sceneLabel: "Shower & bathtub",
        description:
          "After heating, hot water is the largest energy item in a household. Two things decide it: how long you shower and how much water the shower head lets through.",
        impactText:
          "A water-saving shower head halves the flow without the shower feeling weaker. Together with a few minutes less, that saves several thousand litres of drinking water and a few hundred kilowatt-hours a year.",
        tip: "Measure it once: hold the shower head into a 10-litre bucket. If it fills in under 50 seconds, a water-saving head is worth it.",
        adjust: {
          label: "How many songs does your shower last?",
          unit: "songs",
          hint: "A song lasts about three minutes. Counted with one shower a day; a full bath counts as three to four songs.",
          baseUnit: "min"
        },
        options: {
          "bath-long": { label: "Long showers or regular baths" },
          "bath-normal": { label: "Normal shower, standard shower head" },
          "bath-eco": { label: "Short shower with water-saving head" }
        }
      },
      "bath-water-heating": {
        title: "How is your hot water heated?",
        sceneLabel: "Washbasin",
        description:
          "This answer also decides what every shower costs: the same amount of hot water causes very different emissions depending on the system. The figure here counts hot water outside the shower — washing hands, washing up, cleaning.",
        impactText:
          "A heat pump gets three times as much heat out of one kilowatt-hour of electricity. Solar thermal covers almost all demand in summer without burning any fuel.",
        tip: "Never turn temperatures down across the board: with central storage tanks and circulation, protection against legionella usually requires at least 60 °C in the tank and 55 °C in the system. Ask an installer or operator.",
        options: {
          "electric-boiler": { label: "Electric boiler or instantaneous heater" },
          "gas-boiler": { label: "Gas boiler" },
          "oil-boiler": { label: "Oil boiler" },
          "heat-pump": { label: "Hot-water heat pump" },
          "solar-district": { label: "Solar thermal or low-emission district heating" },
          "hot-water-average": {
            label: "Don’t know",
            regionalAverage: {
              basis:
                "Energy sources for hot water in South Tyrol: 44 % natural gas, 26 % biomass, 10 % heating oil, 5 % LPG, 10 % electricity, 5 % solar energy.",
              source: ASTAT_ENERGY
            }
          }
        }
      },
      "bath-toilet": {
        title: "How much water does your toilet flush use?",
        sceneLabel: "Toilet",
        description:
          "After the shower, flushing is the second largest water item in a household. Older cisterns release nine litres; modern dual-flush systems manage with three to four.",
        impactText:
          "Drinking water is extracted, treated and distributed at great effort, then cleaned once more as waste water. Every litre saved eases both ends of that chain.",
        tip: "No dual flush? A flush-stop retrofit kit costs little and can usually be fitted without a plumber.",
        adjust: { label: "Flushes per day", unit: "×" },
        options: {
          "flush-full": { label: "Older cistern, always a full flush" },
          "flush-mixed": { label: "Saving button there, used now and then" },
          "flush-saving": { label: "Dual flush, used consistently" }
        }
      }
    }
  },
  living: {
    title: "Living room",
    shortTitle: "Living",
    description: "Household electricity, lighting, long-distance travel and mindful use of devices in the living area.",
    completion: "You explored how energy, devices and long-distance travel connect to biodiversity.",
    questions: {
      "living-tv-streaming": {
        title: "How much household electricity is yours in a year?",
        sceneLabel: "TV & TV unit",
        description:
          "The annual consumption on your electricity bill covers fridges, cooking, washing, dishwashing, lighting, entertainment electronics and other devices. That makes it more reliable than estimates for single devices.",
        impactText:
          "Your share of the metered grid electricity is calculated with the Italian generation factor. A green electricity tariff or your own solar panels aren’t credited individually in this simplified location-based calculation.",
        tip: "Take the consumption from your last annual bill and divide it by the number of people. Please subtract electricity for a separately listed heat pump.",
        adjust: {
          label: "Household electricity per person per year",
          unit: "kWh",
          hint: "All household appliances together; subtract heat-pump electricity if it’s already under heating."
        },
        options: {
          "electricity-high": { label: "High consumption" },
          "electricity-medium": { label: "Medium consumption" },
          "electricity-low": { label: "Low consumption" },
          "electricity-average": {
            label: "Don’t know",
            regionalAverage: {
              basis:
                "In 2024, households in the province of Bolzano used 510.7 GWh of electricity in total; with 539,679 residents that is about 950 kWh per person.",
              source: TERNA_ASTAT_ELECTRICITY
            }
          }
        }
      },
      "living-lighting": {
        title: "What do you light your home with?",
        sceneLabel: "Floor lamp & ceiling light",
        description:
          "An LED gives the same brightness as an incandescent bulb with about an eighth of the power. With a halogen lamp the difference is somewhat smaller, but still large.",
        impactText:
          "The calculation assumes three hours of use a day across all light points. The difference between a household with halogen and one fully on LED is several hundred kilowatt-hours a year.",
        tip: "Warm-white LEDs at 2700 kelvin give the same cosy light as an incandescent bulb. The often criticised cold LED look comes from the wrong colour temperature, not the technology.",
        scopeNote:
          "The electricity for lighting is already part of the household electricity you entered. The answer isn’t added again and only affects the qualitative profile.",
        adjust: { label: "Light points in your home", unit: "items" },
        options: {
          "light-old": { label: "Mostly halogen and incandescent bulbs" },
          "light-mixed": { label: "Mixed, partly LED already" },
          "light-led": { label: "LED throughout" },
          "light-average": {
            label: "Don’t know",
            regionalAverage: {
              basis:
                "In South Tyrolean households, 28 % of lamps are still conventional incandescent bulbs and 72 % energy-saving lamps.",
              source: ASTAT_ENERGY
            }
          }
        }
      },
      "living-plants": {
        title: "What role do plants play in your living space?",
        sceneLabel: "House plants & sofa",
        description:
          "House plants can support well-being and a connection with nature. A reliable contribution to local biodiversity can’t be derived from them.",
        impactText:
          "This question isn’t used as a measure of biodiversity. For wild species, outdoor spaces, native plants and unlit structures are what matter.",
        tip: "Robust species like spider plant or snake plant need little water and forgive irregular care.",
        scopeNote:
          "Counts neither towards the measured values nor towards the biodiversity index; it’s a question for reflection only.",
        options: {
          "no-plants": { label: "No plants in the room" },
          "some-plants": { label: "A few house plants" },
          "green-oasis": { label: "Lots of green and natural materials" }
        }
      },
      "mobility-long": {
        title: "How do you travel long distances?",
        sceneLabel: "Globe & travel",
        description:
          "A single flight can weigh more than a whole year of everyday mobility. That’s why it has its own option here rather than sitting in a catch-all category.",
        impactText:
          "Calculated per passenger-kilometre: rail about 0.035 kg CO₂e, car with two people about 0.15 kg, plane as a flat CO₂e impact value of about 0.25 kg, including a surcharge for high-altitude effects.",
        tip: "A night train replaces a hotel night and a flight at once. On routes up to about 1,000 kilometres, rail is often not even slower door to door.",
        adjust: {
          label: "Long-distance kilometres per year",
          unit: "km",
          hint: "Outward and return together. Bolzano to Rome and back is about 1,400 km."
        },
        options: {
          "long-car": { label: "Mostly by car" },
          "long-transit": { label: "Mostly by train or coach" },
          "long-flight": { label: "Regularly by plane" }
        }
      }
    }
  },
  kitchen: {
    title: "Kitchen",
    shortTitle: "Kitchen",
    description: "What ends up on the plate connects land use, climate and resources.",
    completion: "You explored how diet, origin and waste affect land and habitats.",
    questions: {
      "kitchen-diet": {
        title: "How often is there meat on your plate?",
        sceneLabel: "Fridge",
        description:
          "After housing and mobility, diet is the third largest item — and the only one you decide afresh several times a day.",
        impactText:
          "The calculation uses a base of about 950 kg CO₂e for a mostly plant-based diet and about 105 kg extra for every weekly meat meal on top. Beef weighs far more than poultry.",
        tip: "The biggest jump is between daily and several times a week. Two fixed meat-free days achieve more than any packaging you avoid.",
        scopeNote:
          "Counts only towards CO₂. The water behind food is virtual water from the growing regions and lies outside the boundary.",
        adjust: {
          label: "Meat meals per week",
          unit: "× a week"
        },
        options: {
          "diet-meat": { label: "Meat almost every day" },
          "diet-mixed": { label: "Meat several times a week" },
          "diet-plant": { label: "Mostly plant-based" }
        }
      },
      "kitchen-origin": {
        title: "How much of it is local and seasonal?",
        sceneLabel: "Food & origin",
        description:
          "Distance alone says little. What matters is the combination: air-freighted goods and heated greenhouses weigh far more than a lorry from the neighbouring country.",
        impactText:
          "The full surcharge for imported and out-of-season goods is about 400 kg CO₂e a year. Buying mostly local and seasonal brings it down to a sixth.",
        tip: "A seasonal calendar on the fridge door works better than any rule about origin — tomatoes in January are the problem, not tomatoes as such.",
        scopeNote: "Counts only towards CO₂, like all questions on food.",
        adjust: { label: "Share local and seasonal", unit: "%" },
        options: {
          "origin-imported": { label: "Mostly imported, regardless of season" },
          "origin-partial": { label: "Partly local" },
          "origin-seasonal": { label: "Mostly local and seasonal" }
        }
      },
      "kitchen-waste": {
        title: "How much food ends up in the bin?",
        sceneLabel: "Dining table & supplies",
        description:
          "Wasted food is the most expensive item of all: growing, transport, cooling and processing have already happened, and the benefit is lost.",
        impactText:
          "Every kilogram of wasted food carries about 2.5 kg CO₂e on average. In Italian households about 65 kg per person end up in the bin each year.",
        tip: "A leftovers box at eye level in the fridge works more reliably than any shopping plan.",
        scopeNote: "Counts only towards CO₂, like all questions on food.",
        adjust: {
          label: "How many portions end up in the bin each week?",
          unit: "portions",
          hint: "A portion is a plate of food, about 400 g — or half a loaf of bread.",
          baseUnit: "kg"
        },
        options: {
          "waste-often": { label: "Regularly, often spoiled food" },
          "waste-sometimes": { label: "Occasional leftovers" },
          "waste-planned": { label: "Hardly anything, good planning and using up leftovers" }
        }
      }
    }
  },
  mobility: {
    title: "Mobility",
    shortTitle: "Mobility",
    description: "Everyday journeys shape emissions, land use and the quality of our habitat.",
    completion: "You explored how our journeys shape energy, land and the quality of local habitats.",
    questions: {
      "mobility-short": {
        title: "How do you make short trips under five kilometres?",
        sceneLabel: "Choose a short trip",
        description:
          "For the first few kilometres the engine is cold. Consumption is then well above the rated value and the catalytic converter isn’t working properly yet.",
        impactText:
          "Short trips are where there’s most room to move: destination and time barely change, the footprint drops to a fiftieth.",
        tip: "The decision is made at the front door. If helmet, keys and rain jacket sit by the bike and the car is parked two streets away, the choice tips by itself.",
        adjust: {
          label: "Short-trip kilometres per week",
          unit: "km",
          hint: "Shopping, school, work, visits — everything under five kilometres."
        },
        options: {
          car: { label: "Almost always by car" },
          mixed: { label: "Mixed, depending on weather and time" },
          active: { label: "Almost always on foot, by bike or e-bike" },
          "short-average": {
            label: "Don’t know",
            regionalAverage: {
              basis:
                "In South Tyrol, 21 % of trips up to 2 km are made by car or motorbike, and 60 % of trips from 2 to 10 km. Trip shares are used as kilometre shares; weekly kilometres stay at the calculator’s default.",
              source: ASTAT_MOBILITY
            }
          }
        }
      },
      "mobility-km": {
        title: "How many car kilometres add up otherwise in a year?",
        sceneLabel: "Look at the year’s trips",
        description:
          "Everything except the short trips above: commuting, outings, errands. A look at last year’s odometer is more accurate than any estimate.",
        impactText:
          "For most people this is the largest single item in the whole balance. An electric car cuts it to about a quarter with the Italian electricity mix; driving fewer kilometres works on top of that.",
        tip: "Before the question of the drive comes the question of occupancy: two people in the car halve the per-person value straight away.",
        adjust: {
          label: "Car kilometres per year",
          unit: "km",
          hint: "As driver or passenger, divided by the number of people travelling."
        },
        options: {
          "car-combustion": { label: "Petrol or diesel" },
          "car-efficient": { label: "Small car or hybrid" },
          "car-electric": { label: "Electric car" },
          "car-none": { label: "No car in the household" }
        }
      }
    }
  },
  garden: {
    title: "Garden",
    shortTitle: "Garden",
    description: "A living garden grows from food, nesting sites and varied structures.",
    completion: "You explored how soil, plants and structures create new habitats directly.",
    questions: {
      "garden-ground": {
        title: "How is the area around the house laid out?",
        sceneLabel: "Shape the ground",
        description:
          "Here the balance shows a tension you have to live with: gravel needs no watering and comes out best on water use — for biodiversity it is the worst of all options.",
        impactText:
          "In dry South Tyrolean summers a lawn needs about 150 litres per square metre a year; a natural bed with adapted species about a fifth of that. Open, permeable soil stores rainfall instead of sending it into the sewer.",
        tip: "Unseal small areas first. Even a sunny strip of bare soil is valuable for ground-nesting wild bees.",
        adjust: {
          label: "Watered area",
          unit: "m²",
          hint: "Only the area you actually water. A parking space is about 12 m²."
        },
        options: {
          gravel: { label: "Mostly gravel, paving or chippings" },
          lawn: { label: "Well-kept lawn" },
          "natural-bed": { label: "Natural bed with patches of open soil" }
        }
      },
      "garden-plants": {
        title: "Which plants grow here?",
        sceneLabel: "Choose plants",
        description:
          "Flowers across the seasons secure a reliable food supply. What matters isn’t quantity but the gap in late summer.",
        impactText:
          "Native flowering plants are matched to local insects; many wild bee species can do nothing at all with double ornamental flowers. This choice has no measurable effect on CO₂, water or energy — on the biodiversity outside your door it certainly does.",
        tip: "Three to five native species with staggered flowering are enough. Leave seed heads standing over winter: they’re food and shelter at once.",
        scopeNote: "Counts towards none of the three indicators. The effect lies with biodiversity.",
        options: {
          few: { label: "Hardly any plants" },
          ornamental: { label: "Mainly ornamental plants" },
          native: { label: "Native flowering plants with staggered flowering" }
        }
      },
      "garden-structures": {
        title: "Which habitats do you add?",
        sceneLabel: "Add habitats",
        description:
          "An insect hotel helps only a small share of species, and only in suitable surroundings. Most wild bees nest in the ground, not in drilled holes.",
        impactText:
          "Food, nesting structures, open soil and structural variety work together. Deadwood and a shallow water point support far more species groups than an insect hotel alone.",
        tip: "Switch off permanent night lighting in the garden — it draws nocturnal insects away from their surroundings and costs them the night.",
        scopeNote: "Counts towards none of the three indicators. The effect lies with biodiversity.",
        options: {
          none: { label: "No additional structures" },
          hotel: { label: "Just an insect hotel" },
          diverse: { label: "Open soil, deadwood and a water point" }
        }
      }
    }
  }
};

export const roomContent: Record<"it" | "en", Record<RoomId, RoomText>> = { it, en };
