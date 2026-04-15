import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { format, startOfMonth, getWeekOfMonth } from "date-fns";
import { TimeFrameType } from "@/types/reksadana/recap/performance/TimeFrameType";
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
  const getWeekKey = (dateStr: string) => {
    const d = new Date(dateStr);
    const week = getWeekOfMonth(d, { weekStartsOn: 1 });
    const month = format(d, "yyyy-MM");
    return `${month}-W${week}`;
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

  const data = Object.values(grouped).map((cat) => {
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
