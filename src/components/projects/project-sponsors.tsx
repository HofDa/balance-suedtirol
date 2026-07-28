import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { focusRing } from "@/components/ui/focus";
import type { Project, Sponsor } from "@/types/project";
import { withBasePath } from "@/lib/public-path";

function SponsorIdentity({
  sponsor,
  size = "supporting",
  linked = false
}: {
  sponsor: Sponsor;
  size?: "card" | "featured" | "supporting";
  linked?: boolean;
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
          alt={`${sponsor.name} Logo${sponsor.isPlaceholder ? " – Platzhalter" : ""}`}
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
          Platzhalter
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
      aria-label={`${sponsor.name} – Website öffnen`}
    >
      {identity}
      <ExternalLink
        className="size-3.5 shrink-0 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-forest)]"
        aria-hidden
      />
    </a>
  );
}

export function ProjectSponsors({
  project,
  copy
}: {
  project: Project;
  copy: {
    sponsorsEyebrow: string;
    sponsorsTitle: string;
    mainSponsor: string;
    supportingSponsors: string;
  };
}) {
  const supporting = project.otherSponsors ?? [];
  if (!project.mainSponsor && supporting.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="project-sponsors-title">
      <Label size="section">{copy.sponsorsEyebrow}</Label>
      <h2
        id="project-sponsors-title"
        className="mt-2 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]"
      >
        {copy.sponsorsTitle}
      </h2>

      {project.mainSponsor ? (
        <Surface level="sheet" className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-center">
          <div>
            <Label size="dense" tone="muted" className="mb-3">
              {copy.mainSponsor}{project.mainSponsor.isPlaceholder ? " · Demo" : ""}
            </Label>
            <SponsorIdentity sponsor={project.mainSponsor} size="featured" linked />
          </div>
          <div className="border-t border-[var(--color-line)] pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <p className="text-sm font-semibold text-[var(--color-ink)]">{project.mainSponsor.name}</p>
            {project.mainSponsor.contribution ? (
              <p className="mt-2 max-w-[52ch] text-sm leading-6 text-[var(--color-muted)]">
                {project.mainSponsor.contribution}
              </p>
            ) : (
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {copy.mainSponsor}
              </p>
            )}
          </div>
        </Surface>
      ) : null}

      {supporting.length > 0 ? (
        <div className="mt-8">
          <Label size="block" tone="muted">
            {copy.supportingSponsors}
          </Label>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {supporting.map((sponsor) => (
              <Surface
                key={sponsor.name}
                level="inset"
                className="flex min-h-24 items-center justify-center text-center"
              >
                <SponsorIdentity sponsor={sponsor} linked />
              </Surface>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
