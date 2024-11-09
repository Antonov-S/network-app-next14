import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GithubProvider from "next-auth/providers/github";

import { db } from "./db";
import config from "./config";

export const authOptions = {
  adapter: DrizzleAdapter(db) as any,
  secret: config.GITHUB_SECRET,
  providers: [
    GithubProvider({
      clientId: config.GITHUB_ID,
      clientSecret: config.GITHUB_SECRET
    })
  ]
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
