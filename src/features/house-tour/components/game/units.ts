import type { Locale } from "@/config/site";
import { localeTags } from "@/lib/i18n";
import type { EverydayUnit } from "../../config/game-copy";
import type { TourUi } from "../../i18n/ui";
import { round2 } from "../../model/everyday";

/** Ein Wert in der Alltagsgröße, so gerundet, wie man ihn sich vorstellen kann. */
export function formatUnit(unit: EverydayUnit, value: number, t: TourUi, locale: Locale): { value: string; unit: string } {
  const whole = new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 0 });
  const tenth = new Intl.NumberFormat(localeTags[locale], { maximumFractionDigits: 1 });
  const rounded = round2(value);
  if (unit === "bathtubs") return { value: whole.format(rounded), unit: t.units.bathtubs(rounded) };
  if (unit === "carKm") return { value: whole.format(rounded), unit: t.units.carKm };
  if (value >= 1000) return { value: tenth.format(value / 1000), unit: t.units.co2T };
  return { value: whole.format(rounded), unit: t.units.co2Kg };
}
