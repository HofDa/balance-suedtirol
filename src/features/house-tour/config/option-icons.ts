/**
 * Ein Symbol je Antwort im Schritt „Art“. Es zeigt, was die Antwort *ist* —
 * Flamme für Gas, Zug für die Bahn —, nie, ob sie gut oder schlecht ist:
 * ein grünes Blatt neben der sparsamen Antwort würde genau die Wahl lenken,
 * die die Antworten ohne Zahlen vermeiden sollen. „Weiß ich nicht“ trägt
 * überall dasselbe Fragezeichen.
 *
 * Die Namen sind lucide-Symbole; `components/answer-input.tsx` setzt sie in
 * Komponenten um. Als Namen bleiben sie ohne Bildbibliothek prüfbar.
 */
export type OptionIcon =
  | "bath" | "ban" | "battery-charging" | "bike" | "brick-wall" | "car" | "car-front" | "circle-help"
  | "circle-off" | "cloud-sun" | "droplet" | "droplets" | "factory" | "fan" | "flame" | "flower"
  | "flower-2" | "fuel" | "hotel" | "lamp-ceiling" | "lamp-desk" | "leafy-green" | "lightbulb" | "snail"
  | "plane" | "plug-zap" | "power" | "recycle" | "shirt" | "shopping-bag" | "shower-head" | "sofa"
  | "sprout" | "square-split-horizontal" | "sun" | "timer" | "train-front" | "unplug" | "zap";

export const optionIcons: Record<string, Record<string, OptionIcon>> = {
  "bedroom-heating": {
    "heat-oil": "fuel",
    "heat-gas": "flame",
    "heat-district": "factory",
    "heat-pump": "fan",
    "heat-unknown": "circle-help"
  },
  "bedroom-textiles": {
    "textiles-fast": "shopping-bag",
    "textiles-mixed": "shirt",
    "textiles-slow": "recycle"
  },
  "bedroom-standby": {
    "standby-all": "plug-zap",
    "standby-partial": "power",
    "standby-off": "unplug"
  },
  "bath-shower": {
    "bath-long": "bath",
    "bath-normal": "shower-head",
    "bath-eco": "timer"
  },
  "bath-water-heating": {
    "electric-boiler": "zap",
    "gas-boiler": "flame",
    "oil-boiler": "fuel",
    "heat-pump": "fan",
    "solar-district": "sun",
    "hot-water-average": "circle-help"
  },
  "bath-toilet": {
    "flush-full": "droplets",
    "flush-mixed": "droplet",
    "flush-saving": "square-split-horizontal"
  },
  "living-lighting": {
    "light-old": "lightbulb",
    "light-mixed": "lamp-desk",
    "light-led": "lamp-ceiling",
    "light-average": "circle-help"
  },
  "living-plants": {
    "no-plants": "sofa",
    "some-plants": "sprout",
    "green-oasis": "leafy-green"
  },
  "mobility-long": {
    "long-car": "car",
    "long-transit": "train-front",
    "long-flight": "plane"
  },
  "mobility-short": {
    car: "car",
    mixed: "cloud-sun",
    active: "bike",
    "short-average": "circle-help"
  },
  "mobility-km": {
    "car-combustion": "fuel",
    "car-efficient": "car-front",
    "car-electric": "battery-charging",
    "car-none": "ban"
  },
  "garden-ground": {
    gravel: "brick-wall",
    lawn: "sprout",
    "natural-bed": "flower"
  },
  "garden-plants": {
    few: "circle-off",
    ornamental: "flower-2",
    native: "flower"
  },
  "garden-structures": {
    none: "circle-off",
    hotel: "hotel",
    diverse: "snail"
  }
};
