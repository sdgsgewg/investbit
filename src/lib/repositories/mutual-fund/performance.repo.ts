import { createClient } from "@/utils/supabase/server";
import { DbRecordListRow, RecordListItem } from "@/types/mutual-fund/records";
import { getRecordsBaseQuery, getRecordTable } from "./records.repo";
import { mapRecordListItem } from "@/lib/mutual-fund/records/mapper";
import { TimeFrame } from "@/enums/TimeFrame";
import { getWeekInfo } from "@/lib/mutual-fund/performance/period";
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
  PerformanceFilter,
} from "@/types/mutual-fund/performance";

async function getSupabase() {
  return createClient();
}

interface PerformanceRepoFilter {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
}

interface PerformanceBaselineRow {
  id: string;
  item_id: string;
}

/**
 * Gets the most recent record date available.
 *
 * When a category is provided, only records belonging to that category
 * are considered.
 *
 * @returns string | null
 */
async function getLatestRecordDateRepo(
  categoryId?: string,
): Promise<string | null> {
  const supabase = await getSupabase();

  const selectQuery = categoryId
    ? "date, item:rd_items!rd_records_item_id_fkey!inner(category:rd_categories!rd_items_category_id_fkey!inner(id))"
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
function getLatestPeriodRange(latestDate: string, timeFrame: TimeFrame) {
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

/**
 * Gets the latest valid NAV baseline for each item.
 *
 * The baseline is the latest valid record before startDate.
 * The lookup is performed inside PostgreSQL using DISTINCT ON,
 * avoiding client-side pagination through potentially large history.
 *
 * @param startDate
 * @param itemIds
 * @param categoryId
 * @returns
 */
async function getBaselineRecordsRepo(
  startDate: string,
  itemIds: string[],
): Promise<RecordListItem[]> {
  if (itemIds.length === 0) {
    return [];
  }

  const supabase = await getSupabase();

  const { data, error } = await supabase.rpc("get_latest_valid_nav_baselines", {
    p_start_date: startDate,
    p_item_ids: itemIds,
  });

  if (error) throw error;

  const baselineRows = (data ?? []) as PerformanceBaselineRow[];

  if (baselineRows.length === 0) {
    return [];
  }

  const baselineIds = baselineRows.map((row) => row.id);

  const { data: recordRows, error: recordError } = await supabase
    .from(getRecordTable())
    .select(getRecordsBaseQuery())
    .in("id", baselineIds)
    .overrideTypes<DbRecordListRow[]>();

  if (recordError) throw recordError;

  return (recordRows ?? []).map(mapRecordListItem);
}

function isValidNav(nav: number | null): nav is number {
  return nav !== null && Number.isFinite(nav) && nav > 0;
}

// --- Performance Top Performers and Category Leaderboard Related Functions ---

/**
 * Fetches records for a specific period and includes the latest valid
 * baseline before the period for every represented item.
 *
 * @param params
 * @returns { records: RecordListItem[]; latestDate: string | null }
 */
export async function getLatestPeriodRecordsRepo(
  params: PerformanceFilter,
): Promise<{ records: RecordListItem[]; latestDate: string | null }> {
  const { timeFrame = TimeFrame.WEEKLY, categoryId } = params;

  const latestDate = await getLatestRecordDateRepo();

  if (!latestDate) {
    return { records: [], latestDate: null };
  }

  const { startDate, endDate } = getLatestPeriodRange(latestDate, timeFrame);

  const periodRecords = await getPerformanceRecordsRepo({
    startDate,
    endDate,
    categoryId,
  });

  const itemIds = Array.from(
    new Set(
      periodRecords
        .filter((record) => isValidNav(record.nav1d))
        .map((record) => record.item.id),
    ),
  );

  const baselineRecords = await getBaselineRecordsRepo(startDate, itemIds);

  return { records: [...baselineRecords, ...periodRecords], latestDate };
}

// --- Performance Analytics Related Functions ---

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
        startDate: startPeriod,
        endDate: endPeriod,
      };

    case TimeFrame.MONTHLY:
      return {
        startDate: format(startOfMonth(parseISO(startPeriod)), "yyyy-MM-dd"),
        endDate: format(endOfMonth(parseISO(endPeriod)), "yyyy-MM-dd"),
      };

    case TimeFrame.YEARLY:
      return {
        startDate: `${startPeriod}-01-01`,
        endDate: `${endPeriod}-12-31`,
      };

    case TimeFrame.WEEKLY: {
      const startWeek = getWeekInfo(startPeriod);
      const endWeek = getWeekInfo(endPeriod);

      return {
        startDate: format(
          startWeek.start ?? parseISO(startPeriod),
          "yyyy-MM-dd",
        ),
        endDate: format(endWeek.end ?? parseISO(endPeriod), "yyyy-MM-dd"),
      };
    }

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
        startDate: format(subDays(latest, limit - 1), "yyyy-MM-dd"),
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
    const modifiedStartPeriod = startPeriod ?? endPeriod!;
    const modifiedEndPeriod = endPeriod ?? startPeriod!;

    return getExplicitDateRange(
      modifiedStartPeriod,
      modifiedEndPeriod,
      timeFrame,
    );
  }

  if (periodLimit && periodLimit > 0) {
    return getLatestLimitedDateRange(latestDate, timeFrame, periodLimit);
  }

  // No range and no period limit means all available history.
  return {
    startDate: "1900-01-01",
    endDate: latestDate,
  };
}

/**
 *
 * @param params
 * @returns
 */
export async function getPerformanceAnalyticsRecordsRepo(
  params: PerformanceAnalyticsFilter,
): Promise<RecordListItem[]> {
  const { categoryId } = params;

  const latestDate = await getLatestRecordDateRepo(categoryId);

  if (!latestDate) return [];

  const { startDate, endDate } = getAnalyticsDateRange(latestDate, params);

  const periodRecords = await getPerformanceRecordsRepo({
    startDate,
    endDate,
    categoryId,
  });

  const itemIds = Array.from(
    new Set(
      periodRecords
        .filter((record) => isValidNav(record.nav1d))
        .map((record) => record.item.id),
    ),
  );

  const baselineRecords = await getBaselineRecordsRepo(startDate, itemIds);

  return [...baselineRecords, ...periodRecords];
}

/**
 * Fetches all mutual fund performance records matching the provided filters.
 *
 * Supabase queries are executed in pages because the analytics calculation
 * may require more records than can safely be retrieved in a single request.
 *
 * @param params Optional filters used to limit the records returned.
 * @returns All matching performance records mapped into RecordListItem objects.
 */
export async function getPerformanceRecordsRepo(
  params?: PerformanceRepoFilter,
): Promise<RecordListItem[]> {
  const supabase = await getSupabase();

  // Accumulate records from all pages into a single collection.
  const records: RecordListItem[] = [];

  let hasMore = true;
  let offset = 0;

  // Fetch records in batches of 1,000 rows per request.
  const PAGE_SIZE = 1000;

  while (hasMore) {
    let query = supabase
      .from(getRecordTable())
      .select(getRecordsBaseQuery())
      .order("date", { ascending: true })
      .order("id", { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);

    if (params?.startDate) {
      query = query.gte("date", params.startDate);
    }

    if (params?.endDate) {
      query = query.lte("date", params.endDate);
    }

    if (params?.categoryId) {
      query = query.eq("item.category.id", params.categoryId);
    }

    const { data, error } = await query.overrideTypes<DbRecordListRow[]>();

    if (error) throw error;

    const rows = data ?? [];

    if (rows.length === 0) {
      break;
    }

    records.push(...rows.map(mapRecordListItem));

    hasMore = rows.length === PAGE_SIZE;
    offset += PAGE_SIZE;
  }

  return records;
}
