import UserForm from "./_components/UserForm";

export default function Page({ params }: { params: { slug: string } }) {
  const userId = params.slug;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit User: {userId}
        </h1>
      </div>
      <div>
        <UserForm />
      </div>
    </div>
  );
}
