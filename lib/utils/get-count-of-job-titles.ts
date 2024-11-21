import { count, desc } from "drizzle-orm";

import { db } from "../db";
import { users } from "../schema";

export async function getCountOfJobTitles() {
  return await db
    .select({ jobTitle: users.jobTitle, count: count() })
    .from(users)
    .groupBy(users.jobTitle)
    .orderBy(desc(count()));
}
