import type { Locale } from "@/config/site";
import type { EverydayUnit } from "../../config/game-copy";
import type { TourUi } from "../../i18n/ui";
import { co2Amount, formatters, round2 } from "../../model/everyday";

/** Ein Wert in der Alltagsgröße, so gerundet, wie man ihn sich vorstellen kann. */
export function formatUnit(unit: EverydayUnit, value: number, t: TourUi, locale: Locale): { value: string; unit: string } {
  const f = formatters(locale);
  const rounded = round2(value);
  if (unit === "bathtubs") return { value: f.whole.format(rounded), unit: t.units.bathtubs(rounded) };
  if (unit === "carKm") return { value: f.whole.format(rounded), unit: t.units.carKm };
  const co2 = co2Amount(value, f);
  return { value: co2.value, unit: co2.tonnes ? t.units.co2T : t.units.co2Kg };
}
