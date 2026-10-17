import {
  CategoryLeaderboardResponse,
  PerformanceLeaderboardItem,
  PerformanceWinner,
  RankedPerformanceCategory,
  TopPerformersResponse,
} from "@/types/mutual-fund/performance";

/**
 * Computes top performers from precomputed SQL leaderboard items.
 *
 * @param items List of precomputed items from get_performance_leaderboard RPC.
 * @param latestPeriod Formatted period label for the period.
 * @returns Overall and category-level top performers.
 */
export function computeTopPerformers(
  items: PerformanceLeaderboardItem[],
  latestPeriod: string,
): TopPerformersResponse {
  if (!latestPeriod || items.length === 0) {
    return {
      latestPeriod: latestPeriod || "",
      overallBest: null,
      categoryBests: [],
    };
  }

  let overallBest: PerformanceWinner | null = null;
  const categoryBestsMap = new Map<string, PerformanceWinner>();

  for (const item of items) {
    const winner: PerformanceWinner = {
      name: item.itemName,
      category: item.categoryName,
      yieldValue: item.yieldValue,
    };

    if (!overallBest || winner.yieldValue > overallBest.yieldValue) {
      overallBest = winner;
    }

    const currentCategoryBest = categoryBestsMap.get(item.categoryName);
    if (
      !currentCategoryBest ||
      winner.yieldValue > currentCategoryBest.yieldValue
    ) {
      categoryBestsMap.set(item.categoryName, winner);
    }
  }

  return {
    latestPeriod,
    overallBest,
    categoryBests: Array.from(categoryBestsMap.values()),
  };
}

/**
 * Computes ranked category leaderboard from precomputed SQL leaderboard items.
 *
 * @param items List of precomputed items from get_performance_leaderboard RPC.
 * @param latestPeriod Formatted period label for the period.
 * @returns Ranked mutual fund items grouped by category.
 */
export function computeCategoryLeaderboard(
  items: PerformanceLeaderboardItem[],
  latestPeriod: string,
): CategoryLeaderboardResponse {
  if (!latestPeriod || items.length === 0) {
    return {
      latestPeriod: latestPeriod || "",
      rankedCategories: [],
    };
  }

  const categoryMap = new Map<string, PerformanceLeaderboardItem[]>();

  for (const item of items) {
    let group = categoryMap.get(item.categoryName);
    if (!group) {
      group = [];
      categoryMap.set(item.categoryName, group);
    }
    group.push(item);
  }

  const rankedCategories: RankedPerformanceCategory[] = Array.from(
    categoryMap.entries(),
  )
    .map(([categoryName, groupItems]) => {
      const rankedItems = groupItems.slice().map((item, index) => ({
        itemId: item.itemId,
        itemName: item.itemName,
        yieldValue: item.yieldValue,
        rank: index + 1,
      }));

      return {
        categoryName,
        rankedItems,
      };
    })
    .filter((category) => category.rankedItems.length > 0);

  return {
    latestPeriod,
    rankedCategories,
  };
}
