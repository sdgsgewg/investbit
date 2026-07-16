import { useAuth } from "@/providers/auth-provider";
import AuthButtons from "../guest/AuthButtons";
import UserDropdown from "../user-dropdown/UserDropdown";

const NavbarDesktopAuth = () => {
  const { user } = useAuth();

  return <>{user ? <UserDropdown user={user} /> : <AuthButtons />}</>;
};

export default NavbarDesktopAuth;
