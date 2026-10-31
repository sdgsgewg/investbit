import { TimeFrame } from "@/enums/TimeFrame";
import {
  CategoryStats,
  PerformanceData,
  PerformanceItem,
  PerformanceAnalyticsResponse,
  PerformanceAnalyticsFilter,
  PerformanceAnalyticsMatrixRow,
} from "@/types/mutual-fund/performance";
import { getPeriodTimestamp } from "./period";
import { isValidNav } from "../utils/nav.utils";

type GroupedCategory = {
  categoryId: string;
  categoryName: string;
  items: Record<string, PerformanceItem>;
};

/**
 * Calculates the return between an exact baseline NAV and end NAV.
 *
 * Returns undefined when either NAV is missing or invalid.
 */
function calculatePeriodReturn(
  baselineNav: number | null,
  endNav: number | null,
): number | undefined {
  if (
    baselineNav === null ||
    endNav === null ||
    !isValidNav(baselineNav) ||
    !isValidNav(endNav)
  ) {
    return undefined;
  }

  return (endNav / baselineNav - 1) * 100;
}

/**
 * Aggregates period-based NAV records into the analytics response.
 *
 * Every period is calculated independently using its exact baseline
 * and end NAV. No previous NAV is carried over between periods.
 */
export function aggregatePerformanceAnalyticsRecords(
  records: PerformanceAnalyticsMatrixRow[],
  params: PerformanceAnalyticsFilter,
): PerformanceAnalyticsResponse {
  const timeFrame = params.timeFrame ?? TimeFrame.WEEKLY;

  const grouped: Record<string, GroupedCategory> = {};
  const timeSet = new Set<string>();

  records.forEach((record) => {
    const {
      itemId,
      itemName,
      categoryId,
      categoryName,
      period,
      baselineNav,
      endNav,
    } = record;

    if (!itemId || !categoryId || !period) return;

    // A period is available when it exists in the SQL result,
    // even if a particular item's NAV is missing.
    timeSet.add(period);

    if (!grouped[categoryId]) {
      grouped[categoryId] = {
        categoryId,
        categoryName,
        items: {},
      };
    }

    if (!grouped[categoryId].items[itemId]) {
      grouped[categoryId].items[itemId] = {
        itemId,
        itemName,
        yields: {},
      };
    }

    const periodReturn = calculatePeriodReturn(baselineNav, endNav);

    // Missing or invalid NAV means no yield for this item and period.
    if (periodReturn === undefined) return;

    grouped[categoryId].items[itemId].yields[period] = periodReturn;
  });

  const availablePeriods = Array.from(timeSet).sort(
    (a, b) =>
      getPeriodTimestamp(a, timeFrame) - getPeriodTimestamp(b, timeFrame),
  );

  const isRangeMode = Boolean(params.startPeriod || params.endPeriod);

  const effectiveStartPeriod = params.startPeriod ?? availablePeriods[0] ?? "";

  const effectiveEndPeriod =
    params.endPeriod ?? availablePeriods[availablePeriods.length - 1] ?? "";

  let timePeriods = availablePeriods;

  if (isRangeMode && effectiveStartPeriod && effectiveEndPeriod) {
    const startTimestamp = getPeriodTimestamp(effectiveStartPeriod, timeFrame);

    const endTimestamp = getPeriodTimestamp(effectiveEndPeriod, timeFrame);

    const rangeStart = Math.min(startTimestamp, endTimestamp);
    const rangeEnd = Math.max(startTimestamp, endTimestamp);

    timePeriods = availablePeriods.filter((period) => {
      const timestamp = getPeriodTimestamp(period, timeFrame);

      return timestamp >= rangeStart && timestamp <= rangeEnd;
    });
  } else if (params.periodLimit && params.periodLimit > 0) {
    timePeriods = availablePeriods.slice(-params.periodLimit);
  }

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

      categoryStats[category.categoryId] = {};

      timePeriods.forEach((period) => {
        const values = items
          .map((item) => item.yields[period])
          .filter((value): value is number => value !== undefined);

        if (values.length > 0) {
          categoryStats[category.categoryId][period] = {
            min: Math.min(...values),
            max: Math.max(...values),
          };
        }
      });

      const cleanedItems = items.map((item) => {
        const filteredYields: Record<string, number> = {};

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
        categoryId: category.categoryId,
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
