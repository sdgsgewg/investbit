import { useSidebarLinks } from "@/hooks/useSidebarLinks";
import MobileDropdownMenu from "../mobile/MobileDrodpdownMenu";
import { useTranslations } from "next-intl";
import NavbarMobileSheet from "../mobile/NavbarMobileSheet";
import MobileNavLinks from "../mobile/MobileNavLinks";

interface NavbarMobileMenuProps {
  open: boolean;
  pathname: string;
  isContentManager: boolean;
  isSystemManager: boolean;
  onClose: () => void;
}

const NavbarMobileMenu = ({
  open,
  pathname,
  isContentManager,
  isSystemManager,
  onClose,
}: NavbarMobileMenuProps) => {
  const tNav = useTranslations("navigation");

  const { navLinks, contentManageLinks, systemManageLinks } = useSidebarLinks();

  return (
    <NavbarMobileSheet open={open} onClose={onClose}>
      <MobileNavLinks
        links={navLinks}
        pathname={pathname}
        onLinkClick={onClose}
      />

      {isContentManager && (
        <MobileDropdownMenu
          label={tNav("dashboard.reksadana.base")}
          links={contentManageLinks}
          pathname={pathname}
          onLinkClick={onClose}
        />
      )}

      {isSystemManager && (
        <MobileDropdownMenu
          label={tNav("dashboard.system.base")}
          links={systemManageLinks}
          pathname={pathname}
          onLinkClick={onClose}
        />
      )}
    </NavbarMobileSheet>
  );
};

export default NavbarMobileMenu;
