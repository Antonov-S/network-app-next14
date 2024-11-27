import { db, pool } from "@/lib/db";
import { usersToSkills } from "@/lib/schema";
import { NewUserToSkill } from "@/lib/types";

export default async function main() {
  try {
    const users = await db.query.users.findMany();
    const skills = await db.query.skills.findMany();

    const batchInsertData: NewUserToSkill[] = [];

    for (let user of users) {
      for (let skill of skills) {
        if (Math.random() < 0.5) {
          continue;
        }
        const rating = Math.floor(Math.random() * 5 + 1);
        batchInsertData.push({
          userId: user.id,
          skillId: skill.id,
          rating: rating
        });
      }
    }

    if (batchInsertData.length > 0) {
      await db
        .insert(usersToSkills)
        .values(batchInsertData)
        .onConflictDoNothing();
    }

    console.log("Batch insert completed successfully.");
  } catch (error) {
    console.log("Error during batch insert:", error);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  main();
}
