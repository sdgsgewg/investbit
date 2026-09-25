import { createClient } from "@/utils/supabase/server";
import { DbRecordListRow, RecordListItem } from "@/types/mutual-fund/records";
import { getRecordsBaseQuery, getRecordTable } from "./records.repo";
import { mapRecordListItem } from "@/lib/mutual-fund/records/mapper";
import { TimeFrame } from "@/enums/TimeFrame";

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
 * Fetches historical NAV records needed to calculate the latest period's
 * return against the last available NAV before that period.
 *
 * @param timeFrame
 * @param categoryId
 * @returns { records: RecordListItem[]; latestDate: string | null }
 */
export async function getLatestPeriodRecordsRepo(
  _timeFrame?: TimeFrame,
  categoryId?: string,
): Promise<{ records: RecordListItem[]; latestDate: string | null }> {
  const latestDate = await getLatestRecordDateRepo();
  if (!latestDate) {
    return { records: [], latestDate: null };
  }

  // NAV returns require a baseline before the selected window. Fetching the
  // full series also handles holidays and gaps in an item's NAV history.
  const records = await getPerformanceRecordsRepo({ categoryId });

  return { records, latestDate };
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
