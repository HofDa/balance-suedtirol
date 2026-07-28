"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Check, SlidersHorizontal } from "lucide-react";
import { ProjectCardView } from "@/components/projects/project-card-view";
import type { Project, ProjectStatus } from "@/types/project";
import type { Locale } from "@/config/site";
import { chipClass } from "@/components/ui/chip";
import { focusRing } from "@/components/ui/focus";
import { withViewTransition } from "@/lib/view-transition";
import { Button } from "@/components/ui/button";
import type { ProjectCategoryId } from "@/config/project-categories";
import { ProjectCategoryIcon } from "./project-category";
import type { getTranslations } from "@/config/translations";

interface ProjectListClientProps {
  projects: Project[];
  locale: Locale;
  categories: Array<{ id: ProjectCategoryId; label: string }>;
  allCategoryLabel: string;
  copy: ReturnType<typeof getTranslations>["projectsPage"];
  cardCopy: { view: string; status: string; mainSponsor: string; placeholder: string; partner: string };
  categoryLabels: Record<ProjectCategoryId, string>;
}

type CrowdfundingFilter = "all" | "open" | "funded";
type ProjectPhase = "planning" | "implementation" | "monitoring" | "completed";

const statusToPhase: Record<ProjectStatus, ProjectPhase> = {
  "support-needed": "planning",
  "in-progress": "implementation",
  monitoring: "monitoring",
  completed: "completed"
};

export function ProjectListClient({
  projects,
  locale,
  categories,
  allCategoryLabel,
  copy,
  cardCopy,
  categoryLabels
}: ProjectListClientProps) {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("kategorie") || searchParams.get("thema");
  const initialCategory = categories.some(({ id }) => id === requestedCategory) ? requestedCategory as ProjectCategoryId : "all";

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategoryId | "all">(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "all">("all");
  const [selectedCrowdfunding, setSelectedCrowdfunding] = useState<CrowdfundingFilter>("all");
  const [selectedPhase, setSelectedPhase] = useState<ProjectPhase | "all">("all");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" ||
        project.categoryIds.includes(selectedCategory);

      const matchesStatus =
        selectedStatus === "all" ||
        project.status === selectedStatus;

      const matchesCrowdfunding =
        selectedCrowdfunding === "all" ||
        (selectedCrowdfunding === "open" ? project.funded < project.goal : project.funded >= project.goal);

      const matchesPhase =
        selectedPhase === "all" ||
        statusToPhase[project.status] === selectedPhase;

      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.municipality.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesCrowdfunding && matchesPhase && matchesSearch;
    });
  }, [projects, selectedCategory, selectedStatus, selectedCrowdfunding, selectedPhase, searchQuery]);

  const statuses = Object.entries(copy.statuses) as Array<[ProjectStatus, string]>;
  const phases = Object.entries(copy.phases) as Array<[ProjectPhase, string]>;
  const advancedFilterCount = Number(selectedStatus !== "all") + Number(selectedCrowdfunding !== "all") + Number(selectedPhase !== "all");
  const hasActiveFilters = selectedCategory !== "all" || advancedFilterCount > 0 || searchQuery.length > 0;

  return (
    <div className="mt-10">
      <div>
        <div className="mb-5">
          <h2 className="text-lg font-semibold tracking-[-0.01em] text-[var(--color-ink)]">{copy.filterTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{copy.filterCopy}</p>
        </div>

        <div
          className="flex max-w-full flex-wrap items-center gap-2"
          aria-label={copy.filterTitle}
        >
          {[{ id: "all" as const, label: allCategoryLabel }, ...categories].map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() =>
                  withViewTransition(() =>
                    setSelectedCategory(cat.id === selectedCategory ? "all" : cat.id)
                  )
                }
                aria-pressed={isActive}
                className={chipClass({
                  active: isActive,
                  className: `min-h-9 cursor-pointer whitespace-nowrap rounded-full px-3 text-[11px] ${
                    isActive ? "" : "bg-[var(--color-paper)]"
                  }`
                })}
              >
                {isActive && <Check className="size-3.5" />}
                {cat.id !== "all" ? <ProjectCategoryIcon categoryId={cat.id} /> : null}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" aria-hidden />
            <label htmlFor="project-search" className="sr-only">{copy.search}</label>
            <input
              id="project-search"
              type="search"
              placeholder={copy.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white py-2 pl-10 pr-4 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)] transition focus:border-[var(--color-forest)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]/20"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowMoreFilters((isOpen) => !isOpen)}
            aria-expanded={showMoreFilters}
            aria-controls="project-advanced-filters"
            className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-4 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-forest)]/45 hover:bg-[var(--color-paper)] sm:w-auto ${focusRing}`}
          >
            <SlidersHorizontal className="size-4 text-[var(--color-muted)]" aria-hidden />
            {copy.moreFilters}
            {advancedFilterCount > 0 ? (
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-[var(--color-forest)] text-[11px] text-white">
                {advancedFilterCount}
              </span>
            ) : null}
          </button>
        </div>

        {/* Immer im DOM, damit das Aufklappen eine Höhe zu animieren hat und
            `aria-controls` auf ein existierendes Element zeigt. */}
        <div className="reveal-panel" data-open={showMoreFilters}>
          <div id="project-advanced-filters" hidden={!showMoreFilters}>
            <div className="mt-3 grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/70 p-4 sm:grid-cols-3">
            <label className="text-xs font-semibold text-[var(--color-muted)]">
              <span className="mb-1.5 block">{copy.statusFilter}</span>
              <select
                value={selectedStatus}
                onChange={(event) =>
                  withViewTransition(() => setSelectedStatus(event.target.value as ProjectStatus | "all"))
                }
                className={`min-h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-white px-3 text-sm text-[var(--color-ink)] ${focusRing}`}
              >
                <option value="all">{copy.allStatuses}</option>
                {statuses.map(([status, label]) => (
                  <option key={status} value={status}>{label}</option>
                ))}
              </select>
            </label>

            <label className="text-xs font-semibold text-[var(--color-muted)]">
              <span className="mb-1.5 block">{copy.crowdfunding}</span>
              <select
                value={selectedCrowdfunding}
                onChange={(event) =>
                  withViewTransition(() => setSelectedCrowdfunding(event.target.value as CrowdfundingFilter))
                }
                className={`min-h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-white px-3 text-sm text-[var(--color-ink)] ${focusRing}`}
              >
                <option value="all">{copy.allCrowdfunding}</option>
                <option value="open">{copy.crowdfundingOpen}</option>
                <option value="funded">{copy.crowdfundingFunded}</option>
              </select>
            </label>

            <label className="text-xs font-semibold text-[var(--color-muted)]">
              <span className="mb-1.5 block">{copy.phase}</span>
              <select
                value={selectedPhase}
                onChange={(event) =>
                  withViewTransition(() => setSelectedPhase(event.target.value as ProjectPhase | "all"))
                }
                className={`min-h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-white px-3 text-sm text-[var(--color-ink)] ${focusRing}`}
              >
                <option value="all">{copy.allPhases}</option>
                {phases.map(([phase, label]) => (
                  <option key={phase} value={phase}>{label}</option>
                ))}
              </select>
            </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs font-semibold text-[var(--color-muted)]">
        <span className="tabular-nums" aria-live="polite">
          {filteredProjects.length} {filteredProjects.length === 1 ? copy.result : copy.results}
        </span>
        {hasActiveFilters && (
          <button
            onClick={() =>
              withViewTransition(() => {
                setSelectedCategory("all");
                setSelectedStatus("all");
                setSelectedCrowdfunding("all");
                setSelectedPhase("all");
                setSearchQuery("");
              })
            }
            className={`min-h-11 text-[var(--color-forest)] underline hover:text-[var(--color-ink)] cursor-pointer ${focusRing}`}
          >
            {copy.reset}
          </button>
        )}
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCardView
              key={project.slug}
              transitionName={`project-${project.slug}`}
              project={project}
              locale={locale}
              categoryLabels={categoryLabels}
              copy={{
                view: cardCopy.view,
                status: cardCopy.status,
                statusValue: copy.statuses[project.status],
                mainSponsor: cardCopy.mainSponsor,
                placeholder: cardCopy.placeholder,
                partner: cardCopy.partner
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-[var(--radius-xl)] border border-dashed border-[var(--color-line)] p-12 text-center">
          <p className="text-base font-semibold text-[var(--color-ink)]">{copy.empty}</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {copy.emptyHint}
          </p>
          <Button
            onClick={() =>
              withViewTransition(() => {
                setSelectedCategory("all");
                setSelectedStatus("all");
                setSelectedCrowdfunding("all");
                setSelectedPhase("all");
                setSearchQuery("");
              })
            }
            className="mt-5 bg-[var(--color-forest)] text-xs font-bold"
          >
            {copy.showAll}
          </Button>
        </div>
      )}
    </div>
  );
}
