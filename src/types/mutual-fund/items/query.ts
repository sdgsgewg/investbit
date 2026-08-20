import { DbCategoryRow } from "../categories/query";
import { Item } from "./database";

// Supabase query result

// Item List

export type DbItemListRow = Pick<Item, "id" | "name"> & {
  category: DbCategoryRow;
};

// Item Detail

export type DbItemDetailRow = Item & {
  category: DbCategoryRow;
};

// Helper

export type DbItemRow = Pick<Item, "id" | "name"> & {
  category: DbCategoryRow;
};
