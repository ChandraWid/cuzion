"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { AppIcon, type AppIconName } from "./AppIcon";

// Sidebar display labels — these intentionally differ from the internal
// route/feature names used elsewhere in the codebase.
const NAV_ITEMS: { href: string; label: string; sublabel: string; icon: AppIconName }[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    sublabel: "Customer database",
    icon: "dashboard",
  },
  {
    href: "/customer",
    label: "Customer",
    sublabel: "Daily entry",
    icon: "customer",
  },
  {
    href: "/recap",
    label: "Recap",
    sublabel: "Export files",
    icon: "recap",
  },
  {
    href: "/suggestion",
    label: "Suggestion",
    sublabel: "Monthly projection",
    icon: "suggestion",
  },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-[250px] shrink-0 bg-surface border-r border-line h-screen overflow-y-auto flex flex-col">
      {/* Logo */}
      <div className="px-6 pt-7 pb-8">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <div>
            <div className="font-extrabold text-lg tracking-tight">Cuzion</div>
            <div className="text-[9px] uppercase tracking-[.2em] text-muted">
              Customer operations
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3">
        <div className="px-3 mb-3 text-[10px] uppercase tracking-[.18em] font-extrabold text-muted">
          Workspace
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`nav-item ${isActive ? "active" : ""} w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left min-h-[44px]`}
              >
                <span className="nav-icon w-7 h-7 rounded-lg bg-surface-soft flex items-center justify-center shrink-0">
                  <AppIcon name={item.icon} className="w-[18px] h-[18px]" />
                </span>
                <span className="font-extrabold text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom system panel */}
      <div className="mt-auto p-5">
        <div className="bg-background border border-line rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">System</span>
            <span className="flex items-center gap-1.5 text-[9px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[var(--online-dot)]" />
              ONLINE
            </span>
          </div>
          <p className="text-[10px] text-muted leading-relaxed mt-3">
            Admin Workspace. All right reserved - Cuzion. 
          </p>
        </div>
      </div>
    </div>
  );
}
