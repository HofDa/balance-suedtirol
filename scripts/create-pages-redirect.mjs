import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

function redirectHtml(destination) {
  const href = destination.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  const serializedDestination = JSON.stringify(destination).replaceAll("<", "\\u003c");
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0;url=${href}">
    <link rel="canonical" href="${href}">
    <title>b*alance</title>
    <script>window.location.replace(${serializedDestination} + window.location.search + window.location.hash)</script>
  </head>
  <body>
    <p><a href="${href}">Weiter zu b*alance</a></p>
  </body>
</html>
`;
}

async function writeRedirect(directory, destination) {
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), redirectHtml(destination), "utf8");
}

// Keep old preview bookmarks working without shipping a second copy of the site.
// Discover localized pages before writing aliases, so /neu cannot recurse.
async function pageDirectories(directory, relative = "") {
  const pages = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      pages.push(...await pageDirectories(join(directory, entry.name), join(relative, entry.name)));
    } else if (entry.name === "index.html") {
      pages.push(relative);
    }
  }
  return pages;
}

const pages = [];
for (const locale of ["de", "it", "en"]) {
  pages.push(...await pageDirectories(join("out", locale), locale));
}

await writeRedirect("out", `${basePath}/de/`);
await writeRedirect(join("out", "neu"), `${basePath}/de/`);
for (const page of pages) {
  await writeRedirect(join("out", "neu", page), `${basePath}/${page}/`);
}
