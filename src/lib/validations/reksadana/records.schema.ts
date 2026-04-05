import { z } from "zod";

// UUID validation
const uuid = z.string().uuid();

// Single record schema
export const recordSchema = z.object({
  item_id: uuid,
  date: z.string().date(), // format: YYYY-MM-DD
  yield_1d: z.number().nullable().optional(),
  yield_ytd: z.number().nullable().optional(),
});

// Array schema
export const recordsSchema = z.array(recordSchema).min(1);

// Query params schema
export const recordsQuerySchema = z.object({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
});