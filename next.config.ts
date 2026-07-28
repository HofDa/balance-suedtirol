import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";
  const isGitHubPages = process.env.GITHUB_PAGES === "true";

  return {
    // Development and production must not share manifests. Running `next build`
    // while `next dev` is open would otherwise remove temporary dev files.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    output: isGitHubPages ? "export" : undefined,
    basePath: pagesBasePath,
    trailingSlash: isGitHubPages,
    poweredByHeader: false,
    images: {
      formats: ["image/avif", "image/webp"],
      unoptimized: isGitHubPages,
    },
    // On the server, / redirects to /de. GitHub Pages receives an equivalent
    // static index.html from scripts/create-pages-redirect.mjs.
    ...(isGitHubPages
      ? {}
      : {
          async redirects() {
            return [{ source: "/", destination: "/de", permanent: false }];
          },
        }),
    outputFileTracingRoot: import.meta.dirname,
    turbopack: {
      root: import.meta.dirname,
    },
    // Next 15.5 can race while merging route manifests in the webpack worker,
    // leaving a valid route bundle out of app-paths-manifest.json.
    experimental: {
      webpackBuildWorker: false,
    },
  };
}
