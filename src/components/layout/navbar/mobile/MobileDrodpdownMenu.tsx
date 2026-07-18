import { NavLink } from "@/types/NavLink";
import React from "react";
import NavbarMobileLink from "./NavbarMobileLink";

type NavbarDropdownMenuProps = {
  label: string;
  links: NavLink[];
  pathname: string;
  onLinkClick: () => void;
};

const MobileDropdownMenu = ({
  label,
  links,
  pathname,
  onLinkClick,
}: NavbarDropdownMenuProps) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider px-2">
        {label}
      </h3>
      <div className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavbarMobileLink
            key={link.path}
            link={link}
            pathname={pathname}
            onClose={onLinkClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileDropdownMenu;
