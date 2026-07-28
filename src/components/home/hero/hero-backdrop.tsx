import Image from "next/image";
import { heroImage } from "@/config/hero";

/**
 * Server-rendered hero image. The restrained CSS scale preserves depth without
 * shipping a scroll-animation runtime on the landing page.
 */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <div className="relative -top-[10%] h-[120%] w-full">
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={heroImage.blurDataURL}
          className="hero-image object-cover object-[62%_center] sm:object-[58%_center]"
        />
      </div>

      {/* Grundverlauf: unten kräftig für die Textspalte, oben rechts bleibt das Foto frei. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,44,35,0.96)_0%,rgba(18,44,35,0.7)_47%,rgba(18,44,35,0.2)_78%,rgba(18,44,35,0.36)_100%)] sm:bg-[linear-gradient(100deg,rgba(18,44,35,0.94)_0%,rgba(18,44,35,0.72)_44%,rgba(18,44,35,0.2)_72%,rgba(18,44,35,0.08)_100%)]" />

      {/* Nur mobil: Zusaetzlicher Verlauf */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,44,35,0.56)_0%,rgba(18,44,35,0.52)_38%,rgba(18,44,35,0.24)_56%,transparent_70%)] sm:hidden" />
    </div>
  );
}
