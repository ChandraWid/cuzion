import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { adminAccounts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// PRD 3.4: rate-limit login attempts to prevent brute-force guessing.
// This in-memory limiter is a placeholder for a production-grade store
// (e.g. Redis) behind a load balancer.
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const entry = attempts.get(ip);

  if (entry && entry.resetAt > now && entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const [account] = await db
    .select()
    .from(adminAccounts)
    .where(eq(adminAccounts.email, email))
    .limit(1);

  const valid = account ? await bcrypt.compare(password, account.passwordHash) : false;

  if (!valid) {
    attempts.set(ip, {
      count: (entry?.resetAt ?? 0) > now ? entry!.count + 1 : 1,
      resetAt: now + WINDOW_MS,
    });
    // PRD 3.3: generic error — never reveal which field was wrong.
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  attempts.delete(ip);

  const token = await createSessionToken({ email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return res;
}
