import { createClient } from "@/utils/supabase/server";
import { format, startOfMonth } from "date-fns";
import { getPerformanceKey } from "@/lib/utils/reksadana/performance";
import { RecordData } from "@/types/reksadana/records/RecordData";
import { TimeFrameType } from "@/types/reksadana/performance/TimeFrameType";

async function getSupabase() {
  return createClient();
}

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
  startPeriod?: string;
  endPeriod?: string;
}) {
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
    if (params.timeFrame === "weekly") {
      const [yearMonth, weekPart] = key.split("-W");
      const [weekStr] = weekPart.split("|");
      return new Date(`${yearMonth}-01`).getTime() + Number(weekStr) * 1000;
    }

    if (params.timeFrame === "ytd" || params.timeFrame === "yearly") {
      return new Date(Number(key), 0, 1).getTime();
    }

    return new Date(key).getTime();
  };

  const grouped: GroupedType = {};
  const timeSet = new Set<string>();
  const keyName = getPerformanceKey(params.timeFrame);

  records.forEach((r) => {
    const item = r.rd_items;
    if (!item || !item.rd_categories || !r.date) return;

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
        key = r.date.substring(0, 4);
        break;
    }

    if (!key || key === "Invalid Date") return;

    timeSet.add(key);

    const container = grouped[cat].items[item.id][keyName];

    if (params.timeFrame === "ytd") {
      // Records are sorted ascending by date, so the last assignment per year
      // becomes the latest available YTD value for that item.
      container[key] = r.yield_ytd ?? 0;
      return;
    }

    const val = r.yield_1d ?? 0;
    const existing = container[key] ?? 0;

    container[key] = params.timeFrame === "daily" ? val : existing + val;
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
      const periodTimestamp = parseKeyDate(period);
      return periodTimestamp >= rangeStart && periodTimestamp <= rangeEnd;
    });
  } else if (params.periodLimit && params.periodLimit > 0) {
    timePeriods = availablePeriods.slice(-params.periodLimit);
  }

  const hasMoreOlder =
    !isRangeMode &&
    availablePeriods.length > 0 &&
    timePeriods.length < availablePeriods.length;

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

      const cleanedItems = items.map((i) => {
        const yieldRecord = i[keyName as keyof typeof i] as Record<
          string,
          number
        >;
        const filteredYields: Record<string, number> = {};

        if (yieldRecord) {
          timePeriods.forEach((t) => {
            if (yieldRecord[t] !== undefined) {
              filteredYields[t] = yieldRecord[t];
            }
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
    availablePeriods,
    categoryStats,
    hasMoreOlder,
  };
}
