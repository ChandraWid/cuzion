"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { ChatbotPanel } from "@/components/ChatbotPanel";
import { Icon } from "@/components/Icon";

const BREADCRUMBS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/customer": "Customer",
  "/recap": "Recap",
  "/suggestion": "Suggestion",
};

const TODAY_LABEL = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const breadcrumb = BREADCRUMBS[pathname] ?? "Dashboard";

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile drawer sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 flex ${
          drawerOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setDrawerOpen(false)}
          aria-hidden
        />
        <div
          className={`relative bg-surface h-full transition-transform duration-200 ease-out ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end px-3 pt-3">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 flex items-center justify-center border border-line rounded-lg"
            >
              <Icon name="close" />
            </button>
          </div>
          <Sidebar onNavigate={() => setDrawerOpen(false)} />
        </div>
      </div>

      <main className="flex-1 min-w-0 h-screen overflow-y-auto scrollbar">
        <Topbar
          breadcrumb={breadcrumb}
          dateLabel={TODAY_LABEL}
          onMenuClick={() => setDrawerOpen(true)}
        />
        {children}
      </main>

      <ChatbotPanel />
    </div>
  );
}
