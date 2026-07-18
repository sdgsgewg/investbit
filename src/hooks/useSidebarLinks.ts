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
      name: tNav("dashboard.mutualFund.categories"),
      path: ROUTES.DASHBOARD.MUTUAL_FUND.CATEGORIES,
      icon: FolderTree,
    },
    {
      name: tNav("dashboard.mutualFund.items"),
      path: ROUTES.DASHBOARD.MUTUAL_FUND.ITEMS,
      icon: Boxes,
    },
    {
      name: tNav("dashboard.mutualFund.records"),
      path: ROUTES.DASHBOARD.MUTUAL_FUND.RECORDS,
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
