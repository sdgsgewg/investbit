import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/utils/navigation";
import { Link } from "@/navigation";
import { NavLink } from "@/types/NavLink";
import React from "react";

interface Props {
  links: NavLink[];
  pathname: string;
  onLinkClick: () => void;
}

const MobileNavLinks = ({ links, pathname, onLinkClick }: Props) => {
  return (
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
  );
};

export default MobileNavLinks;
