import {
  getItemsRepo,
  updateItemRepo,
  createItemRepo,
  deleteItemRepo,
  getGroupedItemsRepo,
  getItemDetailRepo,
} from "@/lib/repositories/mutual-fund/items.repo";
import {
  createItemSchema,
  itemsQuerySchema,
  updateItemSchema,
} from "@/lib/validations/mutual-fund/items.schema";
import { idSchema } from "@/lib/validations/primitives.schema";
import {
  GroupedItemListItem,
  ItemListResponse,
} from "@/types/mutual-fund/items";

export async function getItemsService(
  query: unknown,
): Promise<ItemListResponse> {
  const parsed = itemsQuerySchema.parse(query);

  return getItemsRepo(parsed);
}

export async function getGroupedItemsService(
  query: unknown,
): Promise<GroupedItemListItem[]> {
  const parsed = itemsQuerySchema.parse(query);

  return getGroupedItemsRepo(parsed);
}

export async function getItemDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getItemDetailRepo(parsedId);
}

export async function createItemService(input: unknown) {
  // Validate
  const parsed = createItemSchema.parse(input);

  // Call repo
  return createItemRepo(parsed);
}

export async function updateItemService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updateItemSchema.parse(input);

  return updateItemRepo(parsedId, parsed);
}

export async function deleteItemService(id: string) {
  const parsedId = idSchema.parse(id);

  await deleteItemRepo(parsedId);
}
