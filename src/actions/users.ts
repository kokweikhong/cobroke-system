"use server";

import db from "@/db";
import * as schema from "@/db/schema";
import { revalidatePath } from "next/cache";
import { hashPassword, verifyPassword } from "@/lib/password";
import { eq } from "drizzle-orm";
import { InserUser } from "@/types/user.types";
import { redirect } from "next/navigation";
import { SelectUser } from "@/types/listings";
import { removeAuthSession } from "./session";

export async function createUser(data: InserUser) {
  const password = data.password;
  try {
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      return;
    }
    data.password = hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    return;
  }
  await db.insert(schema.users).values(data);

  revalidatePath("/");
  redirect("/admin/users");
}

export async function publicRegisterUser(data: InserUser) {
  const password = data.password;
  try {
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      return;
    }
    data.password = hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    return;
  }
  await db.insert(schema.users).values(data);

  revalidatePath("/");
  redirect("/auth/signin");
}

export async function createUsers(users: InserUser[]) {
  const usersWithHashedPasswords = (await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      if (!hashedPassword) {
        return;
      }
      return { ...user, password: hashedPassword };
    })
  )) as InserUser[];
  await db.insert(schema.users).values(usersWithHashedPasswords);

  revalidatePath("/");
  redirect("/admin/users");
}

export async function updateUser(user: SelectUser) {
  await db
    .update(schema.users)
    .set({
      firstName: user.firstName,
      lastName: user.lastName,
      contactNumber: user.contactNumber,
      // password: password,
    })
    .where(eq(schema.users.id, user.id));

  revalidatePath("/");
  await removeAuthSession();
  redirect("/auth/signin");
}

export async function updateUserPassword(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, userId),
  });
  if (!user) {
    return {
      message: "User not found",
    };
  }
  const hashedPassword = user.password;
  const isValid = await verifyPassword(currentPassword, hashedPassword);
  if (!isValid) {
    return {
      message: "The current password is incorrect",
    };
  }
  if (newPassword !== confirmPassword) {
    return {
      message: "New passwords do not match",
    };
  }
  const hashedNewPassword = await hashPassword(newPassword);
  if (!hashedNewPassword) {
    return {
      message: "Error hashing new password",
    };
  }
  await db
    .update(schema.users)
    .set({ password: hashedNewPassword })
    .where(eq(schema.users.id, userId));

  revalidatePath("/");
  await removeAuthSession();
  redirect("/auth/signin");
}

export async function updateUserActiveStatus(id: string, isActive: boolean) {
  await db
    .update(schema.users)
    .set({ isActive: isActive })
    .where(eq(schema.users.id, id));

  revalidatePath("/");
}

export async function updateUserApprovalStatus(
  id: string,
  isApproved: boolean
) {
  await db
    .update(schema.users)
    .set({ isApproved: isApproved })
    .where(eq(schema.users.id, id));

  revalidatePath("/");
}

export async function updateUserVerificationStatus(
  id: string,
  isVerified: boolean
) {
  await db
    .update(schema.users)
    .set({ isVerified: isVerified })
    .where(eq(schema.users.id, id));

  revalidatePath("/");
}
