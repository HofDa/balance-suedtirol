import { Label } from "./label";
import { textHeadline, textLead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-[62ch]">
      <Label size="section" className="mb-3">
        {eyebrow}
      </Label>
      <h2 className={cn(textHeadline, "text-[var(--color-ink)]")}>
        {title}
      </h2>
      {/* 58ch statt max-w-2xl: die alte Breite lief bei 18 px auf gut 85 Zeichen. */}
      {copy ? (
        <p className={cn(textLead, "mt-5")}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}
