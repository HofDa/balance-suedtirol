import { getProjectCategoryVisual } from "@/config/project-categories";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { OUTLINE_VIEWBOX, SOUTH_TYROL_PATH, projectToOutline } from "./south-tyrol-outline";

type MapProject = Pick<Project, "slug" | "municipality" | "location" | "categoryIds">;

/**
 * Südtirol als stilisierter Umriss statt als Kachelkarte.
 *
 * Vorher stand hier ein OpenStreetMap-iframe hinter einem Einwilligungsklick.
 * Das kostete einen Interaktionsschritt, einen Drittanbieter-Request und die
 * Herkunft der IP-Adresse jedes Besuchers — für die Aussage „das Projekt liegt
 * im Pustertal" ein unverhältnismäßiger Aufwand. Der Umriss ist ein Pfad im
 * Markup: kein Request, keine Einwilligung, kein Ladezustand.
 *
 * Die Punktfarbe ist die Markerfarbe des primären Lebensraums. Sie codiert also
 * dieselbe Kategorie wie die Marke auf der Projektkarte und ist keine
 * Dekoration. Lehm bleibt ausgespart — der Ton bedeutet im System „belastet".
 */
export function SouthTyrolMap({
  projects,
  activeSlug,
  label,
  attribution,
  className
}: {
  projects: MapProject[];
  /** Hebt ein Projekt hervor; alle anderen bleiben als Kontext sichtbar. */
  activeSlug?: string;
  /** Zugängliche Beschreibung der Grafik. */
  label: string;
  attribution: string;
  className?: string;
}) {
  const { width, height } = OUTLINE_VIEWBOX;
  // Der aktive Punkt zuletzt, damit er über den anderen liegt.
  const ordered = [...projects].sort((a, b) =>
    Number(a.slug === activeSlug) - Number(b.slug === activeSlug)
  );

  return (
    <figure className={cn("m-0", className)}>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={label}
          className="h-auto w-full"
        >
          <path
            d={SOUTH_TYROL_PATH}
            fill="var(--color-sage)"
            stroke="var(--color-forest)"
            strokeWidth={2}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {ordered.map((project) => {
            const { x, y } = projectToOutline(project.location.lat, project.location.lng);
            const isActive = project.slug === activeSlug;
            const marker = getProjectCategoryVisual(project.categoryIds[0]).marker;

            /* Die Kategorietöne sind bewusst hell und liegen teils nah an der
               Umrissfarbe. Damit ein Punkt unabhängig von seinem Ton lesbar
               bleibt, trägt er zwei Trennungen: einen Hof in Papier gegen die
               Salbeifläche und eine dünne Tintenkontur gegen den Hof. */
            if (!isActive) {
              return (
                <g key={project.slug}>
                  <circle cx={x} cy={y} r={13} fill="var(--color-paper)" />
                  {/* Voll deckend statt transparent: bei 8 px Radius wäre ein
                      abgeblendeter Kategorieton nicht mehr unterscheidbar. Die
                      Rangfolge macht die Größe, nicht die Deckkraft. */}
                  <circle cx={x} cy={y} r={8} fill={marker} />
                </g>
              );
            }

            return (
              <g key={project.slug}>
                <circle cx={x} cy={y} r={30} fill="none" stroke={marker} strokeWidth={2} opacity={0.4} />
                <circle cx={x} cy={y} r={20} fill="var(--color-paper)" />
                <circle
                  cx={x}
                  cy={y}
                  r={13}
                  fill={marker}
                  stroke="var(--color-ink)"
                  strokeWidth={2}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="mt-3 text-[length:var(--text-label)] leading-[1.45] text-[var(--color-muted)]">
        {attribution}
      </figcaption>
    </figure>
  );
}
