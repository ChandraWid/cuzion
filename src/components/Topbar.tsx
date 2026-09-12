"use client";

import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./Icon";

interface TopbarProps {
  breadcrumb: string;
  dateLabel: string;
  onMenuClick: () => void;
}

export function Topbar({ breadcrumb, dateLabel, onMenuClick }: TopbarProps) {
  return (
    <header className="h-[76px] bg-surface/90 backdrop-blur border-b border-line px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="lg:hidden w-10 h-10 flex items-center justify-center border border-line rounded-lg shrink-0"
        >
          <Icon name="menu" />
        </button>

        <div>
          <div className="text-[9px] uppercase tracking-[.18em] font-extrabold text-muted">
            Workspace / <span>{breadcrumb}</span>
          </div>
          <div className="font-extrabold text-sm mt-1">{dateLabel}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden lg:flex items-center gap-2 border border-line rounded-lg px-3 py-2">
          <Icon name="search" className="!text-base text-muted" />
          <span className="text-xs text-muted">Search customers</span>
          <span className="mono text-[9px] text-muted ml-6">/</span>
        </div>

        <ThemeToggle />

        <button
          aria-label="Log out"
          title="Log out"
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/login";
          }}
          className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-extrabold"
        >
          A
        </button>
      </div>
    </header>
  );
}
