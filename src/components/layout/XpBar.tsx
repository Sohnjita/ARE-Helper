import { levelProgress } from "../../store/gamification";

export default function XpBar({ xp }: { xp: number }) {
  const { level, current, needed, pct } = levelProgress(xp);

  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="shrink-0 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold h-6 w-6 flex items-center justify-center">
        {level}
      </span>
      <div className="flex-1 min-w-0">
        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span className="shrink-0 text-[11px] text-slate-500 tabular-nums">
        {current}/{needed}
      </span>
    </div>
  );
}
