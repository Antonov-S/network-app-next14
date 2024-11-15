import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GithubProvider from "next-auth/providers/github";

import { db } from "./db";
import config from "./config";

interface AuthOptions {
  adapter: ReturnType<typeof DrizzleAdapter>;
  secret: string;
  providers: any[];
  session?: {
    strategy: "jwt" | "database";
  };
  callbacks?: {
    session?: (params: { session: any; user: any; token: any }) => Promise<any>;
  };
}

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  secret: config.GITHUB_SECRET,
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: config.GITHUB_ID,
      clientSecret: config.GITHUB_SECRET
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user.id = token.sub;
      return session;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
