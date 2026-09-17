import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { projectCategoryIds } from "../src/config/project-categories";
import { locales, siteConfig } from "../src/config/site";
import { getTranslations } from "../src/config/translations";
import { completedProjects } from "../src/data/achievements";
import { getNewsItems, newsItems } from "../src/data/news";
import { getProjects, projects } from "../src/data/projects";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");

test("alle in projects.ts referenzierten Bilddateien existieren lokal in public/", () => {
  for (const project of projects) {
    // Hauptbild
    assert.ok(
      project.image.startsWith("/"),
      `Projekt ${project.slug}: Bildpfad '${project.image}' muss mit '/' beginnen`
    );
    const mainImagePath = path.join(PUBLIC_DIR, project.image);
    assert.ok(
      fs.existsSync(mainImagePath),
      `Projekt ${project.slug}: Hauptbild '${project.image}' existiert nicht in public/`
    );

    // Vorher/Nachher-Bilder
    if (project.beforeAfter) {
      const beforeRel = project.beforeAfter.before;
      const afterRel = project.beforeAfter.after;
      assert.ok(beforeRel.startsWith("/"), `Projekt ${project.slug}: before-Pfad '${beforeRel}' muss mit '/' beginnen`);
      assert.ok(afterRel.startsWith("/"), `Projekt ${project.slug}: after-Pfad '${afterRel}' muss mit '/' beginnen`);
      assert.ok(
        fs.existsSync(path.join(PUBLIC_DIR, beforeRel)),
        `Projekt ${project.slug}: before-Bild '${beforeRel}' existiert nicht in public/`
      );
      assert.ok(
        fs.existsSync(path.join(PUBLIC_DIR, afterRel)),
        `Projekt ${project.slug}: after-Bild '${afterRel}' existiert nicht in public/`
      );
    }

    // Galeriebilder
    if (project.gallery) {
      for (const [index, item] of project.gallery.entries()) {
        assert.ok(
          item.src.startsWith("/"),
          `Projekt ${project.slug}, Galerie [${index}]: Pfad '${item.src}' muss mit '/' beginnen`
        );
        assert.ok(
          fs.existsSync(path.join(PUBLIC_DIR, item.src)),
          `Projekt ${project.slug}, Galerie [${index}]: Bild '${item.src}' existiert nicht in public/`
        );
        assert.ok(
          item.alt && item.alt.trim().length > 0,
          `Projekt ${project.slug}, Galerie [${index}]: Alt-Text darf nicht leer sein`
        );
      }
    }
  }
});

test("alle Projekte haben vollständige, nicht-leere Übersetzungen in allen drei Sprachen", () => {
  for (const locale of locales) {
    const localized = getProjects(locale);
    assert.equal(
      localized.length,
      projects.length,
      `Anzahl der Projekte für Locale '${locale}' stimmt nicht mit Original überein`
    );

    for (const p of localized) {
      assert.ok(p.title && p.title.trim().length > 0, `Projekt ${p.slug} (${locale}): Titel fehlt oder ist leer`);
      assert.ok(p.summary && p.summary.trim().length > 0, `Projekt ${p.slug} (${locale}): summary fehlt`);
      assert.ok(p.description && p.description.trim().length > 0, `Projekt ${p.slug} (${locale}): description fehlt`);
      assert.ok(p.whyItMatters && p.whyItMatters.trim().length > 0, `Projekt ${p.slug} (${locale}): whyItMatters fehlt`);
      assert.ok(p.municipality && p.municipality.trim().length > 0, `Projekt ${p.slug} (${locale}): municipality fehlt`);
      assert.ok(p.organization && p.organization.trim().length > 0, `Projekt ${p.slug} (${locale}): organization fehlt`);
    }
  }
});

test("alle Projekt-Standorte liegen geografisch in Südtirol (Bounding Box)", () => {
  // Südtirol grobe Bounding Box: Lat ~ 46.2° bis 47.1° N, Lng ~ 10.4° bis 12.5° E
  const MIN_LAT = 46.2;
  const MAX_LAT = 47.1;
  const MIN_LNG = 10.4;
  const MAX_LNG = 12.5;

  for (const project of projects) {
    const { lat, lng } = project.location;
    assert.ok(
      lat >= MIN_LAT && lat <= MAX_LAT,
      `Projekt ${project.slug}: Breitengrad ${lat} liegt außerhalb Südtirols (${MIN_LAT}° - ${MAX_LAT}°)`
    );
    assert.ok(
      lng >= MIN_LNG && lng <= MAX_LNG,
      `Projekt ${project.slug}: Längengrad ${lng} liegt außerhalb Südtirols (${MIN_LNG}° - ${MAX_LNG}°)`
    );
  }
});

test("alle Projektkategorien sind im Kategoriensystem registriert", () => {
  for (const project of projects) {
    assert.ok(project.categoryIds.length > 0, `Projekt ${project.slug} muss mindestens eine Kategorie haben`);
    for (const catId of project.categoryIds) {
      assert.ok(
        (projectCategoryIds as readonly string[]).includes(catId),
        `Projekt ${project.slug}: Unbekannte Kategorie '${catId}'`
      );
    }
  }
});

test("Hauptnavigation und Übersetzungen sind in allen Sprachen synchron", () => {
  const navCount = siteConfig.navigation.length;
  for (const locale of locales) {
    const t = getTranslations(locale);
    assert.equal(
      t.nav.length,
      navCount,
      `Locale '${locale}': t.nav (${t.nav.length}) muss mit siteConfig.navigation (${navCount}) übereinstimmen`
    );
    for (const [index, label] of t.nav.entries()) {
      assert.ok(
        label && label.trim().length > 0,
        `Locale '${locale}': Navigationseintrag [${index}] darf nicht leer sein`
      );
    }
  }
});

// --- Ergänzungen: Sponsorenlogos, Slugs, Neuigkeiten, Übersetzungsschlüssel, Seiten ---

const otherLocales = locales.filter((locale) => locale !== "de");

test("Sponsorenlogos existieren in public/", () => {
  for (const project of projects) {
    const logos = [project.mainSponsor?.logo, ...(project.otherSponsors ?? []).map((sponsor) => sponsor.logo)];
    for (const logo of logos) {
      if (!logo) continue;
      assert.ok(fs.existsSync(path.join(PUBLIC_DIR, logo)), `Projekt ${project.slug}: Logo '${logo}' existiert nicht in public/`);
    }
  }
});

test("Projekt-Slugs sind eindeutig und kollidieren nicht mit abgeschlossenen Beispielprojekten", () => {
  const slugs = projects.map((project) => project.slug);
  assert.equal(new Set(slugs).size, slugs.length, "doppelter Projekt-Slug");
  for (const completed of completedProjects) {
    assert.ok(!slugs.includes(completed.slug), `${completed.slug}: Slug ist zugleich ein laufendes Projekt`);
  }
});

test("jede Neuigkeit ist in it und en übersetzt", () => {
  for (const locale of otherLocales) {
    const translated = getNewsItems(locale);
    for (const [index, item] of translated.entries()) {
      assert.notEqual(item.title, newsItems[index].title, `${item.slug}: Titel auf ${locale} noch deutsch`);
    }
  }
});

test("jedes Navigationsziel hat eine Seite unter src/app/[locale]", () => {
  for (const item of siteConfig.navigation) {
    const page = path.join(process.cwd(), "src", "app", "[locale]", item.href.replace(/^\//, ""), "page.tsx");
    assert.ok(fs.existsSync(page), `${item.href}: keine page.tsx gefunden`);
  }
});

test("Übersetzungen haben in allen Sprachen dieselben Schlüssel", () => {
  // Ein Schlüssel, der nur auf Deutsch existiert, fällt im Typecheck nicht auf,
  // weil `getTranslations` den Typ der deutschen Fassung zurückgibt.
  const shape = (value: unknown, prefix = ""): string[] => {
    if (Array.isArray(value)) return [`${prefix}[]`];
    if (value && typeof value === "object") {
      return Object.entries(value).flatMap(([key, child]) => shape(child, prefix ? `${prefix}.${key}` : key));
    }
    return [prefix];
  };
  const reference = shape(getTranslations("de")).sort();
  for (const locale of otherLocales) {
    const keys = shape(getTranslations(locale)).sort();
    const missing = reference.filter((key) => !keys.includes(key));
    const extra = keys.filter((key) => !reference.includes(key));
    assert.deepEqual({ missing, extra }, { missing: [], extra: [] }, `${locale}: Schlüssel weichen von de ab`);
  }
});
