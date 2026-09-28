import { mkdtempSync, rmSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const testsDir = join(process.cwd(), "tests");
// Ohne Argumente laufen alle Tests; mit Namensteilen nur die passenden,
// z. B. `node scripts/run-all-tests.mjs house-calculator`.
const filters = process.argv.slice(2);
const testSourceFiles = readdirSync(testsDir)
  .filter((f) => f.endsWith(".test.ts"))
  .filter((f) => filters.length === 0 || filters.some((part) => f.includes(part)))
  .sort()
  .map((f) => join("tests", f));

if (testSourceFiles.length === 0) {
  console.error(`Keine Testdatei passt zu: ${filters.join(", ")}`);
  process.exit(1);
}

const outputDirectory = mkdtempSync(join(tmpdir(), "balance-tests-"));

try {
  const compile = spawnSync(
    join(process.cwd(), "node_modules", ".bin", "tsc"),
    [
      ...testSourceFiles,
      "--outDir", outputDirectory,
      "--rootDir", ".",
      "--module", "commonjs",
      "--moduleResolution", "node",
      "--target", "es2022",
      "--esModuleInterop",
      "--skipLibCheck",
      "--types", "node"
    ],
    { stdio: "inherit" }
  );
  if (compile.status !== 0) process.exit(compile.status ?? 1);

  const compiledFiles = testSourceFiles.map((f) =>
    join(outputDirectory, f.replace(/\.ts$/, ".js"))
  );

  const run = spawnSync(
    process.execPath,
    ["--test", ...compiledFiles],
    { stdio: "inherit" }
  );
  process.exitCode = run.status ?? 1;
} finally {
  rmSync(outputDirectory, { recursive: true, force: true });
}
