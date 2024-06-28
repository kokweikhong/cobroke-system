import { redirect } from "next/navigation";
import RegisterForm from "./_components/register-form";
import { getAuthSession } from "@/actions/session";

export default async function Page() {
  const session = await getAuthSession();
  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <>
      <RegisterForm />
    </>
  );
}
