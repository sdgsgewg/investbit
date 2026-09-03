import { z } from "zod";
import { TimeFrameSchema } from "../enums.schema";

const uuid = z.string().uuid();

export const topPerformersQuerySchema = z.object({
  timeFrame: TimeFrameSchema.optional(),
  categoryId: uuid.optional(),
});

export const categoryLeaderboardQuerySchema = z.object({
  timeFrame: TimeFrameSchema.optional(),
  categoryId: uuid.optional(),
});

export const performanceAnalyticsQuerySchema = z.object({
  timeFrame: TimeFrameSchema.optional(),
  categoryId: uuid.optional(),
  startPeriod: z.string().min(1).optional(),
  endPeriod: z.string().min(1).optional(),
  periodLimit: z.coerce.number().min(1).default(10).optional(),
});

// Backward compatibility alias
export const performanceQuerySchema = performanceAnalyticsQuerySchema;
