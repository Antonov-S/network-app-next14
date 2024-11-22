import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import UserForm from "@/components/user-form";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return notFound();
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id)
  });
  if (!user) {
    return notFound();
  }

  return (
    <div>
      <UserForm user={user} />
    </div>
  );
}
