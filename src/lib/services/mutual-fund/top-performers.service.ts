import { computeTopPerformersFromRecords } from "@/lib/mutual-fund/performance/selector";
import { getLatestPeriodRecordsRepo } from "@/lib/repositories/mutual-fund/performance.repo";
import { topPerformersQuerySchema } from "@/lib/validations/mutual-fund/performance.schema";
import { TopPerformersResponse } from "@/types/mutual-fund/performance";

/**
 * Service for fetching and computing Top Performers.
 * Ultra-lightweight: only queries records for the latest period.
 */
export async function getTopPerformersService(
  query: unknown,
): Promise<TopPerformersResponse> {
  const parsed = topPerformersQuerySchema.parse(query);

  const { records, latestDate } = await getLatestPeriodRecordsRepo(
    parsed.timeFrame,
    parsed.categoryId,
  );

  return computeTopPerformersFromRecords(records, parsed.timeFrame, latestDate);
}
