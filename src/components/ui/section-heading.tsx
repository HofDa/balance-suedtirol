import type { ReactNode } from "react";
import { Label } from "./label";
import { textHeadline, textLead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * `toggle` nimmt einen Schalter auf, der über Eyebrow und Überschrift liegt
 * (etwa den mobilen Aufklapper der Startseite); `copyClassName` erlaubt, den
 * Lead dabei mit zu verbergen.
 */
export function SectionHeading({
  eyebrow,
  title,
  copy,
  id,
  toggle,
  copyClassName
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  id?: string;
  toggle?: ReactNode;
  copyClassName?: string;
}) {
  return (
    <div className="max-w-[62ch]">
      <div className={toggle ? "relative" : undefined}>
        <Label size="section" className="mb-3">
          {eyebrow}
        </Label>
        <h2 id={id} className={cn(textHeadline, "text-[var(--color-ink)]", toggle && "max-sm:pr-14 max-sm:hyphens-auto [hyphenate-limit-chars:12_5_5] break-words")}>
          {title}
        </h2>
        {toggle}
      </div>
      {/* 58ch statt max-w-2xl: die alte Breite lief bei 18 px auf gut 85 Zeichen. */}
      {copy ? (
        <p className={cn(textLead, "mt-5", copyClassName)}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}
