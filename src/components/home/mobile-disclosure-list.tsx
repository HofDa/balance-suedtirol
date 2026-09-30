import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { focusRing, focusRingOnDark } from "@/components/ui/focus";
import { cn } from "@/lib/utils";

/**
 * Mobil klappen Aufzählungen mit Erläuterung zu Titelzeilen zusammen: Wer die
 * Titel überfliegt, ist nach wenigen Zeilen durch, wer mehr wissen will, tippt.
 * Ab `sm` steht die Liste nicht im Baum (`sm:hidden`) – dort zeigt der
 * Abschnitt seine offene Fassung, damit auf dem Desktop kein Schalter übrig
 * bleibt, der nichts verbirgt.
 */
export function MobileDisclosureList({
  items,
  tone = "light",
  className
}: {
  items: { key: string; summary: ReactNode; body: ReactNode }[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <ul className={cn("border-b sm:hidden", dark ? "border-white/15" : "border-[var(--color-line)]", className)}>
      {items.map((item) => (
        <li key={item.key} className={cn("border-t", dark ? "border-white/15" : "border-[var(--color-line)]")}>
          <details className="group">
            <summary
              className={cn(
                "flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden",
                dark ? `text-white ${focusRingOnDark}` : `text-[var(--color-ink)] ${focusRing}`
              )}
            >
              <span className="min-w-0">{item.summary}</span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 transition-transform duration-200 group-open:rotate-180",
                  dark ? "text-[var(--color-moss)]" : "text-[var(--color-forest)]"
                )}
                aria-hidden
              />
            </summary>
            <div className={cn("pb-5 leading-7", dark ? "text-white/70" : "text-[var(--color-muted)]")}>{item.body}</div>
          </details>
        </li>
      ))}
    </ul>
  );
}
