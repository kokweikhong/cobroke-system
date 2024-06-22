import type db from "@/db";
import * as schema from "@/db/schema";
import { hashPassword } from "@/lib/password";

export default async function seed(db: db) {
  const password = await hashPassword("admin");
  if (!password) {
    return;
  }
  await db.insert(schema.users).values({
    firstName: "Admin",
    lastName: "CoBroke",
    email: "admin@cobroke.com",
    password: password,
    contactNumber: "60167778888",
    role: "superadmin",
    isActive: true,
    isApproved: true,
    isVerified: true,
  });
}
