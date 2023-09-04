import { IRequest } from "itty-router";
import { Env } from "../types";

/**
 *  Cache a response
 * @param request
 * @param ctx
 * @param getCacheResponse Function that returns a response to be cached
 * @returns
 */
export async function handleCache(
  request: Request,
  ctx: ExecutionContext,
  env: Env,
  getCacheResponse: (...args: any[]) => Promise<Response>
) {
  const cache = caches.default;
  let cachedData = await cache.match(request);
  if (cachedData) {
    console.log("Cache HIT");
    cachedData;
    return cachedData;
  }
  console.log("Cache MISS");
  const response = await getCacheResponse(request, ctx, env);
  setCache(ctx, request, response.clone());
  return response;
}

/**
 * Sets cache with proper status
 * @param ctx
 * @param request
 * @param response
 */
function setCache(ctx: ExecutionContext, request: Request, response: Response) {
  const resp = new Response(response.body, {
    ...response,
  });
  ctx.waitUntil(caches.default.put(request, resp));
}
