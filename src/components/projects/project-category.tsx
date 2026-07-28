import {
  Building2,
  Droplets,
  Flower2,
  Mountain,
  Sprout,
  Trees,
  Waves
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getProjectCategoryVisual,
  type ProjectCategoryId
} from "@/config/project-categories";

const icons = {
  "cultural-landscapes": Sprout,
  forests: Trees,
  waters: Waves,
  wetlands: Droplets,
  "meadows-dry-grasslands": Flower2,
  "alpine-habitats": Mountain,
  "settlement-areas": Building2
} satisfies Record<ProjectCategoryId, typeof Sprout>;

export function ProjectCategoryIcon({
  categoryId,
  className
}: {
  categoryId: ProjectCategoryId;
  className?: string;
}) {
  const Icon = icons[categoryId];
  return <Icon className={cn("size-3.5 shrink-0", className)} aria-hidden />;
}

export function ProjectCategoryBadge({
  categoryId,
  label,
  className
}: {
  categoryId: ProjectCategoryId;
  label: string;
  className?: string;
}) {
  const visual = getProjectCategoryVisual(categoryId);

  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center gap-1.5 rounded-[var(--radius-sm)] px-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink)]",
        className
      )}
      style={{ backgroundColor: visual.surface }}
    >
      <ProjectCategoryIcon categoryId={categoryId} />
      {label}
    </span>
  );
}

export function ProjectCategoryMarker({
  categoryId,
  className
}: {
  categoryId: ProjectCategoryId;
  className?: string;
}) {
  const visual = getProjectCategoryVisual(categoryId);
  return (
    <span
      className={cn("pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px]", className)}
      style={{ backgroundColor: visual.marker }}
      aria-hidden
    />
  );
}
