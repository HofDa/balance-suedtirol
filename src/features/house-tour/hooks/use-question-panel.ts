"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AnnualValues, TourQuestion, TourRoom } from "../model/types";
import { getRoomProgress } from "../model/scoring";
import { bestCaseSavingFromValues, optionValues } from "../model/calculator";

export const AUTO_ADVANCE_MS = 1400;

export function useQuestionPanelInteraction({
  room, question, questionIndex, objectOpen, answers, skippedQuestions,
  onAnswer, onContinue, onGoTo, reduceMotion,
}: {
  room: TourRoom;
  question: TourQuestion;
  questionIndex: number;
  objectOpen: boolean;
  answers: Record<string, string>;
  skippedQuestions: Record<string, boolean>;
  onAnswer: (questionId: string, optionId: string) => void;
  onContinue: () => void;
  onGoTo: (index: number) => void;
  reduceMotion: boolean | null;
}) {
  // Weiter schiebt die nächste Frage von rechts herein, Zurück von links:
  // die Bewegung sagt, in welche Richtung man durch den Raum geht.
  const previousIndex = useRef(questionIndex);
  const direction = questionIndex < previousIndex.current ? -1 : 1;
  useEffect(() => {
    previousIndex.current = questionIndex;
  }, [questionIndex]);
  // Wischen zwischen den Objekten eines Raums, wie durch Karten blättern.
  // Nur deutlich waagrechte Gesten zählen, damit senkrechtes Scrollen und der
  // Mengenregler unberührt bleiben.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length !== 1) { touchStart.current = null; return; }
    const target = event.target as HTMLElement;
    touchStart.current = target.closest('input[type="range"]')
      ? null
      : { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !objectOpen || event.changedTouches.length === 0) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const next = questionIndex + (dx < 0 ? 1 : -1);
    if (next >= 0 && next < room.questions.length) {
      setAdvancingFor(null);
      onGoTo(next);
    }
  };
  const slide = reduceMotion
    ? undefined
    : {
        enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
        center: { opacity: 1, x: 0, transition: { duration: 0.24, ease: "easeOut" as const } },
        exit: (dir: number) => ({ opacity: 0, x: dir * -28, transition: { duration: 0.16, ease: "easeIn" as const } })
      };
  // Fragen ohne Regler gehen nach der Wahl von selbst weiter: kurz genug, um
  // flüssig zu wirken, lang genug, um die Wirkung der Antwort zu sehen.
  // Mit Regler bleibt der Weiter-Knopf, denn die Menge folgt erst noch.
  const [advancingFor, setAdvancingFor] = useState<string | null>(null);
  const advancing = advancingFor === question.id;
  const continueRef = useRef(onContinue);
  continueRef.current = onContinue;
  useEffect(() => {
    if (!advancing) return;
    const timer = window.setTimeout(() => {
      setAdvancingFor(null);
      continueRef.current();
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [advancing]);
  const choose = useCallback((optionId: string) => {
    onAnswer(question.id, optionId);
    setAdvancingFor(question.adjust ? null : question.id);
  }, [question, onAnswer]);
  const roomProgress = getRoomProgress(room, answers, skippedQuestions);
  const roomHandled = roomProgress.handled;
  const roomDone = roomProgress.isComplete;
  // Sagt dem Weiter-Knopf, wohin er führt: zum nächsten Objekt oder zum
  // Raumabschluss. Ein Knopf, der nicht verrät, was er auslöst, ist ein Sprung.
  const moreObjectsOpen = room.questions.some(
    (item, index) =>
      index !== questionIndex && !answers[item.id] && !skippedQuestions[item.id]
  );
  const selected = answers[question.id];
  const selectedOption = question.options.find((option) => option.id === selected);

  /**
   * Der schnelle Weg für alle, die 21 Objekte hintereinander durchgehen:
   * Ziffer wählt, Enter geht weiter. Eingabefelder und bereits fokussierte
   * Bedienelemente behalten ihre eigene Tastenbelegung.
   */
  useEffect(() => {
    if (!objectOpen || roomDone) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (target?.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        return;
      }

      const choice = Number(event.key);
      if (Number.isInteger(choice) && choice >= 1 && choice <= question.options.length) {
        event.preventDefault();
        choose(question.options[choice - 1].id);
        return;
      }

      // Enter auf einem fokussierten Knopf löst dessen eigene Aktion aus;
      // ein zweiter Weiter-Sprung von hier wäre ein übersprungenes Objekt.
      if (event.key === "Enter" && selected && tag !== "BUTTON" && tag !== "A" && tag !== "SUMMARY") {
        event.preventDefault();
        onContinue();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [objectOpen, roomDone, question, selected, choose, onContinue]);

  return {
    direction, slide, advancing, choose, roomHandled, roomDone, moreObjectsOpen,
    selected, selectedOption, onTouchStart, onTouchEnd,
    cancelAdvance: () => setAdvancingFor(null),
  };
}

export function useQuestionMetrics(question: TourQuestion, answers: Record<string, string>, adjustments: Record<string, number>) {
  const selected = answers[question.id];
  // Einheiten über alle Optionen einer Frage angleichen, sonst steht „16,4 m³“
  // über „6.390 L“ und die Zeilen lassen sich nicht vergleichen.
  const optionResults = useMemo(
    () => question.options.map((option) => ({
      option,
      values: optionValues(question.id, option.id, answers, adjustments)
    })),
    [question, answers, adjustments]
  );
  const scale = optionResults.reduce<AnnualValues>(
    (result, { values }) => ({
      co2Kg: Math.max(result.co2Kg, values.co2Kg),
      waterL: Math.max(result.waterL, values.waterL),
      energyKwh: Math.max(result.energyKwh, values.energyKwh)
    }),
    { co2Kg: 0, waterL: 0, energyKwh: 0 }
  );
  const selectedResult = optionResults.find(({ option }) => option.id === selected);
  const selectedValues = selectedResult?.values ?? null;
  const saving = selectedValues
    ? bestCaseSavingFromValues(selectedValues, optionResults.map(({ values }) => values))
    : null;
  return { optionResults, scale, selectedValues, saving };
}
