import { getQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getTopPerformersService } from "@/lib/services/mutual-fund/top-performers.service";
import { TopPerformersFilter } from "@/types/mutual-fund/performance";

export async function GET(request: Request) {
  try {
    const query = getQuery<TopPerformersFilter>(request, [
      "timeFrame",
      "categoryId",
    ]);

    const data = await getTopPerformersService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
