import { computeCategoryLeaderboardFromRecords } from "@/lib/mutual-fund/performance/selector";
import { getLatestPeriodRecordsRepo } from "@/lib/repositories/mutual-fund/performance.repo";
import { performanceQuerySchema } from "@/lib/validations/mutual-fund/performance.schema";
import { CategoryLeaderboardResponse } from "@/types/mutual-fund/performance";

/**
 * Service for fetching and computing Category Leaderboard.
 * Only queries records for the latest period.
 */
export async function getCategoryLeaderboardService(
  query: unknown,
): Promise<CategoryLeaderboardResponse> {
  const parsed = performanceQuerySchema.parse(query);

  const { records, latestDate } = await getLatestPeriodRecordsRepo(parsed);

  return computeCategoryLeaderboardFromRecords(
    records,
    parsed.timeFrame,
    latestDate,
  );
}
