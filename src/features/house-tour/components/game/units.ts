import type { Locale } from "@/config/site";
import { localeTags } from "@/lib/i18n";
import type { GuessUnit } from "../../config/game-copy";
import type { TourUi } from "../../i18n/ui";
import { optionValues } from "../../model/calculator";
import { round2 } from "../../model/everyday";

/** Ein Wert in der Schätzgröße, so gerundet, wie man ihn schätzen kann. */
export function formatUnit(unit: GuessUnit, value: number, t: TourUi, locale: Locale): { value: string; unit: string } {
  const whole = new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 0 });
  const tenth = new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 1 });
  const rounded = round2(value);
  if (unit === "bathtubs") return { value: whole.format(rounded), unit: t.units.bathtubs(rounded) };
  if (unit === "carKm") return { value: whole.format(rounded), unit: t.units.carKm };
  if (value >= 1000) return { value: tenth.format(value / 1000), unit: t.units.co2T };
  return { value: whole.format(rounded), unit: t.units.co2Kg };
}

/**
 * Ein Anker, damit der Tipp keine reine Lotterie ist. Der CO₂-Anker kommt
 * aus dem Rechner selbst: eine normale Dusche mit zwei Songs am Tag.
 */
export function unitAnchor(unit: GuessUnit, t: TourUi, locale: Locale) {
  if (unit === "bathtubs") return t.units.anchors.bathtubs;
  if (unit === "carKm") return t.units.anchors.carKm;
  const shower = optionValues("bath-shower", "bath-normal", {}, {}).co2Kg;
  return t.units.anchors.co2(new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 0 }).format(round2(shower)));
}
