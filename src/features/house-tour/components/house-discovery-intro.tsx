"use client";

import { CheckCircle2, MousePointer2, Search } from "lucide-react";
import { Label } from "@/components/ui/label";

export function HouseDiscoveryIntro({
  completedObjects,
  totalObjects
}: {
  completedObjects: number;
  totalObjects: number;
}) {
  return (
    <section className="flex h-full min-h-0 flex-col justify-center overflow-y-auto bg-white px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-lg">
        <Label size="dense">Interaktiver Lebensraum-Check</Label>
        <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
          Entdecke die Geschichten in deinem Zuhause.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
          Wähle direkt im Haus einen Raum. Darin führen dich alltägliche Gegenstände Schritt für Schritt zu ihren Verbindungen mit Lebensräumen und Biodiversität.
        </p>

        <ol className="mt-7 grid gap-3" aria-label="So funktioniert der Lebensraum-Check">
          {[
            { icon: MousePointer2, title: "Raum wählen", copy: "Klicke direkt auf einen Raum im Haus." },
            { icon: Search, title: "Objekt entdecken", copy: "Das nächste Objekt leuchtet dezent auf." },
            { icon: CheckCircle2, title: "Zusammenhang verstehen", copy: "Eine kurze Frage zeigt die ökologische Verbindung." }
          ].map(({ icon: Icon, title, copy }, index) => (
            <li key={title} className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] p-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
                <Icon className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  <span className="mr-1.5 text-[var(--color-muted)]">{index + 1}.</span>
                  {title}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-[var(--color-muted)]">{copy}</p>
              </div>
            </li>
          ))}
        </ol>

        {completedObjects > 0 && (
          <p className="mt-6 text-xs font-semibold text-[var(--color-forest)]">
            {completedObjects} von {totalObjects} Objekten bereits bearbeitet
          </p>
        )}
      </div>
    </section>
  );
}
