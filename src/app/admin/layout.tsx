import type { Metadata } from "next";
import AdminLayout from "@/components/admin-layout";

export const metadata: Metadata = {
  title: "Admin Dashboard | Cobroke System",
  description: "Admin Dashboard | Cobroke System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
