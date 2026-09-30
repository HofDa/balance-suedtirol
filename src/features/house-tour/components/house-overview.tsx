"use client";

import { memo, type RefObject } from "react";
import type { RoomId } from "../model/types";
import { IllustratedHouse } from "./illustrated-house";

interface HouseOverviewProps {
  celebratedRooms: RefObject<Set<RoomId>>;
  onRoom: (id: RoomId, questionIndex?: number) => void;
  answers?: Record<string, string>;
  skippedQuestions?: Record<string, boolean>;
}

export const HouseOverview = memo(function HouseOverview({
  onRoom,
  celebratedRooms,
  answers = {},
  skippedQuestions = {}
}: HouseOverviewProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <IllustratedHouse
        answers={answers}
        skippedQuestions={skippedQuestions}
        onRoom={onRoom}
        celebratedRooms={celebratedRooms}
      />
    </div>
  );
});
