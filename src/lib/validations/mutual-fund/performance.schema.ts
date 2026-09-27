import { z } from "zod";
import { timeFrameSchema } from "../enums.schema";

const uuid = z.string().uuid();

export const performanceQuerySchema = z.object({
  timeFrame: timeFrameSchema.optional(),
  categoryId: uuid.optional(),
});

export const performanceAnalyticsQuerySchema = performanceQuerySchema.extend({
  startPeriod: z.string().min(1).optional(),
  endPeriod: z.string().min(1).optional(),
  periodLimit: z.coerce.number().min(1).default(10).optional(),
});
