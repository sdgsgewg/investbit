import { errorResponse, successResponse } from "@/lib/api/response";
import { getCategoryOptionsService } from "@/lib/services/mutual-fund/categories.service";

export async function GET() {
  try {
    const data = await getCategoryOptionsService();

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
