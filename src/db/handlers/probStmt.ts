import { ProblemStatements } from "../schema/probStmt";
import { DrizzleDB, IProblemStatement, IProblemStatementDB } from "../../types";
import { neon, neonConfig } from "@neondatabase/serverless";
import { NeonHttpDatabase, drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

export const getDb = (url: string) => {
  const sql = neon(url);
  return drizzle(sql);
};

export async function getAllProblemStatements(db: DrizzleDB) {
  const data = await db.select().from(ProblemStatements);
  return data as IProblemStatementDB[];
}

export async function insertProblemStatements(
  db: DrizzleDB,
  data: IProblemStatement[]
) {
  return await db.insert(ProblemStatements).values(data);
}
