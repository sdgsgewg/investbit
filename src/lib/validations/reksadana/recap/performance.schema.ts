import { z } from "zod";

const uuid = z.string().uuid();

export const performanceQuerySchema = z.object({
  timeFrame: z.enum(["daily", "weekly", "monthly", "ytd", "yearly"]),
  categoryId: uuid.optional(),
  startPeriod: z.string().min(1).optional(),
  endPeriod: z.string().min(1).optional(),
  periodLimit: z.coerce.number().min(1).optional().default(10),
});
