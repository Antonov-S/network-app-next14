import { NextResponse } from "next/server";

import seedJobTitles from "@/scripts/seed-job-titles";

export const dynamic = "force-dynamic";

export async function GET() {
  await seedJobTitles();
  return NextResponse.json({ message: "success" });
}
