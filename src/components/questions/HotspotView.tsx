import { useRef, useState } from "react";
import type { HotspotQuestion } from "../../content/types";
import type { AnswerResult } from "./types";
import { DIAGRAMS } from "../../content/diagrams";

const VIEWBOX_SIZE = 100;

function isInsideRegion(x: number, y: number, region: HotspotQuestion["correctRegion"]): boolean {
  if (region.shape === "circle") {
    const dx = x - (region.cx ?? 0);
    const dy = y - (region.cy ?? 0);
    return Math.sqrt(dx * dx + dy * dy) <= (region.r ?? 0);
  }
  const rx = region.x ?? 0;
  const ry = region.y ?? 0;
  const rw = region.w ?? 0;
  const rh = region.h ?? 0;
  return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh;
}

export default function HotspotView({
  question,
  submitted,
  result,
  onSubmit,
}: {
  question: HotspotQuestion;
  submitted: boolean;
  result: AnswerResult | null;
  onSubmit: (result: AnswerResult) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const Diagram = DIAGRAMS[question.diagramId];

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    if (submitted || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * VIEWBOX_SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * VIEWBOX_SIZE;
    setPoint({ x, y });
  }

  function submit() {
    if (!point) return;
    const correct = isInsideRegion(point.x, point.y, question.correctRegion);
    onSubmit({
      correct,
      yourAnswer: `point (${point.x.toFixed(0)}, ${point.y.toFixed(0)})`,
      correctAnswer: question.correctRegion.label ?? "the highlighted region",
    });
  }

  const region = question.correctRegion;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs uppercase tracking-wide text-indigo-300 font-semibold">
        Tap the diagram to select your answer
      </p>
      <div className="rounded-xl border-2 border-slate-700 bg-slate-50 overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          className={`w-full h-auto block ${submitted ? "" : "cursor-crosshair"}`}
          onClick={handleClick}
        >
          {Diagram && <Diagram />}

          {point && !submitted && (
            <circle cx={point.x} cy={point.y} r={2.2} fill="#6366f1" stroke="white" strokeWidth={0.6} />
          )}

          {submitted && point && (
            <circle
              cx={point.x}
              cy={point.y}
              r={2.2}
              fill={result?.correct ? "#10b981" : "#f43f5e"}
              stroke="white"
              strokeWidth={0.6}
            />
          )}

          {submitted && !result?.correct && (
            <>
              {region.shape === "circle" ? (
                <circle
                  cx={region.cx}
                  cy={region.cy}
                  r={region.r}
                  fill="#10b98133"
                  stroke="#10b981"
                  strokeWidth={0.8}
                  strokeDasharray="2,1"
                />
              ) : (
                <rect
                  x={region.x}
                  y={region.y}
                  width={region.w}
                  height={region.h}
                  fill="#10b98133"
                  stroke="#10b981"
                  strokeWidth={0.8}
                  strokeDasharray="2,1"
                />
              )}
            </>
          )}
        </svg>
      </div>
      {!submitted && (
        <button
          type="button"
          disabled={!point}
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
            : `Not quite. The correct location is outlined in green${region.label ? `: ${region.label}` : "."}`}
        </p>
      )}
    </div>
  );
}
