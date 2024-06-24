"use server";

import db from "@/db";
import { verifyPassword } from "@/lib/password";
import { removeAuthSession, setAuthSession } from "./session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SessionData } from "@/types/session";

export async function signIn(prevState: any, formData: FormData) {
  await removeAuthSession();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  if (!user) {
    return {
      message: "Invalid email",
    };
  }
  const hashedPassword = user.password;
  if (!hashedPassword) {
    return {
      message: "Invalid password",
    };
  }
  const isValid = await verifyPassword(password, hashedPassword);
  if (!isValid) {
    return {
      message: "Invalid password",
    };
  }

  console.log("password is valid", isValid);

  const data: SessionData = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isLogged: true,
  };

  await setAuthSession(data);
  revalidatePath("/");
  redirect("/admin/dashboard");
}

export async function signOut() {
  await removeAuthSession();
  revalidatePath("/");
  redirect("/");
}
