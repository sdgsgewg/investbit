import { TutorialData } from "@/types/learn/TutorialData";

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
