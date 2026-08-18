"use client";

import { memo } from "react";
import type { RoomId } from "../model/types";
import { HouseVisual } from "./house-visual";

interface HouseOverviewProps {
  onRoom: (id: RoomId) => void;
  answers?: Record<string, string>;
  skippedQuestions?: Record<string, boolean>;
  activeRoom?: RoomId | null;
}

export const HouseOverview = memo(function HouseOverview({
  onRoom,
  answers = {},
  skippedQuestions = {},
  activeRoom = null
}: HouseOverviewProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <HouseVisual
        activeRoom={activeRoom}
        answers={answers}
        skippedQuestions={skippedQuestions}
        onSelectRoom={onRoom}
      />
    </div>
  );
});
