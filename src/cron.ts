import { getCurrentData } from "./data";
import type {
  ScheduledEvent,
  ExecutionContext,
} from "@cloudflare/workers-types/experimental";
import { ProblemStatements } from "./db/schema/probStmt";
import { drizzle } from "drizzle-orm/d1";
export default {
  async scheduled(event: ScheduledEvent, env: unknown, ctx: ExecutionContext) {
    ctx.waitUntil(updateData());
  },
};

const db = drizzle(env.DB);

async function updateData() {
  const newData = await getCurrentData();
  const inserted = await db.insert(ProblemStatements).values(newData).run();
  return;
}
