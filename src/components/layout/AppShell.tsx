import { Outlet, Link } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import XpBar from "./XpBar";
import StreakBadge from "./StreakBadge";
import NavBar from "./NavBar";

export default function AppShell() {
  const xp = useAppStore((s) => s.xp);
  const streakCurrent = useAppStore((s) => s.streakCurrent);
  const dailyStreak = useAppStore((s) => s.dailyStreak);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto w-full">
          <Link to="/" className="shrink-0 font-bold text-lg tracking-tight text-white">
            ARE<span className="text-indigo-400">Helper</span>
          </Link>
          <div className="flex-1 min-w-0">
            <XpBar xp={xp} />
          </div>
          <StreakBadge streakCurrent={streakCurrent} dailyStreak={dailyStreak} />
        </div>
      </header>

      <main className="flex-1 px-4 py-4 pb-24 max-w-2xl mx-auto w-full">
        <Outlet />
      </main>

      <NavBar />
    </div>
  );
}
