import { drizzle } from "drizzle-orm/d1";
import { ProblemStatements } from "../schema/probStmt";
import { IProblemStatement, IProblemStatementDB } from "../../types";

const getDb = (db: D1Database) => drizzle(db);

export async function getAllProblemStatements(dbObj: D1Database) {
  const db = getDb(dbObj);
  const data = await db.select().from(ProblemStatements);
  return data as IProblemStatementDB[];
}

export async function insertProblemStatements(
  dbObj: D1Database,
  data: IProblemStatement[]
) {
  const db = getDb(dbObj);

  return await db.insert(ProblemStatements).values(data);
}
