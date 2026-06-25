export default function StreakBadge({
  streakCurrent,
  dailyStreak,
}: {
  streakCurrent: number;
  dailyStreak: number;
}) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className="flex items-center gap-1 text-sm font-semibold text-amber-400" title="Correct-answer streak">
        🔥 {streakCurrent}
      </span>
      <span className="flex items-center gap-1 text-sm font-semibold text-sky-400" title="Daily study streak">
        📅 {dailyStreak}
      </span>
    </div>
  );
}
