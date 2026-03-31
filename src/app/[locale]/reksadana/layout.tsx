"use client";

import { Link, usePathname } from "@/navigation";

export default function ReksaDanaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Reksa Dana Tracker</h1>
      <nav className="flex space-x-6 mb-8 border-b border-zinc-200 dark:border-zinc-800">
        <Link 
          href="/reksadana/input" 
          className={`pb-4 transition font-medium text-sm border-b-2 ${
            isActive("/reksadana/input") 
              ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500" 
              : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-700"
          }`}
        >
          Daily Input
        </Link>
        <Link 
          href="/reksadana/weekly" 
          className={`pb-4 transition font-medium text-sm border-b-2 ${
            isActive("/reksadana/weekly") 
              ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500" 
              : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-700"
          }`}
        >
          Weekly Performance
        </Link>
        <Link 
          href="/reksadana/monthly" 
          className={`pb-4 transition font-medium text-sm border-b-2 ${
            isActive("/reksadana/monthly") 
              ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500" 
              : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-700"
          }`}
        >
          Monthly Performance
        </Link>
      </nav>
      {children}
    </div>
  );
}
