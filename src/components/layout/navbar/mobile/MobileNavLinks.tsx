import { NavLink } from "@/types/NavLink";
import React from "react";
import NavbarMobileLink from "./NavbarMobileLink";

interface Props {
  links: NavLink[];
  pathname: string;
  onLinkClick: () => void;
}

const MobileNavLinks = ({ links, pathname, onLinkClick }: Props) => {
  return (
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
  );
};

export default MobileNavLinks;
