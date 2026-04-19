import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import {
  format,
  startOfMonth,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  formatISO,
} from "date-fns";
import { TimeFrameType } from "@/features/reksadana/recap/performance/types/TimeFrameType";
import { getPerformanceKey } from "@/lib/utils/reksadana/recap/performance";
import { RecordData } from "@/types/reksadana/records/RecordData";

type GroupedType = Record<
  string,
  {
    categoryName: string;
    items: Record<
      string,
      {
        itemId: string;
        itemName: string;
      } & Record<string, Record<string, number>>
    >;
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

export async function getPerformanceRepo(params: {
  timeFrame: TimeFrameType;
  categoryId?: string;
  periodLimit?: number;
}) {
  const supabase = createClient(await cookies());

  let startDate: Date | null = null;
  const now = new Date();

  if (params.periodLimit && params.periodLimit > 0) {
    switch (params.timeFrame) {
      case "daily":
        startDate = subDays(now, Math.ceil(params.periodLimit * 1.5));
        break;
      case "weekly":
        startDate = subWeeks(now, Math.ceil(params.periodLimit * 1.5));
        break;
      case "monthly":
        startDate = subMonths(now, params.periodLimit + 1);
        break;
      case "ytd":
        startDate = new Date(now.getFullYear() - params.periodLimit, 0, 1);
        break;
      case "yearly":
        startDate = subYears(now, params.periodLimit + 1);
        break;
    }
  }

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

    if (startDate) {
      query = query
        .gte("date", formatISO(startDate, { representation: "date" }))
        .lte("date", formatISO(now, { representation: "date" }));
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

  // helper
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
        if (day === 1 && current.getDate() !== 1) {
          if (seenValidDay) {
            targetWeek++;
          }
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

    const range = `${format(start, "d")}–${format(end, "d MMM")}`;

    return `${month}-W${week}|${range}`;
  };

  const grouped: GroupedType = {};

  const timeSet = new Set<string>();

  const keyName = getPerformanceKey(params.timeFrame);

  records.forEach((r) => {
    const item = r.rd_items;
    if (!item || !item.rd_categories) return;

    const cat = item.rd_categories.name;

    if (!grouped[cat]) {
      grouped[cat] = { categoryName: cat, items: {} };
    }

    if (!grouped[cat].items[item.id]) {
      grouped[cat].items[item.id] = {
        itemId: item.id,
        itemName: item.name,
        [keyName]: {} as Record<string, number>,
      } as { itemId: string; itemName: string } & Record<
        string,
        Record<string, number>
      >;
    }

    let key = "";
    if (!r.date) return;

    switch (params.timeFrame) {
      case "daily":
        key = r.date;
        break;
      case "weekly":
        key = getWeekKey(r.date);
        break;
      case "monthly":
        key = format(startOfMonth(new Date(r.date)), "yyyy-MM-dd");
        break;
      case "ytd":
      case "yearly":
        key = r.date ? r.date.substring(0, 4) : "";
        break;
    }

    if (!key || key === "Invalid Date") return;

    timeSet.add(key);

    const val = r.yield_1d || 0;

    const container = grouped[cat].items[item.id][keyName];
    const existing = container[key] || 0;

    container[key] = params.timeFrame === "daily" ? val : existing + val;
  });

  const parseKeyDate = (key: string) => {
    if (params.timeFrame === "weekly") {
      const [yearMonth, weekPart] = key.split("-W");
      const [weekStr] = weekPart.split("|");
      return new Date(`${yearMonth}-01`).getTime() + Number(weekStr) * 1000;
    }

    return new Date(key).getTime();
  };

  const getPeriodStartDate = (period: string) => {
    if (params.timeFrame === "daily") {
      const date = new Date(period);
      return isNaN(date.getTime()) ? null : date;
    }

    if (params.timeFrame === "weekly") {
      const [yearMonth, weekPart] = period.split("-W");
      const [weekStr] = weekPart.split("|");
      const [year, month] = yearMonth.split("-");
      const weeks = getMonthWeeks(Number(year), Number(month) - 1);

      return weeks[Number(weekStr)]?.start ?? null;
    }

    if (params.timeFrame === "monthly") {
      const date = startOfMonth(new Date(period));
      return isNaN(date.getTime()) ? null : date;
    }

    if (params.timeFrame === "ytd" || params.timeFrame === "yearly") {
      const year = Number(period);
      if (isNaN(year)) return null;

      return new Date(year, 0, 1);
    }

    return null;
  };

  let timePeriods = Array.from(timeSet).sort(
    (a, b) => parseKeyDate(a) - parseKeyDate(b),
  );

  if (params.periodLimit && params.periodLimit > 0) {
    timePeriods = timePeriods.slice(-params.periodLimit);
  }

  let hasMoreOlder = false;
  const oldestVisiblePeriod = timePeriods[0];
  const oldestVisiblePeriodStart = oldestVisiblePeriod
    ? getPeriodStartDate(oldestVisiblePeriod)
    : null;

  if (oldestVisiblePeriodStart) {
    let olderDataQuery = supabase
      .from("rd_records")
      .select(
        `
        id,
        date,
        rd_items (
          category_id
        )
      `,
      )
      .lt("date", formatISO(oldestVisiblePeriodStart, { representation: "date" }))
      .order("date", { ascending: false })
      .limit(1);

    if (params.categoryId) {
      olderDataQuery = olderDataQuery.eq("rd_items.category_id", params.categoryId);
    }

    const { data: olderData, error: olderDataError } = await olderDataQuery;

    if (olderDataError) throw olderDataError;

    hasMoreOlder = (olderData?.length ?? 0) > 0;
  }

  // stats
  const categoryStats: CategoryStats = {};

  const data = Object.values(grouped)
    .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
    .map((cat) => {
      const items = Object.values(cat.items).sort((a, b) =>
        a.itemName.localeCompare(b.itemName),
      );

      categoryStats[cat.categoryName] = {};

      timePeriods.forEach((t) => {
        const vals = items
          .map((i) => i[keyName as keyof typeof i]?.[t])
          .filter((v) => v !== undefined) as number[];

        if (vals.length > 0) {
          categoryStats[cat.categoryName][t] = {
            min: Math.min(...vals),
            max: Math.max(...vals),
          };
        }
      });

      // Clean up items dictionary to save bandwidth by removing stripped dates
      const cleanedItems = items.map((i) => {
        const yieldRecord = i[keyName as keyof typeof i] as Record<
          string,
          number
        >;
        const filteredYields: Record<string, number> = {};

        if (yieldRecord) {
          timePeriods.forEach((t) => {
            if (yieldRecord[t] !== undefined)
              filteredYields[t] = yieldRecord[t];
          });
        }

        return {
          ...i,
          [keyName]: filteredYields,
        };
      });

      return {
        categoryName: cat.categoryName,
        items: cleanedItems,
      };
    });

  return {
    data,
    timePeriods,
    categoryStats,
    hasMoreOlder,
  };
}
