import type { Project } from "@/types/project";
import type { Locale } from "@/config/site";
import { getTranslations } from "@/config/translations";
import { getProjectCategories, type ProjectCategoryId } from "@/config/project-categories";
import { ProjectCardView } from "./project-card-view";

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const translations = getTranslations(locale);
  const categoryLabels = Object.fromEntries(
    getProjectCategories(locale).map(({ id, label }) => [id, label])
  ) as Record<ProjectCategoryId, string>;

  return (
    <ProjectCardView
      project={project}
      locale={locale}
      categoryLabels={categoryLabels}
      copy={{
        view: translations.card.view,
        status: translations.card.status,
        statusValue: translations.projectsPage.statuses[project.status],
        mainSponsor: translations.card.mainSponsor,
        placeholder: translations.card.placeholder,
        partner: translations.card.partner
      }}
    />
  );
}
