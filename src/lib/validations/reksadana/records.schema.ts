import { z } from "zod";

// UUID validation
const uuidSchema = z.string().uuid();
export const recordIdSchema = uuidSchema;

export const recordMutationSchema = z.object({
  item_id: uuidSchema,
  date: z.string(),
  yield_1d: z.number().nullable().optional(),
  yield_ytd: z.number().nullable().optional(),
});

export const recordsMutationSchema = z.array(recordMutationSchema).min(1);

// UPSERT
export type RecordInput = z.infer<typeof recordMutationSchema>;
export type RecordsInput = z.infer<typeof recordsMutationSchema>;
export const upsertRecordSchema = recordsMutationSchema;

// Single record item
export const recordSchema = recordMutationSchema.extend({
  id: recordIdSchema,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

// Array schema
export const recordsSchema = z.array(recordSchema).min(1);

// Query params schema
export const recordsQuerySchema = z.object({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
  categoryId: uuidSchema.optional(),
});
