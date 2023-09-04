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
  getCacheResponse: () => Promise<Response>
) {
  const cache = caches.default;
  const cachedData = await cache.match(request);
  if (cachedData) {
    console.log("Cache HIT");
    return cachedData;
  }
  console.log("Cache MISS");
  const response = await getCacheResponse();
  ctx.waitUntil(cache.put(request, response.clone()));
  return response;
}
