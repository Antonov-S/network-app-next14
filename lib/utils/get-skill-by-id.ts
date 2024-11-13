import { eq } from "drizzle-orm";

import { db } from "../db";
import { skills } from "../schema";

export async function getSkillById(id: string) {
  return await db.query.skills.findFirst({ where: eq(skills.id, id) });
}
