import { getSeconds } from "itty-time";

export const PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;
export const CACHE_MAX_AGE = getSeconds("30 minutes");

export const DEFAULT_HEADERS = {
  "Cache-Control": `max-age=${CACHE_MAX_AGE}`, // cache for 20 minutes
};
