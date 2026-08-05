import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Category = Tables<"rd_categories">;
export type CategoryInsert = TablesInsert<"rd_categories">;
export type CategoryUpdate = TablesUpdate<"rd_categories">;
