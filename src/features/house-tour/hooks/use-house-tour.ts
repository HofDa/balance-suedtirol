"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import { calculateScores, completedRoomIds } from "../model/scoring";
import { totalValues } from "../model/calculator";
import { initialTourState, tourReducer } from "../model/reducer";

const STORAGE_KEY = "balance-house-tour-v2";
const STORAGE_WRITE_DELAY_MS = 300;

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
    const persistedState = {
      view: state.view,
      activeRoom: state.activeRoom,
      activeQuestionIndex: state.activeQuestionIndex,
      answers: state.answers,
      skippedQuestions: state.skippedQuestions,
      adjustments: state.adjustments
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
    state.adjustments
  ]);

  const scores = useMemo(() => calculateScores(state.answers), [state.answers]);
  const totals = useMemo(
    () => totalValues(state.answers, state.adjustments),
    [state.answers, state.adjustments]
  );
  const completedRooms = useMemo(
    () => completedRoomIds(state.answers, state.skippedQuestions),
    [state.answers, state.skippedQuestions]
  );
  return { state, dispatch, scores, totals, completedRooms };
}
