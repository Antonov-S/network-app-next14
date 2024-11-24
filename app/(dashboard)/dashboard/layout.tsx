import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { users } from "@/lib/schema";
import SessionProvider from "@/components/session-provider";
import AppShellContainer from "@/components/app-shell-container";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const currentUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id)
  });
  if (!currentUser) {
    return notFound();
  }

  return (
    <SessionProvider session={session}>
      <AppShellContainer user={currentUser}>{children}</AppShellContainer>
    </SessionProvider>
  );
}
