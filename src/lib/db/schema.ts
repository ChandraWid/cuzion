import {
  pgTable,
  char,
  text,
  date,
  timestamp,
  integer,
  uuid,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Master customer records ("Customer Database" / sidebar: "Dashboard").
 * Customer ID is a fixed 16-digit string used as the primary key.
 */
export const customers = pgTable("customers", {
  id: char("id", { length: 16 }).primaryKey(), // 16-digit Customer ID
  name: text("name").notNull(),
  placeOfBirth: text("place_of_birth").notNull(),
  dateOfBirth: date("date_of_birth", { mode: "date" }).notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Daily entry log ("Customer Summary" / sidebar: "Customer").
 * Append-only. Business rules (7-day cooldown, 4-per-month cap) are computed
 * server-side against this table at write time.
 */
export const recapEntries = pgTable(
  "recap_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    customerId: char("customer_id", { length: 16 })
      .references(() => customers.id)
      .notNull(),
    entryDate: date("entry_date", { mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    customerDateIdx: index("recap_customer_date_idx").on(table.customerId, table.entryDate),
  })
);

/**
 * A monthly projection run ("Suggestion"). One active projection per target month.
 */
export const projections = pgTable(
  "projections",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    targetMonth: integer("target_month").notNull(), // 1-12
    targetYear: integer("target_year").notNull(),
    basedOnMonth: integer("based_on_month").notNull(),
    basedOnYear: integer("based_on_year").notNull(),
    generatedAt: timestamp("generated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    targetUnique: unique("projections_target_unique").on(table.targetMonth, table.targetYear),
  })
);

/**
 * Individual proposed entries that make up a Projection.
 */
export const projectionEntries = pgTable(
  "projection_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectionId: uuid("projection_id")
      .references(() => projections.id)
      .notNull(),
    customerId: char("customer_id", { length: 16 })
      .references(() => customers.id)
      .notNull(),
    proposedDate: date("proposed_date", { mode: "date" }).notNull(),
  },
  (table) => ({
    projectionDateIdx: index("projection_entries_projection_date_idx").on(
      table.projectionId,
      table.proposedDate
    ),
  })
);

/**
 * Single hardcoded admin account. Password is stored hashed (bcrypt) —
 * never plaintext — even though there is only one row for v1.
 */
export const adminAccounts = pgTable("admin_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const customersRelations = relations(customers, ({ many }) => ({
  recapEntries: many(recapEntries),
  projectionEntries: many(projectionEntries),
}));

export const recapEntriesRelations = relations(recapEntries, ({ one }) => ({
  customer: one(customers, {
    fields: [recapEntries.customerId],
    references: [customers.id],
  }),
}));

export const projectionsRelations = relations(projections, ({ many }) => ({
  entries: many(projectionEntries),
}));

export const projectionEntriesRelations = relations(projectionEntries, ({ one }) => ({
  projection: one(projections, {
    fields: [projectionEntries.projectionId],
    references: [projections.id],
  }),
  customer: one(customers, {
    fields: [projectionEntries.customerId],
    references: [customers.id],
  }),
}));

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type RecapEntry = typeof recapEntries.$inferSelect;
export type NewRecapEntry = typeof recapEntries.$inferInsert;
export type Projection = typeof projections.$inferSelect;
export type ProjectionEntry = typeof projectionEntries.$inferSelect;
export type AdminAccount = typeof adminAccounts.$inferSelect;
