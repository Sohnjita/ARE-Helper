import { useParams, Link, Navigate } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { DIVISIONS } from "../content/divisions";
import type { Division } from "../content/types";
import { divisionStats } from "../store/selectors";
import { questionsForDivision } from "../content/questions";

export default function DivisionDetail() {
  const { code } = useParams<{ code: string }>();
  const division = code as Division;
  const meta = DIVISIONS[division];
  const history = useAppStore((s) => s.history);
  const decks = useAppStore((s) => s.decks);
  const resetDivisionDeck = useAppStore((s) => s.resetDivisionDeck);

  if (!meta) return <Navigate to="/" replace />;

  const deck = decks[division];
  const stats = divisionStats(history, deck, division);
  const pool = questionsForDivision(division);

  const areaStats = meta.contentAreas.map((area) => {
    const rows = history.filter((h) => h.division === division && h.contentAreaCode === area.code);
    const correct = rows.filter((h) => h.correct).length;
    const total = pool.filter((q) => q.contentAreaCode === area.code).length;
    return {
      ...area,
      answered: rows.length,
      accuracy: rows.length ? Math.round((correct / rows.length) * 100) : 0,
      total,
    };
  });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link to="/" className="text-sm text-slate-400">
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold mt-1" style={{ color: meta.color }}>
          {meta.name}
        </h1>
        <p className="text-sm text-slate-400 mt-1">{meta.shortDescription}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Answered" value={stats.answered} />
        <Stat label="Accuracy" value={`${stats.accuracy}%`} />
        <Stat label="Cycles" value={stats.cycles} />
      </div>

      <div className="flex flex-col gap-2">
        <Link
          to={`/practice/${division}`}
          className="rounded-xl bg-indigo-500 text-white font-semibold py-3 text-center active:bg-indigo-600 transition-colors"
        >
          Start Practice
        </Link>
        <Link
          to={`/examsim/${division}`}
          className="rounded-xl border-2 border-indigo-500 text-indigo-300 font-semibold py-3 text-center active:bg-indigo-500/10 transition-colors"
        >
          Exam Simulation
        </Link>
      </div>

      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-300">Content areas</p>
        {areaStats.map((a) => (
          <div
            key={a.code}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-white">{a.name}</p>
              <p className="text-xs text-slate-500">{a.total} questions in bank</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">{a.accuracy}%</p>
              <p className="text-[11px] text-slate-500">{a.answered} answered</p>
            </div>
          </div>
        ))}
      </section>

      <button
        type="button"
        onClick={() => {
          if (
            confirm(
              `Reset practice progress for ${meta.name}? This clears the no-repeat deck (your answer history is kept).`,
            )
          ) {
            resetDivisionDeck(division);
          }
        }}
        className="text-xs text-slate-500 underline self-start"
      >
        Reset deck for this division
      </button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[11px] text-slate-500">{label}</p>
    </div>
  );
}
