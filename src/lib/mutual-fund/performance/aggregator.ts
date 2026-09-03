import { TimeFrame } from "@/enums/TimeFrame";
import {
  CategoryStats,
  PerformanceData,
  PerformanceFilter,
  PerformanceItem,
  PerformanceResponse,
} from "@/types/mutual-fund/performance";
import { RecordListItem } from "@/types/mutual-fund/records";
import {
  getPerformancePeriodKey,
  getPeriodTimestamp,
} from "./period";

type GroupedCategory = {
  categoryName: string;
  items: Record<string, PerformanceItem>;
};

export function aggregatePerformanceRecords(
  records: RecordListItem[],
  params: PerformanceFilter,
): PerformanceResponse {
  const timeFrame = params.timeFrame ?? TimeFrame.WEEKLY;
  const grouped: Record<string, GroupedCategory> = {};
  const timeSet = new Set<string>();

  records.forEach((record) => {
    const item = record.item;

    if (!item || !item.category || !record.date) return;

    const categoryName = item.category.name;

    if (!grouped[categoryName]) {
      grouped[categoryName] = { categoryName, items: {} };
    }

    if (!grouped[categoryName].items[item.id]) {
      grouped[categoryName].items[item.id] = {
        itemId: item.id,
        itemName: item.name,
        yields: {},
      };
    }

    const periodKey = getPerformancePeriodKey(record.date, timeFrame);

    if (!periodKey || periodKey === "Invalid Date") return;

    timeSet.add(periodKey);

    const yields = grouped[categoryName].items[item.id].yields;

    if (timeFrame === TimeFrame.YTD) {
      // Records are sorted ascending by date, so the last assignment per year
      // becomes the latest available YTD value for that item.
      yields[periodKey] = record.yieldYtd ?? 0;
      return;
    }

    const value = record.yield1d ?? 0;
    const existingValue = yields[periodKey] ?? 0;

    yields[periodKey] =
      timeFrame === TimeFrame.DAILY ? value : existingValue + value;
  });

  const availablePeriods = Array.from(timeSet).sort(
    (a, b) =>
      getPeriodTimestamp(a, timeFrame) - getPeriodTimestamp(b, timeFrame),
  );

  const isRangeMode = Boolean(params.startPeriod || params.endPeriod);

  const effectiveStartPeriod =
    params.startPeriod || availablePeriods[0] || "";

  const effectiveEndPeriod =
    params.endPeriod || availablePeriods[availablePeriods.length - 1] || "";

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

      categoryStats[category.categoryName] = {};

      timePeriods.forEach((period) => {
        const values = items
          .map((item) => item.yields[period])
          .filter((value): value is number => value !== undefined);

        if (values.length > 0) {
          categoryStats[category.categoryName][period] = {
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
