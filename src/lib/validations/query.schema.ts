import { z } from "zod";
import { sortOrderSchema } from "./enums.schema";

export const baseQuerySchema = z.object({
  search: z.string().trim().min(1).max(255).optional().default(""),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const sortingQuerySchema = z.object({
  sortOrder: sortOrderSchema.default("asc"),
});

export const listQuerySchema = baseQuerySchema
  .merge(paginationQuerySchema)
  .merge(sortingQuerySchema);
