import { TimeFrame } from "@/enums/TimeFrame";
import {
  CategoryStats,
  PerformanceData,
  PerformanceFilter,
  PerformanceItem,
  PerformanceAnalyticsResponse,
} from "@/types/mutual-fund/performance";
import { RecordListItem } from "@/types/mutual-fund/records";
import { getPerformancePeriodKey, getPeriodTimestamp } from "./period";

// --- Performance Aggregator for Top Performer and Category Leaderboard ---

type AggregatedPerformanceItem = {
  itemName: string;
  yieldValue: number;
};

type PerformanceCategoryMap = Record<
  string,
  Record<string, AggregatedPerformanceItem>
>;

/**
 * Aggregates raw performance records by category and mutual fund item.
 *
 * YTD records already contain an accumulated year-to-date value, so only
 * the first value is kept. Other timeframes accumulate daily yields for
 * the same mutual fund item.
 */
export function aggregatePerformanceRecordsByItem(
  records: RecordListItem[],
  timeFrame: TimeFrame,
): PerformanceCategoryMap {
  // Group records by category and then by mutual fund item.
  // Each item stores its accumulated performance value for the period.
  const categoryMap: PerformanceCategoryMap = {};

  records.forEach((record) => {
    const item = record.item;

    // Ignore records that cannot be associated with a category or item.
    if (!item || !item.category) return;

    const categoryName = item.category.name;

    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = {};
    }

    // YTD already represents the accumulated year-to-date value,
    // while other timeframes use the daily yield as the value to aggregate.
    const yieldValue =
      timeFrame === TimeFrame.YTD
        ? (record.yieldYtd ?? 0)
        : (record.yield1d ?? 0);

    const existingItem = categoryMap[categoryName][item.id];

    if (!existingItem) {
      categoryMap[categoryName][item.id] = {
        itemName: item.name,
        yieldValue,
      };
      return;
    }

    if (timeFrame !== TimeFrame.YTD) {
      // For non-YTD timeframes, accumulate daily yields belonging
      // to the same item and period.
      existingItem.yieldValue += yieldValue;
    }
  });

  return categoryMap;
}

// --- Performance Analytics Table Aggregator ---

type GroupedCategory = {
  categoryName: string;
  items: Record<string, PerformanceItem>;
};

/**
 * Aggregates raw performance records for analytics table
 *
 * @param records
 * @param params
 * @returns
 */
export function aggregatePerformanceRecords(
  records: RecordListItem[],
  params: PerformanceFilter,
): PerformanceAnalyticsResponse {
  const timeFrame = params.timeFrame ?? TimeFrame.WEEKLY;

  // Group records by category and then by mutual fund item.
  const grouped: Record<string, GroupedCategory> = {};

  // Tracks every period that exists in the source records.
  const timeSet = new Set<string>();

  records.forEach((record) => {
    const item = record.item;

    // Ignore incomplete records that cannot be associated with a category,
    // item, or valid date.
    if (!item || !item.category || !record.date) return;

    const categoryName = item.category.name;

    // Create the category group when it does not exist yet.
    if (!grouped[categoryName]) {
      grouped[categoryName] = { categoryName, items: {} };
    }

    // Create the item entry inside its category when needed.
    if (!grouped[categoryName].items[item.id]) {
      grouped[categoryName].items[item.id] = {
        itemId: item.id,
        itemName: item.name,
        yields: {},
      };
    }

    // Convert the record date into the appropriate analytics period,
    // such as a day, week, or year depending on the selected timeframe.
    const periodKey = getPerformancePeriodKey(record.date, timeFrame);

    if (!periodKey || periodKey === "Invalid Date") return;

    // Keep track of every period found in the source data.
    timeSet.add(periodKey);

    const yields = grouped[categoryName].items[item.id].yields;

    if (timeFrame === TimeFrame.YTD) {
      // Records are processed in ascending date order, so assigning the
      // value repeatedly leaves the latest available YTD value for the year.
      yields[periodKey] = record.yieldYtd ?? 0;
      return;
    }

    // Daily uses the record's daily yield directly, while other timeframes
    // accumulate daily yields belonging to the same period.
    const value = record.yield1d ?? 0;
    const existingValue = yields[periodKey] ?? 0;

    yields[periodKey] =
      timeFrame === TimeFrame.DAILY ? value : existingValue + value;
  });

  // Convert the Set into a chronologically sorted list of available periods.
  const availablePeriods = Array.from(timeSet).sort(
    (a, b) =>
      getPeriodTimestamp(a, timeFrame) - getPeriodTimestamp(b, timeFrame),
  );

  // Range mode is enabled when either boundary is explicitly provided.
  const isRangeMode = Boolean(params.startPeriod || params.endPeriod);

  // If a boundary is not provided, use the earliest/latest available period
  // as the effective boundary.
  const effectiveStartPeriod = params.startPeriod || availablePeriods[0] || "";

  const effectiveEndPeriod =
    params.endPeriod || availablePeriods[availablePeriods.length - 1] || "";

  let timePeriods = availablePeriods;

  if (isRangeMode && effectiveStartPeriod && effectiveEndPeriod) {
    const startTimestamp = getPeriodTimestamp(effectiveStartPeriod, timeFrame);
    const endTimestamp = getPeriodTimestamp(effectiveEndPeriod, timeFrame);

    // Normalize the boundaries so the range works even when the user
    // provides the end period before the start period.
    const rangeStart = Math.min(startTimestamp, endTimestamp);
    const rangeEnd = Math.max(startTimestamp, endTimestamp);

    // Keep only periods that fall within the requested range.
    timePeriods = availablePeriods.filter((period) => {
      const timestamp = getPeriodTimestamp(period, timeFrame);
      return timestamp >= rangeStart && timestamp <= rangeEnd;
    });
  } else if (params.periodLimit && params.periodLimit > 0) {
    // When no explicit range is requested, limit the result to the
    // most recent N periods.
    timePeriods = availablePeriods.slice(-params.periodLimit);
  }

  // Indicates whether older periods exist beyond the currently displayed
  // period limit. This is used by the UI for loading older data.
  const hasMoreOlder =
    !isRangeMode &&
    availablePeriods.length > 0 &&
    timePeriods.length < availablePeriods.length;

  const categoryStats: CategoryStats = {};

  const data: PerformanceData = Object.values(grouped)
    .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
    .map((category) => {
      const items = Object.values(category.items).sort((a, b) =>
        a.itemName.localeCompare(b.itemName),
      );

      categoryStats[category.categoryName] = {};

      timePeriods.forEach((period) => {
        // Collect only items that have a yield for the current period.
        const values = items
          .map((item) => item.yields[period])
          .filter((value): value is number => value !== undefined);

        if (values.length > 0) {
          // Calculate the minimum and maximum yield within the category
          // for the current period.
          categoryStats[category.categoryName][period] = {
            min: Math.min(...values),
            max: Math.max(...values),
          };
        }
      });

      const cleanedItems = items.map((item) => {
        const filteredYields: Record<string, number> = {};

        // Return only yields belonging to the periods currently requested.
        timePeriods.forEach((period) => {
          const value = item.yields[period];

          if (value !== undefined) {
            filteredYields[period] = value;
          }
        });

        return {
          itemId: item.itemId,
          itemName: item.itemName,
          yields: filteredYields,
        };
      });

      return {
        categoryName: category.categoryName,
        items: cleanedItems,
      };
    });

  return {
    data,
    timePeriods,
    availablePeriods,
    categoryStats,
    hasMoreOlder,
  };
}
