"use client";

import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { staticPageHref } from "@/lib/public-path";

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Pages deployments can change while an older tab is still open. Next 15's
 * export router falls back to opening the RSC .txt URL on a build mismatch.
 * Document navigation keeps static hosting on HTML, including after updates.
 */
export default function SiteLink({ href, ...props }: SiteLinkProps) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
    return <a href={staticPageHref(href)} {...props} />;
  }

  return <NextLink href={href} {...props} />;
}
