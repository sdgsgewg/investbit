import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { ChevronRight } from "lucide-react";

interface Props {
  path: string;
  name: string;
  icon?: React.ElementType;
  isActive: (path: string) => boolean;
}

const NavItem = ({ path, name, icon: Icon, isActive }: Props) => {
  const active = isActive(path);

  return (
    <Link
      href={path}
      className={cn(
        "group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4" />}
        <span>{name}</span>
      </div>

      <ChevronRight
        className={cn(
          "h-4 w-4 opacity-0 transition-opacity",
          active && "opacity-100",
          !active && "group-hover:opacity-50",
        )}
      />
    </Link>
  );
};

export default NavItem;
