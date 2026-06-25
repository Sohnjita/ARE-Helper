import { useState } from "react";
import type { MultiChoiceQuestion } from "../../content/types";
import type { AnswerResult } from "./types";

export default function MultiChoiceView({
  question,
  submitted,
  result,
  onSubmit,
}: {
  question: MultiChoiceQuestion;
  submitted: boolean;
  result: AnswerResult | null;
  onSubmit: (result: AnswerResult) => void;
}) {
  const [selected, setSelected] = useState<number[]>([]);

  function toggle(i: number) {
    if (submitted) return;
    setSelected((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i);
      if (prev.length >= question.selectCount) return prev;
      return [...prev, i];
    });
  }

  function submit() {
    const correctSet = new Set(question.correctIndexes);
    const selectedSet = new Set(selected);
    const correct =
      selectedSet.size === correctSet.size && [...selectedSet].every((i) => correctSet.has(i));
    onSubmit({
      correct,
      yourAnswer: selected.map((i) => question.options[i]).join("; "),
      correctAnswer: question.correctIndexes.map((i) => question.options[i]).join("; "),
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs uppercase tracking-wide text-indigo-300 font-semibold">
        Select {question.selectCount} ({selected.length}/{question.selectCount} chosen)
      </p>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => {
          const isSelected = selected.includes(i);
          const isCorrectOpt = question.correctIndexes.includes(i);
          let cls =
            "text-left px-4 py-3 rounded-xl border-2 transition-colors text-sm sm:text-base flex items-center gap-2";
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
              onClick={() => toggle(i)}
              className={cls}
            >
              <span
                className={`inline-flex h-4 w-4 shrink-0 rounded border ${
                  isSelected ? "bg-indigo-400 border-indigo-400" : "border-slate-500"
                }`}
              />
              {opt}
            </button>
          );
        })}
      </div>
      {!submitted && (
        <button
          type="button"
          disabled={selected.length !== question.selectCount}
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
