"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Das Mobilmenü als `<details>`: öffnet ohne JavaScript. Die Kopfzeile bleibt
 * bei Client-Navigation aber gemountet, also bliebe das Menü nach einem Tipp
 * auf einen Link offen. Hier schließt es sich beim Tipp auf einen Link (auch
 * bei Sprungmarken auf derselben Seite), beim Seitenwechsel, beim Tipp
 * daneben und mit Escape.
 */
export function MobileMenu({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const close = () => {
      if (ref.current) ref.current.open = false;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && ref.current?.open) {
        close();
        ref.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <details
      ref={ref}
      className={className}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) event.currentTarget.open = false;
      }}
    >
      {children}
    </details>
  );
}
