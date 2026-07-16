import { useSidebarLinks } from "@/hooks/useSidebarLinks";
import NavItem from "./NavItem";
import { useTranslations } from "next-intl";
import { isActivePath } from "@/lib/utils/navigation";

interface SidebarProps {
  pathname: string;
}

const Sidebar = ({ pathname }: SidebarProps) => {
  const tNav = useTranslations("navigation");

  const { navLinks, contentManageLinks } = useSidebarLinks();

  return (
    <div className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-sidebar border-r border-sidebar-border">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Home */}
        <div className="space-y-1">
          {navLinks.map((link) => (
            <NavItem
              key={link.path}
              path={link.path}
              name={link.name}
              icon={link.icon}
              isActive={(path) => isActivePath(pathname, path, link.exact)}
            />
          ))}
        </div>

        <div className="my-6 border-t" />

        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {tNav("dashboard.reksadana.base")}
          </p>

          {/* RDN menu */}
          <div className="space-y-1">
            {contentManageLinks.map((link) => (
              <NavItem
                key={link.path}
                path={link.path}
                name={link.name}
                icon={link.icon}
                isActive={(path) => isActivePath(pathname, path, link.exact)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
