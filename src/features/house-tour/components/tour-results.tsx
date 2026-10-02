"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "@/components/ui/site-link";
import { ArrowRight, Bookmark, BookmarkCheck, BookOpen, ChevronRight, Home, Plus } from "lucide-react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focusRingTool } from "@/components/ui/focus";
import type { ProjectCategoryId } from "@/config/project-categories";
import { getProjectCategoryLabel } from "@/config/project-categories";
import type { Locale } from "@/config/site";
import { getProjects } from "@/data/projects";
import { withBasePath } from "@/lib/public-path";
import { baseScores, scoreDimensions } from "../model/scoring";
import { formatMetric, metrics, referenceValues } from "../model/calculator";
import { MAX_GOALS, co2Contributions, levers as findLevers, toUnit, whatIfTotals, type Discovery, type Lever, type LeverTheme } from "../model/game";
import { round2, yearInPictures } from "../model/everyday";
import { everydayUnits, type EverydayUnit } from "../config/game-copy";
import { useTourI18n } from "../i18n/context";
import type { Rich } from "../i18n/ui";
import { localeTags } from "@/lib/i18n";
import type { AnnualValues, RoomId, ScoreDimension, Scores } from "../model/types";
import { LeverScene } from "./game/lever-scene";
import { formatUnit } from "./game/units";

/**
 * Welcher Lebensraum zu welcher Dimension passt, samt Begründung. Die Hebel
 * am Ende nutzen dieselbe Zuordnung über ihr Thema.
 */
const categoryByDimension: Record<ScoreDimension, ProjectCategoryId> = {
  biodiversity: "settlement-areas",
  water: "wetlands",
  carbon: "cultural-landscapes",
  resources: "meadows-dry-grasslands"
};

/** Ein Satz mit fett gesetzten Teilen aus dem Wörterbuch. */
function RichText({ parts }: { parts: Rich }) {
  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? part : (
          <strong key={index} className="font-semibold text-[var(--color-ink)] tabular-nums">{part.b}</strong>
        )
      )}
    </>
  );
}

const sectionTitle = "text-xl font-semibold tracking-[-0.02em] md:text-2xl";

/** Zählt sichtbar von der alten zur neuen Zahl: der Was-wäre-wenn-Moment. */
function CountingValue({ value, format }: { value: number; format: (value: number) => string }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const shownRef = useRef(value);
  useEffect(() => {
    if (reduce) {
      shownRef.current = value;
      setShown(value);
      return;
    }
    const controls = animate(shownRef.current, value, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        shownRef.current = latest;
        setShown(latest);
      }
    });
    return () => controls.stop();
  }, [value, reduce]);
  return <span className="tabular-nums">{format(shown)}</span>;
}

/** Ein gerechneter Messwert gegen seinen Vergleichsanker. */
function MeasuredMetric({
  label,
  scopeNote,
  value,
  reference,
  formatted
}: {
  label: string;
  scopeNote: string;
  value: number;
  reference: number;
  formatted: { value: string; unit: string };
}) {
  const reduceMotion = useReducedMotion();
  const { t } = useTourI18n();
  const share = reference > 0 ? value / reference : 0;
  // Der Durchschnitt sitzt bei zwei Dritteln der Spur, damit auch ein Wert
  // deutlich darüber noch im Bild bleibt, statt den Balken abzuschneiden.
  const scale = Math.max(1.5, share * 1.15);
  const width = Math.min(100, (share / scale) * 100);
  const referenceAt = (1 / scale) * 100;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-4">
      <dt className="text-[11px] font-medium text-[var(--color-muted)]">{label}</dt>
      <dd className="mt-1">
        <span className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold tabular-nums">{formatted.value}</span>
          <span className="text-xs font-medium text-[var(--color-muted)]">{formatted.unit}</span>
        </span>
        <div className="relative mt-3 h-2 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-stone)]">
          <motion.div
            className={cn("h-full rounded-[var(--radius-md)]", share > 1 ? "bg-[var(--color-clay)]" : "bg-[var(--color-forest)]")}
            initial={reduceMotion ? false : { width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          />
          <span className="absolute inset-y-[-2px] w-px bg-[var(--color-ink)]/45" style={{ left: `${referenceAt}%` }} aria-hidden />
        </div>
        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] leading-4 text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-px bg-[var(--color-ink)]/45" aria-hidden />
            {t.results.modelComparison}
          </span>
          <span className={cn("tabular-nums font-semibold", share > 1 ? "text-[var(--color-clay-ink)]" : "text-[var(--color-forest)]")}>
            {t.results.percentOfModel(Math.round(share * 100))}
          </span>
        </span>
        <span className="mt-2 block text-[11px] leading-4 text-[var(--color-muted)]">{scopeNote}</span>
      </dd>
    </div>
  );
}

/** Die Ersparnis eines Hebels in derselben Alltagsgröße wie beim Gegenstand. */
function leverUnit(questionId: string): EverydayUnit {
  return everydayUnits[questionId] ?? "carKm";
}

function LeverCard({
  lever,
  adjustments,
  active,
  goal,
  goalsFull,
  onToggle,
  onGoal
}: {
  lever: Lever;
  adjustments: Record<string, number>;
  active: boolean;
  goal: boolean;
  goalsFull: boolean;
  onToggle: () => void;
  onGoal: () => void;
}) {
  const reduce = useReducedMotion();
  const { t, locale, question } = useTourI18n();
  const unit = leverUnit(lever.questionId);
  const less = formatUnit(unit, toUnit(unit, lever.saving), t, locale);
  // Texte aus der gewählten Sprache; der Hebel selbst rechnet mit den Originaldaten.
  const text = question(lever.questionId);
  const label = (id: string) => text?.options.find((option) => option.id === id)?.label ?? id;
  return (
    <motion.li
      layout={!reduce}
      className={cn(
        "grid grid-cols-[6rem_minmax(0,1fr)] gap-x-3 gap-y-2 rounded-[var(--radius-lg)] border p-3 transition-colors sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-center",
        active ? "border-[var(--color-forest)] bg-[var(--color-sage)]/40" : "border-[var(--color-line)] bg-white"
      )}
    >
      {/* Die Szene zeigt die Antwort, die gerade gilt: echt oder ausprobiert. */}
      <LeverScene
        questionId={lever.questionId}
        roomId={lever.roomId}
        answer={active ? lever.best.id : lever.current.id}
        adjustments={adjustments}
        caption={active ? t.results.captionTried : t.results.captionNow}
        highlight={active}
        className="row-span-2 self-start sm:row-span-1"
      />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-[var(--color-muted)]">
          {t.themes[lever.theme]} · {text?.sceneLabel ?? lever.sceneLabel}
        </p>
        <p className="mt-0.5 text-sm font-semibold leading-5">{label(lever.best.id)}</p>
        <p className="mt-0.5 text-xs leading-5 text-[var(--color-muted)]">
          {t.results.instead(label(lever.current.id))} ·{" "}
          <span className="font-semibold tabular-nums text-[var(--color-forest)]">
            −{less.value} {less.unit}
          </span>{" "}
          {t.results.perYearShort}
        </p>
      </div>
      <div className="col-start-2 flex flex-wrap gap-1.5 sm:col-start-3">
        <button
          type="button"
          role="switch"
          aria-checked={active}
          onClick={onToggle}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] border px-3 text-xs font-semibold transition-colors",
            active
              ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
              : "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-forest)]/45",
            focusRingTool
          )}
        >
          <span
            className={cn("relative h-4 w-7 rounded-full transition-colors", active ? "bg-white/35" : "bg-[var(--color-ink)]/15")}
            aria-hidden
          >
            <span
              className={cn("absolute top-0.5 size-3 rounded-full transition-all duration-200", active ? "left-3.5 bg-white" : "left-0.5 bg-white shadow-sm")}
            />
          </span>
          {t.results.tryIt}
        </button>
        <button
          type="button"
          aria-pressed={goal}
          disabled={!goal && goalsFull}
          onClick={onGoal}
          title={!goal && goalsFull ? t.results.maxGoals(MAX_GOALS) : undefined}
          className={cn(
            "inline-flex min-h-11 items-center gap-1.5 rounded-[var(--radius-md)] px-3 text-xs font-semibold transition-colors disabled:opacity-40",
            goal ? "text-[var(--color-forest)]" : "text-[var(--color-muted)] hover:bg-[var(--color-ink)]/5 hover:text-[var(--color-ink)]",
            focusRingTool
          )}
        >
          {goal ? <BookmarkCheck className="size-4" aria-hidden /> : <Bookmark className="size-4" aria-hidden />}
          {goal ? t.results.goal : t.results.markGoal}
        </button>
      </div>
    </motion.li>
  );
}

export function TourResults({
  scores,
  totals,
  answers,
  adjustments,
  whatIf,
  goals,
  progress,
  answeredRooms,
  answeredCount,
  totalQuestions,
  locale,
  onContinue,
  onOpenRoom,
  onSetWhatIf,
  onToggleGoal,
  onOpenFolder
}: {
  scores: Scores;
  totals: AnnualValues;
  answers: Record<string, string>;
  adjustments: Record<string, number>;
  whatIf: Record<string, string>;
  goals: string[];
  progress: Discovery;
  answeredRooms: RoomId[];
  answeredCount: number;
  totalQuestions: number;
  locale: Locale;
  onContinue: () => void;
  onOpenRoom: (id: RoomId) => void;
  onSetWhatIf: (questionId: string, optionId: string | null) => void;
  onToggleGoal: (questionId: string) => void;
  onOpenFolder: () => void;
}) {
  const i18n = useTourI18n();
  const { t, rooms } = i18n;
  const reduceMotion = useReducedMotion();
  const r = t.results;
  const sorted = [...scoreDimensions].sort((a, b) => scores[b.id] - scores[a.id]);
  const hasAnswers = answeredCount > 0;
  const isComplete = answeredCount === totalQuestions;
  const comparison = referenceValues.co2Kg > 0 ? totals.co2Kg / referenceValues.co2Kg : 0;
  const openRooms = rooms.filter((room) => !answeredRooms.includes(room.id));
  const lowest = sorted.at(-1) ?? scoreDimensions[0];

  const allLevers = useMemo(() => findLevers(answers, adjustments, totals), [answers, adjustments, totals]);
  const levers = allLevers.slice(0, 5);
  const hypothetical = useMemo(() => whatIfTotals(answers, adjustments, whatIf), [answers, adjustments, whatIf]);
  const activeCount = levers.filter((lever) => whatIf[lever.questionId]).length;
  const lessWater = Math.max(0, totals.waterL - hypothetical.waterL);
  const lessCo2 = Math.max(0, totals.co2Kg - hypothetical.co2Kg);

  const projects = useMemo(() => getProjects(locale), [locale]);
  const goalLevers = goals
    .map((id) => allLevers.find((lever) => lever.questionId === id))
    .filter((lever): lever is Lever => Boolean(lever));
  const goalThemes = [...new Set(goalLevers.map((lever) => lever.theme))];
  const i18nLabel = (questionId: string) => i18n.question(questionId)?.sceneLabel ?? questionId;
  const fallbackReason = t.reasons[lowest.id];
  const tag = localeTags[locale];

  const de = new Intl.NumberFormat(tag, { maximumFractionDigits: 0 });
  const de1 = new Intl.NumberFormat(tag, { maximumFractionDigits: 1 });
  const co2Text = (kg: number) => (kg >= 1000 ? `${de1.format(kg / 1000)} t` : `${de.format(kg)} kg`);
  const year = yearInPictures(totals, locale);
  const top = co2Contributions(answers, adjustments).slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      {/* ① Das eigene Jahr: was die Eingaben zusammen ergeben, in denselben
          Bildern wie unterwegs. Die Entdeckerpunkte stehen danach in einem
          Satz — sie sind die Spur durchs Haus, nicht das Ergebnis. */}
      <h1 className="font-display text-[length:var(--text-display)] leading-[var(--leading-display)] [text-wrap:balance]">
        {r.yearTitle}
      </h1>
      {hasAnswers && !isComplete && (
        <p className="mt-3 max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">
          {r.yearInterim(progress.found, progress.total)}
        </p>
      )}
      {hasAnswers && (year.water || year.co2) && (
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {year.water && (
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white p-5">
              <dt className="text-sm font-semibold text-[var(--color-muted)]">{r.yearWater}</dt>
              <dd className="mt-2">
                <span className="block text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">{year.water}</span>
                <span className="mt-1.5 block text-sm leading-5 text-[var(--color-muted)]">
                  {r.waterExact(de.format(round2(totals.waterL)))}
                </span>
              </dd>
            </div>
          )}
          {year.co2 && (
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white p-5">
              <dt className="text-sm font-semibold text-[var(--color-muted)]">{r.yearCo2}</dt>
              <dd className="mt-2">
                <span className="block text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">{year.co2}</span>
                {year.car && (
                  <span className="mt-1.5 block text-sm leading-5 text-[var(--color-muted)]">{r.co2Compare(year.car)}</span>
                )}
              </dd>
            </div>
          )}
        </dl>
      )}

      {top.length > 1 && (
        <section className="mt-8" aria-labelledby="results-top">
          <h2 id="results-top" className="text-base font-semibold md:text-lg">{r.topTitle}</h2>
          <p className="mt-1 max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">{r.topLead}</p>
          {/* Die Balken zeigen den Anteil an der ganzen Summe, nicht am größten
              Posten: ein Drittel soll aussehen wie ein Drittel. */}
          <ol className="mt-4 grid gap-3.5">
            {top.map((row, index) => {
              const label = t.topics[row.questionId] ?? i18nLabel(row.questionId);
              const percent = Math.round(row.share * 100);
              return (
                <li key={row.questionId}>
                  <span className="sr-only">{r.topRowAria(label, co2Text(row.co2Kg), percent)}</span>
                  <div className="flex items-baseline justify-between gap-3 text-sm" aria-hidden>
                    <span className="min-w-0 truncate font-semibold">{label}</span>
                    <span className="shrink-0 tabular-nums text-[var(--color-muted)]">
                      {co2Text(row.co2Kg)} · {percent} %
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--color-ink)]/8" aria-hidden>
                    <motion.div
                      className="h-full rounded-[4px] bg-[var(--color-forest)]"
                      initial={reduceMotion ? false : { width: 0 }}
                      animate={{ width: `${Math.max(1, row.share * 100)}%` }}
                      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : 0.1 + index * 0.06 }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      <p className="mt-8 max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">
        <RichText parts={r.summary({ points: progress.points, cards: progress.cardsRead, total: progress.total })} />
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onOpenFolder}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-4 text-sm font-semibold transition-colors hover:border-[var(--color-forest)]/45",
            focusRingTool
          )}
        >
          <BookOpen className="size-4 text-[var(--color-forest)]" aria-hidden />
          {r.openFolder}
        </button>
        {openRooms[0] && (
          <button
            type="button"
            onClick={() => onOpenRoom(openRooms[0].id)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-forest)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-ink)]",
              focusRingTool
            )}
          >
            <Plus className="size-4" aria-hidden />
            {r.continueRoom(openRooms[0].title)}
          </button>
        )}
      </div>
      {openRooms.length > 1 && (
        <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">
          {r.stillOpen(openRooms.map((room) => room.title).join(", "))}
        </p>
      )}

      {/* ② Was-wäre-wenn: die eigenen Hebel ausprobieren, ohne Antworten zu ändern. */}
      {hasAnswers && (
        <section className="mt-14" aria-labelledby="results-whatif">
          <h2 id="results-whatif" className={sectionTitle}>{r.whatIfTitle}</h2>
          <p className="mt-2 max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">
            {r.whatIfLead}
          </p>

          {levers.length > 0 ? (
            <>
              <div className="sticky top-0 z-10 -mx-5 mt-5 border-y border-[var(--color-line)] bg-[var(--color-paper)]/95 px-5 py-3 backdrop-blur sm:mx-0 sm:rounded-[var(--radius-lg)] sm:border" aria-live="polite">
                {activeCount === 0 ? (
                  <p className="text-sm text-[var(--color-muted)]">{r.whatIfHint}</p>
                ) : (
                  <p className="text-sm leading-6">
                    <span className="font-semibold">{r.withLevers(activeCount)}</span>{" "}
                    {lessWater >= 150 && (
                      <>
                        <span className="font-semibold text-[var(--color-forest)]">
                          −<CountingValue value={lessWater / 150} format={(n) => de.format(n)} /> {r.bathtubs}
                        </span>{" "}{r.water}{lessCo2 >= 1 ? ` ${r.and} ` : " "}
                      </>
                    )}
                    {lessCo2 >= 1 && (
                      <>
                        <span className="font-semibold text-[var(--color-forest)]">
                          −<CountingValue value={lessCo2} format={co2Text} /> CO₂
                        </span>{" "}
                      </>
                    )}
                    {r.perYear} {r.climate}{" "}
                    <span className="tabular-nums">{co2Text(totals.co2Kg)}</span> →{" "}
                    <span className="font-semibold tabular-nums text-[var(--color-forest)]">
                      <CountingValue value={hypothetical.co2Kg} format={co2Text} />
                    </span>
                  </p>
                )}
              </div>

              <ul className="mt-3 grid gap-2">
                {levers.map((lever) => (
                  <LeverCard
                    key={lever.questionId}
                    lever={lever}
                    adjustments={adjustments}
                    active={Boolean(whatIf[lever.questionId])}
                    goal={goals.includes(lever.questionId)}
                    goalsFull={goals.length >= MAX_GOALS}
                    onToggle={() => onSetWhatIf(lever.questionId, whatIf[lever.questionId] ? null : lever.best.id)}
                    onGoal={() => onToggleGoal(lever.questionId)}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-4 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-line)] p-4 text-sm text-[var(--color-muted)]">
              {r.noLevers}
            </p>
          )}
        </section>
      )}

      {/* ③ Vom Vorhaben zum Ort: Projekte zum selben Thema, ausdrücklich ohne Ausgleichsversprechen. */}
      {hasAnswers && (
        <section className="mt-14" aria-labelledby="results-goals">
          <h2 id="results-goals" className={sectionTitle}>
            {goalThemes.length > 0 ? r.goalsTitle : r.themeTitle}
          </h2>
          <p className="mt-2 max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">
            {goalThemes.length > 0 ? r.goalsLead : r.noGoalsLead(MAX_GOALS, fallbackReason)}{" "}
            <Link
              href={`/${locale}/co2-und-biodiversitaet`}
              className={cn("font-semibold text-[var(--color-forest)] underline underline-offset-2", focusRingTool)}
            >
              {r.whyNot}
            </Link>
          </p>

          <div className="mt-5 grid gap-6">
            {(goalThemes.length > 0 ? goalThemes : [lowest.id === "resources" ? "carbon" : (lowest.id as LeverTheme)]).map((theme) => {
              const category = categoryByDimension[theme];
              const reason = t.reasons[theme];
              const matches = projects.filter((project) => project.categoryIds.includes(category));
              const themeGoals = goalLevers.filter((lever) => lever.theme === theme);
              return (
                <div key={theme}>
                  <p className="text-sm font-semibold">
                    {themeGoals.length > 0 ? themeGoals.map((lever) => i18nLabel(lever.questionId)).join(", ") : t.themes[theme]}
                    <span className="font-normal text-[var(--color-muted)]"> → {getProjectCategoryLabel(category, locale)}</span>
                  </p>
                  {goalThemes.length > 0 && <p className="mt-1 max-w-[58ch] text-xs leading-5 text-[var(--color-muted)]">{reason}</p>}
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {matches.map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/${locale}/projekte/${project.slug}`}
                          className={cn(
                            "group flex h-full gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-2.5 transition-shadow hover:shadow-[0_18px_45px_rgba(33,56,44,0.12)]",
                            focusRingTool
                          )}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={withBasePath(project.image)} alt="" className="size-20 shrink-0 rounded-[var(--radius-md)] object-cover" />
                          <span className="flex min-w-0 flex-col justify-center">
                            <span className="text-sm font-semibold leading-5">{project.title}</span>
                            <span className="mt-0.5 text-xs text-[var(--color-muted)]">{project.municipality}</span>
                            <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-forest)]">
                              {r.viewProject}
                              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ④ Die genaue Bilanz: alles, was gerechnet und eingeschätzt wurde, für alle, die es wissen wollen. */}
      <details className="group mt-14 rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-white">
        <summary
          className={cn(
            "flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 text-base font-semibold [&::-webkit-details-marker]:hidden",
            focusRingTool
          )}
        >
          <ChevronRight className="size-4 shrink-0 text-[var(--color-forest)] transition-transform group-open:rotate-90 motion-reduce:transition-none" aria-hidden />
          {r.exactTitle}
          <span className="ml-auto text-xs font-normal text-[var(--color-muted)]">
            {hasAnswers ? `${formatMetric("co2", totals.co2Kg, totals.co2Kg, tag).value} ${formatMetric("co2", totals.co2Kg, totals.co2Kg, tag).unit} CO₂e` : r.exactEmpty}
          </span>
        </summary>

        <div className="border-t border-[var(--color-line)] px-5 pb-6 pt-5">
          <p className="max-w-[58ch] text-sm leading-6 text-[var(--color-muted)]">
            {!hasAnswers ? r.noAnswers : isComplete ? r.complete(Math.round(comparison * 100)) : r.partial}
            {t.fullFootprintNote}
          </p>
          <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">
            <RichText parts={r.answered(answeredCount, totalQuestions)} />
          </p>

          <h3 className="mt-6 text-base font-semibold">{r.calculated}</h3>
          <p className="text-[11px] text-[var(--color-muted)]">{r.calculatedSub}</p>
          <dl className="mt-3 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => {
              const value = totals[metric.key];
              const reference = referenceValues[metric.key];
              return (
                <MeasuredMetric
                  key={metric.id}
                  label={t.metrics[metric.id].label}
                  scopeNote={t.metrics[metric.id].scopeNote}
                  value={value}
                  reference={reference}
                  formatted={formatMetric(metric.id, value, Math.max(value, reference), tag)}
                />
              );
            })}
          </dl>
          <p className="mt-3 text-[11px] leading-4 text-[var(--color-muted)]">
            {r.referenceNote}{" "}
            <Link href={`/${locale}/methodik`} className={cn("font-semibold text-[var(--color-forest)] underline underline-offset-2", focusRingTool)}>
              {r.allFactors}
            </Link>
          </p>

          {hasAnswers && (
            <>
              <h3 className="mt-6 text-base font-semibold">{r.estimated}</h3>
              <p className="text-[11px] text-[var(--color-muted)]">{r.estimatedSub}</p>
              <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {scoreDimensions.map((item) => {
                  const delta = scores[item.id] - baseScores[item.id];
                  return (
                    <div key={item.id} className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white px-3 py-2.5">
                      <dt className="text-[11px] font-medium text-[var(--color-muted)]">{t.dimensions[item.id]}</dt>
                      <dd className="mt-0.5 flex items-baseline gap-1.5">
                        <span className="text-base font-semibold tabular-nums">{scores[item.id]}</span>
                        <span className="text-[11px] text-[var(--color-muted)]">{r.of100}</span>
                        {delta !== 0 && (
                          <span className={cn("text-[11px] font-semibold tabular-nums", delta > 0 ? "text-[var(--color-forest)]" : "text-[var(--color-clay-ink)]")}>
                            {delta > 0 ? "+" : ""}
                            {delta}
                          </span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <p className="mt-3 text-[11px] leading-4 text-[var(--color-muted)]">
                {r.indexNote}
              </p>
            </>
          )}
        </div>
      </details>

      <div className="mt-8">
        <button
          type="button"
          onClick={onContinue}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] px-3 text-sm font-semibold text-[var(--color-forest)] transition-colors hover:bg-[var(--color-ink)]/5",
            focusRingTool
          )}
        >
          <Home className="size-4" aria-hidden />
          {r.toHouse}
        </button>
      </div>
    </div>
  );
}
