import { IRequest } from "itty-router";
import {
  getAllProblemStatements,
  getDb,
  getPaginatedProblemstatements,
} from "../../db/handlers/probStmt";
import { Env, PaginatedRequest } from "../../types";

export async function getData(
  request: PaginatedRequest,
  ex: ExecutionContext,
  env: Env
) {
  const db = getDb(env.DATABASE_URL);
  const data = await getPaginatedProblemstatements(
    db,
    request.query.page,
    request.query.size
  );
  return data;
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
