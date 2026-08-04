import { ExploreSection, HeroSection } from "@/components/home";

interface Section {
  name: string;
  element: React.ReactElement;
}

export const homeSections: Section[] = [
  { name: "hero", element: <HeroSection /> },
  { name: "explore", element: <ExploreSection /> },
] as const;

export type HomeSectionName = (typeof homeSections)[number]["name"];
