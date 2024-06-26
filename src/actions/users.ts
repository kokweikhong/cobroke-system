"use server";

import db from "@/db";
import * as schema from "@/db/schema";
import { revalidatePath } from "next/cache";
import { hashPassword } from "@/lib/password";
import { eq } from "drizzle-orm";
import { InserUser } from "@/types/user.types";
import { redirect } from "next/navigation";
import { SelectUser } from "@/types/listings";

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
  await db.insert(schema.users).values(users);

  revalidatePath("/");
  redirect("/admin/users");
}

export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  if (password) {
    try {
      const hashedPassword = await hashPassword(password);
      if (!hashedPassword) {
        return;
      }
      formData.set("password", hashedPassword);
    } catch (error) {
      console.error("Error hashing password:", error);
      return;
    }
  } else {
    formData.delete("password");
  }
  await db
    .update(schema.users)
    .set(formData as any)
    .where(eq(schema.users.id, id));

  revalidatePath("/");
  redirect("/admin/users");
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
