import { useNavLinks } from "@/hooks/useNavLinks";
import MobileDropdownMenu from "../mobile/MobileDrodpdownMenu";
import { useTranslations } from "next-intl";
import NavbarMobileLink from "../mobile/NavbarMobileLink";
import MobileMenuSheet from "../mobile/MobileMenuSheet";

interface NavbarMobileMenuProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}

const NavbarMobileMenu = ({
  open,
  pathname,
  onClose,
}: NavbarMobileMenuProps) => {
  const { navLinks, mutualFundLinks } = useNavLinks();

  const tNav = useTranslations("navigation");

  return (
    <>
      <MobileMenuSheet open={open} onClose={onClose}>
        <div className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <NavbarMobileLink
              key={link.path}
              link={link}
              pathname={pathname}
              onClose={onClose}
            />
          ))}
        </div>

        <MobileDropdownMenu
          label={tNav("mutualFund.base")}
          links={mutualFundLinks}
          pathname={pathname}
          onLinkClick={onClose}
        />
      </MobileMenuSheet>
    </>
  );
};

export default NavbarMobileMenu;
