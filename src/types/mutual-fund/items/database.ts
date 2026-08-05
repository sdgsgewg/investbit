import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Item = Tables<"rd_items">;
export type ItemInsert = TablesInsert<"rd_items">;
export type ItemUpdate = TablesUpdate<"rd_items">;
