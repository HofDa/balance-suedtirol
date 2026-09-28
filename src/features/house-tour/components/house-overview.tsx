"use client";

import { memo } from "react";
import type { RoomId } from "../model/types";
import { IllustratedHouse } from "./illustrated-house";

interface HouseOverviewProps {
  onRoom: (id: RoomId, questionIndex?: number) => void;
  answers?: Record<string, string>;
  skippedQuestions?: Record<string, boolean>;
  activeRoom?: RoomId | null;
}

export const HouseOverview = memo(function HouseOverview({
  onRoom,
  answers = {},
  skippedQuestions = {}
}: HouseOverviewProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <IllustratedHouse
        answers={answers}
        skippedQuestions={skippedQuestions}
        onRoom={onRoom}
      />
    </div>
  );
});
