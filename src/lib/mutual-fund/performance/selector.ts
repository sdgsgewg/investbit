import {
  CategoryLeaderboardResponse,
  PerformanceData,
  PerformanceWinner,
  RankedPerformanceCategory,
  RankedPerformanceItem,
  TopPerformersResponse,
} from "@/types/mutual-fund/performance";
import { RecordListItem } from "@/types/mutual-fund/records";
import { TimeFrame } from "@/enums/TimeFrame";
import { getPerformancePeriodKey } from "./period";

// Re-export response interfaces for backward compatibility
export type { PerformanceWinner, RankedPerformanceItem, RankedPerformanceCategory };
export type TopPerformersResult = TopPerformersResponse;

/**
 * Computes top performers directly from lightweight raw records in the latest period.
 */
export function computeTopPerformersFromRecords(
  records: RecordListItem[],
  timeFrame: TimeFrame = TimeFrame.WEEKLY,
  latestDate: string | null,
): TopPerformersResponse {
  if (!latestDate || records.length === 0) {
    return {
      latestPeriod: "",
      overallBest: null,
      categoryBests: [],
    };
  }

  const latestPeriod = getPerformancePeriodKey(latestDate, timeFrame);

  const categoryMap: Record<
    string,
    Record<string, { itemName: string; yieldValue: number }>
  > = {};

  records.forEach((record) => {
    const item = record.item;
    if (!item || !item.category) return;
    const catName = item.category.name;
    if (!categoryMap[catName]) {
      categoryMap[catName] = {};
    }
    const val =
      timeFrame === TimeFrame.YTD
        ? (record.yieldYtd ?? 0)
        : (record.yield1d ?? 0);

    if (!categoryMap[catName][item.id]) {
      categoryMap[catName][item.id] = {
        itemName: item.name,
        yieldValue: val,
      };
    } else if (timeFrame !== TimeFrame.YTD) {
      categoryMap[catName][item.id].yieldValue += val;
    }
  });

  let overallBest: PerformanceWinner | null = null;
  const categoryBests: PerformanceWinner[] = [];

  Object.entries(categoryMap).forEach(([catName, items]) => {
    let bestInCat: PerformanceWinner | null = null;
    Object.values(items).forEach(({ itemName, yieldValue }) => {
      const winner: PerformanceWinner = {
        name: itemName,
        category: catName,
        yieldValue,
      };
      if (!bestInCat || yieldValue > bestInCat.yieldValue) {
        bestInCat = winner;
      }
      if (!overallBest || yieldValue > overallBest.yieldValue) {
        overallBest = winner;
      }
    });
    if (bestInCat) {
      categoryBests.push(bestInCat);
    }
  });

  return {
    latestPeriod,
    overallBest,
    categoryBests,
  };
}

/**
 * Computes leaderboard directly from lightweight raw records in the latest period.
 */
export function computeCategoryLeaderboardFromRecords(
  records: RecordListItem[],
  timeFrame: TimeFrame = TimeFrame.WEEKLY,
  latestDate: string | null,
): CategoryLeaderboardResponse {
  if (!latestDate || records.length === 0) {
    return {
      latestPeriod: "",
      rankedCategories: [],
    };
  }

  const latestPeriod = getPerformancePeriodKey(latestDate, timeFrame);

  const categoryMap: Record<
    string,
    Record<string, { itemName: string; yieldValue: number }>
  > = {};

  records.forEach((record) => {
    const item = record.item;
    if (!item || !item.category) return;
    const catName = item.category.name;
    if (!categoryMap[catName]) {
      categoryMap[catName] = {};
    }
    const val =
      timeFrame === TimeFrame.YTD
        ? (record.yieldYtd ?? 0)
        : (record.yield1d ?? 0);

    if (!categoryMap[catName][item.id]) {
      categoryMap[catName][item.id] = {
        itemName: item.name,
        yieldValue: val,
      };
    } else if (timeFrame !== TimeFrame.YTD) {
      categoryMap[catName][item.id].yieldValue += val;
    }
  });

  const rankedCategories: RankedPerformanceCategory[] = Object.entries(
    categoryMap,
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([catName, items]) => {
      const rankedItems = Object.entries(items)
        .map(([itemId, { itemName, yieldValue }]) => ({
          itemId,
          itemName,
          yieldValue,
        }))
        .sort((a, b) => b.yieldValue - a.yieldValue)
        .map((item, idx) => ({
          ...item,
          rank: idx + 1,
        }));

      return {
        categoryName: catName,
        rankedItems,
      };
    })
    .filter((c) => c.rankedItems.length > 0);

  return {
    latestPeriod,
    rankedCategories,
  };
}

/**
 * Legacy matrix selector for Top Performers (from PerformanceData)
 */
export function getTopPerformers(
  data: PerformanceData,
  timePeriods: string[],
): TopPerformersResponse | null {
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

/**
 * Legacy matrix selector for Category Leaderboard (from PerformanceData)
 */
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
