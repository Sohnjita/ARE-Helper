import { useAppStore } from "../store/useAppStore";
import { buildBadgeContext, earnedBadges, lockedBadges, overallStats } from "../store/selectors";
import { levelProgress } from "../store/gamification";
import type { Badge } from "../store/badges";

export default function Stats() {
  const xp = useAppStore((s) => s.xp);
  const history = useAppStore((s) => s.history);
  const decks = useAppStore((s) => s.decks);
  const bestStreak = useAppStore((s) => s.bestStreak);
  const dailyStreak = useAppStore((s) => s.dailyStreak);
  const examSimResults = useAppStore((s) => s.examSimResults);

  const overall = overallStats(history);
  const { level } = levelProgress(xp);
  const ctx = buildBadgeContext(xp, history, decks, bestStreak, dailyStreak, examSimResults);
  const earned = earnedBadges(ctx);
  const locked = lockedBadges(ctx);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-white">Stats &amp; Achievements</h1>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Level" value={level} />
        <StatCard label="Total XP" value={xp} />
        <StatCard label="Best Streak" value={bestStreak} />
        <StatCard label="Accuracy" value={`${overall.accuracy}%`} />
      </div>

      <section className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-slate-300">
          Badges ({earned.length}/{earned.length + locked.length})
        </p>
        <div className="grid grid-cols-3 gap-2">
          {earned.map((b) => (
            <BadgeTile key={b.id} badge={b} earned />
          ))}
          {locked.map((b) => (
            <BadgeTile key={b.id} badge={b} earned={false} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

function BadgeTile({ badge, earned }: { badge: Badge; earned: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3 flex flex-col items-center gap-1 text-center ${
        earned ? "border-amber-500/40 bg-amber-500/10" : "border-slate-800 bg-slate-900/40 opacity-50"
      }`}
      title={badge.description}
    >
      <span className="text-2xl">{badge.emoji}</span>
      <span className="text-[11px] font-semibold text-white leading-tight">{badge.name}</span>
    </div>
  );
}
