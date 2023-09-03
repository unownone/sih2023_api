import { getCurrentData } from "../data";
import { insertProblemStatements } from "../db/handlers/probStmt";
import { DrizzleDB } from "../types";

export async function updateData(db: DrizzleDB) {
  const newData = await getCurrentData();
  await insertProblemStatements(db, newData);
  return;
}
