import { ROUTES } from "@/constants/routes";
import { Link } from "@/navigation";

const NavbarLogo = () => {
  return (
    <Link
      href={ROUTES.HOME}
      className="font-bold text-2xl mr-6 bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent shrink-0"
    >
      Investbit
    </Link>
  );
};

export default NavbarLogo;
