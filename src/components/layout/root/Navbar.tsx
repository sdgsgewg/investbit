"use client";

import { usePathname } from "@/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import NavbarLogo from "../navbar/NavbarLogo";
import NavbarDesktopLinks from "../navbar/desktop/NavbarDesktopLinks";
import NavbarDesktopAuth from "../navbar/desktop/NavbarDesktopAuth";
import NavbarMobileMenu from "../navbar/root/NavbarMobileMenu";
import DashboardButton from "@/components/layout/buttons/DashboardButton";
import { useAuth } from "@/providers/auth-provider";
import { ModeToggle } from "@/components/settings/ModeToggle";
import { LanguageSwitcher } from "@/components/settings/LanguageSwitcher";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { profile } = useAuth();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header>
      <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 items-center px-4 container mx-auto justify-between">
          <div className="flex items-center">
            {/* Logo and Website Name */}
            <NavbarLogo />

            {/* Desktop Navigation */}
            <NavbarDesktopLinks pathname={pathname} />
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center gap-4">
              <ModeToggle />
              <LanguageSwitcher />
            </div>

            {/* Dashboard Navigation Button */}
            {profile && (
              <div className="hidden md:flex">
                <DashboardButton />
              </div>
            )}

            {/* Desktop Auth Section */}
            <NavbarDesktopAuth />

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
      <NavbarMobileMenu
        open={mobileMenuOpen}
        pathname={pathname}
        onClose={closeMobileMenu}
      />
    </header>
  );
}
