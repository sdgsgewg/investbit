import {
  recordsQuerySchema,
  upsertRecordSchema,
} from "@/lib/validations/reksadana/records.schema";
import z from "zod";

/**
 * Input dari client (dari URL / API route)
 */
export type RecordQuery = Partial<z.input<typeof recordsQuerySchema>>;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */
export type RecordFilter = z.infer<typeof recordsQuerySchema>;

// Mutation

export type UpsertRecordsInput = z.infer<typeof upsertRecordSchema>;
