import { Tables, TablesInsert, TablesUpdate } from "@/lib/database.types";

export type Record = Tables<"rd_records">;
export type RecordInsert = TablesInsert<"rd_records">;
export type RecordUpdate = TablesUpdate<"rd_records">;
