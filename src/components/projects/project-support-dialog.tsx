"use client";

import { useState } from "react";
import { CheckCircle2, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";
import { chipClass } from "@/components/ui/chip";
import type { ProjectSupportCopy } from "./project-support";

export function ProjectSupportDialog({
  title,
  municipality,
  organization,
  copy,
  onClose
}: {
  title: string;
  municipality: string;
  organization: string;
  copy: ProjectSupportCopy;
  onClose: () => void;
}) {
  const [supportType, setSupportType] = useState<"donation" | "sponsorship" | "volunteering">("donation");
  const [amount, setAmount] = useState(50);
  const [hasSupported, setHasSupported] = useState(false);

  const handleSupport = (event: React.FormEvent) => {
    event.preventDefault();
    setHasSupported(true);
  };

  return (
    <div
      className="dialog-scrim fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-dialog-title"
    >
      <Surface level="sheet" className="dialog-sheet relative w-full max-w-lg shadow-[var(--shadow-panel)] sm:p-8">
        <Button
          variant="quiet"
          onClick={onClose}
          className="absolute right-5 top-5 min-h-11 min-w-11 p-0 text-[var(--color-muted)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
          aria-label={copy.close}
        >
          <X className="size-5" />
        </Button>

        <Label as="div" size="section" className="flex items-center gap-2">
          <Heart className="size-4 fill-[var(--color-forest)] text-[var(--color-forest)]" />
          <span>{copy.support}</span>
        </Label>

        <h3 id="support-dialog-title" className="mt-2 font-display text-[length:var(--text-headline)] leading-[var(--leading-headline)] text-[var(--color-ink)]">
          {title}
        </h3>
        <p className="mt-1 text-xs text-[var(--color-muted)]">{municipality} · {organization}</p>

        {hasSupported ? (
          <div className="my-10 py-8 text-center">
            <CheckCircle2 className="mx-auto size-14 text-[var(--color-forest)]" />
            <p className="mt-4 text-xl font-bold text-[var(--color-ink)]">{copy.thankYou}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{copy.thankYouCopy}</p>
          </div>
        ) : (
          <form onSubmit={handleSupport} className="mt-6 space-y-6">
            <div className="grid grid-cols-3 gap-2 rounded-[var(--radius-lg)] bg-[var(--color-paper)] p-1.5 text-xs font-bold">
              {([
                ["donation", copy.donation],
                ["sponsorship", copy.sponsorship],
                ["volunteering", copy.volunteering]
              ] as const).map(([type, label]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSupportType(type)}
                  aria-pressed={supportType === type}
                  className={chipClass({ active: supportType === type, variant: "plain", className: "w-full justify-center px-2" })}
                >
                  {label}
                </button>
              ))}
            </div>

            {supportType !== "volunteering" ? (
              <div>
                <label className="mb-2 block text-xs font-bold text-[var(--color-ink)]">{copy.amount}</label>
                <div className="mb-3 grid grid-cols-4 gap-2">
                  {[25, 50, 100, 250].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value)}
                      aria-pressed={amount === value}
                      className={chipClass({ active: amount === value, className: "w-full justify-center px-2 tabular-nums" })}
                    >
                      {value} €
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-line)] p-3 text-sm font-bold tabular-nums text-[var(--color-ink)] focus:border-[var(--color-forest)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)]/20"
                />
              </div>
            ) : (
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-4 text-xs leading-6 text-[var(--color-muted)]">
                {copy.volunteeringCopy}
              </div>
            )}

            <Button type="submit" className="w-full bg-[var(--color-forest)] font-bold hover:bg-[var(--color-ink)]">
              {copy.confirm}
            </Button>
          </form>
        )}
      </Surface>
    </div>
  );
}
