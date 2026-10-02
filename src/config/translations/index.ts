import type { Widen } from "../../lib/i18n";
import type { Locale } from "../site";
import { commonCopy } from "./common";
import { footerCopy } from "./footer";
import { heroCopy } from "./hero";
import { houseCopy } from "./house";
import { featuredCopy } from "./featured";
import { newsCopy } from "./news";
import { achievementsCopy } from "./achievements";
import { partnersCopy } from "./partners";
import { whatIsCopy } from "./what-is";
import { aboutCopy } from "./about";
import { carbonStanceCopy } from "./carbon-stance";
import { projectsCopy } from "./projects";
import { methodologyCopy } from "./methodology";

function build<L extends Locale>(l: L) {
  return {
    ...commonCopy[l],
    footer: footerCopy[l],
    hero: heroCopy[l],
    house: houseCopy[l],
    featured: featuredCopy[l],
    news: newsCopy[l],
    achievements: achievementsCopy[l],
    ...partnersCopy[l],
    whatIs: whatIsCopy[l],
    about: aboutCopy[l],
    carbonStance: carbonStanceCopy[l],
    methodology: methodologyCopy[l],
    ...projectsCopy[l],
  };
}

const translations = { de: build("de"), it: build("it"), en: build("en") } as const;

/** Struktur der deutschen Texte; Italienisch und Englisch müssen sie exakt abbilden. */
export type Translations = Widen<(typeof translations)["de"]>;

const checkedTranslations: Record<Locale, Translations> = translations;

export function getTranslations(locale: Locale): Translations {
  return checkedTranslations[locale];
}
