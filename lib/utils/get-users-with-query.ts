import { ilike, or } from "drizzle-orm";

import { db } from "../db";
import { users } from "../schema";

export async function getUsersByQuery(query: string) {
  const q = "%" + query + "%";
  const res = await db.query.users.findMany({
    where: or(
      ilike(users.name, q),
      ilike(users.jobTitle, q),
      ilike(users.firstName, q),
      ilike(users.lastName, q)
    )
  });
  return res;
}
