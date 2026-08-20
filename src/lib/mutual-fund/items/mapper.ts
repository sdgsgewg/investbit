import {
  DbItemDetailRow,
  DbItemListRow,
  DbItemRow,
  GroupedItemListItem,
  ItemDetailResponse,
  ItemListItem,
  ItemResponse,
} from "@/types/mutual-fund/items";
import { mapCategoryResponse } from "../categories/mapper";

/**
 *
 * @param item
 * @returns ItemListItem
 */
export function mapItemListItem(item: DbItemListRow): ItemListItem {
  const { id, name, category } = item;

  return {
    id,
    name,
    category: mapCategoryResponse(category),
  };
}

/**
 * Group items by their category.
 */
export function mapGroupedItems(items: DbItemListRow[]): GroupedItemListItem[] {
  const grouped = new Map<string, GroupedItemListItem>();

  for (const item of items) {
    const mappedItem = mapItemListItem(item);

    const category = mappedItem.category;

    const existing = grouped.get(category.id);

    if (existing) {
      existing.items.push(mappedItem);
      continue;
    }

    grouped.set(category.id, {
      category,
      items: [mappedItem],
    });
  }

  return Array.from(grouped.values())
    .map((group) => ({
      ...group,

      items: [...group.items].sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.category.name.localeCompare(b.category.name));
}

export function mapItemDetailResponse(
  item: DbItemDetailRow,
): ItemDetailResponse {
  const { id, name, category } = item;

  return {
    id,
    name,
    category: mapCategoryResponse(category),
  };
}

export function mapItemResponse(item: DbItemRow): ItemResponse {
  const { id, name, category } = item;

  return {
    id,
    name,
    category: mapCategoryResponse(category),
  };
}
