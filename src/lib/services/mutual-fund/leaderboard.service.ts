import { computeCategoryLeaderboardFromRecords } from "@/lib/mutual-fund/performance/selector";
import { getLatestPeriodRecordsRepo } from "@/lib/repositories/mutual-fund/performance.repo";
import { categoryLeaderboardQuerySchema } from "@/lib/validations/mutual-fund/performance.schema";
import { CategoryLeaderboardResponse } from "@/types/mutual-fund/performance";

/**
 * Service for fetching and computing Category Leaderboard.
 * Ultra-lightweight: only queries records for the latest period.
 */
export async function getCategoryLeaderboardService(
  query: unknown,
): Promise<CategoryLeaderboardResponse> {
  const parsed = categoryLeaderboardQuerySchema.parse(query);

  const { records, latestDate } = await getLatestPeriodRecordsRepo(
    parsed.timeFrame,
    parsed.categoryId,
  );

  return computeCategoryLeaderboardFromRecords(
    records,
    parsed.timeFrame,
    latestDate,
  );
}
