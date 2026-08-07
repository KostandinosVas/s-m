import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Supermarket",
  description: "Fresh groceries delivered to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b">
          <nav className="mx-auto flex max-w-4xl items-center justify-between p-4">
            <Link href="/" className="font-semibold">
              Supermarket
            </Link>
            <Link href="/products" className="text-sm hover:underline">
              Products
            </Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}