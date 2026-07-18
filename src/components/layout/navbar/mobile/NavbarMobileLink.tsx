import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/utils/navigation";
import { Link } from "@/navigation";
import { NavLink } from "@/types/NavLink";
import React from "react";

interface Props {
  link: NavLink;
  pathname: string;
  onClose: () => void;
}

const NavbarMobileLink = ({ link, pathname, onClose }: Props) => {
  return (
    <Link
      key={link.path}
      href={link.path}
      onClick={onClose}
      className={cn(
        "text-lg font-medium transition-colors p-2 rounded-md hover:bg-accent",
        isActivePath(pathname, link.path)
          ? "text-primary bg-primary/5"
          : "text-muted-foreground",
      )}
    >
      {link.name}
    </Link>
  );
};

export default NavbarMobileLink;
