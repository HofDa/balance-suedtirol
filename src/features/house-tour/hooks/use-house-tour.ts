"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { calculateScores, completedRoomIds } from "../model/scoring";
import { totalValues } from "../model/calculator";
import { discovery } from "../model/game";
import type { RoomId } from "../model/types";
import { initialTourState, tourReducer } from "../model/reducer";

// V4: Dusche in Songs, Essensreste in Portionen. Wie schon V3 (Bildschirmstunden
// zu kWh): alte Mengen dürfen nicht still in der neuen Einheit gelesen werden.
const STORAGE_KEY = "balance-house-tour-v4";
const STORAGE_WRITE_DELAY_MS = 300;

export function useHouseTour() {
  const [state, dispatch] = useReducer(tourReducer, initialTourState);
  const celebratedRooms = useRef(new Set<RoomId>());
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "RESTORE", state: JSON.parse(saved) });
    } catch { /* A private browsing policy may disable storage. */ }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    const persistedState = {
      view: state.view,
      activeRoom: state.activeRoom,
      activeQuestionIndex: state.activeQuestionIndex,
      answers: state.answers,
      skippedQuestions: state.skippedQuestions,
      adjustments: state.adjustments,
      cardsRead: state.cardsRead,
      whatIf: state.whatIf,
      goals: state.goals
    };
    const timeout = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
      } catch { /* Tour remains usable without persistence. */ }
    }, STORAGE_WRITE_DELAY_MS);
    return () => window.clearTimeout(timeout);
  }, [
    restored,
    state.view,
    state.activeRoom,
    state.activeQuestionIndex,
    state.answers,
    state.skippedQuestions,
    state.adjustments,
    state.cardsRead,
    state.whatIf,
    state.goals
  ]);

  const scores = useMemo(
    () => calculateScores(state.answers, state.adjustments),
    [state.answers, state.adjustments]
  );
  const totals = useMemo(
    () => totalValues(state.answers, state.adjustments),
    [state.answers, state.adjustments]
  );
  const completedRooms = useMemo(
    () => completedRoomIds(state.answers, state.skippedQuestions),
    [state.answers, state.skippedQuestions]
  );
  const progress = useMemo(
    () => discovery({ answers: state.answers, cardsRead: state.cardsRead }),
    [state.answers, state.cardsRead]
  );
  return { state, dispatch, scores, totals, completedRooms, celebratedRooms, progress };
}
