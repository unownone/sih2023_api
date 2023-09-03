import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";

export const ProblemStatements = sqliteTable("problem_statements", {
  id: integer("id").primaryKey(),
  ps_code: text("ps_code").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  org: text("org").notNull(),
  category: text("category"),
  domain: text("domain"),
  youtube: text("youtube"),
  dataset: text("dataset"),
  submissions: integer("submissions").default(0).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
});
