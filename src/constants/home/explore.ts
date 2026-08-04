import { ROUTES } from "@/constants/routes";

export const HOME_EXPLORE_FEATURES = [
  {
    key: "learn",
    href: ROUTES.LEARN,
  },
  {
    key: "glossary",
    href: ROUTES.GLOSSARY,
  },
  {
    key: "performance",
    href: ROUTES.MUTUAL_FUND.PERFORMANCE,
  },
] as const;

export type HomeExploreFeature = (typeof HOME_EXPLORE_FEATURES)[number];

export type HomeExploreFeatureKey = HomeExploreFeature["key"];
