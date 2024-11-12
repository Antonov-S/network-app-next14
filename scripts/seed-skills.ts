import { SKILLS_DATA } from "@/lib/constans";
import { db, pool } from "@/lib/db";
import { skills } from "@/lib/schema";
import { NewSkill } from "@/lib/types";

async function main() {
  for (let skill of SKILLS_DATA) {
    const newSkill: NewSkill = {
      id: crypto.randomUUID(),
      name: skill
    };
    await db.insert(skills).values(newSkill).onConflictDoNothing();
  }

  pool.end();
}

main();
