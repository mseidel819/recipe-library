import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import QueryProvider from "./providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Just the recipes!",
  description: "recipes without the ads and life stories",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("session BOOM", session);

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider session={session}>{children}</QueryProvider>
      </body>
    </html>
  );
}
