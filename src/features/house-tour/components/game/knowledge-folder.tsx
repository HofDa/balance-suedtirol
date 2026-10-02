"use client";

import { useState } from "react";
import { ChevronLeft, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/config/site";
import { focusRingTool } from "@/components/ui/focus";
import { useTourI18n } from "../../i18n/context";
import { optionValues } from "../../model/calculator";
import { allQuestions } from "../../model/game";
import { KnowledgeCardContent, KnowledgeSheet, objectImage } from "./knowledge-card";

/**
 * Die Wissensmappe: alle 18 Karten, nach Räumen. Eine Karte wird mit der
 * Antwort auf ihren Gegenstand freigeschaltet und zählt einen Punkt, sobald
 * sie gelesen ist. Gesperrte Karten zeigen ihren Gegenstand als Schatten,
 * damit man sieht, was noch zu finden ist.
 */
export function KnowledgeFolder({
  open,
  onClose,
  answers,
  adjustments,
  cardsRead,
  onReadCard,
  locale
}: {
  open: boolean;
  onClose: () => void;
  answers: Record<string, string>;
  adjustments: Record<string, number>;
  cardsRead: Record<string, true>;
  onReadCard: (questionId: string) => void;
  locale: Locale;
}) {
  const { t, rooms, question: localized } = useTourI18n();
  const [openId, setOpenId] = useState<string | null>(null);
  const selected = openId ? localized(openId) : undefined;
  const read = Object.keys(cardsRead).length;
  const close = () => {
    setOpenId(null);
    onClose();
  };

  return (
    <KnowledgeSheet
      open={open}
      onClose={close}
      title={selected ? selected.sceneLabel : `${t.folder} · ${t.folderCount(read, allQuestions.length)}`}
      imageId={selected?.id}
    >
      {selected ? (
        <>
          <button
            type="button"
            onClick={() => setOpenId(null)}
            className={cn("-mt-1 mb-2 inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-[var(--color-forest)]", focusRingTool)}
          >
            <ChevronLeft className="size-4" aria-hidden />
            {t.folder}
          </button>
          <KnowledgeCardContent
            question={selected}
            option={selected.options.find((option) => option.id === answers[selected.id])}
            values={answers[selected.id] ? optionValues(selected.id, answers[selected.id], answers, adjustments) : null}
            locale={locale}
          />
        </>
      ) : (
        <div className="grid gap-5">
          {rooms.map((room) => (
            <section key={room.id} aria-labelledby={`folder-${room.id}`}>
              <h3 id={`folder-${room.id}`} className="text-xs font-semibold text-[var(--color-muted)]">
                {room.title}
              </h3>
              <ul className="mt-2 grid grid-cols-3 gap-2">
                {room.questions.map((question) => {
                  const unlocked = Boolean(answers[question.id]);
                  const isRead = Boolean(cardsRead[question.id]);
                  return (
                    <li key={question.id}>
                      <button
                        type="button"
                        disabled={!unlocked}
                        onClick={() => {
                          setOpenId(question.id);
                          onReadCard(question.id);
                        }}
                        aria-label={t.folderCardAria(question.sceneLabel, unlocked ? (isRead ? "read" : "new") : "locked")}
                        className={cn(
                          "relative flex h-full min-h-28 w-full flex-col items-center gap-1.5 rounded-[var(--radius-lg)] border p-2 text-center transition-colors",
                          unlocked
                            ? "border-[var(--color-line)] bg-[var(--color-paper)] hover:border-[var(--color-forest)]/45"
                            : "cursor-not-allowed border-dashed border-[var(--color-line)] bg-white",
                          focusRingTool
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={objectImage(question.id)}
                          alt=""
                          className={cn("h-14 w-full object-contain", !unlocked && "opacity-25 brightness-0")}
                        />
                        <span className={cn("text-[11px] font-semibold leading-tight", !unlocked && "text-[var(--color-muted)]")}>
                          {question.sceneLabel}
                        </span>
                        {!unlocked && <Lock className="absolute right-1.5 top-1.5 size-3 text-[var(--color-muted)]" aria-hidden />}
                        {unlocked && !isRead && (
                          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[var(--color-forest)]" aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </KnowledgeSheet>
  );
}
