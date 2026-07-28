import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { focusRingTool } from "./focus";

const variants = {
  primary: "bg-[var(--color-ink)] text-white hover:bg-[var(--color-forest)]",
  accent: "min-h-12 bg-[var(--color-accent)] px-6 text-[var(--color-ink)] hover:bg-[var(--color-accent-hover)]",
  quiet: "bg-transparent px-3 text-[var(--color-forest)] hover:bg-[var(--color-ink)]/5"
} as const;

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] px-5 py-2.5 text-sm font-semibold transition-colors duration-[var(--duration-state)] ease-[var(--ease-state)] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        focusRingTool,
        className
      )}
      {...props}
    />
  );
}
