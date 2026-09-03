import { aggregatePerformanceRecords } from "@/lib/mutual-fund/performance/aggregator";
import { getPerformanceRecordsRepo } from "@/lib/repositories/mutual-fund/performance.repo";
import { performanceAnalyticsQuerySchema } from "@/lib/validations/mutual-fund/performance.schema";
import { PerformanceAnalyticsResponse } from "@/types/mutual-fund/performance";

/**
 * Service orchestrating input validation, data access, and domain aggregation
 * for historical performance analytics table.
 */
export async function getPerformanceAnalyticsService(
  query: unknown,
): Promise<PerformanceAnalyticsResponse> {
  const parsed = performanceAnalyticsQuerySchema.parse(query);

  const records = await getPerformanceRecordsRepo({
    categoryId: parsed.categoryId,
  });

  return aggregatePerformanceRecords(records, parsed);
}
