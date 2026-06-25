import { useAppStore } from "../store/useAppStore";
import { DIVISION_ORDER, DIVISIONS } from "../content/divisions";

export default function Settings() {
  const resetDivisionDeck = useAppStore((s) => s.resetDivisionDeck);
  const resetAllProgress = useAppStore((s) => s.resetAllProgress);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-white">Settings</h1>

      <section className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-slate-300">Reset a division&apos;s deck</p>
        <p className="text-xs text-slate-500">
          Clears the no-repeat question queue for one division. Answer history and XP are kept.
        </p>
        <div className="flex flex-col gap-2 mt-1">
          {DIVISION_ORDER.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                if (confirm(`Reset the practice deck for ${DIVISIONS[d].name}?`)) resetDivisionDeck(d);
              }}
              className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-left text-sm text-white active:bg-slate-800 transition-colors"
            >
              Reset {DIVISIONS[d].name}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2 border-t border-slate-800 pt-5">
        <p className="text-sm font-semibold text-rose-400">Danger zone</p>
        <button
          type="button"
          onClick={() => {
            if (
              confirm(
                "Reset ALL progress? This clears XP, streaks, history, decks, and exam results. This cannot be undone.",
              )
            ) {
              resetAllProgress();
            }
          }}
          className="rounded-xl border-2 border-rose-500 text-rose-300 font-semibold py-3 active:bg-rose-500/10 transition-colors"
        >
          Reset all progress
        </button>
      </section>

      <section className="text-xs text-slate-600 border-t border-slate-800 pt-5">
        <p>
          ARE Helper is an original, unofficial study tool modeled on NCARB&apos;s publicly published ARE 5.0 exam
          content outlines. Not affiliated with or endorsed by NCARB, AIA, Amber Book, or Black Spectacles.
        </p>
      </section>
    </div>
  );
}
