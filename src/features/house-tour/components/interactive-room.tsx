"use client";

import { useState } from "react";
import type { TourRoom } from "../model/types";
import { RegisteredHouseScene } from "./registered-house-scene";

export function InteractiveRoom({ room, questionIndex, answers, skippedQuestions, onSelectObject }: {
  room: TourRoom; questionIndex: number; answers: Record<string, string>; skippedQuestions: Record<string, boolean>; onSelectObject: (index: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = room.questions[hovered ?? questionIndex];
  return (
    <div className="relative flex min-h-0 flex-1 flex-col md:px-6 md:pb-4">
      <div className="min-h-0 flex-1">
        <RegisteredHouseScene roomId={room.id} questionIndex={questionIndex} answers={answers}
          skippedQuestions={skippedQuestions} onSelectObject={(_, index) => onSelectObject(index)} onHoverObject={setHovered} />
      </div>
      <p className="mt-3 hidden shrink-0 text-center text-sm font-semibold text-[var(--color-forest)] md:block">{shown?.sceneLabel} <span className="font-normal text-[var(--color-muted)]">· antippen & entdecken</span></p>
    </div>
  );
}
