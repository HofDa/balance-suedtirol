import { Label } from "./label";

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
      <h2 className="font-display text-balance text-[length:var(--text-headline)] leading-[var(--leading-headline)] text-[var(--color-ink)]">
        {title}
      </h2>
      {/* 58ch statt max-w-2xl: die alte Breite lief bei 18 px auf gut 85 Zeichen. */}
      {copy ? (
        <p className="mt-5 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--color-muted)]">
          {copy}
        </p>
      ) : null}
    </div>
  );
}
