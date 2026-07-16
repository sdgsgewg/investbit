import DashboardButton from "@/components/layout/buttons/DashboardButton";
import LoginButton from "@/components/layout/buttons/LoginButton";
import RegisterButton from "@/components/layout/buttons/RegisterButton";
import { useAuth } from "@/providers/auth-provider";
import LogoutButton from "../../buttons/LogoutButton";
import { usePathname } from "@/navigation";

interface NavbarMobileAuthProps {
  onClose: () => void;
}

const NavbarMobileAuth = ({ onClose }: NavbarMobileAuthProps) => {
  const { user } = useAuth();

  const pathname = usePathname();

  const isDashboard = pathname.includes("/dashboard");

  return (
    <div className="pt-6 border-t border-border/50">
      {user ? (
        <div className="space-y-4 p-2">
          {!isDashboard && <DashboardButton onClose={onClose} />}
          <LogoutButton onClose={onClose} />
        </div>
      ) : (
        <div className="space-y-4 p-2">
          <LoginButton onClose={onClose} />
          <RegisterButton onClose={onClose} />
        </div>
      )}
    </div>
  );
};

export default NavbarMobileAuth;
