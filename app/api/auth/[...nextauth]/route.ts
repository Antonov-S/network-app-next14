import NextAuth from "next-auth";

import { handlers } from "@/lib/auth";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

export const { GET, POST } = handlers;
