import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Division, Question } from "../content/types";
import { DIVISION_ORDER } from "../content/divisions";
import { EMPTY_DECK, drawQuestions, type DeckState } from "./deckEngine";
import { xpForAnswer } from "./gamification";
import type { AnswerRecord, ExamSimResult } from "./types";

const HISTORY_LIMIT = 1000;
type DeckKey = Division | "ALL";

interface AppState {
  xp: number;
  history: AnswerRecord[];
  decks: Record<DeckKey, DeckState>;
  streakCurrent: number;
  bestStreak: number;
  dailyStreak: number;
  lastStudyDateISO: string | null;
  examSimResults: ExamSimResult[];

  drawPracticeBatch: (key: DeckKey, pool: Question[], count: number) => Question[];
  recordAnswer: (input: {
    question: Question;
    correct: boolean;
    yourAnswer: string;
    correctAnswer: string;
    timeSpentMs: number;
  }) => number;
  recordExamSimResult: (result: ExamSimResult) => void;
  resetDivisionDeck: (key: DeckKey) => void;
  resetAllProgress: () => void;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function emptyDecks(): Record<DeckKey, DeckState> {
  const decks = {} as Record<DeckKey, DeckState>;
  for (const d of DIVISION_ORDER) decks[d] = { ...EMPTY_DECK };
  decks.ALL = { ...EMPTY_DECK };
  return decks;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      xp: 0,
      history: [],
      decks: emptyDecks(),
      streakCurrent: 0,
      bestStreak: 0,
      dailyStreak: 0,
      lastStudyDateISO: null,
      examSimResults: [],

      drawPracticeBatch: (key, pool, count) => {
        const deck = get().decks[key] ?? EMPTY_DECK;
        const { drawn, nextDeck } = drawQuestions(pool, deck, count);
        set((s) => ({ decks: { ...s.decks, [key]: nextDeck } }));
        return drawn;
      },

      recordAnswer: ({ question, correct, yourAnswer, correctAnswer, timeSpentMs }) => {
        const state = get();
        const xpEarned = xpForAnswer(question.difficulty, correct, state.streakCurrent);
        const newStreak = correct ? state.streakCurrent + 1 : 0;

        const today = todayISO();
        let dailyStreak = state.dailyStreak;
        if (state.lastStudyDateISO !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          dailyStreak = state.lastStudyDateISO === yesterday ? state.dailyStreak + 1 : 1;
        }

        const record: AnswerRecord = {
          questionId: question.id,
          division: question.division,
          contentAreaCode: question.contentAreaCode,
          type: question.type,
          difficulty: question.difficulty,
          correct,
          prompt: question.prompt,
          yourAnswer,
          correctAnswer,
          explanation: question.explanation,
          timestamp: Date.now(),
          timeSpentMs,
          xpEarned,
        };

        set((s) => ({
          xp: s.xp + xpEarned,
          streakCurrent: newStreak,
          bestStreak: Math.max(s.bestStreak, newStreak),
          dailyStreak,
          lastStudyDateISO: today,
          history: [...s.history, record].slice(-HISTORY_LIMIT),
        }));

        return xpEarned;
      },

      recordExamSimResult: (result) => {
        set((s) => ({ examSimResults: [...s.examSimResults, result] }));
      },

      resetDivisionDeck: (key) => {
        set((s) => ({ decks: { ...s.decks, [key]: { ...EMPTY_DECK } } }));
      },

      resetAllProgress: () => {
        set({
          xp: 0,
          history: [],
          decks: emptyDecks(),
          streakCurrent: 0,
          bestStreak: 0,
          dailyStreak: 0,
          lastStudyDateISO: null,
          examSimResults: [],
        });
      },
    }),
    {
      name: "are-helper-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
