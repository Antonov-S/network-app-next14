import { NextResponse } from "next/server";

import seedUsers from "@/scripts/seed-users";
import seedJobTitles from "@/scripts/seed-job-titles";
import seedSkills from "@/scripts/seed-skills";
import seedUsersToSkills from "@/scripts/seed-users-to-skills";

export const dynamic = "force-dynamic";

export async function GET() {
  await seedUsers();
  await seedJobTitles();
  await seedSkills();
  await seedUsersToSkills();
  return NextResponse.json({ message: "success" });
}
