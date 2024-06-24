"use server";

import db from "@/db";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { hashPassword } from "@/lib/password";

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
