import { getCrudQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getGroupedItemsService } from "@/lib/services/reksadana/items.service";
import { GroupedItemFilter } from "@/types/mutual-fund/items";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<GroupedItemFilter>(request, ["categoryId"]);

    const data = await getGroupedItemsService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
