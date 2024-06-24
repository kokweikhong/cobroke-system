import Image from "next/image";

const items = [
  {
    id: 1,
    title: "Title 1",
    description: "Description 1",
  },
  {
    id: 2,
    title: "Title 2",
    description: "Description 2",
  },
  {
    id: 3,
    title: "Title 3",
    description: "Description 3",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center py-2 px-4 my-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-center">{item.title}</h2>
            <p className="text-lg text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
