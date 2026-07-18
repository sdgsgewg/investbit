import { useNavLinks } from "@/hooks/useNavLinks";
import NavbarDropdownLink from "./NavbarDropdownLink";
import NavbarDesktopLink from "./NavbarDesktopLink";
import { useTranslations } from "next-intl";

interface NavbarDesktopLinksProps {
  pathname: string;
}

const NavbarDesktopLinks = ({ pathname }: NavbarDesktopLinksProps) => {
  const { navLinks, mutualFundLinks } = useNavLinks();

  const tNav = useTranslations("navigation");

  return (
    <div className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
      {navLinks.map((link) => (
        <NavbarDesktopLink key={link.path} link={link} pathname={pathname} />
      ))}

      <NavbarDropdownLink
        label={tNav("mutualFund.base")}
        links={mutualFundLinks}
        pathname={pathname}
      />
    </div>
  );
};

export default NavbarDesktopLinks;
