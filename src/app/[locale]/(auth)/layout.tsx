import { Navbar } from "@/components/layout/auth/Navbar";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
