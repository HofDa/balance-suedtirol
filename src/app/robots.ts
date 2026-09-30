import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/site-metadata";

// Statischer Export (`output: "export"` für GitHub Pages) verlangt das ausdrücklich.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"]
    },
    sitemap: absoluteSiteUrl("/sitemap.xml")
  };
}
