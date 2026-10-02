import assert from "node:assert/strict";
import test from "node:test";
import { staticPageHref } from "../src/lib/public-path";

test("static page links use directory URLs and preserve queries and anchors", () => {
  assert.equal(staticPageHref("/de"), "/de/");
  assert.equal(staticPageHref("/de/"), "/de/");
  assert.equal(staticPageHref("/"), "/");
  assert.equal(staticPageHref("/de#lebensraum-check"), "/de/#lebensraum-check");
  assert.equal(staticPageHref("/it/projekte?filter=natur#liste"), "/it/projekte/?filter=natur#liste");
});

test("non-page destinations keep their URL semantics", () => {
  for (const href of ["#hauptinhalt", "https://example.com/de", "//example.com/de", "mailto:info@example.com", "/sitemap.xml", "/assets/photo.webp?size=2#preview"]) {
    assert.equal(staticPageHref(href), href);
  }
});
