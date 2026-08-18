# Bilanzfaktoren des Lebensraum-Checks

Alle Faktoren, die die Haus-Tour in Zahlen umrechnet, mit Annahme und Größenordnung.
Der Code dazu steht in `src/features/house-tour/model/calculator.ts`; jeder Wert
existiert dort genau einmal.

**Diese Werte sind eine belastbare erste Fassung, keine geprüfte Ökobilanz.**
Vor der Veröffentlichung sollte eine fachlich zuständige Person sie gegenlesen —
besonders die mit ⚠ markierten.

## Bezugsgröße

Pro Person und Jahr. Bei Posten, die sich ein Haushalt teilt (Raumwärme,
Warmwasser, Garten), sind die Werte bereits auf eine Person heruntergerechnet;
angenommen sind 2,3 Personen je Haushalt.

## Drei Bilanzgrenzen, bewusst unterschiedlich gezogen

| Kennzahl | Grenze | Begründung |
|---|---|---|
| **CO₂** (kg CO₂e) | Voller Fußabdruck einschließlich Vorkette | Nur so tauchen Ernährung und Textilien überhaupt auf, und genau das erwarten Nutzer von einem CO₂-Rechner. |
| **Wasser** (Liter) | Nur direktes Leitungswasser | Das virtuelle Wasser hinter Ernährung und Kleidung liegt bei rund 1,3 Mio. Litern im Jahr. Gegen 78.000 Liter Haushaltswasser gerechnet wäre jede Entscheidung im Bad optisch bedeutungslos. |
| **Energie** (kWh) | Endenergie, die die Person selbst verbraucht: Strom, Wärme, Kraftstoff | Graue Energie aus Produkten bleibt draußen — sie steckt bereits im CO₂-Wert und würde sonst doppelt zählen. |

Wo eine Grenze einen Wert ausschließt, bleibt er null, und die Frage trägt einen
`scopeNote`, der das im Panel erklärt. Eine Null ohne Erklärung liest sich wie
ein Fehler.

## Emissions- und Umrechnungsfaktoren

| Faktor | Wert | Annahme |
|---|---|---|
| Strommix Italien | 0,28 kg CO₂e/kWh | Produktionsmix, Größenordnung der letzten Jahre |
| Wärmemix Südtirol ⚠ | 0,19 kg CO₂e/kWh | Hoher Anteil Biomasse-Fernwärme; für andere Regionen zu niedrig |
| Erdgas | 0,24 kg CO₂e/kWh | Endenergie inkl. Vorkette |
| Heizöl | 0,31 kg CO₂e/kWh | Endenergie inkl. Vorkette |
| Warmwasser aufheizen | 0,0302 kWh/Liter | 4,186 kJ/(kg·K) × 26 K (12 °C → 38 °C) |
| Trinkwasser bereitstellen | 0,0005 kWh/Liter | Förderung, Aufbereitung, Verteilung |
| Raumwärmebedarf | 4.200 kWh/Person/a bei 20 °C | Südtiroler Bestand, gemischte Baualtersklassen |
| Temperaturregel | 6 % je Kelvin | Verbreitete Faustregel, gilt nur in engem Bereich |
| Standby | 8,76 kWh je Watt Dauerlast | 1 W × 8.760 h |
| Auto Verbrenner | 0,22 kg CO₂e/km · 0,66 kWh/km | Durchschnittsflotte, 6,8 l/100 km, Well-to-Wheel |
| Auto Kurzstrecke | 0,24 kg CO₂e/km | Aufschlag für Kaltstart |
| Elektroauto | 0,055 kg CO₂e/km · 0,19 kWh/km | 0,19 kWh/km im italienischen Strommix |
| Bahn / Fernbus | 0,035 kg CO₂e/pkm | |
| Flugzeug ⚠ | 0,25 kg CO₂e/pkm | **Nur CO₂.** Mit den Effekten in großer Höhe liegt die Klimawirkung etwa doppelt so hoch. Bewusst konservativ gesetzt, im Fragetext benannt. |
| Ernährung Sockel ⚠ | 950 kg CO₂e/a | Überwiegend pflanzliche Kost |
| Je Fleischmahlzeit/Woche ⚠ | 105 kg CO₂e/a | Mittelwert über Fleischarten; Rind liegt deutlich darüber, Geflügel darunter |
| Importaufschlag Lebensmittel ⚠ | bis 400 kg CO₂e/a | Transport, Kühlung, beheizte Gewächshäuser |
| Lebensmittelabfall | 2,5 kg CO₂e je kg | Volle Vorkette des weggeworfenen Produkts |
| Textilien ⚠ | 15 / 9 / 3 kg CO₂e je Stück | Neuware / gemischt / Secondhand, gemittelt über Kleidungsarten |
| Rasenbewässerung ⚠ | 150 L/m²/a | Trockener Südtiroler Sommer; naturnahes Beet 30 L/m²/a |

## Gekoppelte Größen

Zwei Fragen wirken nicht additiv, sondern multiplikativ. Der Rechner löst das,
indem `optionValues()` immer den gesamten Antwortstand kennt:

- **Duschen × Warmwassersystem**: die Duschfrage liefert Liter und Kilowattstunden,
  die Systemfrage den Emissionsfaktor. Ohne Antwort auf die Systemfrage gilt
  0,22 kg CO₂e/kWh als italienischer Mittelwert.
- Deshalb ändert sich die angezeigte CO₂-Zahl der Duschoptionen, sobald das
  Warmwassersystem beantwortet ist. Das ist gewollt und inhaltlich richtig.

## Vergleichswerte

Der Check erfasst nicht alles: keine Konsumgüter, keinen Wohnungsbau, keine
Waschmaschine, keinen Geschirrspüler. Gegen den vollen Durchschnitt zu
vergleichen ließe jeden Nutzer besser dastehen als er ist. Deshalb sind die
Referenzwerte auf den erfassten Ausschnitt zugeschnitten:

| Kennzahl | Referenz im Check | Voller Durchschnitt |
|---|---|---|
| CO₂ | 5.200 kg/a | ~7.000 kg/a (Konsum, Italien) |
| Wasser | 55.000 L/a | ~78.000 L/a (215 L/Tag) |
| Energie | 11.000 kWh/a | ~12.500 kWh/a inkl. Verkehr |

Als Zielmarke in der Ergebnisdarstellung dienen 1.500 kg CO₂e pro Person und Jahr.

## Plausibilitätsprüfung

Mit `npx tsx` lässt sich jede Option durchrechnen (siehe Verlauf in
`model/calculator.ts`). Zum Zeitpunkt der Erstellung ergaben sich:

| Szenario | CO₂ | Wasser | Energie |
|---|---|---|---|
| durchgehend ungünstigste Wahl | 8.955 kg | 67.130 L | 18.944 kWh |
| durchgehend mittlere Wahl | 5.118 kg | 52.850 L | 11.055 kWh |
| durchgehend beste Wahl | 3.977 kg | 26.278 L | 10.333 kWh |

Die mittlere Wahl trifft die Referenz gut. Auffällig: selbst die beste Wahl kommt
nicht unter rund 4 t CO₂ und 10.000 kWh, weil Raumwärme und Ernährungssockel
kaum wegzudrücken sind. Das ist inhaltlich korrekt und sollte in der
Ergebniskommunikation nicht als Versagen des Nutzers erscheinen.
