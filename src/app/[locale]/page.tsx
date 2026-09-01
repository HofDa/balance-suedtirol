import { notFound } from "next/navigation";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { NewsEvents } from "@/components/home/news-events";
import { Achievements } from "@/components/home/achievements";
import { PlatformPartners, SciencePartners } from "@/components/home/partners";
import { ImpactBridge } from "@/components/home/impact-bridge";
import { HomeMotionController } from "@/components/home/home-motion-controller";
import { isLocale } from "@/config/site";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div data-home-page>
      <HomeMotionController />
      <Hero locale={locale} />
      <FeaturedProjects locale={locale} />
      <NewsEvents locale={locale} />
      <Achievements locale={locale} />
      <PlatformPartners locale={locale} />
      <SciencePartners locale={locale} />
      <ImpactBridge locale={locale} />
    </div>
  );
}
