import { AppIcon } from "@/components/AppIcon";

const DATASEND_ROWS = [
  { no: "01", id: "1205167123450987", count: 3 },
  { no: "02", id: "3273012508900012", count: 2 },
];

export default function RecapPage() {
  return (
    <section className="page-reveal p-5 md:p-8 max-w-[1500px]">
      <div className="mb-8">
        <div className="inline-flex px-2.5 py-1 bg-accent text-accent-foreground rounded-full text-[9px] uppercase tracking-wider font-extrabold mb-4">
          Reporting
        </div>

        <h1 className="display text-4xl md:text-5xl font-extrabold leading-[.95]">
          Customer
          <br />
          Files.
        </h1>

        <p className="text-sm text-muted mt-4 max-w-xl">
          Generate Excel reports from Customer Summary data.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recap export */}
        <div className="bg-surface border border-line rounded-2xl p-6 soft-shadow flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-xl flex items-center justify-center">
                <AppIcon name="custrecap" className="w-6 h-6" />
              </div>
              <span className="mono text-[9px] text-muted">XLSX / 01</span>
            </div>

            <h2 className="display text-2xl md:text-3xl font-extrabold mt-6">Cust Recap</h2>
            <p className="text-sm text-muted mt-2">
              Export recap data by date, custom range, or all available dates.
            </p>

            <div className="grid grid-cols-2 gap-2 mt-6">
              <input
                type="date"
                defaultValue="2026-09-01"
                className="border border-line rounded-lg px-3 py-3 text-xs font-bold bg-surface"
              />
              <input
                type="date"
                defaultValue="2026-09-11"
                className="border border-line rounded-lg px-3 py-3 text-xs font-bold bg-surface"
              />
            </div>

            <button className="w-full border border-line rounded-xl py-2.5 mt-3 text-xs font-extrabold">
              Use all dates to current
            </button>
          </div>

          <button className="w-full bg-foreground text-background py-3.5 rounded-xl mt-4 text-sm font-extrabold min-h-[44px]">
            Generate Excel →
          </button>
        </div>

        {/* DataSend */}
        <div className="bg-foreground text-background rounded-2xl p-6 flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-xl flex items-center justify-center">
                <AppIcon name="datasend" className="w-6 h-6" />
              </div>
              <span className="mono text-[9px] text-background/40">XLSX / 02</span>
            </div>

            <h2 className="display text-2xl md:text-3xl font-extrabold mt-6">DataSend.</h2>
            <p className="text-sm text-background/50 mt-2">
              Aggregate unique Customer IDs and their recap Tab Count.
            </p>

            <div className="border border-white/10 rounded-xl mt-6 overflow-hidden">
              <div className="grid grid-cols-[50px_1fr_100px] px-4 py-3 bg-white/5 text-[9px] uppercase tracking-wider text-background/40">
                <span>No.</span>
                <span>Cust ID</span>
                <span>Tab Count</span>
              </div>
              {DATASEND_ROWS.map((row) => (
                <div
                  key={row.no}
                  className="grid grid-cols-[50px_1fr_100px] px-4 py-3 border-t border-white/10 text-xs"
                >
                  <span>{row.no}</span>
                  <span className="mono">{row.id}</span>
                  <strong>{row.count}</strong>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-accent text-accent-foreground py-3.5 rounded-xl mt-4 text-sm font-extrabold min-h-[44px]">
            Generate DataSend →
          </button>
        </div>
      </div>
    </section>
  );
}
