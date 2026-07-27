import { useSidebarLinks } from "@/hooks/useSidebarLinks";
import SidebarLink from "./SidebarLink";
import { useTranslations } from "next-intl";

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
            <SidebarLink key={link.path} link={link} pathname={pathname} />
          ))}
        </div>

        <div className="my-6 border-t" />

        <div>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {tNav("dashboard.mutualFund.base")}
          </p>

          {/* RDN menu */}
          <div className="space-y-1">
            {contentManageLinks.map((link) => (
              <SidebarLink key={link.path} link={link} pathname={pathname} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
