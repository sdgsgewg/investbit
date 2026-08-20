import { z } from "zod";
import { TimeFrameSchema } from "../enums.schema";

const uuid = z.string().uuid();

export const performanceQuerySchema = z.object({
  timeFrame: TimeFrameSchema.optional(),
  categoryId: uuid.optional(),
  startPeriod: z.string().min(1).optional(),
  endPeriod: z.string().min(1).optional(),
  periodLimit: z.coerce.number().min(1).default(10).optional(),
});
