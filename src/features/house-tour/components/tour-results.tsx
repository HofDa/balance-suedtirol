import Link from "next/link";
import { ArrowRight, Check, Leaf } from "lucide-react";
import { baseScores, scoreDimensions } from "../model/scoring";
import type { RoomId, Scores } from "../model/types";
import { rooms } from "../config/rooms";
import { Label } from "@/components/ui/label";

export function TourResults({
  scores,
  completedRooms,
  locale,
  onContinue
}: {
  scores: Scores;
  completedRooms: RoomId[];
  locale: string;
  onContinue: () => void;
}) {
  const sorted = [...scoreDimensions].sort((a, b) => scores[b.id] - scores[a.id]);

  return (
    <div className="grid h-full min-h-0 overflow-y-auto bg-[var(--color-paper)] p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
      <div>
        <span className="grid size-12 place-items-center rounded-full bg-[var(--color-forest)] text-white">
          <Leaf className="size-5" />
        </span>
        <Label size="dense" className="mt-6">Deine Zwischenbilanz</Label>
        <h1 className="mt-3 font-display text-[length:var(--text-display)] leading-[var(--leading-display)]">Kleine Veränderungen können viel bewegen.</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
          Noch größer wird dein Einfluss, wenn du lokale Biodiversitätsprojekte unterstützt.
        </p>
      </div>

      <div className="mt-8 lg:mt-0">
        {/* Werte auf Weiß, damit die Zahlen und nicht die Fläche wirken. */}
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
          {scoreDimensions.map((item) => {
            const delta = scores[item.id] - baseScores[item.id];
            return (
              <div key={item.id} className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-4">
                <dt className="text-[11px] font-medium text-[var(--color-muted)]">{item.label}</dt>
                <dd className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tabular-nums">{scores[item.id]}</span>
                  {delta !== 0 && (
                    <span
                      className={`text-xs font-semibold tabular-nums ${
                        delta > 0 ? "text-[var(--color-forest)]" : "text-[var(--color-clay-ink)]"
                      }`}
                    >
                      {delta > 0 ? "+" : ""}
                      {delta}
                    </span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-4 text-xs">
            <span className="text-[var(--color-muted)]">Stärkster Bereich</span>
            <strong className="mt-1 block text-sm">{sorted[0].label}</strong>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-4 text-xs">
            <span className="text-[var(--color-muted)]">Größtes Potenzial</span>
            <strong className="mt-1 block text-sm">{sorted.at(-1)?.label}</strong>
          </div>
        </div>

        {completedRooms.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {completedRooms.map((id) => (
              <span
                key={id}
                className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-1.5 text-[11px] font-semibold"
              >
                <Check className="size-3 text-[var(--color-forest)]" />
                {rooms.find((room) => room.id === id)?.title}
              </span>
            ))}
          </div>
        )}

        {/* Contextual Recommendation Mapping for PR #6 */}
        {(() => {
          const lowest = sorted.at(-1);
          let targetCategory = "settlement-areas";
          let recommendationText = "Projekte für Siedlungsräume";

          if (lowest?.id === "water") {
            targetCategory = "wetlands";
            recommendationText = "Projekte für Feuchtgebiete";
          } else if (lowest?.id === "carbon" || lowest?.id === "resources") {
            targetCategory = "cultural-landscapes";
            recommendationText = "Projekte für Kulturlandschaften";
          }

          return (
            <div className="mt-4 rounded-[var(--radius-lg)] border border-[var(--color-forest)]/20 bg-[var(--color-forest)]/5 p-4 text-xs text-[var(--color-ink)]">
              <span className="font-bold text-[var(--color-forest)]">Empfehlung basierend auf deinen Eingaben:</span>
              <p className="mt-1 text-[var(--color-muted)]">
                Dein größtes Potenzial liegt im Bereich <strong>{lowest?.label}</strong>. Wir empfehlen dir den Einstieg über <strong>{recommendationText}</strong> in Südtirol.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/projekte?kategorie=${encodeURIComponent(targetCategory)}`}
                  className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 text-xs font-semibold text-white transition hover:bg-[var(--color-forest)]"
                >
                  {recommendationText} ansehen
                  <ArrowRight className="ml-2 size-3.5" />
                </Link>
                <button
                  onClick={onContinue}
                  className="min-h-11 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-5 text-xs font-semibold hover:bg-[var(--color-paper)] cursor-pointer"
                >
                  Tour fortsetzen
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
