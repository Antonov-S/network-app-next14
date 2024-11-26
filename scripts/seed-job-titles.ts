import { eq } from "drizzle-orm";

import { JOB_TITLES } from "@/lib/constans";
import { db, pool } from "@/lib/db";
import { users } from "@/lib/schema";

export default async function main() {
  const res = await db.query.users.findMany();
  for (let user of res) {
    const randomIdx = Math.floor(Math.random() * JOB_TITLES.length);

    await db
      .update(users)
      .set({ jobTitle: JOB_TITLES[randomIdx] })
      .where(eq(users.id, user.id));
  }
}

if (require.main === module) {
  main();
  pool.end();
}
