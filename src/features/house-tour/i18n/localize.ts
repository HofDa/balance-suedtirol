import type { Locale } from "../../../config/site";
import { availableRooms } from "../config/rooms";
import type { RoomId, TourQuestion, TourRoom } from "../model/types";
import { germanCompletion, roomContent } from "./content";

export type LocalizedRoom = TourRoom & { completion: string };

/**
 * Die Räume in einer Sprache: Struktur, Faktoren und Vorgaben aus `config/`,
 * Texte aus der Überlagerung. Der Rechner arbeitet weiter mit den deutschen
 * Originalobjekten; hier entstehen nur die Fassungen für die Oberfläche.
 */
function build(locale: Locale): LocalizedRoom[] {
  if (locale === "de") {
    return availableRooms.map((room) => ({ ...room, completion: germanCompletion[room.id] }));
  }
  const content = roomContent[locale];
  return availableRooms.map((room) => {
    const text = content[room.id];
    const questions: TourQuestion[] = room.questions.map((question) => {
      const q = text.questions[question.id];
      return {
        ...question,
        title: q.title,
        sceneLabel: q.sceneLabel,
        description: q.description,
        impactText: q.impactText,
        tip: q.tip,
        scopeNote: question.scopeNote ? q.scopeNote : undefined,
        adjust: question.adjust && q.adjust
          ? {
              ...question.adjust,
              label: q.adjust.label,
              unit: q.adjust.unit,
              hint: q.adjust.hint,
              base: question.adjust.base && { ...question.adjust.base, unit: q.adjust.baseUnit ?? question.adjust.base.unit }
            }
          : question.adjust,
        options: question.options.map((option) => {
          const o = q.options[option.id];
          return {
            ...option,
            label: o.label,
            regionalAverage: option.regionalAverage && o.regionalAverage ? o.regionalAverage : option.regionalAverage
          };
        })
      };
    });
    return { ...room, title: text.title, shortTitle: text.shortTitle, description: text.description, completion: text.completion, questions };
  });
}

const cache = new Map<Locale, LocalizedRoom[]>();
export function localizedRooms(locale: Locale) {
  let rooms = cache.get(locale);
  if (!rooms) {
    rooms = build(locale);
    cache.set(locale, rooms);
  }
  return rooms;
}

export function localizedRoom(locale: Locale, id: RoomId | null) {
  return localizedRooms(locale).find((room) => room.id === id);
}

export function localizedQuestion(locale: Locale, questionId: string) {
  for (const room of localizedRooms(locale)) {
    const question = room.questions.find((item) => item.id === questionId);
    if (question) return question;
  }
  return undefined;
}
