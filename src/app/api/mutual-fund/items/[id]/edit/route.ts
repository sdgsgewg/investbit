import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getItemEditService } from "@/lib/services/reksadana/items.service";

type PositionRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: PositionRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getItemEditService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Item not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
