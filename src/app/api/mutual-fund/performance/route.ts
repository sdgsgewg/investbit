import { errorResponse, successResponse } from "@/lib/api/response";
import { getPerformanceService } from "@/lib/services/reksadana/recap/performance.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      timeFrame: searchParams.get("timeFrame") || "weekly",
      categoryId: searchParams.get("categoryId") || undefined,
      startPeriod: searchParams.get("startPeriod") || undefined,
      endPeriod: searchParams.get("endPeriod") || undefined,
      periodLimit: searchParams.get("periodLimit") || undefined,
    };

    const data = await getPerformanceService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
