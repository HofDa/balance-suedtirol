import type { RoomId, TourRoom } from "../model/types";
import { bathRoom } from "./bath";
import { bedroomRoom } from "./bedroom";
import { gardenRoom } from "./garden";
import { kitchenRoom } from "./kitchen";
import { livingRoom } from "./living";
import { mobilityRoom } from "./mobility";

export const rooms: TourRoom[] = [
  bedroomRoom,
  bathRoom,
  livingRoom,
  kitchenRoom,
  mobilityRoom,
  gardenRoom
];

export const availableRooms = rooms.filter((room) => room.available);
export const getRoom = (id: RoomId | null) => rooms.find((room) => room.id === id);
