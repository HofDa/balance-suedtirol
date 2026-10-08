import { Label } from "@/components/ui/label";
import { SponsorIdentity } from "./sponsor-identity";
import type { Sponsor } from "@/types/project";

export function ProjectCardSponsor({
  mainSponsor,
  additionalCount = 0,
  copy
}: {
  mainSponsor?: Sponsor;
  additionalCount?: number;
  copy: { mainSponsor: string; placeholder: string; partner: string; sponsorOpen: string };
}) {
  // Noch kein Hauptinvestor: Die Stelle bleibt sichtbar und lädt ein.
  if (!mainSponsor) {
    return (
      <div className="mt-5 border-t border-[var(--color-line)] pt-4">
        <Label size="dense" tone="muted" className="mb-1">
          {copy.mainSponsor}
        </Label>
        <p className="flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[var(--color-line)] px-3 py-2 text-center text-sm text-[var(--color-muted)]">
          {copy.sponsorOpen}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 flex min-h-11 items-center justify-between gap-3 border-t border-[var(--color-line)] pt-4">
      <div className="min-w-0">
        <Label size="dense" tone="muted" className="mb-1">
          {copy.mainSponsor}{mainSponsor.isPlaceholder ? " · Demo" : ""}
        </Label>
        <SponsorIdentity sponsor={mainSponsor} size="card" copy={copy} />
      </div>
      {additionalCount > 0 ? (
        <span className="shrink-0 text-xs tabular-nums text-[var(--color-muted)]">
          + {additionalCount} {copy.partner}
        </span>
      ) : null}
    </div>
  );
}
