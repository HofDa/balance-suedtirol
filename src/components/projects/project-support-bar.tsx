import { Container } from "@/components/ui/container";
import { focusRingOnDark } from "@/components/ui/focus";
import { formatCurrency } from "@/lib/format";
import { ProjectSupportTrigger } from "./project-support";

export type ProjectSupportBarCopy = {
  fundingProgress: string;
  fundingRaised: string;
  fundingGoal: string;
  fundingGoalPending: string;
  fundingDeadline: string;
  supporters: string;
  support: string;
  tax: string;
};

/**
 * Klebende Leiste am unteren Rand: Finanzierungsstand als Kennzahlenreihe
 * (Balken von gesammelt bis Ziel, Frist, Unterstützer:innen), rechts die beiden
 * Schaltflächen mit dem Steuerhinweis. `sticky` im Fluss statt `fixed`: Am
 * Seitenende bleibt sie vor der Fußzeile stehen, statt sie zu überdecken.
 * Das Ziel steht am rechten Ende des Balkens, damit auch bei 0 € sichtbar ist,
 * worauf er sich füllt. Ohne entschiedenes Ziel bleibt der Balken leer und das
 * Ziel „offen“: 0 von 0 wäre eine Zahl, die es nicht gibt. Die Frist erscheint
 * erst, wenn sie feststeht.
 */
export function ProjectSupportBar({
  funded,
  goal,
  deadline,
  supporters,
  localeTag,
  copy,
  share
}: {
  funded?: number;
  goal?: number;
  deadline?: string;
  supporters: number;
  localeTag: string;
  copy: ProjectSupportBarCopy;
  share: React.ReactNode;
}) {
  const hasGoal = typeof goal === "number" && goal > 0;
  const raised = funded ?? 0;
  const pct = hasGoal ? Math.min(100, Math.round((raised / goal!) * 100)) : null;
  // Mittag statt Mitternacht: Das ISO-Datum soll in keiner Zeitzone auf den Vortag kippen.
  const deadlineLabel = deadline
    ? new Intl.DateTimeFormat(localeTag, { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${deadline}T12:00:00`))
    : null;

  return (
    <div className="sticky bottom-0 z-30 border-t border-white/10 bg-[var(--color-ink)] pb-[env(safe-area-inset-bottom)] text-white">
      <Container className="py-3 sm:py-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
          <div className="flex items-stretch gap-5 sm:gap-8">
            <div className="min-w-0 flex-1 sm:w-72 sm:flex-none">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-[1.375rem] leading-none tracking-[-0.02em] tabular-nums sm:text-[1.625rem]">
                  {formatCurrency(raised, localeTag)}
                </p>
                <p className="text-sm font-semibold tabular-nums text-white/80 sm:text-base">
                  {hasGoal ? formatCurrency(goal!, localeTag) : copy.fundingGoalPending}
                </p>
              </div>
              <div
                role={pct === null ? undefined : "progressbar"}
                aria-valuemin={pct === null ? undefined : 0}
                aria-valuemax={pct === null ? undefined : 100}
                aria-valuenow={pct ?? undefined}
                aria-label={pct === null ? undefined : `${copy.fundingProgress}: ${pct} %`}
                aria-hidden={pct === null || undefined}
                className="mt-2 h-1 overflow-hidden rounded-full bg-white/15"
              >
                <div
                  className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-[var(--duration-bar)] ease-out"
                  style={{ width: `${pct ?? 0}%` }}
                />
              </div>
              <div className="mt-1.5 flex items-baseline justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                <p>
                  {copy.fundingRaised}
                  {pct !== null ? <span className="tabular-nums text-[var(--color-accent)]"> · {pct} %</span> : null}
                </p>
                <p>{copy.fundingGoal}</p>
              </div>
              {/* Mobil reicht die Breite nicht für weitere Kennzahlenspalten neben
                  dem Balken; Unterstützer:innen und Frist laufen als Zeile mit. */}
              <p className="mt-1 text-xs tabular-nums text-white/70 sm:hidden">
                {supporters} {copy.supporters}
                {deadlineLabel ? ` · ${copy.fundingDeadline} ${deadlineLabel}` : null}
              </p>
            </div>

            {deadlineLabel ? <Stat label={copy.fundingDeadline} value={deadlineLabel} /> : null}
            <Stat label={copy.supporters} value={String(supporters)} />
          </div>

          <div className="flex flex-col gap-1.5 xl:items-end">
            <div className="grid grid-cols-[1fr_1.35fr] gap-3 sm:flex">
              {share}
              <ProjectSupportTrigger
                label={copy.support}
                variant="accent"
                className={`whitespace-nowrap px-3 font-bold sm:px-8 ${focusRingOnDark}`}
              />
            </div>
            <p className="text-center text-[11px] text-white/55 sm:text-left xl:text-right">{copy.tax}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden flex-col justify-between whitespace-nowrap border-l border-white/12 pl-8 sm:flex">
      <p className="font-display text-[1.375rem] leading-none tracking-[-0.02em] tabular-nums sm:text-[1.625rem]">{value}</p>
      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">{label}</p>
    </div>
  );
}
