import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { NavLink } from "@/types/NavLink";
import React from "react";

interface Props {
  links: NavLink[];
  pathname: string;
  onLinkClick: () => void;
}

const MobileNavLinks = ({ links, pathname, onLinkClick }: Props) => {
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <div className="flex flex-col space-y-2">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          onClick={onLinkClick}
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
  );
};

export default MobileNavLinks;
