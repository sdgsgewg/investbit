import z from "zod";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";
import {
  recordMutationSchema,
  recordsQuerySchema,
  upsertRecordSchema,
} from "@/lib/validations/reksadana/records.schema";

// Supabase Table
export type Record = Tables<"rd_records">;
export type RecordInsert = TablesInsert<"rd_records">;
export type RecordUpdate = TablesUpdate<"rd_records">;

// Repo Request (from zod)
export type GetRecordsParams = z.infer<typeof recordsQuerySchema>;
export type ItemUpsertInput = z.infer<typeof upsertRecordSchema>;

// DTO helper
type CategorySummary = Pick<Tables<"rd_categories">, "id" | "name">;
type ItemSummary = Pick<Tables<"rd_items">, "id" | "name" | "category_id"> & {
  category: CategorySummary;
};

// API Response DTO
export interface RecordListItem extends Omit<
  Record,
  "created_at" | "updated_at"
> {
  items: ItemSummary | null;
}

// Mutation
export type UpsertItemInput = z.infer<typeof recordMutationSchema> & {
  id?: string;
};

// Others
