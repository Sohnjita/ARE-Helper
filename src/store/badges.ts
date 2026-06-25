import type { Division } from "../content/types";
import { DIVISIONS, DIVISION_ORDER } from "../content/divisions";

export interface BadgeContext {
  totalAnswered: number;
  bestStreak: number;
  dailyStreak: number;
  level: number;
  perDivisionAnswered: Record<Division, number>;
  perDivisionCycles: Record<Division, number>;
  examSimPasses: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earned: (ctx: BadgeContext) => boolean;
}

const divisionBadges: Badge[] = DIVISION_ORDER.flatMap((div: Division) => [
  {
    id: `novice-${div}`,
    name: `${div} Novice`,
    description: `Answer 20 ${DIVISIONS[div].name} questions`,
    emoji: "🌱",
    earned: (ctx) => ctx.perDivisionAnswered[div] >= 20,
  },
  {
    id: `mastery-${div}`,
    name: `${div} Completionist`,
    description: `See every question in the ${DIVISIONS[div].name} bank at least once`,
    emoji: "🏆",
    earned: (ctx) => ctx.perDivisionCycles[div] >= 1,
  },
]);

export const BADGES: Badge[] = [
  {
    id: "first-question",
    name: "First Steps",
    description: "Answer your first question",
    emoji: "👣",
    earned: (ctx) => ctx.totalAnswered >= 1,
  },
  {
    id: "fifty-club",
    name: "Fifty Club",
    description: "Answer 50 questions total",
    emoji: "📚",
    earned: (ctx) => ctx.totalAnswered >= 50,
  },
  {
    id: "century",
    name: "Century",
    description: "Answer 100 questions total",
    emoji: "💯",
    earned: (ctx) => ctx.totalAnswered >= 100,
  },
  {
    id: "five-hundred",
    name: "Dedicated Candidate",
    description: "Answer 500 questions total",
    emoji: "🎓",
    earned: (ctx) => ctx.totalAnswered >= 500,
  },
  {
    id: "streak-5",
    name: "On a Roll",
    description: "Get a 5-question correct streak",
    emoji: "🔥",
    earned: (ctx) => ctx.bestStreak >= 5,
  },
  {
    id: "streak-10",
    name: "Unstoppable",
    description: "Get a 10-question correct streak",
    emoji: "🚀",
    earned: (ctx) => ctx.bestStreak >= 10,
  },
  {
    id: "streak-20",
    name: "Perfect Recall",
    description: "Get a 20-question correct streak",
    emoji: "🧠",
    earned: (ctx) => ctx.bestStreak >= 20,
  },
  {
    id: "daily-3",
    name: "Building a Habit",
    description: "Study 3 days in a row",
    emoji: "📅",
    earned: (ctx) => ctx.dailyStreak >= 3,
  },
  {
    id: "daily-7",
    name: "Weekly Warrior",
    description: "Study 7 days in a row",
    emoji: "🗓️",
    earned: (ctx) => ctx.dailyStreak >= 7,
  },
  {
    id: "daily-30",
    name: "Iron Discipline",
    description: "Study 30 days in a row",
    emoji: "🛡️",
    earned: (ctx) => ctx.dailyStreak >= 30,
  },
  {
    id: "level-5",
    name: "Level 5",
    description: "Reach level 5",
    emoji: "⭐",
    earned: (ctx) => ctx.level >= 5,
  },
  {
    id: "level-10",
    name: "Level 10",
    description: "Reach level 10",
    emoji: "🌟",
    earned: (ctx) => ctx.level >= 10,
  },
  {
    id: "exam-ready",
    name: "Exam Ready",
    description: "Pass an exam simulation",
    emoji: "📝",
    earned: (ctx) => ctx.examSimPasses >= 1,
  },
  {
    id: "all-rounder",
    name: "All-Rounder",
    description: "Pass an exam simulation in all 6 divisions",
    emoji: "👑",
    earned: (ctx) => ctx.examSimPasses >= 6,
  },
  ...divisionBadges,
];
