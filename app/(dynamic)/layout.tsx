import { ReactNode } from "react";

import { auth } from "@/lib/auth";
import SessionProvider from "@/components/session-provider";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  // console.log(session);

  return (
    <SessionProvider session={session}>
      <div>{children}</div>
    </SessionProvider>
  );
}
