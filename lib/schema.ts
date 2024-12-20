import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  jobTitle: text("job_title"),
  bio: text("bio")
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state")
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull()
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull()
  },
  verificationToken => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token]
    })
  })
);

export const skills = pgTable("skill", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull().unique()
});

export const usersToSkills = pgTable(
  "users_to_skills",
  {
    userId: text("user_id").notNull(),
    skillId: text("skill_id").notNull(),
    rating: integer("rating")
  },
  us => ({
    compoundKey: primaryKey({
      columns: [us.userId, us.skillId]
    })
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  usersToUsersSkills: many(usersToSkills)
}));

export const skillsRelations = relations(skills, ({ many }) => ({
  skillsToUsersSkills: many(usersToSkills)
}));

export const usersToSkillsRelations = relations(usersToSkills, ({ one }) => ({
  skill: one(skills, {
    fields: [usersToSkills.skillId],
    references: [skills.id]
  }),
  user: one(users, {
    fields: [usersToSkills.userId],
    references: [users.id]
  })
}));
