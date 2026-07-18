import { ROUTES } from "@/constants/routes";
import { NavLink } from "@/types/NavLink";
import { useTranslations } from "next-intl";

export function useNavLinks() {
  const tNav = useTranslations("navigation");

  const navLinks: NavLink[] = [
    { name: tNav("home"), path: ROUTES.HOME },
    { name: tNav("learn"), path: ROUTES.LEARN },
    { name: tNav("glossary"), path: ROUTES.GLOSSARY },
    {
      name: tNav("mutualFund.base"),
      path: ROUTES.MUTUAL_FUND.BASE,
      children: [
        {
          name: tNav("mutualFund.performance"),
          path: ROUTES.MUTUAL_FUND.PERFORMANCE,
        },
      ],
    },
  ];

  return {
    navLinks,
  };
}
