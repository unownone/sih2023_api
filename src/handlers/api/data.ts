import { IRequest } from "itty-router";
import {
  getAllProblemStatements,
  getDb,
  getPaginatedProblemstatements,
} from "../../db/handlers/probStmt";
import { Env, PaginatedRequest } from "../../types";
import { handleCache } from "../../util/cache";

export async function getData(
  request: PaginatedRequest,
  ctx: ExecutionContext,
  env: Env
) {
  const db = getDb(env.DATABASE_URL);

  const response = await handleCache(request, ctx, async () => {
    const data = await getPaginatedProblemstatements(
      db,
      request.query.page,
      request.query.size
    );
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=3600",
      },
    });
  });

  return response;
}

export async function getAllData(
  request: PaginatedRequest,
  ex: ExecutionContext,
  env: Env
) {
  const db = getDb(env.DATABASE_URL);
  const data = await getAllProblemStatements(db);
  return data;
}
