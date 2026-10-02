"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getRoom, availableRooms } from "../config/rooms";
import { TourI18nProvider, useTourI18n } from "../i18n/context";
import { useHouseTour } from "../hooks/use-house-tour";
import type { RoomId } from "../model/types";
import { HouseOverview } from "./house-overview";
import { HouseDiscoveryIntro } from "./house-discovery-intro";
import { ObjectContextPanel } from "./object-context-panel";
import { TourToolbar } from "./tour-toolbar";
import { KnowledgeFolder } from "./game/knowledge-folder";
import { RoomScene } from "../scenes/room-scenes";
import type { Locale } from "@/config/site";
import { getTourProgress } from "../model/scoring";
import { CAMERA_SECONDS, type CameraTarget } from "../model/house-camera";
import layout from "../config/full-house-layout.json";

/** Hinausfahren, Aufleuchten des fertigen Raums bis zum Höhepunkt, dann weiter. */
const NEXT_ROOM_PAUSE_MS = 1700;

/** Der Rahmen um das Hausbild: bleibt sichtbar, bis das Raumbild übergeblendet hat. */
const houseFrameVariants = {
  fromRoom: { opacity: 1 },
  whole: { opacity: 1 },
  toRoom: { opacity: 1, transition: { duration: CAMERA_SECONDS + 0.3 } }
};

/**
 * Mobile Höhe des Raumbilds: so hoch wie der Raum bei voller Breite, höchstens
 * 55 % unter der Werkzeugleiste. Bei 34 dvh sah man auf einem iPhone 13 nur
 * 44–48 % eines quadratischen Raums und 28 % des Gartens; jetzt rund 87 % und
 * 52 %, und der Fragenbereich behält gut 270 px.
 */
function sceneRow(roomId: RoomId | null, answering: boolean, panelNeed: number | null) {
  const crop = roomId ? layout.rooms[roomId as keyof typeof layout.rooms] : undefined;
  const ratio = crop ? crop[3] / crop[2] : 1;
  // Beim Beantworten wird die Szene zum Band, das dem aktiven Gegenstand
  // folgt (`.pan` in `interactive-room.module.css`): so passen Frage und
  // Eingabe auch auf ein 640-px-Telefon.
  // Zusätzlich nie mehr, als der Schritt darunter übrig lässt; unter 7rem
  // geht die Szene nicht, dann darf der Schritt scrollen.
  const share = answering ? 0.38 : 0.55;
  const available = "(100dvh - 3.5rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))";
  const fit = answering && panelNeed ? `,calc(${available} - ${panelNeed}px)` : "";
  return `minmax(7rem,min(calc(100vw*${ratio.toFixed(3)}),calc(${available}*${share})${fit}))`;
}

const TourResults = dynamic(
  () => import("./tour-results").then((module) => module.TourResults),
  { loading: () => <div className="h-full bg-[var(--color-paper)]" aria-busy="true" /> }
);

export function TourAppShell({ locale }: { locale: Locale }) {
  return (
    <TourI18nProvider locale={locale}>
      <TourApp locale={locale} />
    </TourI18nProvider>
  );
}

function TourApp({ locale }: { locale: Locale }) {
  const i18n = useTourI18n();
  const { state, dispatch, scores, totals, completedRooms, celebratedRooms, progress: discoveryState } = useHouseTour();
  const [folderOpen, setFolderOpen] = useState(false);
  const [panelNeed, setPanelNeed] = useState<number | null>(null);
  const reduce = useReducedMotion();
  // Die Kamera braucht den Raum, in den sie fährt oder aus dem sie kommt; beim
  // Wechsel zur Hausübersicht ist `activeRoom` schon leer.
  const lastRoomRef = useRef<RoomId | null>(null);
  const previousViewRef = useRef(state.view);
  if (state.activeRoom) lastRoomRef.current = state.activeRoom;
  const cameraRoom = state.activeRoom ?? lastRoomRef.current;
  const cameraTarget: CameraTarget = cameraRoom
    ? { roomId: cameraRoom, questionIndex: state.activeQuestionIndex }
    : null;
  const enteringFromHouse = previousViewRef.current === "house";
  useEffect(() => {
    previousViewRef.current = state.view;
  }, [state.view]);
  // Die Raumobjekte für die Oberfläche kommen in der Sprache der Seite; Struktur und Faktoren sind identisch.
  const room = i18n.room(state.activeRoom);
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

  // Eine geplante Fahrt zum nächsten Raum; jede eigene Navigation hebt sie auf.
  const pendingFlight = useRef<number | null>(null);
  const cancelFlight = () => {
    if (pendingFlight.current !== null) window.clearTimeout(pendingFlight.current);
    pendingFlight.current = null;
  };
  useEffect(() => cancelFlight, []);

  const openRoom = useCallback((roomId: RoomId, questionIndex?: number) => {
    cancelFlight();
    const target = getRoom(roomId);
    if (questionIndex !== undefined) {
      dispatch({ type: "OPEN_ROOM", roomId, questionIndex, open: true });
    } else {
      const firstOpen =
        target?.questions.findIndex(
          (item) => !state.answers[item.id] && !state.skippedQuestions[item.id]
        ) ?? -1;
      // Ein fertiger Raum öffnet mit seinem Abschluss, jeder andere direkt in
      // der ersten offenen Frage.
      dispatch({ type: "OPEN_ROOM", roomId, questionIndex: Math.max(0, firstOpen), open: firstOpen >= 0 });
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
    ? [...i18n.rooms.slice(i18n.rooms.indexOf(room) + 1), ...i18n.rooms.slice(0, i18n.rooms.indexOf(room))]
        .find((item) => !completedRooms.includes(item.id))
    : undefined;

  const reset = useCallback(() => {
    if (window.confirm(i18n.t.toolbar.resetConfirm)) {
      celebratedRooms.current.clear();
      dispatch({ type: "RESET" });
    }
  }, [dispatch, celebratedRooms, i18n.t]);

  const answerQuestion = useCallback((questionId: string, optionId: string) => {
    dispatch({ type: "SELECT_ANSWER", questionId, optionId });
  }, [dispatch]);
  const adjustQuestion = useCallback((questionId: string, quantity: number) => {
    dispatch({ type: "SET_ADJUSTMENT", questionId, quantity });
  }, [dispatch]);
  const clearAdjustment = useCallback((questionId: string) => {
    dispatch({ type: "CLEAR_ADJUSTMENT", questionId });
  }, [dispatch]);
  const openHouse = useCallback(() => {
    cancelFlight();
    dispatch({ type: "OPEN_HOUSE" });
  }, [dispatch]);
  const showResults = useCallback(() => {
    cancelFlight();
    dispatch({ type: "SHOW_RESULTS" });
  }, [dispatch]);
  const openFolder = useCallback(() => setFolderOpen(true), []);
  const readCard = useCallback((questionId: string) => {
    dispatch({ type: "READ_CARD", questionId });
  }, [dispatch]);
  const setWhatIf = useCallback((questionId: string, optionId: string | null) => {
    dispatch({ type: "SET_WHAT_IF", questionId, optionId });
  }, [dispatch]);
  const toggleGoal = useCallback((questionId: string) => {
    dispatch({ type: "TOGGLE_GOAL", questionId });
  }, [dispatch]);
  const folder = (
    <KnowledgeFolder
      open={folderOpen}
      onClose={() => setFolderOpen(false)}
      answers={state.answers}
      adjustments={state.adjustments}
      cardsRead={state.cardsRead}
      onReadCard={readCard}
      locale={locale}
    />
  );
  const openCurrentObject = useCallback(
    () => dispatch({ type: "OPEN_OBJECT", questionIndex: state.activeQuestionIndex }),
    [dispatch, state.activeQuestionIndex]
  );
  /**
   * Der Weg zum nächsten Raum führt durchs Haus: hinausfahren, den fertigen
   * Raum aufleuchten lassen, in den nächsten hineinfahren. So sieht man, was
   * der abgeschlossene Raum am Haus verändert hat, und wo es weitergeht.
   */
  const openNextRoom = useCallback(() => {
    if (!nextRoom) return;
    if (reduce) {
      openRoom(nextRoom.id);
      return;
    }
    dispatch({ type: "OPEN_HOUSE" });
    const target = nextRoom.id;
    pendingFlight.current = window.setTimeout(() => {
      pendingFlight.current = null;
      openRoom(target);
    }, NEXT_ROOM_PAUSE_MS);
  }, [dispatch, nextRoom, openRoom, reduce]);

  // Die Bilanz ist eine Lesefläche, keine Werkzeugansicht: sie verlässt das
  // Zweispaltenraster, statt mobil in einem 42dvh hohen Fenster zu scrollen.
  if (state.view === "results") {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[var(--color-paper)]">
        <div className="h-14 shrink-0">
          <TourToolbar
            locale={locale}
            points={discoveryState.points}
            onOpenFolder={openFolder}
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
            answers={state.answers}
            adjustments={state.adjustments}
            whatIf={state.whatIf}
            goals={state.goals}
            progress={discoveryState}
            onSetWhatIf={setWhatIf}
            onToggleGoal={toggleGoal}
            onOpenFolder={openFolder}
            answeredRooms={answeredRooms}
            answeredCount={answeredObjects}
            totalQuestions={totalObjects}
            locale={locale}
            onContinue={openHouse}
            onOpenRoom={(id) => openRoom(id)}
          />
        </div>
        {folder}
      </div>
    );
  }

  return (
    <div
      className={cn(
        // Nur noch eine Steuerungsebene über dem Inhalt statt Kopfzeile plus Raumleiste.
        "grid h-full min-h-0 min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden bg-[var(--color-paper)] md:grid-cols-[minmax(0,1.3fr)_minmax(23rem,1fr)] md:grid-rows-[3.5rem_minmax(0,1fr)]",
        state.view === "room"
          ? "grid-rows-[3.5rem_var(--scene-row)_minmax(0,1fr)] transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none"
          : "grid-rows-[3.5rem_minmax(10rem,42dvh)_minmax(0,1fr)]"
      )}
      style={{ ["--scene-row" as string]: sceneRow(state.activeRoom, state.view === "room" && state.objectOpen, panelNeed) }}
    >
      <div className="min-w-0 md:col-start-2">
        <TourToolbar
          locale={locale}
          points={discoveryState.points}
          onOpenFolder={openFolder}
          view={state.view}
          completedObjects={completedObjects}
          totalObjects={totalObjects}
          onHouse={openHouse}
          onReset={reset}
          onResults={showResults}
        />
      </div>

      {/* Mobil obere Hälfte, auf dem Desktop linke Spalte: die Szene */}
      <div className="relative flex h-full min-h-0 min-w-0 items-center justify-center overflow-hidden border-b border-[var(--color-line)] md:col-start-1 md:row-span-2 md:row-start-1 md:border-b-0 md:border-r">
        {/* Haus und Raum liegen während des Wechsels übereinander: die Kamera
            fährt im Hausbild in den Raum, und das scharfe Raumbild blendet am
            Ende der Fahrt darüber. Zurück läuft es umgekehrt. */}
        <AnimatePresence initial={false} custom={cameraTarget}>
          {state.view === "house" ? (
            <motion.div
              key="house"
              className="absolute inset-0 z-0"
              custom={cameraTarget}
              initial={reduce || !cameraRoom ? false : "fromRoom"}
              animate="whole"
              exit={reduce ? undefined : "toRoom"}
              variants={houseFrameVariants}
            >
              <HouseOverview
                celebratedRooms={celebratedRooms}
                onRoom={openRoom}
                answers={state.answers}
                skippedQuestions={state.skippedQuestions}
              />
            </motion.div>
          ) : room ? (
            <motion.div
              key={room.id}
              className="absolute inset-0 z-10"
              initial={reduce ? false : { opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: reduce ? 0 : 0.25,
                  // Aus dem Haus kommend erst am Ende der Kamerafahrt überblenden.
                  delay: reduce || !enteringFromHouse ? 0 : CAMERA_SECONDS * 0.75
                }
              }}
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.3 } }}
            >
              <RoomScene
                roomId={room.id}
                questionIndex={state.activeQuestionIndex}
                answers={state.answers}
                adjustments={state.adjustments}
                skippedQuestions={state.skippedQuestions}
                onSelectObject={selectObject}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Mobil untere Hälfte, auf dem Desktop rechte Spalte: Frage, Werte und Aktion */}
      <aside
        className="flex min-h-0 min-w-0 flex-col overflow-hidden bg-white md:col-start-2 md:row-start-2"
        aria-label={i18n.t.panelRegion}
      >
        {state.view === "house" ? (
          <HouseDiscoveryIntro
            progress={discoveryState}
            onOpenFolder={openFolder}
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
            cardsRead={state.cardsRead}
            onReadCard={readCard}
            nextRoom={nextRoom}
            locale={locale}
            onAnswer={answerQuestion}
            onAdjust={adjustQuestion}
            onClearAdjust={clearAdjustment}
            onContinue={continueToNextObject}
            onSkip={skipCurrentObject}
            onBack={goToPreviousObject}
            onGoTo={selectObject}
            onOpenObject={openCurrentObject}
            onHouse={openHouse}
            onSelectRoom={(id) => openRoom(id)}
            onNextRoom={openNextRoom}
            onResults={showResults}
            onNeedHeight={setPanelNeed}
            allComplete={completedRooms.length === availableRooms.length}
          />
        ) : null}
      </aside>
      {folder}
    </div>
  );
}
