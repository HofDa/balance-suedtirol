import type { Locale } from "./site";

export const projectCategoryIds = [
  "cultural-landscapes",
  "forests",
  "waters",
  "wetlands",
  "meadows-dry-grasslands",
  "alpine-habitats",
  "settlement-areas"
] as const;

export type ProjectCategoryId = (typeof projectCategoryIds)[number];

const visuals: Record<ProjectCategoryId, { surface: string; marker: string }> = {
  "cultural-landscapes": {
    surface: "var(--category-cultural-surface)",
    marker: "var(--category-cultural-marker)"
  },
  forests: {
    surface: "var(--category-forest-surface)",
    marker: "var(--category-forest-marker)"
  },
  waters: {
    surface: "var(--category-water-surface)",
    marker: "var(--category-water-marker)"
  },
  wetlands: {
    surface: "var(--category-wetland-surface)",
    marker: "var(--category-wetland-marker)"
  },
  "meadows-dry-grasslands": {
    surface: "var(--category-meadow-surface)",
    marker: "var(--category-meadow-marker)"
  },
  "alpine-habitats": {
    surface: "var(--category-alpine-surface)",
    marker: "var(--category-alpine-marker)"
  },
  "settlement-areas": {
    surface: "var(--category-settlement-surface)",
    marker: "var(--category-settlement-marker)"
  }
};

const labels: Record<Locale, Record<ProjectCategoryId, string>> = {
  de: {
    "cultural-landscapes": "Kulturlandschaften",
    forests: "Wälder",
    waters: "Gewässer",
    wetlands: "Feuchtgebiete",
    "meadows-dry-grasslands": "Wiesen & Trockenrasen",
    "alpine-habitats": "Alpine Lebensräume",
    "settlement-areas": "Siedlungsräume"
  },
  it: {
    "cultural-landscapes": "Paesaggi culturali",
    forests: "Boschi",
    waters: "Acque",
    wetlands: "Zone umide",
    "meadows-dry-grasslands": "Prati e praterie aride",
    "alpine-habitats": "Habitat alpini",
    "settlement-areas": "Aree urbane"
  },
  en: {
    "cultural-landscapes": "Cultural landscapes",
    forests: "Forests",
    waters: "Waters",
    wetlands: "Wetlands",
    "meadows-dry-grasslands": "Meadows & dry grasslands",
    "alpine-habitats": "Alpine habitats",
    "settlement-areas": "Urban habitats"
  }
};

const allLabels: Record<Locale, string> = {
  de: "Alle",
  it: "Tutti",
  en: "All"
};

export function getProjectCategories(locale: Locale) {
  return projectCategoryIds.map((id) => ({ id, label: labels[locale][id] }));
}

export function getAllCategoriesLabel(locale: Locale) {
  return allLabels[locale];
}

export function getProjectCategoryVisual(id: ProjectCategoryId) {
  return visuals[id];
}

export function getProjectCategoryLabel(id: ProjectCategoryId, locale: Locale) {
  return labels[locale][id];
}
