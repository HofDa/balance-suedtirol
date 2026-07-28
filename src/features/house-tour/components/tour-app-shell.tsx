"use client";

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
import { TourResults } from "./tour-results";
import type { Locale } from "@/config/site";

export function TourAppShell({ locale }: { locale: Locale }) {
  const { state, dispatch, scores, completedRooms } = useHouseTour();
  const reduce = useReducedMotion();
  const room = getRoom(state.activeRoom);
  const question = room?.questions[state.activeQuestionIndex];
  const totalObjects = availableRooms.reduce((total, item) => total + item.questions.length, 0);
  const completedObjects = availableRooms.reduce(
    (total, item) =>
      total +
      item.questions.filter(
        (itemQuestion) =>
          state.answers[itemQuestion.id] || state.skippedQuestions[itemQuestion.id]
      ).length,
    0
  );

  const openRoom = (roomId: RoomId, questionIndex?: number) => {
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
  };

  const findNextQuestion = () => {
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
  };

  const continueToNextObject = () => {
    const nextIndex = findNextQuestion();
    if (nextIndex >= 0) dispatch({ type: "SET_QUESTION", index: nextIndex });
  };

  const skipCurrentObject = () => {
    if (!question) return;
    const nextIndex = findNextQuestion();
    dispatch({ type: "SKIP_QUESTION", questionId: question.id });
    if (nextIndex >= 0) dispatch({ type: "SET_QUESTION", index: nextIndex });
  };

  const nextRoom = room
    ? [...availableRooms.slice(availableRooms.indexOf(room) + 1), ...availableRooms.slice(0, availableRooms.indexOf(room))]
        .find((item) => !completedRooms.includes(item.id))
    : undefined;

  const reset = () => {
    if (window.confirm("Möchtest du alle Antworten des Lebensraum-Checks zurücksetzen?")) {
      dispatch({ type: "RESET" });
    }
  };

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
          onHouse={() => dispatch({ type: "OPEN_HOUSE" })}
          onReset={reset}
          onResults={() => dispatch({ type: "SHOW_RESULTS" })}
        />
      </div>

      {/* Mobil obere Hälfte, auf dem Desktop linke Spalte: die Szene */}
      <main className="relative flex h-full min-h-0 min-w-0 items-center justify-center overflow-hidden border-b border-[var(--color-line)] md:col-start-1 md:row-span-2 md:row-start-1 md:border-b-0 md:border-r">
        <AnimatePresence mode="wait" initial={false}>
          {state.view === "results" ? (
            <motion.div
              key="results"
              className="h-full"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
            >
              <TourResults scores={scores} completedRooms={completedRooms} locale={locale} onContinue={() => dispatch({ type: "OPEN_HOUSE" })} />
            </motion.div>
          ) : state.view === "house" ? (
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
                onSelectObject={(questionIndex) =>
                  dispatch({ type: "OPEN_OBJECT", questionIndex })
                }
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
        {state.view === "results" ? (
          // Die Werte stehen bereits in der Bilanz links, hier wäre die Tafel eine Dopplung.
          <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-6 text-center sm:px-6">
            <div className="max-w-xs">
              <p className="text-sm font-semibold">Weiter geht es im Haus</p>
              <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">
                Jeder weitere Raum macht die Bilanz vollständiger.
              </p>
              <button
                onClick={() => dispatch({ type: "OPEN_HOUSE" })}
                className="mt-6 min-h-11 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 text-xs font-semibold text-white"
              >
                Zur Hausübersicht
              </button>
            </div>
          </div>
        ) : state.view === "house" ? (
          <HouseDiscoveryIntro
            completedObjects={completedObjects}
            totalObjects={totalObjects}
            locale={locale}
          />
        ) : room && question ? (
          <ObjectContextPanel
            room={room}
            question={question}
            questionIndex={state.activeQuestionIndex}
            objectOpen={state.objectOpen}
            answers={state.answers}
            skippedQuestions={state.skippedQuestions}
            tab={state.panelTab}
            houseHandled={completedObjects}
            houseTotal={totalObjects}
            nextRoom={nextRoom}
            onAnswer={(questionId, optionId) => dispatch({ type: "SELECT_ANSWER", questionId, optionId })}
            onContinue={continueToNextObject}
            onSkip={skipCurrentObject}
            onEdit={() => dispatch({ type: "SET_PANEL_TAB", tab: "decision" })}
            onHouse={() => dispatch({ type: "OPEN_HOUSE" })}
            onNextRoom={() => nextRoom && openRoom(nextRoom.id)}
            onResults={() => dispatch({ type: "SHOW_RESULTS" })}
            allComplete={completedRooms.length === availableRooms.length}
          />
        ) : null}
      </aside>
    </div>
  );
}
