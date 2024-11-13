import { eq, sql } from "drizzle-orm";

import { db } from "../db";
import { skills, usersToSkills } from "../schema";

export async function getSkills() {
  const res = await db
    .select({
      id: skills.id,
      name: skills.name,
      count: sql<number>`count(${usersToSkills.userId})`
    })
    .from(skills)
    .leftJoin(usersToSkills, eq(skills.id, usersToSkills.skillId))
    .groupBy(skills.id, skills.name);

  return res;
}
