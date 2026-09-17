import type { MetadataRoute } from "next";
import { locales } from "@/config/site";
import { projects } from "@/data/projects";
import { withBasePath } from "@/lib/public-path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://balance-suedtirol.it";

  const staticRoutes = [
    { route: "", priority: 1.0, changeFrequency: "weekly" as const },
    { route: "/was-ist-balance", priority: 0.9, changeFrequency: "monthly" as const },
    { route: "/projekte", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/biodiversitaet-in-suedtirol", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/co2-und-biodiversitaet", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/haus-tour", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/ueber-uns", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/methodik", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/projekt-einreichen", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/projekt-einreichen/formular", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/impressum", priority: 0.3, changeFrequency: "yearly" as const },
    { route: "/datenschutz", priority: 0.3, changeFrequency: "yearly" as const }
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { route, priority, changeFrequency } of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}${withBasePath(`/${locale}${route}`)}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((lang) => [lang, `${baseUrl}${withBasePath(`/${lang}${route}`)}`])
          )
        }
      });
    }
  }

  for (const project of projects) {
    const route = `/projekte/${project.slug}`;
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}${withBasePath(`/${locale}${route}`)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((lang) => [lang, `${baseUrl}${withBasePath(`/${lang}${route}`)}`])
          )
        }
      });
    }
  }

  return entries;
}
