import { useState } from "react";
import type { SingleChoiceQuestion } from "../../content/types";
import type { AnswerResult } from "./types";

export default function SingleChoiceView({
  question,
  submitted,
  result,
  onSubmit,
}: {
  question: SingleChoiceQuestion;
  submitted: boolean;
  result: AnswerResult | null;
  onSubmit: (result: AnswerResult) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  function submit() {
    if (selected === null) return;
    const correct = selected === question.correctIndex;
    onSubmit({
      correct,
      yourAnswer: question.options[selected],
      correctAnswer: question.options[question.correctIndex],
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrectOpt = i === question.correctIndex;
          let cls =
            "text-left px-4 py-3 rounded-xl border-2 transition-colors text-sm sm:text-base";
          if (!submitted) {
            cls += isSelected
              ? " border-indigo-400 bg-indigo-500/20 text-white"
              : " border-slate-700 bg-slate-800/60 text-slate-200 active:bg-slate-700";
          } else if (isCorrectOpt) {
            cls += " border-emerald-400 bg-emerald-500/20 text-emerald-100";
          } else if (isSelected) {
            cls += " border-rose-400 bg-rose-500/20 text-rose-100";
          } else {
            cls += " border-slate-700 bg-slate-800/30 text-slate-400";
          }
          return (
            <button
              key={i}
              type="button"
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={cls}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {!submitted && (
        <button
          type="button"
          disabled={selected === null}
          onClick={submit}
          className="mt-1 rounded-xl bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 active:bg-indigo-600 transition-colors"
        >
          Check Answer
        </button>
      )}
      {submitted && result && (
        <p className={`text-sm font-medium ${result.correct ? "text-emerald-400" : "text-rose-400"}`}>
          {result.correct ? "Correct!" : `Not quite. Correct answer: ${result.correctAnswer}`}
        </p>
      )}
    </div>
  );
}
