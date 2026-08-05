import { DbCategoryRow } from "../categories/query";
import { Item } from "./database";

// Helper

export type DbItemRow = Pick<Item, "id" | "name" | "category_id"> & {
  category: DbCategoryRow;
};
