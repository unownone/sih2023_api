import { problemStatements, IProblemStatement } from "../schema/probStmt";
import { DrizzleDB, IPaginationQuery, PaginatedResponse } from "../../types";
import { Pool, neonConfig } from "@neondatabase/serverless";
import {
  drizzle as poolDrizzle,
  NeonDatabase,
} from "drizzle-orm/neon-serverless";
import { eq, ilike, or } from "drizzle-orm";

neonConfig.fetchConnectionCache = true;

export const getDb = (url: string): DrizzleDB => {
  const client = new Pool({ connectionString: url, max: 50 });

  return poolDrizzle(client);
};

export async function getPaginatedProblemstatements(
  db: DrizzleDB,
  query: IPaginationQuery
) {
  const db_query = db
    .select()
    .from(problemStatements)
    .limit(query.size)
    .offset(query.page * query.size);
  if (query.search) {
    db_query.where(
      or(
        ilike(problemStatements.ps_code, `%${query.search}%`),
        ilike(problemStatements.title, `%${query.search}%`),
        ilike(problemStatements.description, `%${query.search}%`)
      )
    );
  }
  const data = await db_query;
  return {
    data: data as (typeof IProblemStatement)[],
    page: query.page + 1,
    count: data.length,
  } as PaginatedResponse<typeof IProblemStatement>;
}

export async function getAllProblemStatements(db: DrizzleDB) {
  const data = await db.select().from(problemStatements);
  return data as (typeof IProblemStatement)[];
}

export async function insertProblemStatements(
  dbPool: DrizzleDB & NeonDatabase,

  scraped_data: (typeof IProblemStatement)[]
) {
  const updateObj: (typeof IProblemStatement)[] = [];
  console.log("Starting transaction");
  await dbPool.transaction(async (trx) => {
    const db_data = await trx
      .select({
        ps_code: problemStatements.ps_code,
        submissions: problemStatements.submissions,
      })
      .from(problemStatements);
    console.log("Got db data");
    const db_map: { [key: string]: number } = db_data.reduce(
      (map: { [key: string]: number }, obj) => {
        map[obj.ps_code] = obj.submissions;
        return map;
      },
      {}
    );
    const awaitable: Promise<any>[] = [];
    console.log("Checking/matching data");
    scraped_data.map((obj) => {
      if (obj.submissions != db_map[obj.ps_code]) {
        // Save them in updateObj to be updates for telegram,etc
        updateObj.push(obj);

        // if submissions are not equal, update the db
        awaitable.push(
          trx
            .update(problemStatements)
            .set({ submissions: obj.submissions })
            .where(eq(problemStatements.ps_code, obj.ps_code))
        );
      }
    });
    // Wait for all the updates to complete
    console.log("Waiting for updates to complete. Count: ", awaitable.length);
    await Promise.all(awaitable);
  });
  console.log("Finished updates...");
  // Handle UpdateObj
}
