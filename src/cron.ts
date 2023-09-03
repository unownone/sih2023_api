import { getCurrentData } from "./data";
import type {
  ScheduledEvent,
  ExecutionContext,
} from "@cloudflare/workers-types/experimental";
import { insertProblemStatements } from "./db/handlers/probStmt";
import { Env } from "./types";

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(updateData(env.CACHE_DB));
  },
};

async function updateData(dbObj: D1Database) {
  const newData = await getCurrentData();
  await insertProblemStatements(dbObj, newData);
  return;
}
