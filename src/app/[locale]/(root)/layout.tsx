import React from "react";
import { Navbar } from "@/components/layout/root/Navbar";
import { Footer } from "@/components/layout/footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
