"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { RoomId } from "../model/types";
import { IllustratedRoom } from "../components/illustrated-house";
import { useTourI18n } from "../i18n/context";

interface SceneProps {
  roomId: RoomId;
  questionIndex: number;
  answers: Record<string, string>;
  adjustments: Record<string, number>;
  skippedQuestions: Record<string, boolean>;
  onSelectObject: (questionIndex: number) => void;
  zoom?: boolean;
}

export const RoomScene = memo(function RoomScene({ roomId, questionIndex, answers, adjustments, skippedQuestions, onSelectObject, zoom = false }: SceneProps) {
  const { t, room } = useTourI18n();
  return (
    <motion.div
      layoutId={`room-frame-${roomId}`}
      className="relative h-full w-full overflow-hidden bg-[var(--color-stone)]"
      aria-label={t.scene.visualization(room(roomId)?.title ?? roomId)}
    >
      <IllustratedRoom
        roomId={roomId}
        questionIndex={questionIndex}
        answers={answers}
        adjustments={adjustments}
        skippedQuestions={skippedQuestions}
        onSelectObject={onSelectObject}
        zoom={zoom}
      />
    </motion.div>
  );
});
