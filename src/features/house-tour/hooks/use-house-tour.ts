"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import { calculateScores, completedRoomIds } from "../model/scoring";
import { initialTourState, tourReducer } from "../model/reducer";

const STORAGE_KEY = "balance-house-tour-v2";

export function useHouseTour() {
  const [state, dispatch] = useReducer(tourReducer, initialTourState);
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
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Tour remains usable without persistence. */ }
  }, [restored, state]);

  const scores = useMemo(() => calculateScores(state.answers), [state.answers]);
  const completedRooms = useMemo(
    () => completedRoomIds(state.answers, state.skippedQuestions),
    [state.answers, state.skippedQuestions]
  );
  return { state, dispatch, scores, completedRooms };
}
