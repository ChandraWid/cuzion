# Cuzion — Frontend

Customer data management & recap system.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Drizzle ORM · PostgreSQL

## What's in this build

This is the frontend scaffold: all four dashboard screens (Dashboard, Customer,
Recap, Suggestion), the login screen, sidebar/topbar/chatbot layout, light &
dark themes, and a responsive mobile layout. Tables and stats use realistic
placeholder data — wiring them to live data (CRUD, business-rule validation,
Excel export, the projection engine, and the scoped chatbot tool-calling) is going to be added later.

The Drizzle schema, auth session/login routes, and middleware are functional
and ready to run against a real Postgres database — they're just not yet
called from every screen (e.g. the customer table isn't fetching from the DB
yet).

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
