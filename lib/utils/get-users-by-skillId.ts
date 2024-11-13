import { desc, eq } from "drizzle-orm";

import { db } from "../db";
import { users, usersToSkills } from "../schema";

export async function getUsersBySkillId(id: string, sort: string) {
  const promise = db
    .select()
    .from(users)
    .leftJoin(usersToSkills, eq(users.id, usersToSkills.userId))
    .where(eq(usersToSkills.skillId, id));

  switch (sort) {
    case "name":
      promise.orderBy(users.name);
      break;
    case "-name":
      promise.orderBy(desc(users.name));
      break;
    case "rating":
      promise.orderBy(usersToSkills.rating);
      break;
    case "-rating":
      promise.orderBy(desc(usersToSkills.rating));
      break;
  }

  return await promise;
}
