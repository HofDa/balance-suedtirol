import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { absoluteSiteUrl, localizedAlternates } from "../src/lib/site-metadata";

test("metadata uses the production origin and Pages prefix when no site URL is configured", () => {
  const load = createRequire(__filename);
  const modules = [load.resolve("../src/lib/site-metadata"), load.resolve("../src/lib/public-path")];
  const cached = modules.map((id) => load.cache[id]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  let result;
  try {
    process.env.NEXT_PUBLIC_SITE_URL = "";
    process.env.NEXT_PUBLIC_BASE_PATH = "/balance-suedtirol";
    modules.forEach((id) => { delete load.cache[id]; });
    const fresh: typeof import("../src/lib/site-metadata") = load("../src/lib/site-metadata");
    result = {
      image: fresh.absoluteSiteUrl("/projects/photo.webp"),
      page: fresh.localizedAlternates("it", "/projekte/example"),
    };
  } finally {
    if (siteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = siteUrl;
    if (basePath === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = basePath;
    modules.forEach((id, index) => {
      if (cached[index]) load.cache[id] = cached[index];
      else delete load.cache[id];
    });
  }
  assert.deepEqual(result, {
    image: "https://balance-suedtirol.it/balance-suedtirol/projects/photo.webp",
    page: {
      canonical: "https://balance-suedtirol.it/balance-suedtirol/it/projekte/example",
      languages: {
        de: "https://balance-suedtirol.it/balance-suedtirol/de/projekte/example",
        it: "https://balance-suedtirol.it/balance-suedtirol/it/projekte/example",
        en: "https://balance-suedtirol.it/balance-suedtirol/en/projekte/example",
      },
    },
  });
});

test("localized metadata preserves the same route across every language", () => {
  const metadata = localizedAlternates("en", "/projekt-einreichen/formular");
  assert.equal(metadata.canonical, absoluteSiteUrl("/en/projekt-einreichen/formular"));
  assert.equal(metadata.languages?.it, absoluteSiteUrl("/it/projekt-einreichen/formular"));
});
