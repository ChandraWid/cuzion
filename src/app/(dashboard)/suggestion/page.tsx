import { Icon } from "@/components/Icon";
import { AppIcon } from "@/components/AppIcon";

export default function SuggestionPage() {
  return (
    <section className="page-reveal p-5 md:p-8 max-w-[1500px]">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between xl:items-end gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-accent text-accent-foreground rounded-full text-[9px] uppercase tracking-wider font-extrabold mb-4">
            <Icon name="auto_awesome" className="!text-[13px]" />
            Monthly projection
          </div>

          <h1 className="display text-4xl md:text-5xl font-extrabold leading-[.9]">
            Next Month,
            <br />
            Suggested.
          </h1>

          <p className="text-sm text-muted max-w-xl mt-5 leading-relaxed">
            Use the most recently completed month as the basis for a forward-looking customer
            entry schedule.
          </p>
        </div>

        {/* Generation state */}
        <div className="bg-surface border border-line rounded-2xl p-4 min-w-[280px]">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[9px] uppercase tracking-wider font-extrabold text-muted">
                Projection status
              </div>
              <div className="font-extrabold text-sm mt-1">Ready to generate</div>
            </div>
            <span className="w-9 h-9 bg-accent text-accent-foreground rounded-xl flex items-center justify-center">
              <Icon name="check" />
            </span>
          </div>
        </div>
      </div>

      {/* Projection gate */}
      <div className="bg-surface border border-line rounded-2xl p-5 soft-shadow mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          <div className="w-12 h-12 shrink-0 bg-foreground text-accent rounded-xl flex items-center justify-center">
            <AppIcon name="chart" className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <div className="text-[9px] uppercase tracking-wider text-muted font-extrabold">
              Projection chain
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-3 py-1.5 bg-surface-soft rounded-lg text-xs font-extrabold">
                September 2026
              </span>
              <span className="text-muted">→</span>
              <span className="px-3 py-1.5 bg-accent text-accent-foreground rounded-lg text-xs font-extrabold">
                October 2026
              </span>
            </div>
            <p className="text-[10px] text-muted mt-2">
              Based on the most recently completed month&apos;s Cust Recap.
            </p>
          </div>

          <button className="bg-foreground text-background px-5 py-3.5 rounded-xl text-sm font-extrabold accent-shadow whitespace-nowrap min-h-[44px]">
            Generate Suggestion →
          </button>
        </div>
      </div>

      {/* Rule cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="bg-surface border border-line rounded-xl p-4">
          <div className="text-[9px] uppercase tracking-wider text-muted font-extrabold">
            Source
          </div>
          <div className="font-extrabold mt-2">September</div>
          <div className="text-[10px] text-muted mt-1">Completed month</div>
        </div>

        <div className="bg-surface border border-line rounded-xl p-4">
          <div className="text-[9px] uppercase tracking-wider text-muted font-extrabold">
            Candidates
          </div>
          <div className="font-extrabold mt-2">719 IDs</div>
          <div className="text-[10px] text-muted mt-1">Appeared last month</div>
        </div>

        <div className="bg-surface border border-line rounded-xl p-4">
          <div className="text-[9px] uppercase tracking-wider text-muted font-extrabold">
            Cooldown
          </div>
          <div className="font-extrabold mt-2">&ge; 7 days</div>
          <div className="text-[10px] text-muted mt-1">Between proposed entries</div>
        </div>

        <div className="bg-accent text-accent-foreground rounded-xl p-4">
          <div className="text-[9px] uppercase tracking-wider font-extrabold">Monthly cap</div>
          <div className="font-extrabold mt-2">&le; 4 / ID</div>
          <div className="text-[10px] mt-1">Maximum projection</div>
        </div>
      </div>

      {/* Projection result */}
      <div className="grid xl:grid-cols-[1fr_330px] gap-5">
        <div className="bg-surface border border-line rounded-2xl p-6 soft-shadow">
          <div className="flex items-center justify-between mb-5">
            <div className="text-xs font-extrabold">Projected schedule preview</div>
            <span className="mono text-[9px] text-muted">OCT 2026</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-[9px] uppercase tracking-wider text-muted mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }).map((_, i) => {
              const highlighted = [0, 4, 9, 13, 20, 27].includes(i);
              return (
                <div
                  key={i}
                  className={`calendar-cell rounded-lg border border-line p-2 text-[10px] ${
                    highlighted ? "bg-accent text-accent-foreground border-transparent" : ""
                  }`}
                >
                  <div className="font-extrabold">{i + 1}</div>
                  {highlighted && <div className="mono text-[8px] mt-1">3 IDs</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          <button className="w-full bg-foreground text-background py-3.5 rounded-xl text-sm font-extrabold min-h-[44px] flex items-center justify-center gap-2">
            <Icon name="file_download" className="!text-base" />
            Export Projection (.xlsx)
          </button>
        </div>
      </div>
    </section>
  );
}
