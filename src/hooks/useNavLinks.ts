import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";

export function useNavLinks() {
  const tNav = useTranslations("navigation");

  const navLinks = [
    { name: tNav("home"), path: ROUTES.HOME },
    { name: tNav("learn"), path: ROUTES.LEARN },
    { name: tNav("glossary"), path: ROUTES.GLOSSARY },
    { name: tNav("rdnPerformance"), path: ROUTES.REKSADANA.PERFORMANCE },
  ];

  return {
    navLinks,
  };
}
