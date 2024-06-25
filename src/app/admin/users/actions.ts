"use server";

import { redirect } from "next/navigation";

export async function userOMG() {
  redirect("/admin/dashboard");
}
