import { eq } from "drizzle-orm";

import { db } from "../db";
import { usersToSkills } from "../schema";

export async function getUsersToSkillsByUserId(userId: string) {
  return await db.query.usersToSkills.findMany({
    with: {
      skill: true
    },
    where: eq(usersToSkills.userId, userId)
  });
}
