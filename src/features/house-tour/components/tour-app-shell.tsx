"use client";

import { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getRoom, availableRooms } from "../config/rooms";
import { useHouseTour } from "../hooks/use-house-tour";
import type { RoomId } from "../model/types";
import { HouseOverview } from "./house-overview";
import { HouseDiscoveryIntro } from "./house-discovery-intro";
import { ObjectContextPanel } from "./object-context-panel";
import { TourToolbar } from "./tour-toolbar";
import { RoomScene } from "../scenes/room-scenes";
import type { Locale } from "@/config/site";
import { getTourProgress } from "../model/scoring";

const TourResults = dynamic(
  () => import("./tour-results").then((module) => module.TourResults),
  { loading: () => <div className="h-full bg-[var(--color-paper)]" aria-busy="true" /> }
);

export function TourAppShell({ locale }: { locale: Locale }) {
  const { state, dispatch, scores, totals, completedRooms } = useHouseTour();
  const reduce = useReducedMotion();
  const room = getRoom(state.activeRoom);
  const question = room?.questions[state.activeQuestionIndex];
  const progress = useMemo(
    () => getTourProgress(state.answers, state.skippedQuestions),
    [state.answers, state.skippedQuestions]
  );
  const totalObjects = progress.total;
  const completedObjects = progress.handled;
  const answeredObjects = Object.keys(state.answers).length;
  const answeredRooms = useMemo(
    () => availableRooms
      .filter((candidate) => candidate.questions.every((item) => Boolean(state.answers[item.id])))
      .map((candidate) => candidate.id),
    [state.answers]
  );

  const openRoom = useCallback((roomId: RoomId, questionIndex?: number) => {
    const target = getRoom(roomId);
    if (questionIndex !== undefined) {
      dispatch({ type: "OPEN_ROOM", roomId, questionIndex });
    } else {
      const firstOpen =
        target?.questions.findIndex(
          (item) => !state.answers[item.id] && !state.skippedQuestions[item.id]
        ) ?? 0;
      dispatch({ type: "OPEN_ROOM", roomId, questionIndex: Math.max(0, firstOpen) });
    }
  }, [dispatch, state.answers, state.skippedQuestions]);

  const selectObject = useCallback((questionIndex: number) => {
    dispatch({ type: "OPEN_OBJECT", questionIndex });
  }, [dispatch]);

  const findNextQuestion = useCallback(() => {
    if (!room) return -1;
    const order = [
      ...room.questions.map((_, index) => index).slice(state.activeQuestionIndex + 1),
      ...room.questions.map((_, index) => index).slice(0, state.activeQuestionIndex)
    ];
    return (
      order.find((index) => {
        const item = room.questions[index];
        return !state.answers[item.id] && !state.skippedQuestions[item.id];
      }) ?? -1
    );
  }, [room, state.activeQuestionIndex, state.answers, state.skippedQuestions]);

  const continueToNextObject = useCallback(() => {
    const nextIndex = findNextQuestion();
    // Das nächste Objekt öffnet sich direkt. Ein Umweg über die Szene wäre ein
    // zweiter Klick an einer zweiten Stelle für dieselbe Absicht.
    if (nextIndex >= 0) {
      dispatch({ type: "SET_QUESTION", index: nextIndex, open: true });
      return;
    }
    // Kein offenes Objekt mehr: schließen, damit der Raumabschluss erscheint.
    dispatch({ type: "SET_QUESTION", index: state.activeQuestionIndex });
  }, [dispatch, findNextQuestion, state.activeQuestionIndex]);

  const skipCurrentObject = useCallback(() => {
    if (!question) return;
    const nextIndex = findNextQuestion();
    dispatch({ type: "SKIP_QUESTION", questionId: question.id });
    if (nextIndex >= 0) dispatch({ type: "SET_QUESTION", index: nextIndex, open: true });
  }, [dispatch, findNextQuestion, question]);

  /** Zurück zum vorherigen Objekt des Raums, um eine Antwort zu korrigieren. */
  const goToPreviousObject = useCallback(() => {
    if (!room || state.activeQuestionIndex <= 0) return;
    dispatch({ type: "SET_QUESTION", index: state.activeQuestionIndex - 1, open: true });
  }, [dispatch, room, state.activeQuestionIndex]);

  const nextRoom = room
    ? [...availableRooms.slice(availableRooms.indexOf(room) + 1), ...availableRooms.slice(0, availableRooms.indexOf(room))]
        .find((item) => !completedRooms.includes(item.id))
    : undefined;

  const reset = useCallback(() => {
    if (window.confirm("Möchtest du alle Antworten des Lebensraum-Checks zurücksetzen?")) {
      dispatch({ type: "RESET" });
    }
  }, [dispatch]);

  const answerQuestion = useCallback((questionId: string, optionId: string) => {
    dispatch({ type: "SELECT_ANSWER", questionId, optionId });
  }, [dispatch]);
  const adjustQuestion = useCallback((questionId: string, quantity: number) => {
    dispatch({ type: "SET_ADJUSTMENT", questionId, quantity });
  }, [dispatch]);
  const clearAdjustment = useCallback((questionId: string) => {
    dispatch({ type: "CLEAR_ADJUSTMENT", questionId });
  }, [dispatch]);
  const openHouse = useCallback(() => dispatch({ type: "OPEN_HOUSE" }), [dispatch]);
  const showResults = useCallback(() => dispatch({ type: "SHOW_RESULTS" }), [dispatch]);
  const openCurrentObject = useCallback(
    () => dispatch({ type: "OPEN_OBJECT", questionIndex: state.activeQuestionIndex }),
    [dispatch, state.activeQuestionIndex]
  );
  const openNextRoom = useCallback(() => {
    if (nextRoom) openRoom(nextRoom.id);
  }, [nextRoom, openRoom]);

  // Die Bilanz ist eine Lesefläche, keine Werkzeugansicht: sie verlässt das
  // Zweispaltenraster, statt mobil in einem 42dvh hohen Fenster zu scrollen.
  if (state.view === "results") {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[var(--color-paper)]">
        <div className="h-14 shrink-0">
          <TourToolbar
            view={state.view}
            completedObjects={completedObjects}
            totalObjects={totalObjects}
            onHouse={openHouse}
            onReset={reset}
            onResults={showResults}
          />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <TourResults
            scores={scores}
            totals={totals}
            answeredRooms={answeredRooms}
            answeredCount={answeredObjects}
            totalQuestions={totalObjects}
            locale={locale}
            onContinue={openHouse}
            onOpenRoom={(id) => openRoom(id)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        // Nur noch eine Steuerungsebene über dem Inhalt statt Kopfzeile plus Raumleiste.
        "grid h-full min-h-0 min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden bg-[var(--color-paper)] md:grid-cols-[minmax(0,1.3fr)_minmax(23rem,1fr)] md:grid-rows-[3.5rem_minmax(0,1fr)]",
        state.view === "room"
          ? "grid-rows-[3.5rem_minmax(0,0.9fr)_minmax(0,1.1fr)]"
          : "grid-rows-[3.5rem_minmax(10rem,42dvh)_minmax(0,1fr)]"
      )}
    >
      <div className="min-w-0 md:col-start-2">
        <TourToolbar
          view={state.view}
          completedObjects={completedObjects}
          totalObjects={totalObjects}
          onHouse={openHouse}
          onReset={reset}
          onResults={showResults}
        />
      </div>

      {/* Mobil obere Hälfte, auf dem Desktop linke Spalte: die Szene */}
      <main className="relative flex h-full min-h-0 min-w-0 items-center justify-center overflow-hidden border-b border-[var(--color-line)] md:col-start-1 md:row-span-2 md:row-start-1 md:border-b-0 md:border-r">
        <AnimatePresence mode="wait" initial={false}>
          {state.view === "house" ? (
            <motion.div
              key="house"
              className="h-full"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0.35, scale: 1.04 }}
              transition={{ duration: reduce ? 0 : 0.32 }}
            >
              <HouseOverview
                onRoom={(id) => openRoom(id)}
                answers={state.answers}
                skippedQuestions={state.skippedQuestions}
                activeRoom={state.activeRoom}
              />
            </motion.div>
          ) : room ? (
            <motion.div
              key={room.id}
              className="h-full"
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            >
              <RoomScene
                roomId={room.id}
                answers={state.answers}
                skippedQuestions={state.skippedQuestions}
                onSelectObject={selectObject}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Mobil untere Hälfte, auf dem Desktop rechte Spalte: Frage, Werte und Aktion */}
      <aside
        className="flex min-h-0 min-w-0 flex-col overflow-hidden bg-white md:col-start-2 md:row-start-2"
        aria-label="Fragen, Werte und Steuerung"
      >
        {state.view === "house" ? (
          <HouseDiscoveryIntro
            completedObjects={completedObjects}
            totalObjects={totalObjects}
            locale={locale}
            answers={state.answers}
            skippedQuestions={state.skippedQuestions}
            onSelectRoom={(id) => openRoom(id)}
            onResults={showResults}
          />
        ) : room && question ? (
          <ObjectContextPanel
            room={room}
            question={question}
            questionIndex={state.activeQuestionIndex}
            objectOpen={state.objectOpen}
            answers={state.answers}
            adjustments={state.adjustments}
            skippedQuestions={state.skippedQuestions}
            totals={totals}
            nextRoom={nextRoom}
            locale={locale}
            onAnswer={answerQuestion}
            onAdjust={adjustQuestion}
            onClearAdjust={clearAdjustment}
            onContinue={continueToNextObject}
            onSkip={skipCurrentObject}
            onBack={goToPreviousObject}
            onOpenObject={openCurrentObject}
            onHouse={openHouse}
            onSelectRoom={(id) => openRoom(id)}
            onNextRoom={openNextRoom}
            onResults={showResults}
            allComplete={completedRooms.length === availableRooms.length}
          />
        ) : null}
      </aside>
    </div>
  );
}
