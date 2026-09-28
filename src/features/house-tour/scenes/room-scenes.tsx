"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { RoomId } from "../model/types";
import { IllustratedRoom } from "../components/illustrated-house";

interface SceneProps {
  roomId: RoomId;
  questionIndex: number;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  onSelectObject: (questionIndex: number) => void;
}

export const RoomScene = memo(function RoomScene({ roomId, questionIndex, answers, skippedQuestions, onSelectObject }: SceneProps) {
  return (
    <motion.div
      layoutId={`room-frame-${roomId}`}
      className="relative h-full w-full overflow-hidden bg-[var(--color-stone)]"
      aria-label={`Visualisierung für ${roomId}`}
    >
      <IllustratedRoom
        roomId={roomId}
        questionIndex={questionIndex}
        answers={answers}
        skippedQuestions={skippedQuestions}
        onSelectObject={onSelectObject}
      />
    </motion.div>
  );
});
