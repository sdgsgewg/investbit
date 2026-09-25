import {
  CategoryLeaderboardResponse,
  PerformanceWinner,
  RankedPerformanceCategory,
  TopPerformersResponse,
} from "@/types/mutual-fund/performance";
import { RecordListItem } from "@/types/mutual-fund/records";
import { TimeFrame } from "@/enums/TimeFrame";
import { getPerformancePeriodKey } from "./period";
import { aggregatePerformanceRecordsByItem } from "./aggregator";

/**
 * Computes the top-performing mutual funds from raw performance records
 * belonging to the latest available period.
 *
 * Records are grouped by category and mutual fund item before determining
 * the best performer for each category and the overall best performer.
 *
 * @param records Raw performance records used for the calculation.
 * @param timeFrame Timeframe used to calculate the performance.
 * @param latestDate Latest available record date.
 * @returns Overall and category-level top performers.
 */
export function computeTopPerformersFromRecords(
  records: RecordListItem[],
  timeFrame: TimeFrame = TimeFrame.WEEKLY,
  latestDate: string | null,
): TopPerformersResponse {
  // Return an empty response when there is no valid period to calculate.
  if (!latestDate || records.length === 0) {
    return {
      latestPeriod: "",
      overallBest: null,
      categoryBests: [],
    };
  }

  // Convert the latest record date into the period key used by the analytics.
  const latestPeriod = getPerformancePeriodKey(latestDate, timeFrame);

  const categoryMap = aggregatePerformanceRecordsByItem(
    records,
    timeFrame,
    latestDate,
  );

  let overallBest: PerformanceWinner | null = null;
  const categoryBests: PerformanceWinner[] = [];

  Object.entries(categoryMap).forEach(([categoryName, items]) => {
    let bestInCategory: PerformanceWinner | null = null;

    Object.values(items).forEach(({ itemName, yieldValue }) => {
      const winner: PerformanceWinner = {
        name: itemName,
        category: categoryName,
        yieldValue,
      };

      // Keep the highest-performing item within the current category.
      if (!bestInCategory || yieldValue > bestInCategory.yieldValue) {
        bestInCategory = winner;
      }

      // Keep the highest-performing item across all categories.
      if (!overallBest || yieldValue > overallBest.yieldValue) {
        overallBest = winner;
      }
    });

    if (bestInCategory) {
      categoryBests.push(bestInCategory);
    }
  });

  return {
    latestPeriod,
    overallBest,
    categoryBests,
  };
}

/**
 * Computes a leaderboard of mutual fund items grouped by category
 * using raw performance records from the latest available period.
 *
 * Each category is sorted alphabetically, while items within each category
 * are ranked by their calculated performance in descending order.
 *
 * @param records Raw performance records used for the leaderboard.
 * @param timeFrame Timeframe used to calculate the performance.
 * @param latestDate Latest available record date.
 * @returns Ranked mutual fund items grouped by category.
 */
export function computeCategoryLeaderboardFromRecords(
  records: RecordListItem[],
  timeFrame: TimeFrame = TimeFrame.WEEKLY,
  latestDate: string | null,
): CategoryLeaderboardResponse {
  // Return an empty leaderboard when there is no valid period to calculate.
  if (!latestDate || records.length === 0) {
    return {
      latestPeriod: "",
      rankedCategories: [],
    };
  }

  // Convert the latest record date into the period key used by the leaderboard.
  const latestPeriod = getPerformancePeriodKey(latestDate, timeFrame);

  const categoryMap = aggregatePerformanceRecordsByItem(
    records,
    timeFrame,
    latestDate,
  );

  const rankedCategories: RankedPerformanceCategory[] = Object.entries(
    categoryMap,
  )
    // Keep category ordering deterministic for the UI.
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([categoryName, items]) => {
      const rankedItems = Object.entries(items)
        .map(([itemId, { itemName, yieldValue }]) => ({
          itemId,
          itemName,
          yieldValue,
        }))
        // Highest-performing items receive the smallest rank number.
        .sort((a, b) => b.yieldValue - a.yieldValue)
        .map((item, index) => ({
          ...item,
          rank: index + 1,
        }));

      return {
        categoryName,
        rankedItems,
      };
    })
    // Exclude categories that ended up without any valid ranked items.
    .filter((category) => category.rankedItems.length > 0);

  return {
    latestPeriod,
    rankedCategories,
  };
}
