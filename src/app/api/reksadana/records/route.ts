import {
  upsertRecordsService,
  getRecordsService,
} from "@/lib/services/reksadana/records.service";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
    };

    const data = await getRecordsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const body = await request.json();
    const data = await upsertRecordsService(body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
