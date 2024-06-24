import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Page</h1>
      <div>
        <Link href="/admin/users/create">Create</Link>
      </div>
    </div>
  );
}
