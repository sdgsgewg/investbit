import { getQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getPerformanceAnalyticsService } from "@/lib/services/mutual-fund/analytics.service";
import { PerformanceAnalyticsFilter } from "@/types/mutual-fund/performance";

export async function GET(request: Request) {
  try {
    const query = getQuery<PerformanceAnalyticsFilter>(request, [
      "timeFrame",
      "categoryId",
      "startPeriod",
      "endPeriod",
      "periodLimit",
    ]);

    const data = await getPerformanceAnalyticsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
