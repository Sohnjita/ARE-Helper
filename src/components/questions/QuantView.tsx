import { useState } from "react";
import type { QuantQuestion } from "../../content/types";
import type { AnswerResult } from "./types";

export default function QuantView({
  question,
  submitted,
  result,
  onSubmit,
}: {
  question: QuantQuestion;
  submitted: boolean;
  result: AnswerResult | null;
  onSubmit: (result: AnswerResult) => void;
}) {
  const [value, setValue] = useState("");

  function submit() {
    const parsed = parseFloat(value);
    if (Number.isNaN(parsed)) return;
    const correct = Math.abs(parsed - question.correctValue) <= question.tolerance;
    const unitSuffix = question.unit ? ` ${question.unit}` : "";
    onSubmit({
      correct,
      yourAnswer: `${parsed}${unitSuffix}`,
      correctAnswer: `${question.correctValue}${unitSuffix}`,
    });
  }

  let inputCls =
    "w-full rounded-xl border-2 bg-slate-800/60 px-4 py-3 text-lg text-white outline-none transition-colors";
  if (!submitted) {
    inputCls += " border-slate-700 focus:border-indigo-400";
  } else if (result?.correct) {
    inputCls += " border-emerald-400 bg-emerald-500/20 text-emerald-100";
  } else {
    inputCls += " border-rose-400 bg-rose-500/20 text-rose-100";
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          disabled={submitted}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a value"
          className={inputCls}
        />
        {question.unit && (
          <span className="shrink-0 text-sm font-medium text-slate-400">{question.unit}</span>
        )}
      </div>
      {!submitted && (
        <button
          type="button"
          disabled={value.trim() === ""}
          onClick={submit}
          className="mt-1 rounded-xl bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 active:bg-indigo-600 transition-colors"
        >
          Check Answer
        </button>
      )}
      {submitted && result && (
        <p className={`text-sm font-medium ${result.correct ? "text-emerald-400" : "text-rose-400"}`}>
          {result.correct
            ? "Correct!"
            : `Not quite. Correct answer: ${result.correctAnswer} (± ${question.tolerance}${question.unit ? ` ${question.unit}` : ""})`}
        </p>
      )}
    </div>
  );
}
