import {
  getAllProblemStatements,
  getDb,
  getPaginatedProblemstatements,
} from "../../db/handlers/probStmt";
import { Env, PaginatedRequest } from "../../types";
import { handleCache } from "../../util/cache";
import { CACHE_MAX_AGE, DEFAULT_HEADERS } from "../../util/constants";

export async function getData(
  request: PaginatedRequest,
  ctx: ExecutionContext,
  env: Env
) {
  return handleCache(request, ctx, env, async (request, ctx, env) => {
    const db = getDb(env.DATABASE_URL);
    const data = await getPaginatedProblemstatements(
      db,
      request.query.page,
      request.query.size
    );
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...DEFAULT_HEADERS,
        Expires: new Date(Date.now() + CACHE_MAX_AGE * 1000).toUTCString(),
      },
    });
  });
}

export async function getAllData(
  request: PaginatedRequest,
  ctx: ExecutionContext,
  env: Env
) {
  return handleCache(request, ctx, env, async (request, ctx, env) => {
    const db = getDb(env.DATABASE_URL);
    const data = await getAllProblemStatements(db);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...DEFAULT_HEADERS,
        Expires: new Date(Date.now() + CACHE_MAX_AGE * 1000).toUTCString(),
      },
    });
  });
}
