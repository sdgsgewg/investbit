import { ROUTES } from "@/constants/routes";
import { NavLink } from "@/types/NavLink";
import { useTranslations } from "next-intl";

export function useNavLinks() {
  const tNav = useTranslations("navigation");

  const navLinks: NavLink[] = [
    { name: tNav("home"), path: ROUTES.HOME },
    { name: tNav("learn"), path: ROUTES.LEARN },
    { name: tNav("glossary"), path: ROUTES.GLOSSARY },
    { name: tNav("rdnPerformance"), path: ROUTES.REKSADANA.PERFORMANCE },
  ];

  return {
    navLinks,
  };
}
