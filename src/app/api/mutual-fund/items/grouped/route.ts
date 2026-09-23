import { getQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getGroupedItemsService } from "@/lib/services/mutual-fund/items.service";
import { GroupedItemFilter } from "@/types/mutual-fund/items";

export async function GET(request: Request) {
  try {
    const query = getQuery<GroupedItemFilter>(request, ["categoryId"]);

    const data = await getGroupedItemsService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
