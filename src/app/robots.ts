import type { MetadataRoute } from "next";
import { withBasePath } from "@/lib/public-path";

// Statischer Export (`output: "export"` für GitHub Pages) verlangt das ausdrücklich.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://balance-suedtirol.it";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"]
    },
    sitemap: `${baseUrl}${withBasePath("/sitemap.xml")}`
  };
}
