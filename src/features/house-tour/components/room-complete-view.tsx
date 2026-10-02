"use client";

import { BookOpen, ChevronRight, Home, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import { useTourI18n } from "../i18n/context";
import type { LocalizedRoom } from "../i18n/localize";
import { POINTS, pointsFor, ratingOf, type Rating } from "../model/game";
import type { GuessRecord, TourRoom } from "../model/types";
import { objectImage } from "./game/knowledge-card";

const chipTone: Record<Rating, string> = {
  spot: "bg-[var(--color-forest)] text-white",
  quizRight: "bg-[var(--color-forest)] text-white",
  close: "bg-[var(--color-sage)] text-[var(--color-forest)]",
  off: "bg-[var(--color-stone)] text-[var(--color-ink)]",
  quizWrong: "bg-[var(--color-stone)] text-[var(--color-ink)]"
};

/**
 * Raumabschluss als Runde im Rückblick: was entdeckt wurde, wie die Tipps
 * saßen, welche Karten gesammelt sind. Die Bilanz steht hier bewusst nicht
 * mehr; sie kommt am Ende mit den Hebeln, wo man mit ihr etwas anfangen kann.
 */
export function RoomCompleteView({
  room,
  answers,
  guesses,
  cardsRead,
  nextRoom,
  allComplete,
  reduceMotion,
  onResults,
  onNextRoom,
  onHouse
}: {
  room: TourRoom | LocalizedRoom;
  answers: Record<string, string>;
  guesses: Record<string, GuessRecord>;
  cardsRead: Record<string, true>;
  nextRoom?: TourRoom;
  allComplete: boolean;
  reduceMotion: boolean | null;
  onResults: () => void;
  onNextRoom: () => void;
  onHouse: () => void;
}) {
  const { t } = useTourI18n();
  const completion = "completion" in room ? room.completion : room.description;
  const rows = room.questions.map((question) => {
    const answered = Boolean(answers[question.id]);
    const rating = ratingOf(guesses[question.id], question.id);
    const read = Boolean(cardsRead[question.id]);
    const points = (answered ? POINTS.found : 0) + pointsFor(rating) + (read ? POINTS.card : 0);
    return { question, answered, rating, read, points };
  });
  const roomPoints = rows.reduce((sum, row) => sum + row.points, 0);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex min-h-full max-w-lg flex-col justify-center pb-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-[-0.025em]">{t.roomComplete.title(room.title)}</h2>
        <motion.span
          initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 18, delay: reduceMotion ? 0 : 0.2 }}
          className="shrink-0 text-sm font-semibold tabular-nums text-[var(--color-forest)]"
        >
          +{roomPoints} {t.pointsShort}
        </motion.span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{completion}</p>

      <ul className="mt-5 grid gap-1.5">
        {rows.map(({ question, answered, rating, read }, index) => (
          <motion.li
            key={question.id}
            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.25 + index * 0.08, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-14 items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white px-2.5 py-1.5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={objectImage(question.id)} alt="" className="size-10 shrink-0 object-contain" />
            <span className="min-w-0 flex-1 truncate text-sm font-semibold">{question.sceneLabel}</span>
            {!answered ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-muted)]">
                <SkipForward className="size-3" aria-hidden />
                {t.roomComplete.skipped}
              </span>
            ) : rating ? (
              <span className={cn("rounded-[var(--radius-sm)] px-2 py-0.5 text-[11px] font-semibold", chipTone[rating])}>
                {t.ratings[rating]}
              </span>
            ) : null}
            <BookOpen
              className={cn("size-4 shrink-0", read ? "text-[var(--color-forest)]" : "text-[var(--color-ink)]/20")}
              aria-label={read ? t.roomComplete.cardRead : t.roomComplete.cardUnread}
            />
          </motion.li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={allComplete ? onResults : onNextRoom}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-ink)]",
            focusRingTool
          )}
        >
          {allComplete ? t.roomComplete.toResults : t.roomComplete.next(nextRoom?.title ?? t.roomComplete.nextFallback)}
          <ChevronRight className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={onHouse}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-4 text-sm font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-ink)]/5",
            focusRingTool
          )}
        >
          <Home className="size-4" aria-hidden />
          {t.roomComplete.viewHouse}
        </button>
      </div>
    </motion.div>
  );
}
