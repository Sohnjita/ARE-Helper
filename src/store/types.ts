import type { Difficulty, Division, QuestionType } from "../content/types";

export interface AnswerRecord {
  questionId: string;
  division: Division;
  contentAreaCode: string;
  type: QuestionType;
  difficulty: Difficulty;
  correct: boolean;
  prompt: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
  timestamp: number;
  timeSpentMs: number;
  xpEarned: number;
}

export interface ExamSimResult {
  id: string;
  division: Division | "ALL";
  timestamp: number;
  totalQuestions: number;
  correctCount: number;
  durationMs: number;
  passed: boolean;
  byContentArea: Record<string, { correct: number; total: number }>;
}
