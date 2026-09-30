"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { focusRing, focusRingOnDark } from "@/components/ui/focus";
import { cn } from "@/lib/utils";

/**
 * Mobil stehen die Abschnitte vor den Projekten nur mit Eyebrow und
 * Überschrift da; ein Tipp auf die Überschrift klappt den Abschnitt auf. So
 * erreicht man die Projekte nach gut einer Bildschirmhöhe statt nach sechs,
 * und wer die Erzählung lesen will, findet sie an ihrem Platz.
 *
 * Ab `sm` gibt es weder Schalter noch Zuklappen. Was verborgen wird, trägt
 * `hiddenWhenCollapsed` aus `mobile-collapse-classes.ts`; die Kopfzeile bleibt.
 */

const CollapseContext = createContext<{ open: boolean; toggle: () => void } | null>(null);

export function MobileCollapseSection({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby": string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const toggle = useCallback(() => {
    setOpen((current) => {
      // Beim Zuklappen weiter unten landete man sonst mitten im nächsten Abschnitt.
      if (current && ref.current && ref.current.getBoundingClientRect().top < 0) {
        requestAnimationFrame(() => ref.current?.scrollIntoView({ block: "start" }));
      }
      return !current;
    });
  }, []);

  return (
    <CollapseContext.Provider value={{ open, toggle }}>
      <section
        ref={ref}
        data-open={open}
        className={cn("group/collapse max-sm:data-[open=false]:py-10", className)}
        {...props}
      >
        {children}
      </section>
    </CollapseContext.Provider>
  );
}

/**
 * Liegt als unsichtbare Fläche über der Kopfzeile (Eltern `relative`) und
 * trägt deren Überschrift als Namen; sichtbar ist nur der Pfeil.
 */
export function MobileCollapseToggle({ labelledBy, tone = "light" }: { labelledBy: string; tone?: "light" | "dark" }) {
  const context = useContext(CollapseContext);
  if (!context) return null;
  const dark = tone === "dark";

  return (
    <button
      type="button"
      aria-expanded={context.open}
      aria-labelledby={labelledBy}
      onClick={context.toggle}
      className={cn(
        "absolute -inset-2 cursor-pointer rounded-[var(--radius-md)] sm:hidden",
        dark ? focusRingOnDark : focusRing
      )}
    >
      <span
        className={cn(
          "absolute bottom-2 right-2 grid size-10 place-items-center rounded-full border",
          dark ? "border-white/25 text-[var(--color-moss)]" : "border-[var(--color-forest)]/30 text-[var(--color-forest)]"
        )}
      >
        <ChevronDown
          className={cn("size-5 transition-transform duration-200", context.open && "rotate-180")}
          aria-hidden
        />
      </span>
    </button>
  );
}
