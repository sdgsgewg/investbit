"use client";

import { ChevronDown } from "lucide-react";

import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/utils/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "@/types/NavLink";

interface NavbarDropdownLinkProps {
  label: string;
  links: NavLink[];
  pathname: string;
}

const NavbarDropdownLink = ({
  label,
  links,
  pathname,
}: NavbarDropdownLinkProps) => {
  const active = links.some((link) => isActivePath(pathname, link.path));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors outline-none hover:text-primary",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        <span>{label}</span>

        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center">
        {links.map((link) => (
          <DropdownMenuItem key={link.path} asChild>
            <Link
              href={link.path}
              className={cn(
                "w-full cursor-pointer",
                isActivePath(pathname, link.path) && "font-semibold",
              )}
            >
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdownLink;
