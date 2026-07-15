import { ROUTES } from "@/constants/routes";
import { Link } from "@/navigation";
import { useAuth } from "@/providers/auth-provider";
import { LogIn, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const NavbarDesktopAuth = () => {
  const { user, signOut } = useAuth();
  const tAuth = useTranslations("auth");

  return (
    <>
      {user ? (
        <div className="hidden md:flex items-center gap-3">
          <span
            className="text-xs text-muted-foreground max-w-30 truncate"
            title={user.email}
          >
            {user.email}
          </span>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg border border-border/50 bg-muted/40 hover:bg-muted transition-all cursor-pointer text-foreground"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{tAuth("logout")}</span>
          </button>
        </div>
      ) : (
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="hidden md:flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>{tAuth("login")}</span>
        </Link>
      )}
    </>
  );
};

export default NavbarDesktopAuth;
