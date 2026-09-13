"use client";

import { useState, FormEvent } from "react";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // Generic error — never reveal which field was wrong
        setError("Invalid email or password.");
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Logo size={56} />
          <div className="font-extrabold text-xl tracking-tight mt-4">Cuzion</div>
          <div className="text-[9px] uppercase tracking-[.2em] text-muted mt-1">
            Customer operations
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-line rounded-2xl p-6 soft-shadow"
        >
          <h1 className="display text-2xl font-extrabold mb-1">Sign in</h1>
          <p className="text-xs text-muted mb-6">
            Enter your admin credentials to access the dashboard.
          </p>

          <label className="text-xs font-extrabold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-line rounded-xl px-4 py-3 mt-2 mb-4 text-sm outline-none bg-surface focus:border-foreground"
          />

          <label className="text-xs font-extrabold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-line rounded-xl px-4 py-3 mt-2 text-sm outline-none bg-surface focus:border-foreground"
          />

          {error && (
            <div className="flex items-center gap-2 mt-4 text-xs text-danger-text bg-danger-bg rounded-lg px-3 py-2.5">
              <Icon name="error" className="!text-base" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-foreground text-background py-3.5 rounded-xl mt-6 text-sm font-extrabold min-h-[44px] disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
