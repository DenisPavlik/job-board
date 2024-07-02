import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job board",
  description: "Find your future job here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <Header />
          {children}
          <footer className="container py-8 text-gray-500">
            Job Board &copy; 2024 - All rights reserved
          </footer>
        </Theme>
      </body>
    </html>
  );
}
