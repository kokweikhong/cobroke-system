import type { Metadata } from "next";
import PublicLayout from "@/components/public-layout";

export const metadata: Metadata = {
  title: "Home | Cobroke System",
  description: "Cobroke System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicLayout>{children}</PublicLayout>;
}
