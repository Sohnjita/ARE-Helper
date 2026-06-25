import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { DIVISIONS } from "../content/divisions";
import type { Division, Question } from "../content/types";
import { poolFor } from "../content/questions";
import { drawExamSimQuestions } from "../store/deckEngine";
import QuestionCard from "../components/questions/QuestionCard";
import type { AnswerResult } from "../components/questions/types";
import type { ExamSimResult } from "../store/types";

const EXAM_SIZE = 30;
const PASS_THRESHOLD = 0.7;

type DeckKey = Division | "ALL";

interface ScoredAnswer {
  contentAreaCode: string;
  correct: boolean;
}

export default function ExamSim() {
  const { key } = useParams<{ key: string }>();
  const deckKey = key as DeckKey;
  const isValid = deckKey === "ALL" || !!DIVISIONS[deckKey as Division];

  const recordExamSimResult = useAppStore((s) => s.recordExamSimResult);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<ScoredAnswer[]>([]);
  const [result, setResult] = useState<ExamSimResult | null>(null);
  const startRef = useRef(Date.now());

  function startExam() {
    const pool = poolFor(deckKey);
    setQuestions(drawExamSimQuestions(pool, EXAM_SIZE));
    setIndex(0);
    setAnswers([]);
    setResult(null);
    startRef.current = Date.now();
  }

  useEffect(() => {
    if (!isValid) return;
    startExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckKey, isValid]);

  if (!isValid) return <Navigate to="/" replace />;

  const question = questions[index];
  const title =
    deckKey === "ALL" ? "Mixed Exam Simulation" : `${DIVISIONS[deckKey as Division].name} Exam Simulation`;

  function handleAnswered(answerResult: AnswerResult) {
    if (!question) return;
    setAnswers((prev) => [...prev, { contentAreaCode: question.contentAreaCode, correct: answerResult.correct }]);
  }

  function handleNext() {
    if (index + 1 >= questions.length) {
      finish();
    } else {
      setIndex((i) => i + 1);
    }
  }

  function finish() {
    const byContentArea: Record<string, { correct: number; total: number }> = {};
    for (const a of answers) {
      const bucket = byContentArea[a.contentAreaCode] ?? { correct: 0, total: 0 };
      bucket.total += 1;
      if (a.correct) bucket.correct += 1;
      byContentArea[a.contentAreaCode] = bucket;
    }
    const correctCount = answers.filter((a) => a.correct).length;
    const totalQuestions = answers.length;
    const passed = totalQuestions > 0 && correctCount / totalQuestions >= PASS_THRESHOLD;
    const finalResult: ExamSimResult = {
      id: `exam-${Date.now()}`,
      division: deckKey,
      timestamp: Date.now(),
      totalQuestions,
      correctCount,
      durationMs: Date.now() - startRef.current,
      passed,
      byContentArea,
    };
    recordExamSimResult(finalResult);
    setResult(finalResult);
  }

  if (result) {
    return <ExamSimSummary result={result} deckKey={deckKey} onRetake={startExam} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link to={deckKey === "ALL" ? "/" : `/division/${deckKey}`} className="text-sm text-slate-400">
          &larr; Exit (no score saved)
        </Link>
        <p className="text-sm font-semibold text-slate-300">{title}</p>
      </div>

      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-indigo-500 transition-all"
          style={{ width: `${questions.length ? ((index + 1) / questions.length) * 100 : 0}%` }}
        />
      </div>
      <p className="text-xs text-slate-500">
        Question {Math.min(index + 1, questions.length)} of {questions.length}
      </p>

      {question ? (
        <QuestionCard key={question.id} question={question} onAnswered={handleAnswered} onNext={handleNext} />
      ) : (
        <p className="text-sm text-slate-500">Not enough questions are available yet to run this simulation.</p>
      )}
    </div>
  );
}

function ExamSimSummary({
  result,
  deckKey,
  onRetake,
}: {
  result: ExamSimResult;
  deckKey: DeckKey;
  onRetake: () => void;
}) {
  const pct = result.totalQuestions ? Math.round((result.correctCount / result.totalQuestions) * 100) : 0;
  return (
    <div className="flex flex-col gap-5">
      <div
        className={`rounded-2xl border-2 p-6 text-center ${
          result.passed ? "border-emerald-400 bg-emerald-500/10" : "border-rose-400 bg-rose-500/10"
        }`}
      >
        <p className="text-5xl font-bold text-white">{pct}%</p>
        <p className={`mt-1 text-lg font-semibold ${result.passed ? "text-emerald-400" : "text-rose-400"}`}>
          {result.passed ? "Pass" : "Not Yet Passing"}
        </p>
        <p className="text-sm text-slate-400 mt-1">
          {result.correctCount} / {result.totalQuestions} correct
        </p>
      </div>

      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-300">By content area</p>
        {Object.entries(result.byContentArea).map(([code, s]) => (
          <div
            key={code}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 flex items-center justify-between"
          >
            <p className="text-sm font-medium text-white">{code}</p>
            <p className="text-sm text-slate-400">
              {s.correct}/{s.total}
            </p>
          </div>
        ))}
      </section>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onRetake}
          className="rounded-xl bg-indigo-500 text-white font-semibold py-3 text-center active:bg-indigo-600 transition-colors"
        >
          Retake
        </button>
        <Link
          to={deckKey === "ALL" ? "/" : `/division/${deckKey}`}
          className="rounded-xl border-2 border-slate-700 text-slate-300 font-semibold py-3 text-center active:bg-slate-800 transition-colors"
        >
          Done
        </Link>
      </div>
    </div>
  );
}
