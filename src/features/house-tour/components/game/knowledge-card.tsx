"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Info, Lightbulb, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";
import { focusRingTool } from "@/components/ui/focus";
import { withBasePath } from "@/lib/public-path";
import { useTourI18n } from "../../i18n/context";
import { localeTags } from "@/lib/i18n";
import { hasValues, summarizeValues } from "../../model/calculator";
import type { AnnualValues, TourOption, TourQuestion } from "../../model/types";

export const objectImage = (questionId: string) =>
  withBasePath(`/images/house-tour/full-house/objects/${questionId}.webp`);

/**
 * Die Wissenskarte eines Gegenstands: die tiefe Ebene der Tour. Hier steht
 * alles, was vorher unter „Hintergrund und genaue Werte“ eingeklappt lag —
 * Wirkung, Bilanzgrenze, Rechenweg, Quelle, Tipp. Nichts davon ist neu; die
 * Karte macht es nur sammelbar und lesbar statt versteckt.
 */
export function KnowledgeCardContent({
  question,
  option,
  values,
  locale
}: {
  question: TourQuestion;
  option?: TourOption;
  values?: AnnualValues | null;
  locale: Locale;
}) {
  const { t } = useTourI18n();
  const basis = t.basis[question.id];
  return (
    <div className="grid gap-4 text-sm leading-6">
      {option && (
        <div className="rounded-[var(--radius-md)] bg-[var(--color-sage)]/45 px-3 py-2.5">
          <p className="text-xs font-semibold text-[var(--color-forest)]">{t.card.yourValues}</p>
          <p className="mt-0.5 font-semibold">{option.label}</p>
          {values && hasValues(values) && (
            <p className="mt-0.5 text-xs tabular-nums">
              {summarizeValues(values, values, localeTags[locale])}{" "}
              <span className="text-[var(--color-muted)]">{t.card.perYear}</span>
            </p>
          )}
          {option.regionalAverage && (
            <p className="mt-1.5 text-xs leading-5 text-[var(--color-muted)]">
              {option.regionalAverage.basis} {t.card.source}: {option.regionalAverage.source}.
            </p>
          )}
        </div>
      )}

      <p className="text-[var(--color-ink)]">{question.impactText}</p>
      <p className="text-[var(--color-muted)]">{question.description}</p>

      {question.scopeNote && (
        <p className="flex gap-2 text-xs leading-5 text-[var(--color-muted)]">
          <Info className="mt-0.5 size-3.5 shrink-0 text-[var(--color-forest)]" aria-hidden />
          <span>{question.scopeNote}</span>
        </p>
      )}

      {basis && (
        <div className="border-t border-[var(--color-line)] pt-3">
          <p className="text-xs font-semibold text-[var(--color-forest)]">{t.card.calculation}</p>
          <p className="mt-1 text-xs leading-5">{basis.factor}</p>
          {basis.assumption && <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{basis.assumption}</p>}
        </div>
      )}

      <div className="flex gap-2 border-t border-[var(--color-line)] pt-3">
        <Lightbulb className="mt-0.5 size-4 shrink-0 text-[var(--color-forest)]" aria-hidden />
        <p className="text-xs leading-5 text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">{t.card.tip}: </span>
          {question.tip}
        </p>
      </div>

      <Link
        href={`/${locale}/methodik`}
        className={cn(
          "inline-flex min-h-11 w-fit items-center gap-1 text-xs font-semibold text-[var(--color-forest)] underline underline-offset-2",
          focusRingTool
        )}
      >
        {t.card.method}
        <ChevronRight className="size-3.5" aria-hidden />
      </Link>
    </div>
  );
}

/**
 * Die Karte als Blatt über der Tour. Mobil bleibt dem Fragenbereich kaum
 * Höhe; ein Blatt über der ganzen Fläche ist dort die einzige Form, in der
 * sich die Karte lesen lässt, ohne in 270 px zu scrollen.
 */
export function KnowledgeSheet({
  open,
  onClose,
  title,
  imageId,
  children
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  imageId?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const { t } = useTourI18n();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  // Über eine Ref, damit ein neu erzeugtes onClose den Fokus nicht neu setzt.
  const closeHandler = useRef(onClose);
  useEffect(() => {
    closeHandler.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeHandler.current();
    };
    document.addEventListener("keydown", onKey);
    const back = returnFocus.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      back?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[var(--color-ink)]/45 sm:items-center sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="knowledge-sheet-title"
            className="relative flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-[var(--radius-xl)] bg-white shadow-[0_24px_70px_rgba(32,55,44,0.18)] sm:rounded-[var(--radius-xl)]"
            initial={reduce ? false : { y: 40, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 34 } }}
            exit={reduce ? undefined : { y: 40, opacity: 0, transition: { duration: 0.18 } }}
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3">
              {imageId && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={objectImage(imageId)} alt="" className="size-12 shrink-0 object-contain" />
              )}
              <h2 id="knowledge-sheet-title" className="min-w-0 flex-1 text-base font-semibold leading-tight tracking-[-0.02em]">
                {title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t.card.close}
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]",
                  focusRingTool
                )}
              >
                <X className="size-5" aria-hidden />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">{children}</div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
