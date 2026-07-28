"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { focusRing } from "@/components/ui/focus";

/**
 * Reusable animated underline effect for navigation links.
 */
export const navUnderlineClass =
  "relative transition-colors duration-200 ease-out after:absolute after:bottom-2.5 after:h-[1.5px] after:origin-left after:bg-[var(--color-forest)] after:transition-transform after:duration-200 after:ease-out";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className = "" }: NavLinkProps) {
  const pathname = usePathname();

  const isHabitatCheck = href.endsWith("/haus-tour");
  const isHomePage = Boolean(pathname?.match(/^\/[a-z]{2}\/?$/));

  const isActive =
    pathname === href ||
    (href.length > 3 && !isHabitatCheck && pathname?.startsWith(href)) ||
    (isHabitatCheck && (pathname === href || isHomePage));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex min-h-11 items-center text-sm font-medium tracking-tight ${navUnderlineClass} after:left-0 after:right-0 ${
        isActive
          ? "text-[var(--color-ink)] font-semibold after:scale-x-100"
          : "text-[var(--color-muted)] after:scale-x-0 hover:text-[var(--color-ink)] hover:after:scale-x-100 focus-visible:after:scale-x-100"
      } ${focusRing} ${className}`}
    >
      {children}
    </Link>
  );
}
