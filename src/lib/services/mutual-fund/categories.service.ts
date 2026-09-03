import {
  createCategoryRepo,
  deleteCategoryRepo,
  getCategoriesRepo,
  getCategoryDetailRepo,
  getCategoryOptionsRepo,
  updateCategoryRepo,
} from "@/lib/repositories/mutual-fund/categories.repo";
import {
  categoryIdSchema,
  categoriesQuerySchema,
  createCategorySchema,
  updateCategorySchema,
} from "@/lib/validations/mutual-fund/categories.schema";

export async function getCategoriesService(query: unknown) {
  const parsed = categoriesQuerySchema.parse(query);

  return getCategoriesRepo(parsed);
}

export async function getCategoryOptionsService() {
  return getCategoryOptionsRepo();
}

export async function getCategoryDetailService(id: string) {
  const parsed = categoryIdSchema.parse(id);

  return getCategoryDetailRepo(parsed);
}

export async function createCategoryService(input: unknown) {
  const parsed = createCategorySchema.parse(input);

  return createCategoryRepo(parsed);
}

export async function updateCategoryService(id: string, input: unknown) {
  const parsedId = categoryIdSchema.parse(id);
  const parsed = updateCategorySchema.parse(input);

  return updateCategoryRepo(parsedId, parsed);
}

export async function deleteCategoryService(id: string) {
  const parsedId = categoryIdSchema.parse(id);

  await deleteCategoryRepo(parsedId);
}
