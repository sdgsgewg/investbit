import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deleteCategoryService,
  getCategoryByIdService,
  updateCategoryService,
} from "@/lib/services/reksadana/categories.service";
type CategoryRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: CategoryRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentCategory = await getCategoryByIdService(id);

    if (!currentCategory) {
      return errorResponse(new NotFoundError("Category not found"));
    }

    const body = await request.json();
    const data = await updateCategoryService(id, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request, context: CategoryRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const category = await getCategoryByIdService(id);

    if (!category) {
      return errorResponse(new NotFoundError("Category not found"));
    }

    await deleteCategoryService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
