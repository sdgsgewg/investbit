import { ROUTES } from "@/constants/routes";
import { Link } from "@/navigation";
import { useAuth } from "@/providers/auth-provider";
import { LogIn, LogOut, User } from "lucide-react";
import { useTranslations } from "next-intl";

interface NavbarMobileAuthProps {
  onClose: () => void;
}

const NavbarMobileAuth = ({ onClose }: NavbarMobileAuthProps) => {
  const { user, signOut } = useAuth();

  const tAuth = useTranslations("auth");

  return (
    <div className="pt-6 border-t border-border/50">
      {user ? (
        <div className="space-y-4 p-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground truncate">
              {user.email}
            </span>
          </div>

          {/* Log Out Button */}
          <button
            onClick={() => {
              onClose();
              signOut();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{tAuth("logout")}</span>
          </button>
        </div>
      ) : (
        <div className="px-2">
          <Link
            href={ROUTES.AUTH.LOGIN}
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>{tAuth("login")}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarMobileAuth;
