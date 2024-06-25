"use server";

import db from "@/db";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { hashPassword } from "@/lib/password";
import { eq } from "drizzle-orm";

export async function createUser(formData: FormData) {
  const password = formData.get("password") as string;
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
  await db.insert(users).values(formData as any);

  revalidatePath("/");
}

export async function updateUserActiveStatus(id: string, isActive: boolean) {
  await db.update(users).set({ isActive: isActive }).where(eq(users.id, id));

  revalidatePath("/");
}

export async function updateUserApprovalStatus(
  id: string,
  isApproved: boolean
) {
  await db
    .update(users)
    .set({ isApproved: isApproved })
    .where(eq(users.id, id));

  revalidatePath("/");
}

export async function updateUserVerificationStatus(
  id: string,
  isVerified: boolean
) {
  await db
    .update(users)
    .set({ isVerified: isVerified })
    .where(eq(users.id, id));

  revalidatePath("/");
}
