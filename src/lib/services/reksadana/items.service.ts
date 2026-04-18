import { ItemData } from "@/features/reksadana/items/types/ItemData";
import {
  getItemsRepo,
  updateItemRepo,
  createItemRepo,
} from "@/lib/repositories/reksadana/items.repo";
import {
  createItemSchema,
  itemSchema,
  itemsQuerySchema,
  updateItemSchema,
} from "@/lib/validations/reksadana/items.schema";

export async function getItemsGroupedService(query: unknown) {
  const parsed = itemsQuerySchema.parse(query);

  const items = await getItemsRepo(parsed);

  // Group by category
  const map = new Map();

  items.forEach((item: ItemData) => {
    const category = item.category;
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

export async function getItemsService(query: unknown) {
  const parsed = itemsQuerySchema.parse(query);

  return await getItemsRepo(parsed);
}

export async function createItemService(input: unknown) {
  // Validate
  const parsed = createItemSchema.parse(input);

  // Call repo
  return await createItemRepo(parsed);
}

export async function updateItemService(id: string, input: unknown) {
  const parsed = updateItemSchema.parse(input);

  return await updateItemRepo(id, parsed);
}
