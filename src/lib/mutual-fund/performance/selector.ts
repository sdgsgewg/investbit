import { PerformanceData } from "@/types/reksadana/performance/DataType";

export interface PerformanceWinner {
  name: string;
  category: string;
  yieldValue: number;
}

export interface TopPerformersResult {
  latestPeriod: string;
  overallBest: PerformanceWinner | null;
  categoryBests: PerformanceWinner[];
}

export interface RankedPerformanceItem {
  itemId: string;
  itemName: string;
  yieldValue: number;
  rank: number;
}

export interface RankedPerformanceCategory {
  categoryName: string;
  rankedItems: RankedPerformanceItem[];
}

export function getTopPerformers(
  data: PerformanceData,
  timePeriods: string[],
): TopPerformersResult | null {
  const latestPeriod = timePeriods.at(-1);

  if (!latestPeriod || data.length === 0) {
    return null;
  }

  let overallBest: PerformanceWinner | null = null;

  const categoryBests: PerformanceWinner[] = [];

  for (const category of data) {
    let bestInCategory: PerformanceWinner | null = null;

    for (const item of category.items) {
      const yieldValue = item.yields[latestPeriod];

      if (yieldValue === undefined || Number.isNaN(yieldValue)) {
        continue;
      }

      const currentItem: PerformanceWinner = {
        name: item.itemName,
        category: category.categoryName,
        yieldValue,
      };

      if (!bestInCategory || yieldValue > bestInCategory.yieldValue) {
        bestInCategory = currentItem;
      }

      if (!overallBest || yieldValue > overallBest.yieldValue) {
        overallBest = currentItem;
      }
    }

    if (bestInCategory) {
      categoryBests.push(bestInCategory);
    }
  }

  return {
    latestPeriod,
    overallBest,
    categoryBests,
  };
}

export function getCategoryLeaderboard(
  data: PerformanceData,
  timePeriods: string[],
): RankedPerformanceCategory[] {
  const latestPeriod = timePeriods.at(-1);

  if (!latestPeriod || data.length === 0) {
    return [];
  }

  return data
    .map((category) => {
      const rankedItems = category.items
        .map((item) => {
          const yieldValue = item.yields[latestPeriod];

          if (yieldValue === undefined || Number.isNaN(yieldValue)) {
            return null;
          }

          return {
            itemId: item.itemId,
            itemName: item.itemName,
            yieldValue,
          };
        })
        .filter(
          (item): item is Omit<RankedPerformanceItem, "rank"> => item !== null,
        )
        .sort((a, b) => b.yieldValue - a.yieldValue)
        .map((item, index) => ({
          ...item,
          rank: index + 1,
        }));

      return {
        categoryName: category.categoryName,
        rankedItems,
      };
    })
    .filter((category) => category.rankedItems.length > 0);
}
