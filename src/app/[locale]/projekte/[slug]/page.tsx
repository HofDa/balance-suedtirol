import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, projects } from "@/data/projects";
import { isLocale, locales } from "@/config/site";
import { ProjectDetail } from "@/components/projects/project-detail";
import { absoluteSiteUrl, localizedAlternates } from "@/lib/site-metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProjects(locale).find((item) => item.slug === slug);
  if (!project) notFound();

  const url = absoluteSiteUrl(`/${locale}/projekte/${slug}`);
  const image = absoluteSiteUrl(project.image);

  return {
    title: project.title,
    description: project.summary,
    alternates: localizedAlternates(locale, `/projekte/${slug}`),
    openGraph: {
      type: "website",
      siteName: "b*alance",
      title: project.title,
      description: project.summary,
      url,
      locale: { de: "de_IT", it: "it_IT", en: "en_GB" }[locale],
      images: [{ url: image, alt: `${project.title}, ${project.municipality}` }]
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [image]
    }
  };
}

export function generateStaticParams() {
  return projects.flatMap((project) => locales.map((locale) => ({ locale, slug: project.slug })));
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
