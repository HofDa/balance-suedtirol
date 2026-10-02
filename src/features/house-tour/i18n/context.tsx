"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "@/config/site";
import type { RoomId } from "../model/types";
import { localizedQuestion, localizedRoom, localizedRooms } from "./localize";
import { tourUi } from "./ui";

function make(locale: Locale) {
  return {
    locale,
    t: tourUi[locale],
    rooms: localizedRooms(locale),
    room: (id: RoomId | null) => localizedRoom(locale, id),
    question: (id: string) => localizedQuestion(locale, id)
  };
}

const TourI18nContext = createContext(make("de"));

/** Sprache der Tour für alle Bausteine darunter; ohne Anbieter gilt Deutsch. */
export function TourI18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo(() => make(locale), [locale]);
  return <TourI18nContext.Provider value={value}>{children}</TourI18nContext.Provider>;
}

export const useTourI18n = () => useContext(TourI18nContext);
