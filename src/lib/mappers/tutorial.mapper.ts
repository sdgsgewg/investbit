import { TutorialData } from "@/features/learn/types/TutorialData";

export function mapTutorialWithChart(
  tutorial: any,
  chart: string,
): TutorialData {
  return {
    ...tutorial,
    highlight: {
      ...tutorial.highlight,
      points: tutorial.highlight?.points || [],
    },
    chart,
  };
}
