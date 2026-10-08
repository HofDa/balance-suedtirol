import { Label } from "@/components/ui/label";
import type { Project } from "@/types/project";
import { SponsorIdentity } from "./sponsor-identity";

const emptyTile =
  "grid place-items-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-forest)]/30 px-4 text-center text-sm text-[var(--color-muted)]";

/**
 * Wer das Projekt finanziert, in zwei Rängen: links der Hauptinvestor als
 * große Kachel mit kräftiger Kopflinie, rechts die Mitinvestoren als kleinere,
 * ruhigere Kacheln. Größe und Linie tragen die Rangfolge, nicht nur das Label.
 * Fehlt ein Rang noch, bleibt die Stelle als gestrichelte Einladung sichtbar.
 */
export function ProjectSponsors({
  project,
  copy
}: {
  project: Project;
  copy: {
    sponsorsEyebrow: string;
    sponsorsTitle: string;
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
    <section className="mt-16" aria-labelledby="project-sponsors-title">
      <Label size="section">{copy.sponsorsEyebrow}</Label>
      <h2
        id="project-sponsors-title"
        className="mt-2 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)]"
      >
        {copy.sponsorsTitle}
      </h2>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <div>
          <Label size="block">
            {copy.mainSponsor}
            {main?.isPlaceholder ? " · Demo" : ""}
          </Label>
          {main ? (
            <div className="mt-3 flex min-h-52 flex-col justify-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-line)] border-t-[3px] border-t-[var(--color-forest)] bg-white p-8">
              <SponsorIdentity sponsor={main} size="featured" linked copy={copy} />
              {main.contribution ? (
                <p className="max-w-[44ch] text-sm leading-6 text-[var(--color-muted)]">{main.contribution}</p>
              ) : null}
            </div>
          ) : (
            <p className={`${emptyTile} mt-3 min-h-52 border-t-[3px] border-t-[var(--color-forest)]/50`}>{copy.sponsorOpen}</p>
          )}
        </div>

        <div>
          <Label size="block" tone="muted">
            {copy.coSponsors}
          </Label>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {others.length > 0
              ? others.map((sponsor) => (
                  <li
                    key={sponsor.name}
                    className="grid min-h-24 place-items-center rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/60 p-4 text-center"
                  >
                    <SponsorIdentity sponsor={sponsor} linked copy={copy} />
                  </li>
                ))
              : [0, 1, 2].map((slot) => (
                  <li key={slot} className={`${emptyTile} min-h-24`}>
                    {copy.sponsorOpenShort}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
