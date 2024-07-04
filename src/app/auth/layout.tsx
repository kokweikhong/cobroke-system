export const metadata = {
  title: "Cobroke System",
  description: "Cobroke System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
  );
}
