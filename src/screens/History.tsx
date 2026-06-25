import { useMemo, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { DIVISION_ORDER, DIVISIONS } from "../content/divisions";
import type { Division } from "../content/types";

export default function History() {
  const history = useAppStore((s) => s.history);
  const [filter, setFilter] = useState<Division | "ALL">("ALL");

  const rows = useMemo(() => {
    const filtered = filter === "ALL" ? history : history.filter((h) => h.division === filter);
    return [...filtered].reverse();
  }, [history, filter]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-white">History</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <FilterChip label="All" active={filter === "ALL"} onClick={() => setFilter("ALL")} />
        {DIVISION_ORDER.map((d) => (
          <FilterChip key={d} label={d} active={filter === d} onClick={() => setFilter(d)} />
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-slate-500">
          No questions answered yet{filter !== "ALL" ? ` in ${DIVISIONS[filter].name}` : ""}.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {rows.slice(0, 200).map((r, i) => (
            <div
              key={`${r.questionId}-${r.timestamp}-${i}`}
              className={`rounded-xl border p-3 ${
                r.correct ? "border-emerald-900 bg-emerald-500/5" : "border-rose-900 bg-rose-500/5"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {r.division} &middot; {r.contentAreaCode}
                </span>
                <span className={`text-xs font-bold ${r.correct ? "text-emerald-400" : "text-rose-400"}`}>
                  {r.correct ? "Correct" : "Incorrect"}
                </span>
              </div>
              <p className="text-sm text-white mt-1 line-clamp-2">{r.prompt}</p>
              <p className="text-xs text-slate-500 mt-1">{new Date(r.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        active ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"
      }`}
    >
      {label}
    </button>
  );
}
