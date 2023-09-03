import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const problemStatements = pgTable("problem_statements", {
  id: serial("id").primaryKey(),
  ps_code: varchar("ps_code", {
    length: 10,
  })
    .notNull()
    .unique(),
  title: text("title").notNull(),
  description: text("description"),
  org: varchar("org", {
    length: 128,
  }).notNull(),
  category: varchar("category", {
    length: 16,
    enum: ["SOFTWARE", "HARDWARE"],
  }),
  domain: varchar("domain", {
    length: 64,
  }),
  youtube: varchar("youtube", {
    length: 128,
  }),
  dataset: text("dataset"),
  submissions: integer("submissions").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const IProblemStatement = problemStatements.$inferSelect;
