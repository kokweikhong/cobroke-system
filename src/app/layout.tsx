import QueryClientProvider from "@/components/query-client-provider";
import "./globals.css";
import { poppins } from "@/lib/fonts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <QueryClientProvider>
        <body className={`${poppins.variable} h-full`}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
