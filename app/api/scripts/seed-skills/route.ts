import { NextResponse } from "next/server";

import seedSkills from "@/scripts/seed-skills";

// export const dynamic = "force-dynamic";

export async function GET() {
  await seedSkills();
  return NextResponse.json({ message: "success" });
}
