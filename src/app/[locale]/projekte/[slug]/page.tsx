import { notFound } from "next/navigation";
import { getProjects, projects } from "@/data/projects";
import { isLocale } from "@/config/site";
import { ProjectDetail } from "@/components/projects/project-detail";

export function generateStaticParams() {
  return projects.flatMap((project) => ["de", "it", "en"].map((locale) => ({ locale, slug: project.slug })));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const localizedProjects = getProjects(locale);
  const project = localizedProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  const otherProjects = localizedProjects.filter((item) => item.slug !== project.slug);

  return <ProjectDetail project={project} otherProjects={otherProjects} locale={locale} />;
}
