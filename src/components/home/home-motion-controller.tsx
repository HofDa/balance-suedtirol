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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.homeVisible = "true";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" }
    );

    for (const item of items) observer.observe(item);

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
