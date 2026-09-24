import { getQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getCategoryLeaderboardService } from "@/lib/services/mutual-fund/performance/leaderboard.service";
import { CategoryLeaderboardFilter } from "@/types/mutual-fund/performance";

export async function GET(request: Request) {
  try {
    const query = getQuery<CategoryLeaderboardFilter>(request, [
      "timeFrame",
      "categoryId",
    ]);

    const data = await getCategoryLeaderboardService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
