import { useNavLinks } from "@/hooks/useNavLinks";
import NavbarDropdownLink from "./NavbarDropdownLink";
import NavbarDesktopLink from "./NavbarDesktopLink";

interface NavbarDesktopLinksProps {
  pathname: string;
}

const NavbarDesktopLinks = ({ pathname }: NavbarDesktopLinksProps) => {
  const { navLinks } = useNavLinks();

  return (
    <div className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
      {navLinks.map((link) =>
        link.children ? (
          <NavbarDropdownLink
            key={link.path}
            link={link}
            pathname={pathname}
            items={link.children}
          />
        ) : (
          <NavbarDesktopLink key={link.path} link={link} pathname={pathname} />
        ),
      )}
    </div>
  );
};

export default NavbarDesktopLinks;
