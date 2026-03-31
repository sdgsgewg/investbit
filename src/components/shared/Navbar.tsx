"use client";

import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { ModeToggle } from "./ModeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link
          href="/"
          className="font-bold text-2xl mr-6 bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
        >
          Investbit
        </Link>
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/") ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("home")}
          </Link>
          <Link
            href="/learn"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/learn") ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("learn")}
          </Link>
          {/*
          <Link
            href="/analyze"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/analyze") ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("analyze")}
          </Link>
          */}
          <Link
            href="/glossary"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/glossary") ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("glossary")}
          </Link>
          <Link
            href="/reksadana"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/reksadana") ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("reksadana")}
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
