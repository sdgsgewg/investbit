import {
  getItemsRepo,
  createItemsRepo,
  updateItemRepo,
} from "@/lib/repositories/reksadana/items.repo";
import {
  itemSchema,
  itemsQuerySchema,
  itemsSchema,
} from "@/lib/validations/reksadana/items.schema";

export async function getItemsService(query: unknown) {
  const parsed = itemsQuerySchema.parse(query);

  const items = await getItemsRepo(parsed);

  // Group by category
  const map = new Map();

  items.forEach((item: any) => {
    const category = item.rd_categories;
    if (!category) return;

    if (!map.has(category.id)) {
      map.set(category.id, {
        id: category.id,
        name: category.name,
        rd_items: [],
      });
    }

    map.get(category.id).rd_items.push({
      id: item.id,
      name: item.name,
    });
  });

  return Array.from(map.values());
}

export async function createItemsService(input: unknown) {
  // Validate
  const parsed = itemsSchema.parse(input);

  // Call repo
  return await createItemsRepo(parsed);
}

export async function updateItemService(id: string, input: unknown) {
  const parsed = itemSchema.parse(input);

  return await updateItemRepo(id, parsed);
}
