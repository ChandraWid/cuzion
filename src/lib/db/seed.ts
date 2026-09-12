/**
 * One-off seed script for the single v1 admin account (PRD section 3).
 * Run with: npx tsx src/lib/db/seed.ts
 *
 * The password is hashed with bcrypt before being written to the database —
 * per PRD 3.4 it must never be stored or checked as plaintext.
 */
import bcrypt from "bcryptjs";
import { db } from "./index";
import { adminAccounts } from "./schema";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db
    .insert(adminAccounts)
    .values({ email, passwordHash })
    .onConflictDoUpdate({
      target: adminAccounts.email,
      set: { passwordHash },
    });

  console.log(`Seeded admin account for ${email}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
