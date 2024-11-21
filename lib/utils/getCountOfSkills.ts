import { count, desc, eq } from "drizzle-orm";

import { db } from "../db";
import { skills, usersToSkills } from "../schema";

export async function getCountOfSkills() {
  return await db
    .select({ name: skills.name, count: count() })
    .from(skills)
    .leftJoin(usersToSkills, eq(skills.id, usersToSkills.skillId))
    .groupBy(skills.name)
    .orderBy(desc(count()));
}
