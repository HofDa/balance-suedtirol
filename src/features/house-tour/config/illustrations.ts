import type { RoomId } from "../model/types";

export const roomEntrances: Partial<Record<RoomId, [number, number]>> = {
  bath: [38, 23], bedroom: [62, 23], living: [38, 46], kitchen: [62, 46],
  mobility: [14, 42], garden: [85, 73]
};

