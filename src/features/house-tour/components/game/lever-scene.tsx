"use client";

import type { CSSProperties } from "react";
import { withBasePath } from "@/lib/public-path";
import { cn } from "@/lib/utils";
import layout from "../../config/full-house-layout.json";
import { getRoom } from "../../config/rooms";
import type { RoomId } from "../../model/types";
import { ObjectEffect } from "../object-effects";
import { objectImage } from "./knowledge-card";

/** Rand um den Gegenstand, damit Dampf, Licht und Abgas noch ins Bild passen. */
const PADDING = 0.45;

/**
 * Ein Ausschnitt des Hauses um einen Gegenstand: dasselbe Gemälde, derselbe
 * Ausschnitt, dieselben Effekte wie im Raum. Im Was-wäre-wenn zeigt er die
 * hypothetische Antwort — die Dusche tropft weniger, das Abgas verschwindet —
 * und der Impuls beim Umschalten kommt vom selben Bauteil wie in der Tour.
 */
export function LeverScene({
  questionId,
  roomId,
  answer,
  adjustments,
  caption,
  highlight = false,
  className
}: {
  questionId: string;
  roomId: RoomId;
  answer: string;
  adjustments: Record<string, number>;
  /** Welche Antwort die Szene gerade zeigt, damit der Zustand nicht nur am Schalter steht. */
  caption?: string;
  highlight?: boolean;
  className?: string;
}) {
  const object = layout.objects.find((item) => item.id === questionId);
  const crop = layout.rooms[roomId as keyof typeof layout.rooms];
  const question = getRoom(roomId)?.questions.find((item) => item.id === questionId);
  if (!object || !crop || !question) return null;

  const [x, y, w, h] = object.box;
  const [rx, ry, rw, rh] = crop;
  // Quadratischer Ausschnitt um den Gegenstand, so weit wie möglich im Raum.
  const side = Math.min(Math.max(w, h) * (1 + PADDING * 2), Math.min(rw, rh));
  const cx = x + w / 2;
  const cy = y + h / 2;
  const vx = Math.min(Math.max(cx - side / 2, rx), rx + rw - side);
  const vy = Math.min(Math.max(cy - side / 2, ry), ry + rh - side);
  const box = (left: number, top: number, width: number, height: number): CSSProperties => ({
    left: `${((left - vx) / side) * 100}%`,
    top: `${((top - vy) / side) * 100}%`,
    width: `${(width / side) * 100}%`,
    height: `${(height / side) * 100}%`
  });

  return (
    <div
      aria-hidden
      className={cn("relative isolate aspect-square overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-stone)] [container-type:size]", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBasePath(`/images/house-tour/full-house/rooms/${roomId}.webp`)}
        alt=""
        className="pointer-events-none absolute max-w-none select-none"
        style={box(rx, ry, rw, rh)}
      />
      <span className="absolute" style={box(x, y, w, h)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={objectImage(questionId)} alt="" className="pointer-events-none block h-full w-full max-w-none select-none" />
        <ObjectEffect id={questionId} question={question} answer={answer} adjustments={adjustments} />
      </span>
      {caption && (
        <span
          className={cn(
            "absolute bottom-1 left-1 rounded-[var(--radius-sm)] px-1.5 py-0.5 text-[11px] font-semibold leading-4 transition-colors",
            highlight ? "bg-[var(--color-forest)] text-white" : "bg-white/90 text-[var(--color-ink)]"
          )}
        >
          {caption}
        </span>
      )}
    </div>
  );
}
