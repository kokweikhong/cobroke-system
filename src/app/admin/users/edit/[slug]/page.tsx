import db from "@/db";
import UserForm from "./_components/user-form";
import { SelectUser } from "@/types/listings";

export default async function Page({ params }: { params: { slug: string } }) {
  const userId = params.slug;
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, userId),
  });
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Edit User</h1>
      </div>
      <div>
        <UserForm data={user as SelectUser} />
      </div>
    </div>
  );
}
