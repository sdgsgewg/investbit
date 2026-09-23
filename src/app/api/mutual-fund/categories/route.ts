import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createCategoryService,
  getCategoriesService,
} from "@/lib/services/mutual-fund/categories.service";
import { CategoryFilter } from "@/types/mutual-fund/categories";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<CategoryFilter>(request);

    const data = await getCategoriesService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const body = await request.json();
    const data = await createCategoryService(body);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
