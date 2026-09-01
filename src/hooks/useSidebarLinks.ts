import { ENTITY_CONFIG } from "@/config/entities";
import { ROUTES } from "@/constants/routes";
import { NavLink } from "@/types/NavLink";
import {
  Boxes,
  Database,
  FolderTree,
  KeyRound,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function useSidebarLinks() {
  const tNav = useTranslations("navigation.dashboard");

  const navLinks: NavLink[] = [
    {
      name: tNav("base"),
      path: ROUTES.DASHBOARD.HOME,
      icon: LayoutDashboard,
      exact: true,
    },
  ];

  const contentManageLinks: NavLink[] = [
    {
      name: tNav("mutualFund.categories"),
      path: ENTITY_CONFIG["rdCategory"]["dashboardRoute"],
      icon: FolderTree,
    },
    {
      name: tNav("mutualFund.items"),
      path: ENTITY_CONFIG["rdItem"]["dashboardRoute"],
      icon: Boxes,
    },
    {
      name: tNav("mutualFund.records"),
      path: ENTITY_CONFIG["rdRecord"]["dashboardRoute"],
      icon: Database,
    },
  ];

  const systemManageLinks: NavLink[] = [
    {
      name: tNav("system.users"),
      path: ROUTES.DASHBOARD.SYSTEM.USERS,
      icon: User,
    },
    {
      name: tNav("system.roles"),
      path: ROUTES.DASHBOARD.SYSTEM.ROLES,
      icon: KeyRound,
    },
  ];

  return {
    navLinks,
    contentManageLinks,
    systemManageLinks,
  };
}
