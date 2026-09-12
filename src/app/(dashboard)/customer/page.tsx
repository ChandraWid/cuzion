import { Icon } from "@/components/Icon";

const RECAP_ENTRIES = [
  { id: "1205167123450987", name: "John Doe", date: "Sep 11, 2026" },
  { id: "3273012508900012", name: "Jane Smith", date: "Sep 11, 2026" },
  { id: "5104032101920034", name: "Made Wijaya", date: "Sep 10, 2026" },
];

export default function CustomerPage() {
  return (
    <section className="page-reveal p-5 md:p-8 max-w-[1500px]">
      <div className="mb-8">
        <div className="inline-flex px-2.5 py-1 bg-accent text-accent-foreground rounded-full text-[9px] uppercase tracking-wider font-extrabold mb-4">
          Daily operations
        </div>

        <h1 className="display text-4xl md:text-5xl font-extrabold leading-[.95]">
          Customer
          <br />
          Summary.
        </h1>

        <p className="text-sm text-muted mt-4 max-w-xl">
          Quickly record processed customers using only their Customer ID. Customer information
          is resolved automatically.
        </p>
      </div>

      <div className="grid xl:grid-cols-[1fr_340px] gap-5">
        {/* Entry panel */}
        <div className="bg-surface border border-line rounded-2xl p-6 soft-shadow">
          <div className="flex justify-between mb-7">
            <div>
              <div className="text-xs font-extrabold">New recap entry</div>
              <div className="text-[10px] text-muted mt-1">Entry date: September 11, 2026</div>
            </div>
            <span className="mono text-[9px] text-muted">REC-NEW</span>
          </div>

          <label className="text-xs font-extrabold">Customer ID</label>
          <div className="relative mt-2">
            <input
              maxLength={16}
              placeholder="Enter 16-digit Customer ID..."
              className="w-full border-2 border-foreground rounded-xl px-4 py-4 mono text-lg font-bold outline-none bg-surface"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-surface-soft rounded px-2 py-1 text-[8px] mono">
              16 DIGITS
            </span>
          </div>

          {/* Autocomplete */}
          <div className="mt-2 border border-line rounded-xl overflow-hidden">
            <div className="bg-surface-soft px-4 py-3 text-[9px] uppercase tracking-wider font-extrabold">
              Suggested customer
            </div>
            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-accent hover:text-accent-foreground text-left transition-colors">
              <div>
                <div className="mono text-xs font-bold">1205167123450987</div>
                <div className="text-xs font-extrabold mt-1">John Doe</div>
              </div>
              <Icon name="chevron_right" />
            </button>
          </div>

          {/* Business rule status */}
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            <div className="border border-line rounded-xl p-3">
              <div className="text-[9px] uppercase tracking-wider font-extrabold text-muted">
                7-day cooldown
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-success-bg text-success-text text-[9px] font-extrabold">
                  CLEAR
                </span>
                <span className="text-[10px] text-muted">Last entered Sep 1</span>
              </div>
            </div>
            <div className="border border-line rounded-xl p-3">
              <div className="text-[9px] uppercase tracking-wider font-extrabold text-muted">
                Monthly cap
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded-full bg-warning-bg text-warning-text text-[9px] font-extrabold">
                  3 / 4
                </span>
                <span className="text-[10px] text-muted">September 2026</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-foreground text-background py-3.5 rounded-xl mt-5 text-sm font-extrabold min-h-[44px]">
            Record Entry →
          </button>
        </div>

        {/* Summary sidebar */}
        <div className="space-y-5">
          <div className="bg-accent text-accent-foreground rounded-2xl p-5">
            <div className="text-[9px] uppercase tracking-wider font-extrabold">
              Daily count summary
            </div>
            <div className="display text-4xl font-extrabold mt-4">37</div>
            <div className="text-xs mt-2">Customers entered on Sep 11, 2026</div>
          </div>

          <div className="bg-surface border border-line rounded-2xl p-5 soft-shadow">
            <div className="text-[9px] uppercase tracking-wider font-extrabold text-muted mb-3">
              Filter recap
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                defaultValue="2026-09-11"
                className="border border-line rounded-lg px-3 py-2.5 text-xs font-bold bg-surface"
              />
              <input
                type="date"
                defaultValue="2026-09-11"
                className="border border-line rounded-lg px-3 py-2.5 text-xs font-bold bg-surface"
              />
            </div>
            <button className="w-full border border-line rounded-lg py-2.5 mt-3 text-xs font-extrabold">
              Apply filter
            </button>
          </div>
        </div>
      </div>

      {/* Recap table */}
      <div className="bg-surface border border-line rounded-2xl overflow-hidden soft-shadow mt-5">
        <div className="p-4 border-b border-line flex items-center justify-between">
          <div className="text-xs font-extrabold">Recap entries</div>
          <span className="text-[10px] text-muted">Most recent first</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead className="bg-surface-soft">
              <tr>
                <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wider">
                  Customer ID
                </th>
                <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wider">
                  Date entered
                </th>
              </tr>
            </thead>
            <tbody>
              {RECAP_ENTRIES.map((entry, i) => (
                <tr key={i} className="border-t border-line hover:bg-surface-soft">
                  <td className="px-5 py-4 mono text-xs font-bold">{entry.id}</td>
                  <td className="px-5 py-4 text-sm font-extrabold">{entry.name}</td>
                  <td className="px-5 py-4 mono text-xs">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
