"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { AppIcon } from "./AppIcon";

interface Message {
  role: "assistant" | "user";
  text: string;
  badge?: string;
}

const SEED_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "Good morning. I can check customer activity, monthly limits, cooldowns, exports, and projection status.",
  },
  { role: "user", text: "Is the October suggestion available yet?" },
  {
    role: "assistant",
    text: "Yes. September has been completed, so October is the next eligible projection month.",
    badge: "PROJECTION AVAILABLE ✓",
  },
  { role: "user", text: "Generate next month's suggestion." },
  {
    role: "assistant",
    text: "October's projection has been generated from September's completed Cust Recap.",
  },
];

function ChatBody({ onClose }: { onClose?: () => void }) {
  const [messages] = useState<Message[]>(SEED_MESSAGES);
  const [draft, setDraft] = useState("");

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-line">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-extrabold text-sm">Cuzion Assistant</div>
            <div className="text-[9px] text-muted">Scoped data assistant</div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close assistant"
              className="w-9 h-9 border border-line rounded-lg flex items-center justify-center"
            >
              <Icon name="close" className="!text-base" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar p-5 space-y-5">
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i}>
              <div className="text-[9px] uppercase tracking-wider font-extrabold text-muted mb-2">
                Assistant
              </div>
              <div
                className={`rounded-2xl rounded-tl-none p-4 text-sm leading-relaxed ${
                  m.badge ? "bg-accent text-accent-foreground" : "bg-surface-soft"
                }`}
              >
                <div>{m.text}</div>
                {m.badge && <div className="mono text-[9px] font-bold mt-4">{m.badge}</div>}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] bg-foreground text-background rounded-2xl rounded-tr-none p-4 text-sm">
                {m.text}
              </div>
            </div>
          )
        )}
      </div>

      <div className="p-4 border-t border-line">
        <div className="flex items-center gap-2 border border-line rounded-xl px-3 py-2.5">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask anything related..."
            className="flex-1 bg-transparent outline-none text-xs"
          />
          <button
            aria-label="Send message"
            className="w-8 h-8 shrink-0 bg-foreground text-background rounded-lg flex items-center justify-center"
          >
            <Icon name="arrow_upward" className="!text-base" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChatbotPanel() {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop: docked panel — width and inner content animate together so
          it slides in/out from the right edge instead of popping in. */}
      <aside
        className={`hidden 2xl:flex shrink-0 border-l border-line bg-surface flex-col h-screen overflow-hidden transition-[width] duration-200 ease-out ${
          desktopOpen ? "w-[330px]" : "w-0"
        }`}
      >
        <div
          className={`w-[330px] h-full flex flex-col transition-transform duration-200 ease-out ${
            desktopOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ChatBody onClose={() => setDesktopOpen(false)} />
        </div>
      </aside>

      {/* Desktop: collapsed tab, shown when the panel is hidden */}
      <button
        onClick={() => setDesktopOpen(true)}
        aria-label="Open assistant"
        className={`hidden 2xl:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 w-11 h-16 rounded-l-xl bg-foreground text-background items-center justify-center shadow-lg transition-all duration-200 ease-out ${
          desktopOpen ? "translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        <AppIcon name="bot" className="w-5 h-5" />
      </button>

      {/* Mobile / tablet: floating action button */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open assistant"
        className="2xl:hidden fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg"
      >
        <AppIcon name="bot" className="w-6 h-6" />
      </button>

      {/* Mobile / tablet: right-side drawer, slides in from the right like
          the sidebar drawer slides in from the left. */}
      <div
        className={`2xl:hidden fixed inset-0 z-50 flex justify-end ${
          mobileOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
        <div
          className={`relative w-full max-w-[380px] h-full bg-surface overflow-hidden flex flex-col transition-transform duration-200 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ChatBody onClose={() => setMobileOpen(false)} />
        </div>
      </div>
    </>
  );
}
