import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/utils/navigation";
import { Link } from "@/navigation";
import { NavLink } from "@/types/NavLink";
import React from "react";

interface Props {
  link: NavLink;
  pathname: string;
}

const NavbarDesktopLink = ({ link, pathname }: Props) => {
  return (
    <Link
      key={link.path}
      href={link.path}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActivePath(pathname, link.path)
          ? "text-primary"
          : "text-muted-foreground",
      )}
    >
      {link.name}
    </Link>
  );
};

export default NavbarDesktopLink;
