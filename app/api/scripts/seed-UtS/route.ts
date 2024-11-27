import { NextResponse } from "next/server";

import seedUsersToSkills from "@/scripts/seed-users-to-skills";

// export const dynamic = "force-dynamic";

export async function GET() {
  await seedUsersToSkills();
  return NextResponse.json({ message: "success" });
}
