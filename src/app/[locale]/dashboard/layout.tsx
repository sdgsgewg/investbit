"use client";

import Navbar from "@/components/layout/dashboard/Navbar";
import Sidebar from "@/components/layout/dashboard/sidebar/Sidebar";
import { usePathname } from "@/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Fixed Sidebar */}
        <Sidebar pathname={pathname} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto">
          <div className="min-w-max p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
