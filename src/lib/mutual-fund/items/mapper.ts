// Helper

import { DbItemRow } from "@/types/mutual-fund/items";
import { ItemResponse } from "@/types/mutual-fund/items/responses";
import { mapCategoryResponse } from "../categories/mapper";

export function mapItemResponse(item: DbItemRow): ItemResponse {
  const { id, name, category } = item;

  return {
    id,
    name,
    category: mapCategoryResponse(category),
  };
}
