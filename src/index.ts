import { DrizzleDB, Env } from "./types";
import { getAllProblemStatements, getDb } from "./db/handlers/probStmt";
import { getCurrentData } from "./data";
import type {
  ScheduledEvent,
  ExecutionContext,
} from "@cloudflare/workers-types/experimental";
import { insertProblemStatements } from "./db/handlers/probStmt";

async function updateData(db: DrizzleDB) {
  const newData = await getCurrentData();
  await insertProblemStatements(db, newData);
  return;
}

export default {
  scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const db = getDb(env.DATABASE_URL);
    ctx.waitUntil(updateData(db));
  },

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const uri = new URL(request.url);
    if (request.method === "GET" && uri.pathname === "/") {
      const db = getDb(env.DATABASE_URL);
      const data = await getAllProblemStatements(db);
      return new Response(JSON.stringify(data), {
        headers: { "content-type": "application/json" },
        status: 200,
      });
    }
    return new Response("Not Found", { status: 404 });
  },
};
