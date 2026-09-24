import {
  upsertRecordsService,
  getRecordsService,
} from "@/lib/services/mutual-fund/records.service";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getQuery } from "@/lib/api/query";
import { RecordFilter } from "@/types/mutual-fund/records";

export async function GET(request: Request) {
  try {
    const query = getQuery<RecordFilter>(request, [
      "startDate",
      "endDate",
      "categoryId",
    ]);

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

    const timezone = request.headers.get("x-timezone") ?? "UTC";

    const data = await upsertRecordsService(body, timezone);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
