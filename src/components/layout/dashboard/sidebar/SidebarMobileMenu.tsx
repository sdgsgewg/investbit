import { useSidebarLinks } from "@/hooks/useSidebarLinks";
import MobileDropdownMenu from "../../navbar/mobile/MobileDrodpdownMenu";
import { useTranslations } from "next-intl";
import MobileMenuSheet from "../../navbar/mobile/MobileMenuSheet";
import MobileNavLinks from "../../navbar/mobile/MobileNavLinks";

interface SidebarMobileMenuProps {
  open: boolean;
  pathname: string;
  isContentManager: boolean;
  isSystemManager: boolean;
  onClose: () => void;
}

const SidebarMobileMenu = ({
  open,
  pathname,
  isContentManager,
  isSystemManager,
  onClose,
}: SidebarMobileMenuProps) => {
  const tNav = useTranslations("navigation");

  const { navLinks, contentManageLinks, systemManageLinks } = useSidebarLinks();

  return (
    <MobileMenuSheet open={open} onClose={onClose}>
      <MobileNavLinks
        links={navLinks}
        pathname={pathname}
        onLinkClick={onClose}
      />

      {isContentManager && (
        <MobileDropdownMenu
          label={tNav("dashboard.mutualFund.base")}
          links={contentManageLinks}
          pathname={pathname}
          onLinkClick={onClose}
        />
      )}

      {/* {isSystemManager && (
        <MobileDropdownMenu
          label={tNav("dashboard.system.base")}
          links={systemManageLinks}
          pathname={pathname}
          onLinkClick={onClose}
        />
      )} */}
    </MobileMenuSheet>
  );
};

export default SidebarMobileMenu;
