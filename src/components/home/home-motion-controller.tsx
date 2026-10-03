"use client";

import { useEffect } from "react";

export function HomeMotionController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home-page]");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-home-reveal]")
    );
    root.classList.add("home-motion-ready");
    const syncVisibility = () => {
      if (document.hidden) root.style.setProperty("--home-page-play-state", "paused");
      else root.style.removeProperty("--home-page-play-state");
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          element.style.setProperty("--home-scene-play-state", entry.isIntersecting ? "running" : "paused");
          if (!entry.isIntersecting) continue;
          element.dataset.homeVisible = "true";
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" }
    );

    for (const item of items) observer.observe(item);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      root.style.removeProperty("--home-page-play-state");
    };
  }, []);

  return null;
}
