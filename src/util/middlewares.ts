import { IRequest } from "itty-router";
import { PAGE_SIZE } from "./constants";
import { Env, PaginatedRequest } from "../types";
import { UnauthorizedError } from "../handlers/api/errors";

export async function addPaginationParams(request: PaginatedRequest) {
  const { page, size } = request.query;
  request.query = {
    page: page ? Number(page) - 1 : 0,
    size: size ? Number(size) : PAGE_SIZE,
  };
}

export async function isValidUser(
  request: PaginatedRequest,
  ex: ExecutionContext,
  env: Env
) {
  const auth_header = request.headers.get("X-API-KEY");
  if (!auth_header) {
    return UnauthorizedError(request, ex, env);
  }

  if (auth_header !== env.API_KEY) {
    return UnauthorizedError(request, ex, env);
  }
}
