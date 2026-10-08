import { Label } from "@/components/ui/label";
import type { Project } from "@/types/project";
import { SponsorIdentity } from "./sponsor-identity";

const emptyTile =
  "grid place-items-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-forest)]/25 bg-white/40 px-4 text-center text-sm leading-6 text-[var(--color-muted)]";

/**
 * Wer das Projekt trägt, im Raster der übrigen Abschnitte (Überschrift,
 * Haarlinie, Spalten mit senkrechten Trennern wie bei „Ökologische Wirkung“):
 * links der Projektträger, dann der Hauptinvestor als große Kachel mit
 * Kopflinie, rechts die Mitinvestoren als kleinere Kacheln. Größe und Linie
 * tragen die Rangfolge. Fehlt ein Rang noch, bleibt die Stelle als
 * gestrichelte Einladung sichtbar. Öffentliche Unterstützung (`supportedBy`)
 * steht beim Träger, nie als Investor.
 */
export function ProjectSponsors({
  project,
  copy
}: {
  project: Project;
  copy: {
    title: string;
    intro: string;
    organization: string;
    supportedBy: string;
    mainSponsor: string;
    coSponsors: string;
    sponsorOpen: string;
    sponsorOpenShort: string;
    placeholder: string;
    website: string;
  };
}) {
  const main = project.mainSponsor;
  const others = project.otherSponsors ?? [];

  return (
    <section className="mt-20" aria-labelledby="project-backers-title">
      <div className="max-w-2xl">
        <h2
          id="project-backers-title"
          className="font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]"
        >
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{copy.intro}</p>
      </div>

      <div className="mt-8 grid gap-8 border-t border-[var(--color-line)] pt-8 sm:mt-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,5fr)] lg:gap-0">
        <div className="lg:pr-10">
          <Label size="block" tone="muted">{copy.organization}</Label>
          <p className="mt-3 text-[length:var(--text-body)] font-semibold text-[var(--color-ink)]">{project.organization}</p>
          <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
            {project.organizationAddress ?? project.municipality}
          </p>
          {project.supportedBy ? (
            <p className="mt-4 border-t border-[var(--color-line)] pt-4 text-sm leading-6 text-[var(--color-muted)]">
              {copy.supportedBy}: <span className="font-semibold text-[var(--color-ink)]">{project.supportedBy}</span>
            </p>
          ) : null}
        </div>

        <div className="lg:border-l lg:border-[var(--color-line)] lg:px-10">
          <Label size="block">
            {copy.mainSponsor}
            {main?.isPlaceholder ? " · Demo" : ""}
          </Label>
          {main ? (
            <div className="mt-3 flex min-h-40 flex-col justify-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-line)] border-t-[3px] border-t-[var(--color-forest)] bg-white p-6">
              <SponsorIdentity sponsor={main} size="featured" linked copy={copy} />
              {main.contribution ? (
                <p className="text-sm leading-6 text-[var(--color-muted)]">{main.contribution}</p>
              ) : null}
            </div>
          ) : (
            <p className={`${emptyTile} mt-3 min-h-40 border-t-[3px] border-t-[var(--color-forest)]/60`}>{copy.sponsorOpen}</p>
          )}
        </div>

        <div className="lg:border-l lg:border-[var(--color-line)] lg:pl-10">
          <Label size="block" tone="muted">{copy.coSponsors}</Label>
          <ul className="mt-3 grid grid-cols-3 gap-3">
            {others.length > 0
              ? others.map((sponsor) => (
                  <li
                    key={sponsor.name}
                    className="grid min-h-20 place-items-center rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-3 text-center"
                  >
                    <SponsorIdentity sponsor={sponsor} linked copy={copy} />
                  </li>
                ))
              : [0, 1, 2].map((slot) => (
                  <li key={slot} className={`${emptyTile} min-h-20`}>
                    {copy.sponsorOpenShort}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
