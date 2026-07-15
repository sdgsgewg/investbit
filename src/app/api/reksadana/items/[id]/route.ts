import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deleteItemService,
  getItemByIdService,
  updateItemService,
} from "@/lib/services/reksadana/items.service";

type ItemRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: ItemRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentItem = await getItemByIdService(id);

    if (!currentItem) {
      return errorResponse(new NotFoundError("Item not found"));
    }

    const body = await request.json();
    const data = await updateItemService(id, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request, context: ItemRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const item = await getItemByIdService(id);

    if (!item) {
      return errorResponse(new NotFoundError("Item not found"));
    }

    await deleteItemService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
