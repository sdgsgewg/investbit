import { createClient } from "@/utils/supabase/server";
import { getRecordTable } from "./records.repo";
import { TimeFrame } from "@/enums/TimeFrame";
import {
  getWeekInfo,
  getWeeklyPeriodDateRange,
} from "@/lib/mutual-fund/performance/period";
import {
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import {
  PerformanceAnalyticsFilter,
  PerformanceAnalyticsMatrixRow,
  PerformanceLeaderboardItem,
} from "@/types/mutual-fund/performance";

async function getSupabase() {
  return createClient();
}

/**
 * Gets the most recent record date available.
 *
 * When a category is provided, only records belonging to that category
 * are considered.
 *
 * @returns string | null
 */
export async function getLatestRecordDateRepo(
  categoryId?: string,
): Promise<string | null> {
  const supabase = await getSupabase();

  const selectQuery = categoryId
    ? `
        date, 
        item:rd_items!rd_records_item_id_fkey!inner(
          category:rd_categories!rd_items_category_id_fkey!inner(
            id
          )
        )
      `
    : "date";

  let query = supabase
    .from(getRecordTable())
    .select(selectQuery)
    .order("date", { ascending: false })
    .limit(1);

  if (categoryId) {
    query = query.eq("item.category.id", categoryId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;

  return (data as { date: string } | null)?.date ?? null;
}

/**
 * Get the date range covered by the latest period
 *
 * @param latestDate
 * @param timeFrame
 * @returns
 */
export function getLatestPeriodRange(latestDate: string, timeFrame: TimeFrame) {
  let startDate = latestDate;

  switch (timeFrame) {
    case TimeFrame.WEEKLY: {
      const weekInfo = getWeekInfo(latestDate);
      if (weekInfo.start) startDate = format(weekInfo.start, "yyyy-MM-dd");
      break;
    }
    case TimeFrame.MONTHLY:
      startDate = format(startOfMonth(new Date(latestDate)), "yyyy-MM-dd");
      break;
    case TimeFrame.YEARLY:
      startDate = `${latestDate.substring(0, 4)}-01-01`;
      break;
  }

  return { startDate, endDate: latestDate };
}

interface PerformanceLeaderboardRpcRow {
  item_id: string;
  item_name: string;
  category_id: string;
  category_name: string;
  baseline_date: string;
  baseline_nav: number;
  end_date: string;
  end_nav: number;
  yield_value: number;
}

/**
 * Fetches computed period performance leaderboard directly from PostgreSQL RPC.
 *
 * Computes period performance yields between baseline and end of period in SQL.
 */
export async function getPerformanceLeaderboardRepo(params: {
  startDate: string;
  endDate: string;
  categoryId?: string;
}): Promise<PerformanceLeaderboardItem[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase.rpc("get_performance_leaderboard", {
    p_start_date: params.startDate,
    p_end_date: params.endDate,
    p_category_id: params.categoryId ?? null,
  });

  if (error) throw error;

  const rows = (data ?? []) as PerformanceLeaderboardRpcRow[];

  return rows.map((row) => ({
    itemId: row.item_id,
    itemName: row.item_name,
    categoryId: row.category_id,
    categoryName: row.category_name,
    baselineDate: row.baseline_date,
    baselineNav: Number(row.baseline_nav),
    endDate: row.end_date,
    endNav: Number(row.end_nav),
    yieldValue: Number(row.yield_value),
  }));
}

// --- Performance Detailed Analytics Related Functions ---

/**
 *
 * @param startPeriod
 * @param endPeriod
 * @param timeFrame
 * @returns
 */
function getExplicitDateRange(
  startPeriod: string,
  endPeriod: string,
  timeFrame: TimeFrame,
): {
  startDate: string;
  endDate: string;
} {
  switch (timeFrame) {
    case TimeFrame.DAILY:
      return {
        startDate: startPeriod.split("T")[0],
        endDate: endPeriod.split("T")[0],
      };

    case TimeFrame.WEEKLY: {
      const startRange = getWeeklyPeriodDateRange(startPeriod);
      const endRange = getWeeklyPeriodDateRange(endPeriod);

      return {
        startDate: startRange?.start
          ? format(startRange.start, "yyyy-MM-dd")
          : startPeriod.split("T")[0],
        endDate: endRange?.end
          ? format(endRange.end, "yyyy-MM-dd")
          : endPeriod.split("T")[0],
      };
    }

    case TimeFrame.MONTHLY: {
      const safeStart =
        startPeriod.length === 7 ? `${startPeriod}-01` : startPeriod;
      const safeEnd = endPeriod.length === 7 ? `${endPeriod}-01` : endPeriod;
      return {
        startDate: format(startOfMonth(parseISO(safeStart)), "yyyy-MM-dd"),
        endDate: format(endOfMonth(parseISO(safeEnd)), "yyyy-MM-dd"),
      };
    }

    case TimeFrame.YEARLY:
      return {
        startDate: `${startPeriod.substring(0, 4)}-01-01`,
        endDate: `${endPeriod.substring(0, 4)}-12-31`,
      };

    default:
      return {
        startDate: startPeriod,
        endDate: endPeriod,
      };
  }
}

/**
 *
 * @param latestDate
 * @param timeFrame
 * @param periodLimit
 * @returns
 */
function getLatestLimitedDateRange(
  latestDate: string,
  timeFrame: TimeFrame,
  periodLimit?: number,
): {
  startDate: string;
  endDate: string;
} {
  const limit = periodLimit && periodLimit > 0 ? periodLimit : 12;

  const latest = parseISO(latestDate);

  switch (timeFrame) {
    case TimeFrame.DAILY:
      return {
        startDate: format(
          subDays(latest, Math.ceil((limit * 7) / 5) + 7),
          "yyyy-MM-dd",
        ),
        endDate: latestDate,
      };

    case TimeFrame.WEEKLY:
      return {
        startDate: format(subWeeks(latest, limit), "yyyy-MM-dd"),
        endDate: latestDate,
      };

    case TimeFrame.MONTHLY:
      return {
        startDate: format(
          startOfMonth(subMonths(latest, limit - 1)),
          "yyyy-MM-dd",
        ),
        endDate: latestDate,
      };

    case TimeFrame.YEARLY:
      return {
        startDate: `${latest.getFullYear() - limit + 1}-01-01`,
        endDate: latestDate,
      };

    default:
      return {
        startDate: latestDate,
        endDate: latestDate,
      };
  }
}

/**
 *
 * @param latestDate
 * @param params
 * @returns
 */
function getAnalyticsDateRange(
  latestDate: string,
  params: PerformanceAnalyticsFilter,
): {
  startDate: string;
  endDate: string;
} {
  const {
    timeFrame = TimeFrame.WEEKLY,
    startPeriod,
    endPeriod,
    periodLimit,
  } = params;

  if (startPeriod || endPeriod) {
    const modifiedStartPeriod = startPeriod ?? endPeriod ?? latestDate;
    const modifiedEndPeriod = endPeriod ?? startPeriod ?? latestDate;

    return getExplicitDateRange(
      modifiedStartPeriod,
      modifiedEndPeriod,
      timeFrame,
    );
  }

  if (periodLimit && periodLimit > 0) {
    return getLatestLimitedDateRange(latestDate, timeFrame, periodLimit);
  }

  return {
    startDate: "1900-01-01",
    endDate: latestDate,
  };
}

interface PerformanceAnalyticsMatrixRpcRow {
  item_id: string;
  item_name: string;
  category_id: string;
  category_name: string;
  period: string;
  baseline_date: string;
  baseline_nav: number | null;
  end_date: string;
  end_nav: number | null;
}

/**
 * Fetches period-based mutual fund performance data from PostgreSQL.
 *
 * Each row contains an exact baseline and end NAV for one item and period.
 * Missing NAV records remain null and are never replaced with older records.
 */
export async function getPerformanceAnalyticsRecordsRepo(
  params: PerformanceAnalyticsFilter,
): Promise<PerformanceAnalyticsMatrixRow[]> {
  const { categoryId } = params;

  const latestDate = await getLatestRecordDateRepo(categoryId);

  if (!latestDate) return [];

  const { startDate, endDate } = getAnalyticsDateRange(latestDate, params);

  const supabase = await getSupabase();

  const { data, error } = await supabase.rpc(
    "get_performance_analytics_matrix",
    {
      p_start_date: startDate,
      p_end_date: endDate,
      p_category_id: categoryId ?? null,
      p_time_frame: params.timeFrame ?? TimeFrame.WEEKLY,
    },
  );

  if (error) throw error;

  const rows = (
    Array.isArray(data) ? data : []
  ) as PerformanceAnalyticsMatrixRpcRow[];

  return rows.map((row) => ({
    itemId: row.item_id,
    itemName: row.item_name,
    categoryId: row.category_id,
    categoryName: row.category_name,
    period: row.period,
    baselineDate: row.baseline_date,
    baselineNav: row.baseline_nav === null ? null : Number(row.baseline_nav),
    endDate: row.end_date,
    endNav: row.end_nav === null ? null : Number(row.end_nav),
  }));
}
