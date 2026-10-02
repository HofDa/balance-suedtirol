"use client";

import { useState } from "react";
import type { TourRoom } from "../model/types";
import { RegisteredHouseScene } from "./registered-house-scene";
import { useTourI18n } from "../i18n/context";

export function InteractiveRoom({ room, questionIndex, answers, adjustments, skippedQuestions, onSelectObject }: {
  room: TourRoom; questionIndex: number; answers: Record<string, string>; adjustments: Record<string, number>; skippedQuestions: Record<string, boolean>; onSelectObject: (index: number) => void;
}) {
  const { t } = useTourI18n();
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = room.questions[hovered ?? questionIndex];
  return (
    <div className="relative flex min-h-0 flex-1 flex-col md:px-6 md:pb-4">
      <div className="min-h-0 flex-1">
        <RegisteredHouseScene roomId={room.id} questionIndex={questionIndex} answers={answers} adjustments={adjustments}
          skippedQuestions={skippedQuestions} onSelectObject={(_, index) => onSelectObject(index)} onHoverObject={setHovered} />
      </div>
      <p className="mt-3 hidden shrink-0 text-center text-sm font-semibold text-[var(--color-forest)] md:block">{shown?.sceneLabel} <span className="font-normal text-[var(--color-muted)]">· {t.scene.tapHint}</span></p>
    </div>
  );
}
