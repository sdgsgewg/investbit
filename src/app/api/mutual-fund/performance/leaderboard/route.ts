import { errorResponse, successResponse } from "@/lib/api/response";
import { getCategoryLeaderboardService } from "@/lib/services/mutual-fund/leaderboard.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      timeFrame: searchParams.get("timeFrame") || "weekly",
      categoryId: searchParams.get("categoryId") || undefined,
    };

    const data = await getCategoryLeaderboardService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
