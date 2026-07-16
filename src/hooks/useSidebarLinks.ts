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
  const tNav = useTranslations("navigation");

  const navLinks: NavLink[] = [
    {
      name: tNav("dashboard.base"),
      path: ROUTES.DASHBOARD.HOME,
      icon: LayoutDashboard,
      exact: true,
    },
  ];

  const contentManageLinks: NavLink[] = [
    {
      name: tNav("dashboard.reksadana.categories"),
      path: ROUTES.DASHBOARD.REKSADANA.CATEGORIES,
      icon: FolderTree,
    },
    {
      name: tNav("dashboard.reksadana.items"),
      path: ROUTES.DASHBOARD.REKSADANA.ITEMS,
      icon: Boxes,
    },
    {
      name: tNav("dashboard.reksadana.records"),
      path: ROUTES.DASHBOARD.REKSADANA.RECORDS,
      icon: Database,
    },
  ];

  const systemManageLinks: NavLink[] = [
    {
      name: tNav("dashboard.system.users"),
      path: ROUTES.DASHBOARD.SYSTEM.USERS,
      icon: User,
    },
    {
      name: tNav("dashboard.system.roles"),
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
