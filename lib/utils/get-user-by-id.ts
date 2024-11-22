import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../schema";

export async function getUserById(id: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: { usersToUsersSkills: { with: { skill: true } } }
  });
}
