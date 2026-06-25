import { useState } from "react";
import type { Question } from "../../content/types";
import type { AnswerResult } from "./types";
import SingleChoiceView from "./SingleChoiceView";
import MultiChoiceView from "./MultiChoiceView";
import QuantView from "./QuantView";
import HotspotView from "./HotspotView";

const DIFFICULTY_LABEL: Record<Question["difficulty"], string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

/**
 * Renders one question of any type and shows the explanation + Next button
 * once answered. Callers should mount this with `key={question.id}` so each
 * new question gets a fresh component instance (and fresh local state).
 */
export default function QuestionCard({
  question,
  onAnswered,
  onNext,
}: {
  question: Question;
  onAnswered: (result: AnswerResult) => void;
  onNext: () => void;
}) {
  const [result, setResult] = useState<AnswerResult | null>(null);
  const submitted = result !== null;

  function handleSubmit(r: AnswerResult) {
    setResult(r);
    onAnswered(r);
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {question.division} &middot; {question.contentAreaCode} &middot; {DIFFICULTY_LABEL[question.difficulty]}
        </p>
        <p className="text-base sm:text-lg text-white font-medium leading-snug whitespace-pre-line">
          {question.prompt}
        </p>
      </div>

      {question.type === "single" && (
        <SingleChoiceView question={question} submitted={submitted} result={result} onSubmit={handleSubmit} />
      )}
      {question.type === "multi" && (
        <MultiChoiceView question={question} submitted={submitted} result={result} onSubmit={handleSubmit} />
      )}
      {question.type === "quant" && (
        <QuantView question={question} submitted={submitted} result={result} onSubmit={handleSubmit} />
      )}
      {question.type === "hotspot" && (
        <HotspotView question={question} submitted={submitted} result={result} onSubmit={handleSubmit} />
      )}

      {submitted && (
        <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
          <p className="text-sm text-slate-300 leading-relaxed">{question.explanation}</p>
          <button
            type="button"
            onClick={onNext}
            className="rounded-xl bg-emerald-500 text-white font-semibold py-3 active:bg-emerald-600 transition-colors"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}
