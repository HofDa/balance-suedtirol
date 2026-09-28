"use client";

import type { CSSProperties, ReactNode } from "react";
import { Check, SkipForward } from "lucide-react";
import { withBasePath } from "@/lib/public-path";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import layout from "../config/full-house-layout.json";
import { getRoom } from "../config/rooms";
import type { RoomId } from "../model/types";
import styles from "./interactive-room.module.css";

type SceneProps = {
  roomId?: RoomId;
  questionIndex?: number;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  onSelectObject: (room: RoomId, index: number) => void;
  onHoverObject?: (index: number | null) => void;
  children?: ReactNode;
};

/** All positions use pixels in the original house. A room is only a camera crop. */
export function RegisteredHouseScene({ roomId, questionIndex, answers, skippedQuestions, onSelectObject, onHoverObject, children }: SceneProps) {
  const crop = roomId && roomId in layout.rooms
    ? layout.rooms[roomId as keyof typeof layout.rooms]
    : [0, 0, ...layout.size];
  const [left, top, width, height] = crop;
  const items = layout.objects.filter((item) => !roomId || item.room === roomId)
    // Small foreground objects (bike, insect hotel) remain reachable over larger shapes.
    .sort((a, b) => b.box[2] * b.box[3] - a.box[2] * a.box[3]);
  const placement = ([x, y, w, h]: number[]): CSSProperties => ({
    left: `${(x - left) / width * 100}%`, top: `${(y - top) / height * 100}%`,
    width: `${w / width * 100}%`, height: `${h / height * 100}%`
  });
  const sourceImagePlacement: CSSProperties = {
    left: `${-left / width * 100}%`,
    top: `${-top / height * 100}%`,
    width: `${layout.size[0] / width * 100}%`,
    height: `${layout.size[1] / height * 100}%`
  };
  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center [container-type:size]">
      <div className="relative isolate overflow-hidden" data-house-scene={roomId ?? "house"}
        data-source-crop={crop.join(",")}
        style={{ aspectRatio: `${width} / ${height}`, width: `min(100cqw, ${width / height * 100}cqh)` }}>
        {/* Lossless source and cutouts share pixels. No object gets moved to fit a room. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath("/images/house-tour/full-house/house.webp")} alt="" draggable={false}
          className="pointer-events-none absolute max-w-none select-none" style={sourceImagePlacement} />
        {items.map((item) => {
          const room = getRoom(item.room as RoomId);
          const question = room?.questions[item.question];
          if (!question) return null;
          const active = roomId === item.room && questionIndex === item.question;
          const answered = Boolean(answers[question.id]);
          const skipped = Boolean(skippedQuestions[question.id]);
          return (
            <button key={item.id} type="button" data-object-id={item.id} data-source-box={item.box.join(",")}
              data-active={active} aria-pressed={active}
              aria-label={`${question.sceneLabel} öffnen${answered ? ", beantwortet" : skipped ? ", übersprungen" : ""}`}
              onClick={() => onSelectObject(item.room as RoomId, item.question)}
              onMouseEnter={() => onHoverObject?.(item.question)} onMouseLeave={() => onHoverObject?.(null)}
              onFocus={() => onHoverObject?.(item.question)} onBlur={() => onHoverObject?.(null)}
              style={placement(item.box)} className={cn(styles.object, "absolute m-0 cursor-pointer border-0 bg-transparent p-0", focusRingTool)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBasePath(`/images/house-tour/full-house/objects/${item.id}.webp`)} alt="" draggable={false}
                className={cn(styles.sprite, "pointer-events-none block h-full w-full max-w-none select-none")} />
              {roomId && <span className={cn("pointer-events-none absolute right-0 top-0 grid size-5 place-items-center rounded-full border border-white text-[10px] font-bold shadow-sm md:size-6", active ? "bg-[var(--color-forest)] text-white" : "bg-white text-[var(--color-forest)]")} aria-hidden>
                {answered ? <Check className="size-3" /> : skipped ? <SkipForward className="size-3" /> : item.question + 1}
              </span>}
            </button>
          );
        })}
        {children}
      </div>
    </div>
  );
}
