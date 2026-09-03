import { errorResponse, successResponse } from "@/lib/api/response";
import { getTopPerformersService } from "@/lib/services/mutual-fund/top-performers.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      timeFrame: searchParams.get("timeFrame") || "weekly",
      categoryId: searchParams.get("categoryId") || undefined,
    };

    const data = await getTopPerformersService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
