import { db } from "../db";

export async function getAllSkills() {
  return await db.query.skills.findMany();
}
