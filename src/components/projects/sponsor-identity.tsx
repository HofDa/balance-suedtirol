import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { focusRing } from "@/components/ui/focus";
import type { Sponsor } from "@/types/project";
import { withBasePath } from "@/lib/public-path";

export function SponsorIdentity({
  sponsor,
  size = "supporting",
  linked = false,
  copy
}: {
  sponsor: Sponsor;
  size?: "card" | "featured" | "supporting";
  linked?: boolean;
  copy: { placeholder: string; website?: string };
}) {
  const logoSizes = {
    card: { width: 100, height: 28, className: "max-h-7 max-w-[6.25rem]" },
    featured: { width: 180, height: 56, className: "max-h-14 max-w-[11.25rem]" },
    supporting: { width: 128, height: 36, className: "max-h-9 max-w-32" }
  } as const;
  const dimensions = logoSizes[size];

  const identity = (
    <span className="inline-flex flex-wrap items-center gap-2">
      {sponsor.logo ? (
        <Image
          src={withBasePath(sponsor.logo)}
          alt={`${sponsor.name}${sponsor.isPlaceholder ? ` · ${copy.placeholder}` : ""}`}
          width={dimensions.width}
          height={dimensions.height}
          className={`h-auto w-auto object-contain ${dimensions.className}`}
        />
      ) : (
        <span
          className={`font-semibold tracking-[-0.02em] text-[var(--color-ink)] ${
            size === "featured" ? "text-xl" : size === "card" ? "text-sm" : "text-base"
          }`}
        >
          {sponsor.name}
        </span>
      )}
      {sponsor.isPlaceholder ? (
        <span className="rounded-[var(--radius-sm)] bg-[var(--color-stone)] px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          {copy.placeholder}
        </span>
      ) : null}
    </span>
  );

  if (!linked || !sponsor.website) return identity;

  return (
    <a
      href={sponsor.website}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex min-h-11 items-center gap-2 ${focusRing}`}
      aria-label={`${sponsor.name}${copy.website ? ` – ${copy.website}` : ""}`}
    >
      {identity}
      <ExternalLink
        className="size-3.5 shrink-0 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-forest)]"
        aria-hidden
      />
    </a>
  );
}

