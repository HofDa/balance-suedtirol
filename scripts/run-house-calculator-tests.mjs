import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const outputDirectory = mkdtempSync(join(tmpdir(), "balance-calculator-tests-"));

try {
  const compile = spawnSync(
    join(process.cwd(), "node_modules", ".bin", "tsc"),
    [
      "tests/house-calculator.test.ts",
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

  const run = spawnSync(
    process.execPath,
    ["--test", join(outputDirectory, "tests", "house-calculator.test.js")],
    { stdio: "inherit" }
  );
  process.exitCode = run.status ?? 1;
} finally {
  rmSync(outputDirectory, { recursive: true, force: true });
}
