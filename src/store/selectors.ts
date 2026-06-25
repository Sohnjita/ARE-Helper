import type { Division } from "../content/types";
import { DIVISION_ORDER } from "../content/divisions";
import type { AnswerRecord, ExamSimResult } from "./types";
import type { DeckState } from "./deckEngine";
import { BADGES, type Badge, type BadgeContext } from "./badges";
import { levelForXp } from "./gamification";

export interface DivisionStats {
  answered: number;
  correct: number;
  accuracy: number;
  cycles: number;
}

export function divisionStats(history: AnswerRecord[], deck: DeckState | undefined, division: Division): DivisionStats {
  const rows = history.filter((h) => h.division === division);
  const correct = rows.filter((h) => h.correct).length;
  return {
    answered: rows.length,
    correct,
    accuracy: rows.length ? Math.round((correct / rows.length) * 100) : 0,
    cycles: deck?.cycles ?? 0,
  };
}

export function overallStats(history: AnswerRecord[]): { answered: number; correct: number; accuracy: number } {
  const correct = history.filter((h) => h.correct).length;
  return {
    answered: history.length,
    correct,
    accuracy: history.length ? Math.round((correct / history.length) * 100) : 0,
  };
}

export function buildBadgeContext(
  xp: number,
  history: AnswerRecord[],
  decks: Record<Division | "ALL", DeckState>,
  bestStreak: number,
  dailyStreak: number,
  examSimResults: ExamSimResult[],
): BadgeContext {
  const perDivisionAnswered = {} as Record<Division, number>;
  const perDivisionCycles = {} as Record<Division, number>;
  for (const d of DIVISION_ORDER) {
    perDivisionAnswered[d] = history.filter((h) => h.division === d).length;
    perDivisionCycles[d] = decks[d]?.cycles ?? 0;
  }
  const passedDivisions = new Set(
    examSimResults.filter((r) => r.passed && r.division !== "ALL").map((r) => r.division),
  );

  return {
    totalAnswered: history.length,
    bestStreak,
    dailyStreak,
    level: levelForXp(xp),
    perDivisionAnswered,
    perDivisionCycles,
    examSimPasses: passedDivisions.size,
  };
}

export function earnedBadges(ctx: BadgeContext): Badge[] {
  return BADGES.filter((b) => b.earned(ctx));
}

export function lockedBadges(ctx: BadgeContext): Badge[] {
  return BADGES.filter((b) => !b.earned(ctx));
}
