"use client";

import { ROUTES } from "@/app/constants/routes";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";

export default function ReksaDanaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tRecap = useTranslations("Reksadana.recap");
  const tRecapDaily = useTranslations("Reksadana.recap.daily");
  const tRecapPerformance = useTranslations("Reksadana.recap.performance");
  const pathname = usePathname();

  const tabs: { path: string; label: string }[] = [
    { path: ROUTES.REKSADANA.RECAP.INPUT, label: tRecapDaily("nav") },
    {
      path: ROUTES.REKSADANA.RECAP.PERFORMANCE,
      label: tRecapPerformance("nav"),
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{tRecap("title")}</h1>
      <nav className="flex space-x-2 mb-8 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            href={tab.path}
            className={`whitespace-nowrap px-4 pb-3 transition font-medium text-sm border-b-2 ${
              isActive(tab.path)
                ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-700"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
