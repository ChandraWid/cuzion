import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/session";

const PROTECTED_PREFIXES = ["/dashboard", "/customer", "/recap", "/suggestion"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  // Preview mode: no Postgres database is configured yet, so auth can't be
  // checked. Set PREVIEW_NO_AUTH=false in .env once DATABASE_URL is set up
  // to re-enable the login requirement.
  if (process.env.PREVIEW_NO_AUTH === "true") return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/customer/:path*", "/recap/:path*", "/suggestion/:path*"],
};
