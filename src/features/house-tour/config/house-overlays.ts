import type { RoomId } from "../model/types";

/**
 * Placement of the furniture sprites on the isometric house canvas.
 *
 * All values are percentages of the square canvas that also holds
 * `houseempty.webp`, so a sprite keeps its position at every canvas size.
 * Usually only `width` is given and the height follows from the sprite's own
 * aspect ratio. A small number of studio cutouts use an explicit `height`
 * because their proportions differ from the matching full-house reference.
 *
 * The sprites live in `public/assets/house/cutout/` and are generated from the
 * opaque product renders in `public/assets/house/` by
 * `scripts/build-house-cutouts.py`.
 */
export type HouseSprite = {
  src: string;
  left: number;
  top: number;
  width: number;
  height?: number;
  rotate?: number;
  z: number;
};

export const houseSprites = {
  // Living room
  carpet: { src: "carpet.webp", left: 28.61, top: 77.86, width: 16.1, height: 5.2, z: 10 },
  couch: { src: "couch.webp", left: 16.37, top: 68.94, width: 12.75, z: 23 },
  sideboard: { src: "cupboard2.webp", left: 29.6, top: 70.14, width: 16.05, z: 17 },
  picture: { src: "picture.webp", left: 16.94, top: 58.45, width: 3.15, z: 12 },
  floorLamp: { src: "biglamp.webp", left: 22.45, top: 58.4, width: 5.25, z: 18 },
  suitcase: { src: "suitcase.webp", left: 31.19, top: 63.86, width: 7.75, z: 25 },
  globe: { src: "globe.webp", left: 40.38, top: 63.84, width: 4.85, z: 25 },
  tvCabinet: { src: "cupboard_tv.webp", left: 45.71, top: 76.51, width: 3.5, z: 20 },
  tv: { src: "tv.webp", left: 46.1, top: 68.83, width: 2.2, z: 26 },

  // Bathroom
  showerBath: { src: "showerbath.webp", left: 16.97, top: 27.76, width: 14.7, height: 23.1, z: 20 },
  sink: { src: "sink.webp", left: 37.05, top: 29, width: 10.55, z: 20 },
  toilet: { src: "toilet.webp", left: 32.02, top: 43.5, width: 4.1, z: 22 },

  // Bedroom
  bed: { src: "bed.webp", left: 57.76, top: 38.8, width: 18.65, z: 20 },
  closet: { src: "closet.webp", left: 77.07, top: 29.81, width: 7.1, z: 18 },
  nightstand: { src: "cupboard.webp", left: 52.2, top: 43.43, width: 4.55, z: 20 },
  bedsideLamp: { src: "lamp.webp", left: 52.87, top: 37.52, width: 3.45, z: 22 },

  // Kitchen
  kitchenWall: { src: "kitchenwall.webp", left: 51.1, top: 53.31, width: 31.4, height: 27.8, z: 4 },
  fridge: { src: "fridge.webp", left: 51.65, top: 59.16, width: 5.4, height: 23.6, z: 18 },
  diningTable: { src: "chairsanddesk.webp", left: 58.07, top: 71.88, width: 21.55, z: 25 },

  // Garage
  car: { src: "car.webp", left: 0, top: 70.45, width: 14.2, height: 9.2, z: 20 },
  bike: { src: "bike.webp", left: 6.2, top: 76.56, width: 6.5, height: 9.5, z: 25 },

  // Terrace / Garden
  gardenPlant1: { src: "plant.webp", left: 78.5, top: 85.5, width: 5.5, z: 30 },
  gardenPlant2: { src: "plant.webp", left: 83.5, top: 88.5, width: 4.5, z: 31 },
  gardenPlant3: { src: "plant.webp", left: 88, top: 84.5, width: 5, z: 30 },
  gardenPlant4: { src: "plant.webp", left: 92, top: 89.5, width: 4.25, z: 31 }
} satisfies Record<string, HouseSprite>;

export type HouseSpriteId = keyof typeof houseSprites;

export type HouseObjectDefinition = {
  /** Sprites that make the object legible when its room is opened. */
  sprites: HouseSpriteId[];
  /** Centre of the calm interaction marker on the square house canvas. */
  hotspot: { left: number; top: number };
};

/**
 * Every question is represented by one discoverable object in the house.
 * The markers also cover objects that are painted into the base illustration,
 * such as the photovoltaic panels and rainwater system.
 */
export const houseObjects = {
  "bath-shower": { sprites: ["showerBath"], hotspot: { left: 23, top: 34 } },
  "bath-water-heating": { sprites: ["sink"], hotspot: { left: 42, top: 34 } },
  "bath-toilet": { sprites: ["toilet"], hotspot: { left: 33, top: 47 } },
  "bedroom-heating": { sprites: ["bed"], hotspot: { left: 68, top: 45 } },
  "bedroom-textiles": { sprites: ["closet"], hotspot: { left: 81, top: 36 } },
  "bedroom-standby": { sprites: ["nightstand", "bedsideLamp"], hotspot: { left: 54, top: 42 } },
  "living-tv-streaming": { sprites: ["tv", "tvCabinet"], hotspot: { left: 47, top: 75 } },
  "living-lighting": { sprites: ["floorLamp", "carpet", "picture"], hotspot: { left: 25, top: 63 } },
  "living-plants": {
    sprites: ["couch", "sideboard", "suitcase", "globe"],
    hotspot: { left: 22, top: 73 }
  },
  "kitchen-diet": { sprites: ["fridge"], hotspot: { left: 78, top: 61 } },
  "kitchen-origin": { sprites: ["kitchenWall"], hotspot: { left: 64, top: 66 } },
  "kitchen-waste": { sprites: ["diningTable"], hotspot: { left: 68, top: 79 } },
  "mobility-short": { sprites: ["bike"], hotspot: { left: 11, top: 74 } },
  "mobility-km": { sprites: ["car"], hotspot: { left: 7, top: 68 } },
  "mobility-long": { sprites: [], hotspot: { left: 8, top: 62 } },
  "garden-ground": { sprites: ["gardenPlant1"], hotspot: { left: 81, top: 90 } },
  "garden-plants": { sprites: ["gardenPlant2", "gardenPlant3"], hotspot: { left: 88, top: 87 } },
  "garden-structures": { sprites: ["gardenPlant4"], hotspot: { left: 94, top: 91 } }
} satisfies Record<string, HouseObjectDefinition>;

export function objectSprites(
  questionIds: string[]
): Array<HouseSprite & { id: HouseSpriteId }> {
  const ids = new Set<HouseSpriteId>();
  for (const questionId of questionIds) {
    const object = houseObjects[questionId as keyof typeof houseObjects];
    for (const spriteId of object?.sprites ?? []) ids.add(spriteId);
  }
  return [...ids]
    .map((id) => {
      const sprite: HouseSprite = houseSprites[id];
      return { id, ...sprite };
    })
    .sort((a, b) => a.z - b.z);
}

/**
 * Furniture that belongs to a room as soon as the visitor has answered
 * anything in it, so an entered room never stays completely bare.
 */
export const roomFurniture: Partial<Record<RoomId, HouseSpriteId[]>> = {
  living: ["carpet", "couch", "sideboard", "picture", "suitcase", "globe"]
};

/**
 * What a concrete answer adds to the house. `options` limits a rule to
 * specific answers; without it the sprites appear for any answer.
 *
 */
export type OverlayRule = {
  questionId: string;
  options?: string[];
  sprites: HouseSpriteId[];
};

export const overlayRules: OverlayRule[] = [
  // Bath
  { questionId: "bath-shower", sprites: ["showerBath"] },
  { questionId: "bath-water-heating", sprites: ["sink"] },
  { questionId: "bath-toilet", sprites: ["toilet"] },

  // Bedroom
  { questionId: "bedroom-heating", sprites: ["bed"] },
  { questionId: "bedroom-textiles", sprites: ["closet"] },
  { questionId: "bedroom-standby", sprites: ["nightstand", "bedsideLamp"] },

  // Living
  { questionId: "living-tv-streaming", sprites: ["tvCabinet", "tv"] },
  { questionId: "living-lighting", sprites: ["floorLamp"] },

  // Kitchen
  { questionId: "kitchen-diet", sprites: ["kitchenWall"] },
  { questionId: "kitchen-waste", sprites: ["diningTable"] },

  // Mobility – the chosen option decides what stands in the garage
  { questionId: "mobility-short", options: ["car"], sprites: ["car"] },
  { questionId: "mobility-short", options: ["mixed"], sprites: ["car", "bike"] },
  { questionId: "mobility-short", options: ["active"], sprites: ["bike"] },
  { questionId: "mobility-km", options: ["high"], sprites: ["car"] },
  { questionId: "mobility-km", options: ["low"], sprites: ["bike"] },
  // Garden – the terrace greens up the more nature-friendly the answer is
  { questionId: "garden-ground", options: ["natural-bed"], sprites: ["gardenPlant1"] },
  { questionId: "garden-plants", options: ["ornamental"], sprites: ["gardenPlant2"] },
  { questionId: "garden-plants", options: ["native"], sprites: ["gardenPlant2", "gardenPlant3"] },
  { questionId: "garden-structures", options: ["diverse"], sprites: ["gardenPlant4"] }
];

/** Sprites to draw for the given answers, in back-to-front order. */
export function visibleSprites(
  answers: Record<string, string>,
  roomsWithAnswers: RoomId[]
): Array<HouseSprite & { id: HouseSpriteId }> {
  const active = new Set<HouseSpriteId>();

  for (const roomId of roomsWithAnswers) {
    for (const id of roomFurniture[roomId] ?? []) active.add(id);
  }

  for (const rule of overlayRules) {
    const answer = answers[rule.questionId];
    if (!answer) continue;
    if (rule.options && !rule.options.includes(answer)) continue;
    for (const id of rule.sprites) active.add(id);
  }

  return [...active]
    .map((id) => ({ id, ...houseSprites[id] }))
    .sort((a, b) => a.z - b.z);
}
