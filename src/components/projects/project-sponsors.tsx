import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import type { Project } from "@/types/project";
import { SponsorIdentity } from "./sponsor-identity";

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
    placeholder: string;
    website: string;
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
            <SponsorIdentity sponsor={project.mainSponsor} size="featured" linked copy={copy} />
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
                <SponsorIdentity sponsor={sponsor} linked copy={copy} />
              </Surface>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
