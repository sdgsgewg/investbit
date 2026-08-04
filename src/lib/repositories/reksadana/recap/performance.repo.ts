import { createClient } from "@/utils/supabase/server";
import { format, startOfMonth } from "date-fns";
import { RecordData } from "@/types/reksadana/records/RecordData";
import {
  PerformanceFilter,
  PerformanceResponse,
} from "@/types/reksadana/performance";
import {
  PerformanceData,
  PerformanceItem,
} from "@/types/reksadana/performance/DataType";
import { TimeFrameType } from "@/enums/TimeFrameType";

async function getSupabase() {
  return createClient();
}

type GroupedType = Record<
  string,
  {
    categoryName: string;
    items: Record<string, PerformanceItem>;
  }
>;

type CategoryStats = Record<
  string,
  Record<
    string,
    {
      min: number;
      max: number;
    }
  >
>;

export async function getPerformanceRepo(
  params: PerformanceFilter,
): Promise<PerformanceResponse> {
  const supabase = await getSupabase();

  const records: RecordData[] = [];
  let hasMore = true;
  let offset = 0;
  const PAGE_SIZE = 1000;

  while (hasMore) {
    let query = supabase
      .from("rd_records")
      .select(
        `
        id,
        item_id,
        date,
        yield_1d,
        yield_ytd,
        rd_items (
          id,
          name,
          category_id,
          rd_categories (
            id,
            name
          )
        )
      `,
      )
      .order("date")
      .range(offset, offset + PAGE_SIZE - 1);

    if (params.categoryId) {
      query = query.eq("rd_items.category_id", params.categoryId);
    }

    const { data: queryData, error } = await query;

    if (error) throw error;

    if (queryData && queryData.length > 0) {
      records.push(...(queryData as unknown as RecordData[]));
      if (queryData.length < PAGE_SIZE) {
        hasMore = false;
      } else {
        offset += PAGE_SIZE;
      }
    } else {
      hasMore = false;
    }
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const getMonthWeeks = (year: number, month: number) => {
    const current = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let week = 1;
    let currentWeekStart: Date | null = null;
    let currentWeekEnd: Date | null = null;

    const weeks: Record<number, { start: Date; end: Date }> = {};

    while (current <= lastDay) {
      if (!isWeekend(current)) {
        const day = current.getDay();

        if (day === 1 && current.getDate() !== 1) {
          if (!currentWeekStart) {
            currentWeekStart = new Date(current);
          } else {
            week++;
            currentWeekStart = new Date(current);
          }
        } else if (!currentWeekStart) {
          currentWeekStart = new Date(current);
        }

        currentWeekEnd = new Date(current);
        weeks[week] = { start: currentWeekStart, end: currentWeekEnd };
      }

      current.setDate(current.getDate() + 1);
    }

    return weeks;
  };

  const getWeekInfo = (dateStr: string) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth();
    const weeks = getMonthWeeks(year, month);

    const current = new Date(year, month, 1);
    let targetWeek = 1;
    let seenValidDay = false;

    while (current <= d) {
      if (!isWeekend(current)) {
        const day = current.getDay();
        if (day === 1 && current.getDate() !== 1 && seenValidDay) {
          targetWeek++;
        }
        seenValidDay = true;
      }
      current.setDate(current.getDate() + 1);
    }

    return {
      week: targetWeek,
      start: weeks[targetWeek]?.start,
      end: weeks[targetWeek]?.end,
    };
  };

  const getWeekKey = (dateStr: string) => {
    const d = new Date(dateStr);
    const month = format(d, "yyyy-MM");

    const { week, start, end } = getWeekInfo(dateStr);

    if (!start || !end) return "";

    const range = `${format(start, "d")}-${format(end, "d MMM")}`;

    return `${month}-W${week}|${range}`;
  };

  const parseKeyDate = (key: string) => {
    if (params.timeFrame === TimeFrameType.WEEKLY) {
      const [yearMonth, weekPart] = key.split("-W");
      const [weekStr] = weekPart.split("|");
      return new Date(`${yearMonth}-01`).getTime() + Number(weekStr) * 1000;
    }

    if (
      params.timeFrame === TimeFrameType.YTD ||
      params.timeFrame === TimeFrameType.YEARLY
    ) {
      return new Date(Number(key), 0, 1).getTime();
    }

    return new Date(key).getTime();
  };

  const grouped: GroupedType = {};
  const timeSet = new Set<string>();

  records.forEach((record) => {
    const item = record.rd_items;

    if (!item || !item.rd_categories || !record.date) return;

    const categoryName = item.rd_categories.name;

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

    let periodKey = "";

    switch (params.timeFrame) {
      case TimeFrameType.DAILY:
        periodKey = record.date;
        break;
      case TimeFrameType.WEEKLY:
        periodKey = getWeekKey(record.date);
        break;
      case TimeFrameType.MONTHLY:
        periodKey = format(startOfMonth(new Date(record.date)), "yyyy-MM-dd");
        break;
      case TimeFrameType.YTD:
      case TimeFrameType.YEARLY:
        periodKey = record.date.substring(0, 4);
        break;
    }

    if (!periodKey || periodKey === "Invalid Date") return;

    timeSet.add(periodKey);

    const yields = grouped[categoryName].items[item.id].yields;

    if (params.timeFrame === TimeFrameType.YTD) {
      // Records are sorted ascending by date, so the last assignment per year
      // becomes the latest available YTD value for that item.
      yields[periodKey] = record.yield_ytd ?? 0;
      return;
    }

    const value = record.yield_1d ?? 0;
    const existingValue = yields[periodKey] ?? 0;

    yields[periodKey] =
      params.timeFrame === TimeFrameType.DAILY ? value : existingValue + value;
  });

  const availablePeriods = Array.from(timeSet).sort(
    (a, b) => parseKeyDate(a) - parseKeyDate(b),
  );

  const isRangeMode = Boolean(params.startPeriod || params.endPeriod);

  const effectiveStartPeriod = params.startPeriod || availablePeriods[0] || "";

  const effectiveEndPeriod =
    params.endPeriod || availablePeriods[availablePeriods.length - 1] || "";

  let timePeriods = availablePeriods;

  if (isRangeMode && effectiveStartPeriod && effectiveEndPeriod) {
    const startTimestamp = parseKeyDate(effectiveStartPeriod);
    const endTimestamp = parseKeyDate(effectiveEndPeriod);
    const rangeStart = Math.min(startTimestamp, endTimestamp);
    const rangeEnd = Math.max(startTimestamp, endTimestamp);

    timePeriods = availablePeriods.filter((period) => {
      const timestamp = parseKeyDate(period);
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
