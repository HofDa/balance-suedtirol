"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { RoomId } from "../model/types";
import { HouseVisual } from "../components/house-visual";

interface SceneProps {
  roomId: RoomId;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  onSelectObject: (questionIndex: number) => void;
}

export const RoomScene = memo(function RoomScene({ roomId, answers, skippedQuestions, onSelectObject }: SceneProps) {
  return (
    <motion.div
      layoutId={`room-frame-${roomId}`}
      className="relative h-full w-full overflow-hidden bg-[var(--color-stone)]"
      aria-label={`Visualisierung für ${roomId}`}
    >
      <HouseVisual
        activeRoom={roomId}
        answers={answers}
        skippedQuestions={skippedQuestions}
        onSelectObject={onSelectObject}
      />
    </motion.div>
  );
});
