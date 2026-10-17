import { computeCategoryLeaderboard } from "@/lib/mutual-fund/performance/selector";
import {
  getLatestPeriodRange,
  getLatestRecordDateRepo,
  getPerformanceLeaderboardRepo,
} from "@/lib/repositories/mutual-fund/performance.repo";
import { performanceQuerySchema } from "@/lib/validations/mutual-fund/performance.schema";
import { CategoryLeaderboardResponse } from "@/types/mutual-fund/performance";
import { TimeFrame } from "@/enums/TimeFrame";
import { getPerformancePeriodKey } from "@/lib/mutual-fund/performance/period";

/**
 * Service for fetching and computing Category Leaderboard.
 * Uses SQL RPC to compute period performance directly.
 */
export async function getCategoryLeaderboardService(
  query: unknown,
): Promise<CategoryLeaderboardResponse> {
  const parsed = performanceQuerySchema.parse(query);
  const timeFrame = parsed.timeFrame ?? TimeFrame.WEEKLY;

  const latestDate = await getLatestRecordDateRepo(parsed.categoryId);

  if (!latestDate) {
    return { latestPeriod: "", rankedCategories: [] };
  }

  const { startDate, endDate } = getLatestPeriodRange(latestDate, timeFrame);
  const latestPeriod = getPerformancePeriodKey(latestDate, timeFrame);

  const items = await getPerformanceLeaderboardRepo({
    startDate,
    endDate,
    categoryId: parsed.categoryId,
  });

  return computeCategoryLeaderboard(items, latestPeriod);
}
