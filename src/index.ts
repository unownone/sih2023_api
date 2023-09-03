import { DrizzleDB, Env } from "./types";
import { getAllProblemStatements, getDb } from "./db/handlers/probStmt";
import { getCurrentData } from "./data";
import type {
  ScheduledEvent,
  ExecutionContext,
} from "@cloudflare/workers-types/experimental";
import { insertProblemStatements } from "./db/handlers/probStmt";
import { updateData } from "./handlers/cron";
import router from "./handlers/api";
import { error, json } from "itty-router";
import { DEFAULT_HEADERS } from "./util/constants";

export default {
  scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const db = getDb(env.DATABASE_URL);
    ctx.waitUntil(updateData(db));
  },

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return router
      .handle(request, ctx, env)
      .then((res) => {
        return json(res, {
          headers: DEFAULT_HEADERS,
        });
      }) // send as JSON
      .catch(error); // catch errors
  },
};
