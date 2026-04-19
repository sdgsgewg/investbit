import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { format, startOfMonth } from "date-fns";
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
}) {
  const supabase = createClient(await cookies());

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
    .order("date");

  if (params.categoryId) {
    query = query.eq("rd_items.category_id", params.categoryId);
  }

  const { data: queryData, error } = await query;

  if (error) throw error;

  const records = queryData as unknown as RecordData[];

  // helper
  const getWeekInfo = (dateStr: string) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth();

    const isWeekend = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    };

    let current = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let week = 1;
    let currentWeekStart: Date | null = null;
    let currentWeekEnd: Date | null = null;
    
    const weeks: Record<number, {start: Date, end: Date}> = {};

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

    current = new Date(year, month, 1);
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

  const timePeriods = Array.from(timeSet).sort();

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
        .map((i) => i[keyName]?.[t])
        .filter((v) => v !== undefined);

      if (vals.length > 0) {
        categoryStats[cat.categoryName][t] = {
          min: Math.min(...vals),
          max: Math.max(...vals),
        };
      }
    });

    return {
      categoryName: cat.categoryName,
      items,
    };
  });

  return {
    data,
    timePeriods,
    categoryStats,
  };
}
