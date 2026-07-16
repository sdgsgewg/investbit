import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/utils/navigation";
import { Link } from "@/navigation";
import { NavLink } from "@/types/NavLink";
import React from "react";

type NavbarDropdownMenuProps = {
  label: string;
  links: NavLink[];
  pathname: string;
  onLinkClick?: () => void;
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
          <Link
            key={link.path}
            href={link.path}
            onClick={onLinkClick}
            className={cn(
              "text-lg font-medium transition-colors p-2 rounded-md hover:bg-accent",
              isActivePath(pathname, link.path, link.exact)
                ? "text-primary bg-primary/5"
                : "text-muted-foreground",
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileDropdownMenu;
