# Cuzion — Frontend

Customer data management & recap system, built per `PRD-Cuzion.md`.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Drizzle ORM · PostgreSQL

## What's in this build

This is the frontend scaffold: all four dashboard screens (Dashboard, Customer,
Recap, Suggestion), the login screen, sidebar/topbar/chatbot layout, light &
dark themes, and a responsive mobile layout. Tables and stats use realistic
placeholder data — wiring them to live data (CRUD, business-rule validation,
Excel export, the projection engine, and the scoped chatbot tool-calling) is
the next phase per the PRD's milestone plan (section 14).

The Drizzle schema, auth session/login routes, and middleware are functional
and ready to run against a real Postgres database — they're just not yet
called from every screen (e.g. the customer table isn't fetching from the DB
yet).

## Changes made from the original HTML mockup

- **Color:** the old acid-green accent (`#c8ff35`) is replaced with the PRD's
  light blue `#BACCD0` everywhere it appeared (badges, buttons, active states,
  highlights). A full dark-mode palette was added — the HTML had none.
- **Branding:** "CUSTRA" / "Custra" renamed to "Cuzion" throughout.
- **Logo:** the placeholder black "C" box is replaced with your uploaded
  Cuzion "C" mark (`public/logo.png`).
- **Icons:** the unicode symbols (◫ ↳ ↓ ✦ ⌕ etc.) are replaced with Google
  Material Symbols, per PRD 4.3.
- **Sidebar labels:** renamed to match PRD 5.1 (Dashboard / Customer / Recap /
  Suggestion) and the "NEW" badge on Suggestion was removed.
- Added a login screen, session middleware, and mobile drawer/bottom-sheet
  patterns — none of which existed in the static HTML.

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL and SESSION_SECRET
npm run db:push        # push the Drizzle schema to your Postgres database
npx tsx src/lib/db/seed.ts   # create the single admin account (hashed password)
npm run dev
```

Visit `http://localhost:3000` — you'll be redirected to `/login`. Sign in with
the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`.

## Open items from the PRD

The PRD lists 13 open questions (section 12) that affect backend behavior
(ID immutability, delete cascade, backdating, timezone, etc.) — worth
resolving before building out the CRUD/business-rule logic in the next phase.
