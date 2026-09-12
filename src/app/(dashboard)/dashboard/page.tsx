import { Icon } from "@/components/Icon";

const CUSTOMERS = [
  {
    id: "1205167123450987",
    name: "John Doe",
    placeOfBirth: "Bandung",
    dateOfBirth: "12 / 04 / 1998",
    status: "ACTIVE",
  },
  {
    id: "3273012508900012",
    name: "Jane Smith",
    placeOfBirth: "Jakarta",
    dateOfBirth: "25 / 08 / 1990",
    status: "ACTIVE",
  },
  {
    id: "5104032101920034",
    name: "Made Wijaya",
    placeOfBirth: "Denpasar",
    dateOfBirth: "21 / 01 / 1992",
    status: "ACTIVE",
  },
];

export default function DashboardPage() {
  return (
    <section className="page-reveal p-5 md:p-8 max-w-[1500px]">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex px-2.5 py-1 bg-accent text-accent-foreground rounded-full text-[9px] uppercase tracking-wider font-extrabold mb-4">
            Master data
          </div>

          <h1 className="display text-4xl md:text-5xl font-extrabold leading-[.95]">
            Customer
            <br />
            Database.
          </h1>

          <p className="text-sm text-muted max-w-xl mt-4 leading-relaxed">
            The single source for customer master records. Register, search, update and
            manage customer information.
          </p>
        </div>

        <button className="bg-foreground text-background px-5 py-3.5 rounded-xl text-sm font-extrabold accent-shadow inline-flex items-center gap-2 justify-center min-h-[44px]">
          <Icon name="add" className="!text-base" />
          Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface border border-line rounded-2xl p-5 soft-shadow">
          <div className="flex justify-between">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-muted">
              Total customers
            </span>
            <span className="mono text-[9px] text-muted">DB-01</span>
          </div>
          <div className="display text-4xl font-extrabold mt-4">12,482</div>
          <div className="text-xs text-muted mt-2">Registered master records</div>
        </div>

        <div className="bg-foreground text-background rounded-2xl p-5">
          <div className="flex justify-between">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-background/50">
              Today&apos;s recap
            </span>
            <span className="mono text-[9px] text-background/40">LIVE</span>
          </div>
          <div className="display text-4xl font-extrabold mt-4">37</div>
          <div className="text-xs text-background/50 mt-2">Customers processed today</div>
        </div>

        <div className="bg-accent text-accent-foreground rounded-2xl p-5">
          <div className="flex justify-between">
            <span className="text-[9px] uppercase tracking-wider font-extrabold">
              Customers inputted
            </span>
            <span className="mono text-[9px]">7D</span>
          </div>

          <div className="mt-4">
            <svg viewBox="0 0 220 70" className="w-full h-[70px]" preserveAspectRatio="none">
              <defs>
                <linearGradient id="inputTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,60 L37,41 L73,51 L110,29 L147,37 L183,20 L220,6 L220,70 L0,70 Z"
                fill="url(#inputTrend)"
              />
              <polyline
                points="0,60 37,41 73,51 110,29 147,37 183,20 220,6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex justify-between text-[9px] font-bold mt-1 opacity-70">
              {["07", "08", "09", "10", "11", "12", "13"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer table */}
      <div className="bg-surface border border-line rounded-2xl overflow-hidden soft-shadow">
        <div className="p-4 border-b border-line flex flex-col sm:flex-row gap-3 sm:justify-between">
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              placeholder="Search ID or customer name..."
              className="max-w-md w-full border border-line rounded-lg px-4 py-2.5 text-xs font-bold outline-none bg-surface"
            />
            <button className="border border-line rounded-lg px-4 text-xs font-extrabold inline-flex items-center gap-1.5 shrink-0">
              <Icon name="filter_list" className="!text-base" />
              Filter
            </button>
          </div>

          <button className="border border-line rounded-lg px-4 py-2.5 sm:py-0 text-xs font-extrabold inline-flex items-center gap-1.5 justify-center shrink-0">
            <Icon name="file_download" className="!text-base" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="bg-surface-soft">
              <tr>
                <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wider">
                  Customer ID
                </th>
                <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wider">
                  Place of Birth
                </th>
                <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-5 py-3 text-[9px] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.id} className="border-t border-line hover:bg-surface-soft">
                  <td className="px-5 py-4 mono text-xs font-bold">{c.id}</td>
                  <td className="px-5 py-4 text-sm font-extrabold">{c.name}</td>
                  <td className="px-5 py-4 text-sm">{c.placeOfBirth}</td>
                  <td className="px-5 py-4 mono text-xs">{c.dateOfBirth}</td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded-full bg-success-bg text-success-text text-[9px] font-extrabold">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-xs font-extrabold underline underline-offset-4">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
