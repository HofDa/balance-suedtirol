import Image from "next/image";
import { Label } from "@/components/ui/label";
import type { Sponsor } from "@/types/project";

export function ProjectCardSponsor({
  mainSponsor,
  additionalCount = 0,
  copy
}: {
  mainSponsor: Sponsor;
  additionalCount?: number;
  copy: { mainSponsor: string; placeholder: string; partner: string };
}) {
  return (
    <div className="mt-5 flex min-h-11 items-center justify-between gap-3 border-t border-[var(--color-line)] pt-4">
      <div className="min-w-0">
        <Label size="dense" tone="muted" className="mb-1">
          {copy.mainSponsor}{mainSponsor.isPlaceholder ? " · Demo" : ""}
        </Label>
        <span className="inline-flex flex-wrap items-center gap-2">
          {mainSponsor.logo ? (
            <Image
              src={mainSponsor.logo}
              alt={`${mainSponsor.name} Logo${mainSponsor.isPlaceholder ? " – Platzhalter" : ""}`}
              width={100}
              height={28}
              className="h-auto max-h-7 w-auto max-w-[6.25rem] object-contain"
            />
          ) : (
            <span className="text-sm font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
              {mainSponsor.name}
            </span>
          )}
          {mainSponsor.isPlaceholder ? (
            <span className="rounded-[var(--radius-sm)] bg-[var(--color-stone)] px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              {copy.placeholder}
            </span>
          ) : null}
        </span>
      </div>
      {additionalCount > 0 ? (
        <span className="shrink-0 text-xs tabular-nums text-[var(--color-muted)]">
          + {additionalCount} {copy.partner}
        </span>
      ) : null}
    </div>
  );
}
