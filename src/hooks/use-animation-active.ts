"use client";

import { useEffect, useState, type RefObject } from "react";

/** Autoplay only while visible, in an active tab and with motion enabled. */
export function useAnimationActive<T extends Element>(ref: RefObject<T | null>, media = "all") {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const layout = window.matchMedia(media);
    let inView = false;
    const sync = () => setActive(inView && !document.hidden && motion.matches && layout.matches);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    layout.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      layout.removeEventListener("change", sync);
    };
  }, [ref, media]);

  return active;
}
