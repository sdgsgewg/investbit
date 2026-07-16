import { useNavLinks } from "@/hooks/useNavLinks";
import { cn } from "@/lib/utils";
import { isActivePath } from "@/lib/utils/navigation";
import { Link } from "@/navigation";

interface NavbarDesktopLinksProps {
  pathname: string;
}

const NavbarDesktopLinks = ({ pathname }: NavbarDesktopLinksProps) => {
  const { navLinks } = useNavLinks();

  return (
    <div className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
      {navLinks.map((link) => (
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
      ))}
    </div>
  );
};

export default NavbarDesktopLinks;
