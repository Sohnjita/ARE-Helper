import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { DIVISION_ORDER, DIVISIONS } from "../content/divisions";
import { divisionStats, overallStats } from "../store/selectors";
import { questionCountByDivision } from "../content/questions";

export default function Dashboard() {
  const history = useAppStore((s) => s.history);
  const decks = useAppStore((s) => s.decks);
  const overall = overallStats(history);
  const counts = questionCountByDivision();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600/30 to-violet-600/10 border border-indigo-500/30 p-5">
        <p className="text-xs uppercase tracking-wide text-indigo-300 font-semibold">Overall progress</p>
        <div className="mt-2 flex items-end gap-4">
          <div>
            <p className="text-3xl font-bold text-white">{overall.accuracy}%</p>
            <p className="text-xs text-slate-400">accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{overall.answered}</p>
            <p className="text-xs text-slate-400">questions answered</p>
          </div>
        </div>
        <Link
          to="/practice/ALL"
          className="mt-4 inline-flex items-center justify-center w-full rounded-xl bg-indigo-500 text-white font-semibold py-3 active:bg-indigo-600 transition-colors"
        >
          Quick Practice (mixed)
        </Link>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-slate-300">Study by division</p>
        {DIVISION_ORDER.map((code) => {
          const meta = DIVISIONS[code];
          const deck = decks[code];
          const stats = divisionStats(history, deck, code);
          const total = counts[code] ?? 0;
          return (
            <Link
              key={code}
              to={`/division/${code}`}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center gap-3 active:bg-slate-800/60 transition-colors"
            >
              <span
                className="shrink-0 h-10 w-10 rounded-lg flex items-center justify-center font-bold text-sm text-white"
                style={{ backgroundColor: meta.color }}
              >
                {code}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{meta.name}</p>
                <p className="text-xs text-slate-400 truncate">{meta.shortDescription}</p>
                <div className="mt-1.5 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, Math.round((stats.answered / Math.max(total, 1)) * 100))}%`,
                      backgroundColor: meta.color,
                    }}
                  />
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-white">{stats.accuracy}%</p>
                <p className="text-[11px] text-slate-500">{stats.answered}/{total}</p>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
