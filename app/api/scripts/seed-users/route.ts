import { NextResponse } from "next/server";

import seedUsers from "@/scripts/seed-users";

// export const dynamic = "force-dynamic";

export async function GET() {
  await seedUsers();
  return NextResponse.json({ message: "success" });
}
