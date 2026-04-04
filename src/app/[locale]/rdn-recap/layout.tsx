"use client";

import { ROUTES } from "@/app/constants/routes";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";

export default function ReksaDanaLayout({ children }: { children: React.ReactNode }) {
  const tRecap = useTranslations("RdnRecap");
  const tRecapDaily = useTranslations("RdnRecap.daily");
  const tRecapWeekly = useTranslations("RdnRecap.weekly");
  const tRecapMonthly = useTranslations("RdnRecap.monthly");
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{tRecap("title")}</h1>
      <nav className="flex space-x-6 mb-8 border-b border-zinc-200 dark:border-zinc-800">
        <Link 
          href={ROUTES.RDN_RECAP.INPUT}
          className={`pb-4 transition font-medium text-sm border-b-2 ${
            isActive(ROUTES.RDN_RECAP.INPUT) 
              ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500" 
              : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-700"
          }`}
        >
          {tRecapDaily("nav")}
        </Link>
        <Link 
          href={ROUTES.RDN_RECAP.WEEKLY} 
          className={`pb-4 transition font-medium text-sm border-b-2 ${
            isActive(ROUTES.RDN_RECAP.WEEKLY) 
              ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500" 
              : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-700"
          }`}
        >
          {tRecapWeekly("nav")}
        </Link>
        <Link 
          href={ROUTES.RDN_RECAP.MONTHLY} 
          className={`pb-4 transition font-medium text-sm border-b-2 ${
            isActive(ROUTES.RDN_RECAP.MONTHLY) 
              ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500" 
              : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-700"
          }`}
        >
          {tRecapMonthly("nav")}
        </Link>
      </nav>
      {children}
    </div>
  );
}
