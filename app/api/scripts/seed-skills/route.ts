import { NextResponse } from "next/server";

import seedSkills from "@/scripts/seed-skills";
import seedUsersToSkills from "@/scripts/seed-users-to-skills";

export const dynamic = "force-dynamic";

export async function GET() {
  await seedSkills();
  await seedUsersToSkills();
  return NextResponse.json({ message: "success" });
}
