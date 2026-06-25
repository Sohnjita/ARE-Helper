import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "Home", icon: "🏠", end: true },
  { to: "/history", label: "History", icon: "📜", end: false },
  { to: "/stats", label: "Stats", icon: "🏆", end: false },
  { to: "/settings", label: "Settings", icon: "⚙️", end: false },
];

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-slate-800 bg-slate-950/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <div className="flex">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? "text-indigo-400" : "text-slate-500"
              }`
            }
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
