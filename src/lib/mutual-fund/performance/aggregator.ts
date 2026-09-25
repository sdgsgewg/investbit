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
 * Builds the Top Performers / Leaderboard values for the latest period.
 *
 * We scan the complete NAV history in date order so the first NAV inside the
 * latest period can be compared with the last NAV before that period. Only
 * rows in `latestPeriod` contribute to the output; older rows only establish
 * each fund's previous NAV.
 *
 * Example (latest period is the week containing Jan 6 and Jan 7):
 *   Jan 3 NAV 100  -> baseline only
 *   Jan 6 NAV 101  -> (101 - 100) / 100 * 100 = +1%
 *   Jan 7 NAV 100.5 -> (100.5 - 101) / 101 * 100 ~= -0.49505%
 *   weekly output  -> (1.01 * 100.5 / 101 - 1) * 100 = +0.5%
 *
 * `previousNavByItem` keeps each fund's last valid NAV independently. Missing,
 * zero, negative, or non-finite NAVs are ignored and do not replace the
 * previous valid NAV. Daily changes are compounded so the period result is
 * equivalent to (last NAV / NAV before period - 1) * 100.
 */
export function aggregatePerformanceRecordsByItem(
  records: RecordListItem[],
  timeFrame: TimeFrame,
  latestDate?: string | null,
): PerformanceCategoryMap {
  const categoryMap: PerformanceCategoryMap = {};
  const latestPeriod = latestDate
    ? getPerformancePeriodKey(latestDate, timeFrame)
    : null;
  const previousNavByItem = new Map<string, number>();

  [...records]
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((record) => {
      const item = record.item;

      // Ignore records that cannot be associated with a category or item.
      if (!item || !item.category) return;

      const categoryName = item.category.name;

      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = {};
      }

      const nav = record.nav1d;
      if (nav === null || !Number.isFinite(nav) || nav <= 0) return;
      const previousNav = previousNavByItem.get(item.id);
      // Update the baseline even for older periods, before filtering, so the
      // first latest-period row has the correct NAV to compare against.
      previousNavByItem.set(item.id, nav);

      const periodKey = getPerformancePeriodKey(record.date, timeFrame);
      if (latestPeriod && periodKey !== latestPeriod) return;

      // Without an earlier valid NAV there is no return to calculate. Do not
      // add this item to the leaderboard as a fabricated 0% performer.
      if (previousNav === undefined || previousNav <= 0) return;

      const yieldValue = ((nav - previousNav) / previousNav) * 100;

      const existingItem = categoryMap[categoryName][item.id];

      if (!existingItem) {
        categoryMap[categoryName][item.id] = {
          itemName: item.name,
          yieldValue,
        };
        return;
      }

      // Multiply growth factors instead of adding percentages. For example,
      // +10% followed by -10% produces -1%, not 0%.
      existingItem.yieldValue =
        ((1 + existingItem.yieldValue / 100) * (1 + yieldValue / 100) - 1) *
        100;
    });

  return categoryMap;
}

// --- Performance Analytics Table Aggregator ---

type GroupedCategory = {
  categoryName: string;
  items: Record<string, PerformanceItem>;
};

/**
 * Converts the NAV history into a per-fund return for each selected period.
 * Records must be ordered by date (the repository returns them that way).
 * The first observed NAV for each fund establishes its baseline and therefore
 * has no return. Each later NAV contributes `(current / previous - 1) * 100`.
 * Contributions are compounded within their timeframe bucket.
 *
 * Example: NAV 100, 101, 100.5 within one week yields daily changes of +1%
 * and about -0.49505%; the weekly bucket becomes +0.5%.
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
  const previousNavByItem = new Map<string, number>();

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

    const nav = record.nav1d;
    // Invalid NAV data cannot produce a meaningful return and must not become
    // the baseline for the next observation.
    if (nav === null || !Number.isFinite(nav) || nav <= 0) return;
    const itemKey = item.id;
    const previousNav = previousNavByItem.get(itemKey);
    previousNavByItem.set(itemKey, nav);
    // The first valid observation only initializes the item's baseline.
    if (previousNav === undefined || previousNav <= 0) return;

    // This is the NAV growth factor for this record (for example, 1.01 means +1%).
    const dailyReturn = nav / previousNav;
    const existingValue = yields[periodKey];

    // Keep the first daily change as the period return. For later records,
    // apply the new change to the return already stored for this period.
    // Example: +1% followed by -0.5% gives +0.495% for the period.
    yields[periodKey] =
      existingValue === undefined
        ? (dailyReturn - 1) * 100
        : ((1 + existingValue / 100) * dailyReturn - 1) * 100;
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
