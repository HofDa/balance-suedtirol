import type { Variants } from "framer-motion";
import layout from "../config/full-house-layout.json";
import type { RoomId } from "./types";

/**
 * Kamerafahrt zwischen Haus und Raum. Ein Raum ist nur ein Ausschnitt des
 * Hausbildes, deshalb reicht eine Transformation der Gesamtansicht: skalieren,
 * bis der Ausschnitt die quadratische Szene füllt, und seine Mitte in die Mitte
 * schieben. Prozentwerte beziehen sich auf die Szene selbst und bleiben damit
 * unabhängig von der Bildschirmgröße.
 *
 * Die Varianten laufen über die Präsenz-`custom` der AnimatePresence: beim
 * Hineinfahren ist das der Zielraum, beim Herausfahren der zuletzt besuchte.
 */
const [SIZE] = layout.size;
const CAMERA_EASE = [0.4, 0, 0.2, 1] as const;
export const CAMERA_SECONDS = 0.55;
const MOBILE_QUERY = "(max-width: 767.98px)";

export type CameraTarget = { roomId: RoomId | null; questionIndex: number } | null;

const WHOLE = { scale: 1, x: "0%", y: "0%" };

/**
 * Endbild der Fahrt = Anfangsbild der Raumansicht. Auf dem Desktop füllt der
 * Ausschnitt die Szene, mobil die volle Breite, senkrecht auf das aktive Objekt
 * geschoben wie die Raumkamera (`.pan` in interactive-room.module.css).
 *
 * Gemessen wird beim Start der Animation, also nach dem Umbau des Rasters:
 * dann hat die Szene schon die Größe der Raumansicht.
 */
function cameraOn(target: CameraTarget | undefined) {
  const crop = target?.roomId ? layout.rooms[target.roomId as keyof typeof layout.rooms] : undefined;
  if (!crop || typeof document === "undefined") return WHOLE;
  const scene = document.querySelector<HTMLElement>('[data-house-scene="house"]');
  const frame = scene?.parentElement;
  if (!scene || !frame) return WHOLE;

  const side = scene.offsetWidth;
  const frameWidth = frame.clientWidth;
  const frameHeight = frame.clientHeight;
  const [left, top, width, height] = crop.map((value) => (value / SIZE) * side);

  if (!window.matchMedia(MOBILE_QUERY).matches) {
    const scale = side / Math.max(width, height);
    return {
      scale,
      x: `${(scale * (side / 2 - (left + width / 2)) / side) * 100}%`,
      y: `${(scale * (side / 2 - (top + height / 2)) / side) * 100}%`
    };
  }

  const scale = frameWidth / width;
  const scaledHeight = height * scale;
  const focus = layout.objects.find(
    (item) => item.room === target?.roomId && item.question === target?.questionIndex
  );
  const focusY = focus ? (focus.box[1] + focus.box[3] / 2 - crop[1]) / crop[3] : 0.5;
  const offsetY =
    scaledHeight <= frameHeight
      ? (frameHeight - scaledHeight) / 2
      : Math.min(0, Math.max(frameHeight - scaledHeight, frameHeight / 2 - focusY * scaledHeight));
  // Transformationsursprung ist die Mitte der Szene, die im Rahmen zentriert liegt.
  const sceneX = (frameWidth - side) / 2;
  const sceneY = (frameHeight - side) / 2;
  const translateX = -sceneX - side / 2 - scale * (left - side / 2);
  const translateY = offsetY - sceneY - side / 2 - scale * (top - side / 2);
  return { scale, x: `${(translateX / side) * 100}%`, y: `${(translateY / side) * 100}%` };
}

/** Auf dem Bildinhalt: fährt in den Raum hinein oder aus ihm heraus. */
export const cameraVariants: Variants = {
  fromRoom: (target?: CameraTarget) => cameraOn(target),
  whole: { ...WHOLE, transition: { duration: CAMERA_SECONDS, ease: CAMERA_EASE } },
  toRoom: (target?: CameraTarget) => ({
    ...cameraOn(target),
    transition: { duration: CAMERA_SECONDS, ease: CAMERA_EASE }
  })
};

/** Die Raumschilder gehören zur Übersicht und treten beim Hineinfahren zurück. */
export const overviewLabelVariants: Variants = {
  fromRoom: { opacity: 0 },
  whole: { opacity: 1, transition: { delay: CAMERA_SECONDS * 0.7, duration: 0.2 } },
  toRoom: { opacity: 0, transition: { duration: 0.15 } }
};
