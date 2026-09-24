import { aggregatePerformanceRecords } from "@/lib/mutual-fund/performance/aggregator";
import { getPerformanceRecordsRepo } from "@/lib/repositories/mutual-fund/performance.repo";
import { performanceAnalyticsQuerySchema } from "@/lib/validations/mutual-fund/performance.schema";
import { PerformanceAnalyticsResponse } from "@/types/mutual-fund/performance";

/**
 * Orchestrates the performance analytics flow by:
 * 1. Validating and parsing the input query.
 * 2. Fetching the required performance records from the repository.
 * 3. Aggregating the records into the response format used by the analytics table.
 *
 * The service keeps validation, data access, and aggregation responsibilities
 * separated into their respective layers.
 */
export async function getPerformanceAnalyticsService(
  query: unknown,
): Promise<PerformanceAnalyticsResponse> {
  const parsed = performanceAnalyticsQuerySchema.parse(query);

  // Fetch the raw performance records required for aggregation.
  const records = await getPerformanceRecordsRepo({
    categoryId: parsed.categoryId,
  });

  return aggregatePerformanceRecords(records, parsed);
}
