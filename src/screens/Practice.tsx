import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { DIVISIONS } from "../content/divisions";
import type { Division, Question } from "../content/types";
import { poolFor } from "../content/questions";
import QuestionCard from "../components/questions/QuestionCard";
import type { AnswerResult } from "../components/questions/types";

const BATCH_SIZE = 10;

type DeckKey = Division | "ALL";

export default function Practice() {
  const { key } = useParams<{ key: string }>();
  const deckKey = key as DeckKey;
  const isValid = deckKey === "ALL" || !!DIVISIONS[deckKey as Division];

  const drawPracticeBatch = useAppStore((s) => s.drawPracticeBatch);
  const recordAnswer = useAppStore((s) => s.recordAnswer);

  const [queue, setQueue] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(0);
  const [lastXp, setLastXp] = useState<number | null>(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (!isValid) return;
    const pool = poolFor(deckKey);
    const drawn = drawPracticeBatch(deckKey, pool, BATCH_SIZE);
    setQueue(drawn);
    setIndex(0);
    setSessionCorrect(0);
    setSessionAnswered(0);
    setLastXp(null);
    startRef.current = Date.now();
  }, [deckKey, isValid, drawPracticeBatch]);

  if (!isValid) return <Navigate to="/" replace />;

  const question = queue[index];
  const title = deckKey === "ALL" ? "Mixed Practice" : DIVISIONS[deckKey as Division].name;

  function handleAnswered(result: AnswerResult) {
    if (!question) return;
    const timeSpentMs = Date.now() - startRef.current;
    const xp = recordAnswer({
      question,
      correct: result.correct,
      yourAnswer: result.yourAnswer,
      correctAnswer: result.correctAnswer,
      timeSpentMs,
    });
    setLastXp(xp);
    setSessionAnswered((n) => n + 1);
    if (result.correct) setSessionCorrect((n) => n + 1);
  }

  function handleNext() {
    startRef.current = Date.now();
    if (index + 1 >= queue.length) {
      const pool = poolFor(deckKey);
      const drawn = drawPracticeBatch(deckKey, pool, BATCH_SIZE);
      setQueue(drawn);
      setIndex(0);
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link to={deckKey === "ALL" ? "/" : `/division/${deckKey}`} className="text-sm text-slate-400">
          &larr; End session
        </Link>
        <p className="text-sm font-semibold text-slate-300">{title}</p>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Session: {sessionCorrect}/{sessionAnswered} correct
        </span>
        {lastXp !== null && lastXp > 0 && <span className="text-amber-400 font-semibold">+{lastXp} XP</span>}
      </div>

      {question ? (
        <QuestionCard key={question.id} question={question} onAnswered={handleAnswered} onNext={handleNext} />
      ) : (
        <p className="text-sm text-slate-500">No questions available for this selection yet.</p>
      )}
    </div>
  );
}
