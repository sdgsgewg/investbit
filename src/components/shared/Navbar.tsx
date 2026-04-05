"use client";

import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/app/constants/routes";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const t = useTranslations("Nav");
  const tReksadana = useTranslations("Nav.reksadana");

  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link
          href={ROUTES.HOME}
          className="font-bold text-2xl mr-6 bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
        >
          Investbit
        </Link>
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href={ROUTES.HOME}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(ROUTES.HOME) ? "text-primary" : "text-muted-foreground",
            )}
          >
            {t("home")}
          </Link>
          <Link
            href={ROUTES.LEARN}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(ROUTES.LEARN) ? "text-primary" : "text-muted-foreground",
            )}
          >
            {t("learn")}
          </Link>
          {/*
          <Link
            href={ROUTES.ANALYZE}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(ROUTES.ANALYZE) ? "text-primary" : "text-muted-foreground"
            )}
          >
            {t("analyze")}
          </Link>
          */}
          <Link
            href={ROUTES.GLOSSARY}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(ROUTES.GLOSSARY)
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            {t("glossary")}
          </Link>
          {/* <Link
            href={ROUTES.RDN_RECAP.INPUT}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(ROUTES.RDN_RECAP.INPUT)
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            {t("rdn-recap")}
          </Link> */}

          {/* Dropdown Manage Item Menu */}
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                pathname.startsWith("/reksadana")
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {tReksadana("base")}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  open && "rotate-180",
                )}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuItem
                asChild
                className={cn(
                  pathname === ROUTES.REKSADANA.RECAP.INPUT && "bg-accent",
                )}
              >
                <Link href={ROUTES.REKSADANA.RECAP.INPUT}>
                  {tReksadana("recap")}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className={cn(
                  pathname === ROUTES.REKSADANA.ITEMS && "bg-accent",
                )}
              >
                <Link href={ROUTES.REKSADANA.ITEMS}>{tReksadana("items")}</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className={cn(
                  pathname === ROUTES.REKSADANA.CATEGORIES && "bg-accent",
                )}
              >
                <Link href={ROUTES.REKSADANA.CATEGORIES}>
                  {tReksadana("categories")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
