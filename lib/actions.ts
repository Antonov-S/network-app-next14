"use server";

import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "./auth";
import { db } from "./db";
import { users, usersToSkills } from "./schema";
import { NewUserToSkill } from "./types";

const UpdateUserSchema = z.object({
  jobTitle: z.string().min(3),
  bio: z.string()
});

type UpdateUserState = {
  errors?: {
    jobTitle?: string[];
    bio?: string[];
  };
  message?: string;
  success?: string;
};

export async function updateUser(
  prevState: UpdateUserState,
  formData: FormData
): Promise<UpdateUserState> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "User not authenticated",
      errors: { jobTitle: ["User ID is missing"] }
    };
  }

  const jobTitle = formData.get("jobTitle");
  const bio = formData.get("bio");

  const validatedFields = UpdateUserSchema.safeParse({
    jobTitle: jobTitle,
    bio: bio
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Update user error"
    };
  }

  await db
    .update(users)
    .set({
      jobTitle: validatedFields.data.jobTitle,
      bio: validatedFields.data.bio
    })
    .where(eq(users.id, session.user.id));

  return {
    success: "Update user success"
  };
}

const UpdateSkillRatingSchema = z.object({
  skillId: z.string().uuid(),
  rating: z.number().min(1).max(5)
});

export type UpdateSkillRatingState = {
  errors?: {
    skillId?: string[];
    rating?: string[];
  };
  message?: string;
  success?: string;
};

export async function updateSkillRating(
  prevState: UpdateSkillRatingState,
  formData: FormData
): Promise<UpdateSkillRatingState> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "User not authenticated",
      errors: { skillId: ["User ID is missing"] }
    };
  }

  const validatedFields = UpdateSkillRatingSchema.safeParse({
    skillId: formData.get("skillId"),
    rating: parseInt(formData.get("rating")?.toString()!)
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Update skill error"
    };
  }

  await db
    .update(usersToSkills)
    .set({ rating: validatedFields.data.rating })
    .where(
      and(
        eq(usersToSkills.userId, session.user.id),
        eq(usersToSkills.skillId, validatedFields.data.skillId)
      )
    );

  revalidatePath("/dashboard/profile/skills");

  return {
    success: "Update skill success"
  };
}

const AddUsersToSkillsSchema = z.object({
  skillId: z.string().uuid(),
  rating: z.number().min(1).max(5)
});

export type AddUsersToSkillsState = {
  errors?: {
    skillId?: string[];
    rating?: string[];
  };
  message?: string;
  success?: string;
};

export async function addUsersToSkills(
  prevState: AddUsersToSkillsState,
  formData: FormData
): Promise<AddUsersToSkillsState> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "User not authenticated",
      errors: { skillId: ["User ID is missing"] }
    };
  }

  const validatedFields = AddUsersToSkillsSchema.safeParse({
    skillId: formData.get("skillId"),
    rating: parseInt(formData.get("rating")?.toString()!)
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "An error occurred"
    };
  }

  const userToSkill = await db.query.usersToSkills.findFirst({
    where: and(
      eq(usersToSkills.skillId, validatedFields.data.skillId),
      eq(usersToSkills.userId, session.user.id)
    )
  });

  if (userToSkill) {
    return {
      message: "Rating for this skill already exists"
    };
  }

  const newUserToSkill: NewUserToSkill = {
    skillId: validatedFields.data.skillId,
    userId: session?.user.id,
    rating: validatedFields.data.rating
  };

  await db.insert(usersToSkills).values(newUserToSkill);

  revalidatePath("/dashboard/profile/skills");
  return {
    success: "User to skill created"
  };
}

export async function deleteUserToSkill(skillId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "User not authenticated",
      errors: { skillId: ["User ID is missing"] }
    };
  }

  await db
    .delete(usersToSkills)
    .where(
      and(
        eq(usersToSkills.skillId, skillId),
        eq(usersToSkills.userId, session.user.id)
      )
    );
  revalidatePath("/dashboard/profile/skills");
}
