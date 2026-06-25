import type { Difficulty } from "../content/types";

const BASE_XP: Record<Difficulty, number> = { easy: 10, medium: 20, hard: 35 };

/** Streak multiplier: +10% per consecutive correct answer, capped at 2x (streak 10+). */
export function streakMultiplier(streakBeforeThisAnswer: number): number {
  return Math.min(2, 1 + streakBeforeThisAnswer * 0.1);
}

export function xpForAnswer(difficulty: Difficulty, correct: boolean, streakBeforeThisAnswer: number): number {
  if (!correct) return 0;
  return Math.round(BASE_XP[difficulty] * streakMultiplier(streakBeforeThisAnswer));
}

/** Triangular XP curve: level n requires a cumulative total of 75 * n * (n+1) XP. */
export function levelForXp(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level++;
  return level;
}

export function xpForLevel(level: number): number {
  return 75 * (level - 1) * level;
}

export function levelProgress(xp: number): { level: number; current: number; needed: number; pct: number } {
  const level = levelForXp(xp);
  const floor = xpForLevel(level);
  const ceil = xpForLevel(level + 1);
  const current = xp - floor;
  const needed = ceil - floor;
  return { level, current, needed, pct: Math.min(100, Math.round((current / needed) * 100)) };
}
