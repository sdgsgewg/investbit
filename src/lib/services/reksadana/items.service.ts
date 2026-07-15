import {
  getItemsRepo,
  updateItemRepo,
  createItemRepo,
  getItemByIdRepo,
  deleteItemRepo,
} from "@/lib/repositories/reksadana/items.repo";
import {
  createItemSchema,
  itemIdSchema,
  itemsQuerySchema,
  updateItemSchema,
} from "@/lib/validations/reksadana/items.schema";
import { ItemListItem } from "@/types/reksadana/item";

export async function getItemsGroupedService(query: unknown) {
  const parsed = itemsQuerySchema.parse(query);

  const items = await getItemsRepo(parsed);

  // Group by category
  const map = new Map();

  items.forEach((item: ItemListItem) => {
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

  return getItemsRepo(parsed);
}

export async function getItemByIdService(id: string) {
  const parsedId = itemIdSchema.parse(id);

  return getItemByIdRepo(parsedId);
}

export async function createItemService(input: unknown) {
  // Validate
  const parsed = createItemSchema.parse(input);

  // Call repo
  return createItemRepo(parsed);
}

export async function updateItemService(id: string, input: unknown) {
  const parsedId = itemIdSchema.parse(id);
  const parsed = updateItemSchema.parse(input);

  return updateItemRepo(parsedId, parsed);
}

export async function deleteItemService(id: string) {
  const parsedId = itemIdSchema.parse(id);

  await deleteItemRepo(parsedId);
}
