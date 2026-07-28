import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const destination = `${basePath}/de/`;
const serializedDestination = JSON.stringify(destination);
const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0;url=${destination}">
    <title>b*alance</title>
    <script>window.location.replace(${serializedDestination} + window.location.search + window.location.hash)</script>
  </head>
  <body>
    <p><a href="${destination}">Weiter zu b*alance</a></p>
  </body>
</html>
`;

await mkdir("out", { recursive: true });
await writeFile(join("out", "index.html"), html, "utf8");
