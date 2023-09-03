import { problemStatements, IProblemStatement } from "../schema/probStmt";
import { DrizzleDB, PaginatedResponse } from "../../types";
import { neon, neonConfig } from "@neondatabase/serverless";
import { NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

export const getDb = (url: string) => {
  const sql = neon(url);
  return drizzle(sql);
};

export async function getPaginatedProblemstatements(
  db: DrizzleDB,
  offset: number,
  limit: number
) {
  const data = await db
    .select()
    .from(problemStatements)
    .limit(limit)
    .offset(offset * limit);
  return {
    data: data as (typeof IProblemStatement)[],
    page: offset + 1,
    count: data.length,
  } as PaginatedResponse<typeof IProblemStatement>;
}

export async function getAllProblemStatements(db: DrizzleDB) {
  const data = await db.select().from(problemStatements);
  return data as (typeof IProblemStatement)[];
}

export async function insertProblemStatements(
  db: DrizzleDB,
  data: (typeof IProblemStatement)[]
) {
  return await db.insert(problemStatements).values(data);
}
