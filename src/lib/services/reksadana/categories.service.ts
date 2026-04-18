import {
  createCategoryRepo,
  getCategoriesRepo,
  updateCategoryRepo,
} from "@/lib/repositories/reksadana/categories.repo";
import {
  categoriesQuerySchema,
  categorySchema,
  createCategorySchema,
} from "@/lib/validations/reksadana/categories.schema";

export async function getCategoriesService(query: unknown) {
  const parsed = categoriesQuerySchema.parse(query);

  return await getCategoriesRepo(parsed);
}

export async function createCategoryService(input: unknown) {
  const parsed = createCategorySchema.parse(input);

  return await createCategoryRepo(parsed);
}

export async function updateCategoryService(id: string, input: unknown) {
  const parsed = categorySchema.parse(input);

  return await updateCategoryRepo(id, parsed);
}
