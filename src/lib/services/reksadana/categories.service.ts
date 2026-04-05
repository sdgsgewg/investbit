import {
  createCategoriesRepo,
  getCategoriesRepo,
  updateCategoryRepo,
} from "@/lib/repositories/reksadana/categories.repo";
import {
  categoriesQuerySchema,
  categoriesSchema,
  categorySchema,
} from "@/lib/validations/reksadana/categories.schema";

export async function getCategoriesService(query: unknown) {
  const parsed = categoriesQuerySchema.parse(query);

  return await getCategoriesRepo(parsed);
}

export async function createCategoriesService(input: unknown) {
  const parsed = categoriesSchema.parse(input);

  return await createCategoriesRepo(parsed);
}

export async function updateCategoryService(id: string, input: unknown) {
  const parsed = categorySchema.parse(input);

  return await updateCategoryRepo(id, parsed);
}
