import { or, sql } from "drizzle-orm";

import { db } from "../db";
import { users } from "../schema";

export async function fuzzySearsh(query: string) {
  const res = await db
    .select()
    .from(users)
    .where(
      or(
        sql`similarity(name, ${query}) > 0.2`,
        sql`similarity(first_name, ${query}) > 0.2`,
        sql`similarity(last_name, ${query}) > 0.2`,
        sql`similarity(job_title, ${query}) > 0.2`
      )
    );
  return res;
}
