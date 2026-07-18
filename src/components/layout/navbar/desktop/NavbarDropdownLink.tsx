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
import { NavbarDropdownChild, NavLink } from "@/types/NavLink";

interface NavbarDropdownLinkProps {
  link: NavLink;
  pathname: string;
  items: NavbarDropdownChild[];
}

const NavbarDropdownLink = ({
  link,
  pathname,
  items,
}: NavbarDropdownLinkProps) => {
  const active =
    isActivePath(pathname, link.path) ||
    items.some((item) => isActivePath(pathname, item.path));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors outline-none hover:text-primary",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        <span>{link.name}</span>

        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center">
        {items.map((child) => (
          <DropdownMenuItem key={child.path} asChild>
            <Link
              href={child.path}
              className={cn(
                "w-full cursor-pointer",
                isActivePath(pathname, child.path) && "font-semibold",
              )}
            >
              {child.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdownLink;
