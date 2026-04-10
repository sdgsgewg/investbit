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
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const tNav = useTranslations("navigation");
  const tReksadana = useTranslations("navigation.reksadana");
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: tNav("home"), path: ROUTES.HOME },
    { name: tNav("learn"), path: ROUTES.LEARN },
    { name: tNav("glossary"), path: ROUTES.GLOSSARY },
  ];

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 items-center px-4 container mx-auto justify-between">
          <div className="flex items-center">
            <Link
              href={ROUTES.HOME}
              className="font-bold text-2xl mr-6 bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent shrink-0"
            >
              Investbit
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(link.path)
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {link.name}
                </Link>
              ))}

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
                    <Link href={ROUTES.REKSADANA.ITEMS}>
                      {tReksadana("items")}
                    </Link>
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
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSwitcher />
            <ModeToggle />

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-md focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 md:hidden bg-background border-l shadow-2xl flex flex-col"
          >
            <div className="flex h-16 items-center px-4 justify-between border-b shrink-0">
              <span className="font-bold text-2xl bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                className="p-2 text-foreground hover:bg-muted rounded-md focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Mobile Menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors p-2 rounded-md hover:bg-accent",
                      isActive(link.path)
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider px-2">
                  {tReksadana("base")}
                </h3>
                <div className="flex flex-col space-y-2">
                  <Link
                    href={ROUTES.REKSADANA.RECAP.INPUT}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors p-2 rounded-md hover:bg-accent",
                      pathname === ROUTES.REKSADANA.RECAP.INPUT
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground",
                    )}
                  >
                    {tReksadana("recap")}
                  </Link>
                  <Link
                    href={ROUTES.REKSADANA.ITEMS}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors p-2 rounded-md hover:bg-accent",
                      pathname === ROUTES.REKSADANA.ITEMS
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground",
                    )}
                  >
                    {tReksadana("items")}
                  </Link>
                  <Link
                    href={ROUTES.REKSADANA.CATEGORIES}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors p-2 rounded-md hover:bg-accent",
                      pathname === ROUTES.REKSADANA.CATEGORIES
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground",
                    )}
                  >
                    {tReksadana("categories")}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
