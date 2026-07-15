import { ROUTES } from "@/constants/routes";
import { NavLink } from "@/types/NavLink";
import { useTranslations } from "next-intl";

export function useNavbarLinks() {
  const tNav = useTranslations("navigation");

  const contentManageLinks: NavLink[] = [
    {
      name: tNav("dashboard.reksadana.categories"),
      path: ROUTES.DASHBOARD.REKSADANA.CATEGORIES,
    },
    {
      name: tNav("dashboard.reksadana.items"),
      path: ROUTES.DASHBOARD.REKSADANA.ITEMS,
    },
    {
      name: tNav("dashboard.reksadana.records"),
      path: ROUTES.DASHBOARD.REKSADANA.RECORDS,
    },
  ];

  const systemManageLinks: NavLink[] = [
    {
      name: tNav("dashboard.system.users"),
      path: ROUTES.DASHBOARD.SYSTEM.USERS,
    },
    {
      name: tNav("dashboard.system.roles"),
      path: ROUTES.DASHBOARD.SYSTEM.ROLES,
    },
  ];

  return {
    contentManageLinks,
    systemManageLinks,
  };
}
