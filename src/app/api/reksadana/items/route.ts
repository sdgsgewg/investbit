import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createItemService,
  getItemsGroupedService,
  getItemsService,
} from "@/lib/services/reksadana/items.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      name: searchParams.get("name") || undefined,
      category_id: searchParams.get("category_id") || undefined,
    };

    const grouped = searchParams.get("grouped") === "true";

    const data = grouped
      ? await getItemsGroupedService(query)
      : await getItemsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const body = await request.json();
    const data = await createItemService(body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
