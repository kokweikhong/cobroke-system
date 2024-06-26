import UserForm from "./_components/user-form";

export default function Page({ params }: { params: { slug: string } }) {
  // TODO: Fetch user by ID
  const userId = params.slug;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Edit User</h1>
      </div>
      <div>
        <UserForm data={{} as any} />
      </div>
    </div>
  );
}
