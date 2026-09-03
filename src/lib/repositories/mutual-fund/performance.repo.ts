import { createClient } from "@/utils/supabase/server";
import { DbRecordListRow, RecordListItem } from "@/types/mutual-fund/records";
import { getRecordsBaseQuery, getRecordTable, getRecordsRepo } from "./records.repo";
import { mapRecordListItem } from "@/lib/mutual-fund/records/mapper";
import { TimeFrame } from "@/enums/TimeFrame";
import { getWeekInfo } from "@/lib/mutual-fund/performance/period";
import { format, startOfMonth } from "date-fns";

async function getSupabase() {
  return createClient();
}

export interface PerformanceRepoFilter {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Gets the most recent date available in rd_records.
 */
export async function getLatestRecordDateRepo(): Promise<string | null> {
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
 * Ultra-fast query: Fetches ONLY records within the latest period (e.g. latest week/month/day).
 * Used by Top Performers and Category Leaderboard.
 */
export async function getLatestPeriodRecordsRepo(
  timeFrame: TimeFrame = TimeFrame.WEEKLY,
  categoryId?: string,
): Promise<{ records: RecordListItem[]; latestDate: string | null }> {
  const latestDate = await getLatestRecordDateRepo();
  if (!latestDate) {
    return { records: [], latestDate: null };
  }

  let startDate = latestDate;
  let endDate = latestDate;

  if (timeFrame === TimeFrame.WEEKLY) {
    const weekInfo = getWeekInfo(latestDate);
    if (weekInfo.start && weekInfo.end) {
      startDate = format(weekInfo.start, "yyyy-MM-dd");
      endDate = format(weekInfo.end, "yyyy-MM-dd");
    }
  } else if (timeFrame === TimeFrame.MONTHLY) {
    startDate = format(startOfMonth(new Date(latestDate)), "yyyy-MM-dd");
    endDate = latestDate;
  } else if (timeFrame === TimeFrame.YEARLY) {
    startDate = `${latestDate.substring(0, 4)}-01-01`;
    endDate = latestDate;
  }

  const records = await getRecordsRepo({
    startDate,
    endDate,
    categoryId,
  });

  return { records, latestDate };
}

/**
 * Fetches all mutual fund records matching the filter for historical analytics table calculation.
 * Paginated Supabase querying.
 */
export async function getPerformanceRecordsRepo(
  params?: PerformanceRepoFilter,
): Promise<RecordListItem[]> {
  const supabase = await getSupabase();

  const records: RecordListItem[] = [];
  let hasMore = true;
  let offset = 0;
  const PAGE_SIZE = 1000;

  while (hasMore) {
    let query = supabase
      .from(getRecordTable())
      .select(getRecordsBaseQuery())
      .order("date")
      .range(offset, offset + PAGE_SIZE - 1);

    if (params?.categoryId) {
      query = query.eq("item.category.id", params.categoryId);
    }

    const { data: queryData, error } =
      await query.overrideTypes<DbRecordListRow[]>();

    if (error) throw error;

    if (queryData && queryData.length > 0) {
      const mappedQueryData = queryData.map(mapRecordListItem);
      records.push(...(mappedQueryData as unknown as RecordListItem[]));
      if (queryData.length < PAGE_SIZE) {
        hasMore = false;
      } else {
        offset += PAGE_SIZE;
      }
    } else {
      hasMore = false;
    }
  }

  return records;
}
