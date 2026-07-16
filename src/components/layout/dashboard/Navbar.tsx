import React, { useState } from "react";
import { usePathname } from "@/navigation";
import { Menu } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import NavbarLogo from "../navbar/NavbarLogo";
import NavbarDesktopAuth from "../navbar/desktop/NavbarDesktopAuth";
import NavbarMobileMenu from "../navbar/dashboard/NavbarMobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { isContentManager, isSystemManager } = useAuth();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="h-16 shrink-0">
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex h-full items-center justify-between px-4 lg:px-6">
          <div className="flex items-center">
            {/* Logo and Website Name */}
            <NavbarLogo />
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
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
        isContentManager={isContentManager}
        isSystemManager={isSystemManager}
        onClose={closeMobileMenu}
      />
    </header>
  );
};

export default Navbar;
