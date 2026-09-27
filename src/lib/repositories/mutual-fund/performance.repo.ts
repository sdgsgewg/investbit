import { createClient } from "@/utils/supabase/server";
import { DbRecordListRow, RecordListItem } from "@/types/mutual-fund/records";
import { getRecordsBaseQuery, getRecordTable } from "./records.repo";
import { mapRecordListItem } from "@/lib/mutual-fund/records/mapper";
import { TimeFrame } from "@/enums/TimeFrame";
import { getWeekInfo } from "@/lib/mutual-fund/performance/period";
import { format, startOfMonth } from "date-fns";

async function getSupabase() {
  return createClient();
}

interface PerformanceRepoFilter {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
}

/**
 * Gets the most recent date available in rd_records.
 *
 * @returns string | null
 */
async function getLatestRecordDateRepo(): Promise<string | null> {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from(getRecordTable())
    .select("date")
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data?.date ?? null;
}

/**
 * Get the latest period range
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
 * Fetches records from the latest period plus the preceding valid NAV needed
 * as a baseline for each item represented in that period.
 *
 * @param timeFrame
 * @param categoryId
 * @returns { records: RecordListItem[]; latestDate: string | null }
 */
export async function getLatestPeriodRecordsRepo(
  timeFrame: TimeFrame = TimeFrame.WEEKLY,
  categoryId?: string,
): Promise<{ records: RecordListItem[]; latestDate: string | null }> {
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

  const itemIdsNeedingBaseline = new Set(
    periodRecords
      .filter((record) => isValidNav(record.nav1d))
      .map((record) => record.item.id),
  );
  const baselineRecords: RecordListItem[] = [];

  if (itemIdsNeedingBaseline.size > 0) {
    const supabase = await getSupabase();
    let offset = 0;
    const PAGE_SIZE = 1000;
    let hasMore = true;

    // Scan older rows newest-first, stopping once every item in the period
    // has its most recent valid NAV baseline.
    while (hasMore && itemIdsNeedingBaseline.size > 0) {
      let query = supabase
        .from(getRecordTable())
        .select(getRecordsBaseQuery())
        .lt("date", startDate)
        .order("date", { ascending: false })
        .order("item_id")
        .range(offset, offset + PAGE_SIZE - 1);

      if (categoryId) {
        query = query.eq("item.category.id", categoryId);
      }

      const { data, error } = await query.overrideTypes<DbRecordListRow[]>();
      if (error) throw error;

      const rows = data ?? [];
      for (const row of rows) {
        const record = mapRecordListItem(row);
        if (
          itemIdsNeedingBaseline.has(record.item.id) &&
          isValidNav(record.nav1d)
        ) {
          baselineRecords.push(record);
          itemIdsNeedingBaseline.delete(record.item.id);
        }
      }

      hasMore = rows.length === PAGE_SIZE;
      offset += PAGE_SIZE;
    }
  }

  return { records: [...baselineRecords, ...periodRecords], latestDate };
}

function isValidNav(nav: number | null): nav is number {
  return nav !== null && Number.isFinite(nav) && nav > 0;
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
      // Sort by date so aggregation can process records chronologically.
      .order("date")
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

    const { data: queryData, error } =
      await query.overrideTypes<DbRecordListRow[]>();

    if (error) throw error;

    if (queryData && queryData.length > 0) {
      // Map database rows into the application-level record structure.
      records.push(...queryData.map(mapRecordListItem));

      // A page smaller than PAGE_SIZE indicates that there are no more
      // records to retrieve.
      if (queryData.length < PAGE_SIZE) {
        hasMore = false;
      } else {
        // Move to the next page when the current page is full.
        offset += PAGE_SIZE;
      }
    } else {
      // Stop when the query returns no records.
      hasMore = false;
    }
  }

  return records;
}
