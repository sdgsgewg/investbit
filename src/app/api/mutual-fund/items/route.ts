import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createItemService,
  getItemsService,
} from "@/lib/services/mutual-fund/items.service";
import { ItemFilter } from "@/types/mutual-fund/items";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<ItemFilter>(request, ["categoryId"]);

    const data = await getItemsService(query);

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
