import { Users } from "lucide-react";
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
  fundingDeadlineLabel: string;
  supporters: string;
  support: string;
  supportShort: string;
  tax: string;
};

/**
 * Klebende Leiste am unteren Rand: Finanzierungsstand als Kennzahlenreihe
 * (Balken von gesammelt bis Ziel, Frist, Unterstützer:innen), rechts die beiden
 * Schaltflächen mit dem Steuerhinweis. `sticky` im Fluss statt `fixed`: Am
 * Seitenende bleibt sie vor der Fußzeile stehen, statt sie zu überdecken.
 * Auf jeder Breite eine Zeile, damit die Leiste auf Handy und Tablet nicht
 * ein Viertel des Bildschirms belegt; unter `xl` wird Teilen zum Symbol.
 * Das Ziel steht am rechten Ende des Balkens, damit auch bei 0 € sichtbar ist,
 * worauf er sich füllt. Ohne entschiedenes Ziel bleibt der Balken leer und das
 * Ziel „offen“: 0 von 0 wäre eine Zahl, die es nicht gibt. Ohne Frist steht
 * sie als „offen“ da, damit der Platz dafür schon eingeplant ist.
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
  const deadlineStat = deadlineLabel
    ? { label: copy.fundingDeadline, value: deadlineLabel }
    : { label: copy.fundingDeadlineLabel, value: copy.fundingGoalPending };

  return (
    <div className="sticky bottom-0 z-30 border-t border-white/10 bg-[var(--color-ink)] pb-[env(safe-area-inset-bottom)] text-white">
      <Container className="py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          <div className="flex min-w-0 flex-1 items-stretch gap-8">
            <div className="min-w-0 flex-1 sm:max-w-80 xl:w-72 xl:flex-none">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-[1.25rem] leading-none tracking-[-0.02em] tabular-nums sm:text-[1.5rem]">
                  {formatCurrency(raised, localeTag)}
                </p>
                <p className="truncate text-sm font-semibold tabular-nums text-white/80">
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
                className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/15"
              >
                <div
                  className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-[var(--duration-bar)] ease-out"
                  style={{ width: `${pct ?? 0}%` }}
                />
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-[11px]">
                <p className="truncate">
                  {copy.fundingRaised}
                  {pct !== null ? <span className="tabular-nums text-[var(--color-accent)]"> · {pct} %</span> : null}
                </p>
                <p>{copy.fundingGoal}</p>
              </div>
              {/* Unter `xl` reicht die Breite nicht für eigene Kennzahlenspalten
                  neben Balken und Schaltflächen; Frist und Unterstützer:innen
                  laufen als Zeile mit. */}
              <p className="mt-0.5 truncate text-xs tabular-nums text-white/70 xl:hidden">
                {deadlineStat.label} {deadlineStat.value} ·{" "}
                <Users className="inline size-3 align-[-1px] sm:hidden" aria-label={copy.supporters} /> {supporters}
                <span className="hidden sm:inline"> {copy.supporters}</span>
              </p>
            </div>

            <Stat label={deadlineStat.label} value={deadlineStat.value} />
            <Stat label={copy.supporters} value={String(supporters)} />
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <div className="flex gap-2 sm:gap-3">
              {share}
              <ProjectSupportTrigger
                label={
                  <>
                    <span className="sm:hidden">{copy.supportShort}</span>
                    <span className="hidden sm:inline">{copy.support}</span>
                  </>
                }
                variant="accent"
                className={`whitespace-nowrap px-4 font-bold sm:px-8 ${focusRingOnDark}`}
              />
            </div>
            <p className="text-[10px] text-white/55 sm:text-[11px]">{copy.tax}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden flex-col justify-between whitespace-nowrap border-l border-white/12 pl-8 xl:flex">
      <p className="font-display text-[1.5rem] leading-none tracking-[-0.02em] tabular-nums">{value}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">{label}</p>
    </div>
  );
}
