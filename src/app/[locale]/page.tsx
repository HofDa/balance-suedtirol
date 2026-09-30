import { notFound } from "next/navigation";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { BiodiversityRichness } from "@/components/home/biodiversity-richness";
import { EcosystemServices } from "@/components/home/ecosystem-services";
import { HabitatLoss } from "@/components/home/habitat-loss";
import { BalanceModel } from "@/components/home/balance-model";
import { HouseIntro } from "@/components/home/house-intro";
import { NewsEvents } from "@/components/home/news-events";
import { Achievements } from "@/components/home/achievements";
import { Partners } from "@/components/home/partners";
import { ImpactBridge } from "@/components/home/impact-bridge";
import { HomeMotionController } from "@/components/home/home-motion-controller";
import { isLocale } from "@/config/site";

/**
 * Die Startseite erzählt linear: Was Südtirol besitzt, was es leistet, was
 * verloren geht, welche Projekte dagegen arbeiten, was dort schon entstanden
 * ist und was gerade passiert. Danach der Lebensraum-Check als Einladung, wie
 * b*alance funktioniert (und warum das auch wirtschaftlich zählt), wer die
 * Plattform trägt – und der Abschluss mit der CO₂-Haltung.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div data-home-page>
      <HomeMotionController />
      <Hero locale={locale} />
      <BiodiversityRichness locale={locale} />
      <EcosystemServices locale={locale} />
      <HabitatLoss locale={locale} />
      <FeaturedProjects locale={locale} />
      <Achievements locale={locale} />
      <NewsEvents locale={locale} />
      <HouseIntro locale={locale} />
      <BalanceModel locale={locale} />
      <Partners locale={locale} />
      <ImpactBridge locale={locale} />
    </div>
  );
}
