import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// DATABASE_URL is expected in .env, e.g.
// postgresql://user:password@localhost:5432/cuzion
const connectionString = process.env.DATABASE_URL ?? "";

// A single shared connection pool for the app. `prepare: false` is the
// recommended setting for postgres.js when used with Drizzle + serverless
// or connection-pooled Postgres (e.g. Supabase, Neon, PgBouncer).
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
