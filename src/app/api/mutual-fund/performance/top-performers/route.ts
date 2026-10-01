import { getQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getTopPerformersService } from "@/lib/services/mutual-fund/performance/top-performers.service";
import { PerformanceFilter } from "@/types/mutual-fund/performance";

export async function GET(request: Request) {
  try {
    const query = getQuery<PerformanceFilter>(request, [
      "timeFrame",
      "categoryId",
    ]);

    const data = await getTopPerformersService(query);

    return successResponse(data);
  } catch (error: unknown) {
    console.error(error);
    return errorResponse(error);
  }
}
